export const siteConfig = {
	name: "MGG",
	title: "MGG — Custom Technical & Staging Experiences",
	description:
		"Professional event production services including lighting design, sound engineering, staging, and technical solutions for corporate events, live shows, and custom experiences.",
	url: "https://www.mgg.co.za", // Replace with your actual domain
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
