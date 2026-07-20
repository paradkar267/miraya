import { useParams, useLocation, Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronDown, ChevronUp, LayoutGrid, List, RefreshCw, ShoppingBag, Sparkles, Gem, Shirt, ArrowRight } from 'lucide-react';
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

  const availableCategories = ['kurtis', 'coord-sets', 'traditional'];
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

  const handleWishlistToggle = (item, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleWishlist({
      id: `${item.category}-${item.id}`,
      name: item.title,
      price: typeof item.price === 'string' ? parseInt(item.price.replace(/[^\d]/g, '') || '0') : item.price,
      image: item.image || `https://source.unsplash.com/random/400x600/?${item.category}`
    });
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
          <div className="ornament-container">
            <div className="line"></div>
            <div className="diamond">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="ornament-icon"><path d="M12 2L15 12L12 22L9 12Z"/></svg>
            </div>
            <div className="line"></div>
          </div>
        </div>
      </div>
      <div className="floral-bg-category"></div>
      <div className="container category-layout">
        
        {/* SIDEBAR FILTERS */}
        <aside className="filter-sidebar">
          <div className="sidebar-sticky">
            <h2 className="sidebar-title">FILTERS</h2>
            <div className="sidebar-ornament">
              <svg width="32" height="12" viewBox="0 0 32 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 1C16 1 19 6 16 11C13 6 16 1 16 1Z" stroke="#cda372" strokeWidth="1"/>
                <path d="M16 11C16 11 20 8 24 5C19 5 16 11 16 11Z" stroke="#cda372" strokeWidth="1"/>
                <path d="M16 11C16 11 12 8 8 5C13 5 16 11 16 11Z" stroke="#cda372" strokeWidth="1"/>
                <line x1="0" y1="5.5" x2="10" y2="5.5" stroke="#cda372" strokeWidth="1" />
                <line x1="22" y1="5.5" x2="32" y2="5.5" stroke="#cda372" strokeWidth="1" />
              </svg>
            </div>
            
            {category === 'all' && (
              <div className="filter-section">
                <div className="filter-heading-wrap">
                  <h3 className="filter-heading">CATEGORY</h3>
                  <ChevronUp size={14} className="filter-chevron" />
                </div>
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
                      <span className="cat-label">{formatCategoryName(cat)}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            <div className="sidebar-divider">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#cda372" strokeWidth="1"><path d="M12 2L15 12L12 22L9 12Z"/></svg>
            </div>

            {availableFabrics.length > 0 && (
              <div className="filter-section">
                <div className="filter-heading-wrap">
                  <h3 className="filter-heading">FABRIC</h3>
                  <ChevronUp size={14} className="filter-chevron" />
                </div>
                <div className="checkbox-list">
                  {availableFabrics.map(fabric => (
                    <label key={fabric} className={`custom-checkbox fabric-checkbox ${selectedFabrics.includes(fabric) ? 'active' : ''}`}>
                      <input 
                        type="checkbox" 
                        checked={selectedFabrics.includes(fabric)}
                        onChange={() => handleCheckboxChange(setSelectedFabrics, fabric)}
                      />
                      <span className="checkmark"></span>
                      <span className="fabric-swatch" style={{ backgroundColor: getFabricColor(fabric) }}></span>
                      <span className="cat-label">{fabric}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button className="clear-filters-btn" onClick={() => {
              setSelectedCategories([]);
              setSelectedFabrics([]);
            }}>
              RESET FILTERS <RefreshCw size={14} className="ml-2" />
            </button>
          </div>
        </aside>

        {/* MAIN PRODUCT GRID */}
        <main className="product-main">
          
          <div className="sort-bar-top">
            <div className="results-count">
              Showing <span className="highlight-count">{filteredAndSortedProducts.length}</span> of <span className="highlight-count">{samples.length}</span> results
            </div>
            <div className="sort-controls">
              <div className="custom-sort-dropdown">
                <div className="sort-trigger">
                  Sort by: Featured <ChevronDown size={14} className="ml-1" />
                </div>
              </div>
              <div className="view-toggles">
                <button className="grid-toggle-btn active">
                  <LayoutGrid size={16} />
                </button>
                <button className="list-toggle-btn">
                  <List size={16} />
                </button>
              </div>
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
                      onClick={(e) => handleWishlistToggle(item, e)}
                    >
                      <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                    <Link to={`/product/${item.category}/${item.id}`} state={{ product: item }}>
                      <img src={item.image || `https://source.unsplash.com/random/400x600/?${item.category}`} alt={item.title} loading="lazy" />
                    </Link>
                  </div>
                  <div className="card-info">
                    <h3>{item.title}</h3>
                    <div className="card-ornament">
                      <svg width="24" height="8" viewBox="0 0 24 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0" y1="4" x2="10" y2="4" stroke="#cda372" strokeWidth="1"/>
                        <line x1="14" y1="4" x2="24" y2="4" stroke="#cda372" strokeWidth="1"/>
                        <path d="M12 2L13.5 4L12 6L10.5 4L12 2Z" fill="#cda372"/>
                      </svg>
                    </div>
                    <div className="product-price">₹{parseInt(item.price.replace(/[^\d]/g, '') || '0').toLocaleString('en-IN')}</div>
                    
                    <div className="card-action-bar">
                      <Link to={`/product/${item.category}/${item.id}`} state={{ product: item }} className="view-details-link">
                        VIEW DETAILS <ArrowRight size={14} className="ml-1" />
                      </Link>
                      <button className="bag-btn">
                        <ShoppingBag size={14} />
                      </button>
                    </div>
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
      
      {filteredAndSortedProducts.length > 0 && !loading && (
        <div className="pagination-wrapper">
          <button className="page-nav-btn"><ChevronDown size={16} style={{transform: 'rotate(90deg)'}} /></button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <span className="page-dots">...</span>
          <button className="page-btn">7</button>
          <button className="page-nav-btn"><ChevronDown size={16} style={{transform: 'rotate(-90deg)'}} /></button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
