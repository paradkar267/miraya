import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Collections.css';

const Collections = () => {
  return (
    <section id="collections" className="section collections-section">
      <div className="container">
        
        {/* LEHENGAS SECTION */}
        <div className="collection-editorial-block">
          <div className="editorial-text-col left">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="collection-subtitle">Collection I</div>
              <h2 className="collection-heading">
                <i>Luxury</i><br/>Lehengas
              </h2>
              <p className="editorial-desc">
                Handcrafted for life's most beautiful moments. Our lehengas blend authentic heritage with quiet sophistication, ensuring you feel truly yourself.
              </p>
              <Link to="/collection/lehengas" className="premium-link">Explore Lehengas <span className="arrow">⟶</span></Link>
            </motion.div>
          </div>
          
          <div className="editorial-img-col right">
            <motion.div 
              className="editorial-img-wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <img 
                src="/soft-pink.jpg" 
                alt="Luxury Lehengas" 
                className="editorial-img" 
              />
            </motion.div>
          </div>
        </div>

        {/* INTERLUDE TEXT TO FILL THE GAP */}
        <div className="collection-interlude">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <p className="interlude-text">
              "True luxury is woven into every thread, whispered in every detail."
            </p>
          </motion.div>
        </div>

        {/* KURTIS SECTION */}
        <div className="collection-editorial-block reverse">
          <div className="editorial-text-col right">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="collection-subtitle">Collection II</div>
              <h2 className="collection-heading">
                <i>Designer</i><br/>Kurtis
              </h2>
              <p className="editorial-desc">
                Elevating the everyday. Thoughtful details, premium fabrics, and impeccable tailoring for the woman who finds luxury in simplicity.
              </p>
              <Link to="/collection/kurtis" className="premium-link">Explore Kurtis <span className="arrow">⟶</span></Link>
            </motion.div>
          </div>
          
          <div className="editorial-img-col left">
            <motion.div 
              className="editorial-img-wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            >
              <img 
                src="/burgundy-grace.jpg" 
                alt="Designer Kurtis" 
                className="editorial-img" 
              />
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Collections;
