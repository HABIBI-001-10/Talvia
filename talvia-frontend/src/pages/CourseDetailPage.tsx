import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, BookOpen, GraduationCap, ArrowLeft, Users, CheckCircle2 } from 'lucide-react';
import { courseService } from '../services';
import type { Course } from '../types';
import { PageLoader, ErrorMessage } from '../components/ui';
import CollegeCard from '../components/CollegeCard';
import EnquiryModal from '../components/EnquiryModal';
import { ScrollReveal } from '../components/Animations';

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
        <Link to="/courses" className="text-black hover:underline font-medium">← Back to Courses</Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Header */}
      <div className="bg-black text-white py-20 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/courses" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 text-xs uppercase tracking-wider transition-colors">
            <ArrowLeft size={14} /> Back to Courses
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {course.category_display}
            </span>
            {course.degree_type_display && (
              <span className="bg-zinc-900 text-zinc-400 text-xs px-3 py-1 rounded-full border border-zinc-800">
                {course.degree_type_display}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">{course.name}</h1>
          <div className="flex flex-wrap gap-5 text-zinc-400 text-sm">
            {course.duration && (
              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-white" /> Duration: {course.duration}
              </span>
            )}
            {course.available_colleges && (
              <span className="flex items-center gap-1.5">
                <Users size={15} className="text-white" /> {course.available_colleges.length} Partner Institutions
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <ScrollReveal direction="up">
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-zinc-200">
                <h2 className="text-sm font-bold text-black uppercase tracking-wider mb-4 pb-3 border-b border-zinc-100 flex items-center gap-2">
                  <BookOpen size={16} /> Course Curriculum Overview
                </h2>
                <p className="text-zinc-600 leading-relaxed text-sm md:text-base whitespace-pre-line">{course.description}</p>
              </div>
            </ScrollReveal>

            {/* Eligibility */}
            {course.eligibility && (
              <ScrollReveal direction="up">
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-zinc-200">
                  <h2 className="text-sm font-bold text-black uppercase tracking-wider mb-4 pb-3 border-b border-zinc-100 flex items-center gap-2">
                    <CheckCircle2 size={16} /> Eligibility Criteria
                  </h2>
                  <p className="text-zinc-600 leading-relaxed text-sm md:text-base">{course.eligibility}</p>
                </div>
              </ScrollReveal>
            )}

            {/* Colleges offering this */}
            {course.available_colleges && course.available_colleges.length > 0 && (
              <ScrollReveal direction="up">
                <div>
                  <h2 className="text-sm font-bold text-black uppercase tracking-wider mb-5 flex items-center gap-2">
                    <GraduationCap size={18} /> Partner Colleges Offering This Program
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {course.available_colleges.map(college => (
                      <CollegeCard key={college.id} college={college} onEnquire={() => setModalOpen(true)} />
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ScrollReveal direction="right">
              <div className="bg-black text-white rounded-3xl p-7 shadow-xl border border-zinc-800">
                <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-semibold block mb-1">
                  Admissions Advisory
                </span>
                <h3 className="text-xl font-black mb-2 tracking-tight">Need Help Choosing a College?</h3>
                <p className="text-zinc-400 text-xs mb-6 leading-relaxed">
                  Our counsellors match your marks, location preference, and budget with top colleges offering {course.name}.
                </p>
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn-white w-full justify-center py-3"
                >
                  Apply for Counselling
                </button>
                <div className="mt-6 pt-5 border-t border-zinc-800 text-xs space-y-1.5 text-zinc-400">
                  <div>Direct Helpline:</div>
                  <a href="tel:+918943442479" className="text-white font-bold block hover:underline">
                    +91 8943442479
                  </a>
                  <a href="mailto:talviaconsultancy@gmail.com" className="text-zinc-400 block hover:underline">
                    talviaconsultancy@gmail.com
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        prefillCourse={course.name}
        sourcePage={`course_${course.slug}`}
      />
    </>
  );
}
