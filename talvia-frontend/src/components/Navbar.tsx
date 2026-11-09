import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, GraduationCap } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  {
    label: 'Colleges', to: '/colleges',
    children: [
      { label: 'All Colleges', to: '/colleges' },
      { label: 'Featured Colleges', to: '/colleges?featured=true' },
    ],
  },
  { label: 'Courses', to: '/courses' },
  { label: 'Services', to: '/services' },
  { label: 'Contact Us', to: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropdown(null);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-[#172554] flex items-center justify-center">
              <GraduationCap size={20} className="text-[#FF6633]" />
            </div>
            <span className="text-2xl font-black tracking-tight text-[#172554]">
              TAL<span className="text-[#FF6633]">VIA</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname.startsWith(link.to)
                        ? 'text-[#2563EB]'
                        : 'text-slate-700 hover:text-[#2563EB]'
                    }`}
                    onMouseEnter={() => setDropdown(link.label)}
                    onMouseLeave={() => setDropdown(null)}
                  >
                    {link.label}
                    <ChevronDown size={14} />
                  </button>
                  {dropdown === link.label && (
                    <div
                      className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                      onMouseEnter={() => setDropdown(link.label)}
                      onMouseLeave={() => setDropdown(null)}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#2563EB] transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'text-[#2563EB]'
                      : 'text-slate-700 hover:text-[#2563EB]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact?counselling=true"
              className="hidden md:inline-flex items-center gap-2 bg-[#FF6633] hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Get Free Counselling
            </Link>
            <button
              className="lg:hidden p-2 rounded-md text-slate-700 hover:bg-gray-100"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                <Link
                  to={link.to}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'bg-blue-50 text-[#2563EB]'
                      : 'text-slate-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 mt-1 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="block px-4 py-2 text-sm text-slate-600 hover:text-[#2563EB] hover:bg-blue-50 rounded-lg"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-gray-100">
              <Link
                to="/contact?counselling=true"
                className="block w-full text-center bg-[#FF6633] hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-lg transition-colors"
              >
                Get Free Counselling
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

