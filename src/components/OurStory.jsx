import React from 'react';
import { motion } from 'framer-motion';
import './OurStory.css';
import { Link } from 'react-router-dom';

const Ornament = () => (
  <svg width="60" height="15" viewBox="0 0 60 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="section-ornament">
    <path d="M30 0L33 7.5L30 15L27 7.5L30 0Z" fill="#C6A46A"/>
    <line x1="0" y1="7.5" x2="20" y2="7.5" stroke="#C6A46A" strokeWidth="0.5"/>
    <line x1="40" y1="7.5" x2="60" y2="7.5" stroke="#C6A46A" strokeWidth="0.5"/>
  </svg>
);

const OurStory = () => {
  return (
    <section className="our-story-section">
      <div className="our-story-bg-sketch"></div>
      <div className="container our-story-container">
        
        {/* Left Image Column */}
        <div className="our-story-image-col">
          <motion.div 
            className="our-story-image-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1 }}
          >
            <img src="/our_story_model.png" alt="The Miraya Legacy" className="our-story-image" loading="lazy" />
          </motion.div>
        </div>

        {/* Right Content Column */}
        <div className="our-story-content-col">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h4 className="story-subtitle">OUR STORY</h4>
            <Ornament />
            <h2 className="story-title">The Miraya Legacy</h2>
            
            <p className="story-description">
              At Miraya, we believe in the beauty of tradition and the power of craftsmanship. Each piece is a reflection of India's rich heritage, brought to life with intricate detailing and luxurious fabrics. Our mission is to make you feel elegant, confident, and truly yourself.
            </p>

            <div className="story-stats-grid">
              <div className="stat-item">
                <h3>500+</h3>
                <p>Happy Clients</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <h3>50+</h3>
                <p>Artisans</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <h3>1000+</h3>
                <p>Unique Designs</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <h3>5★</h3>
                <p>Customer Rating</p>
              </div>
            </div>

            <Link to="/about" className="btn btn-burgundy discover-btn">
              DISCOVER OUR STORY &rarr;
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default OurStory;
