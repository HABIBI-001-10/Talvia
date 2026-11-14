import { Link } from 'react-router-dom';
import { CheckCircle2, Target, Heart, Users, Building2, ArrowRight, HelpCircle } from 'lucide-react';
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
        mainEntity: {
          '@id': 'https://talviastudentsgrowth.in/#organization',
        },
      },
      {
        '@type': 'EducationalOrganization',
        '@id': 'https://talviastudentsgrowth.in/#organization',
        name: 'TALVIA',
        legalName: 'TALVIA Educational Consultancy',
        alternateName: [
          'TALVIA Consultancy',
          'TALVIA Global Education',
          'TALVIA Students Growth',
          'Talvia',
        ],
        disambiguatingDescription: 'TALVIA (TALVIA Educational Consultancy / TALVIA Students Growth) is an international higher education admissions consultancy firm headquartered in India, guiding students to universities worldwide under the vision Education Without Borders. TALVIA is an independent educational organization and is not affiliated with, located in, or named after the European country Latvia.',
        category: 'Educational Consultant',
        url: 'https://talviastudentsgrowth.in/',
        logo: {
          '@type': 'ImageObject',
          '@id': 'https://talviastudentsgrowth.in/#logo',
          url: 'https://talviastudentsgrowth.in/exact-logo-raw.png',
          contentUrl: 'https://talviastudentsgrowth.in/exact-logo-raw.png',
          caption: 'TALVIA — Education Without Borders Logo',
          width: '512',
          height: '512',
        },
        image: 'https://talviastudentsgrowth.in/exact-logo-raw.png',
        description: 'TALVIA is the premier global higher education consultancy connecting aspiring students with top-ranked universities worldwide under our vision: Education Without Borders.',
        slogan: 'Education Without Borders • Global Admissions Advisory',
        telephone: '+91 8943442479',
        email: 'talviaconsultancy@gmail.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kochi',
          addressRegion: 'Kerala',
          postalCode: '682011',
          addressCountry: 'IN',
        },
        sameAs: [
          'https://wa.me/918943442479',
          'https://www.instagram.com/talviaconsultancy',
          'https://www.facebook.com/talviaconsultancy',
          'https://www.linkedin.com/company/talviaconsultancy',
          'https://talviastudentsgrowth.in/',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91 8943442479',
          contactType: 'admissions counselling',
          areaServed: 'Worldwide',
          availableLanguage: ['English', 'Malayalam', 'Hindi'],
        },
        knowsAbout: [
          'Global Higher Education Admissions',
          'Educational Consultancy',
          'Study Abroad Advisory',
          'MBBS Abroad Admissions',
          'Pharmacy Admissions',
          'Healthcare Degrees',
          'Education Without Borders',
        ],
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
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is TALVIA Consultancy?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'TALVIA (TALVIA Educational Consultancy / TALVIA Students Growth) is a premier global higher education admissions advisory firm headquartered in India. We connect aspiring students with top-ranked accredited universities across 25+ countries for MBBS abroad, Pharmacy, Healthcare, and Professional degrees under our vision: Education Without Borders.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is TALVIA an educational consultancy or related to the country Latvia?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'TALVIA is an independent educational consultancy firm dedicated to student admissions guidance worldwide. TALVIA is not affiliated with, located in, or named after the European nation of Latvia. The name TALVIA represents student growth, academic empowerment, and global higher education access.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <SEO
        title="About Us | TALVIA Consultancy • Global Education & Study Abroad Advisory"
        description="Discover TALVIA Consultancy's global vision for education without borders. Leading overseas education consultancy empowering students with ethical admissions guidance across 25+ countries."
        canonical="https://talviastudentsgrowth.in/about"
        keywords={[
          'TALVIA',
          'TALVIA Consultancy',
          'TALVIA Students Growth',
          'about Talvia',
          'global education consultancy',
          'study abroad consultants',
          'overseas education guidance',
          'international university admissions',
          'MBBS abroad consultants',
          'education without borders',
          'ethical education advisory',
        ]}
        structuredData={aboutStructuredData}
      />

      {/* Header */}
      <div className="bg-gradient-to-b from-[#141824] via-[#18202E] to-[#121620] text-white py-20 border-b border-[#252E3E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="down">
            <p className="text-[#E4C586] font-semibold text-xs uppercase tracking-[0.25em] mb-2">Global Admissions Office • Education Without Borders</p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">About TALVIA Consultancy</h1>
            <p className="text-slate-300 max-w-xl text-base font-light">
              Your Education. Your Future. Our Guidance. • Premier Global Education & Study Abroad Advisory
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
                <p className="section-subtitle mb-2">Our Foundation & Global Reach</p>
                <h2 className="section-title mb-6 leading-tight">
                  A Global Vision for Study Abroad & Higher Education
                </h2>
                <p className="text-slate-600 leading-relaxed mb-5 text-base">
                  <strong>TALVIA Consultancy</strong> (TALVIA Students Growth) was founded with a singular conviction: every student deserves access to unbiased, professional, and transparent overseas education counselling. Guided by our vision of <strong>Education Without Borders</strong>, our senior advisors empower students to pursue world-class medical, pharmacy, healthcare, and professional degrees across recognized global universities.
                </p>
                <p className="text-slate-600 leading-relaxed mb-5 text-base">
                  Over the years, TALVIA has established strong advisory networks across 25+ countries — including India, Russia, Georgia, Uzbekistan, the Philippines, Kazakhstan, the UK, and Europe. We provide comprehensive first-to-end guidance from international course selection through document apostille, visa filing, quota seats, and final campus enrollment.
                </p>
                <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-xs mb-6">
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>Brand Identity:</strong> TALVIA is an independent international educational consultancy organization headquartered in India with worldwide university networks (distinct from the European country Latvia). Our sole mission is student empowerment and academic growth.
                  </p>
                </div>
                <p className="text-slate-600 leading-relaxed mb-8 text-base">
                  Explore our <Link to="/services/study-abroad-guidance" className="text-slate-900 font-semibold underline hover:text-[#B48A3D]">study abroad guidance</Link>, learn about <Link to="/services/visa-support-documentation" className="text-slate-900 font-semibold underline hover:text-[#B48A3D]">visa & document legalisation</Link>, or browse accredited <Link to="/courses" className="text-slate-900 font-semibold underline hover:text-[#B48A3D]">global degree programs</Link> to take the next confident step in your academic journey.
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
                    The TALVIA Difference
                  </span>
                  <h3 className="text-2xl font-black mb-6 tracking-tight">Why Choose TALVIA Consultancy?</h3>
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
                  At TALVIA Consultancy, we recognize that every student possesses distinct talents, financial parameters, and professional goals. Our advisory journey begins with active listening — understanding academic records, career aspirations, and personal preferences before proposing any institution.
                </p>
                <p className="text-slate-600 leading-relaxed mb-5 text-base">
                  We never push specific institutions based on commercial arrangements. Our recommendations are strictly aligned with the student's best interests, licensing pathways, and career aspirations. This commitment to honest, impartial counsel is what has established TALVIA's global reputation.
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

      {/* Brand Identity & Frequently Asked Questions */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <p className="section-subtitle mb-2">Brand Identity & FAQs</p>
              <h2 className="section-title">Frequently Asked Questions About TALVIA</h2>
              <p className="text-slate-600 text-sm mt-3 max-w-xl mx-auto">
                Clarifying TALVIA’s role as an independent international education consultancy and how we empower students worldwide.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {[
              {
                q: 'What is TALVIA Consultancy?',
                a: (
                  <>
                    TALVIA (registered as TALVIA Educational Consultancy / TALVIA Students Growth) is a premier global higher education admissions advisory firm headquartered in India. Under our guiding principle of <strong>Education Without Borders</strong>, we provide comprehensive guidance for <Link to="/courses/mbbs-bachelor-of-medicine-bachelor-of-surgery" className="text-[#B48A3D] font-semibold underline">MBBS abroad</Link>, <Link to="/courses/b-pharm-bachelor-of-pharmacy" className="text-[#B48A3D] font-semibold underline">Pharmacy (B.Pharm, Pharm.D)</Link>, Healthcare, Engineering, and Business degrees across 25+ countries worldwide.
                  </>
                ),
              },
              {
                q: 'Is TALVIA an educational consultancy or related to the country Latvia?',
                a: (
                  <>
                    TALVIA is an independent educational consultancy firm dedicated exclusively to student admissions guidance and academic advisory. <strong>TALVIA is not affiliated with, located in, or named after the European country Latvia.</strong> The brand name TALVIA signifies student growth, academic aspiration, and global access to premier institutions worldwide.
                  </>
                ),
              },
              {
                q: 'What services does TALVIA Consultancy provide?',
                a: (
                  <>
                    We offer complete end-to-end support including <Link to="/services/career-guidance" className="text-[#B48A3D] font-semibold underline">Career Guidance</Link>, <Link to="/services/college-selection" className="text-[#B48A3D] font-semibold underline">University Selection</Link>, <Link to="/services/course-selection" className="text-[#B48A3D] font-semibold underline">Course Selection</Link>, <Link to="/services/admission-assistance" className="text-[#B48A3D] font-semibold underline">Admission Assistance</Link>, <Link to="/services/application-support" className="text-[#B48A3D] font-semibold underline">Application Support</Link>, and <Link to="/services/student-counselling" className="text-[#B48A3D] font-semibold underline">Student Counselling</Link>.
                  </>
                ),
              },
              {
                q: 'How can I connect with TALVIA admissions counsellors?',
                a: (
                  <>
                    You can schedule a one-on-one session via our <Link to="/contact?counselling=true" className="text-[#B48A3D] font-semibold underline">Admissions Contact Page</Link>, call us at <a href="tel:+918943442479" className="text-[#B48A3D] font-semibold underline">+91 8943442479</a>, or chat with our admissions desk directly on <a href="https://wa.me/918943442479" target="_blank" rel="noopener noreferrer" className="text-[#B48A3D] font-semibold underline">WhatsApp</a>.
                  </>
                ),
              },
            ].map(({ q, a }, idx) => (
              <ScrollReveal key={idx} direction="up">
                <div className="bg-[#FAFBFD] rounded-2xl p-6 border border-slate-200/80 hover:border-[#C59B4E]/40 transition-colors shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 mb-2 flex items-start gap-2.5">
                    <HelpCircle size={18} className="text-[#C59B4E] flex-shrink-0 mt-0.5" />
                    <span>{q}</span>
                  </h3>
                  <div className="text-slate-600 text-sm leading-relaxed pl-7">{a}</div>
                </div>
              </ScrollReveal>
            ))}
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
