import { Link } from 'react-router-dom';
import { GraduationCap, Phone, Mail, MapPin, Share2, Globe, Link as LinkIcon, Rss, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#172554] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-blue-800">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#FF6633] flex items-center justify-center">
                <GraduationCap size={20} className="text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight">
                TAL<span className="text-[#FF6633]">VIA</span>
              </span>
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed mb-5">
              Your trusted education partner in Kerala. We connect students with the right colleges and guide them to build successful futures.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Share2,  href: '#', label: 'Facebook' },
                { icon: Globe,   href: '#', label: 'Instagram' },
                { icon: LinkIcon,    href: '#', label: 'LinkedIn' },
                { icon: Rss,     href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-blue-800 hover:bg-[#FF6633] flex items-center justify-center transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Our Colleges', to: '/colleges' },
                { label: 'Available Courses', to: '/courses' },
                { label: 'Our Services', to: '/services' },
                { label: 'Contact Us', to: '/contact' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-blue-200 hover:text-[#FF6633] text-sm transition-colors duration-200 flex items-center gap-1"
                  >
                    <span className="text-[#FF6633]">›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Our Services</h3>
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
                    className="text-blue-200 hover:text-[#FF6633] text-sm transition-colors duration-200 flex items-center gap-1"
                  >
                    <span className="text-[#FF6633]">›</span> {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-blue-200 text-sm">
                <MapPin size={16} className="text-[#FF6633] flex-shrink-0 mt-0.5" />
                <span>Kochi, Ernakulam, Kerala, India</span>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex gap-3 text-blue-200 hover:text-[#FF6633] text-sm transition-colors">
                  <Phone size={16} className="text-[#FF6633] flex-shrink-0 mt-0.5" />
                  <span>+91 98765 43210</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@talvia.in" className="flex gap-3 text-blue-200 hover:text-[#FF6633] text-sm transition-colors">
                  <Mail size={16} className="text-[#FF6633] flex-shrink-0 mt-0.5" />
                  <span>info@talvia.in</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919876543210?text=Hello%20Talvia%2C%20I%20need%20guidance%20on%20college%20admissions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 text-blue-200 hover:text-green-400 text-sm transition-colors"
                >
                  <MessageCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                  <span>WhatsApp Us</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-blue-300 text-sm">
          <p>© {new Date().getFullYear()} Talvia Education Services. All rights reserved.</p>
          <p className="italic text-blue-400 text-xs">Your Education. Your Future. Our Guidance.</p>
        </div>
      </div>
    </footer>
  );
}

