// Core API types for TALVIA platform

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface College {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  banner_image: string | null;
  description: string;
  short_description: string;
  district: string;
  district_display: string;
  city: string;
  address: string;
  website: string;
  email: string;
  phone: string;
  affiliated_university: string;
  accreditation: string;
  established_year: number | null;
  is_featured: boolean;
  course_count?: number;
  course_names?: string[];
  college_courses?: CollegeCourse[];
  gallery_images?: GalleryImage[];
  created_at: string;
}

export interface CollegeCourse {
  id: number;
  course_name: string;
  course_slug: string;
  course_category: string;
  course_duration: string;
  course_degree_type: string;
  fee_amount: string | null;
  fee_period: string;
  eligibility_details: string;
  admission_open: boolean;
}

export interface GalleryImage {
  id: number;
  image: string;
  caption: string;
  display_order: number;
}

export interface Course {
  id: number;
  name: string;
  slug: string;
  category: string;
  category_display: string;
  description: string;
  short_description: string;
  eligibility: string;
  duration: string;
  degree_type: string;
  degree_type_display: string;
  college_count?: number;
  available_colleges?: College[];
}

export interface CourseCategory {
  code: string;
  name: string;
  count: number;
}

export interface District {
  code: string;
  name: string;
  count: number;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  icon: string;
  image: string | null;
  benefits: string[];
  process_steps: string[];
  faqs: { question: string; answer: string }[];
  display_order: number;
}

export interface EnquiryFormData {
  student_name: string;
  phone: string;
  email: string;
  district: string;
  interested_course: string;
  preferred_college: string;
  message: string;
  enquiry_type: string;
  source_page: string;
}

export interface ContactInfo {
  company_name: string;
  phone: string;
  email: string;
  address: string;
  whatsapp_number: string;
  facebook_url: string;
  instagram_url: string;
  twitter_url: string;
  linkedin_url: string;
  youtube_url: string;
  google_maps_embed: string;
}

export interface SiteSettings {
  id: number;
  logo: string | null;
  tagline: string;
  hero_small_heading: string;
  hero_heading: string;
  hero_description: string;
  hero_image: string | null;
  about_heading: string;
  about_description: string;
  about_image: string | null;
  vision: string;
  mission: string;
  stat_colleges: string;
  stat_districts: string;
  stat_courses: string;
  stat_approach: string;
  footer_description: string;
  meta_title: string;
  meta_description: string;
}

export interface CollegeFilters {
  district?: string;
  course?: string;
  search?: string;
  page?: number;
  ordering?: string;
}

export interface CourseFilters {
  category?: string;
  degree_type?: string;
  search?: string;
  page?: number;
}

