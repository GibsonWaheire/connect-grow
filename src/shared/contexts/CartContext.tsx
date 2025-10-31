import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product, quantity: number = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === product.id);
      if (existing) {
        return prev.map(i => i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [
        ...prev,
        { productId: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, quantity }
      ];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems(prev => prev.map(i => i.productId === productId ? { ...i, quantity } : i));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const totalQuantity = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);

  const value = useMemo(() => ({ items, totalQuantity, subtotal, addItem, removeItem, updateQuantity, clear }), [items, totalQuantity, subtotal, addItem, removeItem, updateQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};


