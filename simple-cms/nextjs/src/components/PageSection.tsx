import React from 'react';
import clsx from 'clsx';

interface PageSectionProps {
	children: React.ReactNode;
	className?: string;
}

const PageSection: React.FC<PageSectionProps> = ({
	children,

	className = '',
}) => {
	return <div className={clsx('py-8', className)}>{children}</div>;
};

export default PageSection;
