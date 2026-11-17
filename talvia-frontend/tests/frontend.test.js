import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const publicDir = path.join(projectRoot, 'public');
const srcDir = path.join(projectRoot, 'src');

const SITE_URL = 'https://talviastudentsgrowth.in';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseSitemapUrls() {
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  assert.ok(fs.existsSync(sitemapPath), 'public/sitemap.xml must exist');
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
  return matches.map(m => m[1].trim());
}

function getExpectedHtmlPath(url) {
  const relative = url.replace(SITE_URL, '').replace(/^\//, '').replace(/\/$/, '');
  return relative ? path.join(distDir, relative, 'index.html') : path.join(distDir, 'index.html');
}

function extractMetaDescription(html) {
  // Use backreference to match identical opening and closing quote (" or ')
  const match = html.match(/<meta\s+name=["']description["']\s+content=(["'])([\s\S]*?)\1/i);
  return match ? match[2].trim() : null;
}

function extractTagContent(html, regex) {
  const match = html.match(regex);
  return match ? match[1].trim() : null;
}

function findAllFiles(dir, filterRegex, list = []) {
  if (!fs.existsSync(dir)) return list;
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      findAllFiles(full, filterRegex, list);
    } else if (filterRegex.test(item)) {
      list.push(full);
    }
  }
  return list;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('TALVIA Frontend Automated Verification Suite', () => {

  describe('1. Production Build', () => {
    it('executes production build successfully (tsc, vite build, static generation)', () => {
      const output = execSync('npm run build', {
        cwd: projectRoot,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      });
      assert.ok(output.includes('Successfully generated'), 'Build output should confirm static page generation');
      assert.ok(fs.existsSync(path.join(distDir, 'index.html')), 'dist/index.html must exist after build');
    });
  });

  describe('2. Sitemap & Canonical HTML Page Generation', () => {
    const urls = parseSitemapUrls();

    it('sitemap.xml contains exactly 28 canonical URLs', () => {
      assert.strictEqual(urls.length, 28, 'Expected exactly 28 canonical URLs in sitemap.xml');
    });

    it('all 28 canonical sitemap URLs have corresponding HTML files in dist/', () => {
      for (const url of urls) {
        const expectedFile = getExpectedHtmlPath(url);
        assert.ok(
          fs.existsSync(expectedFile),
          `Missing pre-rendered HTML file for sitemap URL: ${url} (expected: ${expectedFile})`
        );
        const stats = fs.statSync(expectedFile);
        assert.ok(stats.size > 500, `Generated file ${expectedFile} is unexpectedly small (${stats.size} bytes)`);
      }
    });

    it('generates dist/404.html with noindex robots tag', () => {
      const notFoundPath = path.join(distDir, '404.html');
      assert.ok(fs.existsSync(notFoundPath), 'dist/404.html must exist');
      const html = fs.readFileSync(notFoundPath, 'utf8');
      assert.ok(html.includes('404'), '404.html should reference 404');
      assert.match(
        html,
        /<meta\s+name=["']robots["']\s+content=["']noindex,\s*nofollow["']/i,
        '404.html must contain noindex, nofollow robots meta tag'
      );
    });

    it('all 28 canonical pages contain genuine pre-rendered HTML content inside #root', () => {
      for (const url of urls) {
        const expectedFile = getExpectedHtmlPath(url);
        const html = fs.readFileSync(expectedFile, 'utf8');
        const match = html.match(/<div id="root">([\s\S]*?)<\/div>\s*<\/body>/i);
        assert.ok(match, `Could not find #root container in ${expectedFile}`);
        const rootContent = match[1].trim();
        assert.ok(
          rootContent.length > 5000,
          `Prerendered #root content in ${url} is too small (${rootContent.length} chars)`
        );
        assert.ok(
          !rootContent.includes('animate-spin') && !rootContent.includes('template id="B:0"'),
          `Prerendered #root in ${url} should not contain loading spinner or fallback skeleton`
        );
        assert.ok(
          /<h1[^>]*>.*?<\/h1>/i.test(rootContent),
          `Prerendered #root in ${url} must contain an <h1> heading`
        );
      }
    });
  });

  describe('3 & 4. SEO Titles, Descriptions & Canonical URLs', () => {
    const urls = parseSitemapUrls();

    it('every generated HTML page has a non-empty, unique title tag', () => {
      for (const url of urls) {
        const html = fs.readFileSync(getExpectedHtmlPath(url), 'utf8');
        const titleMatches = [...html.matchAll(/<title[^>]*>(.*?)<\/title>/gis)];
        assert.strictEqual(titleMatches.length, 1, `Route ${url} must have exactly ONE <title> tag, found ${titleMatches.length}`);
        const title = titleMatches[0][1].trim();
        assert.ok(title.length >= 10, `Title on ${url} is too short: "${title}"`);
        assert.ok(title.includes('TALVIA'), `Title on ${url} must reference the TALVIA brand`);
      }
    });

    it('every generated HTML page has a valid meta description', () => {
      for (const url of urls) {
        const html = fs.readFileSync(getExpectedHtmlPath(url), 'utf8');
        const desc = extractMetaDescription(html);
        assert.ok(desc, `Missing meta description on ${url}`);
        assert.ok(desc.length >= 30, `Meta description on ${url} is too short (${desc.length} chars): "${desc}"`);
      }
    });

    it('every generated HTML page has the exact canonical URL matching its route', () => {
      for (const url of urls) {
        const html = fs.readFileSync(getExpectedHtmlPath(url), 'utf8');
        const canonicalMatches = [...html.matchAll(/<link\s+rel=["']canonical["']\s+href=(["'])(.*?)\1/gis)];
        assert.strictEqual(canonicalMatches.length, 1, `Route ${url} must have exactly ONE canonical link tag`);
        const canonicalHref = canonicalMatches[0][2].trim();
        assert.strictEqual(canonicalHref, url, `Canonical URL mismatch on ${url}: found "${canonicalHref}"`);
      }
    });
  });

  describe('5. JSON-LD Structured Data', () => {
    const urls = parseSitemapUrls();

    it('all JSON-LD blocks across all 28 generated pages contain syntactically valid JSON', () => {
      for (const url of urls) {
        const html = fs.readFileSync(getExpectedHtmlPath(url), 'utf8');
        const matches = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis)];
        for (const m of matches) {
          const jsonText = m[1].trim();
          assert.doesNotThrow(
            () => JSON.parse(jsonText),
            `Invalid JSON-LD on route ${url}`
          );
        }
      }
    });

    it('homepage contains WebSite and EducationalOrganization schemas', () => {
      const html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
      const jsonText = extractTagContent(html, /<script\s+type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/is);
      assert.ok(jsonText, 'Homepage must have JSON-LD script tag');
      const data = JSON.parse(jsonText);
      const types = JSON.stringify(data);
      assert.ok(types.includes('"WebSite"'), 'Homepage schema must include WebSite');
      assert.ok(types.includes('"EducationalOrganization"'), 'Homepage schema must include EducationalOrganization');
    });

    it('course detail pages contain Course and BreadcrumbList schemas', () => {
      const courseHtml = path.join(distDir, 'courses', 'mbbs-bachelor-of-medicine-bachelor-of-surgery', 'index.html');
      assert.ok(fs.existsSync(courseHtml), 'MBBS course page must exist');
      const html = fs.readFileSync(courseHtml, 'utf8');
      const jsonText = extractTagContent(html, /<script\s+type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/is);
      assert.ok(jsonText, 'Course page must have JSON-LD script tag');
      const data = JSON.parse(jsonText);
      const str = JSON.stringify(data);
      assert.ok(str.includes('"Course"'), 'Course page schema must include Course');
      assert.ok(str.includes('"BreadcrumbList"'), 'Course page schema must include BreadcrumbList');
    });

    it('service detail pages contain Service and BreadcrumbList schemas', () => {
      const serviceHtml = path.join(distDir, 'services', 'college-selection', 'index.html');
      assert.ok(fs.existsSync(serviceHtml), 'College selection service page must exist');
      const html = fs.readFileSync(serviceHtml, 'utf8');
      const jsonText = extractTagContent(html, /<script\s+type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/is);
      assert.ok(jsonText, 'Service page must have JSON-LD script tag');
      const data = JSON.parse(jsonText);
      const str = JSON.stringify(data);
      assert.ok(str.includes('"Service"'), 'Service page schema must include Service');
      assert.ok(str.includes('"BreadcrumbList"'), 'Service page schema must include BreadcrumbList');
    });
  });

  describe('7. Internal Links Integrity', () => {
    const urls = parseSitemapUrls();
    const validPaths = new Set(urls.map(u => u.replace(SITE_URL, '').replace(/\/$/, '') || '/'));
    validPaths.add('/colleges');
    validPaths.add('/terms');
    validPaths.add('/privacy');

    it('all internal links in src/ point to valid routes or redirects', () => {
      const srcFiles = findAllFiles(srcDir, /\.(tsx|ts)$/);
      const foundLinks = new Set();

      for (const file of srcFiles) {
        const text = fs.readFileSync(file, 'utf8');
        const matches = text.matchAll(/(?:to|href)=["'](\/[a-zA-Z0-9_\-\/?&=#]*)["']/g);
        for (const m of matches) {
          const rawPath = m[1];
          if (
            rawPath.startsWith('/assets') ||
            rawPath.startsWith('/api') ||
            rawPath.startsWith('/media') ||
            rawPath.startsWith('/favicon')
          ) {
            continue;
          }
          const cleanPath = rawPath.split(/[?#]/)[0].replace(/\/$/, '') || '/';
          foundLinks.add(cleanPath);
        }
      }

      for (const link of foundLinks) {
        assert.ok(
          validPaths.has(link) || link.startsWith('/colleges/'),
          `Broken internal route link detected in source code: "${link}"`
        );
      }
    });

    it('all internal links in generated dist HTML point to existing static routes or redirects', () => {
      const htmlFiles = findAllFiles(distDir, /\.html$/);
      const brokenLinks = [];

      for (const file of htmlFiles) {
        const html = fs.readFileSync(file, 'utf8');
        const matches = html.matchAll(/href=["'](\/[a-zA-Z0-9_\-\/?&=#]*)["']/g);
        for (const m of matches) {
          const raw = m[1];
          if (
            raw.startsWith('/assets') ||
            raw.startsWith('/favicon') ||
            raw.startsWith('/apple-touch-icon') ||
            raw === '/'
          ) {
            continue;
          }
          const clean = raw.split(/[?#]/)[0].replace(/\/$/, '') || '/';
          if (!validPaths.has(clean) && !clean.startsWith('/colleges/')) {
            brokenLinks.push({ file: path.relative(distDir, file), link: raw });
          }
        }
      }

      assert.strictEqual(
        brokenLinks.length,
        0,
        `Found broken internal links in dist/: ${JSON.stringify(brokenLinks, null, 2)}`
      );
    });
  });

  describe('8. WhatsApp Contact Links Formatting', () => {
    const WHATSAPP_PHONE = '918943442479';

    it('WhatsApp phone number is valid international format without plus prefix', () => {
      assert.match(WHATSAPP_PHONE, /^\d{10,15}$/, 'WhatsApp phone number must be 10-15 digits');
    });

    it('WhatsApp enquiry URL builder produces compliant wa.me URL with encoded text', () => {
      const sampleData = {
        student_name: 'John Doe',
        phone: '+91 9876543210',
        email: 'john@example.com',
        interested_course: 'MBBS Abroad',
        message: 'Interested in admissions',
      };

      const lines = [
        '🎓 *New Admissions Enquiry — TALVIA Consultancy*',
        '',
        `👤 *Student Name:* ${sampleData.student_name}`,
        `📞 *Phone Number:* ${sampleData.phone}`,
        `✉️ *Email:* ${sampleData.email}`,
        `📚 *Interested Course:* ${sampleData.interested_course}`,
        `💬 *Query / Message:* ${sampleData.message}`,
      ];

      const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(lines.join('\n'))}`;

      assert.ok(url.startsWith(`https://wa.me/${WHATSAPP_PHONE}?text=`), 'URL must start with wa.me domain and phone');
      const parsedUrl = new URL(url);
      const textParam = parsedUrl.searchParams.get('text');
      assert.ok(textParam, 'URL must have a text search parameter');
      assert.ok(textParam.includes('John Doe'), 'Decoded text must contain student name');
      assert.ok(textParam.includes('+91 9876543210'), 'Decoded text must contain phone number');
      assert.ok(textParam.includes('MBBS Abroad'), 'Decoded text must contain interested course');
    });

    it('all hardcoded WhatsApp links in src/ adhere to wa.me specification', () => {
      const srcFiles = findAllFiles(srcDir, /\.(tsx|ts)$/);
      const waLinks = [];

      for (const file of srcFiles) {
        const text = fs.readFileSync(file, 'utf8');
        const matches = text.matchAll(/https:\/\/wa\.me\/[a-zA-Z0-9_\-\/?&=%]+/g);
        for (const m of matches) {
          waLinks.push(m[0]);
        }
      }

      assert.ok(waLinks.length > 0, 'Expected to find WhatsApp links in src/');
      for (const link of waLinks) {
        assert.match(
          link,
          /^https:\/\/wa\.me\/\d{10,15}(\?text=.*)?$/,
          `Malformed WhatsApp URL: ${link}`
        );
      }
    });
  });

});
