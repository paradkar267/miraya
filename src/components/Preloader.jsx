import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  return (
    <motion.div
      className="preloader-container"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 4 }}
      onAnimationComplete={onComplete}
    >
      <div className="preloader-img-wrapper">
        <motion.img 
          src="/intro-image.jpg" 
          alt="Intro"
          className="preloader-img"
          initial={{ scale: 1.2, filter: "brightness(0)" }}
          animate={{ scale: 1, filter: "brightness(0.5)" }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />
      </div>

      <div className="preloader-content">
        <motion.div 
          className="preloader-brand"
        >
          <motion.div
            initial={{ letterSpacing: "10px", opacity: 0, y: 20 }}
            animate={{ letterSpacing: "20px", opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            className="preloader-title"
          >
            MIRAYA
          </motion.div>
          
          <motion.div 
            className="preloader-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
          />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 1.5 }}
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
