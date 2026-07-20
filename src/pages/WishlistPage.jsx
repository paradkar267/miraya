import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import API_URL from '../config';
import './WishlistPage.css';
import '../pages/CategoryPage.css'; // Reuse premium-grid styles

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  const [savedProducts, setSavedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSavedProducts(wishlist);
    setLoading(false);
  }, [wishlist]);

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>Your Wishlist</h1>
        <p>Curated selections for your unique style.</p>
      </div>

      <div className="container">
        {loading ? (
          <div style={{padding: '4rem', textAlign: 'center'}}>
            <h2>Loading your wishlist...</h2>
          </div>
        ) : savedProducts.length > 0 ? (
          <div className="premium-grid">
            {savedProducts.map((item) => (
              <div className="premium-card" key={item.id}>
                <div className="card-image-wrapper">
                  <img src={item.image} alt={item.name} loading="lazy" />
                  
                  <button 
                    className="wishlist-btn active"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(item);
                    }}
                    aria-label="Remove from wishlist"
                  >
                    <Heart size={16} fill="currentColor" />
                  </button>
                  <Link to={`/product/${String(item.id).split('-')[0]}/${String(item.id).split('-')[1] || item.id}`} state={{ product: item }}>
                    <div className="card-overlay"></div>
                  </Link>
                </div>
                <div className="card-info">
                  <h3>{item.name}</h3>
                  <div className="product-price">₹{item.price ? item.price.toLocaleString('en-IN') : 'N/A'}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-wishlist">
            <h2>Your wishlist is empty</h2>
            <p>Looks like you haven't added any items yet.</p>
            <Link to="/collection/kurtis" className="premium-link">
              Explore Collections <span className="arrow">⟶</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
