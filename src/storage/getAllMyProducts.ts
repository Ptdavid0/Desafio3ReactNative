import axios from "axios";
import api from "../service/api";

export const getAllMyProducts = async () => {
  try {
    const products = await api.get("/users/products");
    if (products) return products.data;
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
  }
};
