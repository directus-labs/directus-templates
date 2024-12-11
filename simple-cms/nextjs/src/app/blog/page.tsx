import { fetchPublishedPosts } from '@/lib/directus/fetchers';
import Title from '@/components/Title';
import Headline from '@/components/Headline';
import DirectusImage from '@/components/DirectusImage';

const BlogPage = async () => {
	const posts = await fetchPublishedPosts();

	return (
		<div className="px-6 md:px-12 lg:px-36 py-12">
			<Title title="Blog" />
			<Headline headline="Latest Posts" />

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{posts.map((post) => (
					<a key={post.id} href={`/blog/${post.slug}`} className="group block overflow-hidden rounded-lg">
						<div className="relative w-full h-64 rounded-lg overflow-hidden">
							<DirectusImage
								uuid={post.image as string}
								alt={post.title}
								className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
								width={600}
								height={400}
							/>
						</div>

						<div className="p-4">
							<h3 className="text-lg font-bold group-hover:text-accent transition-colors duration-300">{post.title}</h3>
							<p className="text-sm text-foreground mt-2">{post.description}</p>
						</div>
					</a>
				))}
			</div>
		</div>
	);
};

export default BlogPage;
