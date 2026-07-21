import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState('reveal'); // reveal -> text -> exit

  useEffect(() => {
    // Start intro sequence
    const textTimer = setTimeout(() => setPhase('text'), 1000);
    const exitTimer = setTimeout(() => setPhase('exit'), 3500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  return (
    <motion.div
      className="preloader-container"
      initial={{ y: 0 }}
      animate={phase === 'exit' ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (phase === 'exit') onComplete();
      }}
    >
      {/* Background Image (Revealed by mask) */}
      <motion.div 
        className="preloader-img-wrapper"
        initial={{ clipPath: "inset(50% 49.9% 50% 49.9%)" }} // Starts as a tiny horizontal sliver in the center
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      >
        <motion.img 
          src="/premium-intro.png" 
          alt="Intro"
          className="preloader-img"
          initial={{ scale: 1.2, filter: "brightness(0.3)" }}
          animate={{ scale: 1, filter: "brightness(0.6)" }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.2 }}
        />
      </motion.div>

      {/* Text Reveal (Phase 3) */}
      <div className="preloader-content">
        <motion.div className="preloader-brand">
          <motion.div
            initial={{ letterSpacing: "30px", opacity: 0, filter: "blur(10px)" }}
            animate={
              (phase === 'text' || phase === 'exit') ? 
              { letterSpacing: "15px", opacity: 1, filter: "blur(0px)" } : 
              { letterSpacing: "30px", opacity: 0, filter: "blur(10px)" }
            }
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="preloader-title"
          >
            MIRAYA
          </motion.div>
          
          <motion.div 
            className="preloader-line"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={(phase === 'text' || phase === 'exit') ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={(phase === 'text' || phase === 'exit') ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
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
