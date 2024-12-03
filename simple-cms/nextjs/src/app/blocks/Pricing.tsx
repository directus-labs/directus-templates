import { useDirectus } from '@/lib/directus/directus';
import PricingCard from './PricingCard';
import Title from '@/components/Title';
import Headline from '@/components/Headline';

interface BlockPricingProps {
	uuid: string;
}

const BlockPricing = async ({ uuid }: BlockPricingProps) => {
	const { directus, readItem } = useDirectus();

	const pricing = await directus.request(
		readItem('block_pricing', uuid, {
			fields: [
				'title',
				'headline',
				{
					pricing_cards: ['id', 'title', 'description', 'price', 'badge', 'features', 'button', 'is_highlighted'],
				},
			],
		}),
	);

	if (!pricing || !pricing.pricing_cards || !Array.isArray(pricing.pricing_cards)) {
		return null;
	}

	return (
		<section className="space-y-2">
			{pricing.title && <Title title={pricing.title} />}

			{pricing.headline && <Headline headline={pricing.headline} />}

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{pricing.pricing_cards.map((card) => (
					<PricingCard key={card.id} card={card} />
				))}
			</div>
		</section>
	);
};

export default BlockPricing;
