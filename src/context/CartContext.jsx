import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('miraya_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn("Failed to read cart from localStorage", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('miraya_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn("Failed to save cart to localStorage", e);
    }
  }, [cartItems]);

  const addToCart = (product, size, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size 
            ? { ...item, qty: item.qty + qty } 
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, qty }];
    });
  };

  const updateQuantity = (id, size, qty) => {
    setCartItems(prev => prev.map(item => 
      item.id === id && item.selectedSize === size ? { ...item, qty } : item
    ));
  };

  const removeFromCart = (id, size) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);

  const value = {
    cartItems,
    setCartItems, // Added for AccountPage backward compatibility
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
