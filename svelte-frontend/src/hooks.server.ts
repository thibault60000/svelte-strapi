import type { Handle } from '@sveltejs/kit';

/**
 * Crée une redirection HTTP vers une autre URL.
 * @param {string} location - L'URL vers laquelle effectuer la redirection.
 * @param {string} [body] - Le corps de la réponse HTTP (optionnel).
 * @returns {Response} - Un objet Response représentant la redirection HTTP.
 */
function redirect(location: string, body?: string) {
	return new Response(body, {
		status: 303,
		headers: { location }
	});
}

export const handle = (async ({ event, resolve }) => {
	/**
	 * @param {Object} event - L'événement contenant les informations de la requête
	 * @property {Object} cookies - Les cookies de la requête
	 * @property {Function} fetch - Une fonction pour effectuer des requêtes HTTP
	 * @property {Object} locals - Un objet pour stocker des données locales à la requête
	 * @property {Object} params - Les paramètres de la requête
	 * @property {Object} platform - La plateforme sur laquelle s'exécute la requête
	 * @property {Object} request - L'objet de requête HTTP
	 * @property {Function} getClientAddress - Une fonction pour obtenir l'adresse IP du client
	 * @property {Object} route - Les informations sur la route de la requête
	 * @property {string} route.id - L'ID de la route actuelle (ex: '/login')
	 * @property {Function} setHeaders - Une fonction pour définir les en-têtes de la réponse
	 * @property {string} url - L'URL de la requête
	 * @property {boolean} isDataRequest - Indique si la requête est une demande de données
	 */

	const jwt = event.cookies.get('token');
	const decodedJwt = jwt ? JSON.parse(atob(jwt.split('.')[1])) : null;
	const expDateJwt = decodedJwt ? new Date(decodedJwt.exp * 1000) : null;

	// JWT is not present or expired
	if (!jwt || !expDateJwt || expDateJwt < new Date()) {
		console.error('JWT expired or not present');

		if (event.url.pathname !== '/login') {
			return redirect('/login', 'No authenticated user');
		}
	}
	return await resolve(event);
}) satisfies Handle;
