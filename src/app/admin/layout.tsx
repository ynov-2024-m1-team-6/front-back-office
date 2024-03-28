"use client";

import React, { useEffect, useState } from "react";
import { FiHome, FiUsers, FiTable } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import UserService from "../services/userService";
import { FaShoppingBag } from "react-icons/fa";
import { IoIosArrowDropleftCircle } from "react-icons/io";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<Boolean>(true);
  const router = useRouter();


  const pathname = usePathname();

  return isAdmin ? (
    <div className="flex h-screen bg-gray-100  overflow-hidden">
      <div className="bg-whitetext-black w-64 border-r-2 border-gray-600 border">
        <div className="p-5 font-semibold">Uber Bagarre</div>
        <ul>
          <li>
            <a href="/admin/dashboard">
              <p
                className={`flex text items-center justify-start p-4 rounded-lg m-2 ${
                  pathname == "/admin/dashboard"
                    ? "text-white bg-black"
                    : "bg-slate-300"
                }`}
              >
                <FiTable className="mr-2" />
                <span>Dashboard</span>
              </p>
            </a>
          </li>
          <li>
            <a href="/admin/product">
              <p
                className={`flex text items-center justify-start p-4 rounded-lg m-2 ${
                  pathname == "/admin/product"
                    ? "text-white bg-black"
                    : "bg-slate-300"
                }`}
              >
                <FiHome className="mr-2" />
                <span>Produits</span>
              </p>
            </a>
          </li>
          <li>
            <a href="/admin/users">
              <p
                className={`flex items-center justify-start p-4 rounded-lg m-2 ${
                  pathname == "/admin/users"
                    ? "text-white bg-black"
                    : "bg-slate-300 text-black"
                }`}
              >
                <FiUsers className="mr-2" />
                <span>Utilisateurs</span>
              </p>
            </a>
          </li>
          <li>
            <a href="/admin/commands">
              <p
                className={`flex items-center justify-start p-4 rounded-lg m-2 ${
                  pathname == "/admin/commands"
                    ? "text-white bg-black"
                    : "bg-slate-300 text-black"
                }`}
              >
                <FaShoppingBag className="mr-2" />
                <span>Commandes</span>
              </p>
            </a>
          </li>
          <li>
            <a href="https://uber-bagarre.vercel.app">
              <p
                className={`flex items-center justify-start p-4 rounded-lg m-2 text-black bg-gray-50`}
              >
                <IoIosArrowDropleftCircle className="mr-2" />
                <span>Retour au shop</span>
              </p>
            </a>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-5 overflow-y-auto">{children}</div>
    </div>
  ) : (
    <></>
  );
};

export default Layout;
