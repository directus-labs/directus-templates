import { PageBlock } from '@/types/directus-schema';
import BaseBlock from '@/components/BaseBlock';

interface PageBuilderProps {
	sections: PageBlock[];
}

const PageBuilder = ({ sections }: PageBuilderProps) => {
	const validBlocks = sections.filter(
		(block): block is PageBlock & { collection: string; item: object } =>
			typeof block.collection === 'string' && !!block.item && typeof block.item === 'object',
	);

	return (
		<div>
			{validBlocks.map((block) => (
				<div key={block.id} className={`py-8 section-${block.background}`}>
					<div className="base-container max-w-8xl mx-auto px-4 md:px-8 lg:px-16 bg-background text-foreground">
						<BaseBlock block={block} />
					</div>
				</div>
			))}
		</div>
	);
};

export default PageBuilder;
