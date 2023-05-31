import type { Actions, PageServerLoad } from './$types';
import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import user from '$lib/user';

export const load = (async ({ cookies }) => {
	const response = await fetch(`http://localhost:1337/api/users/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg1NTEzMTA4LCJleHAiOjE2ODgxMDUxMDh9.1afWIX-8Cz04RZfrBTLBd1Oy-EnndRIMy4rpomCZscU`
		}
	});

	const auth_user = await response.json();

	if (!auth_user) {
		user.set(null);
		cookies.delete('token');
		return fail(401);
	}

	return {
		auth_user
	};
}) satisfies PageServerLoad;

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

		const response = await fetch('http://localhost:1337/api/auth/local', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ identifier: email, password })
		});

		if (response.status === 400)
			return fail(400, {
				success: false,
				message: 'Les informations renseignées ne respectent pas le format attendu'
			});
		if (response.status === 401)
			return fail(401, {
				success: false,
				message: 'Identifiant ou mot de passe incorrect'
			});

		const body = await response.json();

		if (body.jwt) {
			cookies.set('token', body.jwt);
			if (body.user) {
				user.set(body.user);
				throw redirect(308, '/');
			}
		}
	}
} satisfies Actions;
