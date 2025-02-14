'use client';

import { useEffect, useState } from 'react';
import DirectusImage from '@/components/shared/DirectusImage';
import Tagline from '../ui/Tagline';
import Headline from '@/components/ui/Headline';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { ArrowLeft, ArrowRight, ZoomIn, X } from 'lucide-react';

interface GalleryProps {
	data: {
		tagline?: string;
		headline?: string;
		items: Array<{
			id: string;
			directus_file: string;
			sort?: number;
		}>;
	};
}

const Gallery = ({ data }: GalleryProps) => {
	const { tagline, headline, items = [] } = data;
	const [isLightboxOpen, setLightboxOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const sortedItems = [...items].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));

	const isValidIndex = sortedItems.length > 0 && currentIndex >= 0 && currentIndex < sortedItems.length;

	const handleOpenLightbox = (index: number) => {
		setCurrentIndex(index);
		setLightboxOpen(true);
	};

	const handlePrev = () => {
		setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : sortedItems.length - 1));
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex < sortedItems.length - 1 ? prevIndex + 1 : 0));
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (isLightboxOpen) {
			e.stopPropagation();
			switch (e.key) {
				case 'ArrowLeft':
					e.preventDefault();
					handlePrev();
					break;
				case 'ArrowRight':
					e.preventDefault();
					handleNext();
					break;
				case 'Escape':
					e.preventDefault();
					setLightboxOpen(false);
					break;
				default:
					break;
			}
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);

		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isLightboxOpen]);

	return (
		<section className="relative">
			{tagline && <Tagline tagline={tagline} />}
			{headline && <Headline headline={headline} />}

			{sortedItems.length > 0 && (
				<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{sortedItems.map((item, index) => (
						<div
							key={item.id}
							className="relative overflow-hidden rounded-lg group hover:shadow-lg transition-shadow duration-300 cursor-pointer h-[300px]"
							onClick={() => handleOpenLightbox(index)}
							aria-label={`Gallery item ${item.id}`}
						>
							<DirectusImage
								uuid={item.directus_file}
								alt={`Gallery item ${item.id}`}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
								className="w-full h-auto object-cover rounded-lg"
							/>
							<div className="absolute inset-0 bg-white bg-opacity-60 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
								<ZoomIn className="size-10 text-gray-800" />
							</div>
						</div>
					))}
				</div>
			)}

			{isLightboxOpen && isValidIndex && (
				<Dialog open={isLightboxOpen} onOpenChange={setLightboxOpen}>
					<DialogContent
						className="flex max-w-full max-h-full items-center justify-center  p-2 bg-transparent border-none z-50"
						hideCloseButton
					>
						<DialogTitle className="sr-only">Gallery Image</DialogTitle>
						<DialogDescription className="sr-only">
							Viewing image {currentIndex + 1} of {sortedItems.length}.
						</DialogDescription>

						<div className="relative flex justify-center items-center w-[90vw] h-[90vh]">
							<DirectusImage
								uuid={sortedItems[currentIndex].directus_file}
								alt={`Gallery item ${sortedItems[currentIndex].id}`}
								width={1200}
								height={800}
								className="size-full object-contain"
							/>
						</div>
						<div className="absolute bottom-4 inset-x-0 flex justify-between items-center px-4">
							<button
								className="flex items-center gap-2 text-white bg-black bg-opacity-70 rounded-full px-4 py-2 hover:bg-opacity-90"
								onClick={handlePrev}
								aria-label="Previous"
							>
								<ArrowLeft className="size-8" />
								<span>Prev</span>
							</button>
							<button
								className="flex items-center gap-2 text-white bg-black bg-opacity-70 rounded-full px-4 py-2 hover:bg-opacity-90"
								onClick={handleNext}
								aria-label="Next"
							>
								<span>Next</span>
								<ArrowRight className="size-8" />
							</button>
						</div>
						<DialogClose asChild>
							<button
								className="absolute top-4 right-4 text-white bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-90"
								aria-label="Close"
							>
								<X className="size-8" />
							</button>
						</DialogClose>
					</DialogContent>
				</Dialog>
			)}
		</section>
	);
};

export default Gallery;
