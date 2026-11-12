import type {
  College, Course, Service, EnquiryFormData,
  ContactInfo, SiteSettings, PaginatedResponse,
  CollegeFilters, CourseFilters, CourseCategory, District,
} from '../types';
import {
  DEMO_COLLEGES,
  DEMO_COURSES,
  DEMO_SERVICES,
  DEMO_DISTRICTS,
  DEMO_CATEGORIES,
} from './demoData';

export const WHATSAPP_PHONE = '918943442479';

export function createWhatsAppEnquiryUrl(data: EnquiryFormData): string {
  const lines = [
    '🎓 *New Admissions Enquiry — TALVIA Consultancy*',
    '',
    `👤 *Student Name:* ${data.student_name}`,
    `📞 *Phone Number:* ${data.phone}`,
    data.email ? `✉️ *Email:* ${data.email}` : null,
    data.district ? `📍 *State / Region:* ${data.district}` : null,
    data.interested_course ? `📚 *Interested Course:* ${data.interested_course}` : null,
    data.preferred_college ? `🏛️ *Preferred College:* ${data.preferred_college}` : null,
    data.message ? `💬 *Query / Message:* ${data.message}` : null,
  ].filter(Boolean);

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(lines.join('\n'))}`;
}

// ─── Colleges (100% Static Showcase Data) ──────────────────────────────────
export const collegeService = {
  list: async (filters: CollegeFilters = {}): Promise<{ data: PaginatedResponse<College> }> => {
    let list = [...DEMO_COLLEGES];
    if (filters.district) {
      list = list.filter(c => c.district.toLowerCase() === filters.district?.toLowerCase());
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        (c.city && c.city.toLowerCase().includes(q)) ||
        (c.affiliated_university && c.affiliated_university.toLowerCase().includes(q))
      );
    }
    return {
      data: {
        count: list.length,
        next: null,
        previous: null,
        results: list,
      },
    };
  },

  detail: async (slug: string): Promise<{ data: College }> => {
    const found = DEMO_COLLEGES.find(c => c.slug === slug) || DEMO_COLLEGES[0];
    return { data: found };
  },

  featured: async (): Promise<{ data: College[] }> => {
    return { data: DEMO_COLLEGES.filter(c => c.is_featured) };
  },

  districts: async (): Promise<{ data: District[] }> => {
    return { data: DEMO_DISTRICTS };
  },
};

// ─── Courses (100% Static Showcase Data) ───────────────────────────────────
export const courseService = {
  list: async (filters: CourseFilters = {}): Promise<{ data: PaginatedResponse<Course> }> => {
    let list = [...DEMO_COURSES];
    if (filters.category) {
      list = list.filter(c => c.category === filters.category);
    }
    if (filters.degree_type) {
      list = list.filter(c => c.degree_type === filters.degree_type);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    }
    return {
      data: {
        count: list.length,
        next: null,
        previous: null,
        results: list,
      },
    };
  },

  detail: async (slug: string): Promise<{ data: Course }> => {
    const found = DEMO_COURSES.find(c => c.slug === slug) || DEMO_COURSES[0];
    return { data: found };
  },

  categories: async (): Promise<{ data: CourseCategory[] }> => {
    return { data: DEMO_CATEGORIES };
  },
};

// ─── Services (100% Static Showcase Data) ──────────────────────────────────
export const serviceService = {
  list: async (): Promise<{ data: Service[] }> => {
    return { data: DEMO_SERVICES };
  },
  detail: async (slug: string): Promise<{ data: Service }> => {
    const found = DEMO_SERVICES.find(s => s.slug === slug) || DEMO_SERVICES[0];
    return { data: found };
  },
};

// ─── Enquiries (Direct WhatsApp Routing) ───────────────────────────────────
export const enquiryService = {
  submit: async (data: EnquiryFormData): Promise<{ data: { message: string; id: number; whatsappUrl: string } }> => {
    const whatsappUrl = createWhatsAppEnquiryUrl(data);
    return {
      data: {
        message: 'Enquiry prepared for WhatsApp.',
        id: Date.now(),
        whatsappUrl,
      },
    };
  },
};

// ─── Contact & Site Info (100% Static) ─────────────────────────────────────
export const coreService = {
  contact: async (): Promise<{ data: ContactInfo }> => {
    return {
      data: {
        company_name: 'TALVIA Consultancy',
        phone: '+91 8943442479',
        email: 'talviaconsultancy@gmail.com',
        address: 'Pan-India Higher Education Consultancy | Central Support: Kochi, Kerala & Major National Hubs',
        whatsapp_number: '+91 8943442479',
        facebook_url: '#',
        instagram_url: '#',
        twitter_url: '#',
        linkedin_url: '#',
        youtube_url: '#',
        google_maps_embed: '',
      },
    };
  },
  siteSettings: async (): Promise<{ data: SiteSettings }> => {
    return {
      data: {
        id: 1,
        logo: null,
        tagline: 'Your Education. Your Future. Our Guidance.',
        hero_small_heading: 'YOUR FUTURE STARTS HERE',
        hero_heading: 'Find the Right College. Build the Right Future.',
        hero_description: 'Discover premier educational opportunities across India with Talvia Consultancy. We provide personalized first-to-end guidance from initial enquiry to final admission.',
        hero_image: null,
        about_heading: 'About Talvia Consultancy',
        about_description: 'Talvia Consultancy is a leading higher education consultancy in India, connecting students with top colleges and universities nationwide...',
        about_image: null,
        vision: 'Empowering students across India to access top-tier higher education.',
        mission: 'Delivering transparent, student-first admissions guidance from first step to final admission.',
        stat_colleges: '25+',
        stat_districts: '28+ States',
        stat_courses: '100+',
        stat_approach: 'Student-First',
        footer_description: 'Your premier education consultancy across India.',
        meta_title: 'Talvia Consultancy | Premium Higher Education Admissions Across India',
        meta_description: 'Connect with premier colleges and universities across India with Talvia Consultancy.',
      },
    };
  },
};
