import { createContext, useContext, useState } from "react";
import type { CartItem } from "@/types/cart";
import { Alert } from "react-native";

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ Add item or increase quantity
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);

      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
     // ✅ GLOBAL MESSAGE (WORKS FROM ANY PAGE)
    Alert.alert(
      "Added to Cart",
      `${item.name} has been added to your cart`
    );
  };

  // ✅ Update quantity
  const updateQty = (id: string, qty: number) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: qty } : p
      )
    );
  };

  // ✅ Remove item
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};
