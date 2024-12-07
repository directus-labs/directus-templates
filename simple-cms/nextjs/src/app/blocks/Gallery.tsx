import { useDirectus } from '@/lib/directus/directus';
import DirectusImage from '@/components/DirectusImage';
import Title from '@/components/Title';
import Headline from '@/components/Headline';
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
		return (
			<section className="p-6">
				<p className="text-gray-muted">No images available.</p>
			</section>
		);
	}

	const sortedItems = [...gallery.items].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));

	return (
		<section className="space-y-6 p-6 ">
			{gallery.title && <Title title={gallery.title} />}
			{gallery.headline && <Headline headline={gallery.headline} />}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{sortedItems.map((item) => (
					<div key={item.id} className="overflow-hidden rounded-lg">
						<DirectusImage
							uuid={item.directus_file as string}
							alt={`Gallery image ${item.id}`}
							className="w-full h-[238px] object-cover rounded-lg"
						/>
					</div>
				))}
			</div>
		</section>
	);
};

export default BlockGallery;
