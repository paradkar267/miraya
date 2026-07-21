import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading -> reveal -> text -> exit

  useEffect(() => {
    // Simulate loading progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => setPhase('reveal'), 400);
        setTimeout(() => setPhase('text'), 1200);
        setTimeout(() => setPhase('exit'), 3500);
      }
      setProgress(currentProgress);
    }, 100);

    return () => clearInterval(interval);
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
        animate={
          phase === 'loading' ? { clipPath: "inset(50% 49.9% 50% 49.9%)" } :
          { clipPath: "inset(0% 0% 0% 0%)" }
        }
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.img 
          src="/intro-image.png" 
          alt="Intro"
          className="preloader-img"
          initial={{ scale: 1.2, filter: "brightness(0.3)" }}
          animate={
            phase === 'loading' ? { scale: 1.2, filter: "brightness(0.3)" } :
            { scale: 1, filter: "brightness(0.6)" }
          }
          transition={{ duration: 2.5, ease: "easeOut" }}
        />
      </motion.div>

      {/* Loading Progress (Phase 1) */}
      <motion.div 
        className="preloader-loading-state"
        initial={{ opacity: 1 }}
        animate={phase === 'loading' ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="preloader-counter">{progress}%</div>
        <div className="preloader-progress-bar">
          <motion.div 
            className="preloader-progress-fill"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
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
