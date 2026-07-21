import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const containerRef = useRef(null);

  return (
    <section className="hero" ref={containerRef}>
      {/* Video Background */}
      <motion.div 
        className="hero-video-wrapper"
      >
        <video 
          src="/hero-video.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="hero-video"
        ></video>
        <div className="video-overlay-gradient"></div>
      </motion.div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-text-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <span className="subtitle">MIRAYA BY GARIMA</span>
            <div className="hero-divider">
              <svg width="250" height="15" viewBox="0 0 250 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="7.5" x2="90" y2="7.5" stroke="#cda372" strokeWidth="1"/>
                <circle cx="100" cy="7.5" r="2" stroke="#cda372" fill="none" />
                <path d="M125 0 L132.5 7.5 L125 15 L117.5 7.5 Z" stroke="#cda372" fill="none"/>
                <circle cx="150" cy="7.5" r="2" stroke="#cda372" fill="none" />
                <line x1="160" y1="7.5" x2="250" y2="7.5" stroke="#cda372" strokeWidth="1"/>
              </svg>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="hero-title-wrapper"
          >
            <h1 className="hero-title">
              <span className="hero-title-italic">The Art of</span>
              <span className="hero-title-bold">Elegance</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          >
             <p className="hero-description">Meaningful ethnic wear, designed to celebrate you. We weave traditional Indian craftsmanship into refined silhouettes for the modern wardrobe.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="hero-cta"
          >
            <Link to="/collection/all" className="btn btn-hollow-gold">Explore Collection <span>⟶</span></Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
