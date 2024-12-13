import '@/styles/globals.css';
import '@/styles/fonts.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import NavigationBar from '@/components/layout/NavigationBar';

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
					<NavigationBar />
					<main className="min-h-screen px-2 md:px-8 lg:px-16">{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
