import React, { createContext, useContext, useState } from "react";
import { API } from "../Pages/Global";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  // fetch cart count for logged-in user
  const fetchCartCount = async () => {
    const user_id = localStorage.getItem("id");
    if (!user_id) {
      setCartCount(0);
      return;
    }
    try {
      const res = await fetch(`${API}/cart/${user_id}`);
      const data = await res.json();
      setCartCount(data.length);
    } catch (err) {
      console.error("Cart fetch error:", err);
    }
  };

  // Increment / decrement for instant updates
  const incrementCart = () => setCartCount((prev) => prev + 1);
  const decrementCart = () => setCartCount((prev) => Math.max(prev - 1, 0));

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        fetchCartCount,
        incrementCart,
        decrementCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
