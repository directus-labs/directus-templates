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

	const alignment = block.alignment || 'left';
	const alignmentClasses = alignment === 'left' ? 'text-left' : `text-${alignment}`;

	return (
		<div className={`rich-text-container space-y-4 mx-auto max-w-prose ${alignmentClasses}`}>
			<Title title={block.title} />
			<Headline headline={block.headline} />
			<BaseText content={block.content || ''} align={alignment} />
		</div>
	);
};

export default BlockRichText;
