'use client';

import { Copy, Share } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ShareDialog = ({ postUrl, postTitle }: { postUrl: string; postTitle: string }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(postUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const socialLinks = [
		{
			service: 'reddit',
			url: `http://www.reddit.com/submit?url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(postTitle)}`,
			icon: '/icons/social/reddit.svg',
		},
		{
			service: 'x',
			url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`,
			icon: '/icons/social/twitter.svg',
		},
		{
			service: 'linkedin',
			url: `https://www.linkedin.com/shareArticle/?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(postTitle)}`,
			icon: '/icons/social/linkedin.svg',
		},
	];

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="flex items-center space-x-2">
					<Share className="size-4" />
					<span>Share Blog</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Share this blog post</DialogTitle>
				</DialogHeader>
				<div className="flex justify-center space-x-4 mb-1">
					{socialLinks.map((social) => (
						<a
							key={social.service}
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							className="rounded bg-transparent inline-flex items-center justify-center transition-colors hover:opacity-70"
						>
							<img
								src={social.icon}
								alt={`${social.service} icon`}
								width={32}
								height={32}
								className="size-8  dark:invert"
							/>
						</a>
					))}
				</div>
				<div className="flex items-center space-x-2">
					<div className="grid flex-1 gap-2">
						<Label htmlFor="link" className="sr-only">
							Link
						</Label>
						<Input id="link" value={postUrl} readOnly />
					</div>
					<Button type="button" size="sm" className="px-3" onClick={handleCopy}>
						<span className="sr-only">Copy</span>
						<Copy />
					</Button>
				</div>
				{copied && <p className="mt-2 text-sm text-green-600">Link copied to clipboard!</p>}
				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ShareDialog;
