import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const addItem = (product) => {
    setCart(prev => ({
      ...prev,
      [product.id]: {
        ...product,
        quantity: (prev[product.id]?.quantity || 0) + 1
      }
    }));
  };

  const removeItem = (product) => {
    setCart(prev => {
      const current = prev[product.id];
      if (!current) return prev;

      if (current.quantity === 1) {
        const copy = { ...prev };
        delete copy[product.id];
        return copy;
      }

      return {
        ...prev,
        [product.id]: {
          ...current,
          quantity: current.quantity - 1
        }
      };
    });
  };

  const getTotal = () => {
    return Object.values(cart).reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};