import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Star, Users, Building2, BookOpen, Compass, GraduationCap, FileCheck, ClipboardList, Heart, CheckCircle2, Phone, Send } from 'lucide-react';
import { collegeService, serviceService, enquiryService } from '../services';
import type { College, Service } from '../types';
import CollegeCard from '../components/CollegeCard';
import EnquiryModal, { INDIAN_STATES } from '../components/EnquiryModal';
import { ScrollReveal, StaggerContainer, StaggerItem, AnimatedNumber, HoverLiftCard } from '../components/Animations';

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

  // Quick Enquiry form state
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
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
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

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center bg-black text-white overflow-hidden border-b border-zinc-900">
        {/* Subtle monochrome geometric background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-zinc-700 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-zinc-800 rounded-full blur-[140px]" />
        </div>

        {/* Minimalist grid lines */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            {/* Tagline pill */}
            <ScrollReveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 mb-7">
                <Star size={13} className="text-white" fill="white" />
                <span className="text-zinc-300 text-xs font-semibold uppercase tracking-widest">
                  YOUR EDUCATION. YOUR FUTURE. OUR GUIDANCE.
                </span>
              </div>
            </ScrollReveal>

            {/* Main Heading */}
            <ScrollReveal direction="up" delay={0.2}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                Find the Right College Across India.{' '}
                <span className="text-zinc-400">Build Your Future.</span>
              </h1>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl font-light">
                Discover premier educational opportunities across India with Talvia Consultancy. We connect aspiring students with trusted colleges and universities nationwide, providing personalised guidance from first step to final admission.
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal direction="up" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/colleges"
                  className="btn-white text-base py-3.5 px-8 justify-center shadow-lg hover:shadow-white/10"
                >
                  Explore Partner Colleges <ArrowRight size={18} />
                </Link>
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn-outline-white text-base py-3.5 px-8 justify-center"
                >
                  Get Free Counselling
                </button>
              </div>
            </ScrollReveal>

            {/* Trust Badges */}
            <ScrollReveal direction="up" delay={0.5}>
              <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-wrap gap-8 text-zinc-400 text-sm">
                {[
                  { icon: Building2, text: '25+ Partner Colleges Across India' },
                  { icon: Users, text: 'Pan-India Reach (28+ States)' },
                  { icon: BookOpen, text: 'Multiple Course Streams' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <Icon size={16} className="text-white" />
                    <span className="font-medium text-zinc-300">{text}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ──────────────────────────────────────────────── */}
      <section className="bg-white py-12 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: 25, suffix: '+', label: 'Partner Colleges', icon: Building2 },
              { value: 28, suffix: '+', label: 'States Covered', icon: Star },
              { value: 100, suffix: '+', label: 'Course Programs', icon: BookOpen },
              { value: 100, suffix: '%', label: 'Student-First Guidance', icon: Users },
            ].map(({ value, suffix, label, icon: Icon }) => (
              <ScrollReveal key={label} direction="up">
                <div className="text-center group p-4 rounded-2xl hover:bg-zinc-50 transition-colors">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-100 rounded-xl mb-3 group-hover:bg-black transition-colors duration-300 border border-zinc-200">
                    <Icon size={22} className="text-black group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-black tracking-tight">
                    <AnimatedNumber target={value} suffix={suffix} />
                  </div>
                  <div className="text-zinc-500 text-sm font-medium mt-1">{label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ──────────────────────────────────────────────── */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div>
                <p className="section-subtitle mb-3">About Talvia Consultancy</p>
                <h2 className="section-title mb-6 leading-tight">
                  India's Trusted Higher Education Consultancy
                </h2>
                <p className="text-zinc-600 leading-relaxed mb-5 text-base">
                  Talvia Consultancy is a leading education advisory firm connecting aspiring students with accredited colleges and universities across India. We provide unbiased, personalized guidance on university selection, course selection, and admission procedures from first step to final admission.
                </p>
                <p className="text-zinc-600 leading-relaxed mb-8 text-base">
                  Our experienced counsellors work directly with students and parents to evaluate career goals, eligibility, and academic aspirations. With a trusted network of 25+ partner institutions nationwide, we make finding the right institution straightforward, transparent, and completely stress-free.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { title: 'Our Vision', text: 'To be India’s most trusted education consultancy, empowering students from every state to reach their full potential.' },
                    { title: 'Our Mission', text: 'To provide accessible, transparent, and student-first admission guidance without bias or hidden charges.' },
                  ].map(({ title, text }) => (
                    <div key={title} className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-sm">
                      <h4 className="font-bold text-black mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center text-white text-[10px]">✦</span>
                        {title}
                      </h4>
                      <p className="text-xs text-zinc-500 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>

                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-black font-semibold hover:gap-3 transition-all text-sm uppercase tracking-wider"
                >
                  Learn More About Us <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative">
                <div className="bg-black text-white rounded-3xl p-10 shadow-2xl border border-zinc-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-zinc-800 rounded-full blur-3xl opacity-50" />
                  <div className="relative z-10">
                    <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold block mb-2">
                      Professional Advisory
                    </span>
                    <h3 className="text-2xl font-black mb-6 tracking-tight">Why Choose Talvia Consultancy?</h3>
                    <div className="space-y-4">
                      {[
                        '25+ accredited partner colleges across India',
                        'Personalised one-on-one counselling sessions',
                        'Pan-India admissions support across 28+ states',
                        '100% free guidance and transparent counsel',
                        'First-to-end admission guidance and document assistance',
                        'Student-first advocacy in all recommendations',
                      ].map((point) => (
                        <div key={point} className="flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-white flex-shrink-0 mt-0.5" />
                          <span className="text-zinc-300 text-sm">{point}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-zinc-400">Direct Helpline</div>
                        <div className="text-sm font-bold text-white">+91 8943442479</div>
                      </div>
                      <Link
                        to="/contact"
                        className="btn-white text-xs py-2 px-4 font-semibold"
                      >
                        Enquire Today
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ──────────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="section-subtitle mb-3">Our Core Services</p>
              <h2 className="section-title mb-4">Comprehensive Admissions Advisory</h2>
              <p className="text-zinc-600 text-base">
                Expert consultancy solutions designed to navigate every milestone of your higher education journey.
              </p>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-zinc-100 rounded-2xl h-56 animate-pulse" />
              ))}
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const Icon = ICON_MAP[service.icon] || BookOpen;
                return (
                  <StaggerItem key={service.id}>
                    <HoverLiftCard className="h-full">
                      <div className="bg-white border border-zinc-200 rounded-2xl p-7 hover:border-black transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-xl group">
                        <div className="w-13 h-13 bg-zinc-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-black transition-colors duration-300 border border-zinc-200">
                          <Icon size={24} className="text-black group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="font-bold text-black text-lg mb-2.5 group-hover:text-zinc-700 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-zinc-600 text-sm leading-relaxed mb-6 flex-1">
                          {service.short_description}
                        </p>
                        <Link
                          to={`/services/${service.slug}`}
                          className="inline-flex items-center gap-1.5 text-black text-xs uppercase font-bold tracking-wider hover:gap-2.5 transition-all mt-auto pt-3 border-t border-zinc-100"
                        >
                          Learn More <ChevronRight size={14} />
                        </Link>
                      </div>
                    </HoverLiftCard>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* ── FEATURED PARTNER COLLEGES ─────────────────────────────────── */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
              <div>
                <p className="section-subtitle mb-2">Academic Alliances</p>
                <h2 className="section-title">Featured Partner Institutions</h2>
                <p className="text-zinc-600 text-sm mt-2">
                  Premier universities and colleges across Karnataka, Kerala, Tamil Nadu, Maharashtra, and Delhi NCR.
                </p>
              </div>
              <Link
                to="/colleges"
                className="inline-flex items-center gap-2 text-black font-semibold hover:gap-3 transition-all whitespace-nowrap text-sm uppercase tracking-wider"
              >
                View All Colleges <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-zinc-100 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : featuredColleges.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredColleges.map((college) => (
                <StaggerItem key={college.id}>
                  <CollegeCard college={college} onEnquire={handleEnquire} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-16 text-zinc-500">
              <Building2 size={48} className="mx-auto mb-4 text-zinc-300" />
              <p>Partner college data will appear here.</p>
            </div>
          )}

          <ScrollReveal direction="up">
            <div className="text-center mt-12">
              <Link to="/colleges" className="btn-primary py-3.5 px-8">
                Explore All 25+ Partner Colleges <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── HOW IT WORKS / TIMELINE ────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="section-subtitle mb-3">Structured Guidance</p>
              <h2 className="section-title mb-4">How We Guide You</h2>
              <p className="text-zinc-600 text-base">
                From your initial enquiry to final admission confirmation — professional support at every single step.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
              {
                step: '01',
                title: 'Share Requirements',
                desc: 'Discuss your academic profile, preferred streams, budget, and target Indian states or cities.',
              },
              {
                step: '02',
                title: 'Curated Institution Match',
                desc: 'Review verified partner colleges and courses matched to your aptitude and career aspirations.',
              },
              {
                step: '03',
                title: 'Expert Counselling',
                desc: 'One-on-one guidance addressing course curricula, future employment trends, and parent queries.',
              },
              {
                step: '04',
                title: 'First-to-End Admission',
                desc: 'Complete assistance with application forms, verification, quota seats, and final college enrollment.',
              },
            ].map(({ step, title, desc }) => (
              <StaggerItem key={step}>
                <div className="relative z-10 text-center p-6 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-black transition-all duration-300 h-full flex flex-col items-center">
                  <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                    <span className="font-black text-lg tracking-wider">{step}</span>
                  </div>
                  <h3 className="font-bold text-black text-base mb-2">{title}</h3>
                  <p className="text-zinc-600 text-xs leading-relaxed">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────── */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-zinc-700 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 mb-6">
              <Star size={13} className="text-white" fill="white" />
              <span className="text-zinc-300 text-xs font-semibold uppercase tracking-widest">
                All India Admissions Desk
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
              Your Dream College Is Closer Than You Think
            </h2>
            <p className="text-zinc-400 text-base md:text-lg mb-10 max-w-2xl mx-auto font-light">
              Connect with our senior education counsellors today. Get personalised institution recommendations and first-to-end guidance across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setModalOpen(true)}
                className="btn-white text-base py-3.5 px-8 justify-center shadow-lg hover:shadow-white/10"
              >
                Get Free Counselling <ArrowRight size={18} />
              </button>
              <Link
                to="/contact"
                className="btn-outline-white text-base py-3.5 px-8 justify-center"
              >
                <Phone size={18} /> Contact Admissions Desk
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── QUICK ENQUIRY FORM ────────────────────────────────────────── */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal direction="left">
              <div>
                <p className="section-subtitle mb-3">Enquiry Desk</p>
                <h2 className="section-title mb-4">Request Admissions Guidance</h2>
                <p className="text-zinc-600 mb-8 text-base">
                  Submit your details and our senior admissions counsellor will contact you within 24 hours.
                </p>

                <div className="space-y-5">
                  {[
                    { title: '100% Free Guidance', desc: 'No consultation fees or hidden charges for students.' },
                    { title: 'Rapid 24-Hour Callback', desc: 'Dedicated admissions officer assigned to your profile.' },
                    { title: 'Personalized College Matching', desc: 'Customized recommendations based on your scores and budget.' },
                  ].map(({ title, desc }) => (
                    <div key={title} className="flex gap-4 p-4 rounded-xl bg-white border border-zinc-200">
                      <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                        ✓
                      </div>
                      <div>
                        <h4 className="font-bold text-black text-sm mb-0.5">{title}</h4>
                        <p className="text-zinc-500 text-xs">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-200">
                  <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">Direct Contact Channels</div>
                  <div className="flex flex-col sm:flex-row gap-4 text-sm font-medium text-black">
                    <a href="tel:+918943442479" className="flex items-center gap-2 hover:underline">
                      <Phone size={16} /> +91 8943442479
                    </a>
                    <a href="mailto:talviaconsultancy@gmail.com" className="flex items-center gap-2 hover:underline">
                      <Send size={16} /> talviaconsultancy@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="bg-white rounded-3xl border border-zinc-200 shadow-xl p-8 sm:p-10">
                {formStatus === 'success' ? (
                  <div className="text-center py-10">
                    <CheckCircle2 className="w-16 h-16 text-black mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-black mb-2">Enquiry Submitted</h3>
                    <p className="text-zinc-600 text-sm mb-6">
                      Our admissions counsellor will contact you shortly at +91 8943442479.
                    </p>
                    <button
                      onClick={() => setFormStatus('idle')}
                      className="btn-primary w-full justify-center"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider block mb-1">
                          Full Name *
                        </label>
                        <input
                          name="student_name"
                          value={form.student_name}
                          onChange={handleFormChange}
                          placeholder="Your name"
                          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black ${
                            formErrors.student_name ? 'border-red-400' : 'border-zinc-200'
                          }`}
                        />
                        {formErrors.student_name && <p className="text-red-500 text-xs mt-1">{formErrors.student_name}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider block mb-1">
                          Phone Number *
                        </label>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleFormChange}
                          placeholder="+91 8943442479"
                          type="tel"
                          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black ${
                            formErrors.phone ? 'border-red-400' : 'border-zinc-200'
                          }`}
                        />
                        {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider block mb-1">
                        Email Address
                      </label>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleFormChange}
                        placeholder="your@email.com"
                        type="email"
                        className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider block mb-1">
                          Your State / Region
                        </label>
                        <select
                          name="district"
                          value={form.district}
                          onChange={handleFormChange}
                          className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white"
                        >
                          <option value="">Select State</option>
                          {INDIAN_STATES.map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider block mb-1">
                          Interested Course
                        </label>
                        <input
                          name="interested_course"
                          value={form.interested_course}
                          onChange={handleFormChange}
                          placeholder="e.g. BTech, BCA, BCom..."
                          className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider block mb-1">
                        Message / Query
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleFormChange}
                        rows={3}
                        placeholder="Tell us about your requirements or preferred institutions..."
                        className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
                      />
                    </div>

                    {formStatus === 'error' && (
                      <p className="text-zinc-800 text-xs bg-zinc-100 border border-zinc-300 rounded-xl px-4 py-2">
                        Unable to submit right now. Please call or WhatsApp us at +91 8943442479.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="btn-primary w-full justify-center py-3.5"
                    >
                      {formStatus === 'loading' ? (
                        'Submitting...'
                      ) : (
                        <>
                          <Send size={16} /> Submit Free Admissions Enquiry
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
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
