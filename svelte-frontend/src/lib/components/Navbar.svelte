<script lang="ts">
	const links = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Shop', href: '/sneakers' },
		{
			name: 'Orders',
			href: '/orders'
		}
	];
</script>

<template>
	<nav class="p-4">
		<ul class="flex flex-col gap-3">
			{#each links as link, i (i)}
				<a href={link.href}>{link.name}</a>
			{/each}
		</ul>
	</nav>
</template>

<style>
	a:hover {
		@apply bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent;
	}
</style>
