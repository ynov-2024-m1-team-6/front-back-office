import React from "react";
import { useRouter } from "next/navigation";
import UserService from "../../services/userService";
import { FaUser, FaArchive } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { MdDashboardCustomize } from "react-icons/md";
import Modal from "../../components/modalNavbar";

function ModalNavbar() {
  const admin = UserService.isAdmin();
  const router = useRouter();

  const logout = () => {
    UserService.logout();
    router.push("/login");
  };

  return (
    <div className="p-4 h-[400px] w-[250px] bg-gray-300 flex flex-col justify-center items-center z-50 rounded-xl">
      <div className="flex flex-col items-center">
        <div className="h-[80px] w-[80px] rounded-full bg-red-200 mb-4 flex justify-center items-center">
          <FaUser size={40} />
        </div>
        <div className="flex justify-center items-center">
          <p>John Doe</p>
        </div>
      </div>
      <div className="flex flex-col justify-start">
        <div className="flex flex-col mt-4 p-2">
          <a href="/profile" className="flex flex-row gap-4">
            <FaUser size={20} />
            Profile
          </a>
        </div>
        <div className="flex flex-col p-2">
          <a href="/settings" className="flex flex-row gap-4">
            <IoMdSettings size={20} />
            Settings
          </a>
        </div>
        <div className="flex flex-col p-2">
          <a href="/commands" className="flex flex-row gap-4">
            <FaArchive size={20} />
            Commands
          </a>
        </div>
        <div className="flex flex-col p-2">
          <a href="/dashboard" className="flex flex-row gap-4">
            <MdDashboardCustomize size={20} />
            Dashboard
          </a>
        </div>
        <div className="flex flex-col p-2" onClick={() => logout()}>
          <a href="/logout" className="flex flex-row gap-4">
            <IoLogOut size={20} />
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}

export default ModalNavbar;
