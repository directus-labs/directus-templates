import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Button from '@/components/blocks/Button';
import { CheckCircle2 } from 'lucide-react';

export interface PricingCardProps {
	card: {
		id: string;
		title: string;
		description?: string;
		price?: string;
		badge?: string;
		features?: string[];
		button?: {
			label: string | null;
			variant: string | null;
			url: string | null;
		};
		is_highlighted?: boolean;
	};
}

const PricingCard = ({ card }: PricingCardProps) => {
	return (
		<div
			className={`flex flex-col max-w-[600px] md:min-h-[424px] border rounded-lg p-6 ${
				card.is_highlighted ? 'border-accent' : 'border-gray-300'
			}`}
		>
			{/* Title and Badge */}
			<div className="flex justify-between items-center">
				{card.title && <h3 className="text-[32px] font-normal text-foreground">{card.title}</h3>}
				{card.badge && (
					<Badge
						variant={card.is_highlighted ? 'secondary' : 'default'}
						className="px-2 py-1 text-sm font-medium uppercase"
					>
						{card.badge}
					</Badge>
				)}
			</div>

			{card.price && <p className="text-h2 font-heading mt-4">{card.price}</p>}
			{card.description && <p className="text-description mt-2">{card.description}</p>}

			<Separator className="my-4" />

			{card.features && Array.isArray(card.features) && (
				<ul className="space-y-4">
					{card.features.map((feature, index) => (
						<li key={index} className="flex items-center gap-3 text-regular">
							<div className="mt-1">
								<CheckCircle2 className="size-4 text-gray-muted" />
							</div>
							<p className="leading-relaxed">{feature}</p>
						</li>
					))}
				</ul>
			)}

			<div className="mt-auto pt-4">
				{card.button && <Button label={card.button.label} variant={card.button.variant} url={card.button.url} />}
			</div>
		</div>
	);
};

export default PricingCard;
