import OrderProductsInterface from "./OrderProductsInterface";
import UserInterface from "./UserInterface";

interface OrderInterface {
  id?: string;
  orderStatus: string;
  orderProducts: OrderProductsInterface[];
  userId: string;
  user: UserInterface;
  createAt?: string;
  updatedAt?: string;
}

export default OrderInterface;
