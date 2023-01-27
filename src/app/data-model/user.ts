import {Dish} from "./dish";
import {Order} from "./order";

export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  role: string;
  cart: { dish: Dish, quantity: number }[];
  orders: Order[];
  banned: boolean;
}
