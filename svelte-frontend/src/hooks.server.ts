import type { Handle } from '@sveltejs/kit';
import type { HandleFetch } from '@sveltejs/kit';

function redirect(location: string, body?: string) {
	return new Response(body, {
		status: 303,
		headers: { location }
	});
}

export const handleFetch = (async ({ request, fetch }) => {
	console.log('=== REQUEST HANDLE FETCH', request);
	return await fetch(request);
}) satisfies HandleFetch;

export const handle: Handle = (async ({ event, resolve }) => {
	console.log('🛣️ [Handle] pathname', event.url.pathname);

	if (event.url.pathname === '/auth/google/callback') {
		return await resolve(event);
	}

	console.log('🍪 [Handle] Cookies', event.cookies.getAll());

	const token = event.cookies.get('token');

	const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
	const expDateToken = decodedToken ? new Date(decodedToken.exp * 1000) : null;

	if (!token || !expDateToken || expDateToken < new Date()) {
		console.error('❌ [Handle] JWT expired or not present');

		if (event.url.pathname !== '/login' && event.url.pathname !== '/register') {
			console.log('➡️ [Handle] Not on Login/Register Page');
			console.groupEnd();
			return redirect('/login', 'No authenticated user');
		} else {
			console.log("➡️ [Handle] On Login/Register Page, don't redirect");
			console.groupEnd();
		}
	} else {
		try {
			// TODO : check if user on event.locals
			const response = await fetch('http://localhost:1337/api/users/me', {
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			});
			const user = await response.json();
			event.locals.user = user;
			console.log('✅ [Handle] user', user);
			console.groupEnd();
		} catch (error) {
			console.error('❌ [Handle] failed to retrieve user', error);
			console.groupEnd();
			return redirect('/login', 'No authenticated user');
		}
	}

	return await resolve(event);
}) satisfies Handle;
