import axios from "axios";
import api from "../service/api";

export const setProductVisibility = async (
  productId: string,
  visibility: boolean
) => {
  try {
    await api.patch(`/products/${productId}`, {
      is_active: visibility,
    });
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
    return false;
  }
};
