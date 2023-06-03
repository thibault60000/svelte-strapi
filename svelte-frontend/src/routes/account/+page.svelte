<script lang="ts">
	import type { PageData } from './$types';
	import type { User } from '$lib/types';

	export let data: PageData;
	$: user = data.user as User;
</script>

<svelte:head>
	<title>My account</title>
</svelte:head>

<section>
	<div>
		<h1>My account</h1>
		<p>Hello, {user?.username}</p>
	</div>
</section>
