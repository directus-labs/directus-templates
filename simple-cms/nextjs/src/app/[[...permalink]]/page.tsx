import { useDirectus } from '@/lib/directus/directus';
import PageBuilder from '@/components/PageBuilder';
import { PageBlock } from '@/types/directus-schema';

export default async function Page({ params }: { params: Promise<{ permalink?: string[] }> }) {
	const { permalink } = await params;

	const permalinkSegments = permalink || [];
	const resolvedPermalink = `/${permalinkSegments.join('/')}`.replace(/\/$/, '') || '/';

	const { directus, readItems } = useDirectus();

	const pageData = await directus.request(
		readItems('pages', {
			filter: { permalink: { _eq: resolvedPermalink } },
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
		return <div className="text-center text-xl mt-[20%]">404 - Page Not Found</div>;
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
