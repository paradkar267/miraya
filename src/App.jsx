import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WishlistPage from './pages/WishlistPage';
import ContactPage from './pages/ContactPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import AccountPage from './pages/AccountPage';
import AuthPage from './pages/AuthPage';
import LookbookPage from './pages/LookbookPage';
import ErrorBoundary from './components/ErrorBoundary';
import AdminDashboard from './pages/AdminDashboard';
import FAQPage from './pages/FAQPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import ReturnPolicyPage from './pages/ReturnPolicyPage';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
      <div className="app-container">
        {!isAuthPage && <Navbar />}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection/:category" element={<CategoryPage />} />
            <Route path="/product/:category/:id" element={<ProductDetailPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/account" element={
              <ErrorBoundary>
                <AccountPage />
              </ErrorBoundary>
            } />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/lookbook" element={<LookbookPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/shipping-returns" element={<ReturnPolicyPage />} />
          </Routes>
        </main>
        {!isAuthPage && <Footer />}
        <WhatsAppButton />
      </div>
    </ReactLenis>
  );
}

export default App;
