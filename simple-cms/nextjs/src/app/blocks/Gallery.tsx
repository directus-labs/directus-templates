import { useDirectus } from '@/lib/directus/directus';
import DirectusImage from '@/components/DirectusImage';
import type { BlockGallery, BlockGalleryItem } from '@/types/directus-schema';

interface BlockGalleryProps {
	uuid: string;
}

const BlockGallery = async ({ uuid }: BlockGalleryProps) => {
	const { directus, readItem } = useDirectus();

	const gallery = await directus.request<BlockGallery & { items: BlockGalleryItem[] }>(
		readItem('block_gallery', uuid, {
			fields: ['id', 'title', 'headline', { items: ['id', 'directus_file'] }],
		}),
	);

	if (!gallery || !gallery.items?.length) return <p>No images available.</p>;

	return (
		<section className="space-y-6 p-6">
			{gallery.title && (
				<h2 className="text-accent text-xl uppercase max-w-1/2 leading-[33.6px] font-heading">{gallery.title}</h2>
			)}
			{gallery.headline && <p className="text-foreground text-5xl max-w-1/2 leading-tight">{gallery.headline}</p>}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{gallery.items.map((item) => (
					<div key={item.id} className="overflow-hidden rounded h-[238px] max-h-[238px]">
						<DirectusImage
							uuid={item.directus_file as string}
							alt={`Gallery image ${item.id}`}
							className="size-full object-cover rounded-lg"
						/>
					</div>
				))}
			</div>
		</section>
	);
};

export default BlockGallery;
