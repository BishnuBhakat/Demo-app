import { createContext, useContext, useMemo, useState } from "react";
import type { CartItem } from "@/types/cart";
import { Alert } from "react-native";
type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  increaseQty: (id: string, type: CartItem["type"]) => void;
  decreaseQty: (id: string, type: CartItem["type"]) => void;
  removeFromCart: (id: string, type: CartItem["type"]) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ Key = id + type (so clothing id and grocery id won't collide)
  const keyOf = (id: string, type: CartItem["type"]) => `${type}:${id}`;

  // ✅ Add item or increase quantity
  // const addToCart = (item: CartItem) => {
  //   setCart((prev) => {
  //     const existing = prev.find((p) => p.id === item.id);

  //     if (existing) {
  //       return prev.map((p) =>
  //         p.id === item.id
  //           ? { ...p, quantity: p.quantity + 1 }
  //           : p
  //       );
  //     }

  //     return [...prev, { ...item, quantity: 1 }];
  //   });
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const k = keyOf(item.id, item.type);
      const exists = prev.find((x) => keyOf(x.id, x.type) === k);

      if (exists) {
        // ✅ If same item added again -> increase quantity
        return prev.map((x) =>
          keyOf(x.id, x.type) === k ? { ...x, quantity: x.quantity + 1 } : x
        );
      }

      // ✅ If new item -> add with quantity (default to 1)
      return [...prev, { ...item, quantity: item.quantity ?? 1 }];
    });
  };
    const increaseQty = (id: string, type: CartItem["type"]) => {
    setCart((prev) =>
      prev.map((x) =>
        x.id === id && x.type === type ? { ...x, quantity: x.quantity + 1 } : x
      )
    );
  };
  const decreaseQty = (id: string, type: CartItem["type"]) => {
    setCart((prev) =>
      prev
        .map((x) =>
          x.id === id && x.type === type ? { ...x, quantity: x.quantity - 1 } : x
        )
        .filter((x) => x.quantity > 0) // ✅ remove item if qty becomes 0
    );
  };
  const removeFromCart = (id: string, type: CartItem["type"]) => {
    setCart((prev) => prev.filter((x) => !(x.id === id && x.type === type)));
  };

  const clearCart = () => setCart([]);

  const totalItems = useMemo(
    () => cart.reduce((sum, i) => sum + i.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [cart]
  );
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

  // ✅ Update quantity
  // const updateQty = (id: string, qty: number) => {
  //   setCart((prev) =>
  //     prev.map((p) =>
  //       p.id === id ? { ...p, quantity: qty } : p
  //     )
  //   );
  // };

  // ✅ Remove item
  // const removeFromCart = (id: string) => {
  //   setCart((prev) => prev.filter((p) => p.id !== id));
  // };

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, updateQty, removeFromCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
