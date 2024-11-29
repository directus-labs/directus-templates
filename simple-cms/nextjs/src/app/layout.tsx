import '@/styles/globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ui/ThemeProvider';

export const metadata: Metadata = {
	title: 'Simple CMS',
	description: 'A starter CMS template powered by Next.js and Directus.',
	icons: {
		icon: '/favicon.ico',
	},
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="antialiased font-sans">
				<ThemeProvider>
					<Header />
					<main className="min-h-screen">{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
