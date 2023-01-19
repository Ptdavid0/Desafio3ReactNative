import { ProductDTO } from "../dtos/ProductDTO";

export const getActiveProducts = (products: ProductDTO[]) => {
  const activeProducts = products.filter((product) => product.is_active);
  return activeProducts;
};
