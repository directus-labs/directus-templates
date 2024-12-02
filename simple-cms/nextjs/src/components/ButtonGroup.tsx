import clsx from 'clsx';
import BaseButton, { BaseButtonProps } from './Button';

export interface BaseButtonGroupProps {
	buttons: Array<BaseButtonProps>;
	className?: string;
}

const BaseButtonGroup = ({ buttons, className }: BaseButtonGroupProps) => {
	const containerStyles = clsx('flex gap-4', className);

	return (
		<div className={containerStyles}>
			{buttons.map((button, idx) => (
				<BaseButton key={idx} {...button} />
			))}
		</div>
	);
};

export default BaseButtonGroup;
