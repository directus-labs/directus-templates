import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';
import typography from '@tailwindcss/typography';

const config: Config = {
	darkMode: 'class',
	content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				heading: ['Poppins', 'sans-serif'],
				sans: ['Inter', 'sans-serif'],
				code: ['Fira Mono', 'monospace'],
			},
			fontSize: {
				title: ['24px', '33.6px'], // Title
				headline: ['56px', '78.4px'], // Headline
				h1: ['56px', '78.4px'], // Heading 1
				h2: ['36px', '50.4px'], // Heading 2
				h3: ['24px', '33.6px'], // Heading 3
				description: ['16px', '22.4px'], // Description
				regular: ['16px', '24px'], // Regular text
				bold: ['16px', '22.4px'], // Bolded text
				nav: ['16px', '22.4px'], // Navbar link
				code: ['14px', '16.8px'], // Code snippet
			},
			alignments: {
				left: 'text-left',
				center: 'text-center',
				right: 'text-right',
			},
			colors: {
				background: 'var(--background-color)',
				foreground: 'var(--foreground-color)',
				primary: 'var(--accent-color-light)',
				secondary: 'var(--accent-color-dark)',
				accent: 'var(--accent-color)',
				soft: 'var(--accent-color-soft)',
				blue: {
					DEFAULT: '#172940',
				},
				gray: {
					DEFAULT: '#F5F8FB',
					muted: '#A5B0BD',
					dark: '#42566E',
				},
			},
			typography: {
				DEFAULT: {
					css: {
						color: 'var(--foreground-color)',
						textAlign: 'left',
						a: {
							color: 'var(--accent-color)',
							textDecoration: 'none',
							'&:hover': {
								textDecoration: 'underline',
							},
						},
						h1: {
							fontFamily: 'Poppins',
							fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
							fontWeight: '400',
							lineHeight: '1.2',
							marginTop: '1rem',
						},
						h2: {
							fontFamily: 'Poppins',
							fontSize: 'clamp(2rem, 4vw, 2.5rem)',
							fontWeight: '400',
							lineHeight: '1.3',
							marginTop: '1rem',
						},
						h3: {
							fontFamily: 'Poppins',
							fontSize: 'clamp(1.5rem, 3vw, 2rem)',
							fontWeight: '400',
							lineHeight: '1.4',
							marginTop: '0',
						},
						p: {
							fontFamily: 'Inter',
							fontSize: 'clamp(1rem, 2vw, 1.25rem)',
							fontWeight: '400',
							lineHeight: '1.75',
						},
						img: {
							borderRadius: '8px',
							margin: '1rem 0',
							maxWidth: '100%',
							height: 'auto',
						},
						iframe: {
							borderRadius: '8px',
							margin: '1rem 0',
						},
						code: {
							fontFamily: 'Fira Mono',
							fontSize: '0.875rem',
							fontWeight: '500',
							lineHeight: '1.4',
							backgroundColor: 'var(--gray-100)',
							padding: '0.25rem 0.5rem',
							borderRadius: '4px',
							textAlign: 'left',
						},
						blockquote: {
							fontStyle: 'italic',
							borderLeft: '4px solid var(--accent-color)',
							paddingLeft: '1rem',
							textAlign: 'left',
						},
						ul: {
							listStyleType: 'disc',
							paddingLeft: '1.25rem',
							listStylePosition: 'inside',
						},
						ol: {
							listStyleType: 'decimal',
							paddingLeft: '1.25rem',
							listStylePosition: 'inside',
						},
						li: {
							marginBottom: '0.5rem',
						},
					},
				},
				dark: {
					css: {
						color: 'var(--foreground-color)',
						a: {
							color: 'var(--accent-color)',
							textDecoration: 'none',
							'&:hover': {
								textDecoration: 'underline',
							},
						},
						blockquote: {
							borderLeftColor: 'var(--gray-700)',
						},
						code: {
							backgroundColor: '#1f2937',
						},
					},
				},
			},
		},
	},
	plugins: [tailwindcssAnimate, typography],
};

export default config;
