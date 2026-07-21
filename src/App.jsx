import { useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import WhatsAppButton from './components/WhatsAppButton';
import PageTransition from './components/PageTransition';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const LookbookPage = lazy(() => import('./pages/LookbookPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const ReturnPolicyPage = lazy(() => import('./pages/ReturnPolicyPage'));
const BespokePage = lazy(() => import('./pages/BespokePage'));

// A simple loading fallback
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', color: 'var(--primary-burgundy)' }}>
    <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontStyle: 'italic' }}>Loading Miraya...</p>
  </div>
);

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
      <div className="app-container">
        {!isAuthPage && <Navbar />}
        <main className="main-content">
          <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/collection/:category" element={<PageTransition><CategoryPage /></PageTransition>} />
                <Route path="/product/:category/:id" element={<PageTransition><ProductDetailPage /></PageTransition>} />
                <Route path="/wishlist" element={<PageTransition><WishlistPage /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
                <Route path="/search" element={<PageTransition><SearchPage /></PageTransition>} />
                <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
                <Route path="/account" element={
                  <ErrorBoundary>
                    <PageTransition><AccountPage /></PageTransition>
                  </ErrorBoundary>
                } />
                <Route path="/auth" element={<PageTransition><AuthPage /></PageTransition>} />
                <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
                <Route path="/lookbook" element={<PageTransition><LookbookPage /></PageTransition>} />
                <Route path="/bespoke" element={<PageTransition><BespokePage /></PageTransition>} />
                <Route path="/faq" element={<PageTransition><FAQPage /></PageTransition>} />
                <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicyPage /></PageTransition>} />
                <Route path="/terms" element={<PageTransition><TermsPage /></PageTransition>} />
                <Route path="/shipping-returns" element={<PageTransition><ReturnPolicyPage /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>
        {!isAuthPage && <Footer />}
        <WhatsAppButton />
      </div>
    </ReactLenis>
  );
}

export default App;
