import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, Building2, GraduationCap, BookOpen, ArrowLeft, MessageCircle, CheckCircle2 } from 'lucide-react';
import { collegeService } from '../services';
import type { College } from '../types';
import { PageLoader, ErrorMessage } from '../components/ui';
import EnquiryModal from '../components/EnquiryModal';

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
        <Link to="/colleges" className="text-[#2563EB] hover:underline font-medium">← Back to Colleges</Link>
      </div>
    </div>
  );

  const whatsappMsg = `Hello Talvia, I'm interested in ${college.name}. Please provide more information.`;

  return (
    <>
      {/* Banner */}
      <div className="relative bg-gradient-to-br from-[#172554] to-[#2563EB] h-64 md:h-80 overflow-hidden">
        {college.banner_image && (
          <img src={college.banner_image} alt={college.name} className="w-full h-full object-cover opacity-20" />
        )}
        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <Link to="/colleges" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-4 text-sm transition-colors">
            <ArrowLeft size={16} /> Back to Colleges
          </Link>
          <div className="flex items-end gap-5">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
              {college.logo ? (
                <img src={college.logo} alt={`${college.name} logo`} className="w-16 h-16 object-contain" />
              ) : (
                <GraduationCap size={32} className="text-[#2563EB]" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                {college.is_featured && (
                  <span className="bg-[#FF6633] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">Featured</span>
                )}
                {college.accreditation && (
                  <span className="bg-white/20 text-white text-xs px-2.5 py-0.5 rounded-full">{college.accreditation}</span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white">{college.name}</h1>
              <p className="text-blue-200 flex items-center gap-1.5 mt-1">
                <MapPin size={14} /> {college.city && `${college.city}, `}{college.district_display}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-[#172554] mb-4">About the College</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{college.description}</p>
            </div>

            {/* Available Courses */}
            {college.college_courses && college.college_courses.length > 0 && (
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-[#172554] mb-5">Available Courses</h2>
                <div className="space-y-3">
                  {college.college_courses.map(cc => (
                    <div key={cc.id} className="flex items-start justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                      <div className="flex items-start gap-3">
                        <BookOpen size={18} className="text-[#2563EB] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-[#172554] text-sm">
                            <Link to={`/courses/${cc.course_slug}`} className="hover:text-[#2563EB] hover:underline">
                              {cc.course_name}
                            </Link>
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">{cc.course_category} • {cc.course_duration} • {cc.course_degree_type}</p>
                          {cc.eligibility_details && <p className="text-xs text-slate-400 mt-1">{cc.eligibility_details}</p>}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        {cc.fee_amount && (
                          <p className="text-sm font-bold text-[#172554]">₹{Number(cc.fee_amount).toLocaleString()}</p>
                        )}
                        {cc.fee_period && <p className="text-xs text-slate-400">{cc.fee_period}</p>}
                        <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${cc.admission_open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {cc.admission_open ? 'Admission Open' : 'Closed'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {college.gallery_images && college.gallery_images.length > 0 && (
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-[#172554] mb-5">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {college.gallery_images.map(img => (
                    <div key={img.id} className="rounded-xl overflow-hidden aspect-video bg-gray-100">
                      <img src={img.image} alt={img.caption || college.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* CTA */}
            <div className="bg-gradient-to-br from-[#172554] to-[#2563EB] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Interested in this college?</h3>
              <p className="text-blue-200 text-sm mb-5">Get personalised guidance and admission support from our expert counsellors.</p>
              <button
                onClick={() => setModalOpen(true)}
                className="w-full bg-[#FF6633] hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-colors mb-3"
              >
                Enquire Now
              </button>
              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} /> WhatsApp Us
              </a>
            </div>

            {/* Info card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#172554] mb-4">College Information</h3>
              <div className="space-y-3 text-sm">
                {college.affiliated_university && (
                  <div className="flex gap-3">
                    <Building2 size={15} className="text-[#FF6633] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-400 text-xs">Affiliated University</p>
                      <p className="text-slate-700 font-medium">{college.affiliated_university}</p>
                    </div>
                  </div>
                )}
                {college.accreditation && (
                  <div className="flex gap-3">
                    <CheckCircle2 size={15} className="text-[#FF6633] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-400 text-xs">Accreditation</p>
                      <p className="text-slate-700 font-medium">{college.accreditation}</p>
                    </div>
                  </div>
                )}
                {college.established_year && (
                  <div className="flex gap-3">
                    <Building2 size={15} className="text-[#FF6633] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-400 text-xs">Established</p>
                      <p className="text-slate-700 font-medium">{college.established_year}</p>
                    </div>
                  </div>
                )}
                {college.address && (
                  <div className="flex gap-3">
                    <MapPin size={15} className="text-[#FF6633] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-400 text-xs">Address</p>
                      <p className="text-slate-700 font-medium">{college.address}</p>
                    </div>
                  </div>
                )}
                {college.phone && (
                  <a href={`tel:${college.phone}`} className="flex gap-3 hover:text-[#2563EB] transition-colors">
                    <Phone size={15} className="text-[#FF6633] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-400 text-xs">Phone</p>
                      <p className="text-slate-700 font-medium">{college.phone}</p>
                    </div>
                  </a>
                )}
                {college.email && (
                  <a href={`mailto:${college.email}`} className="flex gap-3 hover:text-[#2563EB] transition-colors">
                    <Mail size={15} className="text-[#FF6633] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-400 text-xs">Email</p>
                      <p className="text-slate-700 font-medium">{college.email}</p>
                    </div>
                  </a>
                )}
                {college.website && (
                  <a href={college.website} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-[#2563EB] transition-colors">
                    <Globe size={15} className="text-[#FF6633] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-400 text-xs">Website</p>
                      <p className="text-[#2563EB] font-medium underline">Visit Website</p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        prefillCollege={college.name}
        sourcePage="college-detail"
      />
    </>
  );
}

