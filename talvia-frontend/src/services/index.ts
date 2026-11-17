import type {
  Course, Service, EnquiryFormData,
  ContactInfo, SiteSettings, PaginatedResponse,
  CourseFilters, CourseCategory,
} from '../types';
import {
  DEMO_COURSES,
  DEMO_SERVICES,
  DEMO_CATEGORIES,
} from './demoData';

export {
  DEMO_COURSES,
  DEMO_SERVICES,
  DEMO_CATEGORIES,
};

export const WHATSAPP_PHONE = '918943442479';
export const DEFAULT_INQUIRY_MESSAGE = "Hello Talvia Team! I'm interested in university admissions and would like to know more about your services.";

export const COUNTRY_STATES_MAP: Record<string, string[]> = {
  'India': [
    'Kerala',
    'Karnataka',
    'Tamil Nadu',
    'Maharashtra',
    'Delhi NCR',
    'Telangana',
    'Andhra Pradesh',
    'Gujarat',
    'West Bengal',
    'Uttar Pradesh',
    'Punjab',
    'Rajasthan',
    'Madhya Pradesh',
    'Goa',
    'Odisha',
    'Bihar',
    'Haryana',
    'Himachal Pradesh',
    'Assam & North East',
    'Other Indian States / UTs',
  ],
  'Russia': [
    'Moscow Federal Region',
    'Saint Petersburg',
    'Kazan (Tatarstan)',
    'Bashkortostan (Ufa)',
    'Kursk Oblast',
    'Orenburg Oblast',
    'Rostov Oblast',
    'Volgograd Oblast',
    'Smolensk Oblast',
    'Crimea (Simferopol)',
    'Other Russian Regions',
  ],
  'Georgia': [
    'Tbilisi (Capital Region)',
    'Adjara (Batumi)',
    'Imereti (Kutaisi)',
    'Kakheti',
    'Other Georgian Regions',
  ],
  'Uzbekistan': [
    'Tashkent City',
    'Samarkand Region',
    'Bukhara Region',
    'Andijan Region',
    'Fergana Region',
    'Other Uzbek Regions',
  ],
  'Philippines': [
    'Metro Manila (NCR)',
    'Central Visayas (Cebu)',
    'Davao Region',
    'Calabarzon',
    'Other Philippine Regions',
  ],
  'Kazakhstan': [
    'Almaty',
    'Astana',
    'Shymkent',
    'Karaganda',
    'Other Kazakh Regions',
  ],
  'United Kingdom (UK)': [
    'England — London',
    'England — West Midlands (Birmingham)',
    'England — Greater Manchester',
    'England — Yorkshire & Humber',
    'Scotland (Edinburgh/Glasgow)',
    'Wales (Cardiff)',
    'Northern Ireland (Belfast)',
  ],
  'Other Countries': [
    'Capital / Central Region',
    'Northern Province',
    'Southern Province',
    'Eastern Province',
    'Western Province',
    'Other Province / Territory',
  ],
};

export const POPULAR_COUNTRIES = Object.keys(COUNTRY_STATES_MAP);

export function getStatesForCountry(country: string): string[] {
  return COUNTRY_STATES_MAP[country] || COUNTRY_STATES_MAP['India'];
}

export const POPULAR_STATES = COUNTRY_STATES_MAP['India'];

export function createWhatsAppEnquiryUrl(data: EnquiryFormData): string {
  const queryMessage = data.message?.trim() || DEFAULT_INQUIRY_MESSAGE;
  const lines = [
    '🎓 *New Admissions Enquiry — TALVIA Consultancy*',
    '',
    `👤 *Student Name:* ${data.student_name}`,
    `📞 *Phone Number:* ${data.phone}`,
    data.email ? `✉️ *Email:* ${data.email}` : null,
    data.interested_course ? `📚 *Interested Course:* ${data.interested_course}` : null,
    data.preferred_country ? `🌍 *Preferred Country:* ${data.preferred_country}` : null,
    (data.preferred_state || data.district) ? `📍 *Preferred State:* ${data.preferred_state || data.district}` : null,
    data.preferred_city ? `🏙️ *Preferred City:* ${data.preferred_city}` : null,
    `💬 *Query / Message:* ${queryMessage}`,
  ].filter(Boolean);

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(lines.join('\n'))}`;
}

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
        address: 'Global Higher Education Consultancy • Education Without Borders | Central Support: Kochi, Kerala',
        whatsapp_number: '+91 8943442479',
        facebook_url: 'https://www.facebook.com/talviaconsultancy',
        instagram_url: 'https://www.instagram.com/talviaconsultancy',
        twitter_url: '#',
        linkedin_url: 'https://www.linkedin.com/company/talviaconsultancy',
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
        tagline: 'Education Without Borders • Global Admissions Advisory',
        hero_small_heading: 'EDUCATION WITHOUT BORDERS',
        hero_heading: 'Find the Right University Worldwide.',
        hero_description: 'Discover premier global educational opportunities with Talvia Consultancy. We provide personalized first-to-end guidance from international course selection to visa support and final campus enrollment.',
        hero_image: null,
        about_heading: 'About Talvia Consultancy',
        about_description: 'Talvia Consultancy is a leading global higher education consultancy, connecting students with top-ranked universities and prestigious institutions worldwide under our vision of Education Without Borders...',
        about_image: null,
        vision: 'To be a globally trusted education consultancy, recognized for ethical guidance and empowering students to access premier higher education without borders.',
        mission: 'Delivering transparent, student-first admissions guidance worldwide from first consultation to campus enrollment.',
        stat_colleges: '150+ Universities',
        stat_districts: '25+ Countries',
        stat_courses: '100+',
        stat_approach: 'Student-First',
        footer_description: 'Premier global education consultancy connecting aspiring students with top-ranked universities worldwide. Education Without Borders.',
        meta_title: 'Talvia Consultancy | Global Higher Education Admissions • Education Without Borders',
        meta_description: 'Connect with top-ranked universities worldwide with Talvia Consultancy. Comprehensive first-to-end global admissions guidance.',
      },
    };
  },
};
