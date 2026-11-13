import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation, Link } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ContactPage from './pages/ContactPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import SEO from './components/SEO';
import { ScrollToTop } from './components/Animations';

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
    <BrowserRouter>
      <LegacyHashRedirect />
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/"                       element={<HomePage />} />
          <Route path="/about"                  element={<AboutPage />} />
          {/* Redirect /colleges to /courses to remove colleges session */}
          <Route path="/colleges"               element={<Navigate to="/courses" replace />} />
          <Route path="/colleges/:slug"         element={<Navigate to="/courses" replace />} />
          <Route path="/courses"                element={<CoursesPage />} />
          <Route path="/courses/:slug"          element={<CourseDetailPage />} />
          <Route path="/services"               element={<ServicesPage />} />
          <Route path="/services/:slug"         element={<ServiceDetailPage />} />
          <Route path="/contact"                element={<ContactPage />} />
          <Route path="/terms-and-conditions"   element={<TermsAndConditionsPage />} />
          <Route path="/terms"                  element={<Navigate to="/terms-and-conditions" replace />} />
          <Route path="/privacy-policy"         element={<PrivacyPolicyPage />} />
          <Route path="/privacy"                element={<Navigate to="/privacy-policy" replace />} />
          <Route path="*"                       element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
