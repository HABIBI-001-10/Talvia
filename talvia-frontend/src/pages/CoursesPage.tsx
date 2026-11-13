import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { courseService } from '../services';
import type { Course, CourseCategory } from '../types';
import CourseCard from '../components/CourseCard';
import EnquiryModal from '../components/EnquiryModal';
import SEO from '../components/SEO';
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

  const activeCategoryName = categories.find(c => c.code === category)?.name;
  const pageTitle = activeCategoryName
    ? `${activeCategoryName} Programs & Degrees | TALVIA Consultancy`
    : 'International Academic Programs & Degrees | TALVIA Consultancy';

  const coursesStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://talviastudentsgrowth.in/courses#webpage',
        url: 'https://talviastudentsgrowth.in/courses',
        name: pageTitle,
        description: 'Explore premier Medical (MBBS Abroad & India), Pharmacy (B.Pharm, Pharm.D), Healthcare, Engineering, and Professional degree disciplines.',
        publisher: {
          '@type': 'EducationalOrganization',
          name: 'TALVIA Consultancy',
          url: 'https://talviastudentsgrowth.in',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://talviastudentsgrowth.in/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Courses & Programs',
            item: 'https://talviastudentsgrowth.in/courses',
          },
        ],
      },
    ],
  };

  return (
    <>
      <SEO
        title={pageTitle}
        description="Explore premier Medical (MBBS Abroad & India), Pharmacy (B.Pharm, Pharm.D), Healthcare, Engineering, and Professional degree programs across accredited global universities."
        canonical="https://talviastudentsgrowth.in/courses"
        keywords={[
          'MBBS admission',
          'MBBS abroad',
          'B Pharm colleges',
          'Pharm D admissions',
          'BDS dental degree',
          'BAMS Ayurveda',
          'nursing courses',
          'engineering admissions',
          'global university degrees',
          'medical degrees abroad',
        ]}
        structuredData={coursesStructuredData}
      />

      {/* Header */}
      <div className="bg-gradient-to-b from-[#141824] via-[#18202E] to-[#121620] text-white py-20 border-b border-[#252E3E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="down">
            <p className="text-[#E4C586] font-semibold text-xs uppercase tracking-[0.25em] mb-2">Global Academic Directory</p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">International Degrees & Programs</h1>
            <p className="text-slate-300 max-w-xl text-base font-light">
              Explore globally recognized Medical (MBBS Abroad & India), Pharmacy (B.Pharm/Pharm.D), Healthcare, Engineering, and Professional degree programs.
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
                  ? 'bg-[#181E2A] text-white shadow-sm border border-[#2D384D]'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-[#C59B4E]'
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
                    ? 'bg-[#181E2A] text-[#E8D09E] shadow-sm border border-[#C59B4E]/40 font-bold'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-[#C59B4E]'
                }`}
              >
                {cat.name} <span className="ml-1 opacity-70">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 mb-8 flex items-center gap-3">
            <Search size={18} className="text-[#C59B4E] ml-2" />
            <input
              value={search}
              onChange={e => setParam('search', e.target.value)}
              placeholder="Search courses by keyword, stream (MBBS, B.Pharm, Pharm.D, Engineering)..."
              className="flex-1 py-1 text-sm focus:outline-none bg-transparent text-slate-800"
            />
            {search && (
              <button onClick={() => setParam('search', '')} className="text-slate-400 hover:text-slate-800">
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
