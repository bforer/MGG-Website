export type ServiceItem = {
	slug: string;
	title: string;
	blurb: string;
	image: string; // Path to image in /public folder (e.g., /services/image.webp)
	bgColor: string; // Tailwind class for solid background color
};

export type OrganizationData = {
	name: string;
	url: string;
	logo: string;
	socialMedia: {
		facebook?: string;
		instagram?: string;
		linkedin?: string;
	};
	contact: {
		email?: string;
		telephone?: string;
	};
};

export const organization: OrganizationData = {
	name: "MGG",
	url: "https://www.mgg.co.za",
	logo: "/logo.png",
	socialMedia: {
		// Add social media URLs here when available
		// facebook: 'https://www.facebook.com/mgg',
		// instagram: 'https://www.instagram.com/mgg',
		// linkedin: 'https://www.linkedin.com/company/mgg',
	},
	contact: {
		// Add contact information here when available
		// email: 'info@mgg.co.za',
		// telephone: '+27-XX-XXX-XXXX',
	}
};

export const services: ServiceItem[] = [
	{
		slug: "lighting-design",
		title: "Lighting Design + Engineering.",
		blurb:
			"Designing and implementing an aesthetic and functional lighting plan that enhances the atmosphere and supports the event's objectives. Our team handles setup, programming, and functionality to create memorable visual experiences.",
		image: "/services/lighting.webp",
		bgColor: "bg-[#53267A]" // Deep purple
	},
	{
		slug: "sound-design",
		title: "Sound Design + Engineering.",
		blurb:
			"Selecting microphones, speakers, effects, and audio processing equipment to deliver crystal-clear sound. Our engineers handle setup, calibration, and troubleshooting for optimal sound quality across all event types.",
		image: "/services/sound-design.webp",
		bgColor: "bg-[#1B3E5C]" // Dark green
	},
	{
		slug: "led-design",
		title: "LED Design.",
		blurb:
			"Integrating LED displays and video walls seamlessly into event designs. We provide custom LED solutions that enhance visual storytelling and create immersive experiences for audiences.",
		image: "/services/led-design.webp",
		bgColor: "bg-[#74462D]" // Dark brown/bronze
	},
	{
		slug: "video-engineering",
		title: "Video Engineering.",
		blurb:
			"Professional video production and engineering services including camera setup, live switching, streaming, and projection mapping to deliver high-quality visual content for your event.",
		image: "/services/video-engineering.webp",
		bgColor: "bg-[#5F8120]" // Dark green
	},
	{
		slug: "custom-content-playback",
		title: "Custom Content Playback.",
		blurb:
			"Creating and managing custom video content, graphics, and multimedia presentations. Our team ensures seamless playback and synchronization across all display systems.",
		image: "/services/custom-content.webp",
		bgColor: "bg-[#6B1212]" // Deep red/maroon
	},
	{
		slug: "projection",
		title: "Projection.",
		blurb:
			"Large-scale projection mapping and projection services that transform surfaces into dynamic visual canvases. We create immersive environments through advanced projection technology.",
		image: "/services/projection.webp",
		bgColor: "bg-[#2D746D]" // Dark blue
	},
	{
		slug: "stage-design-build",
		title: "Stage Design + Build.",
		blurb:
			"Custom stage design and construction services that bring your vision to life. From concept to completion, we build stages that are both functional and visually stunning.",
		image: "/services/stage-design.webp",
		bgColor: "bg-[#9E9900]" // Light green/olive
	},
	{
		slug: "structure-design-build",
		title: "Structure Design + Build.",
		blurb:
			"Designing and building safe, certified structures for events of all scales. Our engineering team ensures all structures meet the highest safety standards and regulations.",
		image: "/services/structure-design.webp",
		bgColor: "bg-[#634D64]" // Dark blue/grey
	},
	{
		slug: "technical-drafting-weight-calculation",
		title: "Technical Drafting + Weight Calculation.",
		blurb:
			"Precise technical drawings and weight calculations for rigging and structural installations. Our detailed planning ensures safety and compliance with all regulations.",
		image: "/services/technical-drafting.webp",
		bgColor: "bg-[#A24512]" // Dark orange/brown
	}
];
