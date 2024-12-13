import Title from '@/components/Title';
import Headline from '@/components/Headline';
import DirectusImage from '@/components/DirectusImage';
import Link from 'next/link';

interface BlockPostsProps {
	data: {
		title?: string;
		headline?: string;
		posts: Array<{
			id: string;
			title: string;
			description: string;
			slug: string;
			image?: string;
		}>;
	};
}

const BlockPosts = ({ data }: BlockPostsProps) => {
	const { title, headline, posts } = data;

	if (!posts || posts.length === 0) {
		return;
	}

	return (
		<div className="py-12">
			{title && <Title title={title} />}
			{headline && <Headline headline={headline} />}

			<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{posts.map((post) => (
					<Link key={post.id} href={`/blog/${post.slug}`} className="group block overflow-hidden rounded-lg">
						<div className="relative w-full h-64 rounded-lg overflow-hidden">
							{post.image && (
								<DirectusImage
									uuid={post.image}
									alt={post.title}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
									className="w-full h-auto object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
								/>
							)}
						</div>

						<div className="p-4">
							<h3 className="text-lg font-bold group-hover:text-accent transition-colors duration-300">{post.title}</h3>
							<p className="text-sm text-foreground mt-2">{post.description}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default BlockPosts;
