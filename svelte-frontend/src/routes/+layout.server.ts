import { hydrateAuth } from 'svelte-google-auth/server';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const user = locals.user;

	return {
		...hydrateAuth(locals),
		user
	};
}) satisfies LayoutServerLoad;
