import { PhotoFileDTO } from "./PhotoFileDTO";

export type ProductDTO = {
  id: string;
  name: string;
  description: string;
  price: number;
  user_id: string;
  is_new: boolean;
  is_active: boolean;
  accept_trade: boolean;
  created_at: string;
  updated_at: string;
  product_images: ProductImages[];
  payment_methods: string[];
  user: ProductOwner;
};

export type ProductOwner = {
  avatar: string;
  name: string;
  tel: string;
};

export type ProductImages = {
  id: string;
  path: string;
};
