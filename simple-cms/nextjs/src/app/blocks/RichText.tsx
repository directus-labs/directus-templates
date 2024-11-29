import React from 'react';
import { useDirectus } from '@/lib/directus/directus';
import BaseText from '../../components/Text';

interface BlockRichTextProps {
	uuid: string;
}

const BlockRichText = async ({ uuid }: BlockRichTextProps) => {
	const { directus, readItem } = useDirectus();

	const block = await directus.request(
		readItem('block_richtext', uuid, {
			fields: ['title', 'headline', 'content', 'alignment'],
		}),
	);

	const normalizedAlign = block.alignment === 'left' ? 'start' : block.alignment === 'center' ? 'center' : 'start';

	return (
		<div className="rich-text-container space-y-4">
			{block.title && (
				<h1
					className={`text-2xl text-accent font-heading ${
						normalizedAlign === 'start' ? 'text-left' : normalizedAlign === 'center' ? 'text-center' : ''
					}`}
				>
					{block.title}
				</h1>
			)}
			{block.headline && (
				<h2
					className={`text-3xl text-foreground font-heading ${
						normalizedAlign === 'start' ? 'text-left' : normalizedAlign === 'center' ? 'text-center' : ''
					}`}
				>
					{block.headline}
				</h2>
			)}
			<BaseText content={block.content || ''} align={normalizedAlign} />
		</div>
	);
};

export default BlockRichText;
