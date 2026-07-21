import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, ShoppingCart, Heart, Settings, LogOut, Bell } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCollectionOpen, setMobileCollectionOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/');
    setProfileDropdownOpen(false);
    window.dispatchEvent(new Event('loginStateChange'));
  };

  useEffect(() => {
    const handleLoginChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr);
          setUser(userObj);
          setIsAdmin(userObj.email === 'bizleap1@gmail.com' || userObj.role === 'ADMIN');
        } catch(e) {}
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    };
    
    // Initial check
    handleLoginChange();

    window.addEventListener('loginStateChange', handleLoginChange);
    return () => window.removeEventListener('loginStateChange', handleLoginChange);
  }, []);

  const fetchNotifications = async () => {
    if (!isLoggedIn) return;
    try {
      const token = localStorage.getItem('token');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setNotifications(await res.json());
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchNotifications();
  }, [isLoggedIn, location]);

  const handleMarkAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await fetch(`${API_URL}/api/notifications/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotifications();
    } catch (e) {}
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  const isCollectionPage = location.pathname.startsWith('/collection');
  const isAboutPage = location.pathname === '/about';
  
  // Pages with dark hero sections at the top where white text is visible
  const hasDarkHero = isHomePage;
  
  // Navbar is scrolled if we have scrolled down OR if there is no dark hero section
  const isNavbarScrolled = scrolled || !hasDarkHero;

  return (
    <>
      <motion.nav
        className={`navbar ${isNavbarScrolled ? 'scrolled' : ''}`}
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
            <NavLink to="/about" className="nav-link">About Us</NavLink>

            <div
              className="nav-dropdown-container"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link to="/collection/all" className={`nav-link dropdown-trigger ${location.pathname.includes('/collection') ? 'active' : ''}`}>
                Collection <ChevronDown size={14} className="dropdown-icon" />
              </Link>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className="mega-menu"
                    initial={{ opacity: 0, y: 15, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: 10, x: "-50%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="mega-menu-inner">
                      <div className="mega-menu-header">
                        <div className="mega-ornament-line"></div>
                        <div className="mega-ornament-diamond">◈</div>
                        <h3 className="mega-title">EXPLORE OUR COLLECTIONS</h3>
                        <div className="mega-ornament-diamond">◈</div>
                        <div className="mega-ornament-line"></div>
                      </div>

                      <div className="mega-grid">
                        <Link to="/collection/sarees" className="mega-item">
                          <div className="mega-img-wrap"><img src="/saree_mega.png" alt="Saree" /></div>
                          <span className="mega-item-title">SAREE</span>
                        </Link>
                        <Link to="/collection/anarkali" className="mega-item">
                          <div className="mega-img-wrap"><img src="/anarkali_mega.png" alt="Anarkali" /></div>
                          <span className="mega-item-title">ANARKALI</span>
                        </Link>
                        <Link to="/collection/indo-western" className="mega-item">
                          <div className="mega-img-wrap"><img src="/indo_western_mega.png" alt="Indo-Western" /></div>
                          <span className="mega-item-title">INDO-WESTERN</span>
                        </Link>
                        <Link to="/collection/sharara" className="mega-item">
                          <div className="mega-img-wrap"><img src="/sharara_mega.png" alt="Sharara" /></div>
                          <span className="mega-item-title">SHARARA</span>
                        </Link>
                        <Link to="/collection/salwar-suit" className="mega-item">
                          <div className="mega-img-wrap"><img src="/salwar_mega.png" alt="Salwar Suit" /></div>
                          <span className="mega-item-title">SALWAR SUIT</span>
                        </Link>
                        <Link to="/collection/kurtis" className="mega-item">
                          <div className="mega-img-wrap"><img src="/kurti_mega.png" alt="Kurti" /></div>
                          <span className="mega-item-title">KURTIS</span>
                        </Link>
                        <Link to="/collection/coord-sets" className="mega-item">
                          <div className="mega-img-wrap"><img src="/craftman.jpg" alt="Co-ord Set" /></div>
                          <span className="mega-item-title">CO-ORD SETS</span>
                        </Link>

                        <Link to="/collection/all" className="mega-view-all">
                          <div className="view-all-corner-tr"></div>
                          <div className="view-all-corner-bl"></div>
                          <div className="view-all-content">
                            <span className="flower-icon">
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C12 2 15 8 15 12C15 16 12 22 12 22C12 22 9 16 9 12C9 8 12 2 12 2Z"/><path d="M2 12C2 12 8 9 12 9C16 9 22 12 22 12C22 12 16 15 12 15C8 15 2 12 2 12Z"/></svg>
                            </span>
                            <span className="view-all-text">VIEW ALL<br/>MASTERPIECES</span>
                            <span className="arrow">⟶</span>
                          </div>
                        </Link>
                      </div>
                      
                      <div className="mega-bottom-ornament">
                        <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                           <path d="M20 15L10 0H30L20 15Z" fill="#dfc28d" opacity="0.6"/>
                           <circle cx="20" cy="18" r="2" fill="#dfc28d" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/bespoke" className="nav-link">Bespoke</NavLink>
            <NavLink to="/lookbook" className="nav-link">Lookbook</NavLink>
            <NavLink to="/contact" className="nav-link">Contact Us</NavLink>
          </div>

          {/* Right Actions */}
          <div className="navbar-right">
            <div className="navbar-actions">
              {isAdmin && (
                <Link to="/admin" className="nav-link desktop-only" style={{ color: 'var(--primary-burgundy)', fontWeight: '600' }}>
                  Admin Panel
                </Link>
              )}
              <Link to="/account" state={{ tab: 'wishlist' }} className="icon-btn desktop-only position-relative" aria-label="Wishlist" title="Wishlist">
                <Heart size={20} strokeWidth={1.5} />
                {wishlistCount > 0 && <span className="nav-badge">{wishlistCount}</span>}
              </Link>
              <Link to="/account" state={{ tab: 'cart' }} className="icon-btn desktop-only position-relative" aria-label="Cart" title="Cart">
                <ShoppingCart size={20} strokeWidth={1.5} />
                {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
              </Link>
              {isLoggedIn && (
                <div 
                  className="profile-dropdown-container desktop-only"
                  onMouseEnter={() => setNotificationsOpen(true)}
                  onMouseLeave={() => setNotificationsOpen(false)}
                >
                  <button className="icon-btn position-relative" aria-label="Notifications" title="Notifications">
                    <Bell size={20} strokeWidth={1.5} />
                    {notifications.filter(n => !n.isRead).length > 0 && (
                      <span className="nav-badge">{notifications.filter(n => !n.isRead).length}</span>
                    )}
                  </button>
                  <AnimatePresence>
                    {notificationsOpen && (
                      <motion.div
                        className="profile-dropdown-menu"
                        style={{ width: '300px', padding: '1rem', right: '-50px' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h4 style={{ margin: '0 0 1rem 0', fontFamily: 'var(--font-heading)', color: 'var(--primary-burgundy)' }}>Notifications</h4>
                        {notifications.length === 0 ? (
                          <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>No notifications yet.</p>
                        ) : (
                          <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {notifications.map(n => (
                              <div key={n.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: n.isRead ? 'transparent' : 'rgba(205, 163, 114, 0.1)', padding: '0.5rem', borderRadius: '4px' }}>
                                <div>
                                  <p style={{ margin: '0 0 0.2rem 0', fontWeight: n.isRead ? 'normal' : '600', fontSize: '0.9rem' }}>{n.title}</p>
                                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>{n.message}</p>
                                </div>
                                {!n.isRead && (
                                  <button onClick={() => handleMarkAsRead(n.id)} style={{ background: 'none', border: 'none', color: 'var(--primary-gold)', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}>
                                    Read
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
              {isLoggedIn ? (
                <div 
                  className="profile-dropdown-container"
                  onMouseEnter={() => setProfileDropdownOpen(true)}
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <button className="icon-btn profile-photo-btn" aria-label="Profile">
                    <img 
                      src={user?.profilePicture || "/profile.jpg"} 
                      alt="Profile" 
                      className="profile-photo" 
                      onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=3d1c1a&color=fff&rounded=true&size=128`; }}
                    />
                  </button>
                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        className="profile-dropdown-menu"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link to="/account" className="profile-dropdown-item" onClick={() => setProfileDropdownOpen(false)}>
                          <User size={16} className="profile-dropdown-icon" />
                          <span>View Profile</span>
                        </Link>
                        <Link to="/account" state={{ tab: 'settings' }} className="profile-dropdown-item" onClick={() => setProfileDropdownOpen(false)}>
                          <Settings size={16} className="profile-dropdown-icon" />
                          <span>Settings</span>
                        </Link>
                        <button onClick={handleLogout} className="profile-dropdown-item logout-btn">
                          <LogOut size={16} className="profile-dropdown-icon" />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to="/auth" className="nav-link signup-link" aria-label="Account">
                  <span>SIGN UP</span>
                </Link>
              )}
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
                        <Link to="/collection/kurtis" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Kurtis</Link>
                        <Link to="/collection/coord-sets" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Co-ord Sets</Link>
                        <Link to="/collection/traditional" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Traditional Wear</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: 0.17, duration: 0.5, ease: "easeOut" }}>
                  <Link to="/bespoke" onClick={() => setMobileMenuOpen(false)}>Bespoke</Link>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: 0.18, duration: 0.5, ease: "easeOut" }}>
                  <Link to="/lookbook" onClick={() => setMobileMenuOpen(false)}>Lookbook</Link>
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
