import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  return (
    <motion.div
      className="preloader-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0 }}
    >
      {/* Background panels that split apart */}
      <motion.div 
        className="preloader-panel left-panel"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 3 }}
      />
      <motion.div 
        className="preloader-panel right-panel"
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 3 }}
        onAnimationComplete={onComplete}
      />

      <div className="preloader-content">
        <motion.div 
          className="preloader-brand"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ letterSpacing: "10px", opacity: 0, y: 10 }}
            animate={{ letterSpacing: "20px", opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 1.8 }}
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
