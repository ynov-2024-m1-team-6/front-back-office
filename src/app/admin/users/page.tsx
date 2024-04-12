"use client";
import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import Modal from "../../components/modalUser";
import UserService from "../../services/userService";
import { User } from "../../models/user";
import Loader from "@/app/components/loader";

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [usersData, setUserData] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDeleteUser = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${UserService.getToken()}`,
      },
    });
    const data = await res.json();
    setUserData(usersData.filter((user) => user.id !== id));
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/admin`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${UserService.getToken()}`,
        },
      });
      const usersData = await res.json();
      setUserData(usersData.data);
      setIsLoading(false);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (searchTerm.length !== 0) {
      setFilteredUsers(
        usersData.filter((user) => {
          return (
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.mail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.adress.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.city.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      );
    } else {
      setFilteredUsers(usersData);
    }
  }, [searchTerm, usersData]);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className="p-5">
      <div className="mb-5 flex items-center gap-2">
        <input
          type="text"
          placeholder="Rechercher..."
          className="p-2 border border-gray-300 rounded-lg flex-1"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto rounded-lg border border--2">
          <table className="w-full text-left rounded-lg overflow-hidden">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3">Nom</th>
                <th className="p-3">Prénom</th>
                <th className="p-3">Adresse Mail</th>
                <th className="p-3">Adresse</th>
                <th className="p-3">Code Postal</th>
                <th className="p-3">Ville</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers &&
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100 group">
                    <td className="p-3 whitespace-nowrap">{user.name}</td>
                    <td className="p-3 whitespace-nowrap">{user.firstName}</td>
                    <td className="p-3 whitespace-nowrap">{user.mail}</td>
                    <td className="p-3 whitespace-nowrap">{user.adress}</td>
                    <td className="p-3 whitespace-nowrap">{user.zipCode}</td>
                    <td className="p-3 whitespace-nowrap">{user.city}</td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          className="p-2 text-blue-500 hover:text-blue-700 hover:bg-gray-300 rounded-full relative"
                          onClick={() => handleEditUser(user)}
                        >
                          <span className="flex items-center justify-center">
                            <FiEdit2 />
                          </span>
                        </button>
                        <button
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-gray-300 rounded-full relative"
                          onClick={() => fetchDeleteUser(user.id)}
                        >
                          <span className="flex items-center justify-center">
                            <FiTrash2 />
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
            userData={selectedUser!}
          />
        </div>
      )}
    </div>
  );
};

export default UsersPage;
