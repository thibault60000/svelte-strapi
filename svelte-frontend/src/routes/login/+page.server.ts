import type { Actions, PageServerLoad } from './$types';
import { fail, redirect, type RequestEvent } from '@sveltejs/kit';

import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const schema = z.object({
	email: z.string().email().default('thibault.jeanpierre.dev@gmail.com'),
	password: z.string().min(8).default('testestest123')
});

export const load: PageServerLoad = async (event: RequestEvent) => {
	console.log('load');
	const user = event.locals.user;

	const form = await superValidate(schema);

	if (user) {
		throw redirect(302, '/account');
	}

	return { form: form };
};

export const actions: Actions = {
	login: async (event: RequestEvent) => {
		const { request } = event;

		const loginForm = await superValidate(request, schema);

		console.log('POST', loginForm);

		// POST {
		//   id: 'e1reir',
		//   valid: false,
		//   posted: true,
		//   errors: { password: [ 'String must contain at least 8 character(s)' ] },
		//   data: { email: 'test@gmail.com', password: 't' },
		//   constraints: {
		//     email: { required: true },
		//     password: { minlength: 8, required: true }
		//   }
		// }

		if (!loginForm.valid) {
			return fail(400, {
				loginForm
			});
		}

		const { data } = loginForm;

		const { email, password } = data as { email: string; password: string };

		console.log('🔑 [Login] email, password', email, password);

		const response = await fetch('http://localhost:1337/api/auth/local', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ identifier: email, password })
		});

		const body = await response.json();

		// console.log('🔑 [Login] body', body);

		if (response.status !== 200) {
			return fail(response.status, {
				loginForm,
				body
			});
		}

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
