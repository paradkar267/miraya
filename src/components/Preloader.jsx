import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  return (
    <motion.div
      className="preloader-container"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 2 }}
      onAnimationComplete={onComplete}
    >
      <div className="preloader-content">
        <div style={{ overflow: "hidden" }}>
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            exit={{ y: "-100%" }}
            className="preloader-title"
          >
            Miraya
          </motion.h1>
        </div>
        <div style={{ overflow: "hidden" }}>
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            className="preloader-subtitle"
          >
            by Garima
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
