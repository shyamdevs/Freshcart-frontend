import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const getCartCount = () => {
    axios.get("http://localhost:8080/cartcount").then((res) => {
      if (res.data.status) {
        setCartCount(res.data.count);
      }
    });
  };

  const getWishlistCount = () => {
    axios.get("http://localhost:8080/wishlistcount").then((res) => {
      if (res.data.status) {
        setWishlistCount(res.data.count);
      }
    });
  };

  useEffect(() => {
    getCartCount();
    getWishlistCount();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        wishlistCount,
        getCartCount,
        getWishlistCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}