import clsx from 'clsx';
import { Button } from '@/components/ui/button';

export interface BaseButtonProps {
	label?: string | null;
	variant?: 'solid' | 'outline' | 'soft' | 'ghost' | 'link' | null;
	url?: string | null;
	className?: string;
}

const BaseButton = ({ label, variant = 'solid', url, className }: BaseButtonProps) => {
	const baseStyles = 'px-4 py-2 font-medium rounded-lg text-sm focus:outline-none';
	const variantStyles = {
		solid: 'bg-accent text-white hover:bg-black hover:text-gray',
		outline: 'border border-foreground text-foreground hover:text-accent hover:border-accent',
		soft: 'bg-soft text-white hover:bg-accent hover:text-white',
		ghost: 'text-foreground hover:text-accent',
		link: 'text-foreground underline hover:text-accent',
	};

	const classes = clsx(baseStyles, variantStyles[variant || 'solid'], className);

	return url ? (
		<a href={url} className={classes}>
			{label}
		</a>
	) : (
		<Button className={classes}>{label}</Button>
	);
};

export default BaseButton;
