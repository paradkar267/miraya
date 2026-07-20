import React from 'react';
import './Craftsmanship.css';

const Craftsmanship = () => {
  return (
    <section className="craftsmanship-section">
      <div className="craft-container">
        <div className="craft-content-split">
          
          <div className="craft-text-col">
            <h4 className="craft-subtitle">BEHIND THE SCENES</h4>
            <h2 className="craft-title">
              The Art of<br/>
              <i>Craftsmanship</i>
            </h2>
            <div className="craft-description">
              <p>
                Every Miraya piece is a labor of love, brought to life by master artisans whose skills have been honed over generations. From the delicate tracery of Zardozi to the rhythmic weave of Banarasi silk, we preserve India's most treasured textile traditions.
              </p>
              <p>
                It takes hundreds of hours to hand-embroider a single bridal lehenga. We believe that true luxury lies in the time, patience, and human touch poured into every thread.
              </p>
            </div>
            
            <div className="craft-features-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="craft-feature">
                <span className="feature-number">01</span>
                <span className="feature-text">HAND-WOVEN TEXTILES</span>
                <div className="feature-line"></div>
              </div>

              <div className="craft-feature">
                <span className="feature-number">02</span>
                <span className="feature-text">INTRICATE ZARDOZI</span>
                <div className="feature-line"></div>
              </div>

              <div className="craft-feature">
                <span className="feature-number">03</span>
                <span className="feature-text">HERITAGE PATTERNS</span>
                <div className="feature-line"></div>
              </div>
            </div>
          </div>

          <div className="craft-image-col">
            <div className="craft-image-mask">
              <img 
                src="/craftsmanship-bg.png" 
                alt="Artisan doing embroidery" 
                className="craft-image"
              />
            </div>
            
            <div className="craft-stat-card">
              <div className="stat-card-inner">
                <div className="stat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 3v3h12V3H6zm0 15v3h12v-3H6z"/>
                    <path d="M8 6h8v12H8z"/>
                    <line x1="8" y1="9" x2="16" y2="9"/>
                    <line x1="8" y1="12" x2="16" y2="12"/>
                    <line x1="8" y1="15" x2="16" y2="15"/>
                  </svg>
                </div>
                <div className="stat-subtitle">TIME TAKEN</div>
                <div className="stat-value">100+</div>
                <div className="stat-unit">HOURS</div>
                <div className="stat-divider"></div>
                <div className="stat-footer">
                  ARTISAN MADE<br/>WITH LOVE
                  <div className="stat-heart">♡</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Craftsmanship;
