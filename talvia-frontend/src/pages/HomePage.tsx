import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Star, Users, Building2, BookOpen, Compass, GraduationCap, FileCheck, ClipboardList, Heart, CheckCircle2, Phone, Send, MessageCircle } from 'lucide-react';
import { serviceService, enquiryService, POPULAR_COUNTRIES, getStatesForCountry } from '../services';
import type { Service } from '../types';
import EnquiryModal from '../components/EnquiryModal';
import { ScrollReveal, StaggerContainer, StaggerItem, AnimatedNumber, HoverLiftCard } from '../components/Animations';

// ─── Service icon map ──────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Compass, GraduationCap, BookOpen, FileCheck, ClipboardList, Heart,
};

// ─── Home Page ─────────────────────────────────────────────────────────────
export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Quick Enquiry form state
  const [form, setForm] = useState({
    student_name: '',
    phone: '',
    email: '',
    preferred_country: 'India',
    preferred_state: 'Kerala',
    preferred_city: '',
    interested_course: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    serviceService.list().then(r => setServices(r.data)).finally(() => setLoading(false));
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setFormErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value;
    const states = getStatesForCountry(country);
    setForm(prev => ({
      ...prev,
      preferred_country: country,
      preferred_state: states[0] || '',
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.student_name.trim()) errs.student_name = 'Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }
    setFormStatus('loading');
    try {
      const res = await enquiryService.submit({ ...form, enquiry_type: 'general', source_page: 'homepage' });
      setSubmittedWhatsAppUrl(res.data.whatsappUrl);
      if (typeof window !== 'undefined') {
        window.open(res.data.whatsappUrl, '_blank');
      }
      setFormStatus('success');
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-[#141824] via-[#192130] to-[#121620] text-white overflow-hidden border-b border-[#252E3E]">
        {/* Subtle warm ambient lighting */}
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#C59B4E]/15 rounded-full blur-[130px]" />
          <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-slate-700/30 rounded-full blur-[140px]" />
        </div>

        {/* Minimalist grid lines */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            {/* Tagline pill */}
            <ScrollReveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 bg-[#1B2333]/90 border border-[#C59B4E]/35 rounded-full px-4 py-1.5 mb-7 shadow-sm">
                <Star size={13} className="text-[#C59B4E]" fill="#C59B4E" />
                <span className="text-[#E8D09E] text-xs font-semibold uppercase tracking-widest">
                  EDUCATION WITHOUT BORDERS • GLOBAL ADMISSIONS ADVISORY
                </span>
              </div>
            </ScrollReveal>

            {/* Main Heading */}
            <ScrollReveal direction="up" delay={0.2}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                Find the Right University Worldwide.{' '}
                <span className="text-[#E4C586]">Education Without Borders.</span>
              </h1>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl font-light">
                Discover premier global educational opportunities with Talvia Consultancy. We connect aspiring students with top-ranked universities and prestigious institutions worldwide — providing personalized first-to-end guidance from international course selection to visa support and final campus enrollment.
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal direction="up" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="btn-accent text-base py-3.5 px-8 justify-center shadow-lg hover:shadow-[#C59B4E]/20"
                >
                  Explore Programs <ArrowRight size={18} />
                </Link>
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn-outline-white text-base py-3.5 px-8 justify-center"
                >
                  Get Admissions Counselling
                </button>
              </div>
            </ScrollReveal>

            {/* Trust Badges */}
            <ScrollReveal direction="up" delay={0.5}>
              <div className="mt-12 pt-8 border-t border-[#263143] flex flex-wrap gap-8 text-slate-300 text-sm">
                {[
                  { icon: Building2, text: 'Accredited Universities Worldwide' },
                  { icon: Users, text: 'Global Reach Across 25+ Countries' },
                  { icon: BookOpen, text: 'First-to-End International Guidance' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <Icon size={16} className="text-[#C59B4E]" />
                    <span className="font-medium text-slate-200">{text}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ──────────────────────────────────────────────── */}
      <section className="bg-[#FAFBFD] py-14 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: 500, suffix: '+', label: 'Global Students Guided', icon: Users },
              { value: 25, suffix: '+', label: 'Countries Covered', icon: Star },
              { value: 150, suffix: '+', label: 'Partner Universities', icon: BookOpen },
              { value: 100, suffix: '%', label: 'Student-First Guidance', icon: Building2 },
            ].map(({ value, suffix, label, icon: Icon }) => (
              <ScrollReveal key={label} direction="up">
                <div className="text-center group p-5 rounded-2xl bg-white border border-slate-200/70 hover:border-[#C59B4E]/40 shadow-sm hover:shadow-md transition-all">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FBF7EE] rounded-xl mb-3 border border-[#E8D7B8] group-hover:bg-[#181E2A] transition-colors duration-300">
                    <Icon size={22} className="text-[#C59B4E] group-hover:text-[#E8D09E] transition-colors duration-300" />
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                    <AnimatedNumber target={value} suffix={suffix} />
                  </div>
                  <div className="text-slate-500 text-sm font-medium mt-1">{label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ──────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div>
                <p className="section-subtitle mb-3">About Talvia Consultancy</p>
                <h2 className="section-title mb-6 leading-tight">
                  Connecting Students with Premier Universities Worldwide
                </h2>
                <p className="text-slate-600 leading-relaxed mb-5 text-base">
                  Talvia Consultancy is a leading global education advisory firm connecting aspiring students with accredited universities and prestigious institutions worldwide. Under our vision of <strong>Education Without Borders</strong>, we provide unbiased, personalized guidance on international university selection, course selection, and admission procedures from first consultation to final campus enrollment.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8 text-base">
                  Our experienced counsellors work directly with students and parents to evaluate career goals, eligibility, and academic aspirations. We connect you with top-ranked universities worldwide — including India, the UK, Europe, Central Asia, and beyond — making global admissions straightforward, transparent, and seamless.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { title: 'Our Vision', text: 'To be a globally trusted education consultancy, recognized for ethical guidance and empowering students to access premier higher education without borders.' },
                    { title: 'Our Mission', text: 'To provide accessible, transparent, and student-first admissions guidance worldwide, bridging aspirations with premier international education.' },
                  ].map(({ title, text }) => (
                    <div key={title} className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:border-[#C59B4E]/30 transition-colors">
                      <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <span className="w-5 h-5 bg-[#C59B4E] rounded-full flex items-center justify-center text-[#141824] text-[10px] font-bold">✦</span>
                        {title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>

                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:text-[#B48A3D] hover:gap-3 transition-all text-sm uppercase tracking-wider"
                >
                  Learn More About Us <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative">
                <div className="bg-gradient-to-br from-[#181E2A] via-[#1E2535] to-[#141822] text-white rounded-3xl p-10 shadow-2xl border border-[#2D384D] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#C59B4E]/10 rounded-full blur-3xl" />
                  <div className="relative z-10">
                    <span className="text-xs uppercase tracking-widest text-[#E4C586] font-semibold block mb-2">
                      Professional Advisory • Education Without Borders
                    </span>
                    <h3 className="text-2xl font-black mb-6 tracking-tight">Why Choose Talvia Consultancy?</h3>
                    <div className="space-y-4">
                      {[
                        'Direct guidance for top accredited universities worldwide',
                        'Personalised one-on-one international admissions counselling',
                        'Global admissions desk covering 25+ study destinations',
                        'Transparent, unbiased course and fee advisory',
                        'Cross-border document preparation, apostille & visa guidance',
                        'Student-first advocacy in all university recommendations',
                      ].map((point) => (
                        <div key={point} className="flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-[#C59B4E] flex-shrink-0 mt-0.5" />
                          <span className="text-slate-300 text-sm">{point}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#2D384D] flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-400">Direct Helpline</div>
                        <div className="text-sm font-bold text-white">+91 8943442479</div>
                      </div>
                      <Link
                        to="/contact"
                        className="btn-accent text-xs py-2 px-4 font-semibold"
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
      <section className="py-24 bg-white border-t border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="section-subtitle mb-3">Our Core Services</p>
              <h2 className="section-title mb-4">Comprehensive Admissions Advisory</h2>
              <p className="text-slate-600 text-base">
                Expert consultancy solutions designed to navigate every milestone of your higher education journey.
              </p>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-slate-100 rounded-2xl h-56 animate-pulse" />
              ))}
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const Icon = ICON_MAP[service.icon] || BookOpen;
                return (
                  <StaggerItem key={service.id}>
                    <HoverLiftCard className="h-full">
                      <div className="bg-white border border-slate-200/80 rounded-2xl p-7 hover:border-[#C59B4E]/60 transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-xl group">
                        <div className="w-13 h-13 bg-[#FBF7EE] text-[#C59B4E] border border-[#E8D7B8] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#181E2A] group-hover:text-[#E8D09E] transition-colors duration-300">
                          <Icon size={24} className="text-[#C59B4E] group-hover:text-[#E8D09E] transition-colors duration-300" />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg mb-2.5 group-hover:text-[#B48A3D] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                          {service.short_description}
                        </p>
                        <Link
                          to={`/services/${service.slug}`}
                          className="inline-flex items-center gap-1.5 text-[#181E2A] hover:text-[#B48A3D] text-xs uppercase font-bold tracking-wider hover:gap-2.5 transition-all mt-auto pt-3 border-t border-slate-100"
                        >
                          Learn More <ChevronRight size={14} className="text-[#C59B4E]" />
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

      {/* ── HOW IT WORKS / TIMELINE ────────────────────────────────────── */}
      <section className="py-24 bg-[#FAFBFD] border-t border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="section-subtitle mb-3">Structured Guidance</p>
              <h2 className="section-title mb-4">How We Guide You</h2>
              <p className="text-slate-600 text-base">
                From your initial enquiry to final admission confirmation — professional support at every single step.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
              {
                step: '01',
                title: 'Share Global Aspirations',
                desc: 'Discuss your academic profile, preferred course streams, budget, and target study destinations worldwide.',
              },
              {
                step: '02',
                title: 'International University Match',
                desc: 'Review curated top accredited global medical, pharmacy, tech, and business programs tailored to your profile.',
              },
              {
                step: '03',
                title: 'Expert Counselling',
                desc: 'One-on-one guidance addressing curricula, global licensing (NMC, WHO, ECFMG, PCI), living costs, and parent queries.',
              },
              {
                step: '04',
                title: 'First-to-End Enrollment',
                desc: 'Complete assistance with cross-border applications, apostille, visa filing, quota seats, and campus enrollment.',
              },
            ].map(({ step, title, desc }) => (
              <StaggerItem key={step}>
                <div className="relative z-10 text-center p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-[#C59B4E]/60 transition-all duration-300 h-full flex flex-col items-center shadow-sm hover:shadow-md">
                  <div className="w-14 h-14 bg-[#181E2A] text-[#E8D09E] border border-[#2D384D] rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                    <span className="font-black text-lg tracking-wider">{step}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">{title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-r from-[#121620] via-[#1A2232] to-[#121620] text-white relative overflow-hidden border-t border-b border-[#252E3E]">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C59B4E]/15 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 bg-[#1B2333] border border-[#C59B4E]/35 rounded-full px-4 py-1.5 mb-6">
              <Star size={13} className="text-[#E8D09E]" fill="#E8D09E" />
              <span className="text-[#E8D09E] text-xs font-semibold uppercase tracking-widest">
                Global Admissions Desk • Education Without Borders
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
              Your Dream University Is Closer Than You Think
            </h2>
            <p className="text-slate-300 text-base md:text-lg mb-10 max-w-2xl mx-auto font-light">
              Connect with our senior global education counsellors today. Get personalised international university recommendations and first-to-end guidance worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setModalOpen(true)}
                className="btn-accent text-base py-3.5 px-8 justify-center shadow-lg hover:shadow-[#C59B4E]/20"
              >
                Get Admissions Counselling <ArrowRight size={18} />
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
      <section className="py-24 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal direction="left">
              <div>
                <p className="section-subtitle mb-3">Enquiry Desk</p>
                <h2 className="section-title mb-4">Request Admissions Guidance</h2>
                <p className="text-slate-600 mb-8 text-base">
                  Submit your details and our senior international admissions counsellor will contact you within 24 hours.
                </p>

                <div className="space-y-5">
                  {[
                    { title: 'Global Academic Advisory', desc: 'Expert guidance for domestic & international university admissions.' },
                    { title: 'Rapid 24-Hour Callback', desc: 'Dedicated international education counsellor assigned to your profile.' },
                    { title: 'Personalized University Matching', desc: 'Customized recommendations based on your scores, preferred destination, and budget.' },
                  ].map(({ title, desc }) => (
                    <div key={title} className="flex gap-4 p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-[#FBF7EE] text-[#C59B4E] border border-[#E8D7B8] flex items-center justify-center font-bold text-xs flex-shrink-0">
                        ✓
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm mb-0.5">{title}</h4>
                        <p className="text-slate-500 text-xs">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200/80">
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Direct Contact Channels</div>
                  <div className="flex flex-col sm:flex-row gap-4 text-sm font-medium text-slate-900">
                    <a href="tel:+918943442479" className="flex items-center gap-2 hover:text-[#B48A3D] transition-colors">
                      <Phone size={16} className="text-[#C59B4E]" /> +91 8943442479
                    </a>
                    <a href="mailto:talviaconsultancy@gmail.com" className="flex items-center gap-2 hover:text-[#B48A3D] transition-colors">
                      <Send size={16} className="text-[#C59B4E]" /> talviaconsultancy@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 sm:p-10">
                {formStatus === 'success' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                      <MessageCircle size={36} className="text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">WhatsApp Enquiry Ready</h3>
                    <p className="text-slate-600 text-sm mb-6 max-w-sm mx-auto">
                      Your admissions enquiry has been formatted for our WhatsApp admissions desk (+91 8943442479).
                    </p>
                    {submittedWhatsAppUrl && (
                      <a
                        href={submittedWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full justify-center flex items-center gap-2 mb-3 bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <MessageCircle size={18} /> Open WhatsApp Chat
                      </a>
                    )}
                    <button
                      onClick={() => {
                        setFormStatus('idle');
                        setForm({
                          student_name: '',
                          phone: '',
                          email: '',
                          preferred_country: 'India',
                          preferred_state: 'Kerala',
                          preferred_city: '',
                          interested_course: '',
                          message: '',
                        });
                      }}
                      className="btn-secondary w-full justify-center"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                          Full Name *
                        </label>
                        <input
                          name="student_name"
                          value={form.student_name}
                          onChange={handleFormChange}
                          placeholder="Your name"
                          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A] ${
                            formErrors.student_name ? 'border-red-400' : 'border-slate-200'
                          }`}
                        />
                        {formErrors.student_name && <p className="text-red-500 text-xs mt-1">{formErrors.student_name}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                          Phone Number *
                        </label>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleFormChange}
                          placeholder="+91 8943442479"
                          type="tel"
                          className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A] ${
                            formErrors.phone ? 'border-red-400' : 'border-slate-200'
                          }`}
                        />
                        {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                          Email Address
                        </label>
                        <input
                          name="email"
                          value={form.email}
                          onChange={handleFormChange}
                          placeholder="your@email.com"
                          type="email"
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                          Interested Course *
                        </label>
                        <input
                          name="interested_course"
                          value={form.interested_course}
                          onChange={handleFormChange}
                          placeholder="e.g. MBBS, B.Pharm, Pharm.D, BDS"
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A]"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                          Preferred Country
                        </label>
                        <select
                          name="preferred_country"
                          value={form.preferred_country}
                          onChange={handleCountryChange}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A] bg-white text-slate-800"
                        >
                          {POPULAR_COUNTRIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                          Preferred State / Province
                        </label>
                        <select
                          name="preferred_state"
                          value={form.preferred_state}
                          onChange={handleFormChange}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A] bg-white text-slate-800"
                        >
                          {getStatesForCountry(form.preferred_country).map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                        Preferred City
                      </label>
                      <input
                        name="preferred_city"
                        value={form.preferred_city}
                        onChange={handleFormChange}
                        placeholder="e.g. Kochi, Bangalore, London, Tashkent, Tbilisi"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                        Message / Query
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleFormChange}
                        rows={3}
                        placeholder="Tell us about your qualifying marks (NEET/Plus Two), budget or preferences..."
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A] resize-none"
                      />
                    </div>

                    {formStatus === 'error' && (
                      <p className="text-slate-800 text-xs bg-slate-100 border border-slate-300 rounded-xl px-4 py-2">
                        Unable to submit right now. Please call or WhatsApp us at +91 8943442479.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="btn-primary w-full justify-center py-3.5 flex items-center gap-2"
                    >
                      {formStatus === 'loading' ? (
                        'Preparing WhatsApp...'
                      ) : (
                        <>
                          <MessageCircle size={18} className="text-emerald-400" /> Send Enquiry via WhatsApp
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-slate-500 pt-1">
                      By submitting, you agree to our{' '}
                      <Link to="/terms-and-conditions" className="underline hover:text-slate-900">
                        Terms & Conditions
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy-policy" className="underline hover:text-slate-900">
                        Privacy Policy
                      </Link>.
                    </p>
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
        onClose={() => setModalOpen(false)}
        sourcePage="homepage"
      />
    </>
  );
}
