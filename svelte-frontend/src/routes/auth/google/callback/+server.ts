import { fail, json, redirect, type RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
	const accessToken = event.url.searchParams.get('access_token');

	if (!accessToken) return redirect(302, '/login');

	const response = await fetch(
		`http://localhost:1337/api/auth/google/callback?access_token=${accessToken}`,
		{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		}
	);

	const body = await response.json();

	console.log('🔑 [Auth/Google/Callback] body', body);

	if (response.status !== 200) {
		console.error('❌ [Auth/Google/Callback]  failed to retrieve user', body.error);
		return fail(response.status, body.error.message);
	}

	if (body.jwt) {
		event.cookies.set('token', `Bearer ${body.jwt}`, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 1 day
		});

		console.log('✅ [Auth/Google/Callback] JWT set in cookie');
		throw redirect(302, '/account');
	}

	return json(body);
}
