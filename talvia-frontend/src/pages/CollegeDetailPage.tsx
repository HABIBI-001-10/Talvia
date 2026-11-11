import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Building2, GraduationCap, BookOpen, ArrowLeft, MessageCircle, CheckCircle2 } from 'lucide-react';
import { collegeService } from '../services';
import type { College } from '../types';
import { PageLoader, ErrorMessage } from '../components/ui';
import EnquiryModal from '../components/EnquiryModal';
import { ScrollReveal } from '../components/Animations';

export default function CollegeDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    collegeService.detail(slug)
      .then(r => setCollege(r.data))
      .catch(() => setError('College not found or failed to load.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <PageLoader />;
  if (error || !college) return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <ErrorMessage message={error || 'College not found.'} />
      <div className="text-center mt-4">
        <Link to="/colleges" className="text-black hover:underline font-medium">← Back to Colleges</Link>
      </div>
    </div>
  );

  const whatsappMsg = `Hello Talvia Consultancy, I'm interested in admissions at ${college.name}. Please guide me on eligibility, fees, and application procedures.`;

  return (
    <>
      {/* Banner */}
      <div className="relative bg-black text-white h-72 md:h-84 overflow-hidden border-b border-zinc-900">
        {college.banner_image ? (
          <img src={college.banner_image} alt={college.name} className="w-full h-full object-cover opacity-20 grayscale" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900 to-black" />
        )}
        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <Link to="/colleges" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-4 text-xs uppercase tracking-wider transition-colors">
            <ArrowLeft size={14} /> Back to Colleges
          </Link>
          <div className="flex items-end gap-5">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0 border border-zinc-200">
              {college.logo ? (
                <img src={college.logo} alt={`${college.name} logo`} className="w-16 h-16 object-contain" />
              ) : (
                <GraduationCap size={36} className="text-black" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                {college.is_featured && (
                  <span className="bg-white text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-zinc-200">
                    Featured College
                  </span>
                )}
                {college.accreditation && (
                  <span className="text-zinc-400 text-xs font-medium">
                    {college.accreditation}
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">{college.name}</h1>
              <div className="flex items-center gap-1.5 text-zinc-400 text-sm mt-1">
                <MapPin size={14} className="text-white" />
                <span>{college.city ? `${college.city}, ` : ''}{college.district_display}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <ScrollReveal direction="up">
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-zinc-200">
                <h2 className="text-xl font-bold text-black mb-4 pb-3 border-b border-zinc-100 uppercase tracking-wide text-sm">
                  Institution Overview
                </h2>
                <p className="text-zinc-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                  {college.description}
                </p>
              </div>
            </ScrollReveal>

            {/* Courses */}
            <ScrollReveal direction="up">
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-zinc-200">
                <h2 className="text-xl font-bold text-black mb-4 pb-3 border-b border-zinc-100 uppercase tracking-wide text-sm">
                  Available Academic Programs
                </h2>
                {college.college_courses && college.college_courses.length > 0 ? (
                  <div className="space-y-4">
                    {college.college_courses.map(cc => (
                      <div key={cc.id} className="border border-zinc-200 rounded-xl p-5 hover:border-black transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <h3 className="font-bold text-black text-base">{cc.course_name}</h3>
                          {cc.fee_amount && (
                            <span className="text-xs font-semibold px-2.5 py-1 bg-zinc-100 rounded-lg text-black">
                              ₹{Number(cc.fee_amount).toLocaleString('en-IN')} {cc.fee_period}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-zinc-500 mb-3">
                          {cc.course_duration && <span>Duration: {cc.course_duration}</span>}
                          {cc.course_degree_type && <span>• {cc.course_degree_type}</span>}
                          {cc.course_category && <span>• {cc.course_category}</span>}
                        </div>
                        {cc.eligibility_details && (
                          <p className="text-xs text-zinc-600 bg-zinc-50 p-2.5 rounded-lg mb-3">
                            <span className="font-semibold text-black">Eligibility:</span> {cc.eligibility_details}
                          </p>
                        )}
                        <button
                          onClick={() => setModalOpen(true)}
                          className="btn-primary text-xs py-2 px-4"
                        >
                          Enquire for Admission
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-zinc-500 text-sm">Course information is being updated for this institution.</p>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* CTA card */}
            <ScrollReveal direction="right">
              <div className="bg-black text-white rounded-3xl p-7 shadow-xl border border-zinc-800">
                <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-semibold block mb-1">
                  Admissions Guidance
                </span>
                <h3 className="text-xl font-black mb-2 tracking-tight">Interested in {college.name}?</h3>
                <p className="text-zinc-400 text-xs mb-6 leading-relaxed">
                  Get personalized guidance, fee concessions, and first-to-end admission support from our expert counsellors.
                </p>
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn-white w-full justify-center py-3 mb-3"
                >
                  Apply / Enquire Now
                </button>
                <a
                  href={`https://wa.me/918943442479?text=${encodeURIComponent(whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle size={17} className="text-emerald-400" /> WhatsApp Admissions
                </a>
              </div>
            </ScrollReveal>

            {/* Info card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
              <h3 className="font-bold text-black mb-4 uppercase tracking-wider text-xs border-b border-zinc-100 pb-2">
                College Quick Facts
              </h3>
              <div className="space-y-3.5 text-sm">
                {college.affiliated_university && (
                  <div className="flex gap-3">
                    <Building2 size={16} className="text-black flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-zinc-400 text-xs">Affiliation</p>
                      <p className="text-zinc-800 font-medium">{college.affiliated_university}</p>
                    </div>
                  </div>
                )}
                {college.accreditation && (
                  <div className="flex gap-3">
                    <CheckCircle2 size={16} className="text-black flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-zinc-400 text-xs">Accreditation</p>
                      <p className="text-zinc-800 font-medium">{college.accreditation}</p>
                    </div>
                  </div>
                )}
                {college.established_year && (
                  <div className="flex gap-3">
                    <BookOpen size={16} className="text-black flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-zinc-400 text-xs">Established</p>
                      <p className="text-zinc-800 font-medium">{college.established_year}</p>
                    </div>
                  </div>
                )}
                {college.address && (
                  <div className="flex gap-3">
                    <MapPin size={16} className="text-black flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-zinc-400 text-xs">Address</p>
                      <p className="text-zinc-800 font-medium leading-snug">{college.address}</p>
                    </div>
                  </div>
                )}
                <div className="pt-2 border-t border-zinc-100">
                  <div className="text-xs text-zinc-400 mb-1">Central Admissions Contact</div>
                  <a href="tel:+918943442479" className="flex items-center gap-2 text-black font-semibold hover:underline">
                    <Phone size={14} /> +91 8943442479
                  </a>
                  <a href="mailto:talviaconsultancy@gmail.com" className="flex items-center gap-2 text-zinc-600 text-xs hover:underline mt-1">
                    <Mail size={14} /> talviaconsultancy@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        prefillCollege={college.name}
        sourcePage={`college_${college.slug}`}
      />
    </>
  );
}
