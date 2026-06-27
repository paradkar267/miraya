import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        
        <div className="footer-top">
          {/* Column 1: Brand */}
          <motion.div 
            className="footer-brand"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img src="/logo2.png" alt="Miraya by Garima" className="footer-logo-img" />
            <p className="footer-desc">
              Redefining luxury ethnic wear with timeless elegance and masterful craftsmanship.
            </p>
          </motion.div>
          
          <div className="footer-columns">
            {/* Column 2: Links */}
            <motion.div 
              className="footer-column"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
            >
              <h4 className="footer-heading">Explore</h4>
              <ul>
                <li><a href="#collections">Collections</a></li>
                <li><a href="#lehengas">Luxury Lehengas</a></li>
                <li><a href="#kurtis">Designer Kurtis</a></li>
                <li><a href="#about">The Brand</a></li>
              </ul>
            </motion.div>
            
            {/* Column 3: Contact */}
            <motion.div 
              className="footer-column"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              <Link to="/contact"><h4 className="footer-heading">Contact</h4></Link>
              <address className="footer-address">
                Miraya Flagship Store<br/>
                New Delhi, India
              </address>
              <a href="mailto:hello@miraya.com" className="footer-email">hello@miraya.com</a>
              <p className="footer-phone">+91 98765 43210</p>
            </motion.div>
            
            {/* Column 4: Newsletter */}
            <motion.div 
              className="footer-column"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            >
              <h4 className="footer-heading">Atelier</h4>
              <p className="footer-desc small-desc">Subscribe for exclusive updates.</p>
              <div className="newsletter-input-group">
                <input type="email" placeholder="Email Address" className="newsletter-input" />
                <button className="newsletter-btn">➔</button>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Miraya by Garima. All rights reserved.</p>
          <div className="footer-socials">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Pinterest</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
