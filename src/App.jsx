import { useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import WhatsAppButton from './components/WhatsAppButton';

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
              <Route path="/bespoke" element={<BespokePage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/shipping-returns" element={<ReturnPolicyPage />} />
            </Routes>
          </Suspense>
        </main>
        {!isAuthPage && <Footer />}
        <WhatsAppButton />
      </div>
    </ReactLenis>
  );
}

export default App;
