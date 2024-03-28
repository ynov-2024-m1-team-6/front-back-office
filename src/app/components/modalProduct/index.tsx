import { Product } from "../../models/product";
import UserService from "../../services/userService";
import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productData: Product;
}

const ModalProduct = ({ onClose, isOpen, productData }: Props) => {
  interface Props {
    isOpen: boolean;
    onClose: () => void;
    productData: Product;
  }

  const [valide, setValide] = useState(false);
  const [error, setError] = useState(false);
  const closeModal = () => {
    onClose();
  };

  const handleSaveClick = async () => {
    if (productData.id === 0) {
      const productDataWithoutId = { ...productData };
      if (productDataWithoutId.id) {
        delete productDataWithoutId.id;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_OFFICE_URL}products/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${UserService.getToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productDataWithoutId),
        }
      );
      if (res.ok) {
        closeModal();
        setTimeout(() => {
          setValide(false);
        }, 3000);
      } else setError(true);
    } else {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_OFFICE_URL}products/update?id=${productData.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${UserService.getToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );
      if (res.ok) {
        closeModal();
        setTimeout(() => {
          setValide(false);
        }, 3000);
      }
    }
    setValide(true);
  };
  if (!isOpen || !productData) return null;

  const {
    username = "",
    description = "",
    price = 0,
    height = "",
    weight = "",
    ratio = "",
    thumbnail = "",
    active = false,
  } = productData;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="w-[700px] h-[800px] bg-white p-4 rounded-md modal_content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b border-neutral-200 p-4 dark:border-neutral-500">
          <h5
            className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-800"
            id="leftBottomModalLabel"
          >
            Product&apos;s Informations
          </h5>
          <button
            type="button"
            className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none place-self-end"
            data-te-modal-dismiss
            aria-label="Close"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center justify-start px-6 py-4 space-y-4 h-full">
          <div className="relative flex-auto p-4" data-te-modal-body-ref>
            <form className="p-2 judtify-center">
              <div className="flex flex-wrap  -mx-3 mt-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                    Username
                  </label>
                  <input
                    className="appearance-none block w-full bg-transparent-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="McGregor"
                    required
                    id="username"
                    defaultValue={username}
                    onChange={(e) => (productData.username = e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                    Active
                  </label>
                  <input
                    type="checkbox"
                    id="checkbox"
                    defaultChecked={active}
                    onChange={(e) => (productData.active = e.target.checked)}
                    className="relative peer shrink-0 appearance-none w-4 h-4 border-2 border-blue-500 rounded-sm bg-white mt-1 checked:bg-blue-800 checked:border-0"
                  />
                </div>
              </div>

              <div className="w-full  mt-6">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Description
                </label>
                <input
                  className="appearance-none block w-full bg-transparent-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Blalabla..."
                  id="description"
                  onChange={(e) => (productData.description = e.target.value)}
                  defaultValue={description}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                    Price
                  </label>
                  <input
                    className="appearance-none block w-full bg-transparent-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    placeholder="150$"
                    required
                    id="price"
                    onChange={(e) => (productData.price = +e.target.value)}
                    defaultValue={price}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                    Ratio
                  </label>
                  <input
                    className="appearance-none block w-full bg-transparent-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="10-0"
                    id="ratio"
                    onChange={(e) => (productData.ratio = e.target.value)}
                    defaultValue={ratio}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                    Height
                  </label>
                  <input
                    className="appearance-none block w-full bg-transparent-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    placeholder="185cm"
                    id="height"
                    onChange={(e) => (productData.height = +e.target.value)}
                    defaultValue={height}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                    Weight
                  </label>
                  <input
                    className="appearance-none block w-full bg-transparent-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    id="weight"
                    defaultValue={weight}
                    onChange={(e) => (productData.weight = +e.target.value)}
                    placeholder="95kg"
                  />
                </div>
              </div>
              <div className="w-full  mt-6">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Thumbnail
                </label>
                <input
                  className="appearance-none block w-full bg-transparent-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Url of the image"
                  id="thumbnail"
                  onChange={(e) => (productData.thumbnail = e.target.value)}
                  defaultValue={thumbnail}
                />
              </div>

              {/*<!--Submit button-->*/}
              <div className="my-4 mx-6 p-4 flex justify-center">
                <div
                  onClick={() => handleSaveClick()}
                  className="w-[300px] bg-black hover:bg-white border border-black text-white hover:text-black font-bold py-2 px-4 rounded"
                >
                  Enregistrer
                </div>
              </div>
              {valide && (
                <div className="h-[40px] flex items-center justify-center bg-green-500  bg-opacity-25 rounded mb-10">
                  <p className="text-center text-green-500">Enregistrer</p>
                </div>
              )}
              {error && (
                <div className="h-[40px] flex items-center justify-center bg-red-500  bg-opacity-25 rounded mb-10">
                  <p className="text-center text-red-500">Erreur</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProduct;
