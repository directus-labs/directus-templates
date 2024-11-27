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
			},
			fontSize: {
				sm: ['0.875rem', '1.25rem'], // 14px / 20px line height
				base: ['1rem', '1.5rem'], // 16px / 24px line height
				lg: ['1.125rem', '1.75rem'], // 18px / 28px line height
				xl: ['1.5rem', '2rem'], // 24px / 32px line height
				'2xl': ['1.875rem', '2.25rem'], // 30px / 36px line height
				'3xl': ['2.25rem', '2.5rem'], // 36px / 40px line height
				'4xl': ['3rem', '1'], // 48px / line height 1
				'5xl': ['3.5rem', '4rem'], // 56px / 64px line height
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			colors: {
				background: 'var(--background-color)',
				foreground: 'var(--foreground-color)',
				accent: 'var(--accent-color)',
				gray: '#F5F8FB',
				black: '#000000',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
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
						blockquote: {
							fontStyle: 'italic',
							color: 'var(--foreground-color)',
							borderLeft: '4px solid var(--gray)',
							paddingLeft: '1rem',
						},
						code: {
							backgroundColor: 'var(--gray)',
							padding: '0.25rem 0.5rem',
							borderRadius: '4px',
						},
						ul: {
							textAlign: 'left',
							marginLeft: '1.25rem',
							listStyleType: 'disc',
						},
						'ol > li::marker': {
							color: '#4B5563',
						},
						'ul > li::marker': {
							color: '#4B5563',
							fontSize: '1.25em',
						},
						ol: {
							textAlign: 'left',
							marginLeft: '1.25rem',
						},
					},
				},
				dark: {
					css: {
						color: 'var(--foreground-color)',
						blockquote: {
							color: 'var(--foreground-color)',
							borderLeft: '4px solid var(--gray)',
						},
						code: {
							backgroundColor: '#1f2937',
						},
						'ul > li::marker': {
							color: '#D1D5DB',
							fontSize: '1.25em',
						},
						'ol > li::marker': {
							color: '#D1D5DB',
						},
					},
				},
			},
		},
	},
	plugins: [tailwindcssAnimate, typography],
};

export default config;
