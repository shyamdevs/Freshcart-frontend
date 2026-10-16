import { createContext, useEffect, useState, useCallback } from 'react';
import axiosInstance from '../axiosInstance';
import { getUser } from '../auth';

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const getCartCount = useCallback(async () => {
    const user = getUser();
    if (!user) { setCartCount(0); return; }
    try {
      const res = await axiosInstance.post('/cartcount', { email: user.email });
      if (res.data.status) setCartCount(res.data.count);
    } catch { /* ignore */ }
  }, []);

  const getWishlistCount = useCallback(async () => {
    const user = getUser();
    if (!user) { setWishlistCount(0); return; }
    try {
      const res = await axiosInstance.post('/wishlistcount', { email: user.email });
      if (res.data.status) setWishlistCount(res.data.count);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    getCartCount();
    getWishlistCount();
  }, [getCartCount, getWishlistCount]);

  return (
    <CartContext.Provider value={{ cartCount, wishlistCount, getCartCount, getWishlistCount }}>
      {children}
    </CartContext.Provider>
  );
}