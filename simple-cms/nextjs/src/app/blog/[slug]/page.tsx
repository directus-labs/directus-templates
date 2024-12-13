import { fetchPostBySlug, fetchRelatedPosts, fetchAuthorById } from '@/lib/directus/fetchers';
import DirectusImage from '@/components/shared/DirectusImage';
import BaseText from '@/components/ui/Text';
import { Separator } from '@/components/ui/separator';
import ShareDialog from '@/components/ui/ShareDialog';
import Head from 'next/head';
import Link from 'next/link';

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const post = await fetchPostBySlug(slug);

	if (!post) {
		return <div className="text-center text-xl mt-[20%]">404 - Post Not Found</div>;
	}

	const relatedPosts = await fetchRelatedPosts(post.id);
	const author = post.author ? await fetchAuthorById(post.author as string) : null;

	const authorName = [author?.first_name, author?.last_name].filter(Boolean).join(' ');
	const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`;

	return (
		<>
			{/* SEO Metadata */}
			<Head>
				<title>{post.title}</title>
				{post.description && <meta name="description" content={post.description} />}
				<meta property="og:title" content={post.title} />
				{post.description && <meta property="og:description" content={post.description} />}
				{post.image && (
					<meta property="og:image" content={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${post.image}`} />
				)}
				<meta property="og:url" content={postUrl} />
				<meta property="og:type" content="article" />
			</Head>

			<div className="px-4 sm:px-6 lg:px-12 xl:px-20 py-12 max-w-[1200px] xl:max-w-[1400px] mx-auto">
				{post.image && (
					<div className="mb-8">
						<div className="relative w-full h-[400px] overflow-hidden rounded-lg">
							<DirectusImage
								uuid={post.image as string}
								alt={post.title}
								className="object-cover"
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
							/>
						</div>
					</div>
				)}

				<h2 className="mb-4 text-left text-headline text-accent">{post.title}</h2>
				<Separator className="mb-8" />

				<div className="grid grid-cols-1 md:grid-cols-[minmax(0,_2fr)_496px] gap-12">
					<div className="text-left">
						<BaseText content={post.content || ''} />
					</div>

					<div className="space-y-6 p-6 bg-gray-100 text-gray-800 rounded-lg max-w-[496px] h-fit">
						{author && (
							<div className="flex items-center space-x-4">
								{author.avatar && (
									<DirectusImage
										uuid={author.avatar as string}
										alt={authorName}
										className="rounded-full object-cover size-[48px]"
										width={48}
										height={48}
									/>
								)}
								<div>{authorName && <p className="font-bold">{authorName}</p>}</div>
							</div>
						)}

						{post.description && <p className="text-gray-600">{post.description}</p>}

						<div className="flex justify-start">
							<ShareDialog postUrl={postUrl} />
						</div>

						<div>
							<Separator className="my-4 dark:bg-gray-300" />
							<h3 className="font-bold text-gray-muted mb-4">Related blogs</h3>
							<div className="space-y-4">
								{relatedPosts.map((relatedPost) => (
									<Link
										key={relatedPost.id}
										href={`/blog/${relatedPost.slug}`}
										className="flex items-center space-x-4 hover:text-accent"
									>
										{relatedPost.image && (
											<div className="relative shrink-0 w-[150px] h-[100px] overflow-hidden rounded-lg">
												<DirectusImage
													uuid={relatedPost.image as string}
													alt={relatedPost.title}
													className="object-cover"
													fill
													sizes="(max-width: 768px) 100px, (max-width: 1024px) 150px, 150px"
												/>
											</div>
										)}
										<span>{relatedPost.title}</span>
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
