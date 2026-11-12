# TALVIA — Higher Education Admissions Platform

> **Your Education. Your Future. Our Guidance.**

A modern, high-performance static website for **Talvia Consultancy**, connecting aspiring students with top colleges and universities across India. Built with **React 19 + TypeScript + Vite + Tailwind CSS**, fully optimized for client showcases, static hosting (GitHub Pages, Vercel, Netlify, AWS S3/CloudFront), and direct **WhatsApp Enquiry Desk** routing.

---

## ✨ Features

- **100% Static & Blazing Fast**: Zero server or database dependencies. Zero API latency.
- **Direct WhatsApp Enquiry**: All student enquiries (HomePage Quick Enquiry, Contact Form, Course & College Enquiry Modals) format rich, structured messages and open directly in WhatsApp to `+91 8943442479`.
- **Pan-India Coverage**: Top institutions and universities across 28+ states and UTs.
- **Academic Directory**: Searchable, filterable college and course catalog.
- **Monochrome Consultancy Design**: High-end minimalist black, white, and zinc aesthetic with smooth Framer Motion scroll animations.
- **Responsive & Mobile Ready**: Full mobile navigation, modal popups, and floating WhatsApp contact button.

---

## 📁 Project Structure

```
talvia/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml    # GitHub Actions workflow for automatic deployment
│
└── talvia-frontend/            # React + Vite Static SPA
    ├── public/                 # Static assets & logos
    └── src/
        ├── assets/             # Branding & logo PNGs
        ├── components/         # Navbar, Footer, CollegeCard, CourseCard, EnquiryModal, WhatsAppButton
        ├── pages/              # Home, About, Colleges, Courses, Services, Contact (+ detail pages)
        ├── layouts/            # MainLayout with Navbar + Footer + WhatsAppButton
        ├── services/           # 100% static data providers & WhatsApp enquiry routing
        └── types/              # TypeScript interfaces
```

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+
- npm

### Run Locally

```bash
cd talvia-frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Production Build

```bash
cd talvia-frontend
npm run build
```

The compiled production bundle will be in `talvia-frontend/dist/`, ready to deploy to any static host.

---

## 📞 Admissions Desk

- **WhatsApp & Phone**: `+91 8943442479`
- **Email**: `talviaconsultancy@gmail.com`
- **Scope**: Pan-India Higher Education Admissions
