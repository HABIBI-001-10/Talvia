import { useState } from 'react';
import { X, Phone, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { enquiryService, POPULAR_COUNTRIES, POPULAR_STATES } from '../services';
import type { EnquiryFormData } from '../types';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillCity?: string;
  prefillCollege?: string;
  prefillCourse?: string;
  sourcePage?: string;
}

export const INDIAN_STATES = POPULAR_STATES;

export default function EnquiryModal({
  isOpen,
  onClose,
  prefillCity = '',
  prefillCollege = '',
  prefillCourse = '',
  sourcePage = 'website',
}: EnquiryModalProps) {
  const [form, setForm] = useState<EnquiryFormData>({
    student_name: '',
    phone: '',
    email: '',
    interested_course: prefillCourse,
    preferred_country: 'India',
    preferred_state: 'Kerala',
    preferred_city: prefillCity || prefillCollege || '',
    message: '',
    enquiry_type: 'general',
    source_page: sourcePage,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.student_name.trim()) e.student_name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^\+?[0-9\s\-()]{10,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await enquiryService.submit({
        ...form,
        interested_course: form.interested_course || prefillCourse,
      });
      setWhatsappUrl(res.data.whatsappUrl);
      if (typeof window !== 'undefined') {
        window.open(res.data.whatsappUrl, '_blank');
      }
      setSuccess(true);
    } catch {
      setErrors({ form: 'Failed to prepare enquiry. Please reach us directly on WhatsApp at +91 8943442479.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200/80 overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#141824] via-[#1A2232] to-[#141824] text-white px-7 py-6 flex items-start justify-between border-b border-[#252E3E]">
          <div>
            <span className="text-[#E4C586] text-xs uppercase tracking-widest font-semibold block mb-1">
              Talvia Consultancy • Admissions Desk
            </span>
            <h2 className="text-2xl font-black tracking-tight">Get Admissions Counselling</h2>
            <p className="text-slate-300 text-xs mt-1">
              Personalized guidance for Medical, Pharmacy, Healthcare & Degree Programs
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-7 overflow-y-auto flex-1">
          {success ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                <MessageCircle size={36} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">WhatsApp Enquiry Ready</h3>
              <p className="text-slate-600 text-sm mb-6 max-w-sm mx-auto">
                Your admissions details have been formatted for our WhatsApp admissions desk (+91 8943442479).
              </p>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md text-sm mb-4"
                >
                  <MessageCircle size={18} /> Open WhatsApp Chat
                </a>
              )}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-6 text-left text-xs space-y-2">
                <div className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">Direct Support Desk:</div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone size={14} className="text-[#C59B4E]" /> +91 8943442479
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail size={14} className="text-[#C59B4E]" /> talviaconsultancy@gmail.com
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-full text-center text-slate-600 hover:text-slate-900 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.form && (
                <div className="bg-slate-100 border border-slate-300 text-slate-800 text-xs rounded-xl p-3">
                  {errors.form}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                    Full Name *
                  </label>
                  <input
                    name="student_name"
                    value={form.student_name}
                    onChange={handleChange}
                    placeholder="Enter student's full name"
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#181E2A] ${
                      errors.student_name ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
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
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#181E2A] ${
                      errors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="student@example.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#181E2A] ${
                      errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
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
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                    Preferred Country
                  </label>
                  <select
                    name="preferred_country"
                    value={form.preferred_country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A] bg-white text-slate-800"
                  >
                    {POPULAR_COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
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
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A] bg-white text-slate-800"
                  >
                    {POPULAR_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                  How Can We Help You?
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell us about your qualifying marks (NEET/Plus Two), budget or preferences..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#181E2A] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center py-3.5 flex items-center gap-2"
                >
                  {loading ? (
                    'Preparing WhatsApp Enquiry...'
                  ) : (
                    <>
                      <MessageCircle size={18} className="text-emerald-400" /> Send Enquiry via WhatsApp
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-[11px] text-slate-500 pt-1">
                By submitting, you agree to our{' '}
                <Link to="/terms-and-conditions" onClick={onClose} className="underline hover:text-slate-900">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy-policy" onClick={onClose} className="underline hover:text-slate-900">
                  Privacy Policy
                </Link>.
              </p>

              <p className="text-center text-[11px] text-slate-500">
                Direct Help: <a href="tel:+918943442479" className="font-semibold text-slate-900 hover:text-[#B48A3D]">+91 8943442479</a> | <a href="mailto:talviaconsultancy@gmail.com" className="hover:text-[#B48A3D]">talviaconsultancy@gmail.com</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
