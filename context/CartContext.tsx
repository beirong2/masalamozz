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


function addItem(item: CartItem) {
  setCart((prev) => {
    const existingIndex = prev.findIndex((cartItem) => {
      // Signature item comparison
      if (cartItem.signature && item.signature) {
        return cartItem.signature === item.signature;
      }

      // Build your own bowl comparison
      return (
        !cartItem.signature &&
        !item.signature &&
        cartItem.bases.some(
          (b) => b.name === item.bases[0]?.name
        ) &&
        cartItem.proteins.some(
          (p) => p.name === item.proteins[0]?.name
        ) &&
        cartItem.baseMode === item.baseMode &&
        cartItem.proteinMode === item.proteinMode &&
        cartItem.sauce?.name === item.sauce?.name &&
        JSON.stringify(cartItem.toppings) ===
          JSON.stringify(item.toppings)
      );
    });

    if (existingIndex !== -1) {
      return prev.map((cartItem, index) =>
        index === existingIndex
          ? {
              ...cartItem,
              quantity: cartItem.quantity + item.quantity,
            }
          : cartItem
      );
    }

    return [...prev, item];
  });
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