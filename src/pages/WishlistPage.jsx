import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { getProductById } from '../data/products';
import './WishlistPage.css';
import '../pages/CategoryPage.css'; // Reuse premium-grid styles

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  // Convert the array of uniqueIds into actual product objects
  const savedProducts = wishlist
    .map(id => getProductById(id))
    .filter(Boolean); // Remove any nulls in case data changed

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>Your Wishlist</h1>
        <p>Curated selections for your unique style.</p>
      </div>

      <div className="container">
        {savedProducts.length > 0 ? (
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
