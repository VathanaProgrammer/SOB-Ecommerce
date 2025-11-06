"use client";
import { createContext, useContext, ReactNode, useState } from "react";

type CartItem = {
  id: number;
  title: string;
  price: number;
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  total: number;
  add: (product: Omit<CartItem, "qty">, deltaQty: number) => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  total: 0,
  add: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const add = (product: Omit<CartItem, "qty">, deltaQty: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        existing.qty += deltaQty;
        if (existing.qty <= 0) prev = prev.filter((i) => i.id !== product.id);
      } else if (deltaQty > 0) {
        prev.push({ ...product, qty: deltaQty });
      }
      return [...prev];
    });

    setTotal((prevTotal) => Math.max(0, prevTotal + product.price * deltaQty));
  };

  return (
    <CartContext.Provider value={{ items, total, add }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
