import { fetchFooterData } from '@/lib/directus/fetchers';
import Link from 'next/link';
import ThemeToggle from '../ui/ThemeToggle';

const Footer = async () => {
	let footerData;
	try {
		footerData = await fetchFooterData();
	} catch (error) {
		console.error('Error loading footer data:', error);

		return null;
	}

	const { navPrimary, globals } = footerData;

	return (
		<footer className="bg-gray dark:bg-gray py-16">
			<div className="px-16 lg:px-32 text-foreground dark:text-black">
				<div className="flex flex-col md:flex-row justify-between items-start gap-8 pt-8">
					<div className="flex-1">
						<Link href="/">
							{globals?.logo ? (
								<img
									src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${globals.logo}`}
									alt="Logo"
									className="w-[120px] h-auto"
								/>
							) : (
								<img src="/images/logo.svg" alt="Logo" className="w-[90px] h-[45px]" />
							)}
						</Link>
						{globals?.description && <p className="text-description mt-2">{globals.description}</p>}

						{/* Social Links */}
						{globals?.social_links && (
							<div className="mt-4 flex space-x-4">
								{globals.social_links.map((social) => (
									<a
										key={social.service}
										href={social.url}
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-accent"
									>
										<img
											src={`/icons/social/${social.service}.svg`}
											alt={`${social.service} icon`}
											width={24}
											height={24}
											className="size-6"
										/>
									</a>
								))}
							</div>
						)}
					</div>

					<div className="flex flex-col items-start md:items-end flex-1">
						<nav className="w-full md:w-auto text-left">
							<ul className="space-y-4">
								{navPrimary?.items?.map((group: any) => (
									<li key={group.id}>
										{group.page?.permalink ? (
											<Link href={group.page.permalink} className="text-nav font-medium hover:underline">
												{group.title}
											</Link>
										) : (
											<a href={group.url || '#'} className="text-nav font-medium hover:underline">
												{group.title}
											</a>
										)}
									</li>
								))}
								<ThemeToggle className="dark:text-white" />
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
