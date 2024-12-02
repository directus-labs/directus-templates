import { useDirectus } from '@/lib/directus/directus';
import BaseText from '@/components/Text';
import Title from '@/components/Title';
import Headline from '@/components/Headline';
import type { BlockRichtext as DirectusBlockRichText } from '@/types/directus-schema';

interface BlockRichTextProps {
	uuid: string;
}

const BlockRichText = async ({ uuid }: BlockRichTextProps) => {
	const { directus, readItem } = useDirectus();

	const block = await directus.request<DirectusBlockRichText>(
		readItem('block_richtext', uuid, {
			fields: ['title', 'headline', 'content', 'alignment'],
		}),
	);

	if (!block) return null;

	return (
		<div className={`rich-text-container space-y-4 ${block.alignment ? `text-${block.alignment}` : 'text-left'}`}>
			<Title title={block.title} className={block.alignment ? `text-${block.alignment}` : ''} />
			<Headline headline={block.headline} className={block.alignment ? `text-${block.alignment}` : ''} />
			<BaseText content={block.content || ''} align={block.alignment || 'left'} />
		</div>
	);
};

export default BlockRichText;
