import React from 'react';
import PageSection from './PageSection';
import BaseContainer from './BaseContainer';
import BaseBlock from './BaseBlock';
import { PageBlock } from '@/types/directus-schema';

interface PageBuilderProps {
	sections: PageBuilderSection[];
}

interface PageBuilderSection {
	blocks: PageBlock[];
}

const PageBuilder: React.FC<PageBuilderProps> = ({ sections }) => {
	return (
		<>
			{sections.map((section, i) => (
				<PageSection key={i}>
					{section.blocks.map((block) => (
						<BaseContainer key={block.id} className="py-4">
							<BaseBlock type={block.collection || ''} uuid={String(block.item || '')} />
						</BaseContainer>
					))}
				</PageSection>
			))}
		</>
	);
};

export default PageBuilder;
