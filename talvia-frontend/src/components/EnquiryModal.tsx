import { useState } from 'react';
import { X, Phone, Mail, MessageCircle } from 'lucide-react';
import { enquiryService } from '../services';
import type { EnquiryFormData } from '../types';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillCollege?: string;
  prefillCourse?: string;
  sourcePage?: string;
}

export const INDIAN_STATES = [
  'Kerala',
  'Karnataka',
  'Tamil Nadu',
  'Maharashtra',
  'Delhi NCR',
  'Telangana',
  'Andhra Pradesh',
  'Gujarat',
  'West Bengal',
  'Punjab',
  'Rajasthan',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Goa',
  'Odisha',
  'All Other Indian States / UTs',
];

export default function EnquiryModal({
  isOpen,
  onClose,
  prefillCollege = '',
  prefillCourse = '',
  sourcePage = 'website',
}: EnquiryModalProps) {
  const [form, setForm] = useState<EnquiryFormData>({
    student_name: '',
    phone: '',
    email: '',
    district: '',
    interested_course: prefillCourse,
    preferred_college: prefillCollege,
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
        preferred_college: prefillCollege || form.preferred_college,
        interested_course: prefillCourse || form.interested_course,
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
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-zinc-200 overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-black text-white px-7 py-6 flex items-start justify-between">
          <div>
            <span className="text-zinc-400 text-xs uppercase tracking-widest font-semibold block mb-1">
              Talvia Consultancy • All India
            </span>
            <h2 className="text-2xl font-black tracking-tight">Get Admissions Counselling</h2>
            <p className="text-zinc-400 text-xs mt-1">
              First-to-end guidance from our senior academic counsellors
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
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
              <h3 className="text-xl font-bold text-black mb-2">WhatsApp Enquiry Ready</h3>
              <p className="text-zinc-600 text-sm mb-6 max-w-sm mx-auto">
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
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 mb-6 text-left text-xs space-y-2">
                <div className="font-semibold text-black uppercase tracking-wider text-[11px]">Direct Support Desk:</div>
                <div className="flex items-center gap-2 text-zinc-700">
                  <Phone size={14} /> +91 8943442479
                </div>
                <div className="flex items-center gap-2 text-zinc-700">
                  <Mail size={14} /> talviaconsultancy@gmail.com
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-full text-center text-zinc-600 hover:text-black py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.form && (
                <div className="bg-zinc-100 border border-zinc-300 text-zinc-800 text-xs rounded-xl p-3">
                  {errors.form}
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider block mb-1">
                  Full Name *
                </label>
                <input
                  name="student_name"
                  value={form.student_name}
                  onChange={handleChange}
                  placeholder="Enter student's full name"
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.student_name ? 'border-red-400 bg-red-50/30' : 'border-zinc-200'
                  }`}
                />
                {errors.student_name && <p className="text-red-500 text-xs mt-1">{errors.student_name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider block mb-1">
                    Phone Number *
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 8943442479"
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-black ${
                      errors.phone ? 'border-red-400 bg-red-50/30' : 'border-zinc-200'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="student@example.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-black ${
                      errors.email ? 'border-red-400 bg-red-50/30' : 'border-zinc-200'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider block mb-1">
                    State / Location
                  </label>
                  <select
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white"
                  >
                    <option value="">Select State / Region</option>
                    {INDIAN_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
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
                    onChange={handleChange}
                    placeholder="e.g. BTech, MBA, BCA, MBBS"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider block mb-1">
                  Preferred College (Optional)
                </label>
                <input
                  name="preferred_college"
                  value={form.preferred_college}
                  onChange={handleChange}
                  placeholder="e.g. Bangalore, Kochi, or Specific College"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider block mb-1">
                  How Can We Help You?
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell us about your background, marks, budget or preferences..."
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
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

              <p className="text-center text-[11px] text-zinc-500 pt-1">
                Direct Help: <a href="tel:+918943442479" className="font-semibold text-black hover:underline">+91 8943442479</a> | <a href="mailto:talviaconsultancy@gmail.com" className="hover:underline">talviaconsultancy@gmail.com</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
