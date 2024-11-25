import React from 'react';
import { PageBlock } from '@/types/directus-schema';

interface PageSectionProps {
	background: PageBlock['background'];
	children: React.ReactNode;
}

const PageSection: React.FC<PageSectionProps> = ({ background, children }) => {
	const bgClass = background === 'dark' ? 'bg-dark' : 'bg-light';

	return <div className={`page-section ${bgClass}`}>{children}</div>;
};

export default PageSection;
