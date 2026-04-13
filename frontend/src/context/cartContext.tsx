import { createContext, useContext, useState } from "react";
import { products } from "../data/products.ts";

type CartItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};
type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
 const [cart, setCart] = useState<CartItem[]>(
  products.map((p) => ({
    _id: String(p.id),
    name: p.name,
    price: p.price,
    image: p.image,
    quantity: 1,
  }))
);


  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((p) => p._id === item._id);

      if (existing) {
        return prev.map((p) =>
          p._id === item._id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
  setCart((prev) => prev.filter((item) => item._id !== id));
};

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};