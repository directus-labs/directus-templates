import BlockRichText from '@/components/blocks/RichText';
import BlockHero from '@/components/blocks/Hero';
import BlockGallery from '@/components/blocks/Gallery';
import BlockPricing from '@/components/blocks/Pricing';
import BlockPosts from '@/components/blocks/Posts';

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
		block_posts: BlockPosts,
	};

	const Component = components[block.collection];

	if (!Component) {
		return null;
	}

	return <Component data={block.item} />;
};

export default BaseBlock;
