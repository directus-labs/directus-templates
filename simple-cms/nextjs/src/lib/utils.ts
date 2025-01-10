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
