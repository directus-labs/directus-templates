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
			id: string;
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
				card.is_highlighted ? 'border-accent' : 'border-input'
			}`}
		>
			<div className="flex justify-between items-start gap-2 mb-4">
				<h3 className="text-xl font-heading text-foreground">{card.title}</h3>
				<div className="flex-shrink-0">
					{card.badge && (
						<Badge variant={card.is_highlighted ? 'secondary' : 'default'} className="text-xs font-medium uppercase">
							{card.badge}
						</Badge>
					)}
				</div>
			</div>
			{card.price && <p className="text-h2  mt-2 font-semibold">{card.price}</p>}
			{card.description && <p className="text-description mt-2 line-clamp-2">{card.description}</p>}

			<Separator className="my-4" />

			<div className="flex-grow">
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
			</div>
			<div className="mt-auto pt-4">
				{card.button && (
					<Button
						label={card.button.label}
						variant={card.button.variant}
						url={card.button.url}
						block={true}
						id={card.button.id}
					/>
				)}
			</div>
		</div>
	);
};

export default PricingCard;
