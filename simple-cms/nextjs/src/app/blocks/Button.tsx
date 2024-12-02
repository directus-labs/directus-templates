import { useDirectus } from '@/lib/directus/directus';
import BaseButton from '@/components/Button';
import type { BlockButton as DirectusBlockButton } from '@/types/directus-schema';

interface BlockButtonProps {
	uuid: string;
}

const BlockButton = async ({ uuid }: BlockButtonProps) => {
	const { directus, readItem } = useDirectus();

	const button = await directus.request<DirectusBlockButton>(
		readItem('block_button', uuid, {
			fields: ['label', 'variant', 'url', 'type', { page: ['permalink'] }, { post: ['slug'] }],
		}),
	);

	if (!button) return null;

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

	return <BaseButton label={button.label || 'Untitled Button'} variant={button.variant} url={destination} />;
};

export default BlockButton;
