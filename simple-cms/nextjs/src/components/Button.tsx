import React from 'react';
import clsx from 'clsx';

export interface BaseButtonProps {
	label?: string | null;
	variant?: 'solid' | 'outline' | 'soft' | 'ghost' | 'link' | null;
	url?: string | null;
	type?: 'page' | 'post' | 'url' | null;
	className?: string;
}

const BaseButton: React.FC<BaseButtonProps> = ({ label, variant = 'solid', url, className }) => {
	const baseStyles = 'px-4 py-2 font-medium rounded-lg text-sm focus:outline-none';
	const variantStyles = {
		solid: 'bg-accent text-white hover:bg-gray',
		outline: 'border border-foreground text-foreground hover:bg-accent',
		soft: 'bg-blue-100 text-blue-500 hover:bg-blue-200',
		ghost: 'text-foreground hover:bg-accent',
		link: 'text-foreground underline hover:text-accent',
	};

	const classes = clsx(baseStyles, variantStyles[variant || 'solid'], className);

	return url ? (
		<a href={url} className={classes}>
			{label}
		</a>
	) : (
		<button className={classes}>{label}</button>
	);
};

export default BaseButton;
