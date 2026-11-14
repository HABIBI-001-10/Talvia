import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Share2, Globe, Link as LinkIcon, MessageCircle } from 'lucide-react';
import TalviaLogo from './TalviaLogo';

export default function Footer() {
  return (
    <footer className="bg-[#121620] text-slate-300 border-t border-[#232B3B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#232B3B]">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <TalviaLogo variant="white" className="h-10 md:h-11" showTagline />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed pr-2">
              Premier global education consultancy connecting aspiring students with top-ranked universities worldwide. Education Without Borders — comprehensive guidance from first consultation to campus enrollment.
            </p>
            <div className="flex gap-2.5 pt-2">
              {[
                { icon: Share2, href: 'https://www.facebook.com/talviaconsultancy', label: 'TALVIA Facebook' },
                { icon: Globe, href: 'https://www.instagram.com/talviaconsultancy', label: 'TALVIA Instagram' },
                { icon: LinkIcon, href: 'https://www.linkedin.com/company/talviaconsultancy', label: 'TALVIA LinkedIn' },
                { icon: MessageCircle, href: 'https://wa.me/918943442479', label: 'TALVIA WhatsApp' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-[#1B2232] hover:bg-[#C59B4E] hover:text-[#121620] text-slate-300 flex items-center justify-center transition-all duration-200 border border-[#2D384D]"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-xs tracking-widest uppercase text-[#C59B4E] mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Course Catalog', to: '/courses' },
                { label: 'Consultancy Services', to: '/services' },
                { label: 'Contact Us', to: '/contact' },
                { label: 'Privacy Policy', to: '/privacy-policy' },
                { label: 'Terms & Conditions', to: '/terms-and-conditions' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <span className="text-slate-600">›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Consultancy Services */}
          <div>
            <h3 className="font-semibold text-xs tracking-widest uppercase text-[#C59B4E] mb-5">Admissions Services</h3>
            <ul className="space-y-2">
              {[
                { label: 'Study Abroad Guidance', to: '/services/study-abroad-guidance' },
                { label: 'University Selection', to: '/services/college-selection' },
                { label: 'Admission Assistance', to: '/services/admission-assistance' },
                { label: 'Visa & Documentation', to: '/services/visa-support-documentation' },
                { label: 'Career Guidance', to: '/services/career-guidance' },
                { label: 'Course Selection', to: '/services/course-selection' },
                { label: 'Application Support', to: '/services/application-support' },
                { label: 'Student Counselling', to: '/services/student-counselling' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-slate-400 hover:text-white text-xs transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <span className="text-slate-600">›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-semibold text-xs tracking-widest uppercase text-[#C59B4E] mb-5">Enquiries</h3>
            <ul className="space-y-3.5">
              <li className="flex gap-3 text-slate-300 text-sm">
                <MapPin size={17} className="text-[#C59B4E] flex-shrink-0 mt-0.5" />
                <span>Global Higher Education Consultancy<br /><span className="text-slate-500 text-xs">Central Support: Kochi, Kerala • Education Without Borders</span></span>
              </li>
              <li>
                <a href="tel:+918943442479" className="flex gap-3 text-slate-300 hover:text-white text-sm transition-colors">
                  <Phone size={17} className="text-[#C59B4E] flex-shrink-0 mt-0.5" />
                  <span className="font-medium">+91 8943442479</span>
                </a>
              </li>
              <li>
                <a href="mailto:talviaconsultancy@gmail.com" className="flex gap-3 text-slate-300 hover:text-white text-sm transition-colors">
                  <Mail size={17} className="text-[#C59B4E] flex-shrink-0 mt-0.5" />
                  <span>talviaconsultancy@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/918943442479?text=Hello%20Talvia%20Consultancy%2C%20I%20need%20guidance%20on%20university%20admissions%20(Education%20Without%20Borders)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 text-slate-300 hover:text-white text-sm transition-colors items-center group"
                >
                  <MessageCircle size={17} className="text-emerald-400 flex-shrink-0" />
                  <span>Chat on WhatsApp (+91 8943442479)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} TALVIA Consultancy. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms-and-conditions" className="hover:text-slate-300 transition-colors">Terms & Conditions</Link>
          </div>
          <p className="tracking-wide">Education Without Borders • Global Admissions Advisory</p>
        </div>
      </div>
    </footer>
  );
}
