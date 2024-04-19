"use client";
import React, { useState, useEffect } from "react";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { Command } from "../../models/command";
import { MdOutlineAttachMoney } from "react-icons/md";
import { Status } from "../../models/status";
import CommandService from "../../services/commandService";
import UserService from "../../services/userService";
import Loader from "@/app/components/loader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SquareArrowOutUpRight } from "lucide-react";

const CommandsPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [commands, setCommands] = useState<Command[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredCommands, setFilteredCommands] = useState<Command[]>([]);

  const getCommands = async () => {
    const allCommands = await CommandService.getAllCommands();
    if (allCommands) {
      setCommands(allCommands);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Commands:", commands);
    if (searchValue.length !== 0) {
      setFilteredCommands(
        commands.filter((command) => {
          return (
            command.orderNumber
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            command.email.toLowerCase().includes(searchValue.toLowerCase()) ||
            command.products.some((product) =>
              product.username.toLowerCase().includes(searchValue.toLowerCase())
            ) ||
            command.status.toLowerCase().includes(searchValue.toLowerCase())
          );
        })
      );
    } else {
      setFilteredCommands(commands);
    }
  }, [searchValue, commands]);

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
        <input
          type="text"
          placeholder="Rechercher..."
          className="p-2 border border-gray-300 rounded-lg flex-1"
          onChange={(e) => setSearchValue(e.target.value)}
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
              {filteredCommands.map((command) => (
                <tr key={command.id} className="hover:bg-gray-100 group ">
                  <td className="p-3 whitespace-nowrap">{command.id}</td>
                  <td className="p-3 whitespace-nowrap">
                    {command.orderNumber}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {
                      command.status === "REFUNDED" ? (
                        <Badge variant="destructive">Refunded</Badge>
                      ) : command.status === "REIMBURSEMENT" ? (
                        <Badge className="bg-green-500">Reimbursement</Badge>
                      ) : command.status === "PAID" ? (
                        <Badge className="bg-green-500">Paid</Badge>
                      ) : (
                        <Badge color="gray">Unknown</Badge>
                      ) // Default case if none of the specified statuses match
                    }
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {new Date(command.date).getDate()}/
                    {new Date(command.date).getMonth() + 1}/
                    {new Date(command.date).getFullYear()}
                  </td>
                  <td>{command.email}</td>
                  <td className="flex flex-row justify-between align-center p-4">
                    <Dialog>
                      <DialogTrigger>
                        <SquareArrowOutUpRight size={16} />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Detail de la Commande {command.id}
                          </DialogTitle>
                          <DialogDescription>
                            <div className="flex flex-row justify-between align-center"></div>
                            <h2 className="text-black pt-2">Produits :</h2>
                            <div></div>
                            <ul>
                              {command.products.map((product) => (
                                <li key={product.id}>
                                  {product.username} - {product.price}€
                                </li>
                              ))}
                            </ul>
                            <h2 className="text-black pt-2">Email :</h2>
                            <p>{command.email}</p>
                            <h2 className="text-black pt-2">Total :</h2>
                            <p>
                              {command.products
                                .map((product) => product.price)
                                .reduce((a, b) => a + b, 0)}
                              €
                            </p>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    {command.status === Status.REIMBURSEMENT && (
                      <Dialog>
                        <DialogTrigger>
                          {" "}
                          <MdOutlineAttachMoney color="red" />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Confirmation de remboursement
                            </DialogTitle>
                            <DialogDescription>
                              {" "}
                              Voulez-vous rembourser : {
                                command.orderNumber
                              } ? <br></br>
                              Cette action est définitve
                              <DialogFooter>
                                <Button
                                  type="submit"
                                  variant="destructive"
                                  onClick={() => {
                                    CommandService.refundedCommand(
                                      command.orderNumber
                                    );
                                    window.location.reload();
                                  }}
                                >
                                  Rembourser
                                </Button>
                              </DialogFooter>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
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
