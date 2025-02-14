import { DirectusFile } from '@/types/directus-schema';

export function getDirectusAssetURL(fileOrString: string | DirectusFile | null | undefined): string {
	if (!fileOrString) return '';

	if (typeof fileOrString === 'string') {
		return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${fileOrString}`;
	}

	return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${fileOrString.id}`;
}
