import { MenuOption } from "@/data/menu";

export interface CartItem {
  id: string;

  signature?: string;

  removed?: string[];

  extras?: {
    id: string;
    name: string;
    price: number;
  }[];

  bases: MenuOption[];
  proteins: MenuOption[];
  sauce: MenuOption | null;

  baseMode?: "single" | "double" | "half";
  proteinMode?: "single" | "double" | "half";

  toppings: string[];

  quantity: number;
  price: number;
}