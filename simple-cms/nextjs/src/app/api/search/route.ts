import { useDirectus } from '@/lib/directus/directus';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const search = searchParams.get('search');

	if (!search || search.length < 3) {
		return NextResponse.json({ error: 'Query must be at least 3 characters.' }, { status: 400 });
	}

	const { directus, readItems } = useDirectus();

	try {
		const [pages, posts] = await Promise.all([
			directus.request(
				readItems('pages', {
					filter: {
						_or: [
							{ title: { _contains: search } },
							{ description: { _contains: search } },
							{ permalink: { _contains: search } },
						],
					},
					fields: ['id', 'title', 'description', 'permalink'],
				}),
			),

			directus.request(
				readItems('posts', {
					filter: {
						_and: [
							{ status: { _eq: 'published' } },
							{
								_or: [
									{ title: { _contains: search } },
									{ description: { _contains: search } },
									{ slug: { _contains: search } },
									{ content: { _contains: search } },
								],
							},
						],
					},
					fields: ['id', 'title', 'description', 'slug', 'content', 'status'],
				}),
			),
		]);

		const results = [
			...pages.map((page: any) => ({
				id: page.id,
				title: page.title,
				description: page.description,
				type: 'Page',
				link: `/${page.permalink.replace(/^\/+/, '')}`,
			})),

			...posts.map((post: any) => ({
				id: post.id,
				title: post.title,
				description: post.description,
				type: 'Post',
				link: `/blog/${post.slug}`,
			})),
		];

		return NextResponse.json(results);
	} catch (error) {
		console.error('Error fetching search results:', error);

		return NextResponse.json({ error: 'Failed to fetch search results.' }, { status: 500 });
	}
}
