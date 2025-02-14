import Button, { ButtonProps } from './Button';
import { cn } from '@/lib/utils';

export interface ButtonGroupProps {
	buttons: Array<ButtonProps>;
	className?: string;
}

const ButtonGroup = ({ buttons, className }: ButtonGroupProps) => {
	if (!buttons || !buttons.length) return null;

	const containerClasses = cn('flex gap-4', className);

	return (
		<div className={containerClasses}>
			{buttons.map((button, index) => (
				<Button key={index} {...button} />
			))}
		</div>
	);
};

export default ButtonGroup;
