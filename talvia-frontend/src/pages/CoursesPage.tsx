import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { courseService } from '../services';
import type { Course, CourseCategory } from '../types';
import CourseCard from '../components/CourseCard';
import EnquiryModal from '../components/EnquiryModal';
import { LoadingSpinner, ErrorMessage, EmptyState } from '../components/ui';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/Animations';

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
      <div className="bg-black text-white py-20 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="down">
            <p className="text-zinc-400 font-semibold text-xs uppercase tracking-[0.25em] mb-2">Curriculum Directory</p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Academic Programs & Degrees</h1>
            <p className="text-zinc-400 max-w-xl text-base font-light">
              Explore in-demand undergraduate, postgraduate, and professional disciplines offered by partner colleges across India.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category pills */}
        <ScrollReveal direction="up">
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setParam('category', '')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                !category
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white text-zinc-700 border border-zinc-200 hover:border-black'
              }`}
            >
              All Programs
            </button>
            {categories.filter(c => c.count > 0).map(cat => (
              <button
                key={cat.code}
                onClick={() => setParam('category', cat.code)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  category === cat.code
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-white text-zinc-700 border border-zinc-200 hover:border-black'
                }`}
              >
                {cat.name} <span className="ml-1 opacity-70">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-4 mb-8 flex items-center gap-3">
            <Search size={18} className="text-zinc-400 ml-2" />
            <input
              value={search}
              onChange={e => setParam('search', e.target.value)}
              placeholder="Search courses by keyword, stream, eligibility..."
              className="flex-1 py-1 text-sm focus:outline-none bg-transparent"
            />
            {search && (
              <button onClick={() => setParam('search', '')} className="text-zinc-400 hover:text-black">
                <X size={16} />
              </button>
            )}
          </div>
        </ScrollReveal>

        {/* Results summary */}
        {!loading && (
          <div className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-6">
            Showing {courses.length} of {total} Available Courses
          </div>
        )}

        {/* Course Grid */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => setParam('page', '1')} />
        ) : courses.length === 0 ? (
          <EmptyState
            title="No Courses Found"
            description="Try modifying your search or select a different academic category."
            action={{ label: 'View All Courses', onClick: () => setSearchParams({}) }}
          />
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <StaggerItem key={course.id}>
                <CourseCard course={course} onEnquire={handleEnquire} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setSelectedCourse(''); }}
        prefillCourse={selectedCourse}
        sourcePage="courses_list"
      />
    </>
  );
}
