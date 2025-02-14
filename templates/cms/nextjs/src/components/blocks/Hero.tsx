import Tagline from '../ui/Tagline';
import Headline from '@/components/ui/Headline';
import BaseText from '@/components/ui/Text';
import DirectusImage from '@/components/shared/DirectusImage';
import ButtonGroup from '@/components/blocks/ButtonGroup';
import { cn } from '@/lib/utils';

interface HeroProps {
	data: {
		tagline: string;
		headline: string;
		description: string;
		layout: 'left' | 'center' | 'right';
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

const Hero = ({ data }: HeroProps) => {
	const { layout, tagline, headline, description, image, button_group } = data;

	return (
		<section
			className={cn(
				'relative w-full mx-auto flex flex-col gap-6 md:gap-12',
				layout === 'center'
					? 'items-center text-center'
					: layout === 'right'
						? 'md:flex-row-reverse items-center'
						: 'md:flex-row items-center',
			)}
		>
			<div
				className={cn(
					'flex flex-col gap-4 w-full',
					layout === 'center' ? 'md:w-3/4 xl:w-2/3 items-center' : 'md:w-1/2 items-start',
				)}
			>
				<Tagline tagline={tagline} />
				<Headline headline={headline} />
				{description && <BaseText content={description} />}
				{button_group && button_group.buttons.length > 0 && (
					<div className={cn(layout === 'center' && 'flex justify-center', 'mt-6')}>
						<ButtonGroup buttons={button_group.buttons} />
					</div>
				)}
			</div>
			{image && (
				<div
					className={cn('relative w-full', layout === 'center' ? 'md:w-3/4 xl:w-2/3 h-[400px]' : 'md:w-1/2 h-[562px]')}
				>
					<DirectusImage
						uuid={image}
						alt={tagline || headline || 'Hero Image'}
						fill
						sizes={layout === 'center' ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
						className="object-contain"
					/>
				</div>
			)}
		</section>
	);
};

export default Hero;
