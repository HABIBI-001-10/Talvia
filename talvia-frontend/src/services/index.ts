import api from './api';
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

// ─── Colleges ────────────────────────────────────────────────────────────────
export const collegeService = {
  list: async (filters: CollegeFilters = {}) => {
    try {
      const params: Record<string, string | number> = {};
      if (filters.district) params.district = filters.district;
      if (filters.course)   params.course   = filters.course;
      if (filters.search)   params.search   = filters.search;
      if (filters.ordering) params.ordering = filters.ordering;
      if (filters.page)     params.page     = filters.page;
      return await api.get<PaginatedResponse<College>>('/colleges/', { params });
    } catch {
      // Fallback for static client showcase preview (GitHub Pages)
      let list = [...DEMO_COLLEGES];
      if (filters.district) {
        list = list.filter(c => c.district.toLowerCase() === filters.district?.toLowerCase());
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        list = list.filter(c => c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q));
      }
      return {
        data: {
          count: list.length,
          next: null,
          previous: null,
          results: list,
        }
      };
    }
  },

  detail: async (slug: string) => {
    try {
      return await api.get<College>(`/colleges/${slug}/`);
    } catch {
      const found = DEMO_COLLEGES.find(c => c.slug === slug) || DEMO_COLLEGES[0];
      return { data: found };
    }
  },

  featured: async () => {
    try {
      return await api.get<College[]>('/colleges/featured/');
    } catch {
      return { data: DEMO_COLLEGES.filter(c => c.is_featured) };
    }
  },

  districts: async () => {
    try {
      return await api.get<District[]>('/colleges/districts/');
    } catch {
      return { data: DEMO_DISTRICTS };
    }
  },
};

// ─── Courses ─────────────────────────────────────────────────────────────────
export const courseService = {
  list: async (filters: CourseFilters = {}) => {
    try {
      const params: Record<string, string | number> = {};
      if (filters.category)    params.category    = filters.category;
      if (filters.degree_type) params.degree_type = filters.degree_type;
      if (filters.search)      params.search      = filters.search;
      if (filters.page)        params.page        = filters.page;
      return await api.get<PaginatedResponse<Course>>('/courses/', { params });
    } catch {
      let list = [...DEMO_COURSES];
      if (filters.category) {
        list = list.filter(c => c.category === filters.category);
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        list = list.filter(c => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
      }
      return {
        data: {
          count: list.length,
          next: null,
          previous: null,
          results: list,
        }
      };
    }
  },

  detail: async (slug: string) => {
    try {
      return await api.get<Course>(`/courses/${slug}/`);
    } catch {
      const found = DEMO_COURSES.find(c => c.slug === slug) || DEMO_COURSES[0];
      return { data: found };
    }
  },

  categories: async () => {
    try {
      return await api.get<CourseCategory[]>('/courses/categories/');
    } catch {
      return { data: DEMO_CATEGORIES };
    }
  },
};

// ─── Services ────────────────────────────────────────────────────────────────
export const serviceService = {
  list: async () => {
    try {
      return await api.get<Service[]>('/services/');
    } catch {
      return { data: DEMO_SERVICES };
    }
  },
  detail: async (slug: string) => {
    try {
      return await api.get<Service>(`/services/${slug}/`);
    } catch {
      const found = DEMO_SERVICES.find(s => s.slug === slug) || DEMO_SERVICES[0];
      return { data: found };
    }
  },
};

// ─── Enquiries ───────────────────────────────────────────────────────────────
export const enquiryService = {
  submit: async (data: EnquiryFormData) => {
    try {
      return await api.post<{ message: string; id: number }>('/enquiries/', data);
    } catch {
      // Return simulated success on standalone static preview
      return { data: { message: 'Thank you for your enquiry! Our team will contact you shortly.', id: Date.now() } };
    }
  },
};

// ─── Contact & Site ──────────────────────────────────────────────────────────
export const coreService = {
  contact: async () => {
    try {
      return await api.get<ContactInfo>('/contact/');
    } catch {
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
        }
      };
    }
  },
  siteSettings: async () => {
    try {
      return await api.get<SiteSettings>('/site-settings/');
    } catch {
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
        }
      };
    }
  },
};
