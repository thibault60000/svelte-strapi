import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async (event) => {
	const { params } = event;

	console.log('params', params);

	const response = await fetch(`http://localhost:1337/api/sneakers/${params.id}?populate=image`);

	const json = await response.json();

	const sneaker = json.data;

	console.log('sneaker', sneaker);

	return {
		sneaker
	};
}) satisfies PageServerLoad;
