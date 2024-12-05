import { Button, buttonVariants } from '@/components/ui/button';
import { LucideIcon, ArrowRight, Plus } from 'lucide-react';
import clsx from 'clsx';

export interface BaseButtonProps {
	label?: string | null;
	variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
	url?: string | null;
	size?: 'default' | 'sm' | 'lg' | 'icon';
	icon?: 'arrow' | 'plus';
	iconPosition?: 'left' | 'right';
	className?: string;
}

const BaseButton = ({
	label,
	variant = 'default',
	url,
	size = 'default',
	icon,
	iconPosition = 'left',
	className,
}: BaseButtonProps) => {
	const icons: Record<string, LucideIcon> = {
		arrow: ArrowRight,
		plus: Plus,
	};

	const Icon = icon ? icons[icon] : null;

	const content = (
		<>
			{icon && iconPosition === 'left' && Icon && <Icon className="size-4 shrink-0" />}
			{label}
			{icon && iconPosition === 'right' && Icon && <Icon className="size-4 shrink-0" />}
		</>
	);

	const buttonClasses = clsx(buttonVariants({ variant, size }), className);

	return url ? (
		<a href={url} className={buttonClasses}>
			{content}
		</a>
	) : (
		<Button variant={variant} size={size} className={className}>
			{content}
		</Button>
	);
};

export default BaseButton;
