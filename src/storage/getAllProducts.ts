import axios from "axios";
import api from "../service/api";

export const getAllProducts = async () => {
  try {
    const products = await api.get("/products");
    if (products) return products.data;
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
  }
};
