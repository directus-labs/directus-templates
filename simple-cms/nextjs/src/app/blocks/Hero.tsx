import { useDirectus } from '@/lib/directus/directus';
import BaseText from '@/components/Text';
import BlockButtonGroup from './ButtonGroup';
import Title from '@/components/Title';
import Headline from '@/components/Headline';
import DirectusImage from '@/components/DirectusImage';

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

	return (
		<section
			className={`relative w-full items-center min-h-[60vh] flex flex-col ${
				alignment === 'center' ? 'items-center text-center' : 'md:flex-row'
			} ${alignment === 'right' ? 'md:flex-row-reverse' : ''} gap-6`}
		>
			<div
				className={`w-full ${
					alignment === 'center' ? 'md:w-1/2' : 'md:w-1/2 text-left'
				} flex flex-col justify-center gap-4`}
			>
				<Title title={title} />
				<Headline headline={headline} />
				{description && (
					<BaseText
						content={description}
						align={alignment === 'center' ? 'center' : 'left'}
						className="text-lg text-foreground"
					/>
				)}
				{button_group?.id && (
					<div className={`mt-6 ${alignment === 'center' ? 'flex justify-center' : ''}`}>
						<BlockButtonGroup uuid={button_group.id} />
					</div>
				)}
			</div>

			{image && (
				<div className={`w-full h-[562px] ${alignment === 'center' ? 'md:max-w-2xl mx-auto' : 'md:w-1/2'} relative`}>
					<DirectusImage
						uuid={image as string}
						alt={title || 'Hero Image'}
						className="rounded-lg"
						fill
						priority
						sizes="(max-width: 768px) 100vw, 50vw"
					/>
				</div>
			)}
		</section>
	);
};

export default BlockHero;
