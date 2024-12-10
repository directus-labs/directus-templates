import {
	createDirectus,
	readItems,
	readItem,
	rest,
	readSingleton,
	readUser,
} from '.pnpm/@directus+sdk@18.0.0/node_modules/@directus/sdk';
import type { RestClient } from '.pnpm/@directus+sdk@18.0.0/node_modules/@directus/sdk';
import Queue from 'p-queue';
import type { Schema } from '@/types/directus-schema';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const queue = new Queue({ intervalCap: 10, interval: 500, carryoverConcurrencyCount: true });

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL as string;

const fetchRetry = async (count: number, ...args: Parameters<typeof fetch>) => {
	const response = await fetch(...args);

	if (count > 2 || response.status !== 429) return response;

	console.warn(`[429] Too Many Requests (Attempt ${count + 1})`);

	await sleep(500);

	return fetchRetry(count + 1, ...args);
};

const directus = createDirectus<Schema>(directusUrl, {
	globals: {
		fetch: (...args) => queue.add(() => fetchRetry(0, ...args)),
	},
}).with(rest());

export function useDirectus() {
	return {
		directus: directus as RestClient<Schema>,
		readItems,
		readItem,
		readSingleton,
		readUser,
	};
}
