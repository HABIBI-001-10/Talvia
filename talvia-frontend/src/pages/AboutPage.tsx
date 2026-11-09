import { Link } from 'react-router-dom';
import { CheckCircle2, Target, Heart, Users, Building2, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#172554] to-[#2563EB] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#FF6633] font-semibold text-sm uppercase tracking-widest mb-2">Who We Are</p>
          <h1 className="text-4xl md:text-5xl font-black mb-3">About Talvia</h1>
          <p className="text-blue-200 max-w-xl">Your Education. Your Future. Our Guidance.</p>
        </div>
      </div>

      {/* Intro */}
      <section className="py-16 bg-[#F5F8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#FF6633] font-semibold text-sm uppercase tracking-widest mb-3">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-black text-[#172554] mb-5">Kerala's Trusted Education Partner</h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Talvia is a leading education consultancy in Kerala, dedicated to helping students navigate their academic journey with confidence. We understand that choosing the right college and course is one of the most significant decisions in a student's life — and we're here to make it easier.
              </p>
              <p className="text-slate-600 leading-relaxed mb-5">
                Founded with a simple belief — that every student deserves access to quality education guidance regardless of their background — Talvia has built a trusted network of 25+ partner colleges spanning all 14 districts of Kerala.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Our experienced counsellors work one-on-one with students and parents, understanding their aspirations, academic background, and preferences to recommend the most suitable educational pathways. All our counselling services are completely free for students.
              </p>
              <Link to="/contact?counselling=true" className="inline-flex items-center gap-2 bg-[#FF6633] hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-xl transition-colors shadow-lg">
                Get Free Counselling <ArrowRight size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: Building2, value: '25+', label: 'Partner Colleges', color: 'bg-blue-500' },
                { icon: Users, value: '14', label: 'Kerala Districts', color: 'bg-indigo-500' },
                { icon: Target, value: '100%', label: 'Free Guidance', color: 'bg-[#FF6633]' },
                { icon: Heart, value: '∞', label: 'Student Support', color: 'bg-green-500' },
              ].map(({ icon: Icon, value, label, color }) => (
                <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                  <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <div className="text-3xl font-black text-[#172554]">{value}</div>
                  <div className="text-sm text-slate-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[#FF6633] font-semibold text-sm uppercase tracking-widest mb-3">Our Purpose</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#172554]">Vision, Mission & Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Our Vision',
                icon: '🔭',
                text: "To be Kerala's most trusted education partner, empowering every student to make informed decisions about their academic future and build successful careers.",
                color: 'border-blue-500',
              },
              {
                title: 'Our Mission',
                icon: '🎯',
                text: 'To provide accessible, transparent, and personalized education guidance to students across Kerala, bridging the gap between aspirations and opportunities.',
                color: 'border-[#FF6633]',
              },
              {
                title: 'Our Values',
                icon: '💎',
                text: 'Student-first approach, transparency in all guidance, integrity in college partnerships, accessibility for all backgrounds, and continuous improvement in our services.',
                color: 'border-green-500',
              },
            ].map(({ title, icon, text, color }) => (
              <div key={title} className={`bg-white rounded-2xl p-7 shadow-sm border-t-4 ${color} hover:shadow-lg transition-shadow`}>
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-xl font-bold text-[#172554] mb-3">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-[#F5F8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-[#172554] to-[#2563EB] rounded-3xl p-10 text-white">
              <h3 className="text-2xl font-black mb-6">Why Choose Talvia?</h3>
              {[
                'Network of 25+ verified partner colleges across Kerala',
                'Personalised, one-on-one counselling sessions',
                'Coverage across all 14 districts of Kerala',
                'Completely free guidance and counselling',
                'End-to-end admission support and documentation',
                'Experienced counsellors with deep local knowledge',
                'Student-first approach in every recommendation',
                'Transparent and unbiased college information',
              ].map(point => (
                <div key={point} className="flex items-start gap-3 mb-3">
                  <CheckCircle2 size={18} className="text-[#FF6633] flex-shrink-0 mt-0.5" />
                  <span className="text-blue-100 text-sm">{point}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-[#FF6633] font-semibold text-sm uppercase tracking-widest mb-3">Our Approach</p>
              <h2 className="text-3xl md:text-4xl font-black text-[#172554] mb-5">Student-First, Always</h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                At Talvia, we believe that every student is unique. Our approach begins with truly understanding each student — their academic background, career aspirations, family considerations, and personal preferences.
              </p>
              <p className="text-slate-600 leading-relaxed mb-5">
                We never recommend a college or course based on commission or partnerships. Our recommendations are always based on what's genuinely best for the student. This student-first commitment is what sets Talvia apart.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                From the first counselling session to the final admission confirmation, our team is available to answer questions, resolve concerns, and provide the support that students and parents need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/colleges" className="btn-primary">
                  Explore Colleges <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#FF6633]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to Find Your Perfect College?</h2>
          <p className="text-orange-100 text-lg mb-8">Our counsellors are ready to guide you. It's completely free.</p>
          <Link
            to="/contact?counselling=true"
            className="inline-flex items-center gap-2 bg-white text-[#FF6633] hover:bg-orange-50 font-bold px-8 py-4 rounded-xl transition-colors shadow-lg text-lg"
          >
            Get Free Counselling <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}

