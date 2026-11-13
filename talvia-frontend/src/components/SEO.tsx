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
 * Manages document.title, standard meta tags, Open Graph, Twitter Cards,
 * canonical URLs, robots directives, and JSON-LD structured data.
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

    // 1. Update Title
    document.title = title;

    // Helper to set or create a <meta> tag
    const setMeta = (attr: 'name' | 'property', key: string, content: string | undefined) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`);
      if (!content) {
        if (tag) tag.remove();
        return;
      }
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Helper to set or create a <link> tag
    const setLink = (rel: string, href: string | undefined) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!href) {
        if (link) link.remove();
        return;
      }
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Helper to set JSON-LD schema script
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

    // Open Graph (Facebook, WhatsApp, LinkedIn)
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

    // Schema Markup
    setSchema(structuredData);
  }, [title, description, canonicalUrl, keywordsStr, ogType, imageUrl, noindex, structuredData]);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywordsStr && <meta name="keywords" content={keywordsStr} />}
      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  );
}

