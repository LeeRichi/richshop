import { Product } from "./ProductInterface";

export interface CartItemInterface {
  userId: string | undefined;
  productId: string;
  product: Product;
  quantity: number;
}
