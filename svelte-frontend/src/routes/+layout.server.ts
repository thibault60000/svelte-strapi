import type { LayoutServerLoad } from './$types';
import { fail, redirect, type Actions, type RequestEvent } from '@sveltejs/kit';

export const load = (async ({ cookies }) => {
	const token = cookies.get('token');

	const response = await fetch('http://localhost:1337/api/users/me', {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	if (response.status !== 200) {
		console.error('❌ [layout.server] failed to retrieve user');
		return {
			success: false,
			message: 'Échec de création'
		};
	}

	console.log('✅ User Retrieved', response.body);

	return {
		success: true,
		user: await response.json()
	};
}) satisfies LayoutServerLoad;
