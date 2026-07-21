import { useState, Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import WhatsAppButton from './components/WhatsAppButton';
import Preloader from './components/Preloader';

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

// A simple loading fallback - returning null to avoid "slow" feeling
const PageLoader = () => null;

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';
  const [isPreloading, setIsPreloading] = useState(true);

  // Prevent scrolling while preloading
  useEffect(() => {
    if (isPreloading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isPreloading]);

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
      <AnimatePresence>
        {isPreloading && (
          <Preloader key="preloader" onComplete={() => setIsPreloading(false)} />
        )}
      </AnimatePresence>
      <div className="app-container">
        {!isAuthPage && <Navbar />}
        <main className="main-content">
          <Suspense fallback={<PageLoader />}>
            <Routes location={location} key={location.pathname}>
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
