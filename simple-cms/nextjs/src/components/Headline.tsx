interface HeadlineProps {
	headline?: string | null;
	className?: string;
}

const BaseHeadline = ({ headline, className = '' }: HeadlineProps) => {
	if (!headline) return null;

	return (
		<p className={`text-foreground text-5xl font-normal leading-[78.4px] font-heading ${className}`}>{headline}</p>
	);
};

export default BaseHeadline;
