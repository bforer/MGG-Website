export const siteConfig = {
	name: "MGG",
	title: "MGG — Custom Technical & Staging Experiences",
	description:
		"Professional event production services including lighting design, sound design, LED design, video, projection, fabrication, and technical staging solutions for corporate events, live shows, and custom experiences. Serving Johannesburg, Cape Town, and South Africa.",
	url: "http://localhost:4321",
	ogImage: "/og-image.jpg", // 1200x630px recommended
	twitterHandle: "@MGG",
	locale: "en_ZA", // South Africa locale
	type: "website",
	keywords: [
		"event production",
		"technical staging",
		"lighting design",
		"sound design",
		"LED design",
		"video production",
		"custom content playback",
		"projection mapping",
		"fabrication design",
		"structure design",
		"technical drafting",
		"power management",
		"event management",
		"corporate events",
		"live shows",
		"Johannesburg events",
		"Cape Town events",
		"South Africa events",
		"MGG Productions",
		"technical production",
		"staging solutions",
		"audiovisual equipment",
		"event technical services"
	],
	author: "MGG Productions",
	geo: {
		region: "ZA",
		placename: "South Africa",
		position: {
			latitude: -26.083389, // Johannesburg coordinates (primary)
			longitude: 28.118846
		}
	}
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
