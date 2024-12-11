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
						a: {
							color: 'var(--accent-color)',
							textDecoration: 'none',
							'&:hover': {
								textDecoration: 'underline',
							},
						},
						h1: {
							fontFamily: 'Poppins',
							fontSize: '56px',
							fontWeight: '400',
							lineHeight: '78.4px',
							marginTop: '1rem',
						},
						h2: {
							fontFamily: 'Poppins',
							fontSize: '36px',
							fontWeight: '400',
							lineHeight: '50.4px',
							marginTop: '1rem',
						},
						h3: {
							fontFamily: 'Poppins',
							fontSize: '24px',
							fontWeight: '400',
							lineHeight: '33.6px',
							marginTop: '0',
						},
						p: {
							fontFamily: 'Inter',
							fontSize: '16px',
							fontWeight: '400',
							lineHeight: '24px',
						},
						code: {
							fontFamily: 'Fira Mono',
							fontSize: '14px',
							fontWeight: '500',
							lineHeight: '16.8px',
							backgroundColor: 'var(--gray-100)',
							padding: '0.25rem 0.5rem',
							borderRadius: '4px',
						},
						blockquote: {
							fontStyle: 'italic',
							borderLeft: '4px solid var(--accent-color)',
							paddingLeft: '1rem',
							textAlign: 'left',
						},
						ul: {
							fontFamily: 'Inter',
							fontSize: '16px',
							fontWeight: '400',
							lineHeight: '24px',
							listStyleType: 'disc',
							paddingLeft: '1.25rem',
							listStylePosition: 'inside',
						},
						ol: {
							fontFamily: 'Inter',
							fontSize: '16px',
							fontWeight: '400',
							lineHeight: '24px',
							listStyleType: 'decimal',
							paddingLeft: '1.25rem',
							listStylePosition: 'inside',
						},
						li: {
							marginBottom: '0.5rem',
							paddingLeft: '0',
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
