<script lang="ts">
	import type { PageData } from './$types';
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';

	export let data: PageData;

	$: sneakers = data.sneakers;
	$: pagination = data.pagination;

	$: table = {
		head: ['Name', 'Stock', 'Price', 'Color', 'Available Sizes', 'Created At'],
		body: tableMapperValues(sneakers, [
			'name',
			'stock',
			'price',
			'color',
			'availableSizes',
			'createdAt'
		]),
		meta: tableMapperValues(sneakers, [
			'name',
			'stock',
			'price',
			'color',
			'availableSizes',
			'createdAt'
		]),
		foot: ['Total', '', `<code class="code">${pagination.total}</code>`]
	} as TableSource;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="sneakers" />
</svelte:head>

<section class="card card-hover flex flex-col gap-4">
	<h1>Sneakers</h1>
	<Table source={table} />
</section>
