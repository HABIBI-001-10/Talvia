import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, Shield, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '../components/Animations';
import SEO from '../components/SEO';

export default function PrivacyPolicyPage() {
  const privacyStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://talviastudentsgrowth.in/privacy-policy#webpage',
        url: 'https://talviastudentsgrowth.in/privacy-policy',
        name: 'Privacy Policy | TALVIA Educational Consultancy',
        description: 'Privacy Policy and personal data protection procedures for TALVIA Consultancy visitors and applicants.',
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
            name: 'Privacy Policy',
            item: 'https://talviastudentsgrowth.in/privacy-policy',
          },
        ],
      },
    ],
  };

  return (
    <>
      <SEO
        title="Privacy Policy | TALVIA Educational Consultancy"
        description="Learn how TALVIA Consultancy protects your privacy and personal data. We maintain strict confidentiality for student records and admissions enquiries."
        canonical="https://talviastudentsgrowth.in/privacy-policy"
        keywords={[
          'Talvia privacy policy',
          'student data protection',
          'admissions privacy',
          'counselling confidentiality',
          'privacy practices',
        ]}
        structuredData={privacyStructuredData}
      />

      {/* Header */}
      <div className="bg-gradient-to-b from-[#141824] via-[#18202E] to-[#121620] text-white py-20 border-b border-[#252E3E]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="down">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-xs uppercase tracking-wider transition-colors">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <div className="flex items-center gap-2 text-[#E4C586] text-xs font-semibold uppercase tracking-widest mb-2">
              <Lock size={15} /> Privacy & Data Protection
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">Privacy Policy</h1>
            <p className="text-slate-300 text-sm md:text-base font-light">
              Last updated: November 2026 • TALVIA Educational Consultancy
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
          
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#C59B4E] font-mono font-black">01.</span> Commitment to Your Privacy
            </h2>
            <p>
              At <strong>TALVIA Consultancy</strong> (&ldquo;Talvia&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), we respect the privacy of every student, parent, and website visitor. This Privacy Policy outlines our transparent practices regarding the collection, use, and protection of your personal information when you use our website or contact our admissions desk via WhatsApp, phone, or email.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#C59B4E] font-mono font-black">02.</span> Information We Collect
            </h2>
            <p className="mb-3">
              We collect information that you voluntarily provide to us when submitting an admissions enquiry or scheduling a counselling session:
            </p>
            <ul className="space-y-2 pl-4">
              {[
                'Contact Details: Full Name, WhatsApp/Mobile Phone Number, and Email Address.',
                'Location Preferences: Preferred Country, Preferred State / Province, and Preferred City.',
                'Academic Interests: Target Degree or Program (e.g. MBBS, B.Pharm, Pharm.D, BDS, BTech, Nursing, etc.).',
                'Message Details: Any additional academic background, scores, marks, or specific institutional questions you submit.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#C59B4E] flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#C59B4E] font-mono font-black">03.</span> How We Use Your Information
            </h2>
            <p className="mb-3">
              We process your personal information exclusively for educational advisory purposes:
            </p>
            <ul className="space-y-2 pl-4">
              {[
                'To connect you with senior education counsellors specialized in your stream of choice.',
                'To evaluate eligibility and recommend recognized universities and colleges in your preferred country, state, or city.',
                'To deliver admission notifications, exam cutoff reminders, and seat availability updates directly on WhatsApp.',
                'To assist with application documentation, quota guidance, and campus enrollment procedures.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#C59B4E] flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#C59B4E] font-mono font-black">04.</span> WhatsApp Communication & Routing
            </h2>
            <p>
              When you submit an enquiry form on our website, your inputs are preformatted into a structured WhatsApp message linking directly to our official admissions desk (+91 8943442479). All interactions that follow occur over WhatsApp&rsquo;s end-to-end encrypted messaging infrastructure. You retain full control to discontinue the conversation at any time.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#C59B4E] font-mono font-black">05.</span> Zero Sale of Personal Data
            </h2>
            <p>
              TALVIA Consultancy adheres to a strict <strong>Zero Third-Party Data Sale</strong> policy. We never sell, rent, commercialize, or trade student or parent telephone numbers, emails, or personal profiles to marketing agencies, loan brokers, or unauthorized third parties.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#C59B4E] font-mono font-black">06.</span> Data Security & Retention
            </h2>
            <p>
              We maintain technical, administrative, and physical safeguards designed to protect your personal details against unauthorized access, loss, or disclosure. We retain your enquiry details only for the duration necessary to assist you with the academic admissions cycle for which you reached out to us, or as required by applicable Indian laws.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#C59B4E] font-mono font-black">07.</span> Your Privacy Rights
            </h2>
            <p>
              You have the right to request access to the information you shared with us, request corrections, or ask for complete deletion of your records from our advisory system. To exercise any of these rights, simply email us at <strong>talviaconsultancy@gmail.com</strong> or message our WhatsApp desk at <strong>+91 8943442479</strong> with your request.
            </p>
          </section>

          {/* Section 8 */}
          <section className="bg-[#FAFBFD] p-6 rounded-2xl border border-slate-200/80">
            <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
              <Shield size={18} className="text-[#C59B4E]" /> Data Privacy Officer
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              For any questions regarding this Privacy Policy or how your personal information is handled, please contact our data grievance desk:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-sm font-semibold text-slate-900">
              <a href="tel:+918943442479" className="flex items-center gap-2 hover:text-[#B48A3D] transition-colors">
                <Phone size={15} className="text-[#C59B4E]" /> +91 8943442479
              </a>
              <a href="mailto:talviaconsultancy@gmail.com" className="flex items-center gap-2 hover:text-[#B48A3D] transition-colors">
                <Mail size={15} className="text-[#C59B4E]" /> talviaconsultancy@gmail.com
              </a>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
