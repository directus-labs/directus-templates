import React from 'react';
import { useDirectus } from '@/lib/directus/directus';
import BaseText from '../../components/Text';
import BlockButtonGroup from './ButtonGroup';

interface BlockHeroProps {
	uuid: string;
}

const BlockHero = async ({ uuid }: BlockHeroProps) => {
	const { directus, readItem } = useDirectus();

	const block = await directus.request(
		readItem('block_hero', uuid, {
			fields: ['title', 'headline', 'description', 'alignment', 'image', { button_group: ['id'] }],
		}),
	);

	const alignment = block.alignment ?? 'start';
	const normalizedAlign = alignment === 'left' ? 'start' : alignment === 'center' ? 'center' : 'start';

	const backgroundImageUrl = block.image
		? encodeURI(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${block.image}`)
		: null;

	return (
		<section
			className="relative flex flex-col items-center justify-center w-full min-h-[60vh] p-6 md:p-10"
			style={{
				backgroundImage: backgroundImageUrl ? `url('${backgroundImageUrl}')` : undefined,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div
				className={`max-w-4xl ${
					normalizedAlign === 'start' ? 'text-left' : normalizedAlign === 'center' ? 'text-center' : ''
				}`}
			>
				{block.title && <h1 className="text-4xl font-heading text-accent mb-4">{block.title}</h1>}
				{block.headline && <h2 className="text-3xl font-heading text-foreground mb-6">{block.headline}</h2>}
				{block.description && (
					<BaseText content={block.description} align={normalizedAlign} className="text-lg text-foreground/80 mb-8" />
				)}
				{block.button_group?.id && (
					<div className={`mt-6 ${normalizedAlign === 'center' ? 'flex justify-center' : ''}`}>
						<BlockButtonGroup uuid={block.button_group.id} />
					</div>
				)}
			</div>
		</section>
	);
};

export default BlockHero;
