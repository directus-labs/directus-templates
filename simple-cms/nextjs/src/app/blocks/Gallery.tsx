import { useDirectus } from '@/lib/directus/directus';
import BaseGallery from '@/components/Gallery';
import type { BlockGallery, BlockGalleryItem } from '@/types/directus-schema';

interface BlockGalleryProps {
	uuid: string;
}

const BlockGallery = async ({ uuid }: BlockGalleryProps) => {
	const { directus, readItem } = useDirectus();

	const gallery = await directus.request<BlockGallery & { items: BlockGalleryItem[] }>(
		readItem('block_gallery', uuid, {
			fields: ['id', 'title', 'headline', { items: ['id', 'directus_file', 'sort'] }],
		}),
	);

	if (!gallery || !gallery.items?.length) {
		return <BaseGallery items={[]} />;
	}

	const sortedItems = [...gallery.items].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));

	return (
		<BaseGallery
			items={sortedItems.map((item) => ({
				id: item.id,
				image: item.directus_file as string,
				alt: `Gallery image ${item.id}`,
			}))}
			title={gallery.title || ''}
			headline={gallery.headline || ''}
		/>
	);
};

export default BlockGallery;
