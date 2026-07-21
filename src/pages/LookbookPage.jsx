import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './LookbookPage.css';

const LookbookPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const signatureSlides = [
    {
      id: 1,
      image: "/kurti_mega.png",
      category: "ETHNIC ELEGANCE",
      title: <>Festive<br/>Kurtis</>,
      desc: "Intricate embroideries, rich fabrics and timeless designs for every celebration.",
      link: "/collection/kurtis"
    },
    {
      id: 2,
      image: "/collectionbg.png",
      category: "MODERN CLASSIC",
      title: <>Elegant<br/>Drapes</>,
      desc: "Fluid fabrics that move with you, designed for the contemporary woman.",
      link: "/collection/drapes"
    },
    {
      id: 3,
      image: "/saree_mega.png",
      category: "HERITAGE WEAVES",
      title: <>Woven<br/>Tales</>,
      desc: "Authentic handloom pieces that carry the legacy of Indian craftsmanship.",
      link: "/collection/heritage"
    },
    {
      id: 4,
      image: "/craftman.jpg",
      category: "ROYAL CHARM",
      title: <>Regal<br/>Sets</>,
      desc: "Statement pieces crafted for unforgettable moments and grand celebrations.",
      link: "/collection/royal"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === signatureSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? signatureSlides.length - 1 : prev - 1));
  };
  return (
    <div className="lookbook-page-new">
      <div className="lookbook-hero-new">
        
        {/* LEFT COLUMN */}
        <div className="lookbook-left-col">
          <div className="floral-bg-lookbook"></div>
          
          <div className="lookbook-content-wrapper">
            <div className="style-guide-label">
              <span className="line"></span>
              STYLE GUIDE
              <span className="line"></span>
            </div>

            <h1 className="lookbook-main-title">
              The Art of<br/>Styling <i>Kurtis</i>
            </h1>

            <div className="lotus-ornament">
              <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2C20 2 26 12 20 18C14 12 20 2 20 2Z" stroke="#cda372" strokeWidth="1.5"/>
                <path d="M20 18C20 18 28 14 32 10C26 10 20 18 20 18Z" stroke="#cda372" strokeWidth="1.5"/>
                <path d="M20 18C20 18 12 14 8 10C14 10 20 18 20 18Z" stroke="#cda372" strokeWidth="1.5"/>
                <line x1="10" y1="10" x2="30" y2="10" stroke="#cda372" strokeWidth="1.5" />
              </svg>
            </div>

            <p className="lookbook-desc">
              From desk to dinner, the kurti remains a versatile staple in every Indian woman's wardrobe. Pair our hand-embroidered kurtis with tailored trousers for a sharp daytime look, or elevate them with a heavy dupatta and statement jewelry for evening festivities. The key lies in the layering and accessories.
            </p>

            <Link to="/collection/kurtis" className="btn-shop-kurtis">
              <span className="btn-lotus">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L15 12L12 22L9 12Z"/>
                </svg>
              </span>
              SHOP KURTIS
              <span className="btn-arrow">→</span>
            </Link>

            <div className="lookbook-features">
              <div className="feature-item">
                <div className="feature-icon-circle">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M4 6h16M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6M4 6L12 3l8 3" />
                  </svg>
                </div>
                <span>TIMELESS<br/>DESIGNS</span>
              </div>
              
              <div className="feature-divider"></div>

              <div className="feature-item">
                <div className="feature-icon-circle">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="8" y1="8" x2="16" y2="16" />
                    <line x1="16" y1="8" x2="8" y2="16" />
                  </svg>
                </div>
                <span>HANDCRAFTED<br/>EMBROIDERY</span>
              </div>

              <div className="feature-divider"></div>

              <div className="feature-item">
                <div className="feature-icon-circle">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M12 22C12 22 4 15 4 9A8 8 0 0 1 20 9C20 15 12 22 12 22Z"/>
                    <path d="M12 2L12 10" />
                    <path d="M10 6L14 6" />
                  </svg>
                </div>
                <span>PREMIUM<br/>FABRICS</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lookbook-right-col">
          <div className="lookbook-image-wrapper">
            <img src="/kurti_mega.png" alt="Styling Kurtis" className="main-look-img" />
          </div>
        </div>

      </div>

      {/* SECTION 2: SIGNATURE STYLES (NEW BENTO GRID) */}
      <div className="signature-styles-wrapper">
        
        {/* Faint floral side branches */}
        <div className="floral-branch left"></div>
        <div className="floral-branch right"></div>

        <div className="signature-styles-header">
          <div className="style-guide-label">
            <span className="line"></span>
            CURATED LOOKS
            <span className="line"></span>
          </div>
          <h2 className="signature-title">
            <i>Signature</i> Styles
          </h2>
          <div className="lotus-ornament">
            <svg width="24" height="12" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 2C20 2 26 12 20 18C14 12 20 2 20 2Z" stroke="#cda372" strokeWidth="1.5"/>
              <path d="M20 18C20 18 28 14 32 10C26 10 20 18 20 18Z" stroke="#cda372" strokeWidth="1.5"/>
              <path d="M20 18C20 18 12 14 8 10C14 10 20 18 20 18Z" stroke="#cda372" strokeWidth="1.5"/>
              <line x1="10" y1="10" x2="30" y2="10" stroke="#cda372" strokeWidth="1.5" />
            </svg>
          </div>
          <p className="signature-subtitle">
            Timeless silhouettes, exquisite details & designs that speak elegance.
          </p>
        </div>

        <div className="signature-bento-grid">
          
          {/* Left Large Card */}
          <div className="bento-card large">
            <img src={signatureSlides[currentSlide].image} alt="Signature Look" className="bento-bg-img" />
            
            {/* The beige gradient overlay that fades out */}
            <div className="bento-gradient-overlay left-gradient"></div>

            <div className="bento-content">
              <div className="bento-category">{signatureSlides[currentSlide].category}</div>
              <h3 className="bento-heading">{signatureSlides[currentSlide].title}</h3>
              <p className="bento-desc">
                {signatureSlides[currentSlide].desc}
              </p>
              
              <Link to={signatureSlides[currentSlide].link} className="btn-bento-burgundy">
                EXPLORE KURTIS <span className="arrow-right">→</span>
              </Link>
            </div>

            {/* Bottom Slider Controls */}
            <div className="bento-slider-controls">
              <button className="slider-btn" onClick={prevSlide}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <div className="slider-dots">
                {signatureSlides.map((slide, index) => (
                  <span 
                    key={slide.id} 
                    className={`dot ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                    style={{ cursor: 'pointer' }}
                  ></span>
                ))}
              </div>
              <button className="slider-btn" onClick={nextSlide}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column Stack */}
          <div className="bento-col-right">
            
            {/* Top Right Card */}
            <div className="bento-card small">
              <img src="/craftman.jpg" alt="Indo-Western Looks" className="bento-bg-img" />
              <div className="bento-gradient-overlay left-gradient"></div>
              
              <div className="bento-content">
                <div className="bento-category">MODERN CHIC</div>
                <h3 className="bento-heading-sm">Indo-Western<br/>Looks</h3>
                <p className="bento-desc-sm">
                  Where tradition meets contemporary style.
                </p>
                <button className="btn-bento-round">→</button>
              </div>
            </div>

            {/* Bottom Right Card */}
            <div className="bento-card small">
              <img src="/craftsmanship-bg.png" alt="Handcrafted Details" className="bento-bg-img" />
              <div className="bento-gradient-overlay left-gradient"></div>
              
              <div className="bento-content">
                <div className="bento-category">CRAFTED WITH LOVE</div>
                <h3 className="bento-heading-sm">Handcrafted<br/>Details</h3>
                <p className="bento-desc-sm">
                  Artisanal techniques that make every piece unique.
                </p>
                <button className="btn-bento-round">→</button>
              </div>
            </div>

          </div>

        </div>



      </div>

    </div>
  );
};

export default LookbookPage;
