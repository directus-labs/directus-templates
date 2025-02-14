'use client';

import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Container from '@/components/ui/container';
import { Key } from 'react';

export default function Footer({ navigation, globals }: { navigation: any; globals: any }) {
	const directusURL = process.env.NEXT_PUBLIC_DIRECTUS_URL;
	const lightLogoUrl = globals?.logo ? `${directusURL}/assets/${globals.logo}` : '/images/logo.svg';
	const darkLogoUrl = globals?.logo_dark_mode ? `${directusURL}/assets/${globals.logo_dark_mode}` : '';

	return (
		<footer className="bg-gray dark:bg-[var(--background-variant-color)] py-16">
			<Container className="text-foreground dark:text-white">
				<div className="flex flex-col md:flex-row justify-between items-start gap-8 pt-8">
					<div className="flex-1">
						<Link href="/" className="inline-block transition-opacity hover:opacity-70">
							<img
								src={lightLogoUrl}
								alt="Logo"
								className={darkLogoUrl ? 'w-[120px] h-auto dark:hidden' : 'w-[120px] h-auto'}
							/>
							{darkLogoUrl && (
								<img src={darkLogoUrl} alt="Logo (Dark Mode)" className="w-[120px] h-auto hidden dark:block" />
							)}
						</Link>
						{globals?.description && <p className="text-description mt-2">{globals.description}</p>}
						{globals?.social_links && (
							<div className="mt-4 flex space-x-4">
								{globals.social_links.map((social: { service: Key | null | undefined; url: string | undefined }) => (
									<a
										key={social.service}
										href={social.url}
										target="_blank"
										rel="noopener noreferrer"
										className="size-8 rounded bg-transparent inline-flex items-center justify-center transition-colors hover:opacity-70"
									>
										<img
											src={`/icons/social/${social.service}.svg`}
											alt={`${social.service} icon`}
											className="size-6 dark:invert"
										/>
									</a>
								))}
							</div>
						)}
					</div>
					<div className="flex flex-col items-start md:items-end flex-1">
						<nav className="w-full md:w-auto text-left">
							<ul className="space-y-4">
								{navigation?.items?.map((group: any) => (
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
			</Container>
		</footer>
	);
}
