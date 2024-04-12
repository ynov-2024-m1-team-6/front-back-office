"use client";

import React, { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import Modal from "../../components/modalProduct";
import UserService from "../../services/userService";
import { Product } from "../../models/product";
import Loader from "@/app/components/loader";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_OFFICE_URL}products/getProducts`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${UserService.getToken()}`,
          },
        }
      );
      const productsData = await res.json();
      setProductsData(productsData.data);
      setIsLoading(false);
    };
    getProducts();
  }, []);

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleAddProduct = () => {
    const product = {
      id: 0,
      username: "",
      description: "",
      price: NaN,
      height: NaN,
      weight: NaN,
      ratio: "",
      thumbnail: "",
      active: false,
    };
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = async (product: Product) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_OFFICE_URL}products/delete?id=${product.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    );
    const data = await res.json();
    setProductsData(
      productsData.filter((products) => products.id !== product.id)
    );
  };
  const filteredProducts =
    searchTerm.length === 0
      ? productsData
      : productsData.filter(
          (product) =>
            product.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            product.thumbnail.toLowerCase().includes(searchTerm.toLowerCase())
        );
  return (
    <div className="p-5">
      <div className="mb-5 flex items-center gap-2">
        <input
          type="text"
          placeholder="Rechercher..."
          className="p-2 border border-gray-300 rounded-lg flex-1"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => handleAddProduct()}>New product</button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto border border--2">
          <table className="w-full text-left  overflow-hidden">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3">Username</th>
                <th className="p-3">Description</th>
                <th className="p-3">Price</th>
                <th className="p-3">Height</th>
                <th className="p-3">Weight</th>
                <th className="p-3">Ratio</th>
                <th className="p-3">Active</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100 group">
                  <td className="p-3 whitespace-nowrap">{product.username}</td>
                  <td className="p-3 whitespace-nowrap">
                    {product.description}
                  </td>
                  <td className="p-3 whitespace-nowrap">{product.price}</td>
                  <td className="p-3 whitespace-nowrap">{product.height}</td>
                  <td className="p-3 whitespace-nowrap">{product.weight}</td>
                  <td className="p-3 whitespace-nowrap">{product.ratio}</td>
                  <td className="p-3 whitespace-nowrap">
                    {product.active ? "true" : "false"}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        className="p-2 text-blue-500 hover:text-blue-700 hover:bg-gray-300 rounded-full relative"
                        onClick={() => handleEditProduct(product)}
                      >
                        <span className="flex items-center justify-center">
                          <FiEdit2 />
                        </span>
                      </button>
                      <button className="p-2 text-red-500 hover:text-red-700 hover:bg-gray-300 rounded-full relative">
                        <span className="flex items-center justify-center">
                          <FiTrash2
                            onClick={() => handleDeleteProduct(product)}
                          />
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            productData={selectedProduct as Product}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
