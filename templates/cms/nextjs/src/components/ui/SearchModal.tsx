'use client';

import { useEffect, useState } from 'react';
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { debounce } from '@/lib/utils';
import { DialogDescription, DialogTitle } from './dialog';
import { useRouter } from 'next/navigation';

type SearchResult = {
	id: string;
	title: string;
	description: string;
	type: string;
	link: string;
};

export default function SearchModal() {
	const [open, setOpen] = useState(false);
	const [results, setResults] = useState<SearchResult[]>([]);
	const [loading, setLoading] = useState(false);
	const [searched, setSearched] = useState(false);

	const router = useRouter();

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault();
				setOpen((prev) => !prev);
			}
		};
		document.addEventListener('keydown', onKeyDown);

		return () => document.removeEventListener('keydown', onKeyDown);
	}, []);

	useEffect(() => {
		if (!open) {
			setResults([]);
			setSearched(false);
			setLoading(false);
		}
	}, [open]);

	const fetchResults = async (search: string) => {
		if (search.length < 3) {
			setResults([]);
			setSearched(false);

			return;
		}

		setLoading(true);
		setSearched(true);

		try {
			const res = await fetch(`/api/search?search=${encodeURIComponent(search)}`);
			if (!res.ok) throw new Error('Failed to fetch results');
			const data: SearchResult[] = await res.json();
			setResults(data.filter((r) => r.link));
		} catch (error) {
			console.error('Error fetching search results:', error);
			setResults([]);
		} finally {
			setLoading(false);
		}
	};

	const debouncedFetchResults = debounce(fetchResults, 300);

	return (
		<div className="sm:max-w-[540px] max-w-full">
			<Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Search">
				<Search className="size-5" />
			</Button>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<DialogTitle className="p-2 sr-only">Search</DialogTitle>
				<DialogDescription className="px-2 sr-only">Search for pages or posts</DialogDescription>

				<CommandInput
					placeholder="Search for pages or posts"
					onValueChange={(value) => debouncedFetchResults(value)}
					className="m-2 p-4 focus:outline-none text-base leading-normal"
				/>

				<CommandList className="p-2 text-foreground max-h-[500px] overflow-auto">
					{!loading && !searched && (
						<CommandEmpty className="py-2 text-sm text-center">Enter a search term above to see results</CommandEmpty>
					)}
					{loading && <CommandEmpty className="py-2 text-sm text-center">Loading...</CommandEmpty>}
					{!loading && searched && results.length === 0 && (
						<CommandEmpty className="py-2 text-sm text-center">No results found</CommandEmpty>
					)}
					{!loading && results.length > 0 && (
						<CommandGroup heading="Search Results" className="pt-2" forceMount>
							{results.map((result) => (
								<CommandItem
									key={result.id}
									className="flex items-start gap-4 px-2 py-3"
									onSelect={() => {
										router.push(result.link);
										setOpen(false);
									}}
								>
									<Badge variant="default">{result.type}</Badge>
									<div className="ml-2 w-full">
										<p className="font-medium text-base">{result.title}</p>
										{result.description && <p className="text-sm mt-1 line-clamp-2">{result.description}</p>}
									</div>
								</CommandItem>
							))}
						</CommandGroup>
					)}
				</CommandList>
			</CommandDialog>
		</div>
	);
}
