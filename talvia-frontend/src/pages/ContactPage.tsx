import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Share2, Globe, Link as LinkIcon, Send, CheckCircle2 } from 'lucide-react';
import { enquiryService } from '../services';

const DISTRICTS = [
  'Thiruvananthapuram','Kollam','Pathanamthitta','Alappuzha','Kottayam',
  'Idukki','Ernakulam','Thrissur','Palakkad','Malappuram','Kozhikode',
  'Wayanad','Kannur','Kasaragod',
];

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
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^\+?[0-9\s\-()]{10,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
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
      <div className="bg-gradient-to-r from-[#172554] to-[#2563EB] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#FF6633] font-semibold text-sm uppercase tracking-widest mb-2">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-black mb-3">
            {isCounselling ? 'Get Free Counselling' : 'Contact Us'}
          </h1>
          <p className="text-blue-200 max-w-xl">
            {isCounselling
              ? 'Fill in your details and our expert counsellor will get back to you within 24 hours — completely free.'
              : 'We\'re here to help. Reach out to us through any of the channels below.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-5 gap-10">

          {/* Contact info sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-[#172554] to-[#2563EB] rounded-2xl p-7 text-white">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-5">
                <a href="tel:+919876543210" className="flex gap-4 group">
                  <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF6633] transition-colors">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-blue-300 text-xs mb-0.5">Phone / WhatsApp</p>
                    <p className="font-semibold">+91 98765 43210</p>
                  </div>
                </a>
                <a href="mailto:info@talvia.in" className="flex gap-4 group">
                  <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF6633] transition-colors">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-blue-300 text-xs mb-0.5">Email</p>
                    <p className="font-semibold">info@talvia.in</p>
                  </div>
                </a>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-blue-300 text-xs mb-0.5">Office Address</p>
                    <p className="font-semibold leading-snug">Kochi, Ernakulam<br/>Kerala — 682001</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919876543210?text=Hello%20Talvia%2C%20I%20need%20guidance%20on%20college%20admissions."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors w-full"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>

              {/* Social */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-blue-300 text-sm mb-3">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { icon: Share2,  href: '#', label: 'Facebook' },
                    { icon: Globe,   href: '#', label: 'Instagram' },
                    { icon: LinkIcon,    href: '#', label: 'LinkedIn' },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-9 h-9 rounded-full bg-white/15 hover:bg-[#FF6633] flex items-center justify-center transition-colors"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-52 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <MapPin size={32} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm font-medium">Kochi, Kerala</p>
                <p className="text-xs mt-1">Google Maps embed coming soon</p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-[#172554] mb-2">
                {isCounselling ? 'Book a Free Counselling Session' : 'Send Us a Message'}
              </h2>
              <p className="text-slate-500 text-sm mb-7">
                All fields marked * are required. We'll respond within 24 hours.
              </p>

              {status === 'success' ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#172554] mb-2">Message Received!</h3>
                  <p className="text-slate-600 mb-6">Our team will contact you within 24 hours.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="bg-[#FF6633] hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-slate-700 block mb-1.5">Full Name *</label>
                      <input
                        name="student_name" value={form.student_name} onChange={handleChange}
                        placeholder="Your full name"
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow ${errors.student_name ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                      />
                      {errors.student_name && <p className="text-red-500 text-xs mt-1">{errors.student_name}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 block mb-1.5">Phone Number *</label>
                      <input
                        name="phone" value={form.phone} onChange={handleChange}
                        placeholder="+91 98765 43210" type="tel"
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1.5">Email Address</label>
                    <input
                      name="email" value={form.email} onChange={handleChange}
                      placeholder="your@email.com" type="email"
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-slate-700 block mb-1.5">Your District</label>
                      <select
                        name="district" value={form.district} onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select District</option>
                        {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 block mb-1.5">Interested Course</label>
                      <input
                        name="interested_course" value={form.interested_course} onChange={handleChange}
                        placeholder="e.g. BCA, BCom, BTech..."
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1.5">Preferred College</label>
                    <input
                      name="preferred_college" value={form.preferred_college} onChange={handleChange}
                      placeholder="College name or 'Not decided yet'"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1.5">Message</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      rows={4} placeholder="Tell us about your requirements, questions, or anything we should know..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                      Something went wrong. Please try again or call us directly.
                    </p>
                  )}

                  <button
                    type="submit" disabled={status === 'loading'}
                    className="w-full bg-[#FF6633] hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base"
                  >
                    {status === 'loading' ? (
                      <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting...</>
                    ) : (
                      <><Send size={18} /> {isCounselling ? 'Book Free Counselling' : 'Send Message'}</>
                    )}
                  </button>

                  <p className="text-xs text-center text-slate-400">
                    Your information is kept confidential and never shared with third parties.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

