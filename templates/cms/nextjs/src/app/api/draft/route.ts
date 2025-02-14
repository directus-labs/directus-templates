import { draftMode } from 'next/headers';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const secret = searchParams.get('secret');
	const slug = searchParams.get('slug');

	if (secret !== process.env.DRAFT_MODE_SECRET) {
		return new Response('Invalid token', { status: 401 });
	}

	if (!slug) {
		return new Response('Missing slug', { status: 401 });
	}

	const draft = await draftMode();
	draft.enable();

	return new Response(null, {
		status: 307,
		headers: {
			Location: `/blog/${slug}`,
		},
	});
}
