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
			lastmod: new Date()
		})
	]
});
