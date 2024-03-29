"use client";

import { User } from "../models/user";
import { jwtDecode } from "jwt-decode";

const currentUser = (): User | null => {
  try {
    if (typeof window !== "undefined") {
      const token = UserService.getToken();
      if (!token || token === undefined || token === "undefined") {
        return null;
      }
      return jwtDecode<User>(token);
    }
    return null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const isAdmin = (): boolean => {
  const user = currentUser();
  if (user?.isAdmin) {
    return true;
  }
  return false;
};

const getToken = (): string | null => {
  try {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem("token");
};

const UserService = { currentUser, isAdmin, getToken, logout };
export default UserService;
