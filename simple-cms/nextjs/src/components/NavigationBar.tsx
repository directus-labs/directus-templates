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
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import ThemeSwitch from './ui/ThemeToggle';

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
		<BaseContainer className="top-0 z-50 w-full mb-4">
			<header className="flex items-center justify-between py-4">
				<a href="/" className="text-lg font-bold">
					<img src="/images/logo.svg" alt="Logo" className="h-8" />
				</a>

				<nav className="hidden md:flex gap-8">
					<NavigationMenu>
						<NavigationMenuList className="flex gap-8">
							{menu?.items?.map((section: any) => (
								<NavigationMenuItem key={section.id}>
									{section.children && section.children.length > 0 ? (
										<>
											<NavigationMenuTrigger className="focus:outline-none">
												<span className="text-nav font-medium">{section.title}</span>
											</NavigationMenuTrigger>
											<NavigationMenuContent className="absolute mt-2 min-w-[150px] rounded-md bg-background p-4 shadow-md">
												<ul className="flex flex-col gap-4 pb-4">
													{section.children.map((child: any) => (
														<li key={child.id}>
															<NavigationMenuLink
																href={child.page?.permalink || child.url || '#'}
																className="text-nav font-medium"
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
											className="text-nav font-medium"
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
							<Button
								variant="link"
								size="icon"
								aria-label="Open menu"
								className="dark:text-white dark:hover:text-accent"
							>
								☰
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="start"
							className=" top-full w-screen bg-gray p-6 shadow-md max-w-full overflow-hidden"
						>
							<div className="flex flex-col gap-4">
								{menu?.items?.map((section: any) => (
									<Collapsible key={section.id}>
										<CollapsibleTrigger className="text-nav font-medium hover:text-accent w-full text-left flex items-center focus:outline-none">
											<span>{section.title}</span>
											{section.children && section.children.length > 0 && (
												<ChevronDown className="size-4 ml-1 hover:rotate-180 active:rotate-180 focus:rotate-180" />
											)}
										</CollapsibleTrigger>
										{section.children && section.children.length > 0 && (
											<CollapsibleContent className="ml-4 mt-2 flex flex-col gap-2">
												{section.children.map((child: any) => (
													<a
														key={child.id}
														href={child.page?.permalink || child.url || '#'}
														className="text-nav font-medium"
													>
														{child.title}
													</a>
												))}
											</CollapsibleContent>
										)}
									</Collapsible>
								))}
							</div>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			<ThemeSwitch className="relative top-1 left-4" />
		</BaseContainer>
	);
};

export default NavigationBar;
