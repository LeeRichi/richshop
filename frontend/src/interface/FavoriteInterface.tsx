import { Product } from "./ProductInterface";


export interface FavoriteInterface
{
  product?: Product;
  userId: string | undefined;
  productId: string | undefined;
}