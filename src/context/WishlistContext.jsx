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
      return saved ? JSON.parse(saved) : [];
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

  const toggleWishlist = (uniqueId) => {
    setWishlist(prev => 
      prev.includes(uniqueId) 
        ? prev.filter(id => id !== uniqueId) 
        : [...prev, uniqueId]
    );
  };

  const isInWishlist = (uniqueId) => {
    return wishlist.includes(uniqueId);
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
