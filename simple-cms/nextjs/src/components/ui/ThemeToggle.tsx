'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

interface SwitchOption {
	name: string;
	value: string;
	iconSvg: JSX.Element;
}

const SWITCH_DATA: SwitchOption[] = [
	{
		name: 'System',
		value: 'system',
		iconSvg: (
			<svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24">
				<path fill="currentColor" d="M1 2h22v8.25h-2V4H3v12h8.5v2H1zm2 18h8.5v2H3z" />
				<path
					fill="currentColor"
					d="M19.5 12v1.376c.715.184 1.352.56 1.854 1.072l1.193-.689l1 1.732l-1.192.688a4 4 0 0 1 0 2.142l1.192.688l-1 1.732l-1.193-.689a4 4 0 0 1-1.854 1.072V22.5h-2v-1.376a4 4 0 0 1-1.854-1.072l-1.193.689l-1-1.732l1.192-.688a4 4 0 0 1 0-2.142l-1.192-.688l1-1.732l1.193.688a4 4 0 0 1 1.854-1.071V12zm-2.751 4.283a2 2 0 0 0-.25.967c0 .35.091.68.25.967l.036.063a2 2 0 0 0 3.43 0l.036-.063c.159-.287.249-.616.249-.967c0-.35-.09-.68-.249-.967l-.036-.063a2 2 0 0 0-3.43 0z"
				/>
			</svg>
		),
	},
	{
		name: 'Light',
		value: 'light',
		iconSvg: (
			<svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24">
				<path
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-5 0h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7"
				/>
			</svg>
		),
	},
	{
		name: 'Dark',
		value: 'dark',
		iconSvg: (
			<svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24">
				<path
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"
				/>
			</svg>
		),
	},
];

const ThemeSwitch = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	return (
		<div className="w-fit">
			<div className="flex w-auto flex-row justify-center overflow-hidden rounded-3xl border border-neutral-300 dark:border-neutral-600 sm:flex-row">
				{SWITCH_DATA.map((data) => (
					<button
						key={data.value}
						className={clsx(
							'flex items-center gap-2 px-4 py-2 text-sm font-medium',
							'transition-colors duration-200',
							'hover:text-accent',
							{
								'bg-neutral-300 dark:bg-neutral-700': theme === data.value && mounted,
								'text-black dark:text-white': theme !== data.value || !mounted,
							},
						)}
						onClick={() => setTheme(data.value)}
					>
						{data.iconSvg}
						<span className="hidden sm:block">{data.name}</span>
					</button>
				))}
			</div>
		</div>
	);
};

export default ThemeSwitch;
