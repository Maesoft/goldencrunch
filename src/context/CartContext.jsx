import { createContext, useState } from "react";

export const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [sauces, setSauces] = useState({});

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

 const addSauce = (sauceId) => {
    setSauces(prev => ({
      ...prev,
      [sauceId]: (prev[sauceId] || 0) + 1
    }));
  };

  const removeSauce = (sauceId) => {
    setSauces(prev => {
      const current = prev[sauceId] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[sauceId];
        return copy;
      }

      return {
        ...prev,
        [sauceId]: current - 1
      };
    });
  };

  const getTotalSauces = () => {
    return Object.values(sauces).reduce((acc, qty) => acc + qty, 0);
  };

  // ------------------------
  // 🧠 LÓGICA DE NEGOCIO
  // ------------------------

  const getFreeSauces = () => {
    return Object.values(cart).reduce(
      (acc, item) => acc + (item.freeSauces || 0) * item.quantity,
      0
    );
  };

  const getPaidSauces = () => {
    return Math.max(0, getTotalSauces() - getFreeSauces());
  };

  const getSauceCost = () => {
    return getPaidSauces() * 1500;
  };

  const getFinalTotal = () => {
    return getTotal() + getSauceCost();
  };

  // ------------------------

  return (
    <CartContext.Provider
      value={{
        cart,
        sauces,
        addItem,
        removeItem,
        addSauce,
        removeSauce,
        getTotal,
        getFinalTotal,
        getFreeSauces,
        getPaidSauces,
        getTotalSauces
      }}
    >
      {children}
    </CartContext.Provider>
  );
};