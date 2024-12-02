interface TitleProps {
	title?: string | null;
	className?: string;
}

const BaseTitle = ({ title, className = '' }: TitleProps) => {
	if (!title) return null;

	return (
		<h2 className={`text-accent text-xl font-normal uppercase leading-[33.6px] font-heading ${className}`}>{title}</h2>
	);
};

export default BaseTitle;
