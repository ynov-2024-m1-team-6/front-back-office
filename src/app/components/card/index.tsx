"use client";

import { Product } from "../../models/product";
import UserService from "../../services/userService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

interface Props {
  product: Product;
  isInWishlist: boolean;
}

const Card = ({ product, isInWishlist }: Props) => {
  const router = useRouter();

  const addToWishlist = async () => {
    const token = UserService.getToken();
    const user = UserService.currentUser();

    if (!user || !token) {
      return;
    }

    const request = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: product.id,
      }),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}wishlist/addItem`,
      request
    );

    if (response.ok) {
      router.push("/wishlist");
    }
  };

  const removeFromWishlist = async () => {
    const token = UserService.getToken();
    const user = UserService.currentUser();

    if (!user || !token) {
      return;
    }

    const request = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: product.id,
      }),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}wishlist/removeItem`,
      request
    );
    if (response.ok) {
      router.push("/product");
    }
  };

  return (
    <div className="relative w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <a href={`product/${product.id}`}>
        <Image
          src={product.thumbnail}
          alt="Product"
          className="h-80 w-72 object-cover rounded-t-xl"
          width={320}
          height={300}
          priority
        />
        <div className="px-4 py-3 w-72">
          <p className="text-lg font-bold text-black truncate block capitalize">
            {product.username}
          </p>
          <p className="text-lg font-bold text-black truncate block capitalize">
            {product.ratio}
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              {product.price}€
            </p>
            <div className="ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-bag-plus"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </div>
          </div>
        </div>
      </a>
      {isInWishlist ? (
        <div
          onClick={() => removeFromWishlist()}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <FaHeart width={48} height={48} color="red" />
        </div>
      ) : (
        <div
          onClick={() => addToWishlist()}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <CiHeart width={48} height={48} />
        </div>
      )}
    </div>
  );
};

export default Card;
