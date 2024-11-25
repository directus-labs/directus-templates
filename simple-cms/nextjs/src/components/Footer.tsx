import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
	return (
		<footer className="bg-gray border-none py-[100px] h-[314px]">
			<div className="container mx-auto flex justify-between items-start space-y-4 md:space-y-0">
				<div>
					<Image src="/images/logo.svg" alt="Logo" width={90} height={45} />
				</div>

				<div className="flex flex-col items-start space-y-2">
					<Link href="/blog" className="hover:underline">
						Blog
					</Link>
					<Link href="/privacy-policy" className="hover:underline">
						Privacy Policy
					</Link>
					<Link href="/contact" className="hover:underline">
						Contact Us
					</Link>
				</div>
			</div>
		</footer>
	);
}
