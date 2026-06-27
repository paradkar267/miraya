import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getAllProducts } from '../data/products';
import './SearchPage.css';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (query) {
      const allProducts = getAllProducts();
      const filtered = allProducts.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);



  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Search Results</h1>
        {query ? (
          <p>Showing {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"</p>
        ) : (
          <p>Please enter a search query to find products.</p>
        )}
      </div>

      <div className="container">
        {results.length > 0 ? (
          <div className="premium-grid">
            {results.map((item) => {
              const uniqueId = `${item.category}-${item.id}`;
              return (
                <div key={uniqueId} className="premium-card">
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
                </div>
              );
            })}
          </div>
        ) : query ? (
          <div className="no-items">
            <h2>No matches found.</h2>
            <p>Try searching for terms like "Silk", "Velvet", or "Lehenga".</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchPage;
