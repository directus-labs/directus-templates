import { fetchPostBySlug, fetchRelatedPosts, fetchAuthorById } from '@/lib/directus/fetchers';
import { draftMode } from 'next/headers';
import DirectusImage from '@/components/shared/DirectusImage';
import BaseText from '@/components/ui/Text';
import { Separator } from '@/components/ui/separator';
import ShareDialog from '@/components/ui/ShareDialog';
import Link from 'next/link';
import Headline from '@/components/ui/Headline';
import Container from '@/components/ui/container';
import { generatePageMetadata } from '@/lib/utils';
import { Metadata } from 'next/types';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;

	const post = await fetchPostBySlug(slug);

	if (!post) {
		return generatePageMetadata({
			pageTitle: '404 - Post Not Found',
			resolvedPermalink: `/blog/${slug}`,
		});
	}

	return generatePageMetadata({
		pageTitle: post.title || 'Untitled Post',
		pageDescription: post.description || null,
		resolvedPermalink: `/blog/${slug}`,
		ogImage: post.image ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${post.image}` : null,
	});
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
	const { isEnabled } = await draftMode();
	const { slug } = await params;

	const post = await fetchPostBySlug(slug, { draft: isEnabled });

	if (!post) {
		return <div className="text-center text-xl mt-[20%]">404 - Post Not Found</div>;
	}

	const relatedPosts = await fetchRelatedPosts(post.id);
	const author = post.author ? await fetchAuthorById(post.author as string) : null;

	const authorName = [author?.first_name, author?.last_name].filter(Boolean).join(' ');
	const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`;

	return (
		<>
			{isEnabled && <p>(Draft Mode)</p>}
			<Container className="py-12">
				{post.image && (
					<div className="mb-8">
						<div className="relative w-full h-[400px] overflow-hidden rounded-lg">
							<DirectusImage
								uuid={post.image as string}
								alt={post.title || 'post header image'}
								className="object-cover"
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
							/>
						</div>
					</div>
				)}

				<Headline as="h2" headline={post.title} className="!text-accent mb-4" />
				<Separator className="mb-8" />

				<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,_2fr)_400px] gap-12">
					<main className="text-left">
						<BaseText content={post.content || ''} />
					</main>

					<aside className="space-y-6 p-6 rounded-lg max-w-[496px] h-fit bg-background-muted">
						{author && (
							<div className="flex items-center space-x-4">
								{author.avatar && (
									<DirectusImage
										uuid={author.avatar as string}
										alt={authorName || 'author avatar'}
										className="rounded-full object-cover size-[48px]"
										width={48}
										height={48}
									/>
								)}
								<div>{authorName && <p className="font-bold">{authorName}</p>}</div>
							</div>
						)}

						{post.description && <p className="">{post.description}</p>}

						<div className="flex justify-start">
							<ShareDialog postUrl={postUrl} postTitle={post.title} />
						</div>

						<div>
							<Separator className="my-4" />
							<h3 className="font-bold mb-4">Related Posts</h3>
							<div className="space-y-4">
								{relatedPosts.map((relatedPost) => (
									<Link
										key={relatedPost.id}
										href={`/blog/${relatedPost.slug}`}
										className="flex items-center space-x-4 hover:text-accent group"
									>
										{relatedPost.image && (
											<div className="relative shrink-0 w-[150px] h-[100px] overflow-hidden rounded-lg">
												<DirectusImage
													uuid={relatedPost.image as string}
													alt={relatedPost.title || 'related posts'}
													className="object-cover transition-transform duration-300 group-hover:scale-110"
													fill
													sizes="(max-width: 768px) 100px, (max-width: 1024px) 150px, 150px"
												/>
											</div>
										)}
										<span className="font-heading">{relatedPost.title}</span>
									</Link>
								))}
							</div>
						</div>
					</aside>
				</div>
			</Container>
		</>
	);
}
