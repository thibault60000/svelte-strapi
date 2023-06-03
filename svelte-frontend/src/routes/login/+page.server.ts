import type { Actions } from './$types';
import { fail, redirect, type RequestEvent } from '@sveltejs/kit';

export const actions = {
	default: async (event: RequestEvent) => {
		const { request, cookies } = event;

		const data = await request.formData();

		const email = data.get('email');
		const password = data.get('password');

		console.log('🕵️‍♀️ email', email);
		console.log('🔐 password', password);

		if (!email) return fail(400, { email, incorrect: true });
		if (!password) return fail(400, { password, incorrect: true });

		// Login
		const response = await fetch('http://localhost:1337/api/auth/local', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ identifier: email, password })
		});

		if (response.status === 400) {
			console.error('❌ Error', response);
			return fail(400, {
				success: false,
				message: 'Error 400'
			});
		}
		if (response.status === 401) {
			console.error('❌ Error', response);
			return fail(401, {
				success: false,
				message: 'Username or password incorrect'
			});
		}

		const body = await response.json();

		console.log('🔑 body', body);

		if (body.jwt) {
			cookies.set('token', body.jwt);
		}

		if (body.user) {
			console.log(`✅ User ${body.user.username} connected`);
			throw redirect(307, '/login');
		}
	}
} satisfies Actions;
