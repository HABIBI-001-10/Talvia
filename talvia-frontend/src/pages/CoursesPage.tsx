import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { courseService } from '../services';
import type { Course, CourseCategory } from '../types';
import CourseCard from '../components/CourseCard';
import EnquiryModal from '../components/EnquiryModal';
import { LoadingSpinner, ErrorMessage, EmptyState } from '../components/ui';

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const search   = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const page     = parseInt(searchParams.get('page') || '1');

  const setParam = (key: string, value: string) => {
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value); else p.delete(key);
    if (key !== 'page') p.delete('page');
    setSearchParams(p);
  };

  useEffect(() => {
    courseService.categories().then(r => setCategories(r.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError('');
    courseService.list({ search, category, page })
      .then(r => { setCourses(r.data.results); setTotal(r.data.count); })
      .catch(() => setError('Failed to load courses. Please try again.'))
      .finally(() => setLoading(false));
  }, [search, category, page]);

  const handleEnquire = (course: Course) => {
    setSelectedCourse(course.name);
    setModalOpen(true);
  };

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#172554] to-[#2563EB] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#FF6633] font-semibold text-sm uppercase tracking-widest mb-2">Academic Programmes</p>
          <h1 className="text-4xl md:text-5xl font-black mb-3">Available Courses</h1>
          <p className="text-blue-200 max-w-xl">Explore a wide range of undergraduate, postgraduate, and professional courses offered by our partner colleges across Kerala.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setParam('category', '')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${!category ? 'bg-[#2563EB] text-white shadow-md' : 'bg-white text-slate-600 border border-gray-200 hover:border-[#2563EB] hover:text-[#2563EB]'}`}
          >
            All Courses
          </button>
          {categories.filter(c => c.count > 0).map(cat => (
            <button
              key={cat.code}
              onClick={() => setParam('category', cat.code)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${category === cat.code ? 'bg-[#2563EB] text-white shadow-md' : 'bg-white text-slate-600 border border-gray-200 hover:border-[#2563EB] hover:text-[#2563EB]'}`}
            >
              {cat.name} <span className="ml-1 opacity-70">({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Search & filter row */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setParam('search', e.target.value)}
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {(search || category) && (
            <button
              onClick={() => setSearchParams({})}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-500 border border-gray-200 rounded-xl px-4 py-2.5 transition-colors"
            >
              <X size={14} /> Clear Filters
            </button>
          )}
        </div>

        <p className="text-slate-500 text-sm mb-6">
          {loading ? 'Searching...' : `${total} course${total !== 1 ? 's' : ''} found`}
        </p>

        {loading ? (
          <LoadingSpinner text="Loading courses..." />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : courses.length === 0 ? (
          <EmptyState title="No courses found" description="Try adjusting your search or category filter." icon="📚" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} onEnquire={handleEnquire} />
            ))}
          </div>
        )}
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setSelectedCourse(''); }}
        prefillCourse={selectedCourse}
        sourcePage="courses-list"
      />
    </>
  );
}

