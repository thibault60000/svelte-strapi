import { fail, redirect, type Actions, type RequestEvent } from '@sveltejs/kit';
import user from '$lib/user';

export const actions = {
	default: async (event: RequestEvent) => {
		const { cookies } = event;

		const jwt = await cookies.get('token');

		if (!jwt) {
			return fail(400, {
				success: false,
				message: 'User not authenticated'
			});
		} else {
			await cookies.delete('token', { path: '/' });
			user.set(null);
			throw redirect(308, '/login');
		}
	}
} satisfies Actions;
