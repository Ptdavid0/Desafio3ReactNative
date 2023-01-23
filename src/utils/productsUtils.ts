import { ProductDTO } from "../dtos/ProductDTO";
import api from "../service/api";

export const getActiveProducts = (products: ProductDTO[]) => {
  const activeProducts = products.filter((product) => product.is_active);
  return activeProducts;
};

export const getProductImages = (product: ProductDTO) => {
  const images = product.product_images.map(({ path }) => {
    return `${api.defaults.baseURL}/images/${path}`;
  });
  return images;
};
