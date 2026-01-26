export type ServiceItem = {
	slug: string;
	title: string;
	blurb: string;
	image: string; // Path to image in /public folder (e.g., /services/image.webp)
	bgColor: string; // Tailwind class for solid background color
};

export type StaffMember = {
	name: string;
	role: string;
	email: string;
	cell: string;
};

export type BranchData = {
	name: string;
	location: {
		address: string[];
		gpsCoordinates?: {
			latitude: number;
			longitude: number;
		};
	};
	contact: {
		landline?: string;
		email?: string;
		staff: StaffMember[];
	};
	companyInfo: {
		postalAddress?: string;
		vat?: string;
		registration?: string;
	};
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
	branches: {
		johannesburg: BranchData;
		capeTown: BranchData;
	};
};

export const organization: OrganizationData = {
	name: "MGG",
	url: "http://localhost:4321",
	logo: "/brand/mgg-logo.webp",
	socialMedia: {
		// Add social media URLs here when available
		facebook: "https://www.facebook.com/MGGprod",
		instagram: "https://www.instagram.com/mgg_productions/",
		linkedin: "https://www.linkedin.com/company/mgg-productions/"
	},
	contact: {
		// Add contact information here when available
		// email: 'info@mgg.co.za',
		// telephone: '+27-XX-XXX-XXXX',
	},
	branches: {
		johannesburg: {
			name: "Johannesburg",
			location: {
				address: [
					"Unit A Linbro Crossing",
					"12 3rd Road, Linbro Park",
					"Marlboro",
					"Gauteng, 2065"
				],
				gpsCoordinates: {
					latitude: -26.083389,
					longitude: 28.118846
				}
			},
			contact: {
				landline: "011 608 4094",
				email: "info@mgg.co.za",
				staff: []
			},
			companyInfo: {
				postalAddress: "PO Box 79588, Senderwood, 2145",
				vat: "4720191610",
				registration: "2015/105314/07"
			}
		},
		capeTown: {
			name: "Cape Town",
			location: {
				address: [
					"Unit 1 Concorde Park",
					"Concorde Crescent",
					"Airport City, 7490"
				],
				gpsCoordinates: {
					latitude: -33.924868,
					longitude: 18.424055
				}
			},
			contact: {
				landline: "021 815 9880",
				email: "info@mgg.co.za",
				staff: []
			},
			companyInfo: {}
		}
	}
};

export const services: ServiceItem[] = [
	{
		slug: "lighting-design",
		title: "Lighting Design.",
		blurb:
			"Designing and implementing an aesthetic and functional lighting plan that enhances the atmosphere and supports the event's objectives. Our team handles setup, programming, and functionality to create memorable visual experiences.",
		image: "/services/lighting.webp",
		bgColor: "bg-[#53267A]" // Deep purple
	},
	{
		slug: "sound-design",
		title: "Sound Design.",
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
		slug: "video",
		title: "Video.",
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
		slug: "fabrication-design-installation",
		title: "Fabrication Design + Installation.",
		blurb:
			"Bespoke stage, exhibition, and museum display environments, meticulously designed and fabricated from concept to completion. We create refined, high impact spaces where form meets function.",
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
	},
	{
		slug: "power-management-distribution",
		title: "Power Management + Distribution.",
		blurb:
			"Planning and managing power for lighting, sound, video, LED displays, and other systems, ensuring a reliable supply and load balance. Distributing power safely, setting up panels, running cables, and connecting to generators or the grid, while ensuring circuit protection and compliance with standards.",
		image: "/services/power-management.webp",
		bgColor: "bg-[#000000]" // Dark orange/brown
	}
];
