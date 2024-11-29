import React from 'react';
import clsx from 'clsx';
import BlockRichText from './RichText';
import BlockHero from './Hero';

interface BaseBlockProps {
	type: string;
	uuid: string;
}

const BaseBlock: React.FC<BaseBlockProps> = ({ type, uuid }) => {
	const components: Record<string, React.ElementType> = {
		block_richtext: BlockRichText,
		block_hero: BlockHero,
		block_gallery: () => <div>Gallery Block Temp Placeholder</div>,
		block_pricing: () => <div>Pricing Block Temp Placeholder</div>,
		block_form: () => <div>Form Block Temp Placeholder</div>,
	};

	const Component = components[type];

	if (!Component) {
		return (
			<div className={clsx('block-container bg-background text-foreground p-4')}>
				<div>Unsupported Block Type: {type}</div>
			</div>
		);
	}

	return (
		<div className={clsx('block-container bg-background text-foreground p-4')}>
			<Component uuid={uuid} />
		</div>
	);
};

export default BaseBlock;
