import {defineConfig} from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: "https://www.mgg.co.za", // Replace with your actual domain
	output: "static", // Explicitly set to static (default, but good to be explicit for cPanel/xneelo)
	integrations: [
		tailwind(),
		sitemap({
			changefreq: "weekly",
			priority: 0.7,
			lastmod: new Date(),
			serialize(item) {
				// Set higher priority for homepage
				if (item.url === "https://www.mgg.co.za/") {
					return {
						...item,
						priority: 1.0,
						changefreq: "weekly"
					};
				}
				// Set medium-high priority for main pages
				if (
					item.url.includes("/what-we-do") ||
					item.url.includes("/look-book") ||
					item.url.includes("/lets-connect")
				) {
					return {
						...item,
						priority: 0.8,
						changefreq: "weekly"
					};
				}
				// Default for other pages
				return item;
			}
		})
	]
});
