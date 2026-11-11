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
      <div className="bg-black text-white py-20 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="down">
            <p className="text-zinc-400 font-semibold text-xs uppercase tracking-[0.25em] mb-2">Advisory Solutions</p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Our Consultancy Services</h1>
            <p className="text-zinc-400 max-w-xl text-base font-light">
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
                    <div className="bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:border-black shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                      {/* Top Bar */}
                      <div className="bg-black p-8 flex items-center justify-between border-b border-zinc-800">
                        <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Icon size={26} className="text-white" />
                        </div>
                        <span className="text-zinc-600 font-mono text-4xl font-black">
                          0{index + 1}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-7 flex flex-col flex-1">
                        <h3 className="text-xl font-bold text-black mb-3 group-hover:text-zinc-700 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-zinc-600 text-sm leading-relaxed mb-6 flex-1">
                          {service.short_description}
                        </p>

                        {/* Benefits list */}
                        {service.benefits && service.benefits.slice(0, 3).map(b => (
                          <div key={b} className="flex items-start gap-2 mb-2">
                            <CheckCircle2 size={14} className="text-black flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-zinc-600 font-medium">{b}</span>
                          </div>
                        ))}

                        <div className="flex gap-2.5 mt-6 pt-4 border-t border-zinc-100">
                          <Link
                            to={`/services/${service.slug}`}
                            className="flex-1 text-center text-xs font-semibold text-black border border-zinc-300 rounded-xl py-2.5 hover:bg-zinc-50 hover:border-black transition-colors inline-flex items-center justify-center gap-1 uppercase tracking-wider"
                          >
                            Learn More <ArrowRight size={13} />
                          </Link>
                          <button
                            onClick={() => setModalOpen(true)}
                            className="flex-1 text-xs font-semibold bg-black hover:bg-zinc-800 text-white rounded-xl py-2.5 transition-colors uppercase tracking-wider"
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
