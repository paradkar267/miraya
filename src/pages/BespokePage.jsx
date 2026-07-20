import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Ruler, 
  Scissors, 
  Diamond, 
  MessageSquare, 
  Layers, 
  PenTool, 
  Shirt, 
  Gift 
} from 'lucide-react';
import './BespokePage.css';

const BespokePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bespoke-page">
      {/* Hero Section */}
      <section className="bespoke-hero-section">
        <div className="bespoke-hero-left">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bespoke-pre-heading">
              <span>❖</span>
              <span>CUSTOM DESIGN</span>
              <span>❖</span>
            </div>
            
            <div className="bespoke-hero-title">
              <h1>Bespoke & Bridal</h1>
              <span className="script-text">Trousseau</span>
            </div>

            <div className="bespoke-motif">
              {/* Simple SVG Lotus Motif matching the design roughly */}
              <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 45C30 45 10 30 10 15C10 15 25 25 50 25C75 25 90 15 90 15C90 30 70 45 50 45Z" fill="#c09d68"/>
                <path d="M50 5L35 25H65L50 5Z" fill="#c09d68"/>
                <path d="M50 45H10" stroke="#c09d68" strokeWidth="2"/>
                <path d="M50 45H90" stroke="#c09d68" strokeWidth="2"/>
              </svg>
            </div>

            <p className="bespoke-description">
              Experience the luxury of custom ethnic wear, tailored to your exact measurements, style and vision. Let us craft the masterpiece for your most memorable moments.
            </p>

            <button className="start-journey-btn">
              <Ruler size={18} />
              START YOUR BESPOKE JOURNEY &rarr;
            </button>
          </motion.div>

          {/* Features Row */}
          <motion.div 
            className="features-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="feature-item">
              <div className="feature-icon-wrap">
                <Ruler size={20} strokeWidth={1.5} />
              </div>
              <div className="feature-text">
                <h4>MADE TO MEASURE</h4>
                <p>Perfect Fit, Just for You</p>
              </div>
            </div>
            <div className="feature-divider"></div>
            <div className="feature-item">
              <div className="feature-icon-wrap">
                <Scissors size={20} strokeWidth={1.5} />
              </div>
              <div className="feature-text">
                <h4>FINEST CRAFTSMANSHIP</h4>
                <p>Handcrafted with Precision</p>
              </div>
            </div>
            <div className="feature-divider"></div>
            <div className="feature-item">
              <div className="feature-icon-wrap">
                <Diamond size={20} strokeWidth={1.5} />
              </div>
              <div className="feature-text">
                <h4>EXCLUSIVE DESIGNS</h4>
                <p>Unique, Timeless & Elegant</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="bespoke-hero-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Use bride1.png as the elegant model image */}
          <img src="/bride1.png" alt="Bespoke Bridal Wear" className="bespoke-hero-image" />
        </motion.div>
      </section>

      {/* Process Section */}
      <section className="bespoke-process-section">
        <motion.div 
          className="process-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="process-title">
            <h2>The Miraya Bespoke Experience</h2>
            <div className="bespoke-motif motif">
              <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 45C30 45 10 30 10 15C10 15 25 25 50 25C75 25 90 15 90 15C90 30 70 45 50 45Z" fill="#c09d68"/>
                <path d="M50 5L35 25H65L50 5Z" fill="#c09d68"/>
                <path d="M50 45H20" stroke="#c09d68" strokeWidth="2"/>
                <path d="M50 45H80" stroke="#c09d68" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          
          <p className="process-subtitle">
            From concept to creation, we ensure every detail reflects your personal taste and our commitment to excellence.
          </p>

          <div className="process-timeline">
            
            <div className="timeline-step">
              <div className="step-icon-container">
                <MessageSquare size={30} strokeWidth={1.5} />
                <div className="step-number-badge">01</div>
              </div>
              <h4>CONSULTATION</h4>
              <p>Share your ideas and inspiration</p>
            </div>

            <div className="timeline-step">
              <div className="step-icon-container">
                <Layers size={30} strokeWidth={1.5} />
                <div className="step-number-badge">02</div>
              </div>
              <h4>FABRIC SELECTION</h4>
              <p>Choose from our finest fabrics & embroideries</p>
            </div>

            <div className="timeline-step">
              <div className="step-icon-container">
                <Ruler size={30} strokeWidth={1.5} />
                <div className="step-number-badge">03</div>
              </div>
              <h4>MEASUREMENTS</h4>
              <p>Precision measurements for the perfect fit</p>
            </div>

            <div className="timeline-step">
              <div className="step-icon-container">
                <PenTool size={30} strokeWidth={1.5} />
                <div className="step-number-badge">04</div>
              </div>
              <h4>CRAFTING</h4>
              <p>Handcrafted with care by skilled artisans</p>
            </div>

            <div className="timeline-step">
              <div className="step-icon-container">
                <Shirt size={30} strokeWidth={1.5} />
                <div className="step-number-badge">05</div>
              </div>
              <h4>FINAL FITTING</h4>
              <p>Ensuring everything is just perfect</p>
            </div>

            <div className="timeline-step">
              <div className="step-icon-container">
                <Gift size={30} strokeWidth={1.5} />
                <div className="step-number-badge">06</div>
              </div>
              <h4>DELIVERY</h4>
              <p>Delivered to you with love & perfection</p>
            </div>

          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default BespokePage;
