import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        
        <div className="footer-top">
          {/* Column 1: Brand & Newsletter */}
          <div className="footer-brand-section">
            <img src="/logoR.png" alt="Miraya by Garima" className="footer-logo-img" />
            <p className="footer-desc">
              Join the inner circle of Miraya for early access to private seasonal launches, design histories, and exclusive artisanal exhibitions.
            </p>
            <div className="footer-subscribe-box">
              <input type="email" placeholder="Enter your email address" className="footer-subscribe-input" />
              <button className="footer-subscribe-btn">SUBSCRIBE</button>
            </div>
            <div className="footer-socials-new">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.5" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" aria-label="Pinterest">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12C2 16.24 4.65 19.86 8.44 21.36C8.35 20.59 8.27 19.33 8.48 18.47L10 12.06C10 12.06 9.61 11.28 9.61 10C9.61 7.82 10.87 6.2 12.44 6.2C13.78 6.2 14.39 7.21 14.39 8.41C14.39 9.77 13.52 11.8 13.06 13.67C12.68 15.22 13.84 16.48 15.35 16.48C18.11 16.48 20.2 13.57 20.2 9.48C20.2 5.86 17.59 3.32 13.68 3.32C9 3.32 6.13 6.84 6.13 10.57C6.13 11.9 6.64 13.34 7.41 14.05C7.55 14.18 7.57 14.28 7.53 14.44L7.14 15.96C7.09 16.14 6.96 16.19 6.78 16.11C5.1 15.33 3.99 13.02 3.99 11.08C3.99 6.88 7.04 3.09 13.9 3.09C19.42 3.09 23.59 7.02 23.59 12.13C23.59 17.61 20.14 21.84 16 21.84C14.39 21.84 12.87 21 12.42 20.17L11.45 23.86C11.1 25.19 10.23 26.83 9.67 27.87C10.42 28.1 11.2 28.22 12 28.22C17.52 28.22 22 23.74 22 18.22C22 12.7 17.52 8.22 12 8.22Z" transform="translate(1,1) scale(0.9)"></path></svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>
          
          <div className="footer-links-section">
            {/* Column 2: Collections */}
            <div className="footer-column-new">
              <h4 className="footer-heading-new">
                COLLECTIONS
                <div className="heading-ornament">◈</div>
              </h4>
              <ul>
                <li><Link to="/collection/lehengas">Lehengas</Link></li>
                <li><Link to="/collection/sarees">Sarees</Link></li>
                <li><Link to="/collection/anarkalis">Anarkalis</Link></li>
                <li><Link to="/collection/shararas">Shararas</Link></li>
                <li><Link to="/collection/gowns">Gowns</Link></li>
                <li><Link to="/collection/kurtis">Kurtis</Link></li>
              </ul>
            </div>
            
            {/* Column 3: The Maison */}
            <div className="footer-column-new">
              <h4 className="footer-heading-new">
                THE MAISON
                <div className="heading-ornament">◈</div>
              </h4>
              <ul>
                <li><Link to="/about">Our Story</Link></li>
                <li><Link to="#">Artisanal Legacy</Link></li>
                <li><Link to="#">Exhibitions</Link></li>
                <li><Link to="#">Press</Link></li>
                <li><Link to="#">Private Dressing</Link></li>
                <li><Link to="#">Careers</Link></li>
              </ul>
            </div>
            
            {/* Column 4: Services */}
            <div className="footer-column-new">
              <h4 className="footer-heading-new">
                SERVICES
                <div className="heading-ornament">◈</div>
              </h4>
              <ul>
                <li><Link to="/contact">Contact Boutique</Link></li>
                <li><Link to="#">Sizing Consultation</Link></li>
                <li><Link to="#">Shipping & Customs</Link></li>
                <li><Link to="#">Returns & Exchanges</Link></li>
                <li><Link to="#">Care & Restorations</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Column 5: Boutique */}
          <div className="footer-boutique-section">
            <div className="boutique-box">
              <div className="boutique-icon">
                <MapPin size={16} strokeWidth={2} />
              </div>
              <h4 className="boutique-heading">BOUTIQUE</h4>
              <address className="boutique-address">
                Shop no. UG/5, Jagat Plaza,<br/>
                Mouze Pandharabodi, Law College Square,<br/>
                Amravati Rd, Nagpur, Maharashtra 440033
              </address>
              <div className="boutique-contact">
                <p>Email: <a href="mailto:hello@miraya.com">hello@miraya.com</a></p>
                <p>Phone: +91 98765 43210</p>
              </div>
            </div>
          </div>

        </div>
        
        <div className="footer-bottom-new">
          <p>&copy; {new Date().getFullYear()} Miraya by Garima. Crafted with Pride in India. All Rights Reserved.</p>
          <div className="footer-bottom-ornament">
             <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                 <path d="M20 10L10 5H30L20 10Z" fill="#dfc28d" opacity="0.8"/>
                 <circle cx="20" cy="15" r="2" fill="#dfc28d" />
             </svg>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
