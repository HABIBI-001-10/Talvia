# TALVIA — Education Services Platform

> **Your Education. Your Future. Our Guidance.**

A full-stack education services platform connecting students with 25+ partner colleges across Kerala. Built with **React + TypeScript + Vite** frontend and **Django + DRF** backend.

---

## 🏗️ Tech Stack

| Layer     | Technology |
|-----------|-----------|
| Frontend  | React 19, TypeScript, Vite, Tailwind CSS 4, React Router, Lucide React, Axios |
| Backend   | Python 3, Django 4.2, Django REST Framework, django-filter, django-cors-headers |
| Database  | SQLite (dev), PostgreSQL (production) |
| Auth      | Django built-in authentication |

---

## 📁 Project Structure

```
talvia/
├── talvia-backend/          # Django REST API
│   ├── config/              # Django settings, URLs, WSGI/ASGI
│   ├── apps/
│   │   ├── accounts/        # Auth (uses Django built-in User)
│   │   ├── colleges/        # College models, views, filters, serializers
│   │   ├── courses/         # Course models, views, filters, serializers
│   │   ├── services/        # Service detail pages
│   │   ├── enquiries/       # Student enquiry system
│   │   └── core/            # Site settings, contact info, seed data
│   ├── media/               # Uploaded images
│   ├── static/              # Static files
│   ├── requirements.txt
│   └── manage.py
│
└── talvia-frontend/         # React SPA
    └── src/
        ├── components/      # Navbar, Footer, CollegeCard, CourseCard, EnquiryModal, WhatsAppButton
        ├── pages/           # Home, About, Colleges, Courses, Services, Contact (+ detail pages)
        ├── layouts/         # MainLayout with Navbar + Footer
        ├── services/        # API modules (axios)
        └── types/           # TypeScript interfaces
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm

### Backend Setup

```bash
cd talvia-backend

# Create and activate virtual environment
python -m venv venv
# Windows:
.\venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy env file
cp .env.example .env

# Run migrations
python manage.py migrate

# Seed demo data
python manage.py seed_data

# Create admin user
python manage.py createsuperuser
# Or with defaults:
# DJANGO_SUPERUSER_PASSWORD=admin123 python manage.py createsuperuser --noinput --username admin --email admin@talvia.com

# Start server
python manage.py runserver
```

Backend runs at: **http://127.0.0.1:8000**

### Frontend Setup

```bash
cd talvia-frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 🔗 Key URLs

| URL | Description |
|-----|-------------|
| `http://localhost:5173` | Frontend website |
| `http://127.0.0.1:8000/admin/` | Django Admin Dashboard |
| `http://127.0.0.1:8000/api/colleges/` | Colleges API |
| `http://127.0.0.1:8000/api/colleges/featured/` | Featured colleges |
| `http://127.0.0.1:8000/api/colleges/districts/` | District list with counts |
| `http://127.0.0.1:8000/api/courses/` | Courses API |
| `http://127.0.0.1:8000/api/courses/categories/` | Course categories |
| `http://127.0.0.1:8000/api/services/` | Services list |
| `http://127.0.0.1:8000/api/enquiries/` | Submit enquiry (POST) |
| `http://127.0.0.1:8000/api/contact/` | Contact information |
| `http://127.0.0.1:8000/api/site-settings/` | Site settings |

---

## 📖 API Documentation

### Colleges

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/colleges/` | Public | List colleges (paginated, filterable) |
| GET | `/api/colleges/{slug}/` | Public | College detail |
| GET | `/api/colleges/featured/` | Public | Featured colleges |
| GET | `/api/colleges/districts/` | Public | Districts with college counts |
| **Filters** | `?district=ernakulam`, `?search=kochi`, `?course=bca-bachelor-of-computer-applications` | | |

### Courses

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/courses/` | Public | List courses (paginated, filterable) |
| GET | `/api/courses/{slug}/` | Public | Course detail with available colleges |
| GET | `/api/courses/categories/` | Public | Course categories with counts |
| **Filters** | `?category=engineering`, `?degree_type=bachelors`, `?search=computer` | | |

### Services

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/services/` | Public | All services |
| GET | `/api/services/{slug}/` | Public | Service detail with benefits, process, FAQs |

### Enquiries

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/enquiries/` | Public | Submit enquiry (rate-limited: 5/hour) |
| GET | `/api/enquiries/admin/` | Staff | List all enquiries |
| PATCH | `/api/enquiries/admin/{id}/` | Staff | Update status/assignment |

### Site

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/contact/` | Public | Contact information |
| GET | `/api/site-settings/` | Public | Homepage content, stats, meta |

---

## 🔐 Django Admin

Login at **http://127.0.0.1:8000/admin/** with your superuser credentials.

### What you can manage:

- **Colleges** — Add/edit colleges, upload logos/banners, manage gallery images, associate courses, set as featured
- **Courses** — Add/edit courses with categories, duration, eligibility
- **Enquiries** — View all student enquiries, filter by status/type, assign staff, update status (New → Contacted → Follow-up → Converted → Closed)
- **Services** — Edit service pages, benefits, process steps, FAQs
- **Contact Information** — Update phone, email, address, WhatsApp, social links
- **Site Settings** — Update hero text, about section, statistics, SEO metadata

---

## 📱 Website Pages

1. **Home** — Hero, stats, about preview, services, featured colleges, how it works, CTA, enquiry form
2. **About Us** — Company story, vision/mission/values, approach, why choose Talvia
3. **Colleges** — Searchable directory with district filter, pagination, college cards
4. **College Detail** — Full info, courses with fees, gallery, sidebar with CTA + WhatsApp
5. **Courses** — Filterable by category/search, course cards with college count
6. **Course Detail** — Description, eligibility, available colleges list
7. **Services** — All 6 services with icons, benefits preview
8. **Service Detail** — Full description, benefits, process steps, FAQ accordion
9. **Contact** — Form + contact info sidebar + WhatsApp CTA + map placeholder

---

## 🟢 WhatsApp Integration

- Floating WhatsApp button on every page (bottom-right)
- WhatsApp CTA on college detail pages (with prefilled college name)
- WhatsApp link in footer and contact page
- Company WhatsApp number stored in Django ContactInformation model

---

## 📋 Student Enquiry Workflow

1. Student browses colleges/courses
2. Clicks **Enquire Now** on a college/course card
3. Modal opens with college/course prefilled
4. Student fills in name, phone, and details
5. Frontend validates and POSTs to `/api/enquiries/`
6. Django validates server-side and saves
7. Success confirmation shown to student
8. Enquiry appears in Django Admin
9. Staff assigns themselves and updates status
10. Staff tracks progress: New → Contacted → Follow-up → Converted → Closed

---

## 🛡️ Security

- Environment-based secrets (`python-decouple`)
- Password hashing via Django
- Role-based permissions (staff-only enquiry management)
- CORS restricted to frontend origin
- Rate limiting on enquiry submissions (5/hour)
- Server-side validation on all form inputs
- CSRF protection on Django admin
- `DEBUG=False` ready for production

---

## 🚀 Production Deployment

### Backend

```bash
# .env for production
SECRET_KEY=<generate-a-strong-key>
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,api.yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com

# PostgreSQL
# Update DATABASES in settings.py or use DATABASE_URL

# Collect static files
python manage.py collectstatic --noinput

# Run with Gunicorn
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

### Frontend

```bash
# Build
npm run build

# Deploy dist/ folder to Netlify, Vercel, Nginx, etc.
# Set VITE_API_BASE_URL to your production API URL
```

---

## 📝 Demo Data

The `seed_data` management command creates:
- 1 ContactInformation record
- 1 SiteSettings record
- 6 Services with descriptions, benefits, process steps, and FAQs
- 10 Courses across 8 categories
- 8 Demo Colleges across 8 Kerala districts (4 featured)
- 30 College-Course associations with fee information

All demo colleges are clearly labeled as **"Demo College - [District]"** with **(DEMO DATA)** tags.

---

## 📄 License

Proprietary — Talvia Education Services.

