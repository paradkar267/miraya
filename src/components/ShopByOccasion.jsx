import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ShopByOccasion.css';

const occasions = [
  {
    id: 1,
    title: 'Mehendi & Haldi',
    subtitle: 'Vibrant Yellows & Greens',
    image: '/mehendi-haldi.png',
    link: '/collection'
  },
  {
    id: 2,
    title: 'Sangeet Glam',
    subtitle: 'Shimmery & Indo-western',
    image: '/sangeet-glam.png',
    link: '/collection'
  },
  {
    id: 3,
    title: 'The Bridal Trousseau',
    subtitle: 'Heavy Lehengas & Sarees',
    image: '/bridal-trousseau.png',
    link: '/collection'
  },
  {
    id: 4,
    title: 'Festive Wear',
    subtitle: 'Elegant Kurtis & Suits',
    image: '/festive-wear.png',
    link: '/collection'
  }
];

const ShopByOccasion = () => {
  return (
    <section className="shop-by-occasion-section">
      <div className="occasion-header">
        <motion.h2 
          className="occasion-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          Shop by Occasion
        </motion.h2>
        <motion.p 
          className="occasion-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Curated edits for your special moments
        </motion.p>
      </div>

      <div className="occasion-grid">
        {occasions.map((occasion, index) => (
          <motion.div 
            key={occasion.id}
            className="occasion-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <Link to={occasion.link} className="occasion-link">
              <div className="occasion-image-container">
                <img src={occasion.image} alt={occasion.title} className="occasion-image" />
                <div className="occasion-overlay"></div>
                <div className="occasion-content">
                  <h3 className="occasion-card-title">{occasion.title}</h3>
                  <p className="occasion-card-subtitle">{occasion.subtitle}</p>
                  <span className="occasion-explore">Explore <span className="arrow">→</span></span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ShopByOccasion;
