import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Metadata } from 'next';

/**
 * Combines class names dynamically with Tailwind merge.
 *
 * @param inputs - The class names to combine
 * @returns A single string with combined class names
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Native debounce utility
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | null;

	return (...args: Parameters<T>) => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
}

/**
 * Generates metadata for a page or post.
 *
 * @param pageTitle Page-specific or post-specific title
 * @param pageDescription Page-specific or post-specific description
 * @param resolvedPermalink Resolved permalink for the current page or post
 * @param ogImage Optional Open Graph image URL
 * @returns Metadata object for the page or post
 */
export function generatePageMetadata({
	pageTitle,
	pageDescription,
	resolvedPermalink,
	ogImage,
}: {
	pageTitle: string | null;
	pageDescription?: string | null;
	resolvedPermalink: string;
	ogImage?: string | null;
}): Metadata {
	return {
		title: pageTitle || 'Default Title',
		description: pageDescription || undefined,
		openGraph: {
			title: pageTitle || 'Default Title',
			description: pageDescription || undefined,
			url: `${process.env.NEXT_PUBLIC_SITE_URL}${resolvedPermalink}`,
			type: 'website',
			images: ogImage ? [{ url: ogImage }] : undefined,
		},
	};
}
