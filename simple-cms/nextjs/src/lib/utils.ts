import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names dynamically with Tailwind merge.
 *
 * @param inputs - The class names to combine
 * @returns A single string with combined class names
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
