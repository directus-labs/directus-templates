import { cn } from '@/lib/utils';

export interface TextProps {
	content: string;
	className?: string;
}

const Text = ({ content, className }: TextProps) => {
	return <div className={cn('prose dark:prose-invert', className)} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Text;
