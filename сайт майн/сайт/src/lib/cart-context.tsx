"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  type: "rank" | "case" | "currency";
  name: string;
  price: number;
  quantity: number;
  color?: string;
}

interface CartContextType {
  items: CartItem[];
  username: string;
  setUsername: (u: string) => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("vexium_cart");
      const savedUser = localStorage.getItem("vexium_username");
      if (saved) setItems(JSON.parse(saved));
      if (savedUser) setUsername(savedUser);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("vexium_cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (username) localStorage.setItem("vexium_username", username);
  }, [username]);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) return removeItem(id);
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, username, setUsername, addItem, removeItem, updateQty, clearCart, total, count }}
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
