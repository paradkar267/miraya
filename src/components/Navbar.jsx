import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCollectionOpen, setMobileCollectionOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="navbar-container">

          <div className="navbar-logo">
            <Link to="/">
              <img src="/logoR.png" alt="Miraya" className="logo-img" />
            </Link>
          </div>

          {/* Center Links */}
          <div className="navbar-links center-links desktop-only">
            <NavLink to="/" className="nav-link" end>Home</NavLink>

            <div
              className="nav-dropdown-container"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className={`nav-link dropdown-trigger ${location.pathname.includes('/collection') ? 'active' : ''}`}>
                Collection <ChevronDown size={14} className="dropdown-icon" />
              </div>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className="dropdown-menu"
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="dropdown-inner">
                      <Link to="/collection/all" className="dropdown-item">View All</Link>
                      <Link to="/collection/lehengas" className="dropdown-item">Lehengas</Link>
                      <Link to="/collection/sarees" className="dropdown-item">Sarees</Link>
                      <Link to="/collection/wedding" className="dropdown-item">Wedding</Link>
                      <Link to="/collection/kurtis" className="dropdown-item">Kurtis</Link>
                      <Link to="/collection/coord-sets" className="dropdown-item">Co-ord Sets</Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/about" className="nav-link">About Us</NavLink>
            <NavLink to="/contact" className="nav-link">Contact Us</NavLink>
          </div>

          {/* Right Actions */}
          <div className="navbar-right">
            <div className="navbar-actions">
              <button
                className="icon-btn mobile-only"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={24} strokeWidth={1.5} />
              </button>
            </div>
          </div>

        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="mobile-menu-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
            <div className="mobile-menu-header">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <img src="/logoR.png" alt="Miraya" className="logo-img-small" />
              </Link>
              <button
                className="icon-btn close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={28} strokeWidth={1.2} />
              </button>
            </div>

            <div className="mobile-menu-content">
              <div className="mobile-menu-links">
                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}>
                  <a href="#" onClick={() => setMobileMenuOpen(false)}>Home</a>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }} className="mobile-menu-item-with-sub">
                  <div className="mobile-menu-link-wrapper" onClick={() => setMobileCollectionOpen(!mobileCollectionOpen)}>
                    <span>Collection</span>
                    <ChevronDown size={24} className={`mobile-dropdown-icon ${mobileCollectionOpen ? 'open' : ''}`} />
                  </div>
                  <AnimatePresence>
                    {mobileCollectionOpen && (
                      <motion.div
                        className="mobile-sub-links"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link to="/collection/all" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>View All</Link>
                        <Link to="/collection/lehengas" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Lehengas</Link>
                        <Link to="/collection/sarees" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Sarees</Link>
                        <Link to="/collection/wedding" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Wedding</Link>
                        <Link to="/collection/kurtis" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Kurtis</Link>
                        <Link to="/collection/coord-sets" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Co-ord Sets</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}>
                  <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}>
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="mobile-menu-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p>Miraya by Garima</p>
              <div className="social-links">
                <span>IG</span>
                <span>FB</span>
                <span>PIN</span>
              </div>
            </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
