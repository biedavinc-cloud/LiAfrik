import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { getProductBySlug } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/sections/Footer';
import { FloatingContact } from '@/sections/Contact';
import Home from '@/pages/Home';
import ProductPage from '@/pages/ProductPage';
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
            <Route path="/products/:slug" element={<ProductOrComingSoon />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <FloatingContact />
      </BrowserRouter>
    </LanguageProvider>
  );
}
