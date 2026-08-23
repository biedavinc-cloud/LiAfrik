import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { getProductBySlug } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/sections/Footer';
import { FloatingContact } from '@/sections/Contact';
import CursorGlow from '@/components/CursorGlow';

// Home stays eager (first paint), every other route is code-split so the
// initial bundle stays small — faster load, especially on mobile networks.
import Home from '@/pages/Home';
const ProductPage = lazy(() => import('@/pages/ProductPage'));
const ProductsPage = lazy(() => import('@/pages/ProductsPage'));
const SecurityPage = lazy(() => import('@/pages/SecurityPage'));
const FounderPage = lazy(() => import('@/pages/FounderPage'));
const PresencePage = lazy(() => import('@/pages/PresencePage'));
const SupportPage = lazy(() => import('@/pages/SupportPage'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('@/pages/TermsOfService'));
const ComingSoonPage = lazy(() => import('@/pages/ComingSoonPage'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function PageFallback() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="h-8 w-8 rounded-full border-2 border-liafrik-200 border-t-liafrik-600 animate-spin" />
    </div>
  );
}

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 80);
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [pathname, hash]);
  return null;
}

function ProductOrComingSoon() {
  const { slug = '' } = useParams();
  const product = getProductBySlug(slug);
  if (product && !product.available) return <ComingSoonPage />;
  return <ProductPage />;
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <CursorGlow />
        <ScrollManager />
        <Navbar />
        <main>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:slug" element={<ProductOrComingSoon />} />
              <Route path="/security" element={<SecurityPage />} />
              <Route path="/founder" element={<FounderPage />} />
              <Route path="/presence" element={<PresencePage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <FloatingContact />
      </BrowserRouter>
    </LanguageProvider>
  );
}
