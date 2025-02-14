import { config } from 'dotenv';
import { generateDirectusTypes } from 'directus-sdk-typegen';

config();

async function generateTypes() {
	const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
	const directusToken = process.env.DIRECTUS_PUBLIC_TOKEN;

	if (!directusUrl || !directusToken) {
		console.error('Error: NEXT_PUBLIC_DIRECTUS_URL or DIRECTUS_PUBLIC_TOKEN is missing in the .env file.');
		process.exit(1);
	}
	try {
		await generateDirectusTypes({
			outputPath: './src/types/directus-schema.ts',
			directusUrl,
			directusToken,
		});
		console.log('Types successfully generated!');
	} catch (error) {
		console.error('Failed to generate types:', error);
	}
}

generateTypes();
