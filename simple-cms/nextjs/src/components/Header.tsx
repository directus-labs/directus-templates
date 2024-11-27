import React from 'react';
import { useDirectus } from '@/lib/directus';
import BaseContainer from '@/components/BaseContainer';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ThemeToggle from './ThemeToggle';

const Header = async () => {
	const { directus, readItem } = useDirectus();

	const [menu] = await Promise.all([
		directus.request(
			readItem('navigation', 'main', {
				fields: [
					{
						items: [
							'id',
							'title',
							{
								page: ['permalink'],
								children: ['id', 'title', 'url', { page: ['permalink'] }],
							},
						],
					},
				],
				deep: { items: { _sort: ['sort'] } },
			}),
		),
	]);

	return (
		<BaseContainer className="top-0 z-50 mb-4">
			<header className="flex items-center justify-between py-4">
				<a href="/" className="text-lg font-bold">
					<img src="/images/logo.svg" alt="Logo" className="h-8" />
				</a>
				<ThemeToggle />
				<nav className="hidden md:flex items-center space-x-8">
					{menu?.items?.map((section: any) => (
						<div key={section.id}>
							{section.children && section.children.length > 0 ? (
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="link" className="px-2 text-sm font-medium">
											{section.title}
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="start" className="bg-background">
										{section.children.map((child: any) => (
											<DropdownMenuItem key={child.id} asChild>
												<a href={child.page?.permalink || child.url || '#'} className="w-full text-left">
													{child.title}
												</a>
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							) : (
								<a href={section.page?.permalink || section.url || '#'} className="text-sm font-medium hover:underline">
									{section.title}
								</a>
							)}
						</div>
					))}
				</nav>

				{/* Mobile Menu Button */}
				<div className="md:hidden">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="link" size="icon" aria-label="Open menu">
								☰
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{menu?.items?.map((section: any) => (
								<DropdownMenuItem key={section.id} asChild>
									<a href={section.page?.permalink || section.url || '#'}>{section.title}</a>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
		</BaseContainer>
	);
};

export default Header;
