import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronDown, ChevronUp, Compass, GraduationCap, BookOpen, FileCheck, ClipboardList, Heart } from 'lucide-react';
import { serviceService } from '../services';
import type { Service } from '../types';
import { PageLoader, ErrorMessage } from '../components/ui';
import EnquiryModal from '../components/EnquiryModal';
import { ScrollReveal } from '../components/Animations';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Compass, GraduationCap, BookOpen, FileCheck, ClipboardList, Heart,
};

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-50 transition-colors"
      >
        <span className="font-semibold text-black text-sm pr-4">{question}</span>
        {open ? <ChevronUp size={18} className="text-black flex-shrink-0" /> : <ChevronDown size={18} className="text-zinc-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-zinc-100 pt-3">
          <p className="text-zinc-600 text-sm leading-relaxed">{answer}</p>
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
        <Link to="/services" className="text-black hover:underline font-medium">← Back to Services</Link>
      </div>
    </div>
  );

  const Icon = ICON_MAP[service.icon] || BookOpen;

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-b from-[#141824] via-[#18202E] to-[#121620] text-white py-20 border-b border-[#252E3E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-xs uppercase tracking-wider transition-colors">
            <ArrowLeft size={14} /> Back to Services
          </Link>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-[#181E2A] text-[#E8D09E] rounded-2xl flex items-center justify-center flex-shrink-0 border border-[#2D384D] shadow-md">
              <Icon size={28} className="text-[#E8D09E]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#E4C586] font-semibold block mb-1">
                Admissions Consultancy
              </span>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">{service.title}</h1>
              <p className="text-slate-300 mt-1 text-sm font-light">{service.short_description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <ScrollReveal direction="up">
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-zinc-200">
                <h2 className="text-xs font-bold text-black uppercase tracking-wider mb-4 pb-3 border-b border-zinc-100">
                  Service Scope & Details
                </h2>
                <p className="text-zinc-600 leading-relaxed text-sm md:text-base whitespace-pre-line">{service.description}</p>
              </div>
            </ScrollReveal>

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <ScrollReveal direction="up">
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-zinc-200">
                  <h2 className="text-xs font-bold text-black uppercase tracking-wider mb-5 pb-3 border-b border-zinc-100">
                    What You Receive
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {service.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-3 p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl">
                        <CheckCircle2 size={16} className="text-black flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-zinc-700 font-medium leading-relaxed">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Process steps */}
            {service.process_steps && service.process_steps.length > 0 && (
              <ScrollReveal direction="up">
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-zinc-200">
                  <h2 className="text-xs font-bold text-black uppercase tracking-wider mb-5 pb-3 border-b border-zinc-100">
                    How We Deliver This Service
                  </h2>
                  <div className="space-y-4">
                    {service.process_steps.map((step, i) => (
                      <div key={i} className="flex items-center gap-4 p-3.5 rounded-xl border border-zinc-200 bg-white">
                        <div className="w-8 h-8 rounded-lg bg-black text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {i + 1}
                        </div>
                        <span className="text-sm font-semibold text-black">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <ScrollReveal direction="up">
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-zinc-200">
                  <h2 className="text-xs font-bold text-black uppercase tracking-wider mb-5 pb-3 border-b border-zinc-100">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {service.faqs.map((faq, i) => (
                      <FAQItem key={i} question={faq.question} answer={faq.answer} />
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ScrollReveal direction="right">
              <div className="bg-gradient-to-br from-[#181E2A] via-[#1E2535] to-[#141822] text-white rounded-3xl p-7 shadow-xl border border-[#2D384D] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#C59B4E]/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <span className="text-[11px] uppercase tracking-widest text-[#E4C586] font-semibold block mb-1">
                    Admissions Consultation
                  </span>
                  <h3 className="text-xl font-black mb-2 tracking-tight">Need {service.title}?</h3>
                  <p className="text-slate-300 text-xs mb-6 leading-relaxed">
                    Our counsellors provide professional, personalized support from the first step to final admission.
                  </p>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="btn-accent w-full justify-center py-3 text-sm font-semibold shadow-md"
                  >
                    Book Consultation
                  </button>
                  <div className="mt-6 pt-5 border-t border-[#2D384D] text-xs space-y-2 text-slate-300">
                    <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Direct Admissions Desk</div>
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

      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} sourcePage={`service_${service.slug}`} />
    </>
  );
}
