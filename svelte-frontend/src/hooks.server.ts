import type { Handle } from '@sveltejs/kit';

function redirect(location: string, body?: string) {
	return new Response(body, {
		status: 303,
		headers: { location }
	});
}

export const handle = (async ({ event, resolve }) => {
	const token = event.cookies.get('token');
	const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
	const expDateToken = decodedToken ? new Date(decodedToken.exp * 1000) : null;

	if (!token || !expDateToken || expDateToken < new Date()) {
		console.error('❌ [Handle] JWT expired or not present');

		if (event.url.pathname !== '/login' && event.url.pathname !== '/register') {
			console.log('➡️ [Handle] Not on Login/Register Page');
			return redirect('/login', 'No authenticated user');
		}
	}
	return await resolve(event);
}) satisfies Handle;
