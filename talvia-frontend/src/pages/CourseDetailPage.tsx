import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, BookOpen, ArrowLeft, CheckCircle2, MessageCircle, Sparkles, MapPin } from 'lucide-react';
import { courseService } from '../services';
import type { Course } from '../types';
import { PageLoader, ErrorMessage } from '../components/ui';
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
        <Link to="/courses" className="text-slate-900 hover:underline font-medium">← Back to Courses</Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-b from-[#141824] via-[#18202E] to-[#121620] text-white py-20 border-b border-[#252E3E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/courses" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-xs uppercase tracking-wider transition-colors">
            <ArrowLeft size={14} /> Back to Courses
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-[#1B2333] text-[#E8D09E] border border-[#C59B4E]/35 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {course.category_display}
            </span>
            {course.degree_type_display && (
              <span className="bg-[#181E2A] text-slate-300 text-xs px-3 py-1 rounded-full border border-[#2D384D]">
                {course.degree_type_display}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">{course.name}</h1>
          <div className="flex flex-wrap gap-5 text-slate-300 text-sm">
            {course.duration && (
              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-[#C59B4E]" /> Duration: {course.duration}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <MapPin size={15} className="text-[#C59B4E]" /> Pan-India & International Admissions Available
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <ScrollReveal direction="up">
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-200/80">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <BookOpen size={16} className="text-[#C59B4E]" /> Course Curriculum Overview
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-line">{course.description}</p>
              </div>
            </ScrollReveal>

            {/* Eligibility */}
            {course.eligibility && (
              <ScrollReveal direction="up">
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-200/80">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#C59B4E]" /> Admission Eligibility Criteria
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">{course.eligibility}</p>
                </div>
              </ScrollReveal>
            )}

            {/* Admissions Advisory Service */}
            <ScrollReveal direction="up">
              <div className="bg-[#FAFBFD] rounded-2xl p-7 border border-slate-200/80 shadow-sm">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-3 border-b border-slate-200/60 flex items-center gap-2">
                  <Sparkles size={16} className="text-[#C59B4E]" /> How Talvia Guides Your Admission
                </h2>
                <div className="space-y-4">
                  {[
                    'Profiling & Institution Shortlisting: We identify recognized universities and colleges matching your academic scores, preferred state, city, or abroad options.',
                    'Entrance Exam & Quota Guidance: Comprehensive counselling for NEET-UG, GPAT, state merit allocations, management quota, and institutional direct seats.',
                    'First-to-End Document Verification: Strict scrutiny of certificates, eligibility criteria, migration forms, and admission paperwork.',
                    'Transparent Fee Advisory: Clear upfront understanding of annual tuition, hostel facilities, and regulatory approvals (NMC / PCI / INC / UGC).',
                    'Direct WhatsApp Assistance: Instant answers to candidate and parent queries from senior academic counsellors.',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#FBF7EE] text-[#C59B4E] border border-[#E8D7B8] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ScrollReveal direction="right">
              <div className="bg-gradient-to-br from-[#181E2A] via-[#1E2535] to-[#141822] text-white rounded-3xl p-7 shadow-xl border border-[#2D384D] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#C59B4E]/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <span className="text-[11px] uppercase tracking-widest text-[#E4C586] font-semibold block mb-1">
                    Admissions Advisory
                  </span>
                  <h3 className="text-xl font-black mb-2 tracking-tight">Need Guidance for {course.name}?</h3>
                  <p className="text-slate-300 text-xs mb-6 leading-relaxed">
                    Connect with our senior education advisors to explore admission procedures, cutoffs, tuition fees, and target locations across India and abroad.
                  </p>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="btn-accent w-full justify-center py-3 flex items-center gap-2 text-sm font-semibold shadow-md"
                  >
                    <MessageCircle size={16} /> Enquire on WhatsApp
                  </button>
                  <div className="mt-6 pt-5 border-t border-[#2D384D] text-xs space-y-2 text-slate-300">
                    <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Direct Helpline Desk</div>
                    <a href="tel:+918943442479" className="text-white font-bold block hover:underline">
                      +91 8943442479
                    </a>
                    <a href="mailto:talviaconsultancy@gmail.com" className="text-slate-300 block hover:underline break-all">
                      talviaconsultancy@gmail.com
                    </a>
                  </div>
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
