import axios from "axios";
import { ProductDTO } from "../dtos/ProductDTO";
import api from "../service/api";
import { addImagesOfProduct } from "./addImagesOfProduct";

export const addProduct = async (
  product: ProductDTO,
  currentProductImages: any[]
) => {
  try {
    const { name, description, is_new, price, accept_trade, payment_methods } =
      product;
    const data = {
      name,
      description,
      is_new: is_new ? true : false,
      price: Number(price) * 100,
      accept_trade: accept_trade ? true : false,
      payment_methods,
    };
    const response = await api.post("/products", data);
    if (response.status === 200 || response.status === 201) {
      const imageshasBeenAdded = await addImagesOfProduct(
        response.data.id,
        currentProductImages
      );
      if (imageshasBeenAdded) return true;
      else return false;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
    return false;
  }
};
