import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Compass, GraduationCap, FileCheck, ClipboardList, Heart, CheckCircle2 } from 'lucide-react';
import { serviceService } from '../services';
import type { Service } from '../types';
import { LoadingSpinner, ErrorMessage } from '../components/ui';
import EnquiryModal from '../components/EnquiryModal';
import { ScrollReveal, StaggerContainer, StaggerItem, HoverLiftCard } from '../components/Animations';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Compass, GraduationCap, BookOpen, FileCheck, ClipboardList, Heart,
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    serviceService.list()
      .then(r => setServices(r.data))
      .catch(() => setError('Failed to load services.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-b from-[#141824] via-[#18202E] to-[#121620] text-white py-20 border-b border-[#252E3E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="down">
            <p className="text-[#E4C586] font-semibold text-xs uppercase tracking-[0.25em] mb-2">Advisory Solutions</p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Our Consultancy Services</h1>
            <p className="text-slate-300 max-w-xl text-base font-light">
              Comprehensive higher education guidance at every milestone — unbiased, professional, and dedicated to student success.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner size="lg" text="Loading services..." />
          </div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = ICON_MAP[service.icon] || BookOpen;
              return (
                <StaggerItem key={service.id}>
                  <HoverLiftCard className="h-full">
                    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-[#C59B4E]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                      {/* Top Bar */}
                      <div className="bg-[#181E2A] p-7 flex items-center justify-between border-b border-[#252E3E]">
                        <div className="w-13 h-13 bg-[#1F2737] border border-[#2D384D] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Icon size={24} className="text-[#E8D09E]" />
                        </div>
                        <span className="text-[#C59B4E]/30 font-mono text-3xl font-black">
                          0{index + 1}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-7 flex flex-col flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#B48A3D] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                          {service.short_description}
                        </p>

                        {/* Benefits list */}
                        {service.benefits && service.benefits.slice(0, 3).map(b => (
                          <div key={b} className="flex items-start gap-2 mb-2">
                            <CheckCircle2 size={14} className="text-[#C59B4E] flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-600 font-medium">{b}</span>
                          </div>
                        ))}

                        <div className="flex gap-2.5 mt-6 pt-4 border-t border-slate-100">
                          <Link
                            to={`/services/${service.slug}`}
                            className="flex-1 text-center text-xs font-semibold text-slate-800 border border-slate-300 rounded-xl py-2.5 hover:bg-slate-50 hover:border-[#181E2A] transition-colors inline-flex items-center justify-center gap-1 uppercase tracking-wider"
                          >
                            Learn More <ArrowRight size={13} className="text-[#C59B4E]" />
                          </Link>
                          <button
                            onClick={() => setModalOpen(true)}
                            className="flex-1 text-xs font-semibold bg-[#181E2A] hover:bg-[#252E3E] text-white rounded-xl py-2.5 transition-colors uppercase tracking-wider shadow-sm"
                          >
                            Get Guidance
                          </button>
                        </div>
                      </div>
                    </div>
                  </HoverLiftCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </div>

      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} sourcePage="services_list" />
    </>
  );
}
