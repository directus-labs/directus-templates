'use client';
import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

const ThemeContext = createContext({ theme: 'light', setTheme: (theme: string) => {} });

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
	const [theme, setTheme] = useState('light');
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme');
		const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		setTheme(storedTheme || systemTheme);
		setMounted(true);
	}, []);

	useEffect(() => {
		if (mounted) {
			document.documentElement.classList.remove('light', 'dark');
			document.documentElement.classList.add(theme);
			localStorage.setItem('theme', theme);
		}
	}, [theme, mounted]);

	if (!mounted) {
		return null;
	}

	return (
		<NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange {...props}>
			{children}
		</NextThemesProvider>
	);
}
export const useTheme = () => useContext(ThemeContext);
