"use client";

import { Product } from "../models/product";
import UserService from "./userService";

const getWishlist = async (): Promise<Product[] | null> => {
  const token = UserService.getToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}wishlist/getWishlist`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) {
    return null;
  }
  const responseJson = await response.json();
  return responseJson.map((product: Product) => {
    if (product.thumbnail.startsWith("http")) {
      return product;
    }
    product.thumbnail =
      "https://cdn.discordapp.com/attachments/1202607639352053836/1212867428074389565/WosileBG.png?ex=65f365d0&is=65e0f0d0&hm=ddc125acf94fce0de78b8430dfb589581c128300874df5794ed8d5266ad99dc3&";
    return product;
  });
};

const WishlistService = { getWishlist };
export default WishlistService;
