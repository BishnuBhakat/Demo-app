import React, { createContext, useContext, useMemo, useState } from "react";

export type CartType = "grocery" | "clothing";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  type: CartType;
};

type CartState = {
  grocery: CartItem[];
  clothing: CartItem[];
};

type CartContextType = {
  cart: CartState;
  addToCart: (item: CartItem) => void;
  increaseQty: (id: string, type: CartType) => void;
  decreaseQty: (id: string, type: CartType) => void;
  removeFromCart: (id: string, type: CartType) => void;
  clearCart: (type?: CartType) => void;

  groceryTotal: number;
  clothingTotal: number;
  groceryCount: number;
  clothingCount: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>({ grocery: [], clothing: [] });

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const list = prev[item.type];
      const exists = list.find((x) => x.id === item.id);

      const updated = exists
        ? list.map((x) => (x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x))
        : [...list, { ...item, quantity: 1 }];

      return { ...prev, [item.type]: updated };
    });
  };

  const increaseQty = (id: string, type: CartType) => {
    setCart((prev) => ({
      ...prev,
      [type]: prev[type].map((x) => (x.id === id ? { ...x, quantity: x.quantity + 1 } : x)),
    }));
  };

  const decreaseQty = (id: string, type: CartType) => {
    setCart((prev) => ({
      ...prev,
      [type]: prev[type]
        .map((x) => (x.id === id ? { ...x, quantity: x.quantity - 1 } : x))
        .filter((x) => x.quantity > 0),
    }));
  };

  const removeFromCart = (id: string, type: CartType) => {
    setCart((prev) => ({ ...prev, [type]: prev[type].filter((x) => x.id !== id) }));
  };

  const clearCart = (type?: CartType) => {
    if (!type) setCart({ grocery: [], clothing: [] });
    else setCart((prev) => ({ ...prev, [type]: [] }));
  };

  const groceryTotal = useMemo(
    () => cart.grocery.reduce((s, i) => s + i.price * i.quantity, 0),
    [cart.grocery]
  );
  const clothingTotal = useMemo(
    () => cart.clothing.reduce((s, i) => s + i.price * i.quantity, 0),
    [cart.clothing]
  );

  const groceryCount = useMemo(() => cart.grocery.reduce((s, i) => s + i.quantity, 0), [cart.grocery]);
  const clothingCount = useMemo(() => cart.clothing.reduce((s, i) => s + i.quantity, 0), [cart.clothing]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        groceryTotal,
        clothingTotal,
        groceryCount,
        clothingCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
