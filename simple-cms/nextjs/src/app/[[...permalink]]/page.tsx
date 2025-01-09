import { fetchPageData } from '@/lib/directus/fetchers';
import { generatePageMetadata } from '@/lib/utils';
import PageBuilder from '@/components/layout/PageBuilder';
import { Metadata } from 'next';
import { PageBlock } from '@/types/directus-schema';

export async function generateMetadata({ params }: { params: Promise<{ permalink?: string[] }> }): Promise<Metadata> {
	const { permalink } = await params;
	const permalinkSegments = permalink || [];
	const resolvedPermalink = `/${permalinkSegments.join('/')}`.replace(/\/$/, '') || '/';

	let page;
	try {
		page = await fetchPageData(resolvedPermalink);
	} catch (error) {
		console.error('Error loading page:', error);

		return generatePageMetadata({
			pageTitle: '404 - Page Not Found',
			resolvedPermalink,
		});
	}

	return generatePageMetadata({
		pageTitle: page?.title || 'Untitled Page',
		pageDescription: page?.description || null,
		resolvedPermalink,
	});
}

export default async function Page({ params }: { params: Promise<{ permalink?: string[] }> }) {
	const { permalink } = await params;

	const permalinkSegments = permalink || [];
	const resolvedPermalink = `/${permalinkSegments.join('/')}`.replace(/\/$/, '') || '/';

	let page;
	try {
		page = await fetchPageData(resolvedPermalink);
	} catch (error) {
		console.error('Error loading page:', error);
	}

	if (!page || !page.blocks) {
		return <div className="text-center text-xl mt-[20%]">404 - Page Not Found</div>;
	}

	const blocks: PageBlock[] = page.blocks.filter(
		(block: any): block is PageBlock => typeof block === 'object' && block.collection,
	);

	return <PageBuilder sections={blocks} />;
}
