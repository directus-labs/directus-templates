import React from 'react';
import PageSection from './PageSection';
import BaseContainer from './BaseContainer';
import BaseBlock from './BaseBlock';
import { PageBlock } from '@/types/directus-schema';

interface PageBuilderProps {
	sections: PageBuilderSection[];
}

interface PageBuilderSection {
	background: PageBlock['background'];
	blocks: PageBlock[];
}

const PageBuilder: React.FC<PageBuilderProps> = ({ sections }) => {
	return (
		<>
			{sections.map((section, i) => (
				<PageSection key={i} background={section.background}>
					{section.blocks.map((block) => (
						<BaseContainer key={block.id}>
							<BaseBlock type={block.collection || ''} uuid={String(block.item || '')} />
						</BaseContainer>
					))}
				</PageSection>
			))}
		</>
	);
};

export default PageBuilder;
