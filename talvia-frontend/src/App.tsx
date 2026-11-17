import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation, Link } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import SEO from './components/SEO';
import ErrorBoundary from './components/ErrorBoundary';
import { ScrollToTop } from './components/Animations';

// Route-level code splitting: non-homepage routes loaded on demand
const AboutPage = lazy(() => import('./pages/AboutPage'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const CourseDetailPage = lazy(() => import('./pages/CourseDetailPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const TermsAndConditionsPage = lazy(() => import('./pages/TermsAndConditionsPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));

function RouteLoading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-[#C59B4E] rounded-full animate-spin" />
      <span className="sr-only">Loading page...</span>
    </div>
  );
}

const withSuspense = (Component: React.ComponentType) => (
  <ErrorBoundary>
    <Suspense fallback={<RouteLoading />}>
      <Component />
    </Suspense>
  </ErrorBoundary>
);

function LegacyHashRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If incoming request arrives with a legacy hash route (e.g. /#/about or /#/courses),
    // automatically rewrite it to the clean canonical URL.
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      const cleanPath = window.location.hash.slice(1);
      navigate(cleanPath, { replace: true });
    }
  }, [navigate, location]);

  return null;
}

function NotFound() {
  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4">
      <SEO
        title="404 - Page Not Found | TALVIA Consultancy"
        description="The page you are looking for does not exist or has been relocated."
        noindex={true}
      />
      <div className="text-8xl font-black text-slate-200 mb-4 tracking-tighter">404</div>
      <h2 className="text-2xl font-bold text-slate-900 mb-3">Page Not Found</h2>
      <p className="text-slate-500 mb-6 text-sm">The page you are looking for does not exist or has been relocated.</p>
      <Link to="/" className="btn-primary">
        Return Home
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <LegacyHashRedirect />
        <ScrollToTop />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/"                       element={<HomePage />} />
            <Route path="/about"                  element={withSuspense(AboutPage)} />
            {/* Redirect /colleges to /courses to remove colleges session */}
            <Route path="/colleges"               element={<Navigate to="/courses" replace />} />
            <Route path="/colleges/:slug"         element={<Navigate to="/courses" replace />} />
            <Route path="/courses"                element={withSuspense(CoursesPage)} />
            <Route path="/courses/:slug"          element={withSuspense(CourseDetailPage)} />
            <Route path="/services"               element={withSuspense(ServicesPage)} />
            <Route path="/services/:slug"         element={withSuspense(ServiceDetailPage)} />
            <Route path="/contact"                element={withSuspense(ContactPage)} />
            <Route path="/terms-and-conditions"   element={withSuspense(TermsAndConditionsPage)} />
            <Route path="/terms"                  element={<Navigate to="/terms-and-conditions" replace />} />
            <Route path="/privacy-policy"         element={withSuspense(PrivacyPolicyPage)} />
            <Route path="/privacy"                element={<Navigate to="/privacy-policy" replace />} />
            <Route path="*"                       element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
