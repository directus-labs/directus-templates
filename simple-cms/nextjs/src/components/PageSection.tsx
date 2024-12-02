import clsx from 'clsx';

interface PageSectionProps {
	children: React.ReactNode;
	className?: string;
}

const PageSection = ({ children, className = '' }: PageSectionProps) => {
	return <div className={clsx('py-8', className)}>{children}</div>;
};

export default PageSection;
