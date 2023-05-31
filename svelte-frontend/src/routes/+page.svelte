<script lang="ts">
	import type { PageData } from './$types';
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';

	export let data: PageData;

	$: restaurants = data.restaurants;
	$: pagination = data.pagination;

	$: table = {
		head: ['Nom', 'Description', 'Créé le'],
		body: tableMapperValues(restaurants, ['name', 'description', 'created_at']),
		meta: tableMapperValues(restaurants, ['name', 'description', 'created_at']),
		foot: ['Total', '', `<code class="code">${pagination.total}</code>`]
	} as TableSource;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Restaurants" />
</svelte:head>

<section class="flex flex-col gap-4">
	<h1>Liste des restaurants</h1>
	<Table source={table} />
</section>
