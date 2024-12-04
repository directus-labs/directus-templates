interface TitleProps {
	title?: string | null;
	className?: string;
}

const BaseTitle = ({ title, className = '' }: TitleProps) => {
	if (!title) return null;

	return <h2 className={`text-title font-heading text-accent font-normal uppercase ${className}`}>{title}</h2>;
};

export default BaseTitle;
