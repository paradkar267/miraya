import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Star, Heart, ZoomIn, Search, Minus, Plus, ShieldCheck, Truck, Lock, Flower2 } from 'lucide-react';
import API_URL from '../config';
import ConfirmModal from '../components/ConfirmModal';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { category, id } = useParams();
  const location = useLocation();
  const initialProduct = location.state?.product || null;

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [confirmConfig, setConfirmConfig] = useState(null);
  
  const navigate = useNavigate();
  const { addToCart: contextAddToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const buyNow = () => {
    addToCart();
    navigate('/account', { state: { tab: 'cart' } });
  };

  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(!initialProduct);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail-page not-found" style={{padding: '120px 20px', textAlign: 'center'}}>
        <h2>Loading Outfit...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page not-found">
        <h2>Outfit not found</h2>
        <Link to="/collection/all" className="back-link">Return to Collection</Link>
      </div>
    );
  }

  const formatCategoryName = (cat) => {
    if (cat === 'coord-sets') return 'Co-ord Sets';
    if (cat === 'wedding') return 'Wedding';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  // Use different angles for gallery thumbnails
  const galleryImages = product.gallery || [
    product.image, 
    '/saree_angle_side.png', 
    '/saree_angle_back.png', 
    '/saree_detail.png'
  ];

  const addToCart = () => {
    contextAddToCart({
      id: product.id,
      title: product.title,
      price: typeof product.price === 'string' ? parseInt(product.price.replace(/,/g, '').replace('₹', '')) : product.price,
      image: product.image
    }, 'M', quantity); // Assume a default size of M if none specified, matching original behavior somewhat

    setConfirmConfig({
      message: 'Added to Bag',
      subMessage: `${product.title} has been successfully added to your shopping bag.`,
      confirmText: 'Continue',
      isAlert: true,
      isSuccess: true
    });
  };

  return (
    <div className="product-detail-page">
      <ConfirmModal config={confirmConfig} onClose={() => setConfirmConfig(null)} />
      <div className="container product-container">
        <div className="back-nav">
          <Link to={`/collection/${product.category}`} className="back-link">
            <ArrowLeft size={16} /> Back to {formatCategoryName(product.category)}
          </Link>
        </div>

        <div className="product-detail-grid">
          {/* LEFT: Image Gallery */}
          <div className="product-gallery">
            <div className="thumbnail-list">
              {galleryImages.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail-item ${index === activeImageIndex ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={img} alt={`${product.title} view ${index + 1}`} />
                </div>
              ))}
              <button className="thumbnail-more">
                <ArrowLeft size={16} style={{transform: 'rotate(-90deg)'}} />
              </button>
            </div>
            
            <div className="product-main-img-wrapper">
              <img src={galleryImages[activeImageIndex]} alt={product.title} className="product-main-img" />
              <button className="zoom-btn">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="product-info-container">
            <div className="product-meta">
              <span className="product-category-tag">{formatCategoryName(product.category)}</span>
            </div>
            
            <h1 className="product-title">{product.title}</h1>
            
            <div className="product-description">
              <p>
                {product.description || `A sheer, breathtaking piece with hand-scalloped borders and scattered sequin rain. A modern interpretation of classic romance.`}
              </p>
            </div>

            <div className="product-reviews-price">
              <div className="reviews-row" style={{ display: 'none' }}>
              </div>
              <div className="price-row">
                <span className="price-amount">₹ {product.price ? product.price.toLocaleString('en-IN') : '24,500'}</span>
                <span className="price-tax">Inclusive of all taxes</span>
              </div>
            </div>

            <div className="decorative-divider">
              <span className="line"></span>
              <Flower2 size={18} color="#C6A46A" />
              <span className="line"></span>
            </div>

            <div className="feature-highlights">
              <div className="feature-box">
                <Flower2 size={24} color="#C6A46A" />
                <span>Premium<br/>{product.fabric || 'Organza Silk'}</span>
              </div>
              <div className="feature-box">
                <Star size={24} color="#C6A46A" />
                <span>Handcrafted<br/>Details</span>
              </div>
              <div className="feature-box">
                <Heart size={24} color="#C6A46A" />
                <span>Lightweight<br/>& Breathable</span>
              </div>
            </div>

            <div className="product-attributes-compact">
              <div className="attr-row">
                <span className="attr-label">Fabric:</span>
                <span className="attr-value">{product.fabric || 'Silk'}</span>
              </div>
              <div className="attr-row">
                <span className="attr-label">Color:</span>
                <span className="attr-value">{product.color || 'Red'}</span>
              </div>
              <div className="attr-row">
                <span className="attr-label">Craftsmanship:</span>
                <span className="attr-value">Handcrafted Details</span>
              </div>
            </div>
            <div className="purchase-actions">
              <div className="quantity-selector">
                <span className="qty-label">Quantity:</span>
                <div className="qty-controls">
                  <button onClick={handleDecrease}><Minus size={14} /></button>
                  <span className="qty-value">{quantity}</span>
                  <button onClick={handleIncrease}><Plus size={14} /></button>
                </div>
              </div>
              
              <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                <button className="inquire-btn-new" onClick={addToCart} style={{background: 'var(--primary-burgundy)', color: 'white', flex: 1, minWidth: '150px'}}>
                  ADD TO CART
                </button>
                <button className="inquire-btn-new" onClick={buyNow} style={{background: '#8a1f1f', color: 'white', flex: 1, minWidth: '150px'}}>
                  BUY NOW
                </button>
              </div>
              
              <div style={{marginTop: '1rem', display: 'flex', justifyContent: 'center'}}>
                <button 
                  className="wishlist-btn-text" 
                  onClick={() => toggleWishlist({
                    id: `${product.category || category}-${product.id}`,
                    name: product.title,
                    price: product.price,
                    image: product.image
                  })}
                  style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: 'none', border: 'none', color: 'var(--text-dark)', fontSize: '1rem', padding: '0.5rem'}}
                >
                  <Heart 
                    size={20} 
                    fill={isInWishlist(`${product.category || category}-${product.id}`) ? "var(--primary-burgundy)" : "none"} 
                    color={isInWishlist(`${product.category || category}-${product.id}`) ? "var(--primary-burgundy)" : "currentColor"} 
                  /> 
                  {isInWishlist(`${product.category || category}-${product.id}`) ? "Remove from Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </div>

            <div className="trust-badges">
              <div className="badge">
                <Lock size={16} color="#C6A46A" />
                <span>Secure Shopping</span>
              </div>
              <div className="badge">
                <ShieldCheck size={16} color="#C6A46A" />
                <span>Quality Assured</span>
              </div>
              <div className="badge">
                <Truck size={16} color="#C6A46A" />
                <span>Pan India Shipping</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
