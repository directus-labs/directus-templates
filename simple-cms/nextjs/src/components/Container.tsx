import clsx from 'clsx';

interface BaseContainerProps {
	children: React.ReactNode;
	className?: string;
}

const BaseContainer = ({ children, className = '' }: BaseContainerProps) => {
	return (
		<div className={clsx('base-container px-4 md:px-8 lg:px-16 bg-background text-foreground', className)}>
			{children}
		</div>
	);
};

export default BaseContainer;
