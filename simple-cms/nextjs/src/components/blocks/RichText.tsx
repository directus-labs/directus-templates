'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Title from '@/components/Title';
import Headline from '@/components/Headline';
import Text from '@/components/Text';

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
	const router = useRouter();

	useEffect(() => {
		const container = document.querySelector('.prose');
		const links = container?.querySelectorAll('a');

		links?.forEach((link) => {
			const href = link.getAttribute('href');
			if (href && href.startsWith('/')) {
				link.onclick = (event) => {
					event.preventDefault();
					router.push(href);
				};
			}
		});

		const iframes = container?.querySelectorAll('iframe');
		iframes?.forEach((iframe) => {
			const wrapper = document.createElement('div');
			wrapper.className = 'relative aspect-video';
			iframe.parentNode?.insertBefore(wrapper, iframe);
			wrapper.appendChild(iframe);

			iframe.style.position = 'absolute';
			iframe.style.top = '0';
			iframe.style.left = '0';
			iframe.style.width = '100%';
			iframe.style.height = '100%';
		});
	}, [content, router]);

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
