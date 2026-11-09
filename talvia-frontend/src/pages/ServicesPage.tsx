import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Compass, GraduationCap, FileCheck, ClipboardList, Heart } from 'lucide-react';
import { serviceService } from '../services';
import type { Service } from '../types';
import { LoadingSpinner, ErrorMessage } from '../components/ui';
import EnquiryModal from '../components/EnquiryModal';

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
      <div className="bg-gradient-to-r from-[#172554] to-[#2563EB] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#FF6633] font-semibold text-sm uppercase tracking-widest mb-2">What We Offer</p>
          <h1 className="text-4xl md:text-5xl font-black mb-3">Our Services</h1>
          <p className="text-blue-200 max-w-xl">Comprehensive education guidance at every step of your academic journey — all free for students.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <LoadingSpinner text="Loading services..." />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = ICON_MAP[service.icon] || BookOpen;
              const colors = [
                'from-blue-500 to-blue-600',
                'from-indigo-500 to-indigo-600',
                'from-purple-500 to-purple-600',
                'from-orange-500 to-orange-600',
                'from-green-500 to-green-600',
                'from-pink-500 to-pink-600',
              ];
              return (
                <div key={service.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
                  {/* Card top */}
                  <div className={`bg-gradient-to-br ${colors[index % colors.length]} p-8 flex items-center justify-between`}>
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Icon size={30} className="text-white" />
                    </div>
                    <span className="text-white/60 text-5xl font-black">0{index + 1}</span>
                  </div>
                  {/* Card body */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#172554] mb-3">{service.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-5">{service.short_description}</p>

                    {/* Benefits preview */}
                    {service.benefits && service.benefits.slice(0, 3).map(b => (
                      <div key={b} className="flex items-start gap-2 mb-2">
                        <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        </div>
                        <span className="text-xs text-slate-500">{b}</span>
                      </div>
                    ))}

                    <div className="flex gap-2 mt-5">
                      <Link
                        to={`/services/${service.slug}`}
                        className="flex-1 text-center text-sm font-semibold text-[#2563EB] border-2 border-[#2563EB] rounded-xl py-2.5 hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-1"
                      >
                        Learn More <ArrowRight size={14} />
                      </Link>
                      <button
                        onClick={() => setModalOpen(true)}
                        className="flex-1 text-sm font-semibold bg-[#FF6633] hover:bg-orange-600 text-white rounded-xl py-2.5 transition-colors"
                      >
                        Get Help
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} sourcePage="services-list" />
    </>
  );
}

