import React from 'react';
import { useDirectus } from '@/lib/directus/directus';
import BaseButton from '@/components/Button';

interface BlockButtonProps {
	uuid: string;
}

const BlockButton = async ({ uuid }: BlockButtonProps) => {
	const { directus, readItem } = useDirectus();

	const button = await directus.request(
		readItem('block_button', uuid, {
			fields: ['id', 'label', 'variant', 'url', 'type'],
		}),
	);

	if (!button) return null;

	return <BaseButton label={button.label} variant={button.variant} url={button.url} />;
};

export default BlockButton;
