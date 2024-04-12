"use client";
import React, { useState, useEffect } from "react";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { Command } from "../../models/command";
import { MdOutlineAttachMoney } from "react-icons/md";
import { Status } from "../../models/status";
import CommandService from "../../services/commandService";
import UserService from "../../services/userService";
import Loader from "@/app/components/loader";

const CommandsPage = () => {
  const [searchName, setSearchName] = useState("email");
  const [searchValue, setSearchValue] = useState("");
  const [commands, setCommands] = useState<Command[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCommands = async () => {
    const allCommands = await CommandService.getAllCommands();
    if (allCommands) {
      setCommands(allCommands);
      setIsLoading(false);
    }
  };

  const filterCommands = async () => {
    const filteredCommands = await CommandService.getFilteredCommands(
      searchName,
      searchValue
    );
    if (filteredCommands) {
      setCommands(filteredCommands);
    }
  };

  const refundedCommand = async (orderNumber: string) => {
    await CommandService.refundedCommand(orderNumber);
  };

  useEffect(() => {
    getCommands();
  }, []);

  useEffect(() => {
    console.log(commands);
  }, []);

  return (
    <div className="p-5">
      <div className="mb-5 flex items-center gap-2">
        <select onChange={(e) => setSearchName(e.target.value)}>
          <option value="email">Email</option>
          <option value="orderNumber">Numéro de commande</option>
          <option value="userId">Id d&apos;utilisateur</option>
          <option value="status">Statut</option>
        </select>
        <input
          type="text"
          placeholder="Rechercher..."
          className="p-2 border border-gray-300 rounded-lg flex-1"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <FiSearch
          className="text-gray-400 cursor-pointer"
          onClick={() => filterCommands()}
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto rounded-lg border border--2">
          <table className="w-full text-left rounded-lg overflow-hidden">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3">Id</th>
                <th className="p-3">Numéro</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Date</th>
                <th className="p-3">Email utilisateur</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {commands.map((command) => (
                <tr key={command.id} className="hover:bg-gray-100 group">
                  <td className="p-3 whitespace-nowrap">{command.id}</td>
                  <td className="p-3 whitespace-nowrap">
                    {command.orderNumber}
                  </td>
                  <td className="p-3 whitespace-nowrap">{command.status}</td>
                  <td className="p-3 whitespace-nowrap">
                    {new Date(command.date).getDate()}/
                    {new Date(command.date).getMonth() + 1}/
                    {new Date(command.date).getFullYear()}
                  </td>
                  <td>{command.email}</td>
                  <td>
                    {command.status === Status.REIMBURSEMENT && (
                      <button
                        title="Rembourser"
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-gray-300 rounded-full relative"
                      >
                        <span className="flex items-center justify-center">
                          <MdOutlineAttachMoney
                            onClick={() => {
                              CommandService.refundedCommand(
                                command.orderNumber
                              );
                              window.location.reload();
                            }}
                          />
                        </span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CommandsPage;
