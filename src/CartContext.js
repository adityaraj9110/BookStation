import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (book) => {
    setCartItems((prevItems) => [...prevItems, book]);
  };

  const removeFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartItemCount = () => {
    return cartItems.length;
  };

  

  const cartContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartItemCount,
    setCartItems
  };

  return ( 
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
}
