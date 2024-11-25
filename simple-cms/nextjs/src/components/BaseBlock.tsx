import React from 'react';

interface BaseBlockProps {
	type: string;
	uuid: string;
}

const BaseBlock: React.FC<BaseBlockProps> = ({ type, uuid }) => {
	const components: Record<string, React.ElementType> = {
		block_hero: () => <div>Hero Block Temp Placeholder</div>,
		block_richtext: () => <div>Rich Text Block Temp Placeholder</div>,
		block_gallery: () => <div>Gallery Block Temp Placeholder</div>,
		block_pricing: () => <div>Pricing Block Temp Placeholder</div>,
		block_form: () => <div>Form Block Temp Placeholder</div>,
	};

	const Component = components[type];

	if (!Component) {
		return (
			<div className="block-container">
				<div>Unsupported Block Type: {type}</div>
			</div>
		);
	}

	return (
		<div className="block-container">
			<Component uuid={uuid} />
		</div>
	);
};

export default BaseBlock;
