import PageSection from './PageSection';
import BaseContainer from './Container';
import BaseBlock from '../app/blocks/Block';
import { PageBlock } from '@/types/directus-schema';

interface PageBuilderProps {
	sections: PageBuilderSection[];
}

interface PageBuilderSection {
	blocks: PageBlock[];
}

const PageBuilder = ({ sections }: PageBuilderProps) => {
	return (
		<>
			{sections.map((section, index) => (
				<PageSection key={index}>
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
