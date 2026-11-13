import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { enquiryService, POPULAR_COUNTRIES, POPULAR_STATES } from '../services';
import { ScrollReveal } from '../components/Animations';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const isCounselling = searchParams.get('counselling') === 'true';

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
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.student_name.trim()) e.student_name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^\+?[0-9\s\-()]{10,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setErrors(p => ({ ...p, [e.target.name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('loading');
    try {
      const res = await enquiryService.submit({
        ...form,
        enquiry_type: isCounselling ? 'counselling' : 'contact',
        source_page: 'contact',
      });
      setSubmittedWhatsAppUrl(res.data.whatsappUrl);
      if (typeof window !== 'undefined') {
        window.open(res.data.whatsappUrl, '_blank');
      }
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-b from-[#141824] via-[#18202E] to-[#121620] text-white py-20 border-b border-[#252E3E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="down">
            <p className="text-[#E4C586] font-semibold text-xs uppercase tracking-[0.25em] mb-2">Central Admissions Office</p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
              {isCounselling ? 'Get Admissions Counselling' : 'Contact Talvia Consultancy'}
            </h1>
            <p className="text-slate-300 max-w-xl text-base font-light">
              {isCounselling
                ? 'Fill in your details and our senior admissions counsellor will contact you within 24 hours with dedicated guidance.'
                : 'Connect with our education advisors across India and abroad for institutional queries or student guidance.'}
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <ScrollReveal direction="left">
              <div className="bg-gradient-to-br from-[#181E2A] via-[#1E2535] to-[#141822] rounded-3xl p-8 text-white border border-[#2D384D] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#C59B4E]/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <span className="text-[11px] uppercase tracking-widest text-[#E4C586] font-semibold block mb-2">
                    Direct Advisory Desk
                  </span>
                  <h3 className="text-2xl font-black mb-6 tracking-tight">Contact Information</h3>
                  <div className="space-y-6">
                    <a href="tel:+918943442479" className="flex gap-4 group">
                      <div className="w-11 h-11 bg-[#1F2737] border border-[#2D384D] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#C59B4E] group-hover:text-[#121620] text-[#E8D09E] transition-colors">
                        <Phone size={18} />
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs mb-0.5 uppercase tracking-wider font-semibold">Phone / Hotline</p>
                        <p className="font-bold text-white text-base">+91 8943442479</p>
                      </div>
                    </a>
                    <a href="mailto:talviaconsultancy@gmail.com" className="flex gap-4 group">
                      <div className="w-11 h-11 bg-[#1F2737] border border-[#2D384D] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#C59B4E] group-hover:text-[#121620] text-[#E8D09E] transition-colors">
                        <Mail size={18} />
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs mb-0.5 uppercase tracking-wider font-semibold">Official Email</p>
                        <p className="font-bold text-white text-sm break-all">talviaconsultancy@gmail.com</p>
                      </div>
                    </a>
                    <a
                      href="https://wa.me/918943442479?text=Hello%20Talvia%20Consultancy%2C%20I%20need%20admissions%20guidance."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-4 group"
                    >
                      <div className="w-11 h-11 bg-emerald-950/60 border border-emerald-800/60 rounded-xl flex items-center justify-center flex-shrink-0 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <MessageCircle size={18} />
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs mb-0.5 uppercase tracking-wider font-semibold">WhatsApp Desk</p>
                        <p className="font-bold text-white text-base">+91 8943442479</p>
                      </div>
                    </a>
                    <div className="flex gap-4">
                      <div className="w-11 h-11 bg-[#1F2737] border border-[#2D384D] rounded-xl flex items-center justify-center flex-shrink-0 text-[#E8D09E]">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs mb-0.5 uppercase tracking-wider font-semibold">Head Advisory Office</p>
                        <p className="text-slate-200 text-sm leading-relaxed">
                          Pan-India & International Admissions Advisory<br />
                          <span className="text-slate-400 text-xs">Offices in Kochi & Major Educational Hubs</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <ScrollReveal direction="right">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl">
                <span className="text-xs uppercase tracking-widest text-[#B48A3D] font-semibold block mb-2">
                  Admissions Enquiry
                </span>
                <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
                  {isCounselling ? 'Book Your Counselling Session' : 'Send Us an Admissions Message'}
                </h3>
                <p className="text-slate-500 text-sm mb-8">
                  Fill in your details below and an education expert will reach out to you within 24 hours.
                </p>

                {status === 'success' ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                      <MessageCircle size={36} className="text-emerald-600" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">WhatsApp Enquiry Ready</h4>
                    <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto">
                      Your admissions enquiry details have been formatted for our WhatsApp admissions desk (+91 8943442479).
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
                        setStatus('idle');
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
                      Submit Another Query
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                          Full Name *
                        </label>
                        <input
                          name="student_name"
                          value={form.student_name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A] ${
                            errors.student_name ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                          }`}
                        />
                        {errors.student_name && <p className="text-red-500 text-xs mt-1">{errors.student_name}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                          Phone Number *
                        </label>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 8943442479"
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A] ${
                            errors.phone ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                          }`}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                          Email Address
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A] ${
                            errors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                          }`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                          Interested Course *
                        </label>
                        <input
                          name="interested_course"
                          value={form.interested_course}
                          onChange={handleChange}
                          placeholder="e.g. MBBS, B.Pharm, Pharm.D, BDS"
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A]"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                          Preferred Country
                        </label>
                        <select
                          name="preferred_country"
                          value={form.preferred_country}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A] bg-white text-slate-800"
                        >
                          {POPULAR_COUNTRIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                          Preferred State
                        </label>
                        <select
                          name="preferred_state"
                          value={form.preferred_state}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A] bg-white text-slate-800"
                        >
                          {POPULAR_STATES.map((st) => (
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
                        onChange={handleChange}
                        placeholder="e.g. Kochi, Bangalore, Chennai, Mangalore, Delhi"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                        Message / Specific Queries
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your qualifying examination, marks (NEET/Plus Two), preferences or timeline..."
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A] resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-slate-800 text-xs bg-slate-100 border border-slate-300 rounded-xl p-3">
                        Failed to submit. Please call or WhatsApp us directly at +91 8943442479.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary w-full justify-center py-3.5 text-sm uppercase tracking-wider flex items-center gap-2"
                    >
                      {status === 'loading' ? (
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
      </div>
    </>
  );
}