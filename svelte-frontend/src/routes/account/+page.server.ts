import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = (event) => {
	const user = event.locals.user;

	if (!user) {
		throw error(401, {
			message: '❌ You must be logged in to view this page'
		});
	}

	return {
		user
	};
};

export const actions = {
	logout: async (event: RequestEvent) => {
		event.cookies.delete('token');

		throw redirect(302, '/login');
	}
} satisfies Actions;
