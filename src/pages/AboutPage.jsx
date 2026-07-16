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
      </motion.div>
      <About />
      <BrandVoice />
    </main>
  );
};

export default AboutPage;
