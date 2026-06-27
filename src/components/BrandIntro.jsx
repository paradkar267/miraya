import { motion } from 'framer-motion';
import './BrandIntro.css';

const BrandIntro = () => {
  return (
    <section className="brand-intro-section">
      <div className="container brand-intro-container">
        <motion.div 
          className="brand-intro-text-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <h2 className="intro-heading">Discover Miraya</h2>
          <div className="intro-line"></div>
          
          <p className="intro-paragraph">
            Miraya by Garima is a premium ethnic wear brand that celebrates timeless Indian craftsmanship with a refined contemporary perspective. Designed for women across generations, Miraya offers thoughtfully curated festive and occasion wear, blending luxurious fabrics, graceful silhouettes, and sophisticated detailing for every special moment.
          </p>
          
          <p className="intro-paragraph">
            More than just a clothing brand, Miraya represents confidence, elegance, and modern femininity. While establishing a strong offline retail presence, the brand is committed to building a premium digital identity through visually rich storytelling, authentic experiences, and consistent brand communication that reflects luxury, trust, and timeless style.
          </p>
        </motion.div>

        <motion.div 
          className="brand-intro-image-wrapper"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.img 
            src="/garment-label.png" 
            alt="Miraya Brand Label" 
            className="brand-intro-image" 
            animate={{ y: [0, -15, 0] }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BrandIntro;
