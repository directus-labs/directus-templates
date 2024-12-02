import { useDirectus } from '@/lib/directus/directus';
import BlockButton from './Button';
import type { BlockButtonGroup as DirectusBlockButtonGroup } from '@/types/directus-schema';

interface BlockButtonGroupProps {
	uuid: string;
}

const BlockButtonGroup = async ({ uuid }: BlockButtonGroupProps) => {
	const { directus, readItem } = useDirectus();

	const group = await directus.request<DirectusBlockButtonGroup & { buttons: { id: string }[] }>(
		readItem('block_button_group', uuid, {
			fields: [
				{
					buttons: ['id'],
				},
			],
		}),
	);

	if (!group || !group.buttons?.length) return null;

	return (
		<div className="flex gap-4">
			{group.buttons.map((button) => (
				<BlockButton key={button.id} uuid={button.id} />
			))}
		</div>
	);
};

export default BlockButtonGroup;
