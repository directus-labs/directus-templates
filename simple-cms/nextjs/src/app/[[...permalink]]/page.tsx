import { fetchPageData } from '@/lib/directus/fetchers';
import PageBuilder from '@/components/layout/PageBuilder';
import Head from 'next/head';
import { PageBlock } from '@/types/directus-schema';

export default async function Page({ params }: { params: Promise<{ permalink?: string[] }> }) {
	const { permalink } = await params;

	// Resolve permalink into a full path
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

	// Ensure blocks are valid PageBlock[]
	const blocks: PageBlock[] = page.blocks.filter(
		(block: any): block is PageBlock => typeof block === 'object' && block.collection,
	);

	// SEO Metadata
	const title = page.title;
	const metaDescription = page.description;
	const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${resolvedPermalink}`;

	return (
		<>
			<Head>
				<title>{title}</title>
				{metaDescription && <meta name="description" content={metaDescription} />}
				<link rel="canonical" href={canonicalUrl} />
				<meta property="og:title" content={title} />
				{metaDescription && <meta property="og:description" content={metaDescription} />}
				<meta property="og:url" content={canonicalUrl} />
				<meta property="og:type" content="website" />
			</Head>

			<PageBuilder sections={blocks} />
		</>
	);
}
