import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error(`Error: Base template not found at ${templatePath}. Run 'vite build' first.`);
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

const SITE_URL = 'https://talviastudentsgrowth.in';
const DEFAULT_IMAGE = `${SITE_URL}/exact-logo-raw.png`;

// All 26 canonical public routes matching sitemap.xml and React Router
const routes = [
  {
    path: '',
    title: 'TALVIA — Official Website | Global Education Admissions • Education Without Borders',
    description: 'The official website of TALVIA. Premier global education consultancy connecting aspiring students with top-ranked universities worldwide. First-to-end guidance for MBBS abroad, Pharmacy, Healthcare & Professional degrees under our vision: Education Without Borders.',
    keywords: 'TALVIA, TALVIA Consultancy, TALVIA official website, TALVIA Education, TALVIA admissions, TALVIA students growth, Talvia, talviastudentsgrowth.in, Education Without Borders, global education consultancy, study abroad, MBBS abroad, medical admission guidance, B Pharm admissions, Pharm D courses, international university admissions',
    canonical: `${SITE_URL}/`,
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: 'TALVIA',
          alternateName: [
            'TALVIA Consultancy',
            'TALVIA Global Education',
            'TALVIA Students Growth',
            'Talvia',
          ],
          disambiguatingDescription: 'Official website for TALVIA Consultancy — Premier global higher education admissions consultancy firm (independent organization, distinct from the country Latvia).',
          description: 'The official website of TALVIA — Premier global education consultancy connecting aspiring students with top-ranked universities worldwide. Education Without Borders.',
          publisher: {
            '@id': `${SITE_URL}/#organization`,
          },
          inLanguage: 'en-US',
        },
        {
          '@type': 'EducationalOrganization',
          '@id': `${SITE_URL}/#organization`,
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
          url: `${SITE_URL}/`,
          logo: {
            '@type': 'ImageObject',
            '@id': `${SITE_URL}/#logo`,
            url: DEFAULT_IMAGE,
            contentUrl: DEFAULT_IMAGE,
            caption: 'TALVIA — Education Without Borders Logo',
            width: '512',
            height: '512',
          },
          image: DEFAULT_IMAGE,
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
          areaServed: [
            'Worldwide',
            'India',
            'Russia',
            'Georgia',
            'Uzbekistan',
            'Kazakhstan',
            'Philippines',
            'United Kingdom',
            'Europe',
          ],
          sameAs: [
            'https://wa.me/918943442479',
            'https://www.instagram.com/talviaconsultancy',
            'https://www.facebook.com/talviaconsultancy',
            'https://www.linkedin.com/company/talviaconsultancy',
            `${SITE_URL}/`,
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
            'International University Placement',
            'Education Without Borders',
          ],
        },
      ],
    },
  },
  {
    path: 'about',
    title: 'About Us | TALVIA Consultancy • Education Without Borders',
    description: 'Discover TALVIA Consultancy\'s global vision for higher education without borders. Empowering students with ethical, transparent admissions guidance across 25+ countries.',
    keywords: 'TALVIA, TALVIA Consultancy, TALVIA Students Growth, about Talvia, global education consultancy, education without borders, study abroad consultants, international university admissions, overseas medical education, ethical education advisory',
    canonical: `${SITE_URL}/about`,
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'AboutPage',
          '@id': `${SITE_URL}/about#webpage`,
          url: `${SITE_URL}/about`,
          name: 'About TALVIA Consultancy • Education Without Borders',
          description: 'Learn about TALVIA Consultancy’s global higher education advisory, our mission, vision, and student-first guidance across 25+ countries.',
          mainEntity: {
            '@id': `${SITE_URL}/#organization`,
          },
        },
        {
          '@type': 'EducationalOrganization',
          '@id': `${SITE_URL}/#organization`,
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
          url: `${SITE_URL}/`,
          logo: DEFAULT_IMAGE,
          sameAs: [
            'https://wa.me/918943442479',
            'https://www.instagram.com/talviaconsultancy',
            'https://www.facebook.com/talviaconsultancy',
            'https://www.linkedin.com/company/talviaconsultancy',
            `${SITE_URL}/`,
          ],
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'About Us', item: `${SITE_URL}/about` },
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
    },
  },
  {
    path: 'courses',
    title: 'International Academic Programs & Degrees | TALVIA Consultancy',
    description: 'Explore premier Medical (MBBS Abroad & India), Pharmacy (B.Pharm, Pharm.D), Healthcare, Engineering, and Professional degree programs across accredited global universities.',
    keywords: 'MBBS admission, MBBS abroad, B Pharm colleges, Pharm D admissions, BDS dental degree, BAMS Ayurveda, nursing courses, engineering admissions, global university degrees, medical degrees abroad',
    canonical: `${SITE_URL}/courses`,
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${SITE_URL}/courses#webpage`,
          url: `${SITE_URL}/courses`,
          name: 'International Academic Programs & Degrees | TALVIA Consultancy',
          description: 'Explore premier Medical, Pharmacy, Healthcare, Engineering, and Professional degree programs across accredited universities worldwide.',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Courses & Programs', item: `${SITE_URL}/courses` },
          ],
        },
      ],
    },
  },
  // Course Detail Pages
  {
    path: 'courses/mbbs-bachelor-of-medicine-bachelor-of-surgery',
    title: 'MBBS (Bachelor of Medicine & Bachelor of Surgery) Admissions & Details | TALVIA Consultancy',
    description: 'Premier medical degree preparing licensed physicians and surgeons with clinical hospital rotations. Duration: 5.5 Years (Includes 1-Year Clinical Internship). First-to-end guidance for accredited domestic and international university admissions.',
    keywords: 'MBBS admission, MBBS abroad, study MBBS in Russia, Uzbekistan MBBS, Georgia medical university, NEET qualification, NMC approved medical colleges, Talvia Consultancy',
    canonical: `${SITE_URL}/courses/mbbs-bachelor-of-medicine-bachelor-of-surgery`,
  },
  {
    path: 'courses/b-pharm-bachelor-of-pharmacy',
    title: 'B.Pharm (Bachelor of Pharmacy) Admissions & Details | TALVIA Consultancy',
    description: 'PCI-approved core pharmaceutical degree covering drug development, clinical pharmacology, and hospital therapeutics. Duration: 4 Years. First-to-end guidance for accredited domestic and international university admissions.',
    keywords: 'B.Pharm admissions, Bachelor of Pharmacy, PCI approved colleges, pharmacy admissions, pharmaceutical sciences, drug formulation degree',
    canonical: `${SITE_URL}/courses/b-pharm-bachelor-of-pharmacy`,
  },
  {
    path: 'courses/pharm-d-doctor-of-pharmacy',
    title: 'Pharm.D (Doctor of Pharmacy) Admissions & Details | TALVIA Consultancy',
    description: 'Prestigious 6-year clinical doctoral pharmacy program with extensive hospital residency and ward rounds. Duration: 6 Years (Includes 1-Year Hospital Residency). First-to-end guidance for accredited domestic and international university admissions.',
    keywords: 'Pharm.D admissions, Doctor of Pharmacy, clinical pharmacy degree, hospital residency pharmacy, PCI approved Pharm.D colleges',
    canonical: `${SITE_URL}/courses/pharm-d-doctor-of-pharmacy`,
  },
  {
    path: 'courses/bds-bachelor-of-dental-surgery',
    title: 'BDS (Bachelor of Dental Surgery) Admissions & Details | TALVIA Consultancy',
    description: 'Comprehensive dental surgeon qualification covering oral medicine, surgery, and restorative dental clinical care. Duration: 5 Years (Includes 1-Year Dental Internship). First-to-end guidance for accredited domestic and international university admissions.',
    keywords: 'BDS admission, Bachelor of Dental Surgery, dental colleges, DCI approved dental colleges, dental surgeon degree',
    canonical: `${SITE_URL}/courses/bds-bachelor-of-dental-surgery`,
  },
  {
    path: 'courses/bams-bachelor-of-ayurvedic-medicine-surgery',
    title: 'BAMS (Bachelor of Ayurvedic Medicine & Surgery) Admissions & Details | TALVIA Consultancy',
    description: 'Integrative Indian medicine degree combining classical Ayurveda with modern clinical diagnostics. Duration: 5.5 Years (Includes 1-Year Rotational Internship). First-to-end guidance for accredited domestic and international university admissions.',
    keywords: 'BAMS admission, Ayurvedic medical degree, NCISM approved colleges, NEET BAMS cutoffs, Ayurveda doctor program',
    canonical: `${SITE_URL}/courses/bams-bachelor-of-ayurvedic-medicine-surgery`,
  },
  {
    path: 'courses/bhms-bachelor-of-homeopathic-medicine-surgery',
    title: 'BHMS (Bachelor of Homeopathic Medicine & Surgery) Admissions & Details | TALVIA Consultancy',
    description: 'Holistic homeopathic medical science covering Materia Medica, organon, and hospital clinical therapy. Duration: 5.5 Years (Includes 1-Year Clinical Internship). First-to-end guidance for accredited domestic and international university admissions.',
    keywords: 'BHMS admission, Homeopathic Medicine degree, NCH approved colleges, homeopathic doctor admission',
    canonical: `${SITE_URL}/courses/bhms-bachelor-of-homeopathic-medicine-surgery`,
  },
  {
    path: 'courses/bpt-bachelor-of-physiotherapy',
    title: 'BPT (Bachelor of Physiotherapy) Admissions & Details | TALVIA Consultancy',
    description: 'Clinical physiotherapy and rehabilitation degree for sports medicine, orthopedics, and neurology. Duration: 4.5 Years (Includes 6 Months Internship). First-to-end guidance for accredited domestic and international university admissions.',
    keywords: 'BPT admission, Bachelor of Physiotherapy, physiotherapy colleges, rehabilitation medicine, sports physiotherapy',
    canonical: `${SITE_URL}/courses/bpt-bachelor-of-physiotherapy`,
  },
  {
    path: 'courses/m-pharm-master-of-pharmacy',
    title: 'M.Pharm (Master of Pharmacy) Admissions & Details | TALVIA Consultancy',
    description: 'Advanced postgraduate specialization in drug formulation, pharmacology, and industrial research. Duration: 2 Years. First-to-end guidance for accredited domestic and international university admissions.',
    keywords: 'M.Pharm admission, Master of Pharmacy, GPAT counselling, pharmaceutical research, pharmacology postgraduate',
    canonical: `${SITE_URL}/courses/m-pharm-master-of-pharmacy`,
  },
  {
    path: 'courses/bsc-nursing',
    title: 'BSc Nursing Admissions & Details | TALVIA Consultancy',
    description: 'Build a globally respected career in professional clinical nursing and hospital healthcare delivery. Duration: 4 Years. First-to-end guidance for accredited domestic and international university admissions.',
    keywords: 'BSc Nursing admission, INC approved nursing colleges, hospital clinical rotations, professional nursing degree',
    canonical: `${SITE_URL}/courses/bsc-nursing`,
  },
  {
    path: 'courses/btech-computer-science-engineering',
    title: 'BTech Computer Science & Engineering Admissions & Details | TALVIA Consultancy',
    description: 'High-demand computing and software engineering program across top accredited universities. Duration: 4 Years. First-to-end guidance for accredited domestic and international university admissions.',
    keywords: 'BTech CSE admission, computer science engineering, software engineering, AI machine learning degree',
    canonical: `${SITE_URL}/courses/btech-computer-science-engineering`,
  },
  {
    path: 'courses/bca-bachelor-of-computer-applications',
    title: 'BCA (Bachelor of Computer Applications) Admissions & Details | TALVIA Consultancy',
    description: 'Master core software engineering, programming, and cloud technologies. Duration: 3 Years. First-to-end guidance for accredited domestic and international university admissions.',
    keywords: 'BCA admission, Bachelor of Computer Applications, software development, cloud computing degree',
    canonical: `${SITE_URL}/courses/bca-bachelor-of-computer-applications`,
  },
  {
    path: 'courses/bba-bachelor-of-business-administration',
    title: 'BBA (Bachelor of Business Administration) Admissions & Details | TALVIA Consultancy',
    description: 'Develop executive management leadership skills for corporate careers. Duration: 3 Years. First-to-end guidance for accredited domestic and international university admissions.',
    keywords: 'BBA admission, business administration degree, corporate management, entrepreneurship',
    canonical: `${SITE_URL}/courses/bba-bachelor-of-business-administration`,
  },
  {
    path: 'courses/bcom-bachelor-of-commerce',
    title: 'BCom (Bachelor of Commerce) Admissions & Details | TALVIA Consultancy',
    description: 'Comprehensive foundation in accounting, financial markets, and business taxation. Duration: 3 Years. First-to-end guidance for accredited domestic and international university admissions.',
    keywords: 'BCom admission, Bachelor of Commerce, accounting finance degree, CA ACCA preparation',
    canonical: `${SITE_URL}/courses/bcom-bachelor-of-commerce`,
  },
  // Services Directory
  {
    path: 'services',
    title: 'Global Higher Education Advisory Services | TALVIA Consultancy',
    description: 'Comprehensive admissions advisory: career guidance, international university selection, course advisory, visa documentation, and student counselling worldwide.',
    keywords: 'education consultancy services, career guidance, university selection, college admissions assistance, visa documentation support, student counselling, Education Without Borders',
    canonical: `${SITE_URL}/services`,
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          '@id': `${SITE_URL}/services#service`,
          serviceType: 'Higher Education Admissions Consulting',
          provider: {
            '@type': 'EducationalOrganization',
            name: 'TALVIA Consultancy',
            url: SITE_URL,
          },
          areaServed: 'Worldwide',
          description: 'Comprehensive global higher education admissions advisory covering career guidance, university selection, quota procedures, documentation and visa support.',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Our Services', item: `${SITE_URL}/services` },
          ],
        },
      ],
    },
  },
  // Service Detail Pages
  {
    path: 'services/career-guidance',
    title: 'Career Guidance | TALVIA Consultancy',
    description: 'Personalized profiling and psychometric insights to identify your ideal academic and career path. Comprehensive guidance from senior international education counsellors. Education Without Borders.',
    keywords: 'Career Guidance, psychometric analysis, education advisory, admissions guidance, university counseling, Talvia Consultancy',
    canonical: `${SITE_URL}/services/career-guidance`,
  },
  {
    path: 'services/college-selection',
    title: 'University Selection | TALVIA Consultancy',
    description: 'Comprehensive university comparison across global accreditation, faculty, and clinical/campus infrastructure. Dedicated guidance from senior international education counsellors. Education Without Borders.',
    keywords: 'University Selection, college selection, global university ranking, WHO NMC accredited universities, medical faculty selection',
    canonical: `${SITE_URL}/services/college-selection`,
  },
  {
    path: 'services/course-selection',
    title: 'Course Selection | TALVIA Consultancy',
    description: 'Discover curriculum details, future job market trends, and specialization options. Comprehensive guidance from senior international education counsellors. Education Without Borders.',
    keywords: 'Course Selection, degree selection, curriculum comparison, career trends, medical courses abroad',
    canonical: `${SITE_URL}/services/course-selection`,
  },
  {
    path: 'services/admission-assistance',
    title: 'Admission Assistance | TALVIA Consultancy',
    description: 'First-to-end guidance with university documentation, apostille, visa procedures, and enrollment deadlines. Comprehensive guidance from senior international education counsellors. Education Without Borders.',
    keywords: 'Admission Assistance, university documentation, apostille assistance, student visa filing, enrollment deadlines',
    canonical: `${SITE_URL}/services/admission-assistance`,
  },
  {
    path: 'services/application-support',
    title: 'Application Support | TALVIA Consultancy',
    description: 'Expert review of personal statements, entrance exams, and application accuracy. Comprehensive guidance from senior international education counsellors. Education Without Borders.',
    keywords: 'Application Support, statement of purpose, application review, university admissions paperwork, Talvia Consultancy',
    canonical: `${SITE_URL}/services/application-support`,
  },
  {
    path: 'services/student-counselling',
    title: 'Student Counselling | TALVIA Consultancy',
    description: 'Dedicated, confidential counselling for exam stress, parent alignment, and career anxiety. Comprehensive guidance from senior international education counsellors. Education Without Borders.',
    keywords: 'Student Counselling, admission stress, parent counselling, career guidance, confidential education counselling',
    canonical: `${SITE_URL}/services/student-counselling`,
  },
  // Contact & Legal
  {
    path: 'contact',
    title: 'Contact Us | TALVIA Consultancy • Global Admissions Office',
    description: 'Connect with TALVIA Consultancy’s global higher education advisors. Schedule personalized admissions counselling or message our WhatsApp desk (+91 8943442479).',
    keywords: 'TALVIA, TALVIA Consultancy, TALVIA admissions, TALVIA Students Growth, contact Talvia, admissions counselling, higher education advisor, study abroad consultation, WhatsApp admissions desk, Kochi education consultancy, Education Without Borders',
    canonical: `${SITE_URL}/contact`,
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ContactPage',
          '@id': `${SITE_URL}/contact#webpage`,
          url: `${SITE_URL}/contact`,
          name: 'Contact Us | TALVIA Consultancy • Global Admissions Office',
          description: 'Get in touch with TALVIA Consultancy for personalized admissions counselling worldwide.',
          mainEntity: {
            '@type': 'EducationalOrganization',
            '@id': `${SITE_URL}/#organization`,
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
            url: `${SITE_URL}/`,
            telephone: '+91 8943442479',
            email: 'talviaconsultancy@gmail.com',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Kochi',
              addressRegion: 'Kerala',
              postalCode: '682011',
              addressCountry: 'IN',
            },
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Contact Us', item: `${SITE_URL}/contact` },
          ],
        },
      ],
    },
  },
  {
    path: 'terms-and-conditions',
    title: 'Terms & Conditions | TALVIA Educational Consultancy',
    description: 'Read the Terms & Conditions governing educational advisory services, admissions guidance, and website usage for TALVIA Consultancy.',
    keywords: 'Talvia terms and conditions, terms of service, educational consultancy terms, admissions advisory agreement, legal terms',
    canonical: `${SITE_URL}/terms-and-conditions`,
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/terms-and-conditions#webpage`,
          url: `${SITE_URL}/terms-and-conditions`,
          name: 'Terms & Conditions | TALVIA Educational Consultancy',
          description: 'Terms and Conditions governing educational advisory services and website usage for TALVIA Consultancy.',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Terms & Conditions', item: `${SITE_URL}/terms-and-conditions` },
          ],
        },
      ],
    },
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy | TALVIA Educational Consultancy',
    description: 'Learn how TALVIA Consultancy protects your privacy and personal data. We maintain strict confidentiality for student records and admissions enquiries.',
    keywords: 'Talvia privacy policy, student data protection, admissions privacy, counselling confidentiality, privacy practices',
    canonical: `${SITE_URL}/privacy-policy`,
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/privacy-policy#webpage`,
          url: `${SITE_URL}/privacy-policy`,
          name: 'Privacy Policy | TALVIA Educational Consultancy',
          description: 'Privacy Policy and personal data protection procedures for TALVIA Consultancy visitors and applicants.',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: `${SITE_URL}/privacy-policy` },
          ],
        },
      ],
    },
  },
];

console.log(`Generating static pages for ${routes.length} canonical routes...`);

for (const route of routes) {
  let html = template;

  // 1. Replace Title strictly - exactly ONE <title> tag
  html = html.replace(/<title[^>]*>.*?<\/title>/is, `<title id="page-title">${route.title}</title>`);

  // 2. Replace Description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${route.description.replace(/"/g, '&quot;')}" />`
  );

  // 3. Replace Keywords
  html = html.replace(
    /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="keywords" content="${route.keywords.replace(/"/g, '&quot;')}" />`
  );

  // 4. Replace Canonical URL
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${route.canonical}" />`
  );

  // 5. Replace Open Graph Title, Description, and URL
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${route.title.replace(/"/g, '&quot;')}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${route.description.replace(/"/g, '&quot;')}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${route.canonical}" />`
  );

  // 6. Replace Twitter Card Title and Description
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${route.title.replace(/"/g, '&quot;')}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${route.description.replace(/"/g, '&quot;')}" />`
  );

  // 7. Inject JSON-LD Schema
  let routeStructuredData = route.structuredData;
  if (!routeStructuredData && route.path.startsWith('courses/')) {
    const courseCleanName = route.title.replace(/\s+Admissions & Details\s+\|\s+TALVIA Consultancy/i, '');
    routeStructuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Course',
          '@id': `${SITE_URL}/${route.path}#course`,
          name: courseCleanName,
          description: route.description,
          provider: {
            '@type': 'EducationalOrganization',
            '@id': `${SITE_URL}/#organization`,
            name: 'TALVIA',
            legalName: 'TALVIA Educational Consultancy',
            url: SITE_URL,
          },
          url: `${SITE_URL}/${route.path}`,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Courses & Programs', item: `${SITE_URL}/courses` },
            { '@type': 'ListItem', position: 3, name: courseCleanName, item: `${SITE_URL}/${route.path}` },
          ],
        },
      ],
    };
  } else if (!routeStructuredData && route.path.startsWith('services/')) {
    const serviceCleanName = route.title.replace(/\s+\|\s+TALVIA Consultancy/i, '');
    routeStructuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          '@id': `${SITE_URL}/${route.path}#service`,
          name: serviceCleanName,
          description: route.description,
          provider: {
            '@type': 'EducationalOrganization',
            '@id': `${SITE_URL}/#organization`,
            name: 'TALVIA',
            legalName: 'TALVIA Educational Consultancy',
            url: SITE_URL,
          },
          url: `${SITE_URL}/${route.path}`,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Our Services', item: `${SITE_URL}/services` },
            { '@type': 'ListItem', position: 3, name: serviceCleanName, item: `${SITE_URL}/${route.path}` },
          ],
        },
      ],
    };
  }

  if (routeStructuredData) {
    const schemaTag = `<script type="application/ld+json" id="talvia-schema-jsonld">${JSON.stringify(routeStructuredData)}</script>`;
    html = html.replace('</head>', `  ${schemaTag}\n</head>`);
  }

  // Determine target file location
  const outDir = route.path ? path.join(distDir, route.path) : distDir;
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'index.html');
  fs.writeFileSync(outPath, html, 'utf8');
}

// Generate 404.html (Fallback that still preserves SPA capability on GitHub Pages)
const notFoundHtml = template
  .replace(/<title[^>]*>.*?<\/title>/is, '<title id="page-title">404 - Page Not Found | TALVIA Consultancy</title>')
  .replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    '<meta name="description" content="The page you are looking for does not exist or has been relocated." />'
  )
  .replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    '<meta name="robots" content="noindex, nofollow" />'
  );

fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf8');

console.log(`Successfully generated ${routes.length} static page endpoints + 404.html in dist/!`);

