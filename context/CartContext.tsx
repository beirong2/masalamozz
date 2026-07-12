"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { CartItem } from "@/types/cart";

interface CartContextType {
  cart: CartItem[];

  addItem: (item: CartItem) => void;

  removeItem: (id: string) => void;

  increaseQuantity: (id: string) => void;

  decreaseQuantity: (id: string) => void;

  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
const [cart, setCart] = useState<CartItem[]>([]);
const [loaded, setLoaded] = useState(false);

useEffect(() => {
  const saved = localStorage.getItem("cart");

  if (saved) {
    setCart(JSON.parse(saved));
  }

  setLoaded(true);
}, []);

useEffect(() => {
  if (loaded) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}, [cart, loaded]);

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);


  function addItem(item: CartItem) {
    setCart((prev) => [...prev, item]);
  }

  function removeItem(id: string) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function increaseQuantity(id: string) {
  setCart((prev) =>
    prev.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    )
  );
  }

  function decreaseQuantity(id: string) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}