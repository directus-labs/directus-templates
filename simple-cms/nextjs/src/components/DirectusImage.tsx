export interface DirectusImageProps {
	uuid: string;
	alt: string;
	width?: number;
	height?: number;
	className?: string;
}

const DirectusImage = ({ uuid, alt, width, height, className }: DirectusImageProps) => {
	const imageUrl = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${uuid}`;

	return (
		<img
			src={imageUrl}
			alt={alt}
			width={width}
			height={height}
			loading="lazy"
			className={`object-cover ${className ?? ''}`}
		/>
	);
};

export default DirectusImage;
