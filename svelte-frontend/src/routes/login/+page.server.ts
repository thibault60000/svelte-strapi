import type { Actions, PageServerLoad } from './$types';
import { fail, redirect, type RequestEvent } from '@sveltejs/kit';

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
	}
} satisfies Actions;
