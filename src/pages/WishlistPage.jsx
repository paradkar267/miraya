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
    const fetchWishlistProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/products`);
        if (res.ok) {
          const allProducts = await res.json();
          const filtered = allProducts.filter(p => wishlist.includes(`${p.category}-${p.id}`));
          setSavedProducts(filtered);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlistProducts();
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
              <div key={`${item.category}-${item.id}`} className="premium-card">
                <div className="card-image-wrapper">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  
                  <button 
                    className="wishlist-btn active"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(`${item.category}-${item.id}`);
                    }}
                    aria-label="Remove from wishlist"
                  >
                    <Heart 
                      size={20} 
                      fill="var(--primary-burgundy)" 
                      color="var(--primary-burgundy)" 
                    />
                  </button>

                  <div className="card-overlay">
                    <Link to={`/product/${item.category}/${item.id}`} className="view-details-btn">
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="card-info">
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-wishlist">
            <h2>Your wishlist is empty</h2>
            <p>Looks like you haven't added any items yet.</p>
            <Link to="/collection/lehengas" className="premium-link">
              Explore Collections <span className="arrow">⟶</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
