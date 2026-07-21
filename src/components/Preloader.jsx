import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  return (
    <motion.div
      className="preloader-container"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 1.8 }}
      onAnimationComplete={onComplete}
    >
      <div className="preloader-img-wrapper">
        <motion.img 
          src="/intro-image.jpg" 
          alt="Intro"
          className="preloader-img"
          initial={{ scale: 1.1, filter: "brightness(0.2)" }}
          animate={{ scale: 1, filter: "brightness(0.7)" }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />
      </div>

      <div className="preloader-content">
        <motion.div 
          className="preloader-brand"
        >
          <motion.div
            initial={{ letterSpacing: "10px", opacity: 0, y: 15 }}
            animate={{ letterSpacing: "18px", opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="preloader-title"
          >
            MIRAYA
          </motion.div>
          
          <motion.div 
            className="preloader-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
          />

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className="preloader-subtitle"
          >
            by Garima
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;
