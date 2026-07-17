import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Mail, Lock, CheckSquare, Square, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userStr = params.get('user');
    const authError = params.get('error');

    if (token && userStr) {
      try {
        const userObj = JSON.parse(decodeURIComponent(userStr));
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userObj));
        localStorage.setItem('isLoggedIn', 'true');
        window.dispatchEvent(new Event('loginStateChange'));
        navigate('/');
      } catch(e) {
        setError('Failed to parse Google login data.');
      }
    } else if (authError) {
      setError('Google Authentication Failed.');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const url = isLogin 
      ? 'http://localhost:5000/api/auth/login' 
      : 'http://localhost:5000/api/auth/register';

    const payload = isLogin 
      ? { email, password } 
      : { firstName, lastName, email, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Authentication failed');
        return;
      }

      // Success
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('isLoggedIn', 'true');
      
      window.dispatchEvent(new Event('loginStateChange'));
      navigate('/');
    } catch (err) {
      setError('Network error, please try again later');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-split-container">
        
        {/* Left Side: Image */}
        <div className="auth-image-side">
          <img src="/lehenga_mega.png" alt="Luxury Ethnic Wear" className="auth-hero-img" />
          <div className="auth-image-overlay">
            
            <div className="auth-logo-top">
              <img src="/logoR.png" alt="Miraya" className="auth-brand-logo" />
            </div>

            <div className="overlay-text animate-fade-up">
              <h2 className="step-into">Step into</h2>
              <h2 className="elegance">Elegance</h2>
              <div className="auth-ornament">
                <span className="diamond">◈</span>
              </div>
              <p>Discover the finest<br/>handcrafted luxury wear<br/>curated just for you.</p>
            </div>

            <div className="auth-features">
              <div className="feature-item">
                <div className="feature-icon"><span className="flower-icon-small">✿</span></div>
                <p>Timeless<br/>Craftsmanship</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><span className="leaf-icon-small">✧</span></div>
                <p>Premium<br/>Fabrics</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><span className="heart-icon-small">♡</span></div>
                <p>Made with<br/>Love</p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Form */}
        <div className="auth-form-side">
          
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={20} /> Back to Home
          </button>

          <div className="hanging-ribbon">
            <span className="flower-icon-gold">✿</span>
          </div>

          <div className="auth-form-container animate-fade">
            <div className="auth-header">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? 'login-header' : 'register-header'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                  <div className="auth-header-ornament">
                    <span className="diamond-gold">◈</span>
                  </div>
                  <p>
                    {isLogin 
                      ? 'Sign in to access your wishlist, orders,\nand custom measurements.' 
                      : 'Join us to experience bespoke luxury\nand tailored services.'}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="auth-toggle">
              <button 
                className={`toggle-btn ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                SIGN IN
              </button>
              <button 
                className={`toggle-btn ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                REGISTER
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.form 
                key={isLogin ? 'login-form' : 'register-form'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="auth-form" 
                onSubmit={handleSubmit}
              >
                {error && <div className="auth-error" style={{color: 'red', marginBottom: '1rem', textAlign: 'center'}}>{error}</div>}
              {!isLogin && (
                <div className="form-row">
                  <div className="input-group">
                    <label>First Name</label>
                    <div className="input-wrapper">
                      <input type="text" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Last Name</label>
                    <div className="input-wrapper">
                      <input type="text" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                  </div>
                </div>
              )}

              <div className="input-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>

              <div className="input-group">
                <div className="label-row">
                  <label>Password</label>
                  {isLogin && <a href="#" className="forgot-link">Forgot Password?</a>}
                </div>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                  <button 
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="remember-row" onClick={() => setRememberMe(!rememberMe)}>
                  <div className="checkbox">
                    {rememberMe ? <CheckSquare size={16} fill="#5e0a0b" color="#fff" /> : <Square size={16} color="#888" />}
                  </div>
                  <span>Remember me</span>
                </div>
              )}

              <button type="submit" className="auth-submit-btn">
                {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'} <ChevronRight size={16} />
              </button>

              {isLogin && (
                <>
                  <div className="auth-divider">
                    <span>OR</span>
                  </div>

                  <div className="social-login-row">
                    <button 
                      type="button" 
                      className="social-btn"
                      onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}
                    >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" />
                      Continue with Google
                    </button>
                    <button type="button" className="social-btn">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
                      Continue with Apple
                    </button>
                  </div>
                </>
              )}
              
              <div className="auth-footer">
                <p>
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button 
                    type="button"
                    className="switch-link"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? 'Register Here' : 'Sign In'}
                  </button>
                </p>
              </div>
            </motion.form>
          </AnimatePresence>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AuthPage;
