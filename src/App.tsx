import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { getProductBySlug } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/sections/Footer';
import { FloatingContact } from '@/sections/Contact';
import Home from '@/pages/Home';
import ProductPage from '@/pages/ProductPage';
import ProductsPage from '@/pages/ProductsPage';
import SecurityPage from '@/pages/SecurityPage';
import FounderPage from '@/pages/FounderPage';
import PresencePage from '@/pages/PresencePage';
import SupportPage from '@/pages/SupportPage';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import ComingSoonPage from '@/pages/ComingSoonPage';
import NotFound from '@/pages/NotFound';

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
        <ScrollManager />
        <Navbar />
        <main>
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
        </main>
        <Footer />
        <FloatingContact />
      </BrowserRouter>
    </LanguageProvider>
  );
}
