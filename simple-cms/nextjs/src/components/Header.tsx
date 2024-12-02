interface HeaderProps {
	title?: string | null;
	headline?: string | null;
	className?: string;
}

const Header = ({ title, headline, className = '' }: HeaderProps) => {
	return (
		<header className={`space-y-4 ${className}`}>
			{title && <h2 className="text-accent text-xl font-normal uppercase leading-[33.6px] font-heading">{title}</h2>}
			{headline && <p className="text-foreground text-5xl font-normal leading-[78.4px] font-heading">{headline}</p>}
		</header>
	);
};

export default Header;
