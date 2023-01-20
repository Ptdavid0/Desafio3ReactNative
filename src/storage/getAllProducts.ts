import axios from "axios";
import api from "../service/api";

export const getAllProducts = async () => {
  try {
    const products = await api.get("/products");
    if (products) {
      const updatedproducts = products.data.map((product: any) => {
        return {
          ...product,
          payment_methods: product.payment_methods.map(
            (payment_method: any) => payment_method.key
          ),
        };
      });
      return updatedproducts;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
  }
};
