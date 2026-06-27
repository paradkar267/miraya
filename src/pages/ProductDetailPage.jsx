import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { productsData, getAllProducts } from '../data/products';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { category, id } = useParams();

  // Find the product
  let product = null;
  if (category === 'all') {
    product = getAllProducts().find(p => p.id === parseInt(id));
  } else {
    product = (productsData[category] || []).find(p => p.id === parseInt(id));
  }

  // Fallback if accessed via global search but category is missing
  if (!product) {
    product = getAllProducts().find(p => p.id === parseInt(id));
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="back-nav">
          <Link to={`/collection/${product.category}`} className="back-link">
            <ArrowLeft size={20} /> Back to {formatCategoryName(product.category)}
          </Link>
        </div>

        <div className="product-detail-grid">
          <div className="product-image-container">
            <img src={product.image} alt={product.title} className="product-main-img" />
          </div>

          <div className="product-info-container">
            <div className="product-meta">
              <span className="product-category-tag">{formatCategoryName(product.category)}</span>
            </div>
            
            <h1 className="product-title">{product.title}</h1>
            
            <div className="product-description">
              <p>
                {product.description || `Experience the epitome of luxury and craftsmanship. This exquisite piece from our ${formatCategoryName(product.category)} collection is meticulously designed to celebrate elegance and grace.`}
              </p>
            </div>

            <div className="product-attributes">
              <div className="attribute-row">
                <span className="attr-label">Fabric:</span>
                <span className="attr-value">{product.fabric || 'Premium Blend'}</span>
              </div>
              <div className="attribute-row">
                <span className="attr-label">Color:</span>
                <span className="attr-value">{product.color || 'Signature Tone'}</span>
              </div>
              <div className="attribute-row">
                <span className="attr-label">Craftsmanship:</span>
                <span className="attr-value">Handcrafted Details</span>
              </div>
            </div>

            <div className="product-actions">
              <Link to="/contact" className="inquire-btn">
                Inquire About This Outfit
              </Link>
              <p className="inquire-hint">Contact our atelier for custom fittings and availability.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
