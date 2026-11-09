import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Star, Users, Building2, BookOpen, Compass, GraduationCap, FileCheck, ClipboardList, Heart, CheckCircle2, Phone, Send } from 'lucide-react';
import { collegeService, serviceService, enquiryService } from '../services';
import type { College, Service } from '../types';
import CollegeCard from '../components/CollegeCard';
import EnquiryModal from '../components/EnquiryModal';

// ─── Animated counter ──────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '' }: { target: number | string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const numTarget = typeof target === 'string' ? parseInt(target) : target;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(numTarget / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= numTarget) { setCount(numTarget); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [started, numTarget]);

  return <div ref={ref}>{count}{suffix}</div>;
}

// ─── Service icon map ──────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Compass, GraduationCap, BookOpen, FileCheck, ClipboardList, Heart,
};

// ─── Home Page ─────────────────────────────────────────────────────────────
export default function HomePage() {
  const [featuredColleges, setFeaturedColleges] = useState<College[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState('');
  const [loading, setLoading] = useState(true);

  // Enquiry form state
  const [form, setForm] = useState({ student_name: '', phone: '', email: '', district: '', interested_course: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    Promise.all([
      collegeService.featured().then(r => setFeaturedColleges(r.data.slice(0, 6))),
      serviceService.list().then(r => setServices(r.data)),
    ]).finally(() => setLoading(false));
  }, []);

  const handleEnquire = (college: College) => {
    setSelectedCollege(college.name);
    setModalOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setFormErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.student_name.trim()) errs.student_name = 'Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }
    setFormStatus('loading');
    try {
      await enquiryService.submit({ ...form, preferred_college: '', enquiry_type: 'general', source_page: 'homepage' });
      setFormStatus('success');
      setForm({ student_name: '', phone: '', email: '', district: '', interested_course: '', message: '' });
    } catch {
      setFormStatus('error');
    }
  };

  const DISTRICTS = ['Thiruvananthapuram','Kollam','Pathanamthitta','Alappuzha','Kottayam','Idukki','Ernakulam','Thrissur','Palakkad','Malappuram','Kozhikode','Wayanad','Kannur','Kasaragod'];

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#172554] via-[#1e3a8a] to-[#2563EB] overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF6633] rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-300 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#FF6633]/20 border border-[#FF6633]/30 rounded-full px-4 py-1.5 mb-6">
              <Star size={14} className="text-[#FF6633]" fill="#FF6633" />
              <span className="text-[#FF6633] text-sm font-semibold tracking-wide">YOUR FUTURE STARTS HERE</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Find the Right College.{' '}
              <span className="text-[#FF6633]">Build the Right Future.</span>
            </h1>

            <p className="text-blue-200 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              Discover educational opportunities across Kerala with Talvia. We connect students with trusted colleges, provide personalised guidance, and simplify the admission journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/colleges"
                className="inline-flex items-center justify-center gap-2 bg-[#FF6633] hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-orange-500/30 hover:shadow-2xl text-lg"
              >
                Explore Colleges <ArrowRight size={20} />
              </Link>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-lg"
              >
                Get Free Counselling
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap gap-6">
              {[
                { icon: Building2, text: '25+ Partner Colleges' },
                { icon: Users, text: 'All 14 Kerala Districts' },
                { icon: BookOpen, text: 'Multiple Courses' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-blue-200">
                  <Icon size={16} className="text-[#FF6633]" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full text-[#F5F8FC]" fill="currentColor">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: 25, suffix: '+', label: 'Partner Colleges', icon: Building2 },
              { value: 14, suffix: '', label: 'Kerala Districts', icon: Star },
              { value: 10, suffix: '+', label: 'Course Categories', icon: BookOpen },
              { value: 100, suffix: '%', label: 'Student-First', icon: Users },
            ].map(({ value, suffix, label, icon: Icon }) => (
              <div key={label} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-3 group-hover:bg-[#2563EB] transition-colors">
                  <Icon size={22} className="text-[#2563EB] group-hover:text-white transition-colors" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-[#172554]">
                  <AnimatedCounter target={value} suffix={suffix} />
                </div>
                <div className="text-slate-500 text-sm font-medium mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F5F8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#FF6633] font-semibold text-sm uppercase tracking-widest mb-3">About Talvia</p>
              <h2 className="text-3xl md:text-4xl font-black text-[#172554] mb-5 leading-tight">
                Kerala's Trusted Education Partner
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Talvia is a leading education consultancy in Kerala, dedicated to helping students navigate their academic journey. We provide comprehensive guidance on college selection, course counselling, and admission assistance across all 14 districts of Kerala.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Our experienced team works closely with students and parents to ensure the best educational outcomes. With a network of 25+ partner colleges, we make finding the right institution simple and stress-free.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { title: 'Our Vision', text: "To be Kerala's most trusted education partner, empowering every student to make informed decisions." },
                  { title: 'Our Mission', text: 'To provide accessible, transparent, and personalized education guidance to students across Kerala.' },
                ].map(({ title, text }) => (
                  <div key={title} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <h4 className="font-bold text-[#172554] mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-[#FF6633] rounded-full flex items-center justify-center text-white text-xs">✦</span>
                      {title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 text-[#2563EB] font-semibold hover:gap-3 transition-all">
                Learn More About Us <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#172554] to-[#2563EB] rounded-3xl p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF6633]/20 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-6">Why Students Choose Talvia</h3>
                  {[
                    '25+ verified partner colleges',
                    'Personalised one-on-one guidance',
                    'Coverage across all 14 districts',
                    'Free counselling sessions',
                    'End-to-end admission support',
                    'Student-first approach always',
                  ].map(point => (
                    <div key={point} className="flex items-center gap-3 mb-3">
                      <CheckCircle2 size={18} className="text-[#FF6633] flex-shrink-0" />
                      <span className="text-blue-100 text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[#FF6633] font-semibold text-sm uppercase tracking-widest mb-3">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#172554] mb-4">Our Services</h2>
            <p className="text-slate-600">Comprehensive education guidance to help you make the right decisions at every step of your academic journey.</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-56 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const Icon = ICON_MAP[service.icon] || BookOpen;
                return (
                  <div
                    key={service.id}
                    className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#2563EB] transition-colors">
                      <Icon size={26} className="text-[#2563EB] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-bold text-[#172554] text-lg mb-2">{service.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{service.short_description}</p>
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-[#2563EB] text-sm font-semibold hover:gap-2.5 transition-all"
                    >
                      Learn More <ChevronRight size={15} />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── FEATURED COLLEGES ─────────────────────────────────────────── */}
      <section className="py-20 bg-[#F5F8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-[#FF6633] font-semibold text-sm uppercase tracking-widest mb-3">Our Network</p>
              <h2 className="text-3xl md:text-4xl font-black text-[#172554]">Featured Partner Colleges</h2>
            </div>
            <Link to="/colleges" className="inline-flex items-center gap-2 text-[#2563EB] font-semibold hover:gap-3 transition-all whitespace-nowrap">
              View All Colleges <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <div key={i} className="bg-gray-100 rounded-2xl h-72 animate-pulse" />)}
            </div>
          ) : featuredColleges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredColleges.map(college => (
                <CollegeCard key={college.id} college={college} onEnquire={handleEnquire} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-500">
              <Building2 size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Partner college data will appear here once configured in the admin.</p>
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/colleges" className="inline-flex items-center gap-2 bg-[#172554] hover:bg-blue-900 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors">
              View All Partner Colleges <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[#FF6633] font-semibold text-sm uppercase tracking-widest mb-3">The Process</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#172554] mb-4">How It Works</h2>
            <p className="text-slate-600">From your first enquiry to final admission — we're with you at every step.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#2563EB] to-[#FF6633] z-0" />

            {[
              { step: '01', title: 'Share Requirements', desc: 'Tell us your academic background, interests, and preferred districts or courses.', color: 'bg-blue-500' },
              { step: '02', title: 'Explore Colleges', desc: 'Browse our curated list of partner colleges filtered by district, course, and preference.', color: 'bg-indigo-500' },
              { step: '03', title: 'Receive Guidance', desc: 'Our counsellors analyze your profile and recommend the best-fit colleges and courses.', color: 'bg-purple-500' },
              { step: '04', title: 'Proceed With Admission', desc: 'Get complete support through the application, documentation, and enrollment process.', color: 'bg-[#FF6633]' },
            ].map(({ step, title, desc, color }) => (
              <div key={step} className="relative z-10 text-center group">
                <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white font-black text-xl">{step}</span>
                </div>
                <h3 className="font-bold text-[#172554] text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-[#172554] via-[#1e3a8a] to-[#2563EB] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FF6633]/20 border border-[#FF6633]/30 rounded-full px-4 py-1.5 mb-5">
            <Star size={14} className="text-[#FF6633]" fill="#FF6633" />
            <span className="text-[#FF6633] text-sm font-semibold">Start Your Journey Today</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight">
            Your Dream College Is Closer Than You Think
          </h2>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
            Connect with our education experts today and take the first step towards the college of your dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-[#FF6633] hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg text-lg"
            >
              Get Free Counselling <ArrowRight size={20} />
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-lg"
            >
              <Phone size={20} /> Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── ENQUIRY FORM ──────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F5F8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[#FF6633] font-semibold text-sm uppercase tracking-widest mb-3">Quick Enquiry</p>
              <h2 className="text-3xl md:text-4xl font-black text-[#172554] mb-4">Tell Us About Yourself</h2>
              <p className="text-slate-600 mb-8">Fill in your details and our counsellor will reach out to guide you through the best options.</p>

              {[
                { icon: '📞', title: 'Free Consultation', desc: 'No charges. Ever. Our guidance is 100% free.' },
                { icon: '⚡', title: 'Quick Response', desc: 'Our team responds within 24 hours of your enquiry.' },
                { icon: '🎯', title: 'Personalised Guidance', desc: 'Recommendations tailored to your profile and goals.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4 mb-5">
                  <div className="text-2xl">{icon}</div>
                  <div>
                    <h4 className="font-bold text-[#172554] mb-1">{title}</h4>
                    <p className="text-slate-500 text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              {formStatus === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#172554] mb-2">Enquiry Submitted!</h3>
                  <p className="text-slate-600 mb-6">Our counsellor will contact you within 24 hours.</p>
                  <button onClick={() => setFormStatus('idle')} className="btn-primary w-full justify-center">Submit Another</button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 block mb-1">Full Name *</label>
                      <input name="student_name" value={form.student_name} onChange={handleFormChange} placeholder="Your name"
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.student_name ? 'border-red-400' : 'border-gray-200'}`} />
                      {formErrors.student_name && <p className="text-red-500 text-xs mt-1">{formErrors.student_name}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 block mb-1">Phone Number *</label>
                      <input name="phone" value={form.phone} onChange={handleFormChange} placeholder="+91 98765 43210" type="tel"
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.phone ? 'border-red-400' : 'border-gray-200'}`} />
                      {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1">Email Address</label>
                    <input name="email" value={form.email} onChange={handleFormChange} placeholder="your@email.com" type="email"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 block mb-1">Your District</label>
                      <select name="district" value={form.district} onChange={handleFormChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select District</option>
                        {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 block mb-1">Interested Course</label>
                      <input name="interested_course" value={form.interested_course} onChange={handleFormChange} placeholder="e.g. BCA, BCom..."
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1">Message</label>
                    <textarea name="message" value={form.message} onChange={handleFormChange} rows={3}
                      placeholder="Tell us more about your requirements..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                  </div>
                  {formStatus === 'error' && (
                    <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-2">Something went wrong. Please try again.</p>
                  )}
                  <button type="submit" disabled={formStatus === 'loading'}
                    className="w-full bg-[#FF6633] hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                    {formStatus === 'loading' ? (
                      <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting...</>
                    ) : (
                      <><Send size={16} /> Submit Enquiry</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── ENQUIRY MODAL ─────────────────────────────────────────────── */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setSelectedCollege(''); }}
        prefillCollege={selectedCollege}
        sourcePage="homepage"
      />
    </>
  );
}

