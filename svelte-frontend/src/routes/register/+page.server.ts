import type { PageServerLoad, Actions, RequestEvent } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = (event) => {
	const user = event.locals.user;

	if (user) {
		throw redirect(302, '/account');
	}
};

export const actions = {
	default: async (event: RequestEvent) => {
		const formData = Object.fromEntries(await event.request.formData());

		if (!formData.username || !formData.email || !formData.password) {
			return fail(400, {
				error: 'Missing email, username or password'
			});
		}

		const { username, email, password } = formData as {
			username: string;
			email: string;
			password: string;
		};

		// Register
		const response = await fetch('http://localhost:1337/api/auth/local/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ username, email, password })
		});

		if (response.status !== 200) {
			console.error('response error', response);
			return fail(401, {
				error: 'An error occured while trying to register'
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
	}
} satisfies Actions;
