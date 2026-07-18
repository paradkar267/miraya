import { useParams, useLocation, Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronDown, LayoutGrid, RefreshCw, Scissors, Layers, Flower, ShieldCheck, Sparkles, Gem, Shirt, Scissors as ScissorsIcon } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import API_URL from '../config';
import './CategoryPage.css';

const Ornament = () => (
  <div className="ornament-container">
    <div className="line"></div>
    <div className="diamond">
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="ornament-icon"><path d="M12 2L15 12L12 22L9 12Z"/></svg>
    </div>
    <div className="line"></div>
  </div>
);

const CornerOrnament = ({ className }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M0 20 Q 20 20 20 0 M20 40 Q 20 20 40 20" stroke="#c6a46a" strokeWidth="1" />
  </svg>
);

const CategoryPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  
  const displayTitle = category === 'all'
    ? 'All Collections'
    : category === 'coord-sets' 
      ? 'Co-ord Sets' 
      : category.charAt(0).toUpperCase() + category.slice(1);

  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);

  const availableCategories = ['lehengas', 'sarees', 'wedding', 'kurtis', 'coord-sets'];
  const availableFabrics = useMemo(() => Array.from(new Set(samples.map(item => item.fabric).filter(Boolean))), [samples]);

  const handleCheckboxChange = (setState, value) => {
    setState(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...samples];
    if (category === 'all' && selectedCategories.length > 0) {
      result = result.filter(item => selectedCategories.includes(item.category));
    }
    if (selectedFabrics.length > 0) {
      result = result.filter(item => selectedFabrics.includes(item.fabric));
    }
    return result;
  }, [samples, category, selectedCategories, selectedFabrics]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = category === 'all' 
          ? `${API_URL}/api/products` 
          : `${API_URL}/api/products?category=${category}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setSamples(data);
        }
      } catch (err) {
        console.error("Failed to fetch category products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();

    if (!location.hash) {
      window.scrollTo(0, 0);
    }
    setSelectedCategories([]);
    setSelectedFabrics([]);
  }, [category, location.hash]);

  const handleWishlistToggle = (itemId, cat, e) => {
    e.preventDefault();
    e.stopPropagation();
    const uniqueId = `${cat}-${itemId}`;
    toggleWishlist(uniqueId);
  };

  const formatCategoryName = (cat) => {
    if (cat === 'coord-sets') return 'Co-ord Sets';
    if (cat === 'wedding') return 'Wedding';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  const getCategoryIcon = (cat) => {
    switch(cat) {
      case 'lehengas': return <Sparkles size={16} />;
      case 'sarees': return <Layers size={16} />;
      case 'wedding': return <Gem size={16} />;
      case 'kurtis': return <Shirt size={16} />;
      case 'coord-sets': return <LayoutGrid size={16} />;
      default: return <Sparkles size={16} />;
    }
  };

  const getFabricColor = (fabric) => {
    const map = {
      'Silk': '#fdf2e9',
      'Georgette': '#e0d8d0',
      'Velvet': '#5e0a0b',
      'Brocade': '#c6a46a',
      'Crepe': '#8b8378',
      'Cotton Silk': '#f0e6d2',
      'Cotton': '#fcfbfa',
      'Chiffon': '#d2b48c',
      'Net': '#2f4f4f'
    };
    return map[fabric] || '#ccc';
  };

  return (
    <div className="category-page">
      <div className="category-header-banner">
        <div className="banner-content">
          <div className="pre-heading-container">
            <span className="gold-diamond">◈</span>
            <span className="pre-heading">EXCLUSIVE COLLECTION</span>
            <span className="gold-diamond">◈</span>
          </div>
          <h1>{displayTitle}</h1>
          <p>Explore our exclusive collection of handcrafted {displayTitle.toLowerCase()},<br/>where timeless tradition meets modern elegance.</p>
          <Ornament />
        </div>
      </div>

      <div className="container category-layout">
        
        {/* SIDEBAR FILTERS */}
        <aside className="filter-sidebar">
          <div className="corner-tl"></div>
          <div className="corner-tr"></div>
          <div className="corner-bl"></div>
          <div className="corner-br"></div>
          <div className="sidebar-sticky">
            <h2 className="sidebar-title">FILTERS</h2>
            <Ornament />
            
            {category === 'all' && (
              <div className="filter-section">
                <h3 className="filter-heading">CATEGORY</h3>
                <div className="checkbox-list">
                  {availableCategories.map(cat => (
                    <label key={cat} className={`custom-checkbox ${selectedCategories.includes(cat) ? 'active' : ''}`}>
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCheckboxChange(setSelectedCategories, cat)}
                      />
                      <span className="checkmark"></span>
                      <span className="cat-icon">{getCategoryIcon(cat)}</span>
                      {formatCategoryName(cat)}
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            <Ornament />

            {availableFabrics.length > 0 && (
              <div className="filter-section">
                <h3 className="filter-heading">FABRIC</h3>
                <div className="checkbox-list">
                  {availableFabrics.map(fabric => (
                    <label key={fabric} className={`custom-checkbox fabric-checkbox ${selectedFabrics.includes(fabric) ? 'active' : ''}`}>
                      <input 
                        type="checkbox" 
                        checked={selectedFabrics.includes(fabric)}
                        onChange={() => handleCheckboxChange(setSelectedFabrics, fabric)}
                      />
                      <span className="fabric-swatch" style={{ backgroundColor: getFabricColor(fabric) }}></span>
                      {fabric}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button className="clear-filters-btn" onClick={() => {
              setSelectedCategories([]);
              setSelectedFabrics([]);
            }}>
              <RefreshCw size={14} className="mr-2" /> CLEAR FILTERS
            </button>
          </div>
        </aside>

        {/* MAIN PRODUCT GRID */}
        <main className="product-main">
          
          <div className="sort-bar-top">
            <div className="results-count">
              Showing {filteredAndSortedProducts.length} of {samples.length} results
            </div>
            <div className="sort-controls">
              <div className="custom-sort-dropdown">
                <div className="sort-trigger">
                  Sort by: Featured <ChevronDown size={14} className="ml-1" />
                </div>
              </div>
              <button className="grid-toggle-btn">
                <LayoutGrid size={18} />
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{padding: '4rem', textAlign: 'center', gridColumn: '1/-1', width: '100%'}}>
              <RefreshCw className="spin" size={32} color="var(--primary-burgundy)" style={{margin: '0 auto 1rem'}} />
              <p>Loading collection...</p>
            </div>
          ) : filteredAndSortedProducts.length > 0 ? (
            <motion.div layout className="premium-grid">
              <AnimatePresence>
              {filteredAndSortedProducts.map((item, index) => {
                const uniqueId = `${item.category}-${item.id}`;
                const isWishlisted = isInWishlist(uniqueId);
                const isNew = index < 4; // Mocking 'NEW' tag for first 4 items
                
                return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={uniqueId} 
                  id={`item-${uniqueId}`} 
                  className="premium-card"
                >
                  <div className="card-image-wrapper">
                    {isNew && <span className="new-badge">NEW</span>}
                    <button 
                      className={`wishlist-btn-card ${isWishlisted ? 'active' : ''}`}
                      onClick={(e) => handleWishlistToggle(item.id, item.category, e)}
                    >
                      <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                    <Link to={`/product/${item.category}/${item.id}`}>
                      <img src={item.image || `https://source.unsplash.com/random/400x600/?${item.category}`} alt={item.title} loading="lazy" />
                    </Link>
                  </div>
                  <div className="card-info">
                    <h3>{item.title}</h3>
                    <div className="product-price">{item.price}</div>
                  </div>
                  </motion.div>
                );
              })}
              </AnimatePresence>
            </motion.div>
          ) : samples.length > 0 ? (
            <div className="no-items">
              <h2>No items match your filters.</h2>
            </div>
          ) : (
            <div className="no-items">
              <h2>Collection coming soon.</h2>
            </div>
          )}
        </main>
      </div>

      <div className="container">
        <div className="features-section">
          <CornerOrnament className="corner-top-left" />
          <CornerOrnament className="corner-top-right" />
          <CornerOrnament className="corner-bottom-left" />
          <CornerOrnament className="corner-bottom-right" />
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <ScissorsIcon size={24} color="#dfc28d" />
            </div>
            <div className="feature-text">
              <h4>Handcrafted<br/>with Love</h4>
              <p>Each piece is a masterpiece crafted by skilled artisans.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <Layers size={24} color="#dfc28d" />
            </div>
            <div className="feature-text">
              <h4>Premium<br/>Quality Fabrics</h4>
              <p>We use the finest fabrics for unmatched comfort.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <Flower size={24} color="#dfc28d" />
            </div>
            <div className="feature-text">
              <h4>Timeless<br/>Designs</h4>
              <p>Elegant silhouettes that never go out of style.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <ShieldCheck size={24} color="#dfc28d" />
            </div>
            <div className="feature-text">
              <h4>Trusted<br/>by Thousands</h4>
              <p>Loved by our customers across the globe.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
