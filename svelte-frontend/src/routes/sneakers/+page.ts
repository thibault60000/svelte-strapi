import type { PageLoad } from './$types';
import type { Load } from '@sveltejs/kit';
import type { Sneakers } from '$lib/types';

export const load: Load = (async () => {
	const response = await fetch('http://localhost:1337/api/sneakers');

	const json = await response.json();

	const { data, meta } = json;

	const sneakers = data?.length
		? data.map(({ id, attributes }: Sneakers) => ({ id, ...attributes }))
		: [];
	const pagination = meta.pagination;

	return {
		sneakers,
		pagination
	};
}) satisfies PageLoad;
