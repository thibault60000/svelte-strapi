import type { LayoutServerLoad } from './$types';
import { VERCEL_COMMIT_REF } from '$env/static/private';

export const load = (async ({ locals }) => {
	const user = locals.user;

	return {
		user,
		deploymentGitBranch: VERCEL_COMMIT_REF
	};
}) satisfies LayoutServerLoad;
