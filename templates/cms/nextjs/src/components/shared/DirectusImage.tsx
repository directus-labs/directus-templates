import { getDirectusAssetURL } from '@/lib/directus/directus-utils';
import Image, { ImageProps } from 'next/image';

export interface DirectusImageProps extends Omit<ImageProps, 'src'> {
	uuid: string;
}

const DirectusImage = ({ uuid, alt, width, height, ...rest }: DirectusImageProps) => {
	const src = getDirectusAssetURL(uuid);

	return <Image src={src} alt={alt} width={width} height={height} {...rest} />;
};

export default DirectusImage;
