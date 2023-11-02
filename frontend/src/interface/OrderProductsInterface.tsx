import { Product } from "./ProductInterface";

interface OrderProductsInterface
{
  orderId?: string;
  productId: string;
  product: Product;
  amount: number;
}

export default OrderProductsInterface;
