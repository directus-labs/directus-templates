'use client';

import { useState } from 'react';
import DirectusImage from '@/components/DirectusImage';
import Title from '@/components/Title';
import Headline from '@/components/Headline';
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, ArrowRight, ZoomIn, X } from 'lucide-react';

interface BaseGalleryProps {
	items: {
		id: string;
		image: string;
		alt: string;
		title?: string;
		description?: string;
		slug?: string;
	}[];
	title?: string;
	headline?: string;
}

const BaseGallery = ({ items, title, headline }: BaseGalleryProps) => {
	const [isLightboxOpen, setLightboxOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleOpenLightbox = (index: number) => {
		setCurrentIndex(index);
		setLightboxOpen(true);
	};

	const handlePrev = () => {
		setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : items.length - 1));
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : 0));
	};

	return (
		<section className="p-6">
			{/* Title and headline */}
			{title && <Title title={title} />}
			{headline && <Headline headline={headline} />}

			{/* Items section */}
			{items && items.length > 0 && (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{items.map((item, index) => (
						<div
							key={item.id}
							className="relative overflow-hidden rounded-lg group hover:shadow-lg transition-shadow duration-300 cursor-pointer"
							onClick={() => handleOpenLightbox(index)}
							aria-label={item.title || 'Gallery item'}
						>
							<DirectusImage
								uuid={item.image}
								alt={item.alt}
								width={300}
								height={300}
								className="w-full h-[300px] object-cover rounded-lg"
							/>
							<div className="absolute inset-0 bg-white bg-opacity-60 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
								<ZoomIn className="size-10 text-gray-800" />
							</div>
						</div>
					))}
				</div>
			)}

			{/* Lightbox */}
			<Dialog open={isLightboxOpen} onOpenChange={setLightboxOpen}>
				<DialogOverlay className="fixed inset-0 bg-black bg-opacity-30 z-50" />
				<DialogContent className="flex items-center justify-center  p-2" style={{ maxHeight: '90vh' }}>
					<DialogTitle className="sr-only">Gallery Image</DialogTitle>

					<button
						className="absolute top-4 right-4 text-white bg-black bg-opacity-70 rounded-full p-3 hover:bg-opacity-90"
						onClick={() => setLightboxOpen(false)}
						aria-label="Close"
					>
						<X className="size-6 text-white" />
					</button>

					<div className="relative max-w-4xl w-full">
						<DirectusImage
							uuid={items[currentIndex].image}
							alt={items[currentIndex].alt}
							width={1200}
							height={800}
							className="w-full h-auto max-h-full object-contain"
						/>
					</div>

					<button
						className="absolute -left-16 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-70 rounded-full p-3 hover:bg-opacity-90"
						onClick={handlePrev}
						aria-label="Previous"
					>
						<ArrowLeft className="size-8" />
					</button>
					<button
						className="absolute -right-16 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-70 rounded-full p-3 hover:bg-opacity-90"
						onClick={handleNext}
						aria-label="Next"
					>
						<ArrowRight className="size-8" />
					</button>
				</DialogContent>
			</Dialog>
		</section>
	);
};

export default BaseGallery;
