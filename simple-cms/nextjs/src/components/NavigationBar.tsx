import React from 'react';
import { useDirectus } from '@/lib/directus/directus';
import BaseContainer from '@/components/Container';
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuTrigger,
	NavigationMenuContent,
	NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ui/ThemeToggle';

const NavigationBar = async () => {
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
				{/* Desktop Menu */}
				<nav className="hidden md:block">
					<NavigationMenu>
						<NavigationMenuList>
							{menu?.items?.map((section: any) => (
								<NavigationMenuItem key={section.id}>
									{section.children && section.children.length > 0 ? (
										<>
											<NavigationMenuTrigger>
												<span className="px-2 text-sm font-medium cursor-pointer">{section.title}</span>
											</NavigationMenuTrigger>
											<NavigationMenuContent className="min-w-[150px]">
												<ul className="p-4 bg-background shadow-md rounded-md">
													{section.children.map((child: any) => (
														<li key={child.id}>
															<NavigationMenuLink
																href={child.page?.permalink || child.url || '#'}
																className="text-sm font-medium"
															>
																{child.title}
															</NavigationMenuLink>
														</li>
													))}
												</ul>
											</NavigationMenuContent>
										</>
									) : (
										<NavigationMenuLink
											href={section.page?.permalink || section.url || '#'}
											className="text-sm font-medium"
										>
											{section.title}
										</NavigationMenuLink>
									)}
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
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

export default NavigationBar;
