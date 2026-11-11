from django.core.management.base import BaseCommand
from apps.core.models import ContactInformation, SiteSettings
from apps.services.models import Service
from apps.courses.models import Course
from apps.colleges.models import College, CollegeCourse


class Command(BaseCommand):
    help = 'Seed the database with demo data for TALVIA education platform'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...')
        self._seed_contact_info()
        self._seed_site_settings()
        self._seed_services()
        courses = self._seed_courses()
        colleges = self._seed_colleges()
        self._seed_college_courses(colleges, courses)
        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))

    def _seed_contact_info(self):
        ContactInformation.objects.update_or_create(
            pk=1,
            defaults={
                'company_name': 'TALVIA Consultancy',
                'phone': '+91 8943442479',
                'email': 'talviaconsultancy@gmail.com',
                'address': 'Pan-India Higher Education Consultancy | Central Support: Kochi, Kerala & Major National Hubs',
                'whatsapp_number': '+91 8943442479',
                'facebook_url': 'https://facebook.com/talvia',
                'instagram_url': 'https://instagram.com/talvia',
                'linkedin_url': 'https://linkedin.com/company/talvia',
            },
        )
        self.stdout.write('  Contact information seeded.')

    def _seed_site_settings(self):
        SiteSettings.objects.update_or_create(
            pk=1,
            defaults={
                'tagline': 'Your Education. Your Future. Our Guidance.',
                'hero_small_heading': 'YOUR FUTURE STARTS HERE',
                'hero_heading': 'Find the Right College Across India. Build Your Future.',
                'hero_description': (
                    'Discover premier educational opportunities across India with Talvia Consultancy. '
                    'We help students find the perfect college and course with first-to-end guidance from first step to final admission.'
                ),
                'about_heading': 'About Talvia Consultancy',
                'about_description': (
                    'Talvia Consultancy is a premier higher education consultancy in India, dedicated to helping students '
                    'navigate their academic journey. We provide comprehensive guidance on university selection, '
                    'course counselling, and admission assistance across 28+ states of India. '
                    'Our experienced team works closely with students and parents to ensure the best '
                    'educational outcomes.'
                ),
                'vision': (
                    'To be India\'s most trusted education consultancy, empowering every student '
                    'to make informed decisions about their academic future.'
                ),
                'mission': (
                    'To provide accessible, transparent, and personalized education guidance '
                    'to students across India, bridging the gap between aspirations and opportunities.'
                ),
                'stat_colleges': '25+',
                'stat_districts': '28+ States',
                'stat_courses': '100+',
                'stat_approach': 'Student-First',
                'footer_description': (
                    'Talvia Consultancy - Your trusted guide for college admissions '
                    'and education guidance across India.'
                ),
                'meta_title': 'Talvia Consultancy | College Admissions Across India',
                'meta_description': (
                    'Find the best colleges and courses across India with Talvia Consultancy. '
                    'Expert guidance for admissions, course selection, and career counselling.'
                ),
                'meta_keywords': (
                    'Kerala colleges, education consultancy, college admissions Kerala, '
                    'course guidance, career counselling, Talvia'
                ),
            },
        )
        self.stdout.write('  Site settings seeded.')

    def _seed_services(self):
        services_data = [
            {
                'title': 'Career Guidance',
                'slug': 'career-guidance',
                'short_description': 'Expert career counselling to help you choose the right path for your future.',
                'description': (
                    'Our Career Guidance service is designed to help students identify their strengths, '
                    'interests, and aptitudes. Through one-on-one counselling sessions, psychometric assessments, '
                    'and industry insights, we guide students toward career paths that align with their passions '
                    'and market demands. Whether you\'re a 12th-grade student or a graduate looking for direction, '
                    'our experienced counsellors are here to help.'
                ),
                'icon': 'Compass',
                'benefits': [
                    'Personalized career assessment and profiling',
                    'Industry-aligned career path recommendations',
                    'Understanding of current job market trends',
                    'Clarity on educational requirements for chosen careers',
                    'Long-term career roadmap planning',
                ],
                'process_steps': [
                    'Initial consultation to understand your interests',
                    'Aptitude and psychometric assessment',
                    'Career options presentation and discussion',
                    'Detailed career roadmap creation',
                    'Follow-up support and guidance',
                ],
                'faqs': [
                    {
                        'question': 'Who can benefit from career guidance?',
                        'answer': 'Students from 10th grade onwards, graduates, and working professionals seeking a career change can all benefit from our career guidance services.',
                    },
                    {
                        'question': 'How long does a career guidance session take?',
                        'answer': 'An initial session typically lasts 45-60 minutes, followed by assessment and a detailed follow-up session.',
                    },
                ],
                'display_order': 1,
            },
            {
                'title': 'College Selection',
                'slug': 'college-selection',
                'short_description': 'Find the perfect college that matches your academic goals and preferences.',
                'description': (
                    'Choosing the right college is one of the most important decisions in a student\'s life. '
                    'Our College Selection service provides comprehensive guidance to help you evaluate and choose '
                    'from colleges across Kerala. We consider factors like academic reputation, faculty quality, '
                    'infrastructure, placement records, location, and fees to recommend the best-fit institutions '
                    'for your academic journey.'
                ),
                'icon': 'GraduationCap',
                'benefits': [
                    'Comprehensive college comparison and analysis',
                    'Insights into college rankings and reputation',
                    'Campus infrastructure and facility evaluation',
                    'Placement record analysis',
                    'Fee structure and scholarship information',
                ],
                'process_steps': [
                    'Understanding your academic profile and preferences',
                    'Shortlisting colleges based on your criteria',
                    'Detailed comparison of shortlisted colleges',
                    'Campus visit coordination (if needed)',
                    'Final college recommendation and admission guidance',
                ],
                'faqs': [
                    {
                        'question': 'How many colleges do you recommend?',
                        'answer': 'We typically shortlist 3-5 colleges that best match your profile, preferences, and budget.',
                    },
                    {
                        'question': 'Do you cover colleges in all Kerala districts?',
                        'answer': 'Yes, we have information on colleges across all 14 districts of Kerala.',
                    },
                ],
                'display_order': 2,
            },
            {
                'title': 'Course Selection',
                'slug': 'course-selection',
                'short_description': 'Navigate the maze of courses to find the one that best fits your career goals.',
                'description': (
                    'With hundreds of courses available across various disciplines, choosing the right one can be '
                    'overwhelming. Our Course Selection service helps students understand the curriculum, career '
                    'prospects, and eligibility requirements for different courses. We match your interests, '
                    'academic background, and career aspirations to recommend courses that will set you on the '
                    'path to success.'
                ),
                'icon': 'BookOpen',
                'benefits': [
                    'In-depth analysis of course curriculum and structure',
                    'Career prospects mapping for each course',
                    'Eligibility and admission requirement clarity',
                    'Course comparison across institutions',
                    'Understanding of specialization options',
                ],
                'process_steps': [
                    'Academic profile and interest assessment',
                    'Course options exploration and shortlisting',
                    'Detailed course comparison and analysis',
                    'Career outcome mapping for selected courses',
                    'Final recommendation with admission timeline',
                ],
                'faqs': [
                    {
                        'question': 'What types of courses do you cover?',
                        'answer': 'We cover undergraduate, postgraduate, diploma, and professional courses across arts, science, commerce, management, engineering, healthcare, and more.',
                    },
                    {
                        'question': 'Can you help with course changes or transfers?',
                        'answer': 'Yes, we can guide students who wish to change their course or transfer between institutions.',
                    },
                ],
                'display_order': 3,
            },
            {
                'title': 'Admission Assistance',
                'slug': 'admission-assistance',
                'short_description': 'First-to-end guidance for a smooth and successful college admission process.',
                'description': (
                    'The admission process can be complex and stressful. Our Admission Assistance service provides '
                    'first-to-end guidance from initial consultation to final enrollment. We help with documentation, application '
                    'filling, deadline tracking, entrance exam preparation guidance, and direct coordination with '
                    'college admission offices to ensure a smooth process.'
                ),
                'icon': 'FileCheck',
                'benefits': [
                    'Complete application support and review',
                    'Document preparation and verification',
                    'Deadline tracking and reminders',
                    'Direct coordination with admission offices',
                    'Scholarship and financial aid guidance',
                ],
                'process_steps': [
                    'Document checklist preparation',
                    'Application form filling assistance',
                    'Document submission and verification',
                    'Admission status tracking',
                    'Enrollment confirmation support',
                ],
                'faqs': [
                    {
                        'question': 'What documents are typically needed for admission?',
                        'answer': 'Common requirements include mark sheets, certificates, ID proof, photographs, and category certificates. We provide a detailed checklist based on the specific college and course.',
                    },
                    {
                        'question': 'Do you guarantee admission?',
                        'answer': 'While we cannot guarantee admission, we maximize your chances by ensuring a complete, accurate application and guiding you through every step of the process.',
                    },
                ],
                'display_order': 4,
            },
            {
                'title': 'Application Support',
                'slug': 'application-support',
                'short_description': 'Professional help with college applications to maximize your acceptance chances.',
                'description': (
                    'A well-prepared application can make the difference between acceptance and rejection. '
                    'Our Application Support service ensures your application stands out. We help craft '
                    'compelling personal statements, organize documents, prepare for interviews, and present '
                    'your academic and extracurricular achievements in the best possible light.'
                ),
                'icon': 'ClipboardList',
                'benefits': [
                    'Professional application review and optimization',
                    'Personal statement and essay guidance',
                    'Interview preparation coaching',
                    'Portfolio and achievement presentation',
                    'Multiple application management',
                ],
                'process_steps': [
                    'Application strategy planning',
                    'Personal statement drafting and review',
                    'Document organization and presentation',
                    'Mock interview preparation',
                    'Submission review and final checks',
                ],
                'faqs': [
                    {
                        'question': 'How early should I start preparing my application?',
                        'answer': 'We recommend starting at least 2-3 months before the application deadline to ensure a thorough and polished submission.',
                    },
                    {
                        'question': 'Can you help with multiple college applications?',
                        'answer': 'Absolutely! We manage and customize applications for multiple colleges to maximize your options.',
                    },
                ],
                'display_order': 5,
            },
            {
                'title': 'Student Counselling',
                'slug': 'student-counselling',
                'short_description': 'Dedicated counselling sessions to address academic concerns and build confidence.',
                'description': (
                    'Our Student Counselling service is designed to support students through academic '
                    'challenges and personal growth. Whether you\'re dealing with exam stress, academic pressure, '
                    'or uncertainty about your future, our trained counsellors provide a safe space to discuss '
                    'your concerns and develop strategies for success. We believe every student deserves access '
                    'to quality guidance.'
                ),
                'icon': 'Heart',
                'benefits': [
                    'Dedicated, confidential counselling sessions',
                    'Confidential and supportive environment',
                    'Stress management and coping strategies',
                    'Academic performance improvement tips',
                    'Motivation and confidence building',
                ],
                'process_steps': [
                    'Schedule a counselling session',
                    'Initial assessment of concerns and goals',
                    'Personalized counselling and strategy development',
                    'Action plan creation',
                    'Follow-up sessions as needed',
                ],
                'faqs': [
                    {
                        'question': 'How are counselling sessions conducted?',
                        'answer': 'Our student counselling service is conducted one-on-one with trained advisors to provide personalized support.',
                    },
                    {
                        'question': 'How do I book a counselling session?',
                        'answer': 'You can book a session through our website, by calling our helpline, or by sending us a WhatsApp message.',
                    },
                ],
                'display_order': 6,
            },
        ]

        for data in services_data:
            Service.objects.get_or_create(slug=data['slug'], defaults=data)
        self.stdout.write(f'  {len(services_data)} services seeded.')

    def _seed_courses(self):
        courses_data = [
            {
                'name': 'BA English Literature',
                'slug': 'ba-english-literature',
                'category': 'arts',
                'description': (
                    'Bachelor of Arts in English Literature is a three-year undergraduate programme '
                    'that explores English language, literature, and critical thinking. Students study '
                    'British, American, and World literature, literary criticism, and develop strong '
                    'communication and analytical skills. Graduates can pursue careers in teaching, '
                    'journalism, content writing, publishing, and public relations.'
                ),
                'short_description': 'Explore literature, language, and critical thinking in this comprehensive arts programme.',
                'eligibility': 'Plus Two (10+2) or equivalent with minimum 45% marks in any stream.',
                'duration': '3 Years',
                'degree_type': 'bachelors',
            },
            {
                'name': 'BCom (Bachelor of Commerce)',
                'slug': 'bcom-bachelor-of-commerce',
                'category': 'commerce',
                'description': (
                    'Bachelor of Commerce is a three-year undergraduate programme covering accounting, '
                    'finance, economics, business law, and taxation. The programme provides a strong '
                    'foundation in business and commerce, preparing students for careers in accounting, '
                    'banking, finance, auditing, and entrepreneurship. Students can further pursue CA, '
                    'CS, CMA, or MBA after completion.'
                ),
                'short_description': 'Build a strong foundation in commerce, accounting, and business management.',
                'eligibility': 'Plus Two (10+2) or equivalent with Commerce or any stream with minimum 45% marks.',
                'duration': '3 Years',
                'degree_type': 'bachelors',
            },
            {
                'name': 'BSc Physics',
                'slug': 'bsc-physics',
                'category': 'science',
                'description': (
                    'Bachelor of Science in Physics is a three-year undergraduate programme that provides '
                    'in-depth knowledge of classical mechanics, quantum mechanics, thermodynamics, '
                    'electrodynamics, and modern physics. The programme develops strong analytical and '
                    'problem-solving skills. Graduates can pursue careers in research, education, '
                    'technology, and various industries.'
                ),
                'short_description': 'Study the fundamental laws of nature from classical to quantum physics.',
                'eligibility': 'Plus Two (10+2) with Physics and Mathematics with minimum 50% marks.',
                'duration': '3 Years',
                'degree_type': 'bachelors',
            },
            {
                'name': 'BBA (Bachelor of Business Administration)',
                'slug': 'bba-bachelor-of-business-administration',
                'category': 'management',
                'description': (
                    'Bachelor of Business Administration is a three-year undergraduate programme focusing '
                    'on management principles, business strategy, marketing, finance, and organizational '
                    'behavior. The programme prepares students for entry-level management positions and '
                    'provides a strong foundation for pursuing MBA. Industry exposure through internships '
                    'and case studies is a key feature.'
                ),
                'short_description': 'Develop management and leadership skills for the modern business world.',
                'eligibility': 'Plus Two (10+2) or equivalent in any stream with minimum 45% marks.',
                'duration': '3 Years',
                'degree_type': 'bachelors',
            },
            {
                'name': 'BCA (Bachelor of Computer Applications)',
                'slug': 'bca-bachelor-of-computer-applications',
                'category': 'computer_applications',
                'description': (
                    'Bachelor of Computer Applications is a three-year undergraduate programme covering '
                    'computer science fundamentals, programming languages, database management, web '
                    'development, and software engineering. The programme prepares students for careers '
                    'in IT, software development, and related fields. Students learn languages like '
                    'Java, Python, C++, and work with modern development tools.'
                ),
                'short_description': 'Master computer science and application development for a career in IT.',
                'eligibility': 'Plus Two (10+2) with Mathematics or Computer Science with minimum 45% marks.',
                'duration': '3 Years',
                'degree_type': 'bachelors',
            },
            {
                'name': 'BTech Computer Science & Engineering',
                'slug': 'btech-computer-science-engineering',
                'category': 'engineering',
                'description': (
                    'Bachelor of Technology in Computer Science and Engineering is a four-year undergraduate '
                    'programme providing comprehensive knowledge of computing, algorithms, data structures, '
                    'artificial intelligence, machine learning, and software systems. The programme includes '
                    'laboratory work, projects, and industrial training. Graduates are highly sought after '
                    'in the tech industry.'
                ),
                'short_description': 'Comprehensive engineering programme in computing and software systems.',
                'eligibility': 'Plus Two (10+2) with Physics, Chemistry, and Mathematics with minimum 50% marks. Entrance exam may be required.',
                'duration': '4 Years',
                'degree_type': 'bachelors',
            },
            {
                'name': 'BSc Nursing',
                'slug': 'bsc-nursing',
                'category': 'healthcare',
                'description': (
                    'Bachelor of Science in Nursing is a four-year undergraduate programme that prepares '
                    'students for a career in nursing and healthcare. The programme covers anatomy, '
                    'physiology, pharmacology, community health, medical-surgical nursing, and clinical '
                    'practice. Graduates can work in hospitals, clinics, community health centers, and '
                    'pursue further specialization.'
                ),
                'short_description': 'Prepare for a rewarding career in nursing and healthcare services.',
                'eligibility': 'Plus Two (10+2) with Physics, Chemistry, and Biology with minimum 45% marks.',
                'duration': '4 Years',
                'degree_type': 'bachelors',
            },
            {
                'name': 'BEd (Bachelor of Education)',
                'slug': 'bed-bachelor-of-education',
                'category': 'education',
                'description': (
                    'Bachelor of Education is a two-year professional degree programme that prepares '
                    'graduates for a teaching career. The programme covers educational psychology, '
                    'pedagogy, classroom management, curriculum design, and teaching methodology. '
                    'Students also complete practice teaching in schools. A BEd degree is mandatory '
                    'for teaching in schools across India.'
                ),
                'short_description': 'Professional teaching qualification for aspiring educators.',
                'eligibility': "Bachelor's degree in any discipline with minimum 50% marks.",
                'duration': '2 Years',
                'degree_type': 'bachelors',
            },
            {
                'name': 'LLB (Bachelor of Laws)',
                'slug': 'llb-bachelor-of-laws',
                'category': 'law',
                'description': (
                    'Bachelor of Laws is a three-year undergraduate law programme that covers constitutional '
                    'law, criminal law, civil law, corporate law, environmental law, and legal procedures. '
                    'The programme prepares students for careers as advocates, legal advisors, corporate '
                    'lawyers, and judicial officers. Moot court sessions and internships provide practical '
                    'exposure.'
                ),
                'short_description': 'Comprehensive legal education for a career in law and justice.',
                'eligibility': "Bachelor's degree in any discipline with minimum 45% marks. Entrance exam required.",
                'duration': '3 Years',
                'degree_type': 'professional',
            },
            {
                'name': 'MA English',
                'slug': 'ma-english',
                'category': 'arts',
                'description': (
                    'Master of Arts in English is a two-year postgraduate programme for advanced study '
                    'of English literature, linguistics, literary theory, and cultural studies. The '
                    'programme develops research skills and prepares students for careers in academia, '
                    'research, publishing, and creative writing. Graduates can pursue MPhil, PhD, or '
                    'UGC NET for teaching positions.'
                ),
                'short_description': 'Advanced study of English literature, linguistics, and literary theory.',
                'eligibility': 'BA English or equivalent with minimum 50% marks.',
                'duration': '2 Years',
                'degree_type': 'masters',
            },
        ]

        courses = {}
        for data in courses_data:
            course, _ = Course.objects.get_or_create(slug=data['slug'], defaults=data)
            courses[data['slug']] = course
        self.stdout.write(f'  {len(courses_data)} courses seeded.')
        return courses

    def _seed_colleges(self):
        colleges_data = [
            {
                'name': 'Demo College - Ernakulam',
                'slug': 'demo-college-ernakulam',
                'description': (
                    'Demo College - Ernakulam is a premier educational institution located in the heart '
                    'of Kochi. Established with a vision to provide quality education, the college offers '
                    'a wide range of undergraduate and postgraduate programmes. With state-of-the-art '
                    'facilities, experienced faculty, and a vibrant campus life, it has become one of the '
                    'top choices for students in Ernakulam district. (DEMO DATA)'
                ),
                'short_description': 'A leading educational institution in Ernakulam with excellent academic programmes. (Demo Data)',
                'district': 'ernakulam',
                'city': 'Kochi',
                'address': 'MG Road, Kochi, Ernakulam, Kerala - 682011',
                'website': 'https://example.com',
                'email': 'demo-ernakulam@example.com',
                'phone': '+91 9876543201',
                'affiliated_university': 'Mahatma Gandhi University',
                'accreditation': 'NAAC A Grade',
                'established_year': 1985,
                'is_featured': True,
            },
            {
                'name': 'Demo College - Thrissur',
                'slug': 'demo-college-thrissur',
                'description': (
                    'Demo College - Thrissur is a renowned institution in the cultural capital of Kerala. '
                    'Known for its academic excellence and cultural activities, the college provides '
                    'comprehensive education across multiple disciplines. The college boasts modern '
                    'infrastructure, a well-stocked library, and excellent sports facilities. (DEMO DATA)'
                ),
                'short_description': 'Renowned institution in Kerala\'s cultural capital with diverse programmes. (Demo Data)',
                'district': 'thrissur',
                'city': 'Thrissur',
                'address': 'Round North, Thrissur, Kerala - 680001',
                'website': 'https://example.com',
                'email': 'demo-thrissur@example.com',
                'phone': '+91 9876543202',
                'affiliated_university': 'University of Calicut',
                'accreditation': 'NAAC B++ Grade',
                'established_year': 1972,
                'is_featured': True,
            },
            {
                'name': 'Demo College - Thiruvananthapuram',
                'slug': 'demo-college-thiruvananthapuram',
                'description': (
                    'Demo College - Thiruvananthapuram is a prestigious institution in Kerala\'s capital city. '
                    'With decades of academic tradition, the college is known for producing distinguished '
                    'alumni in various fields. The campus features modern classrooms, research labs, and a '
                    'peaceful environment conducive to learning. (DEMO DATA)'
                ),
                'short_description': 'Prestigious institution in Kerala\'s capital city with strong academic heritage. (Demo Data)',
                'district': 'thiruvananthapuram',
                'city': 'Thiruvananthapuram',
                'address': 'Palayam, Thiruvananthapuram, Kerala - 695001',
                'website': 'https://example.com',
                'email': 'demo-tvm@example.com',
                'phone': '+91 9876543203',
                'affiliated_university': 'University of Kerala',
                'accreditation': 'NAAC A Grade',
                'established_year': 1960,
                'is_featured': True,
            },
            {
                'name': 'Demo College - Kozhikode',
                'slug': 'demo-college-kozhikode',
                'description': (
                    'Demo College - Kozhikode is a leading educational institution in Malabar. '
                    'The college is committed to academic excellence and holistic development of students. '
                    'It offers a wide range of courses across arts, science, and commerce streams with '
                    'focus on employability and research. (DEMO DATA)'
                ),
                'short_description': 'Leading institution in Malabar with focus on holistic education. (Demo Data)',
                'district': 'kozhikode',
                'city': 'Kozhikode',
                'address': 'Beach Road, Kozhikode, Kerala - 673001',
                'website': 'https://example.com',
                'email': 'demo-kozhikode@example.com',
                'phone': '+91 9876543204',
                'affiliated_university': 'University of Calicut',
                'accreditation': 'NAAC B+ Grade',
                'established_year': 1968,
                'is_featured': True,
            },
            {
                'name': 'Demo College - Kottayam',
                'slug': 'demo-college-kottayam',
                'description': (
                    'Demo College - Kottayam is a well-established institution in central Kerala known for '
                    'its academic rigor and discipline. The college has a strong tradition of producing '
                    'professionals in commerce, management, and liberal arts. Modern facilities and '
                    'dedicated faculty make it a preferred choice. (DEMO DATA)'
                ),
                'short_description': 'Well-established institution in central Kerala known for academic rigor. (Demo Data)',
                'district': 'kottayam',
                'city': 'Kottayam',
                'address': 'KK Road, Kottayam, Kerala - 686001',
                'website': 'https://example.com',
                'email': 'demo-kottayam@example.com',
                'phone': '+91 9876543205',
                'affiliated_university': 'Mahatma Gandhi University',
                'accreditation': 'NAAC B Grade',
                'established_year': 1975,
                'is_featured': False,
            },
            {
                'name': 'Demo College - Kannur',
                'slug': 'demo-college-kannur',
                'description': (
                    'Demo College - Kannur is a prominent educational institution in northern Kerala. '
                    'The college focuses on providing quality education with emphasis on research and '
                    'innovation. With modern labs, a digital library, and experienced faculty, the '
                    'college offers an enriching academic experience. (DEMO DATA)'
                ),
                'short_description': 'Prominent institution in northern Kerala with emphasis on innovation. (Demo Data)',
                'district': 'kannur',
                'city': 'Kannur',
                'address': 'City Centre, Kannur, Kerala - 670001',
                'website': 'https://example.com',
                'email': 'demo-kannur@example.com',
                'phone': '+91 9876543206',
                'affiliated_university': 'Kannur University',
                'accreditation': 'NAAC B Grade',
                'established_year': 1990,
                'is_featured': False,
            },
            {
                'name': 'Demo College - Malappuram',
                'slug': 'demo-college-malappuram',
                'description': (
                    'Demo College - Malappuram is dedicated to empowering students through education. '
                    'Located in a rapidly developing area, the college offers courses in arts, science, '
                    'and professional streams. The institution is known for its inclusive approach and '
                    'community engagement. (DEMO DATA)'
                ),
                'short_description': 'Empowering students through inclusive and quality education. (Demo Data)',
                'district': 'malappuram',
                'city': 'Malappuram',
                'address': 'Town Centre, Malappuram, Kerala - 676505',
                'website': 'https://example.com',
                'email': 'demo-malappuram@example.com',
                'phone': '+91 9876543207',
                'affiliated_university': 'University of Calicut',
                'accreditation': 'NAAC B Grade',
                'established_year': 1995,
                'is_featured': False,
            },
            {
                'name': 'Demo College - Kollam',
                'slug': 'demo-college-kollam',
                'description': (
                    'Demo College - Kollam is a growing educational institution in southern Kerala. '
                    'The college provides quality education with a focus on practical learning and '
                    'industry connections. With a beautiful campus and supportive learning environment, '
                    'students thrive academically and personally. (DEMO DATA)'
                ),
                'short_description': 'Growing institution in southern Kerala with focus on practical learning. (Demo Data)',
                'district': 'kollam',
                'city': 'Kollam',
                'address': 'Main Road, Kollam, Kerala - 691001',
                'website': 'https://example.com',
                'email': 'demo-kollam@example.com',
                'phone': '+91 9876543208',
                'affiliated_university': 'University of Kerala',
                'accreditation': 'NAAC B Grade',
                'established_year': 2000,
                'is_featured': False,
            },
        ]

        colleges = {}
        for data in colleges_data:
            college, _ = College.objects.get_or_create(slug=data['slug'], defaults=data)
            colleges[data['slug']] = college
        self.stdout.write(f'  {len(colleges_data)} colleges seeded.')
        return colleges

    def _seed_college_courses(self, colleges, courses):
        associations = [
            # Ernakulam: broad offering
            ('demo-college-ernakulam', 'ba-english-literature', 15000, 'per year'),
            ('demo-college-ernakulam', 'bcom-bachelor-of-commerce', 12000, 'per year'),
            ('demo-college-ernakulam', 'bsc-physics', 18000, 'per year'),
            ('demo-college-ernakulam', 'bba-bachelor-of-business-administration', 35000, 'per year'),
            ('demo-college-ernakulam', 'bca-bachelor-of-computer-applications', 30000, 'per year'),
            ('demo-college-ernakulam', 'ma-english', 20000, 'per year'),
            # Thrissur
            ('demo-college-thrissur', 'ba-english-literature', 12000, 'per year'),
            ('demo-college-thrissur', 'bcom-bachelor-of-commerce', 10000, 'per year'),
            ('demo-college-thrissur', 'bba-bachelor-of-business-administration', 30000, 'per year'),
            ('demo-college-thrissur', 'bed-bachelor-of-education', 25000, 'per year'),
            # Thiruvananthapuram
            ('demo-college-thiruvananthapuram', 'bsc-physics', 15000, 'per year'),
            ('demo-college-thiruvananthapuram', 'btech-computer-science-engineering', 60000, 'per year'),
            ('demo-college-thiruvananthapuram', 'llb-bachelor-of-laws', 45000, 'per year'),
            ('demo-college-thiruvananthapuram', 'ma-english', 18000, 'per year'),
            # Kozhikode
            ('demo-college-kozhikode', 'ba-english-literature', 10000, 'per year'),
            ('demo-college-kozhikode', 'bcom-bachelor-of-commerce', 9000, 'per year'),
            ('demo-college-kozhikode', 'bca-bachelor-of-computer-applications', 25000, 'per year'),
            ('demo-college-kozhikode', 'bsc-nursing', 55000, 'per year'),
            # Kottayam
            ('demo-college-kottayam', 'bcom-bachelor-of-commerce', 11000, 'per year'),
            ('demo-college-kottayam', 'bba-bachelor-of-business-administration', 32000, 'per year'),
            ('demo-college-kottayam', 'bca-bachelor-of-computer-applications', 28000, 'per year'),
            # Kannur
            ('demo-college-kannur', 'ba-english-literature', 8000, 'per year'),
            ('demo-college-kannur', 'bsc-physics', 12000, 'per year'),
            ('demo-college-kannur', 'bed-bachelor-of-education', 22000, 'per year'),
            # Malappuram
            ('demo-college-malappuram', 'bcom-bachelor-of-commerce', 8000, 'per year'),
            ('demo-college-malappuram', 'bba-bachelor-of-business-administration', 28000, 'per year'),
            ('demo-college-malappuram', 'bsc-nursing', 50000, 'per year'),
            # Kollam
            ('demo-college-kollam', 'ba-english-literature', 9000, 'per year'),
            ('demo-college-kollam', 'bcom-bachelor-of-commerce', 8500, 'per year'),
            ('demo-college-kollam', 'bsc-physics', 11000, 'per year'),
        ]

        count = 0
        for college_slug, course_slug, fee, period in associations:
            college = colleges.get(college_slug)
            course = courses.get(course_slug)
            if college and course:
                CollegeCourse.objects.get_or_create(
                    college=college,
                    course=course,
                    defaults={
                        'fee_amount': fee,
                        'fee_period': period,
                        'admission_open': True,
                    },
                )
                count += 1
        self.stdout.write(f'  {count} college-course associations seeded.')
