import Link from 'next/link';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Header() {
	return (
		<header className="bg-gray mb-6">
			<div className="container mx-auto py-4 flex justify-between items-center">
				<Link href="/">
					<Image src="/images/logo.svg" alt="Logo" width={90} height={45} className="cursor-pointer" />
				</Link>

				<nav className="flex space-x-4">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="hover:underline">
								About
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<Link href="/privacy-policy" className="w-full">
									Privacy Policy
								</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<Link href="/contact" className="hover:underline">
						<Button variant="ghost">Contact Us</Button>
					</Link>
				</nav>
			</div>
		</header>
	);
}
