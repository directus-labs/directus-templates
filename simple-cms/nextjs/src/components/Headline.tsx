interface HeadlineProps {
	headline?: string | null;
	className?: string;
}

const BaseHeadline = ({ headline, className = '' }: HeadlineProps) => {
	if (!headline) return null;

	return <p className={`text-headline font-heading text-foreground font-normal ${className}`}>{headline}</p>;
};

export default BaseHeadline;
