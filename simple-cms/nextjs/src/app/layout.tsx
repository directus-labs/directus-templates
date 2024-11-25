import '@/styles/globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Poppins, Inter } from 'next/font/google';
import { useDirectus } from '@/lib/directus';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-poppins',
});

const inter = Inter({
	subsets: ['latin'],
	weight: ['400', '500', '600'],
	variable: '--font-inter',
});

export const metadata: Metadata = {
	title: 'Simple CMS',
	description: 'A starter CMS template powered by Next.js and Directus.',
	icons: {
		icon: '/favicon.ico',
	},
};

async function fetchAccentColor() {
	const { directus, readSingleton } = useDirectus();

	try {
		const globals = await directus.request(readSingleton('globals', { fields: ['accent_color'] }));

		return globals.accent_color || '#6644FF';
	} catch (error) {
		console.error('Error fetching accent color:', error);

		return '#6644FF';
	}
}

const Layout = async ({ children }: { children: ReactNode }) => {
	const accentColor = await fetchAccentColor();

	return (
		<html suppressHydrationWarning lang="en" className={`${poppins.variable} ${inter.variable}`}>
			<head>
				<style>{`:root { --accent-color: ${accentColor}; }`}</style>
			</head>
			<body className="bg-background text-foreground antialiased">
				<ThemeProvider attribute="class">
					<Header />
					<main className="min-h-screen">{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
};

export default Layout;
