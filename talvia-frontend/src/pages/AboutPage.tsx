import { Link } from 'react-router-dom';
import { CheckCircle2, Target, Heart, Users, Building2, ArrowRight } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem, AnimatedNumber } from '../components/Animations';

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-black text-white py-20 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="down">
            <p className="text-zinc-400 font-semibold text-xs uppercase tracking-[0.25em] mb-2">Who We Are</p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">About Talvia Consultancy</h1>
            <p className="text-zinc-400 max-w-xl text-base font-light">
              Your Education. Your Future. Our Guidance. • Pan-India Admissions Advisory
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Intro */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <ScrollReveal direction="left">
              <div>
                <p className="section-subtitle mb-2">Our Foundation</p>
                <h2 className="section-title mb-6 leading-tight">
                  India's Dedicated Higher Education Advisory
                </h2>
                <p className="text-zinc-600 leading-relaxed mb-5 text-base">
                  Talvia Consultancy was founded with a singular conviction: every student deserves access to unbiased, professional, and transparent higher education counselling. Choosing the right college and course shapes your career trajectory, and our senior advisors are dedicated to making this process confident, informed, and empowering.
                </p>
                <p className="text-zinc-600 leading-relaxed mb-5 text-base">
                  Over the years, Talvia has forged verified networks with 25+ premier colleges and universities across Karnataka, Kerala, Tamil Nadu, Maharashtra, Delhi NCR, and other key Indian educational hubs. We guide thousands of students from their first consultation through documentation, quota allocations, and final campus admissions.
                </p>
                <p className="text-zinc-600 leading-relaxed mb-8 text-base">
                  All initial counselling and admissions guidance sessions at Talvia are dedicated to supporting students and their families.
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
                  { icon: Building2, value: 25, suffix: '+', label: 'Top Colleges' },
                  { icon: Users, value: 28, suffix: '+', label: 'States Covered' },
                  { icon: Target, value: 100, suffix: '%', label: 'Expert Guidance' },
                  { icon: Heart, value: 100, suffix: '%', label: 'Student-First Focus' },
                ].map(({ icon: Icon, value, suffix, label }) => (
                  <div key={label} className="bg-white rounded-2xl p-6 border border-zinc-200 text-center shadow-sm hover:border-black transition-colors">
                    <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mx-auto mb-3 border border-zinc-200">
                      <Icon size={22} className="text-black" />
                    </div>
                    <div className="text-3xl font-black text-black tracking-tight">
                      <AnimatedNumber target={value} suffix={suffix} />
                    </div>
                    <div className="text-xs text-zinc-500 font-medium mt-1 uppercase tracking-wider">{label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white border-t border-b border-zinc-200">
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
                text: 'To be India’s premier higher education consultancy, recognized for ethical guidance, exceptional college outcomes, and student empowerment across all states.',
              },
              {
                title: 'Our Mission',
                symbol: '02',
                text: 'To provide accessible, transparent, and personalized college guidance across India, bridging the gap between student aspirations and top educational opportunities.',
              },
              {
                title: 'Our Values',
                symbol: '03',
                text: 'Uncompromising integrity, student-first advocacy, full transparency regarding fees and eligibility, and dedicated support from the first step to final admission.',
              },
            ].map(({ title, symbol, text }) => (
              <StaggerItem key={title}>
                <div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-200 hover:border-black transition-all duration-300 h-full flex flex-col">
                  <div className="text-xs font-mono font-bold text-zinc-400 mb-3 tracking-widest">{symbol} // VISION</div>
                  <h3 className="text-xl font-bold text-black mb-3">{title}</h3>
                  <p className="text-zinc-600 text-sm leading-relaxed">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="bg-black text-white rounded-3xl p-10 border border-zinc-800 shadow-xl">
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold block mb-2">
                  The Talvia Difference
                </span>
                <h3 className="text-2xl font-black mb-6 tracking-tight">Why Choose Talvia Consultancy?</h3>
                <div className="space-y-3.5">
                  {[
                    'Network of 25+ accredited colleges and universities across India',
                    'Personalised, one-on-one counselling sessions',
                    'Admissions coverage across 28+ Indian states & UTs',
                    'Professional guidance and transparent academic counselling',
                    'First-to-end admission guidance and documentation support',
                    'Experienced counsellors with deep pan-India institutional knowledge',
                    'Student-first advocacy in every college recommendation',
                    'Transparent and unbiased fee and accreditation metrics',
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <CheckCircle2 size={17} className="text-white flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-300 text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div>
                <p className="section-subtitle mb-2">Our Methodology</p>
                <h2 className="section-title mb-5">Student-First, Always</h2>
                <p className="text-zinc-600 leading-relaxed mb-5 text-base">
                  At Talvia Consultancy, we recognize that every student possesses distinct talents, financial parameters, and professional goals. Our advisory journey begins with active listening — understanding academic records, career aspirations, and personal preferences before proposing any institution.
                </p>
                <p className="text-zinc-600 leading-relaxed mb-5 text-base">
                  We never push specific colleges based on quotas or commercial arrangements. Our recommendations are strictly aligned with the student's best interests. This commitment to honest, impartial counsel is what has established Talvia's reputation across India.
                </p>
                <p className="text-zinc-600 leading-relaxed mb-8 text-base">
                  From initial profile evaluation to final fee remittance and hostel accommodation assistance, our team stands with you at every milestone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/colleges" className="btn-primary">
                    Explore Colleges <ArrowRight size={16} />
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
      <section className="py-20 bg-black text-white border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
              Ready to Secure Your Academic Future?
            </h2>
            <p className="text-zinc-400 text-base md:text-lg mb-8 font-light">
              Connect with our admissions specialists for personalized one-on-one guidance.
            </p>
            <Link
              to="/contact?counselling=true"
              className="btn-white text-base py-3.5 px-8"
            >
              Get Admissions Counselling <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
