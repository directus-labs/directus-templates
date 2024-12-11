import { useDirectus } from './directus';

/**
 * Fetches page data by permalink, including all nested blocks.
 */
export const fetchPageData = async (permalink: string) => {
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
							{
								item: {
									block_richtext: ['title', 'headline', 'content', 'alignment'],
									block_gallery: ['id', 'title', 'headline', { items: ['id', 'directus_file', 'sort'] }],
									block_pricing: [
										'title',
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
										'title',
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
								},
							},
						],
					},
				],
				deep: {
					blocks: { _sort: ['sort'] },
				},
			}),
		);

		if (!pageData.length) {
			throw new Error('Page not found');
		}

		return pageData[0];
	} catch (error) {
		console.error('Error fetching page data:', error);
		throw new Error('Failed to fetch page data');
	}
};

/**
 * Fetches footer navigation and global site data.
 */
export const fetchFooterData = async () => {
	const { directus, readItem, readSingleton } = useDirectus();

	try {
		const [navPrimary, globals] = await Promise.all([
			directus.request(
				readItem('navigation', 'footer', {
					fields: [
						{
							items: [
								'id',
								'title',
								'page',
								{
									page: ['permalink'],
									children: ['id', 'title', 'url', { page: ['permalink'] }],
								},
							],
						},
					],
				}),
			),
			directus.request(readSingleton('globals', { fields: ['description'] })),
		]);

		return { navPrimary, globals };
	} catch (error) {
		console.error('Error fetching footer data:', error);
		throw new Error('Failed to fetch footer data');
	}
};

/**
 * Fetches header navigation.
 */
export const fetchNavigationData = async (key: string) => {
	const { directus, readItem } = useDirectus();

	try {
		const navigation = await directus.request(
			readItem('navigation', key, {
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
		);

		return navigation;
	} catch (error) {
		console.error(`Error fetching navigation data for key "${key}":`, error);
		throw new Error('Failed to fetch navigation data');
	}
};

/**
 * Fetches published blog posts.
 */
export const fetchPublishedPosts = async () => {
	const { directus, readItems } = useDirectus();

	try {
		const posts = await directus.request(
			readItems('posts', {
				fields: ['id', 'title', 'description', 'slug', 'image', 'status'],
				filter: { status: { _eq: 'published' } },
				sort: ['-published_at'],
			}),
		);

		return posts;
	} catch (error) {
		console.error('Error fetching published posts:', error);
		throw new Error('Failed to fetch published posts');
	}
};

/**
 * Fetches a single blog post by slug.
 */
export const fetchPostBySlug = async (slug: string) => {
	const { directus, readItems } = useDirectus();

	try {
		const post = await directus.request(
			readItems('posts', {
				filter: { slug: { _eq: slug } },
				limit: 1,
				fields: ['id', 'title', 'content', 'image', 'description', 'author'],
			}),
		);

		return post[0] || null;
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
