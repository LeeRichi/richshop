import OrderProductsInterface from "./OrderProductsInterface";
import UserInterface from "./UserInterface";

export interface OrderInterface {
  id?: string;
  orderStatus: string;
  orderProducts: OrderProductsInterface[];
  userId: string;
  user?: UserInterface;
  createAt?: string;
  updatedAt?: string;
  quantity: number;
}

export interface OrderPostInterface
{
  orderStatus: string;
  orderProducts: OrderProductsInterface[];
  userId: string;
}