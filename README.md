# MGG Astro + Tailwind

Production-ready starter to recreate the new **MGG** website built on **Astro**
with **Tailwind**, **SplideJS**, a data-driven “What we do” grid, a folder-fed
**Look Book** gallery with a **modal**, and lightweight **scroll reveal**
animations.

> Font: **Helvetica Neue** (system stack fallbacks in Tailwind)

---

## Quick Start

**Important**: Create the Astro site in the **project root directory** (not in a
subdirectory).

```bash
# 1) Create the project in current directory (project root)
npm create astro@latest . -- --template basics

# 2) Install deps
npm i -D @astrojs/tailwind tailwindcss typescript
npm i @splidejs/splide
npm i @astrojs/sitemap

# 3) Add/replace the files from this repo/spec
#    (astro.config.mjs, tailwind.config.mjs, components, pages, data, assets)

# 4) Dev
npm run dev

# 5) Build
npm run build && npm run preview
```

---

## Key Files

- `src/data/ssot.ts` — **Single Source of Truth** for “What we do”
- `src/components/HeroSplide.astro` — Splide hero slider
- `src/components/WhatWeDoGrid.astro` — Card grid (colors via `tone` per item)
- `src/components/GalleryGrid.astro` — Look Book, fed by `/src/assets/lookbook`
  using `import.meta.glob`
- `src/components/RevealOnScroll.astro` — IntersectionObserver utility
- `src/pages/index.astro` — Home page
- `src/pages/what-we-do.astro` — What we do
- `src/pages/look-book.astro` — Look Book
- `src/layouts/BaseLayout.astro` — Shared shell

---

## SSOT Example

```ts
export type ServiceItem = {
	slug: string;
	title: string;
	blurb: string;
	image: string; // e.g., '/src/assets/what/lighting.jpg'
	tone: string; // e.g., 'from-purple-600/60'
};

export const services: ServiceItem[] = [
	{
		slug: "lighting-design",
		title: "Lighting Design + Engineering.",
		blurb: "…",
		image: "/src/assets/what/lighting.jpg",
		tone: "from-purple-600/60"
	},
	{
		slug: "sound-design",
		title: "Sound Design + Engineering.",
		blurb: "…",
		image: "/src/assets/what/sound.jpg",
		tone: "from-indigo-600/60"
	}
];
```

---

## Gallery Usage

- Drop images into `src/assets/lookbook/` (JPG/PNG/WEBP).
- They automatically appear on `/look-book`.
- Clicking opens a **modal** (Esc/overlay to close).

---

## Styling & Fonts

Tailwind `fontFamily.sans` is set to:

```js
[
	'"Helvetica Neue"',
	"Helvetica",
	"Arial",
	"ui-sans-serif",
	"system-ui",
	"sans-serif"
];
```

---

## Animations

`RevealOnScroll.astro` uses `IntersectionObserver` to toggle `.in-view`. Wrap
any block or card with it for a smooth, modern reveal.

---

## Deployment

- Build: `npm run build` (creates `dist/` folder with static files)
- **Static Site**: Designed for **cPanel** or **xneelo** hosting
  - Upload contents of `dist/` folder to `public_html/` (cPanel) or `httpdocs/`
    (xneelo)
  - See `PROJECT_SPEC.md` section 13 for detailed deployment instructions
- Also works with **Vercel** or **Netlify**
- Consider Astro Image for responsive images and better Lighthouse scores

---

## License

Use freely on the MGG project.
