import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string | string[];
  ogType?: 'website' | 'article';
  ogImage?: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const SITE_URL = 'https://talviastudentsgrowth.in';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/exact-logo-raw.png`;
export const SITE_NAME = 'TALVIA Consultancy';

/**
 * Universal SEO component for TALVIA Consultancy.
 * Manages document.title, meta tags, Open Graph, Twitter Cards,
 * canonical URLs, and JSON-LD structured data.
 *
 * Guarantees strictly ONE <title> tag, ONE meta description, and ONE canonical link
 * across client-side page transitions, eliminating duplicate tags.
 */
export default function SEO({
  title,
  description,
  canonical,
  keywords,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  structuredData,
}: SEOProps) {
  const canonicalUrl = canonical
    ? (canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical.startsWith('/') ? '' : '/'}${canonical}`)
    : SITE_URL;

  const imageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

  const keywordsStr = Array.isArray(keywords)
    ? keywords.join(', ')
    : keywords || 'global education consultancy, study abroad, MBBS abroad, international university admissions, Education Without Borders, Talvia Consultancy';

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 1. Strictly maintain EXACTLY ONE <title> tag in <head>
    document.title = title;
    const titleElements = document.querySelectorAll('title');
    if (titleElements.length > 0) {
      titleElements[0].textContent = title;
      // Remove any duplicate title elements
      for (let i = 1; i < titleElements.length; i++) {
        titleElements[i].remove();
      }
    } else {
      const t = document.createElement('title');
      t.id = 'page-title';
      t.textContent = title;
      document.head.appendChild(t);
    }

    // Helper: set or update exactly ONE <meta> tag
    const setMeta = (attr: 'name' | 'property', key: string, content: string | undefined) => {
      const tags = document.querySelectorAll(`meta[${attr}="${key}"]`);
      if (!content) {
        tags.forEach(t => t.remove());
        return;
      }
      if (tags.length > 0) {
        tags[0].setAttribute('content', content);
        // Remove duplicates
        for (let i = 1; i < tags.length; i++) {
          tags[i].remove();
        }
      } else {
        const tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    // Helper: set or update exactly ONE <link> tag
    const setLink = (rel: string, href: string | undefined) => {
      const links = document.querySelectorAll(`link[rel="${rel}"]`);
      if (!href) {
        links.forEach(l => l.remove());
        return;
      }
      if (links.length > 0) {
        links[0].setAttribute('href', href);
        // Remove duplicates
        for (let i = 1; i < links.length; i++) {
          links[i].remove();
        }
      } else {
        const link = document.createElement('link');
        link.setAttribute('rel', rel);
        link.setAttribute('href', href);
        document.head.appendChild(link);
      }
    };

    // Helper: set or update JSON-LD schema
    const setSchema = (data: Record<string, unknown> | Array<Record<string, unknown>> | undefined) => {
      let script = document.getElementById('talvia-schema-jsonld') as HTMLScriptElement | null;
      if (!data) {
        if (script) script.remove();
        return;
      }
      if (!script) {
        script = document.createElement('script');
        script.id = 'talvia-schema-jsonld';
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    };

    // Standard SEO Meta Tags
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywordsStr);
    setMeta('name', 'author', SITE_NAME);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', imageUrl);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', 'en_US');

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', imageUrl);

    // Canonical link
    setLink('canonical', canonicalUrl);

    // JSON-LD Schema
    setSchema(structuredData);
  }, [title, description, canonicalUrl, keywordsStr, ogType, imageUrl, noindex, structuredData]);

  return null;
}
