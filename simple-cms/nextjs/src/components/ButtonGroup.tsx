import React from 'react';
import clsx from 'clsx';
import BaseButton, { BaseButtonProps } from './Button';

export interface ButtonGroupProps {
	buttons: Array<BaseButtonProps>;
	align?: 'left' | 'center' | 'right';
	className?: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons, align = 'center', className }) => {
	const containerStyles = clsx(
		'flex gap-4',
		{
			'justify-start': align === 'left',
			'justify-center': align === 'center',
			'justify-end': align === 'right',
		},
		className,
	);

	return (
		<div className={containerStyles}>
			{buttons.map((button, idx) => (
				<BaseButton key={idx} {...button} />
			))}
		</div>
	);
};

export default ButtonGroup;
