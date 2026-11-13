import { Link } from 'react-router-dom';
import { CheckCircle2, Target, Heart, Users, Building2, ArrowRight } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem, AnimatedNumber } from '../components/Animations';
import SEO from '../components/SEO';

export default function AboutPage() {
  const aboutStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://talviastudentsgrowth.in/about#webpage',
        url: 'https://talviastudentsgrowth.in/about',
        name: 'About TALVIA Consultancy • Education Without Borders',
        description: 'Learn about TALVIA Consultancy’s global higher education advisory, our mission, vision, and student-first guidance across 25+ countries.',
        publisher: {
          '@type': 'EducationalOrganization',
          name: 'TALVIA Consultancy',
          url: 'https://talviastudentsgrowth.in',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://talviastudentsgrowth.in/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About Us',
            item: 'https://talviastudentsgrowth.in/about',
          },
        ],
      },
    ],
  };

  return (
    <>
      <SEO
        title="About Us | TALVIA Consultancy • Education Without Borders"
        description="Discover TALVIA Consultancy's global vision for higher education without borders. Empowering students with ethical, transparent admissions guidance across 25+ countries."
        canonical="https://talviastudentsgrowth.in/about"
        keywords={[
          'about Talvia',
          'global education consultancy',
          'education without borders',
          'study abroad consultants',
          'international university admissions',
          'overseas medical education',
          'ethical education advisory',
        ]}
        structuredData={aboutStructuredData}
      />

      {/* Header */}
      <div className="bg-gradient-to-b from-[#141824] via-[#18202E] to-[#121620] text-white py-20 border-b border-[#252E3E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="down">
            <p className="text-[#E4C586] font-semibold text-xs uppercase tracking-[0.25em] mb-2">Who We Are</p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">About Talvia Consultancy</h1>
            <p className="text-slate-300 max-w-xl text-base font-light">
              Your Education. Your Future. Our Guidance. • Education Without Borders
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Intro */}
      <section className="py-20 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <ScrollReveal direction="left">
              <div>
                <p className="section-subtitle mb-2">Our Foundation</p>
                <h2 className="section-title mb-6 leading-tight">
                  A Global Vision for Higher Education
                </h2>
                <p className="text-slate-600 leading-relaxed mb-5 text-base">
                  Talvia Consultancy was founded with a singular conviction: every student deserves access to unbiased, professional, and transparent higher education counselling. Guided by our vision of <strong>Education Without Borders</strong>, our senior advisors empower students to pursue world-class medical, pharmacy, healthcare, and professional degrees across recognized global universities.
                </p>
                <p className="text-slate-600 leading-relaxed mb-5 text-base">
                  Over the years, Talvia has established strong advisory networks across 25+ countries — including India, Russia, Georgia, Uzbekistan, the Philippines, Kazakhstan, the UK, and Europe. We provide comprehensive first-to-end guidance from international course selection through document apostille, visa filing, quota seats, and final campus enrollment.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8 text-base">
                  All initial counselling and admissions guidance sessions at Talvia are dedicated to supporting students and their families in making informed academic choices.
                </p>
                <Link
                  to="/contact?counselling=true"
                  className="btn-primary"
                >
                  Schedule Counselling <ArrowRight size={18} />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Building2, value: 150, suffix: '+', label: 'Partner Universities' },
                  { icon: Users, value: 25, suffix: '+', label: 'Countries Covered' },
                  { icon: Target, value: 100, suffix: '%', label: 'Global Guidance' },
                  { icon: Heart, value: 100, suffix: '%', label: 'Student-First Focus' },
                ].map(({ icon: Icon, value, suffix, label }) => (
                  <div key={label} className="bg-white rounded-2xl p-6 border border-slate-200/80 text-center shadow-sm hover:border-[#C59B4E]/60 transition-colors">
                    <div className="w-12 h-12 bg-[#FBF7EE] rounded-xl flex items-center justify-center mx-auto mb-3 border border-[#E8D7B8]">
                      <Icon size={22} className="text-[#C59B4E]" />
                    </div>
                    <div className="text-3xl font-black text-slate-900 tracking-tight">
                      <AnimatedNumber target={value} suffix={suffix} />
                    </div>
                    <div className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">{label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white border-t border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="section-subtitle mb-2">Our Purpose</p>
              <h2 className="section-title">Vision, Mission & Core Values</h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Our Vision',
                symbol: '01',
                text: 'To be a globally trusted education consultancy, recognized for ethical guidance, exceptional student outcomes, and empowering students to access premier higher education without borders.',
              },
              {
                title: 'Our Mission',
                symbol: '02',
                text: 'To provide accessible, transparent, and personalized admissions guidance worldwide, bridging the gap between student aspirations and top international educational opportunities.',
              },
              {
                title: 'Our Values',
                symbol: '03',
                text: 'Uncompromising integrity, student-first advocacy, global regulatory compliance (WHO, NMC, ECFMG, PCI), and dedicated support from the first step to final campus enrollment.',
              },
            ].map(({ title, symbol, text }) => (
              <StaggerItem key={title}>
                <div className="bg-white rounded-2xl p-8 border border-slate-200/80 hover:border-[#C59B4E]/60 transition-all duration-300 h-full flex flex-col shadow-sm">
                  <div className="text-xs font-mono font-bold text-[#B48A3D] mb-3 tracking-widest">{symbol} // VISION</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="bg-gradient-to-br from-[#181E2A] via-[#1E2535] to-[#141822] text-white rounded-3xl p-10 border border-[#2D384D] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#C59B4E]/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <span className="text-xs uppercase tracking-widest text-[#E4C586] font-semibold block mb-2">
                    The Talvia Difference
                  </span>
                  <h3 className="text-2xl font-black mb-6 tracking-tight">Why Choose Talvia Consultancy?</h3>
                  <div className="space-y-3.5">
                    {[
                      'Network of top accredited universities across 25+ countries worldwide',
                      'Personalised, one-on-one international admissions counselling',
                      'Admissions coverage for MBBS Abroad, Pharmacy, Tech & Management',
                      'Comprehensive guidance on global licensing (NMC, WHO, ECFMG, PCI, GMC)',
                      'First-to-end support with visa processing, apostille & document verification',
                      'Experienced counsellors with deep international admissions expertise',
                      'Student-first advocacy in every university recommendation',
                      'Transparent and unbiased fee structures in INR and local currencies',
                    ].map((point) => (
                      <div key={point} className="flex items-start gap-3">
                        <CheckCircle2 size={17} className="text-[#C59B4E] flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-sm">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div>
                <p className="section-subtitle mb-2">Our Methodology</p>
                <h2 className="section-title mb-5">Student-First, Always</h2>
                <p className="text-slate-600 leading-relaxed mb-5 text-base">
                  At Talvia Consultancy, we recognize that every student possesses distinct talents, financial parameters, and professional goals. Our advisory journey begins with active listening — understanding academic records, career aspirations, and personal preferences before proposing any institution.
                </p>
                <p className="text-slate-600 leading-relaxed mb-5 text-base">
                  We never push specific institutions based on commercial arrangements. Our recommendations are strictly aligned with the student's best interests, licensing pathways, and career aspirations. This commitment to honest, impartial counsel is what has established Talvia's global reputation.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8 text-base">
                  From initial profile evaluation to final visa approvals, accommodation assistance, and pre-departure briefings, our team stands with you at every milestone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/courses" className="btn-primary">
                    Explore Courses & Degrees <ArrowRight size={16} />
                  </Link>
                  <Link to="/contact" className="btn-secondary">
                    Contact Our Advisors
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#121620] via-[#1A2232] to-[#121620] text-white border-t border-[#252E3E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
              Ready to Study Without Borders?
            </h2>
            <p className="text-slate-300 text-base md:text-lg mb-8 font-light">
              Connect with our global admissions specialists for personalized guidance and university selection.
            </p>
            <Link
              to="/contact?counselling=true"
              className="btn-accent text-base py-3.5 px-8"
            >
              Get Admissions Counselling <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
