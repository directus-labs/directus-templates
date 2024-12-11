import Title from '@/components/Title';
import Headline from '@/components/Headline';
import Text from '@/components/Text';
import { cn } from '@/lib/utils';

interface RichTextBlockProps {
	data: {
		title?: string;
		headline?: string;
		content: string;
		alignment?: 'left' | 'center' | 'right';
	};
	className?: string;
}

const RichTextBlock = ({ data, className }: RichTextBlockProps) => {
	const { title, headline, content, alignment = 'left' } = data;

	return (
		<div
			className={cn(
				'mx-auto max-w-[600px] space-y-6',
				alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left',
				className,
			)}
		>
			{title && <Title title={title} />}
			{headline && <Headline headline={headline} />}
			<Text content={content} />
		</div>
	);
};

export default RichTextBlock;
