import { PhotoFileDTO } from "../dtos/PhotoFileDTO";
import { ProductDTO } from "../dtos/ProductDTO";
import api from "../service/api";
import * as ImagePicker from "expo-image-picker";
import * as uuid from "uuid";

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

export const photoFileConstructor = async (
  selectedPhoto: ImagePicker.ImagePickerResult
) => {
  if (selectedPhoto.assets) {
    const imageRandomName = uuid.v4();
    const fileExtension = selectedPhoto.assets[0].uri.split(".").pop();
    const photoFile = {
      name: `${imageRandomName}.${fileExtension}`,
      uri: selectedPhoto.assets[0].uri,
      type: `${selectedPhoto.assets[0].type}/${fileExtension}`,
    } as PhotoFileDTO;

    return photoFile;
  } else {
    return {
      name: "",
      uri: "",
      type: "",
    };
  }
};
