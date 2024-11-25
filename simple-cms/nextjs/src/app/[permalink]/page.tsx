import { useDirectus } from '@/lib/directus';
import PageBuilder from '@/components/PageBuilder';
import { PageBlock } from '@/types/directus-schema';

export default async function PermalinkPage({ params }: { params: { permalink: string } }) {
	const { permalink } = params;

	const { directus, readItems } = useDirectus();

	const pageFilter = {
		permalink: { _eq: `/${permalink}`.replace(/\/$/, '') },
	};

	const pageData = await directus.request(
		readItems('pages', {
			filter: pageFilter,
			limit: 1,
			fields: ['title', { blocks: ['id', 'background', 'collection', 'item', 'sort'] }],
			deep: {
				blocks: {
					_sort: ['sort'],
				},
			},
		}),
	);

	const page = pageData[0];

	if (!page || !Array.isArray(page.blocks)) {
		return <div>404 - Page Not Found</div>;
	}

	const blocks: PageBlock[] = page.blocks.filter((block): block is PageBlock => typeof block !== 'string' && !!block);

	const sections = [
		{
			background: blocks[0]?.background || 'light',
			blocks,
		},
	];

	return <PageBuilder sections={sections} />;
}
