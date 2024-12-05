import { useDirectus } from '@/lib/directus/directus';
import BaseButton from '@/components/Button';
import type { BlockButton as DirectusBlockButton } from '@/types/directus-schema';

interface BlockButtonProps {
	uuid: string;
}

// Map Directus variants to ShadCN-compatible variants
const variantMapping: Record<string, string> = {
	solid: 'default',
	outline: 'outline',
	soft: 'secondary',
	ghost: 'ghost',
	link: 'link',
};

const BlockButton = async ({ uuid }: BlockButtonProps) => {
	const { directus, readItem } = useDirectus();

	const button = await directus.request<DirectusBlockButton>(
		readItem('block_button', uuid, {
			fields: ['label', 'variant', 'url', 'type', { page: ['permalink'] }, { post: ['slug'] }],
		}),
	);

	if (!button) return null;

	// Determine the button destination
	const destination = (() => {
		if (button.type === 'url') {
			return button.url || undefined;
		}

		if (button.type === 'page' && button.page && typeof button.page !== 'string') {
			return button.page.permalink;
		}

		if (button.type === 'post' && button.post && typeof button.post !== 'string') {
			return `/${button.post.slug}`;
		}

		return undefined;
	})();

	if (!destination) {
		console.warn(`BlockButton with uuid "${uuid}" has type "${button.type}" but no valid destination was found.`);
	}

	const variant = button.variant ? variantMapping[button.variant] : 'default';

	return <BaseButton label={button.label} variant={variant as any} url={destination} />;
};

export default BlockButton;
