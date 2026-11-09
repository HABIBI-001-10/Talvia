import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CollegesPage from './pages/CollegesPage';
import CollegeDetailPage from './pages/CollegeDetailPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ContactPage from './pages/ContactPage';

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl font-black text-gray-200 mb-4">404</div>
      <h2 className="text-2xl font-bold text-[#172554] mb-3">Page Not Found</h2>
      <p className="text-slate-500 mb-6">The page you're looking for doesn't exist.</p>
      <a href="/" className="bg-[#FF6633] hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
        Go Home
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/"                       element={<HomePage />} />
          <Route path="/about"                  element={<AboutPage />} />
          <Route path="/colleges"               element={<CollegesPage />} />
          <Route path="/colleges/:slug"         element={<CollegeDetailPage />} />
          <Route path="/courses"                element={<CoursesPage />} />
          <Route path="/courses/:slug"          element={<CourseDetailPage />} />
          <Route path="/services"               element={<ServicesPage />} />
          <Route path="/services/:slug"         element={<ServiceDetailPage />} />
          <Route path="/contact"                element={<ContactPage />} />
          <Route path="*"                       element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
