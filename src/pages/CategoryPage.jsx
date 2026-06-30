import { useParams, useLocation, Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronDown } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { productsData, getAllProducts } from '../data/products';
import './CategoryPage.css';

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

  const samples = category === 'all' ? getAllProducts() : (productsData[category] || []);

  const availableCategories = ['lehengas', 'sarees', 'wedding', 'kurtis', 'coord-sets'];
  const availableFabrics = useMemo(() => Array.from(new Set(samples.map(item => item.fabric).filter(Boolean))), [samples]);

  // Handle multi-select checkboxes
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
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
    setSelectedCategories([]);
    setSelectedFabrics([]);
  }, [category]);

  useEffect(() => {
    if (location.hash) {
      // Small timeout ensures DOM is fully rendered before scrolling
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Highlight effect for the target element
          element.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.5)';
          element.style.transition = 'box-shadow 0.5s ease';
          setTimeout(() => { element.style.boxShadow = ''; }, 2000);
        }
      }, 100);
    }
  }, [location.hash, filteredAndSortedProducts]);

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

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>{displayTitle}</h1>
        <p>Explore our exclusive collection of handcrafted {displayTitle.toLowerCase()}.</p>
      </div>

      <div className="container category-layout">
        
        {/* SIDEBAR FILTERS */}
        <aside className="filter-sidebar">
          <h2 className="sidebar-title">FILTERS</h2>
          
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
                    {formatCategoryName(cat)}
                  </label>
                ))}
              </div>
            </div>
          )}

          {availableFabrics.length > 0 && (
            <div className="filter-section">
              <h3 className="filter-heading">FABRIC</h3>
              <div className="checkbox-list">
                {availableFabrics.map(fabric => (
                  <label key={fabric} className={`custom-checkbox ${selectedFabrics.includes(fabric) ? 'active' : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={selectedFabrics.includes(fabric)}
                      onChange={() => handleCheckboxChange(setSelectedFabrics, fabric)}
                    />
                    <span className="checkmark"></span>
                    {fabric}
                  </label>
                ))}
              </div>
            </div>
          )}

        </aside>

        {/* MAIN PRODUCT GRID */}
        <main className="product-main">
          {filteredAndSortedProducts.length > 0 ? (
            <motion.div layout className="premium-grid">
              <AnimatePresence>
              {filteredAndSortedProducts.map((item) => {
                const uniqueId = `${item.category}-${item.id}`;
                const isWishlisted = isInWishlist(uniqueId);
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
                    <img src={item.image} alt={item.title} loading="lazy" />

                    <div className="card-overlay">
                      <Link to={`/product/${item.category}/${item.id}`} className="view-details-btn">
                        View Details
                      </Link>
                    </div>
                  </div>
                  <div className="card-info">
                    <h3>{item.title}</h3>
                  </div>
                  </motion.div>
                );
              })}
              </AnimatePresence>
            </motion.div>
          ) : samples.length > 0 ? (
            <div className="no-items">
              <h2>No items match your filters.</h2>
              <button className="clear-filters-btn" onClick={() => {
                setSelectedCategories([]);
                setSelectedFabrics([]);
              }}>Clear Filters</button>
            </div>
          ) : (
            <div className="no-items">
              <h2>Collection coming soon.</h2>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
