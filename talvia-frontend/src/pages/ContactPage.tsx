import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Share2, Globe, Link as LinkIcon, Send, CheckCircle2 } from 'lucide-react';
import { enquiryService } from '../services';
import { INDIAN_STATES } from '../components/EnquiryModal';
import { ScrollReveal } from '../components/Animations';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const isCounselling = searchParams.get('counselling') === 'true';

  const [form, setForm] = useState({
    student_name: '', phone: '', email: '', district: '',
    interested_course: '', preferred_college: '', message: '',
  });
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [errors, setErrors] = useState<Record<string,string>>({});

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.student_name.trim()) e.student_name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^\+?[0-9\s\-()]{10,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setErrors(p => ({ ...p, [e.target.name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('loading');
    try {
      await enquiryService.submit({
        ...form,
        enquiry_type: isCounselling ? 'counselling' : 'contact',
        source_page: 'contact',
      });
      setStatus('success');
      setForm({ student_name:'', phone:'', email:'', district:'', interested_course:'', preferred_college:'', message:'' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-black text-white py-20 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="down">
            <p className="text-zinc-400 font-semibold text-xs uppercase tracking-[0.25em] mb-2">Central Admissions Office</p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
              {isCounselling ? 'Get Free Admissions Counselling' : 'Contact Talvia Consultancy'}
            </h1>
            <p className="text-zinc-400 max-w-xl text-base font-light">
              {isCounselling
                ? 'Fill in your details and our senior admissions counsellor will contact you within 24 hours — 100% free of charge.'
                : 'Connect with our education advisors across India for institutional partnerships, queries, or student guidance.'}
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <ScrollReveal direction="left">
              <div className="bg-black rounded-3xl p-8 text-white border border-zinc-800 shadow-xl">
                <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-semibold block mb-2">
                  Direct Advisory Desk
                </span>
                <h3 className="text-2xl font-black mb-6 tracking-tight">Contact Information</h3>
                <div className="space-y-6">
                  <a href="tel:+918943442479" className="flex gap-4 group">
                    <div className="w-11 h-11 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-black transition-colors">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-zinc-400 text-xs mb-0.5 uppercase tracking-wider font-semibold">Phone / Hotline</p>
                      <p className="font-bold text-white text-base">+91 8943442479</p>
                    </div>
                  </a>
                  <a href="mailto:talviaconsultancy@gmail.com" className="flex gap-4 group">
                    <div className="w-11 h-11 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-black transition-colors">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-zinc-400 text-xs mb-0.5 uppercase tracking-wider font-semibold">Official Email</p>
                      <p className="font-bold text-white text-sm break-all">talviaconsultancy@gmail.com</p>
                    </div>
                  </a>
                  <div className="flex gap-4">
                    <div className="w-11 h-11 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-zinc-400 text-xs mb-0.5 uppercase tracking-wider font-semibold">Pan-India Headquarters</p>
                      <p className="font-medium text-zinc-300 text-sm leading-snug">
                        Central Support Desk: Kochi, Kerala<br />
                        <span className="text-zinc-500 text-xs">Serving students across all 28+ Indian States & UTs</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/918943442479?text=Hello%20Talvia%20Consultancy%2C%20I%20need%20guidance%20on%20college%20admissions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-2.5 bg-white hover:bg-zinc-100 text-black font-bold py-3.5 rounded-xl transition-all w-full shadow-md text-sm"
                >
                  <MessageCircle size={18} className="text-emerald-600" /> Chat Instantly on WhatsApp
                </a>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-zinc-800">
                  <p className="text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-3">Connect With Us</p>
                  <div className="flex gap-2">
                    {[
                      { icon: Share2, href: '#', label: 'Facebook' },
                      { icon: Globe, href: '#', label: 'Instagram' },
                      { icon: LinkIcon, href: '#', label: 'LinkedIn' },
                    ].map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-white hover:text-black flex items-center justify-center text-zinc-400 transition-colors"
                      >
                        <Icon size={15} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <ScrollReveal direction="right">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-zinc-200 shadow-xl">
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold block mb-2">
                  Admissions Enquiry
                </span>
                <h3 className="text-2xl font-black text-black mb-2 tracking-tight">
                  {isCounselling ? 'Book Your Free Counselling Session' : 'Send Us an Admissions Message'}
                </h3>
                <p className="text-zinc-500 text-sm mb-8">
                  Fill in your details below and an education expert will reach out to you within 24 hours.
                </p>

                {status === 'success' ? (
                  <div className="text-center py-12">
                    <CheckCircle2 size={48} className="text-black mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-black mb-2">Enquiry Successfully Transmitted</h4>
                    <p className="text-zinc-600 text-sm mb-6 max-w-md mx-auto">
                      Thank you. A senior admissions counsellor will contact you at +91 8943442479.
                    </p>
                    <button onClick={() => setStatus('idle')} className="btn-primary">
                      Submit Another Query
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider block mb-1">
                          Full Name *
                        </label>
                        <input
                          name="student_name"
                          value={form.student_name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black ${
                            errors.student_name ? 'border-red-400 bg-red-50/20' : 'border-zinc-200'
                          }`}
                        />
                        {errors.student_name && <p className="text-red-500 text-xs mt-1">{errors.student_name}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider block mb-1">
                          Phone Number *
                        </label>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 8943442479"
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black ${
                            errors.phone ? 'border-red-400 bg-red-50/20' : 'border-zinc-200'
                          }`}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider block mb-1">
                          Email Address
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black ${
                            errors.email ? 'border-red-400 bg-red-50/20' : 'border-zinc-200'
                          }`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider block mb-1">
                          State / Region
                        </label>
                        <select
                          name="district"
                          value={form.district}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white"
                        >
                          <option value="">Select State</option>
                          {INDIAN_STATES.map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider block mb-1">
                          Interested Course
                        </label>
                        <input
                          name="interested_course"
                          value={form.interested_course}
                          onChange={handleChange}
                          placeholder="e.g. BTech, MBA, BCA, MBBS"
                          className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider block mb-1">
                          Preferred College
                        </label>
                        <input
                          name="preferred_college"
                          value={form.preferred_college}
                          onChange={handleChange}
                          placeholder="e.g. Bangalore, Kochi, Pune, Delhi"
                          className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider block mb-1">
                        Message / Specific Queries
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your qualifying examination, marks, preferences or timeline..."
                        className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-zinc-800 text-xs bg-zinc-100 border border-zinc-300 rounded-xl p-3">
                        Failed to submit. Please call or WhatsApp us directly at +91 8943442479.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary w-full justify-center py-3.5 text-sm uppercase tracking-wider"
                    >
                      {status === 'loading' ? (
                        'Submitting Enquiry...'
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
      </div>
    </>
  );
}
