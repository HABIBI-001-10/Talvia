import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, BookOpen, GraduationCap, ArrowLeft, Users, CheckCircle2 } from 'lucide-react';
import { courseService } from '../services';
import type { Course } from '../types';
import { PageLoader, ErrorMessage } from '../components/ui';
import CollegeCard from '../components/CollegeCard';
import EnquiryModal from '../components/EnquiryModal';

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    courseService.detail(slug)
      .then(r => setCourse(r.data))
      .catch(() => setError('Course not found.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <PageLoader />;
  if (error || !course) return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <ErrorMessage message={error || 'Course not found.'} />
      <div className="text-center mt-4">
        <Link to="/courses" className="text-[#2563EB] hover:underline font-medium">← Back to Courses</Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-br from-[#172554] to-[#2563EB] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/courses" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 text-sm transition-colors">
            <ArrowLeft size={16} /> Back to Courses
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-[#FF6633]/20 border border-[#FF6633]/30 text-[#FF6633] text-xs font-semibold px-3 py-1 rounded-full">
              {course.category_display}
            </span>
            {course.degree_type_display && (
              <span className="bg-white/10 text-blue-200 text-xs px-3 py-1 rounded-full">
                {course.degree_type_display}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-4">{course.name}</h1>
          <div className="flex flex-wrap gap-5 text-blue-200 text-sm">
            {course.duration && (
              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-[#FF6633]" /> Duration: {course.duration}
              </span>
            )}
            {course.available_colleges && (
              <span className="flex items-center gap-1.5">
                <Users size={15} className="text-[#FF6633]" /> {course.available_colleges.length} colleges offering this
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-[#172554] mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-[#2563EB]" /> Course Overview
              </h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{course.description}</p>
            </div>

            {/* Eligibility */}
            {course.eligibility && (
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-[#172554] mb-4 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-[#2563EB]" /> Eligibility Criteria
                </h2>
                <p className="text-slate-600 leading-relaxed">{course.eligibility}</p>
              </div>
            )}

            {/* Colleges offering this */}
            {course.available_colleges && course.available_colleges.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#172554] mb-5 flex items-center gap-2">
                  <GraduationCap size={20} className="text-[#2563EB]" /> Colleges Offering This Course
                </h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {course.available_colleges.map(college => (
                    <CollegeCard key={college.id} college={college} onEnquire={() => setModalOpen(true)} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Quick facts */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#172554] mb-4">Course Details</h3>
              <div className="space-y-3">
                {[
                  { label: 'Category', value: course.category_display },
                  { label: 'Degree Type', value: course.degree_type_display },
                  { label: 'Duration', value: course.duration },
                ].filter(i => i.value).map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                    <span className="text-slate-500">{label}</span>
                    <span className="font-semibold text-[#172554]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-[#172554] to-[#2563EB] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Interested in this course?</h3>
              <p className="text-blue-200 text-sm mb-5">Get guidance on eligibility, colleges, and admission process.</p>
              <button
                onClick={() => setModalOpen(true)}
                className="w-full bg-[#FF6633] hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Get Free Counselling
              </button>
            </div>
          </div>
        </div>
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        prefillCourse={course.name}
        sourcePage="course-detail"
      />
    </>
  );
}

