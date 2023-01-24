import axios from "axios";
import api from "../service/api";

import { photoFileConstructor } from "../utils/productsUtils";

export const addImagesOfProduct = async (productId: string, images: any[]) => {
  try {
    const form = new FormData();
    form.append("product_id", productId);

    images.forEach(async (item) => {
      const photoFile: any = await photoFileConstructor(item);
      form.append("images", photoFile);
    });

    const response = await api.post("/products/images/", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    return false;
  } catch (error) {
    if (axios.isAxiosError(error)) console.log(error.response?.data);
    else console.log(error);
    return false;
  }
};
