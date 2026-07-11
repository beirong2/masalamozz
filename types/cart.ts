import { MenuOption } from "@/data/menu";

export interface CartItem {
  id: string;

  signature?: string;

  base: MenuOption | null;

  protein: MenuOption | null;

  sauce: MenuOption | null;

  toppings: string[];

  quantity: number;

  price: number;
}