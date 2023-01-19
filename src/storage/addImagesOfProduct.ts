import axios from "axios";
import api from "../service/api";

export const addImagesOfProduct = async (
  product_id: string,
  images: FormData
) => {
  try {
    const response = await api.post(
      `/products/images`,
      {
        product_id,
        images,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
    return false;
  }
};
