import clsx from 'clsx';
import BlockRichText from './RichText';
import BlockHero from './Hero';
import BlockGallery from './Gallery';
import BlockPricing from './Pricing';

interface BaseBlockProps {
	type: string;
	uuid: string;
}

const BaseBlock = ({ type, uuid }: BaseBlockProps) => {
	const components: Record<string, React.ElementType> = {
		block_richtext: BlockRichText,
		block_hero: BlockHero,
		block_gallery: BlockGallery,
		block_pricing: BlockPricing,
		block_form: () => <div>Form Block Temp Placeholder</div>,
	};

	const Component = components[type];

	if (!Component) {
		return;
	}

	return (
		<div className={clsx('block-container bg-background text-foreground p-4')}>
			<Component uuid={uuid} />
		</div>
	);
};

export default BaseBlock;
