import { Button, buttonVariants } from '@/components/ui/button';
import { LucideIcon, ArrowRight, Plus } from 'lucide-react';
import clsx from 'clsx';

export interface BaseButtonProps {
	label?: string | null;
	variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
	url?: string | null;
	size?: 'default' | 'sm' | 'lg' | 'icon';
	icon?: 'arrow' | 'plus';
	customIcon?: LucideIcon; // New prop for custom Lucide icons
	iconPosition?: 'left' | 'right';
	className?: string;
	onClick?: () => void; // Add onClick prop for custom functionality
	disabled?: boolean; // Optionally handle disabled state
}

const BaseButton = ({
	label,
	variant = 'default',
	url,
	size = 'default',
	icon,
	customIcon,
	iconPosition = 'left',
	className,
	onClick, // Pass onClick prop
	disabled = false, // Handle disabled state
}: BaseButtonProps) => {
	const icons: Record<string, LucideIcon> = {
		arrow: ArrowRight,
		plus: Plus,
	};

	const Icon = customIcon || (icon ? icons[icon] : null);

	const content = (
		<span className="flex items-center space-x-2">
			{icon && iconPosition === 'left' && Icon && <Icon className="size-4 shrink-0" />}
			{label && <span>{label}</span>}
			{icon && iconPosition === 'right' && Icon && <Icon className="size-4 shrink-0" />}
		</span>
	);

	const buttonClasses = clsx(
		buttonVariants({ variant, size }),
		className,
		disabled && 'cursor-not-allowed opacity-50', // Add styles for disabled state
	);

	return url ? (
		<a href={url} className={buttonClasses} onClick={onClick}>
			{content}
		</a>
	) : (
		<Button variant={variant} size={size} className={buttonClasses} onClick={onClick} disabled={disabled}>
			{content}
		</Button>
	);
};

export default BaseButton;
