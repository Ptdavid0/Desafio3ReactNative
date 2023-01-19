import axios from "axios";
import { ProductDTO } from "../dtos/ProductDTO";
import api from "../service/api";

export const addProduct = async (product: ProductDTO) => {
  try {
    console.log(product);
    await api.post("/products", product);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
    return false;
  }
};
