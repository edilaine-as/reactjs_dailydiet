/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";
export default {
	darkMode: ["class"],
	content: [
	'./pages/**/*.{ts,tsx}',
	'./components/**/*.{ts,tsx}',
	'./app/**/*.{ts,tsx}',
	'./src/**/*.{ts,tsx}',
	],
	
	theme: {
	extend: {
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		},
		colors: {
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))'
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))'
			},
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))'
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))'
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))'
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))'
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))'
			},
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			chart: {
				'1': 'hsl(var(--chart-1))',
				'2': 'hsl(var(--chart-2))',
				'3': 'hsl(var(--chart-3))',
				'4': 'hsl(var(--chart-4))',
				'5': 'hsl(var(--chart-5))'
			},
			custom: {
				gray: {
					100: '#EFF0F0',
					200: '#DDDEDF',
					500: '#333638',
					600: '#1B1D1E',
				},
				green: {
					200: '#E5F0DB',
					300: '#81C784',
					400: '#639339',
					600: '#009000',
				},
				red: {
					100: '#F3BABD',
					300: '#E57373',
					400: '#F44336',
					500: '#BF3B44',
					600: '#8B0000',
				}
			}
		}
	}
	},
	plugins: [tailwindcssAnimate],
}

