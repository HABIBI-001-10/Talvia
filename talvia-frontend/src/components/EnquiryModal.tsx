import { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { enquiryService } from '../services';
import type { EnquiryFormData } from '../types';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillCollege?: string;
  prefillCourse?: string;
  sourcePage?: string;
}

const DISTRICTS = [
  'Thiruvananthapuram','Kollam','Pathanamthitta','Alappuzha','Kottayam',
  'Idukki','Ernakulam','Thrissur','Palakkad','Malappuram','Kozhikode',
  'Wayanad','Kannur','Kasaragod',
];

export default function EnquiryModal({ isOpen, onClose, prefillCollege = '', prefillCourse = '', sourcePage = 'website' }: EnquiryModalProps) {
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.student_name.trim()) e.student_name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^\+?[0-9\s\-()]{10,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
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
      await enquiryService.submit({ ...form, preferred_college: prefillCollege || form.preferred_college, interested_course: prefillCourse || form.interested_course });
      setSuccess(true);
    } catch (err: any) {
      const data = err.response?.data;
      if (data && typeof data === 'object') {
        const mapped: Record<string, string> = {};
        for (const key in data) mapped[key] = Array.isArray(data[key]) ? data[key][0] : data[key];
        setErrors(mapped);
      } else {
        setErrors({ general: 'Something went wrong. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#172554] rounded-t-2xl px-6 py-5 flex items-start justify-between">
          <div>
            <h2 className="text-white text-xl font-bold">Get Free Counselling</h2>
            <p className="text-blue-200 text-sm mt-1">Our team will contact you shortly</p>
          </div>
          <button onClick={onClose} className="text-blue-200 hover:text-white p-1">
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="p-10 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#172554] mb-2">Enquiry Submitted!</h3>
            <p className="text-slate-600 mb-6">Thank you! Our counsellor will call you within 24 hours.</p>
            <button onClick={onClose} className="btn-primary w-full justify-center">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {prefillCollege && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-sm text-[#2563EB]">
                Enquiring about: <strong>{prefillCollege}</strong>
                {prefillCourse && <> — <strong>{prefillCourse}</strong></>}
              </div>
            )}

            {errors.general && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">{errors.general}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Full Name *</label>
                <input
                  name="student_name" value={form.student_name} onChange={handleChange}
                  placeholder="Your full name"
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.student_name ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.student_name && <p className="text-red-500 text-xs mt-1">{errors.student_name}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Phone Number *</label>
                <input
                  name="phone" value={form.phone} onChange={handleChange}
                  placeholder="+91 98765 43210" type="tel"
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Email Address</label>
              <input
                name="email" value={form.email} onChange={handleChange}
                placeholder="your@email.com" type="email"
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Your District</label>
                <select
                  name="district" value={form.district} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select District</option>
                  {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Interested Course</label>
                <input
                  name="interested_course" value={form.interested_course} onChange={handleChange}
                  placeholder="e.g. BCA, BCom..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {!prefillCollege && (
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Preferred College</label>
                <input
                  name="preferred_college" value={form.preferred_college} onChange={handleChange}
                  placeholder="College name or 'Not decided'"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Message</label>
              <textarea
                name="message" value={form.message} onChange={handleChange}
                rows={3} placeholder="Tell us more about your requirements..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full bg-[#FF6633] hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting...</>
              ) : (
                <><Send size={16} /> Submit Enquiry</>
              )}
            </button>
            <p className="text-xs text-center text-slate-400">We respect your privacy. Your information will not be shared.</p>
          </form>
        )}
      </div>
    </div>
  );
}

