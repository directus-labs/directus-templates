import React from 'react';
import clsx from 'clsx';

export interface BaseTextProps {
	align?: 'start' | 'center' | 'end';
	content: string;
}

const BaseText: React.FC<BaseTextProps> = ({ content, align = 'start' }) => {
	return (
		<div
			className={clsx(
				'prose dark:prose-invert max-w-none',
				align === 'start' && 'text-left',
				align === 'center' && 'text-center',
				align === 'end' && 'text-right',
			)}
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	);
};

export default BaseText;
