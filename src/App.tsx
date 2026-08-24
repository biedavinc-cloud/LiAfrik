import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { useCurrentLang } from '@/components/Link';
import { useHreflang } from '@/lib/useSEO';
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

/**
 * Layout for every localized route (/en/... or /fr/...).
 * Validates the :lang segment, wires up LanguageProvider from the URL,
 * and renders the chrome (nav/footer) shared by every page — identical
 * to what App used to render directly, just now URL-language-aware.
 */
function LocalizedLayout() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const validLang = lang === 'en' || lang === 'fr';
  useHreflang(validLang ? location.pathname : '/en');

  if (!validLang) {
    return (
      <Suspense fallback={<PageFallback />}>
        <NotFound />
      </Suspense>
    );
  }

  return (
    <LanguageProvider lang={lang}>
      <CursorGlow />
      <ScrollManager />
      <Navbar />
      <main>
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingContact />
    </LanguageProvider>
  );
}

/** "/" → redirect to the visitor's preferred language, preserving hash/search. */
function RootRedirect() {
  const lang = useCurrentLang();
  const { search, hash } = useLocation();
  return <Navigate to={`/${lang}${search}${hash}`} replace />;
}

/** Legacy (no-lang) bookmarked paths → same page, under the preferred language. */
function LegacyRedirect({ suffix }: { suffix: string }) {
  const lang = useCurrentLang();
  const { search, hash } = useLocation();
  return <Navigate to={`/${lang}/${suffix}${search}${hash}`} replace />;
}

function LegacyProductRedirect() {
  const lang = useCurrentLang();
  const { slug = '' } = useParams();
  return <Navigate to={`/${lang}/products/${slug}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Canonical, indexable, language-prefixed routes */}
        <Route path="/:lang" element={<LocalizedLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:slug" element={<ProductOrComingSoon />} />
          <Route path="security" element={<SecurityPage />} />
          <Route path="founder" element={<FounderPage />} />
          <Route path="presence" element={<PresencePage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
        </Route>

        {/* Legacy bookmarks / old links without a language prefix */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="/products" element={<LegacyRedirect suffix="products" />} />
        <Route path="/products/:slug" element={<LegacyProductRedirect />} />
        <Route path="/security" element={<LegacyRedirect suffix="security" />} />
        <Route path="/founder" element={<LegacyRedirect suffix="founder" />} />
        <Route path="/presence" element={<LegacyRedirect suffix="presence" />} />
        <Route path="/support" element={<LegacyRedirect suffix="support" />} />
        <Route path="/privacy" element={<LegacyRedirect suffix="privacy" />} />
        <Route path="/terms" element={<LegacyRedirect suffix="terms" />} />

        <Route path="*" element={
          <Suspense fallback={<PageFallback />}>
            <NotFound />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  );
}
