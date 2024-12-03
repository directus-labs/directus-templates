import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Button from './Button';
import type { BlockPricingCard } from '@/types/directus-schema';

interface PricingCardProps {
	card: BlockPricingCard;
}

const PricingCard = ({ card }: PricingCardProps) => {
	const { title, description, price, badge, features, button, is_highlighted } = card;

	return (
		<div className={`flex flex-col border rounded-lg p-6 ${is_highlighted ? 'border-accent ' : 'border-gray-300'}`}>
			<div className="flex justify-between items-center">
				{title && <h3 className="text-xl font-bold text-foreground">{title}</h3>}
				{badge && (
					<Badge variant={is_highlighted ? 'secondary' : 'default'} className="px-2 py-1 text-sm font-medium">
						{badge}
					</Badge>
				)}
			</div>

			{price && <p className="text-4xl font-bold text-foreground mt-4">{price}</p>}

			{description && <p className="text-foreground opacity-70 mt-2">{description}</p>}

			<Separator className="my-4" />

			{features && Array.isArray(features) && (
				<ul className="space-y-2">
					{features.map((feature: string, index: number) => (
						<li key={index} className="flex items-center gap-2 text-foreground">
							<span className="inline-block size-4 text-accent">✔</span> {feature}
						</li>
					))}
				</ul>
			)}

			<div className="mt-auto pt-4">{button && typeof button === 'string' && <Button uuid={button} />}</div>
		</div>
	);
};

export default PricingCard;
