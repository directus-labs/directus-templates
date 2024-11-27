import React from 'react';
import clsx from 'clsx';

interface BaseBlockProps {
	type: string;
	uuid: string;
}

const BaseBlock: React.FC<BaseBlockProps> = ({ type, uuid }) => {
	const components: Record<string, React.ElementType> = {
		block_hero: () => <div className="p-4">Hero Block Temp Placeholder</div>,
		block_richtext: () => <div className="p-4">Rich Text Block Temp Placeholder</div>,
		block_gallery: () => <div className="p-4">Gallery Block Temp Placeholder</div>,
		block_pricing: () => <div className="p-4">Pricing Block Temp Placeholder</div>,
		block_form: () => <div className="p-4">Form Block Temp Placeholder</div>,
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
