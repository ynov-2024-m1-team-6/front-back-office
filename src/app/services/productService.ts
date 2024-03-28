import { Product } from "../models/product";

const getProductById = async (
  id: string | string[]
): Promise<Product | null> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_OFFICE_URL}products/getProduct?id=${id}`,
    { method: "GET" }
  );
  if (!response.ok) {
    return null;
  }
  const responseJson = await response.json();
  if (!responseJson.data) {
    return null;
  }

  if (!responseJson.data.thumbnail.startsWith("http")) {
    responseJson.data.thumbnail =
      "https://cdn.discordapp.com/attachments/1202607639352053836/1212867428074389565/WosileBG.png?ex=65f365d0&is=65e0f0d0&hm=ddc125acf94fce0de78b8430dfb589581c128300874df5794ed8d5266ad99dc3&";
  }
  return responseJson.data;
};

const getProducts = async (): Promise<Product[] | null> => {
  console.log(process.env.NEXT_PUBLIC_BACK_OFFICE_URL);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_OFFICE_URL}products/getProducts`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    return null;
  }
  const responseJson = await response.json();
  return responseJson.data.map((product: Product) => {
    if (product.thumbnail.startsWith("http")) {
      return product;
    }
    product.thumbnail =
      "https://cdn.discordapp.com/attachments/1202607639352053836/1212867428074389565/WosileBG.png?ex=65f365d0&is=65e0f0d0&hm=ddc125acf94fce0de78b8430dfb589581c128300874df5794ed8d5266ad99dc3&";
    return product;
  });
};

const ProductService = { getProductById, getProducts };
export default ProductService;
