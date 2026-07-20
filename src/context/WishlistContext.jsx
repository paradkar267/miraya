import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  // Initialize from localStorage or empty array
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('miraya_wishlist');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed.filter(i => typeof i === 'object' && i !== null && i.id) : [];
    } catch (e) {
      console.warn("Failed to read wishlist from localStorage", e);
      return [];
    }
  });

  // Save to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('miraya_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Failed to save wishlist to localStorage", e);
    }
  }, [wishlist]);

  const toggleWishlist = (productObj) => {
    setWishlist(prev => 
      prev.some(item => item.id === productObj.id)
        ? prev.filter(item => item.id !== productObj.id) 
        : [...prev, productObj]
    );
  };

  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id);
  };

  const wishlistCount = wishlist.length;

  const value = {
    wishlist,
    toggleWishlist,
    isInWishlist,
    wishlistCount
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
