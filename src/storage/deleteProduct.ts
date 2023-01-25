import axios from "axios";
import api from "../service/api";

export const deleteProduct = async (id: string) => {
  try {
    await api.delete(`/products/${id}`);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
    return false;
  }
};
