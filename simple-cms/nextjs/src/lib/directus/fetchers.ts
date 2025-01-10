import { BlockPost, PageBlock, Post, Schema } from '@/types/directus-schema';
import { useDirectus } from './directus';
import { QueryFilter, readItems, aggregate, readItem, readSingleton } from '@directus/sdk';

/**
 * Fetches page data by permalink, including all nested blocks and dynamically fetching blog posts if required.
 */
export const fetchPageData = async (permalink: string, postPage = 1) => {
	const { directus, readItems } = useDirectus();

	try {
		const pageData = await directus.request(
			readItems('pages', {
				filter: { permalink: { _eq: permalink } },
				limit: 1,
				fields: [
					'title',
					'description',
					{
						blocks: [
							'id',
							'background',
							'collection',
							'item',
							'sort',
							'hide_block',
							{
								item: {
									block_richtext: ['tagline', 'headline', 'content', 'alignment'],
									block_gallery: ['id', 'tagline', 'headline', { items: ['id', 'directus_file', 'sort'] }],
									block_pricing: [
										'tagline',
										'headline',
										{
											pricing_cards: [
												'id',
												'title',
												'description',
												'price',
												'badge',
												'features',
												'is_highlighted',
												{
													button: [
														'id',
														'label',
														'variant',
														'url',
														'type',
														{ page: ['permalink'] },
														{ post: ['slug'] },
													],
												},
											],
										},
									],
									block_hero: [
										'tagline',
										'headline',
										'description',
										'alignment',
										'image',
										{
											button_group: [
												'id',
												{
													buttons: [
														'id',
														'label',
														'variant',
														'url',
														'type',
														{ page: ['permalink'] },
														{ post: ['slug'] },
													],
												},
											],
										},
									],
									block_posts: ['tagline', 'headline', 'collection', 'limit'],
									block_form: [
										'id',
										'tagline',
										'headline',
										{
											form: [
												'id',
												'title',
												'submit_label',
												'success_message',
												'on_success',
												'success_redirect_url',
												'is_active',
												{
													fields: [
														'id',
														'name',
														'type',
														'label',
														'placeholder',
														'help',
														'validation',
														'width',
														'choices',
														'required',
														'sort',
													],
												},
											],
										},
									],
								},
							},
						],
					},
				],
				deep: {
					blocks: { _sort: ['sort'], _filter: { hide_block: { _neq: true } } },
				},
			}),
		);

		if (!pageData.length) {
			throw new Error('Page not found');
		}

		const page = pageData[0];

		if (Array.isArray(page.blocks)) {
			for (const block of page.blocks as PageBlock[]) {
				if (
					block.collection === 'block_posts' &&
					typeof block.item === 'object' &&
					(block.item as BlockPost).collection === 'posts'
				) {
					const limit = (block.item as BlockPost).limit ?? 6;
					const posts = await directus.request<Post[]>(
						readItems('posts', {
							fields: ['id', 'title', 'description', 'slug', 'image', 'status', 'published_at'],
							filter: { status: { _eq: 'published' } },
							sort: ['-published_at'],
							limit,
							page: postPage,
						}),
					);

					(block.item as BlockPost & { posts: Post[] }).posts = posts;
				}
			}
		}

		return page;
	} catch (error) {
		console.error('Error fetching page data:', error);
		throw new Error('Failed to fetch page data');
	}
};

/**
 * Fetches global site data, header navigation, and footer navigation.
 */
export const fetchSiteData = async () => {
	const { directus } = useDirectus();

	try {
		const [globals, headerNavigation, footerNavigation] = await Promise.all([
			directus.request(
				readSingleton('globals', {
					fields: ['title', 'description', 'logo', 'logo_dark_mode', 'social_links', 'accent_color', 'favicon'],
				}),
			),
			directus.request(
				readItem('navigation', 'main', {
					fields: [
						{
							items: [
								'id',
								'title',
								{
									page: ['permalink'],
									children: ['id', 'title', 'url', { page: ['permalink'] }],
								},
							],
						},
					],
					deep: { items: { _sort: ['sort'] } },
				}),
			),
			directus.request(
				readItem('navigation', 'footer', {
					fields: [
						{
							items: [
								'id',
								'title',
								{
									page: ['permalink'],
									children: ['id', 'title', 'url', { page: ['permalink'] }],
								},
							],
						},
					],
				}),
			),
		]);

		return { globals, headerNavigation, footerNavigation };
	} catch (error) {
		console.error('Error fetching site data:', error);
		throw new Error('Failed to fetch site data');
	}
};

/**
 * Fetches a single blog post by slug. Handles live preview mode
 */
export const fetchPostBySlug = async (slug: string, options?: { draft?: boolean }) => {
	const { directus, readItems } = useDirectus();

	try {
		const filter: QueryFilter<Schema, Post> = options?.draft
			? { slug: { _eq: slug } }
			: { slug: { _eq: slug }, status: { _eq: 'published' } };

		const posts = await directus.request(
			readItems('posts', {
				filter,
				limit: 1,
				fields: ['id', 'title', 'content', 'status', 'image', 'description', 'author'],
			}),
		);

		const post = posts[0];

		if (!post) {
			console.error(`No post found with slug: ${slug}`);

			return null;
		}

		return post;
	} catch (error) {
		console.error(`Error fetching post with slug "${slug}":`, error);
		throw new Error(`Failed to fetch post with slug "${slug}"`);
	}
};

/**
 * Fetches related blog posts excluding the given ID.
 */
export const fetchRelatedPosts = async (excludeId: string) => {
	const { directus, readItems } = useDirectus();

	try {
		const relatedPosts = await directus.request(
			readItems('posts', {
				filter: { status: { _eq: 'published' }, id: { _neq: excludeId } },
				fields: ['id', 'title', 'image', 'slug'],
				limit: 2,
			}),
		);

		return relatedPosts;
	} catch (error) {
		console.error('Error fetching related posts:', error);
		throw new Error('Failed to fetch related posts');
	}
};

/**
 * Fetches author details by ID.
 */
export const fetchAuthorById = async (authorId: string) => {
	const { directus, readUser } = useDirectus();

	try {
		const author = await directus.request(
			readUser(authorId, {
				fields: ['first_name', 'last_name', 'avatar'],
			}),
		);

		return author;
	} catch (error) {
		console.error(`Error fetching author with ID "${authorId}":`, error);
		throw new Error(`Failed to fetch author with ID "${authorId}"`);
	}
};

/**
 * Fetches paginated blog posts.
 */
export const fetchPaginatedPosts = async (limit: number, page: number) => {
	const { directus } = useDirectus();
	try {
		const response = await directus.request(
			readItems('posts', {
				limit,
				page,
				sort: ['-published_at'],
				fields: ['id', 'title', 'description', 'slug', 'image'],
				filter: { status: { _eq: 'published' } },
			}),
		);

		return response;
	} catch (error) {
		console.error('Error fetching paginated posts:', error);
		throw new Error('Failed to fetch paginated posts');
	}
};

/**
 * Fetches the total number of published blog posts.
 */
export const fetchTotalPostCount = async (): Promise<number> => {
	const { directus } = useDirectus();

	try {
		const response = await directus.request(
			aggregate('posts', {
				aggregate: { count: '*' },
				filter: { status: { _eq: 'published' } },
			}),
		);

		return Number(response[0]?.count) || 0;
	} catch (error) {
		console.error('Error fetching total post count:', error);

		return 0;
	}
};
