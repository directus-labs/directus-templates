import clsx from 'clsx';

export interface BaseTextProps {
	align?: 'left' | 'center' | 'right';
	content: string;
	className?: string;
}

const BaseText = ({ content, align = 'left', className }: BaseTextProps) => {
	return (
		<div
			className={clsx(
				'prose dark:prose-invert max-w-prose mx-auto text-regular font-san',
				align === 'left' && 'text-left',
				align === 'center' && 'text-center',
				align === 'right' && 'text-right',
				className,
			)}
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	);
};

export default BaseText;
