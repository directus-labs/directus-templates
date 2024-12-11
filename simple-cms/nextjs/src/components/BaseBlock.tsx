import BlockRichText from '@/components/blocks/RichText';
import BlockHero from '@/components/blocks/Hero';
import BlockGallery from '@/components/blocks/Gallery';
import BlockPricing from '@/components/blocks/Pricing';

interface BaseBlockProps {
	block: {
		collection: string;
		item: any;
	};
}

const BaseBlock = ({ block }: BaseBlockProps) => {
	const components: Record<string, React.ElementType> = {
		block_hero: BlockHero,
		block_richtext: BlockRichText,
		block_gallery: BlockGallery,
		block_pricing: BlockPricing,
	};

	const Component = components[block.collection];

	if (!Component) {
		return null;
	}

	return <Component data={block.item} />;
};

export default BaseBlock;
