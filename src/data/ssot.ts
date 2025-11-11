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
