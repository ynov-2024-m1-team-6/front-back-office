"use client";
import React, { useState, useEffect } from "react";
import CommandService from "../../services/commandService";
import UserService from "../../services/userService";
import ProductService from "@/app/services/productService";
import { Command } from "@/app/models/command";
import { Product } from "@/app/models/product";
import Loader from "@/app/components/loader";
import { get } from "http";

function Dashboard() {
  const [productsData, setProductsData] = useState([]);
  const [commands, setCommands] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoadingUser, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getAllCommands = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}command/getCommands`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${UserService.getToken()}`,
          },
        }
      );
      const commands = await res.json();
      console.log(commands.data);
      setCommands(commands.data);
      return true;
    };
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
      console.log(productsData.data, "productsData");
      setProductsData(productsData.data);
      return true;
    };
    const getUser = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/admin`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${UserService.getToken()}`,
        },
      });
      const usersData = await res.json();
      console.log(usersData.data);
      setUsers(usersData.data);
      return true;
    };

    Promise.all([getAllCommands(), getProducts(), getUser()]).then(
      (responses) => {
        const allResponsesTrue = responses.every(
          (response) => response === true
        );
        if (allResponsesTrue) {
          setIsLoading(false);
        }
      }
    );
  }, []);

  const orders = [
    { id: 1, orderNumber: "00000001", date: "2024-04-12T09:20:00.000Z" },
    { id: 2, orderNumber: "00000002", date: "2024-04-12T12:08:05.275Z" }, // Example if today was 2024-04-12
    { id: 3, orderNumber: "00000003", date: "2023-12-24T16:30:00.000Z" },
  ];

  const numberOfOrdersThisMonth = commands.filter((order: Command) => {
    const orderDate = new Date(order.date);
    const today = new Date();
    return (
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    );
  }).length;

  return (
    <div className="p-5 w-full h-full">
      <h1 className="text-2xl font-medium text-left mb-6">Welcome back 👋</h1>
      {isLoadingUser ? (
        <div className="flex h-full w-full align-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="bg-[#fafafa]  rounded-lg p-4 sm:p-6 xl:p-8 mb-6">
            <h2 className="text-xl font-semibold mb-4">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="stat-item p-4 bg-blue-100 rounded-lg">
                Total Commands:{" "}
                <span className="font-bold">{commands.length}</span>
              </div>
              <div className="stat-item p-4 bg-green-100 rounded-lg">
                Orders This Month:{" "}
                <span className="font-bold">{numberOfOrdersThisMonth}</span>
              </div>
              <div className="stat-item p-4 bg-orange-100 rounded-lg">
                All Products:{" "}
                <span className="font-bold">{productsData.length}</span>
              </div>
              <div className="stat-item p-4 bg-purple-100 rounded-lg">
                Recent users: <span className="font-bold">{users.length}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="bg-[#fafafa]   rounded-lg p-4 sm:p-6 xl:p-8 ">
                <h2 className="text-xl font-semibold mb-4">Last user</h2>
                <ul className="list-disc list-inside">
                  {users.slice(-4).map((user: any) => (
                    <li key={user.id}>
                      {user.name} - {user.mail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#fafafa]  rounded-lg p-4 sm:p-6 xl:p-8 mt-6">
                <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                <ul className="list-disc list-inside">
                  {commands.slice(-4).map((command: Command) => (
                    <li key={command.id}>
                      {command.orderNumber} -{" "}
                      {new Date(command.date).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-[#fafafa]  rounded-lg p-4 sm:p-6 xl:p-8">
              <h3 className="text-xl font-semibold mb-4">Products Overview</h3>
              <ul className="list-disc list-inside">
                {productsData.map((product: Product) => (
                  <li key={product.id}>
                    {product.username} - {product.price}$
                    {product.active ? " - Available" : " - Not Available"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default Dashboard;
