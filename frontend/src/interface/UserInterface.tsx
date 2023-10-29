import {OrderInterface} from "./OrderInterface";

type Role = "Admin" | "User";

interface UserInterface {
  id?: string;
  name: string;
  address: string;
  email: string;
  avatar: string;
  orders?: OrderInterface[];
  role?: Role;
  password?: string
  favorites?: [];
  carts?: [];
}

export default UserInterface;
