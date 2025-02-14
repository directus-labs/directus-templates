import { useDirectus } from '@/lib/directus/directus';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
	if (!siteUrl) {
		throw new Error('Environment variable NEXT_PUBLIC_SITE_URL is not set');
	}

	const { directus, readItems } = useDirectus();

	try {
		const pagesPromise = directus.request(
			readItems('pages', {
				filter: { status: { _eq: 'published' } },
				fields: ['permalink', 'published_at'],
				limit: -1,
			}),
		);

		const postsPromise = directus.request(
			readItems('posts', {
				filter: { status: { _eq: 'published' } },
				fields: ['slug', 'published_at'],
				limit: -1,
			}),
		);

		const [pages, posts] = await Promise.all([pagesPromise, postsPromise]);

		const pageUrls = pages
			.filter((page: { permalink: string; published_at: string | null | undefined }) => page.permalink)
			.map((page: { permalink: string; published_at: string | null | undefined }) => ({
				url: `${process.env.NEXT_PUBLIC_SITE_URL}${page.permalink}`,
				lastModified: page.published_at || new Date().toISOString(),
			}));

		const postUrls = posts
			.filter((post: { slug: string | null | undefined; published_at: string | null | undefined }) => post.slug)
			.map((post: { slug: string | null | undefined; published_at: string | null | undefined }) => ({
				url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
				lastModified: post.published_at || new Date().toISOString(),
			}));

		return [...pageUrls, ...postUrls];
	} catch (error) {
		console.error('Error generating sitemap:', error);
		throw new Error('Failed to generate sitemap');
	}
}
