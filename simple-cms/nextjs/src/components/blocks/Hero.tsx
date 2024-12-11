import Title from '@/components/Title';
import Headline from '@/components/Headline';
import BaseText from '@/components/Text';
import DirectusImage from '@/components/DirectusImage';
import ButtonGroup from '@/components/blocks/ButtonGroup';
import { cn } from '@/lib/utils';

interface BlockHeroProps {
	data: {
		title: string;
		headline: string;
		description: string;
		alignment: 'left' | 'center' | 'right';
		image: string;
		button_group?: {
			buttons: Array<{
				id: string;
				label: string | null;
				variant: string | null;
				url: string | null;
				type: 'url' | 'page' | 'post';
				pagePermalink?: string | null;
				postSlug?: string | null;
			}>;
		};
	};
}

const BlockHero = ({ data }: BlockHeroProps) => {
	const { alignment, title, headline, description, image, button_group } = data;

	return (
		<section
			className={cn(
				'relative w-full max-w-screen-lg mx-auto px-4 flex flex-col gap-6 md:gap-12 md:min-h-[60vh]',
				alignment === 'center'
					? 'items-center text-center'
					: alignment === 'right'
						? 'md:flex-row-reverse items-center'
						: 'md:flex-row items-center',
			)}
		>
			<div
				className={cn(
					'flex flex-col gap-4 w-full',
					alignment === 'center' ? 'md:w-1/2 items-center' : 'md:w-1/2 items-start',
				)}
			>
				<Title title={title} />
				<Headline headline={headline} />
				{description && <BaseText content={description} />}
				{button_group && button_group.buttons.length > 0 && (
					<div className={cn(alignment === 'center' && 'flex justify-center', 'mt-6')}>
						<ButtonGroup buttons={button_group.buttons} />
					</div>
				)}
			</div>
			{image && (
				<div className={cn('relative w-full', alignment === 'center' ? 'h-[400px]' : 'h-[562px]', 'md:w-1/2')}>
					<DirectusImage
						uuid={image}
						alt={title || 'Hero Image'}
						fill
						sizes={alignment === 'center' ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
					/>
				</div>
			)}
		</section>
	);
};

export default BlockHero;
