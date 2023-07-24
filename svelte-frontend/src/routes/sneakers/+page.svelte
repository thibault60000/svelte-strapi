<script lang="ts">
	import { goto } from '$app/navigation';
	import { formatCurrency } from '$lib/utils/currency';
	import type { PageData } from './$types';
	import { Table, tableMapperValues, Avatar } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';

	import dayjs from 'dayjs';

	export let data: PageData;

	$: sneakers = data.sneakers.map((sneaker: any) => {
		sneaker.createdAt = dayjs(sneaker.createdAt).format('DD/MM/YYYY');
		sneaker.price = formatCurrency(sneaker.price);
		return sneaker;
	});

	console.log('data', data);

	$: pagination = data.pagination;

	$: table = {
		head: ['Name', 'Stock', 'Price', 'Color', 'Created At'],
		body: tableMapperValues(sneakers, ['name', 'stock', 'price', 'color', 'createdAt']),
		meta: tableMapperValues(sneakers, ['id']),
		foot: ['Total', '', '', '', '', `<code class="code">${pagination.total}</code>`]
	} as TableSource;

	function onSelected(meta: { detail: Array<string | number> }): void {
		const { detail } = meta;
		const sneaker = sneakers.find((sneaker: { id: number }) => sneaker.id === detail[0]);
		goto(`/sneakers/${sneaker.id}`);
	}
</script>

<svelte:head>
	<title>Sneakers</title>
	<meta name="description" content="sneakers" />
</svelte:head>

<section class="card card-hover p-4 flex flex-col gap-4">
	<h1 class="text-xl bg-gradient-to-br from-amber-500 to-red-400 bg-clip-text text-transparent">
		Sneakers
	</h1>
	<Table source={table} interactive={true} on:selected={onSelected} />
	<a href="/sneakers/create" type="button" class="btn w-fit variant-filled-primary">+ Add Sneaker</a
	>
</section>
