import type { Actions, RequestEvent } from './$types';

export const actions: Actions = {
	default: async (event: RequestEvent) => {
		console.log('default action');
	}
};
