import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Moves the background down at half the speed of the scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section className="hero" ref={containerRef}>
      {/* Video Background with Parallax */}
      <motion.div 
        className="hero-video-wrapper"
        style={{ y }}
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
            <span className="subtitle">Miraya by Garima</span>
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
