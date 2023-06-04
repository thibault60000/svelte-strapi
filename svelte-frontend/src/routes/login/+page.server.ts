import type { Actions, PageServerLoad } from './$types';
import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

export const load: PageServerLoad = (event) => {
	const user = event.locals.user;

	if (user) {
		throw redirect(302, '/account');
	}
};

export const actions: Actions = {
	login: async (event: RequestEvent) => {
		console.log('Login action');
		const formData = Object.fromEntries(await event.request.formData());

		if (!formData.email || !formData.password) {
			return fail(400, {
				error: 'Missing email or password'
			});
		}

		const { email, password } = formData as { email: string; password: string };

		// Login
		const response = await fetch('http://localhost:1337/api/auth/local', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ identifier: email, password })
		});

		if (response.status !== 200) {
			console.error('response error', response);
			return fail(401, {
				error: 'An error occured while trying to login'
			});
		}

		const body = await response.json();

		console.log('🔑 body', body);

		if (body.jwt) {
			event.cookies.set('token', `Bearer ${body.jwt}`, {
				httpOnly: true,
				path: '/',
				secure: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 // 1 day
			});
			console.log('✅ [Login] JWT set in cookie');
		}

		throw redirect(302, '/account');
	},
	OAuth2: async () => {
		const redirectURL = 'http://localhost:5173/oauth';

		console.log('client id', GOOGLE_CLIENT_ID);

		const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectURL);

		// Generate the url that will be used for the consent dialog.
		const authorizeUrl = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: 'https://www.googleapis.com/auth/userinfo.profile  openid ',
			prompt: 'consent'
		});

		throw redirect(302, authorizeUrl);
	}
} satisfies Actions;
