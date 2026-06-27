import { motion } from 'framer-motion';
import About from '../components/About';
import BrandVoice from '../components/BrandVoice';
import './AboutPage.css';
import { useEffect } from 'react';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="about-page-main">
      <motion.div 
        className="about-page-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <span className="script-text">Discover</span>
          <br />
          Miraya
        </motion.h1>
        <motion.p 
          className="header-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          A Legacy of Craftsmanship & Modern Elegance
        </motion.p>
        <motion.div 
          className="header-line"
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ duration: 1.5, delay: 1 }}
        ></motion.div>
      </motion.div>
      <About />
      <BrandVoice />
    </main>
  );
};

export default AboutPage;
