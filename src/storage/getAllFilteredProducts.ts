import axios from "axios";
import { FilterDTO } from "../dtos/FilterDTO";
import api from "../service/api";

export const getFilteredProducts = async (filters: FilterDTO) => {
  const params: any = {
    accept_trade: filters.accept_trade,
    payment_methods: filters.payment_methods,
    is_new: filters.is_new,
  };

  Object.keys(params).forEach(
    (key: any) =>
      (params[key] === undefined ||
        (Array.isArray(params[key]) && params[key].length === 0)) &&
      delete params[key]
  );

  try {
    const { data } = await api.get("/products", { params });
    if (data) {
      const updatedproducts = await data.map((product: any) => {
        return {
          ...product,
          payment_methods: product.payment_methods.map(
            (payment_method: any) => payment_method.key
          ),
        };
      });
      return updatedproducts;
    }
    return [];
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
  }
};
