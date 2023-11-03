import { FavoriteInterface } from "./FavoriteInterface";
import {OrderInterface} from "./OrderInterface";

type Role = "Admin" | "User";

interface UserInterface {
  id?: string;
  name: string | undefined;
  address: string;
  email: string;
  avatar: string;
  orders?: OrderInterface[];
  role?: Role;
  password?: string;
  // favorites?: [];
  favorites?: FavoriteInterface[];
  carts?: [];
}

export default UserInterface;
