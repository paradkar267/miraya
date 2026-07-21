import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Hero.css';

const textReveal = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] } }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5
    }
  }
};

const Hero = () => {
  const containerRef = useRef(null);
  
  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section className="hero" ref={containerRef} style={{ overflow: 'hidden', position: 'relative' }}>
      {/* Video Background */}
      <motion.div 
        className="hero-video-wrapper"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        style={{ y: videoY, scale: videoScale, originY: 0 }}
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
      <motion.div 
        className="hero-content"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.div 
          className="hero-text-container"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Subtitle */}
          <div style={{ overflow: "hidden", marginBottom: "1rem" }}>
            <motion.div variants={textReveal} className="subtitle-wrapper">
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
          </div>
          
          {/* Main Title */}
          <div className="hero-title-wrapper">
            <h1 className="hero-title">
              <div style={{ overflow: "hidden" }}>
                <motion.span variants={textReveal} className="hero-title-italic" style={{ display: "inline-block" }}>The Art of</motion.span>
              </div>
              <div style={{ overflow: "hidden" }}>
                <motion.span variants={textReveal} className="hero-title-bold" style={{ display: "inline-block" }}>Elegance</motion.span>
              </div>
            </h1>
          </div>

          {/* Description */}
          <div style={{ overflow: "hidden" }}>
            <motion.div variants={textReveal}>
              <p className="hero-description">Meaningful ethnic wear, designed to celebrate you. We weave traditional Indian craftsmanship into refined silhouettes for the modern wardrobe.</p>
            </motion.div>
          </div>
          
          {/* CTA Button */}
          <motion.div
            variants={textReveal}
            className="hero-cta"
          >
            <Link to="/collection/all" className="btn btn-hollow-gold btn-magnetic">Explore Collection <span className="btn-arrow">⟶</span></Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
