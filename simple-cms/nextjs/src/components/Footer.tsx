import React from 'react';
import { useDirectus } from '@/lib/directus/directus';
import BaseContainer from '@/components/Container';

const Footer = async () => {
	const { directus, readItem, readSingleton } = useDirectus();

	const [navPrimary, globals] = await Promise.all([
		directus.request(
			readItem('navigation', 'footer', {
				fields: [
					{
						items: [
							'id',
							'title',
							'page',
							{
								page: ['permalink'],
								children: ['id', 'title', 'url', { page: ['permalink'] }],
							},
						],
					},
				],
			}),
		),
		directus.request(readSingleton('globals', { fields: ['description'] })),
	]);

	return (
		<footer className="bg-gray dark:bg-gray py-8">
			<BaseContainer className="bg-gray dark:bg-gray text-foreground dark:text-black">
				<div className="flex flex-col md:flex-row justify-between items-start gap-8 pt-8">
					<div className="flex-1">
						<a href="/" className="text-lg font-bold">
							<img src="/images/logo.svg" alt="Logo" />
						</a>
						<p className="text-sm mt-2">{globals.description}</p>
					</div>

					<div className="flex flex-col items-start md:items-end flex-1">
						<nav className="w-full md:w-auto text-left">
							<ul className="space-y-4">
								{navPrimary.items?.map((group: any) => (
									<li key={group.id}>
										<a href={group.page?.permalink || group.url || '#'} className="hover:underline">
											{group.title}
										</a>
									</li>
								))}
							</ul>
						</nav>
					</div>
				</div>
			</BaseContainer>
		</footer>
	);
};

export default Footer;
