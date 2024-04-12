"use client";
import React, { useState } from "react";
import { FiHome, FiUsers, FiTable, FiLogOut } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { FaShoppingBag } from "react-icons/fa";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import Logo from "../../../public/logo2.svg";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("tokenAdmin");
    router.push("/");
  };

  return isAdmin ? (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div className="flex flex-col justify-between bg-white text-black w-[250px] border-r-2 border-gray-300 h-full">
        <div>
          <div className="flex justify-center items-center p-4 font-semibold text-xl">
            <img src={"/logo.svg"} width={50} height={50} />
            Uber Bagarre
          </div>
          <ul className="mx-4">
            {[
              {
                path: "/admin/dashboard",
                icon: <FiTable />,
                label: "Dashboard",
              },
              { path: "/admin/product", icon: <FiHome />, label: "Produits" },
              {
                path: "/admin/users",
                icon: <FiUsers />,
                label: "Utilisateurs",
              },
              {
                path: "/admin/commands",
                icon: <FaShoppingBag />,
                label: "Commandes",
              },
              {
                path: "https://uberbagarre.netlify.app/",
                icon: <IoIosArrowDropleftCircle />,
                label: "Retour au shop",
              },
            ].map((item, index) => (
              <li key={index} className="flex items-center mx-1 p-1">
                <a href={item.path} className="w-full">
                  <div
                    className={`flex items-center justify-around p-3 rounded-lg ${
                      pathname === item.path
                        ? "text-white bg-black"
                        : "hover:bg-slate-300"
                    }`}
                  >
                    {item.icon}
                    <span className="flex-1 text-center">{item.label}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div
          onClick={() => handleLogout()}
          className="flex justify-center items-center p-4 hover:underline  hover:text-red-500"
        >
          <FiLogOut />
          <button className="ml-2 decoration-2 underline-offset-4 ">
            Log Out
          </button>
        </div>
      </div>
      <div className="flex-1 p-5  bg-white overflow-y-auto">{children}</div>
    </div>
  ) : null;
};

export default Layout;
