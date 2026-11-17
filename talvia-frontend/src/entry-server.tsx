import { renderToString } from 'react-dom/server';
import { StaticRouter, Routes, Route, Navigate } from 'react-router-dom';
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

export function ServerAppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/"                       element={<HomePage />} />
        <Route path="/about"                  element={<AboutPage />} />
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
      </Route>
    </Routes>
  );
}

export function render(url: string): string {
  const element = (
    <StaticRouter location={url}>
      <ServerAppRoutes />
    </StaticRouter>
  );

  return renderToString(element);
}
