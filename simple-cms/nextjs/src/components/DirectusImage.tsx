import Image, { ImageProps } from 'next/image';

export interface DirectusImageProps extends Omit<ImageProps, 'src'> {
	uuid: string;
}

const DirectusImage = ({ uuid, alt, ...rest }: DirectusImageProps) => {
	const src = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${uuid}`;

	return <Image src={src} alt={alt} {...rest} />;
};

export default DirectusImage;
