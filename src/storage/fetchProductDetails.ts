import axios from "axios";
import api from "../service/api";

export const fetchProductDetails = async (productId: string) => {
  try {
    const { data } = await api.get(`/products/${productId}`);
    return {
      ...data,
      payment_methods: data.payment_methods.map(
        (payment_method: any) => payment_method.key
      ),
    };
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
  }
};
