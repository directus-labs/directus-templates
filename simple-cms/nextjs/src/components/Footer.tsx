import { fetchFooterData } from '@/lib/directus/fetchers';
import Image from 'next/image';

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
			<div className=" px-16 lg:px-32 text-foreground dark:text-black">
				<div className="flex flex-col md:flex-row justify-between items-start gap-8 pt-8">
					<div className="flex-1">
						<a href="/" className="text-lg font-bold">
							<Image src="/images/logo.svg" alt="Logo" width={150} height={100} />
						</a>
						{globals?.description && <p className="text-description mt-2">{globals.description}</p>}
					</div>

					<div className="flex flex-col items-start md:items-end flex-1">
						<nav className="w-full md:w-auto text-left">
							<ul className="space-y-4">
								{navPrimary?.items?.map((group: any) => (
									<li key={group.id}>
										<a
											href={group.page?.permalink || group.url || '#'}
											className="text-nav font-medium hover:underline"
										>
											{group.title}
										</a>
									</li>
								))}
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
