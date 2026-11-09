import api from './api';
import type {
  College, Course, Service, EnquiryFormData,
  ContactInfo, SiteSettings, PaginatedResponse,
  CollegeFilters, CourseFilters, CourseCategory, District,
} from '../types';

// ─── Colleges ────────────────────────────────────────────────────────────────
export const collegeService = {
  list: (filters: CollegeFilters = {}) => {
    const params: Record<string, string | number> = {};
    if (filters.district) params.district = filters.district;
    if (filters.course)   params.course   = filters.course;
    if (filters.search)   params.search   = filters.search;
    if (filters.ordering) params.ordering = filters.ordering;
    if (filters.page)     params.page     = filters.page;
    return api.get<PaginatedResponse<College>>('/colleges/', { params });
  },
  detail: (slug: string) =>
    api.get<College>(`/colleges/${slug}/`),
  featured: () =>
    api.get<College[]>('/colleges/featured/'),
  districts: () =>
    api.get<District[]>('/colleges/districts/'),
};

// ─── Courses ─────────────────────────────────────────────────────────────────
export const courseService = {
  list: (filters: CourseFilters = {}) => {
    const params: Record<string, string | number> = {};
    if (filters.category)    params.category    = filters.category;
    if (filters.degree_type) params.degree_type = filters.degree_type;
    if (filters.search)      params.search      = filters.search;
    if (filters.page)        params.page        = filters.page;
    return api.get<PaginatedResponse<Course>>('/courses/', { params });
  },
  detail: (slug: string) =>
    api.get<Course>(`/courses/${slug}/`),
  categories: () =>
    api.get<CourseCategory[]>('/courses/categories/'),
};

// ─── Services ────────────────────────────────────────────────────────────────
export const serviceService = {
  list: () =>
    api.get<Service[]>('/services/'),
  detail: (slug: string) =>
    api.get<Service>(`/services/${slug}/`),
};

// ─── Enquiries ───────────────────────────────────────────────────────────────
export const enquiryService = {
  submit: (data: EnquiryFormData) =>
    api.post<{ message: string; id: number }>('/enquiries/', data),
};

// ─── Contact & Site ──────────────────────────────────────────────────────────
export const coreService = {
  contact: () =>
    api.get<ContactInfo>('/contact/'),
  siteSettings: () =>
    api.get<SiteSettings>('/site-settings/'),
};

