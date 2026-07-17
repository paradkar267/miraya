import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Star, Heart, ZoomIn, Search, Minus, Plus, ShieldCheck, Truck, Lock, Flower2 } from 'lucide-react';
// removed static product import
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { category, id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const existingCart = JSON.parse(localStorage.getItem('miraya_cart') || '[]');
    const existingItem = existingCart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.qty += quantity;
    } else {
      existingCart.push({
        id: product.id,
        title: product.title,
        price: typeof product.price === 'string' ? parseInt(product.price.replace(/,/g, '').replace('₹', '')) : product.price,
        image: product.image,
        qty: quantity
      });
    }
    
    localStorage.setItem('miraya_cart', JSON.stringify(existingCart));
    alert(`${product.title} added to your cart!`);
  };

  return (
    <div className="product-detail-page">
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
              <div className="reviews-row">
                <div className="stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#C6A46A" color="#C6A46A" />)}
                </div>
                <span className="review-count">4.9 (128 reviews)</span>
                <span className="bestseller-badge">
                  <Flower2 size={12} /> Bestseller
                </span>
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
                <button className="inquire-btn-new" onClick={addToCart} style={{background: 'var(--primary-burgundy)', color: 'white', flex: 1, minWidth: '200px'}}>
                  ADD TO CART
                </button>
                
                <button className="wishlist-btn" style={{flex: 1, minWidth: '200px'}}>
                  <Heart size={18} /> Add to Wishlist
                </button>
              </div>
              
              <Link to="/contact" className="inquire-btn-new" style={{width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'center'}}>
                INQUIRE ABOUT THIS OUTFIT <ArrowLeft size={16} style={{transform: 'rotate(180deg)', marginLeft: '10px'}} />
              </Link>
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
