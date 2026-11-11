import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Share2, Globe, Link as LinkIcon, Rss, MessageCircle } from 'lucide-react';
import TalviaLogo from './TalviaLogo';

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-zinc-800">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <TalviaLogo variant="white" className="h-10 md:h-11" showTagline />
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed pr-2">
              Premier higher education consultancy connecting aspiring students with top universities and colleges across India. Comprehensive guidance from first step to final admission.
            </p>
            <div className="flex gap-2.5 pt-2">
              {[
                { icon: Share2, href: '#', label: 'Facebook' },
                { icon: Globe, href: '#', label: 'Instagram' },
                { icon: LinkIcon, href: '#', label: 'LinkedIn' },
                { icon: Rss, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-white hover:text-black text-zinc-300 flex items-center justify-center transition-all duration-200 border border-zinc-800"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm tracking-wider uppercase text-zinc-300 mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Colleges & Universities', to: '/colleges' },
                { label: 'Course Catalog', to: '/courses' },
                { label: 'Consultancy Services', to: '/services' },
                { label: 'Contact Us', to: '/contact' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-zinc-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <span className="text-zinc-600">›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Consultancy Services */}
          <div>
            <h3 className="font-semibold text-sm tracking-wider uppercase text-zinc-300 mb-5">Our Services</h3>
            <ul className="space-y-2.5">
              {[
                'Career Guidance',
                'College Selection',
                'Course Selection',
                'Admission Assistance',
                'Application Support',
                'Student Counselling',
              ].map((service) => (
                <li key={service}>
                  <Link
                    to={`/services/${service.toLowerCase().replace(/ /g, '-')}`}
                    className="text-zinc-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <span className="text-zinc-600">›</span> {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-semibold text-sm tracking-wider uppercase text-zinc-300 mb-5">Enquiries</h3>
            <ul className="space-y-3.5">
              <li className="flex gap-3 text-zinc-300 text-sm">
                <MapPin size={17} className="text-zinc-400 flex-shrink-0 mt-0.5" />
                <span>Pan-India Higher Education Consultancy<br /><span className="text-zinc-500 text-xs">Offices in Kochi & Major Educational Hubs</span></span>
              </li>
              <li>
                <a href="tel:+918943442479" className="flex gap-3 text-zinc-300 hover:text-white text-sm transition-colors">
                  <Phone size={17} className="text-zinc-400 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">+91 8943442479</span>
                </a>
              </li>
              <li>
                <a href="mailto:talviaconsultancy@gmail.com" className="flex gap-3 text-zinc-300 hover:text-white text-sm transition-colors">
                  <Mail size={17} className="text-zinc-400 flex-shrink-0 mt-0.5" />
                  <span>talviaconsultancy@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/918943442479?text=Hello%20Talvia%20Consultancy%2C%20I%20need%20guidance%20on%20college%20admissions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 text-zinc-300 hover:text-white text-sm transition-colors items-center group"
                >
                  <MessageCircle size={17} className="text-zinc-400 group-hover:text-emerald-400 flex-shrink-0" />
                  <span>Chat on WhatsApp (+91 8943442479)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-500 text-xs">
          <p>© {new Date().getFullYear()} TALVIA Consultancy. All rights reserved.</p>
          <p className="tracking-wide">Your Education. Your Future. Our Guidance. • Pan-India Admissions</p>
        </div>
      </div>
    </footer>
  );
}
