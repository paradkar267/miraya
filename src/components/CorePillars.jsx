import { motion } from 'framer-motion';
import './CorePillars.css';

const CorePillars = () => {
  return (
    <section className="core-pillars">
      <div className="pillars-container">
        
        <div className="pillars-header">
          <motion.h4 
            className="pillars-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            OUR PHILOSOPHY
          </motion.h4>
          <motion.h2 
            className="pillars-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            THE CORE PILLARS OF MIRAYA
          </motion.h2>
          <motion.p 
            className="pillars-desc"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Rooted in tradition. Designed for today. Created to inspire for generations.
          </motion.p>
        </div>

        <div className="pillars-grid">
          
          {/* Card 1 */}
          <motion.div 
            className="pillar-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="pillar-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22C12 22 10 16 4 15C10 14 12 8 12 8C12 8 14 14 20 15C14 16 12 22 12 22Z" fill="currentColor"/>
                <path d="M12 22C12 22 8 18 2 20C7 17 9 13 9 13" />
                <path d="M12 22C12 22 16 18 22 20C17 17 15 13 15 13" />
              </svg>
            </div>
            <h5 className="pillar-card-subtitle">PRECISE ELEGANCE</h5>
            <h3 className="pillar-card-title">REFINED</h3>
            <div className="pillar-divider">◈</div>
            <p className="pillar-card-text">
              Every silhouette is meticulously tailored, balancing structured drapery with fluid grace. We choose only the finest silks, georgettes, and organic fabrics that whisper luxury with every thread and stitch.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            className="pillar-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <div className="pillar-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="4" width="16" height="16" rx="1"/>
                <line x1="10" y1="4" x2="10" y2="20"/>
                <line x1="14" y1="4" x2="14" y2="20"/>
                <line x1="4" y1="10" x2="20" y2="10"/>
                <line x1="4" y1="14" x2="20" y2="14"/>
                <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
              </svg>
            </div>
            <h5 className="pillar-card-subtitle">HERITAGE CRAFT</h5>
            <h3 className="pillar-card-title">AUTHENTIC</h3>
            <div className="pillar-divider">◈</div>
            <p className="pillar-card-text">
              Our garments celebrate the handloom weavers and zardozi artisans of India. By preserving age-old embellishment techniques, we honor heritage while breathing new life into traditional occasion wear.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            className="pillar-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          >
            <div className="pillar-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22C12 22 10 16 4 15C10 14 12 8 12 8C12 8 14 14 20 15C14 16 12 22 12 22Z" fill="currentColor"/>
                <path d="M12 22C12 22 8 18 2 20C7 17 9 13 9 13" />
                <path d="M12 22C12 22 16 18 22 20C17 17 15 13 15 13" />
              </svg>
            </div>
            <h5 className="pillar-card-subtitle">FOR GENERATIONS</h5>
            <h3 className="pillar-card-title">ASPIRATIONAL</h3>
            <div className="pillar-divider">◈</div>
            <p className="pillar-card-text">
              Miraya designs are created to be heirloom pieces. Bridging the aesthetic tastes of mothers, daughters, and granddaughters, we cultivate a shared lineage of style, dignity, and elegance.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CorePillars;
