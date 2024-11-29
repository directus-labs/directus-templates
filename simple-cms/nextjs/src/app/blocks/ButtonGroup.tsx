import React from 'react';
import { useDirectus } from '@/lib/directus/directus';
import BlockButton from './Button';

interface BlockButtonGroupProps {
	uuid: string;
}

const BlockButtonGroup = async ({ uuid }: BlockButtonGroupProps) => {
	const { directus, readItem } = useDirectus();

	const group = await directus.request(
		readItem('block_button_group', uuid, {
			fields: [
				{
					buttons: ['id'],
				},
			],
		}),
	);

	if (!group || !group.buttons) return null;

	return (
		<div className="flex gap-4">
			{group.buttons.map((button: { id: string }) => (
				<BlockButton key={button.id} uuid={button.id} />
			))}
		</div>
	);
};

export default BlockButtonGroup;
