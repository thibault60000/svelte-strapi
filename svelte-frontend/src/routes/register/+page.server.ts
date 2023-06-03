import type { Actions } from './$types';
import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import { setContext } from 'svelte';

export const actions = {
	default: async (event: RequestEvent) => {
		const { request, cookies } = event;

		const data = await request.formData();

		const email = data.get('email');
		const password = data.get('password');
		const username = data.get('username');

		console.log('🕵️‍♀️ email', email);
		console.log('🔐 password', password);
		console.log('🤷‍♂️ username', username);

		if (!email) return fail(400, { email, incorrect: true });
		if (!password) return fail(400, { password, incorrect: true });
		if (!username) return fail(400, { username, incorrect: true });

		const response = await fetch('http://localhost:1337/api/auth/local/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ username, email, password })
		});

		if (response.status === 400) {
			console.error('❌ Error', response);
			return fail(400, {
				success: false,
				message: 'Error 400'
			});
		}

		const body = await response.json();

		if (body.jwt) {
			cookies.set('token', body.jwt);
		}

		if (body.user) {
			console.log(`✅ User ${body.user.username} registed`);
			setContext('user', body.user);
			throw redirect(308, '/');
		}
	}
} satisfies Actions;
