import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, FileText, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '../components/Animations';
import SEO from '../components/SEO';

export default function TermsAndConditionsPage() {
  const termsStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://talviastudentsgrowth.in/terms-and-conditions#webpage',
        url: 'https://talviastudentsgrowth.in/terms-and-conditions',
        name: 'Terms & Conditions | TALVIA Educational Consultancy',
        description: 'Terms and Conditions governing educational advisory services and website usage for TALVIA Consultancy.',
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
            name: 'Terms & Conditions',
            item: 'https://talviastudentsgrowth.in/terms-and-conditions',
          },
        ],
      },
    ],
  };

  return (
    <>
      <SEO
        title="Terms & Conditions | TALVIA Educational Consultancy"
        description="Read the Terms & Conditions governing educational advisory services, admissions guidance, and website usage for TALVIA Consultancy."
        canonical="https://talviastudentsgrowth.in/terms-and-conditions"
        keywords={[
          'Talvia terms and conditions',
          'terms of service',
          'educational consultancy terms',
          'admissions advisory agreement',
          'legal terms',
        ]}
        structuredData={termsStructuredData}
      />

      {/* Header */}
      <div className="bg-gradient-to-b from-[#141824] via-[#18202E] to-[#121620] text-white py-20 border-b border-[#252E3E]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="down">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-xs uppercase tracking-wider transition-colors">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <div className="flex items-center gap-2 text-[#E4C586] text-xs font-semibold uppercase tracking-widest mb-2">
              <FileText size={15} /> Legal Information
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">Terms & Conditions</h1>
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
              <span className="text-[#C59B4E] font-mono font-black">01.</span> Acceptance of Terms
            </h2>
            <p>
              Welcome to <strong>TALVIA Consultancy</strong> (&ldquo;Talvia&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). By accessing our website, engaging in telephone or WhatsApp consultations, submitting an admissions enquiry form, or utilizing our higher education advisory services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please refrain from using our website and services.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#C59B4E] font-mono font-black">02.</span> Scope of Educational Advisory Services
            </h2>
            <p className="mb-3">
              TALVIA Consultancy operates as an independent global higher education advisory platform helping students and parents navigate academic choices across recognized domestic and international educational institutions worldwide under our vision of <strong>Education Without Borders</strong>. Our services include:
            </p>
            <ul className="space-y-2 pl-4 mb-3">
              {[
                'Career counseling, aptitude evaluation, and stream guidance',
                'Comprehensive course details, duration, and eligibility criteria guidance',
                'Admissions assistance, application form compilation, and document scrutiny',
                'Guidance on entrance examinations, merit cutoffs, and management/institutional quota procedures',
                'Guidance for Medical (MBBS, BDS, BAMS, BHMS), Pharmacy (B.Pharm, Pharm.D), Healthcare, Engineering, and Professional courses',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#C59B4E] flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-slate-500 text-xs italic bg-slate-50 p-4 rounded-xl border border-slate-200">
              Important Disclaimer: TALVIA Consultancy is an educational advisory and counselling consultancy. We are neither an examination-conducting authority nor a university/college. All final admissions, quota seat awards, and fee structures are solely subject to the candidate meeting statutory norms and the final discretion of the respective institution and governing bodies (e.g. NMC, PCI, DCI, NCISM, NCH, INC, UGC, AICTE).
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#C59B4E] font-mono font-black">03.</span> Student & Parent Responsibilities
            </h2>
            <p className="mb-3">
              When seeking advisory services from Talvia, the candidate and their legal guardians agree to:
            </p>
            <ul className="space-y-2 pl-4">
              {[
                'Provide accurate, authentic, and complete academic records, marks sheets, and identity documents.',
                'Ensure they meet the minimum qualifying age and examination criteria (e.g. NEET-UG scores for medical programs, 10+2 percentages).',
                'Promptly review communications sent via WhatsApp, phone call, or email regarding admission timelines and document submission dates.',
                'Make all tuition fees and university payments directly to the verified bank accounts of the chosen institutions.',
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
              <span className="text-[#C59B4E] font-mono font-black">04.</span> Fee Transparency & Financial Integrity
            </h2>
            <p>
              Talvia Consultancy prides itself on utmost financial integrity. All initial educational counseling, profiling, and course recommendations are conducted with complete transparency. We do not solicit unofficial fees, and candidates are strictly instructed to remit college tuition fees, registration fees, and hostel deposits directly to the authorized accounts of the respective college or university.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#C59B4E] font-mono font-black">05.</span> WhatsApp & Electronic Communications Consent
            </h2>
            <p>
              By submitting an admissions enquiry or clicking &ldquo;Send Enquiry via WhatsApp&rdquo; or &ldquo;Open WhatsApp Chat&rdquo;, you explicitly consent to receive informational messages, admission updates, cutoff alerts, and course guidance from Talvia Consultancy counsellors at your registered WhatsApp number or telephone. You may opt out of future messages at any time by messaging &ldquo;STOP&rdquo; on WhatsApp.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#C59B4E] font-mono font-black">06.</span> Limitation of Liability
            </h2>
            <p>
              While Talvia Consultancy makes every reasonable effort to verify information regarding university accreditations, course fees, and admission guidelines, we shall not be held liable for changes in government regulations, examination schedules, fee revisions, or seat quota variations implemented by statutory councils or college administrations after the consultation date.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-[#C59B4E] font-mono font-black">07.</span> Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms & Conditions shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the competent courts in Kerala, India.
            </p>
          </section>

          {/* Section 8 */}
          <section className="bg-[#FAFBFD] p-6 rounded-2xl border border-slate-200/80">
            <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#C59B4E]" /> Questions & Contact Desk
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              If you have any questions or require clarification regarding these terms, our legal and compliance desk is readily available:
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
