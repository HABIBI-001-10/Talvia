import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronDown, ChevronUp, Compass, GraduationCap, BookOpen, FileCheck, ClipboardList, Heart } from 'lucide-react';
import { serviceService } from '../services';
import type { Service } from '../types';
import { PageLoader, ErrorMessage } from '../components/ui';
import EnquiryModal from '../components/EnquiryModal';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Compass, GraduationCap, BookOpen, FileCheck, ClipboardList, Heart,
};

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-[#172554] text-sm pr-4">{question}</span>
        {open ? <ChevronUp size={18} className="text-[#2563EB] flex-shrink-0" /> : <ChevronDown size={18} className="text-slate-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4">
          <p className="text-slate-600 text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    serviceService.detail(slug)
      .then(r => setService(r.data))
      .catch(() => setError('Service not found.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <PageLoader />;
  if (error || !service) return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <ErrorMessage message={error || 'Service not found.'} />
      <div className="text-center mt-4">
        <Link to="/services" className="text-[#2563EB] hover:underline font-medium">← Back to Services</Link>
      </div>
    </div>
  );

  const Icon = ICON_MAP[service.icon] || BookOpen;

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-br from-[#172554] to-[#2563EB] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 text-sm transition-colors">
            <ArrowLeft size={16} /> Back to Services
          </Link>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-[#FF6633] rounded-2xl flex items-center justify-center flex-shrink-0">
              <Icon size={30} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black">{service.title}</h1>
              <p className="text-blue-200 mt-1">{service.short_description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-[#172554] mb-4">About This Service</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{service.description}</p>
            </div>

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-[#172554] mb-5">Key Benefits</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                      <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Process */}
            {service.process_steps && service.process_steps.length > 0 && (
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-[#172554] mb-5">How the Process Works</h2>
                <div className="space-y-4">
                  {service.process_steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                        {i + 1}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-slate-700 text-sm">{step}</p>
                        {i < service.process_steps.length - 1 && (
                          <div className="ml-[-28px] mt-3 w-0.5 h-4 bg-blue-200" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-[#172554] mb-5">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {service.faqs.map((faq, i) => (
                    <FAQItem key={i} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-[#172554] to-[#2563EB] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Ready to get started?</h3>
              <p className="text-blue-200 text-sm mb-5">Our experts are available to help you. All services are completely free.</p>
              <button
                onClick={() => setModalOpen(true)}
                className="w-full bg-[#FF6633] hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-colors mb-3"
              >
                Get Free Counselling
              </button>
              <Link
                to="/contact"
                className="w-full border-2 border-white/30 hover:border-white/60 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center"
              >
                Contact Us
              </Link>
            </div>

            {/* Other services */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#172554] mb-4">Other Services</h3>
              {['career-guidance', 'college-selection', 'course-selection', 'admission-assistance', 'application-support', 'student-counselling']
                .filter(s => s !== slug)
                .slice(0, 4)
                .map(s => (
                  <Link
                    key={s}
                    to={`/services/${s}`}
                    className="block py-2.5 text-sm text-slate-600 hover:text-[#2563EB] border-b border-gray-50 last:border-0 transition-colors capitalize"
                  >
                    {s.replace(/-/g, ' ')}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        sourcePage={`service-${service.slug}`}
      />
    </>
  );
}

