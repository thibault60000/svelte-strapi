import type { PageLoad } from './$types';
import type { Load } from '@sveltejs/kit';
import type { Restaurant } from '$lib/types';

export const load: Load = (async () => {
	const response = await fetch('http://localhost:1337/api/restaurants');

	const json = await response.json();

	const { data, meta } = json;

	const restaurants = data?.length
		? data.map(({ id, attributes }: Restaurant) => ({ id, ...attributes }))
		: [];
	const pagination = meta.pagination;

	return {
		restaurants,
		pagination
	};
}) satisfies PageLoad;
