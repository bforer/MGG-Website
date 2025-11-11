# MGG Website (Astro + Tailwind) — Build Spec

This document is a **single source of truth** for building the new MGG website
in **Astro** with **Tailwind CSS**. It includes a clean component architecture,
a data-driven "What we do" section, a Splide hero slider, a folder-fed Look Book
gallery with modal, and lightweight scroll animations.

> **Static Site**: This is a fully static site designed for deployment on
> **cPanel** or **xneelo** hosting.  
> Font: **Helvetica Neue** (system stack fallback applied via Tailwind)  
> Slider: **SplideJS**  
> Animations: **IntersectionObserver** + CSS utilities (no heavy animation libs)

---

## 1) Tech Stack

- **Astro** (content-first, islands)
- **Tailwind CSS** (utility-first, custom font family)
- **SplideJS** for the Home hero
- **TypeScript** for the SSOT data file
- **IntersectionObserver** for reveal-on-scroll
- **No framework** (Vanilla islands) for components unless needed

---

## 2) Project Structure

**Important**: This site will be created in the **root of the project
directory**, not in a subdirectory.

```txt
mgg-event-planning/          # Project root (current directory)
├─ package.json
├─ astro.config.mjs
├─ tailwind.config.mjs
├─ tsconfig.json
├─ PROJECT_SPEC.md           # This specification document
├─ README.md
├─ mockups/                  # Signed-off design mockups (reference only)
│  ├─ home.jpg/png
│  ├─ what-we-do.jpg/png
│  ├─ look-book.jpg/png
│  └─ ... (any other page mockups)
├─ src/
│  ├─ assets/
│  │  ├─ lookbook/          # Drop JPG/PNG here – auto-fed into the gallery
│  │  └─ hero/              # Images used by the Splide hero
│  ├─ data/
│  │  ├─ ssot.ts            # SSOT data for "What we do" cards
│  │  └─ seo.ts             # SEO configuration & site metadata
│  ├─ components/
│  │  ├─ HeroSplide.astro
│  │  ├─ WhatWeDoGrid.astro
│  │  ├─ GalleryGrid.astro
│  │  ├─ ModalImage.svelte? # optional alt; we'll do vanilla JS by default
│  │  ├─ RevealOnScroll.astro
│  │  └─ SEOHead.astro      # Comprehensive SEO meta tags component
│  ├─ layouts/
│  │  └─ BaseLayout.astro
│  ├─ pages/
│  │  ├─ index.astro        # Home
│  │  ├─ what-we-do.astro
│  │  └─ look-book.astro
│  └─ scripts/
│     └─ modal.ts           # Lightweight modal logic used by GalleryGrid
├─ public/
│  ├─ robots.txt            # SEO: robots directives
│  ├─ favicon.svg
│  └─ fonts/ (optional if self-hosting Helvetica Neue)
└─ dist/                     # Build output (generated, not committed)
```

---

## 2.1) Design Mockups Reference

**Important**: Place all signed-off design mockups in the `mockups/` folder at
the project root. This allows the development team to:

- Reference exact layouts, spacing, and styling
- Match colors, typography, and component designs
- Verify responsive breakpoints and mobile layouts
- Ensure pixel-perfect implementation

**Recommended mockup files**:

- `mockups/home.jpg` or `home.png` - Home page design
- `mockups/what-we-do.jpg` or `what-we-do.png` - What we do page
- `mockups/look-book.jpg` or `look-book.png` - Look Book gallery page
- `mockups/mobile-home.jpg` - Mobile version (if separate mockups provided)
- Any additional page mockups or component details

**Note**: The `mockups/` folder is for reference only and won't be included in
the build output. Keep original design files here for easy access during
development.

---

## 3) Install & Init

**Important**: Create the Astro site in the **current project root directory**
(not in a subdirectory).

```bash
# Create Astro project in current directory (project root)
npm create astro@latest . -- --template basics

# Tailwind
npm i -D @astrojs/tailwind tailwindcss

# UI/runtime deps
npm i @splidejs/splide

# Types
npm i -D typescript

# SEO: Sitemap generation
npm i @astrojs/sitemap
```

> **Note**: Using `.` (dot) as the project name tells Astro to create the site
> in the current directory instead of creating a new subdirectory. This ensures
> all files are created in your project root.

Update `astro.config.mjs`:

```js
import {defineConfig} from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: "https://www.mgg.com", // Replace with your actual domain
	output: "static", // Explicitly set to static (default, but good to be explicit for cPanel/xneelo)
	integrations: [
		tailwind(),
		sitemap({
			changefreq: "weekly",
			priority: 0.7,
			lastmod: new Date()
		})
	]
});
```

> **Note**: Astro defaults to static output, which is perfect for cPanel/xneelo
> hosting. The build will generate a `dist/` folder with all static HTML, CSS,
> and JS files ready to upload.

Create `tailwind.config.mjs`:

```js
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'"Helvetica Neue"',
					"Helvetica",
					"Arial",
					"ui-sans-serif",
					"system-ui",
					"sans-serif"
				]
			}
		}
	},
	plugins: []
};
```

Add base styles in `src/styles/global.css` (Astro Tailwind starter already wires
this):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
	--bg: #0c0c0d;
	--ink: #ffffff;
	--ink-muted: rgba(255, 255, 255, 0.75);
}

html,
body {
	background: var(--bg);
	color: var(--ink);
	font-feature-settings: "liga" 1, "kern" 1;
}
```

---

## 4) SEO Setup

### 4.1) SEO Configuration Data

`src/data/seo.ts`

```ts
export const siteConfig = {
	name: "MGG",
	title: "MGG — Custom Technical & Staging Experiences",
	description:
		"Professional event production services including lighting design, sound engineering, staging, and technical solutions for corporate events, live shows, and custom experiences.",
	url: "https://www.mgg.com", // Replace with your actual domain
	ogImage: "/og-image.jpg", // 1200x630px recommended
	twitterHandle: "@MGG", // Optional: replace with actual handle
	locale: "en_US",
	type: "website"
};

export type SEOProps = {
	title?: string;
	description?: string;
	image?: string;
	type?: "website" | "article";
	publishedTime?: string;
	modifiedTime?: string;
	author?: string;
	tags?: string[];
	canonical?: string;
	noindex?: boolean;
	nofollow?: boolean;
};
```

### 4.2) SEO Head Component

`src/components/SEOHead.astro`

```astro
---
import { siteConfig, type SEOProps } from '../data/seo';

const {
  title = siteConfig.title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  tags = [],
  canonical,
  noindex = false,
  nofollow = false,
} = Astro.props as SEOProps;

const fullTitle = title === siteConfig.title ? title : `${title} | ${siteConfig.name}`;
const canonicalUrl = canonical || new URL(Astro.url.pathname, siteConfig.url).toString();
const ogImageUrl = image.startsWith('http') ? image : new URL(image, siteConfig.url).toString();
const robotsContent = [
  noindex ? 'noindex' : 'index',
  nofollow ? 'nofollow' : 'follow',
].join(', ');
---

<!-- Primary Meta Tags -->
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{fullTitle}</title>
<meta name="title" content={fullTitle} />
<meta name="description" content={description} />
<meta name="robots" content={robotsContent} />
<link rel="canonical" href={canonicalUrl} />

<!-- Open Graph / Facebook -->
<meta property="og:type" content={type} />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImageUrl} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content={fullTitle} />
<meta property="og:site_name" content={siteConfig.name} />
<meta property="og:locale" content={siteConfig.locale} />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content={canonicalUrl} />
<meta name="twitter:title" content={fullTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImageUrl} />
{siteConfig.twitterHandle && (
  <meta name="twitter:site" content={siteConfig.twitterHandle} />
  <meta name="twitter:creator" content={siteConfig.twitterHandle} />
)}

<!-- Article-specific meta (if type is 'article') -->
{type === 'article' && (
  <>
    {publishedTime && <meta property="article:published_time" content={publishedTime} />}
    {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
    {author && <meta property="article:author" content={author} />}
    {tags.map((tag) => (
      <meta property="article:tag" content={tag} />
    ))}
  </>
)}

<!-- Additional SEO -->
<meta name="theme-color" content="#0c0c0d" />
<meta name="format-detection" content="telephone=no" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

<!-- Preconnect to external domains (if needed) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
```

### 4.3) JSON-LD Structured Data Component

`src/components/StructuredData.astro`

```astro
---
interface Props {
  type: 'Organization' | 'WebSite' | 'Service' | 'ImageGallery';
  data: Record<string, any>;
}

const { type, data } = Astro.props;
const schema = {
  '@context': 'https://schema.org',
  '@type': type,
  ...data,
};
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

### 4.4) Robots.txt

`public/robots.txt`

```txt
User-agent: *
Allow: /

# Sitemap
Sitemap: https://www.mgg.com/sitemap-index.xml

# Disallow admin/private areas (if any)
# Disallow: /admin/
# Disallow: /api/
```

### 4.5) Enhanced Base Layout with SEO

Update `src/layouts/BaseLayout.astro` to use SEO components:

```astro
---
import SEOHead from '../components/SEOHead.astro';
import StructuredData from '../components/StructuredData.astro';
import { siteConfig, type SEOProps } from '../data/seo';

interface Props extends SEOProps {
  title?: string;
  description?: string;
}

const {
  title = siteConfig.title,
  description = siteConfig.description,
  ...seoProps
} = Astro.props;
---

<html lang="en" class="scroll-smooth">
  <head>
    <SEOHead title={title} description={description} {...seoProps} />

    <!-- Organization Schema -->
    <StructuredData
      type="Organization"
      data={{
        name: siteConfig.name,
        url: siteConfig.url,
        logo: new URL('/logo.png', siteConfig.url).toString(),
        sameAs: [
          // Add social media URLs here
          // 'https://www.facebook.com/mgg',
          // 'https://www.instagram.com/mgg',
          // 'https://www.linkedin.com/company/mgg',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          // email: 'info@mgg.com',
          // telephone: '+1-XXX-XXX-XXXX',
        },
      }}
    />

    <!-- Website Schema -->
    <StructuredData
      type="WebSite"
      data={{
        name: siteConfig.name,
        url: siteConfig.url,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  </head>
  <body class="font-sans antialiased bg-[var(--bg)] text-[var(--ink)]">
    <header class="sticky top-0 z-50 bg-black/70 backdrop-blur border-b border-white/10">
      <nav class="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between" role="navigation" aria-label="Main navigation">
        <a href="/" class="font-semibold tracking-wide" aria-label="MGG Home">MGG</a>
        <ul class="flex items-center gap-6 text-sm">
          <li><a class="hover:opacity-80" href="/">Home</a></li>
          <li><a class="hover:opacity-80" href="/what-we-do">What we do</a></li>
          <li><a class="hover:opacity-80" href="/look-book">Look Book</a></li>
          <li><a class="hover:opacity-80" href="/#connect">Let's connect</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <slot />
    </main>
    <footer class="border-t border-white/10 mt-24" role="contentinfo">
      <div class="mx-auto max-w-7xl px-6 py-10 text-sm text-white/70">
        <p>© {new Date().getFullYear()} MGG. All rights reserved.</p>
      </div>
    </footer>
  </body>
</html>
```

### 4.6) Page-Specific SEO Examples

**Home Page** (`src/pages/index.astro`):

```astro
---
import Base from '../layouts/BaseLayout.astro';
import HeroSplide from '../components/HeroSplide.astro';
import WhatWeDoGrid from '../components/WhatWeDoGrid.astro';
import StructuredData from '../components/StructuredData.astro';
import { services } from '../data/ssot';
import { siteConfig } from '../data/seo';
---

<Base
  title={siteConfig.title}
  description={siteConfig.description}
  image="/og-home.jpg"
>
  <!-- Service Schema for all services -->
  <StructuredData
    type="Service"
    data={{
      serviceType: 'Event Production Services',
      provider: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
      areaServed: 'Worldwide',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Event Production Services',
        itemListElement: services.map((service, index) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.title,
            description: service.blurb,
          },
          position: index + 1,
        })),
      },
    }}
  />

  <HeroSplide />
  <WhatWeDoGrid items={services} />
  <section id="connect" class="mx-auto max-w-7xl px-6 py-24">
    <!-- Your form / CTA here -->
  </section>
</Base>
```

**What We Do Page** (`src/pages/what-we-do.astro`):

```astro
---
import Base from '../layouts/BaseLayout.astro';
import WhatWeDoGrid from '../components/WhatWeDoGrid.astro';
import StructuredData from '../components/StructuredData.astro';
import { services } from '../data/ssot';
import { siteConfig } from '../data/seo';
---

<Base
  title="What we do — MGG"
  description="Comprehensive event production services including lighting design, sound engineering, staging, and technical solutions for corporate events and live shows."
  image="/og-what-we-do.jpg"
>
  <StructuredData
    type="Service"
    data={{
      serviceType: 'Event Production Services',
      provider: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
      description: 'Professional event production and technical staging services',
    }}
  />

  <WhatWeDoGrid items={services} />
</Base>
```

**Look Book Page** (`src/pages/look-book.astro`):

```astro
---
import Base from '../layouts/BaseLayout.astro';
import GalleryGrid from '../components/GalleryGrid.astro';
import StructuredData from '../components/StructuredData.astro';
import { siteConfig } from '../data/seo';

// Get images for structured data
const images = Object.entries(
  import.meta.glob('/src/assets/lookbook/*.{png,jpg,jpeg,webp,gif}', {
    eager: true,
    as: 'url',
  })
).map(([path, url]) => ({
  url: new URL(url, siteConfig.url).toString(),
  alt: path.split('/').pop() || 'MGG Event Production',
}));
---

<Base
  title="Look Book — MGG"
  description="Browse our portfolio of event production work including lighting design, sound engineering, and technical staging solutions."
  image="/og-lookbook.jpg"
>
  <StructuredData
    type="ImageGallery"
    data={{
      name: 'MGG Event Production Portfolio',
      description: 'Gallery of event production work and technical staging solutions',
      image: images.map((img) => ({
        '@type': 'ImageObject',
        contentUrl: img.url,
        description: img.alt,
      })),
    }}
  />

  <GalleryGrid />
</Base>
```

### 4.7) SEO Best Practices Checklist

- ✅ **Meta Tags**: Title, description, Open Graph, Twitter Cards
- ✅ **Structured Data**: JSON-LD for Organization, WebSite, Service,
  ImageGallery
- ✅ **Sitemap**: Auto-generated via `@astrojs/sitemap`
- ✅ **Robots.txt**: Properly configured
- ✅ **Canonical URLs**: Prevent duplicate content
- ✅ **Semantic HTML**: Proper use of `<header>`, `<nav>`, `<main>`, `<footer>`,
  ARIA labels
- ✅ **Image Optimization**: Use Astro's `<Image />` component for responsive
  images
- ✅ **Performance**: Lazy loading images, minimal JavaScript
- ✅ **Mobile-Friendly**: Responsive viewport meta tag
- ✅ **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

### 4.8) Additional SEO Enhancements

**Image Optimization** (update components to use Astro Image):

```astro
---
import { Image } from 'astro:assets';
---

<Image
  src={item.image}
  alt={item.title}
  width={800}
  height={600}
  loading="lazy"
  format="webp"
/>
```

**Add breadcrumbs** (optional, for better navigation):

```astro
<nav aria-label="Breadcrumb">
  <ol class="flex gap-2 text-sm">
    <li><a href="/">Home</a></li>
    <li>/</li>
    <li>Current Page</li>
  </ol>
</nav>
```

---

## 6) SSOT for "What we do"

`src/data/ssot.ts`

```ts
export type ServiceItem = {
	slug: string;
	title: string;
	blurb: string;
	image: string; // /src/assets path
	tone: string; // Tailwind class for tint (e.g., 'from-purple-600/70')
};

export const services: ServiceItem[] = [
	{
		slug: "lighting-design",
		title: "Lighting Design + Engineering.",
		blurb:
			"Designing and implementing an aesthetic and functional lighting plan… setup, programming, and functionality.",
		image: "/src/assets/what/lighting.jpg",
		tone: "from-purple-600/60"
	},
	{
		slug: "sound-design",
		title: "Sound Design + Engineering.",
		blurb:
			"Selecting microphones, speakers, effects… setup, calibration, and troubleshooting for optimal sound quality.",
		image: "/src/assets/what/sound.jpg",
		tone: "from-indigo-600/60"
	}
	// …add the rest from your mockups with custom tones per card
];
```

> **How to change colors**: adjust each item’s `tone` string; the component
> reads it and applies to a gradient overlay.

---

## 7) WhatWeDo Grid Component

`src/components/WhatWeDoGrid.astro`

```astro
---
import type { ServiceItem } from '../data/ssot';
const { items } = Astro.props as { items: ServiceItem[] };
---

<section class="mx-auto max-w-7xl px-6 py-24">
  <h2 class="text-3xl md:text-4xl font-semibold mb-10">Seamless integration of all disciplines.</h2>

  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map((item) => (
      <article class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <img src={item.image} alt={item.title} class="h-64 w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
        <div class={`pointer-events-none absolute inset-0 bg-gradient-to-t ${item.tone} to-transparent`} />
        <div class="absolute inset-x-0 bottom-0 p-6">
          <h3 class="text-xl font-semibold drop-shadow">{item.title}</h3>
          <p class="mt-2 text-sm text-white/80 max-w-prose">{item.blurb}</p>
        </div>
      </article>
    ))}
  </div>
</section>
```

`src/pages/what-we-do.astro`

```astro
---
import Base from '../layouts/BaseLayout.astro';
import WhatWeDoGrid from '../components/WhatWeDoGrid.astro';
import { services } from '../data/ssot';
---
<Base title="What we do — MGG">
  <WhatWeDoGrid items={services} />
</Base>
```

---

## 8) Home Hero — Splide

`src/components/HeroSplide.astro`

```astro
---
import '@splidejs/splide/dist/css/splide.min.css';
const slides: { src: string; alt?: string }[] = [
  { src: '/src/assets/hero/slide-1.jpg', alt: 'Stage Production' },
  { src: '/src/assets/hero/slide-2.jpg', alt: 'Corporate Event' },
  { src: '/src/assets/hero/slide-3.jpg', alt: 'Live Show' },
];
---

<div class="relative">
  <div class="splide" client:load>
    <div class="splide__track">
      <ul class="splide__list">
        {slides.map((s) => (
          <li class="splide__slide">
            <img src={s.src} alt={s.alt} class="w-full h-[60vh] md:h-[80vh] object-cover" />
          </li>
        ))}
      </ul>
    </div>
  </div>

  <script type="module" client:load>
    import Splide from '@splidejs/splide';
    new Splide('.splide', {
      type: 'loop',
      speed: 700,
      autoplay: true,
      interval: 4200,
      pauseOnHover: true,
      arrows: true,
      pagination: true,
      rewind: true,
    }).mount();
  </script>
</div>
```

`src/pages/index.astro`

```astro
---
import Base from '../layouts/BaseLayout.astro';
import HeroSplide from '../components/HeroSplide.astro';
import WhatWeDoGrid from '../components/WhatWeDoGrid.astro';
import { services } from '../data/ssot';
---
<Base title="MGG — Home">
  <HeroSplide />
  <WhatWeDoGrid items={services} />
  <section id="connect" class="mx-auto max-w-7xl px-6 py-24">
    <!-- Your form / CTA here -->
  </section>
</Base>
```

---

## 9) Look Book — Folder-fed Gallery + Modal

### Glob import

Astro supports `import.meta.glob`. We feed images from `src/assets/lookbook/*`.

`src/components/GalleryGrid.astro`

```astro
---
const images = Object.entries(import.meta.glob('/src/assets/lookbook/*.{png,jpg,jpeg,webp,gif}', { eager: true, as: 'url' }))
  .map(([path, url]) => ({ url, alt: path.split('/').pop() }));
---

<section class="mx-auto max-w-7xl px-6 py-24">
  <h2 class="text-3xl md:text-4xl font-semibold mb-10">Look Book</h2>

  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {images.map((img, idx) => (
      <button
        class="group relative overflow-hidden rounded-xl border border-white/10"
        aria-label={`Open ${img.alt}`}
        data-index={idx}
        on:click={`openModal(${idx})`}
      >
        <img src={img.url} alt={img.alt} loading="lazy" class="h-48 w-full object-cover transition duration-500 group-hover:scale-105" />
      </button>
    ))}
  </div>

  <!-- Modal -->
  <div id="lb-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/80 p-6">
    <button id="lb-close" class="absolute top-4 right-4 rounded-full border border-white/20 px-3 py-1 text-sm">Close</button>
    <img id="lb-img" src="" alt="" class="max-h-[85vh] max-w-[90vw] rounded-xl shadow-2xl" />
  </div>

  <script is:inline>
    const modal = document.getElementById('lb-modal');
    const modalImg = document.getElementById('lb-img');
    const modalClose = document.getElementById('lb-close');
    const sources = {images: JSON.parse('{imagesJson}')};

    function openModal(index) {
      modalImg.src = sources.images[index].url;
      modalImg.alt = sources.images[index].alt;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    modalClose?.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      modalImg.src = '';
    });
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) modalClose.click();
    });
    window.openModal = openModal;
  </script>
</section>
```

> Replace `{imagesJson}` with `JSON.stringify(images)` inside the component (see
> below).

**Final version** (Astro allows JS string interpolation):

```astro
---
const images = Object.entries(import.meta.glob('/src/assets/lookbook/*.{png,jpg,jpeg,webp,gif}', { eager: true, as: 'url' }))
  .map(([path, url]) => ({ url, alt: path.split('/').pop() }));
const imagesJson = JSON.stringify(images);
---
<!-- Use the same markup as above but make sure script uses {imagesJson} -->
```

`src/pages/look-book.astro`

```astro
---
import Base from '../layouts/BaseLayout.astro';
import GalleryGrid from '../components/GalleryGrid.astro';
---
<Base title="Look Book — MGG">
  <GalleryGrid />
</Base>
```

---

## 10) Reveal-on-Scroll Utility

`src/components/RevealOnScroll.astro`

```astro
---
const { as = 'div', class: klass = '', delay = 0 } = Astro.props;
const Tag = as as any;
---
<Tag class={`reveal opacity-0 translate-y-6 transition duration-700 ease-out ${klass}`}>
  <slot />
</Tag>

<style is:global>
  .in-view { opacity: 1 !important; transform: translateY(0) !important; }
</style>

<script is:inline client:load>
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('in-view');
    });
  }, { threshold: 0.16 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    (el as HTMLElement).style.transitionDelay = `${(i % 8) * 40}ms`;
    observer.observe(el);
  });
</script>
```

Usage:

```astro
<RevealOnScroll class="grid gap-6">…</RevealOnScroll>
```

You can also wrap each card in `RevealOnScroll` to stagger.

---

## 11) Accessibility & Performance

- Alt text: auto-generated from filename; override with `data/ssot.ts` if
  needed.
- Modal is keyboard-dismissable (Esc): extend the event listener if desired.
- Images: Add sizes and consider Astro `<Image />` for optimization.
- Keep JS islands minimal (slider, modal, reveal).

---

## 12) Theming

- Adjust tones (gradients) per card via `tone` field.
- Global CSS variables allow easy color changes.
- Tailwind’s `container` utilities can be enabled if preferred.

---

## 13) Static Site Deployment (cPanel / xneelo)

### 13.1) Build the Site

```bash
# Build for production
npm run build

# This creates a `dist/` folder with all static files
# The dist/ folder contains:
# - index.html (home page)
# - what-we-do/index.html
# - look-book/index.html
# - assets/ (CSS, JS, images)
# - sitemap-index.xml (auto-generated)
# - robots.txt (from public/)
```

### 13.2) Deploy to cPanel

1. **Build locally**: Run `npm run build` to generate the `dist/` folder
2. **Access cPanel File Manager** or use FTP/SFTP
3. **Navigate to public_html** (or your domain's root directory)
4. **Upload contents**: Upload ALL contents from the `dist/` folder to
   `public_html/`
   - Ensure `index.html` is in the root
   - Ensure `robots.txt` is in the root
   - Ensure `sitemap-index.xml` is in the root
5. **Verify**: Visit your domain to confirm the site loads

**Important for cPanel**:

- Upload the **contents** of `dist/`, not the `dist/` folder itself
- The `index.html` should be directly in `public_html/`
- All assets should maintain their folder structure
- Astro generates clean URLs (e.g., `/what-we-do/` instead of
  `/what-we-do.html`), which work automatically
- If you need redirects or custom rules, create a `.htaccess` file in
  `public_html/`

### 13.3) Deploy to xneelo

1. **Build locally**: Run `npm run build` to generate the `dist/` folder
2. **Access xneelo File Manager** or use FTP/SFTP
3. **Navigate to `httpdocs`** (or `httpsdocs` for SSL) - this is your site root
4. **Upload contents**: Upload ALL contents from the `dist/` folder to
   `httpdocs/`
   - Ensure `index.html` is in the root
   - Ensure `robots.txt` is in the root
   - Ensure `sitemap-index.xml` is in the root
5. **Verify**: Visit your domain to confirm the site loads

**Important for xneelo**:

- Upload the **contents** of `dist/`, not the `dist/` folder itself
- The `index.html` should be directly in `httpdocs/` (or `httpsdocs/`)
- All assets should maintain their folder structure
- Astro generates clean URLs (e.g., `/what-we-do/` instead of
  `/what-we-do.html`), which work automatically
- If you need redirects or custom rules, create a `.htaccess` file in
  `httpdocs/` (or `httpsdocs/`)

### 13.4) Deployment Checklist

- [ ] Build completed successfully (`npm run build`)
- [ ] All files from `dist/` uploaded to hosting root
- [ ] `index.html` is in the root directory
- [ ] `robots.txt` is accessible at `/robots.txt`
- [ ] `sitemap-index.xml` is accessible at `/sitemap-index.xml`
- [ ] All images load correctly
- [ ] CSS and JS files load correctly
- [ ] Navigation links work
- [ ] SEO meta tags are present (view page source)
- [ ] Test on mobile devices

### 13.5) Updating the Site

When you need to update the site:

1. Make changes to source files in `src/`
2. Run `npm run build` to rebuild
3. Upload the new `dist/` contents to replace old files
4. Clear browser cache if needed

### 13.6) Contact Form for Static Sites

Since this is a static site, use one of these options for the contact form:

- **Formspree**: Add form action pointing to Formspree endpoint
- **Netlify Forms**: Works if using Netlify, but not for cPanel/xneelo
- **EmailJS**: Client-side email sending
- **Third-party service**: Typeform, Google Forms, etc.

Example with Formspree:

```astro
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

---

## 14) Next Steps

1. **Add design mockups**: Place all signed-off mockup images in the `mockups/`
   folder for reference during development.
2. Move the real copy and images from your mockups into `/src/assets`.
3. Fill out the rest of the `services` in `src/data/ssot.ts`.
4. Update `src/data/seo.ts` with your actual domain, social handles, and contact
   info.
5. Create OG images (1200x630px) for each page and place in `/public/`.
6. Add the contact form at `/#connect` using Formspree, EmailJS, or another
   static-friendly service.
7. Build the site: `npm run build`
8. Test locally: `npm run preview` (serves the `dist/` folder)
9. Upload `dist/` contents to cPanel/xneelo hosting
10. Test SEO with Google Search Console, Google Rich Results Test, and
    Lighthouse.
11. Submit sitemap to Google Search Console and Bing Webmaster Tools.
