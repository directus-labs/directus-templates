import { useDirectus } from '@/lib/directus/directus';
import BaseText from '@/components/Text';
import BlockButtonGroup from './ButtonGroup';
import Header from '@/components/Header';

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

	if (!block) return null;

	const { alignment, title, headline, description, image, button_group } = block;

	const backgroundImageUrl = image ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${image}` : null;

	return (
		<section
			className={`relative flex flex-col items-center justify-center w-screen min-h-[60vh]`}
			style={{
				backgroundImage: backgroundImageUrl
					? `linear-gradient(
                var(--gradient-overlay),
                var(--gradient-overlay)
              ), url('${backgroundImageUrl}')`
					: undefined,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className={`max-w-4xl ${alignment ? `text-${alignment}` : 'text-left'}`}>
				<Header title={title ?? null} headline={headline ?? null} />

				{description && (
					<BaseText content={description} align={alignment ?? 'left'} className="text-lg text-foreground mb-8" />
				)}

				{button_group?.id && (
					<div className={`mt-6 ${alignment === 'center' ? 'flex justify-center' : ''}`}>
						<BlockButtonGroup uuid={button_group.id} />
					</div>
				)}
			</div>
		</section>
	);
};

export default BlockHero;
