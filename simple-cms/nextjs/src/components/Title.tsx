interface TitleProps {
	title?: string | null;
	className?: string;
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

const BaseTitle = ({ title, className = '', as: Component = 'h2' }: TitleProps) => {
	if (!title) return null;

	return (
		<Component
			className={`font-heading text-accent font-normal uppercase ${className}
         text-lg md:text-xl lg:text-title`}
		>
			{title}
		</Component>
	);
};

export default BaseTitle;
