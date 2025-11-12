/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'"helvetica-neue-lt-pro"',
					'"Helvetica Neue"',
					"Helvetica",
					"Arial",
					"ui-sans-serif",
					"system-ui",
					"sans-serif"
				]
			},
			colors: {
				"brand-yellow": "#FFD700"
			}
		}
	},
	plugins: []
};
