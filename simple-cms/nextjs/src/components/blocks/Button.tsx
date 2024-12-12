import { Button as ShadcnButton, buttonVariants } from '@/components/ui/button';
import { LucideIcon, ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps {
	label?: string | null;
	variant?: string | null;
	url?: string | null;
	size?: 'default' | 'sm' | 'lg' | 'icon';
	icon?: 'arrow' | 'plus';
	customIcon?: LucideIcon;
	iconPosition?: 'left' | 'right';
	type?: string;
	pagePermalink?: string | null;
	postSlug?: string | null;
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
}

const Button = ({
	label,
	variant,
	url,
	size = 'default',
	icon,
	customIcon,
	iconPosition = 'left',
	className,
	onClick,
	disabled = false,
}: ButtonProps) => {
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

	const buttonClasses = cn(
		buttonVariants({ variant: variant as any, size }),
		className,
		disabled && 'opacity-50 cursor-not-allowed',
	);

	if (url) {
		return url.startsWith('/') ? (
			<Link href={url} className={buttonClasses}>
				{content}
			</Link>
		) : (
			<a href={url} className={buttonClasses} onClick={onClick} target="_blank" rel="noopener noreferrer">
				{content}
			</a>
		);
	}

	return (
		<ShadcnButton variant={variant as any} size={size} className={buttonClasses} onClick={onClick} disabled={disabled}>
			{content}
		</ShadcnButton>
	);
};

export default Button;
