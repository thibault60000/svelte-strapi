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
		<p>Hello, User n°{user.id}</p>
		<p>username: {user.username}</p>
		<p>email: {user.email}</p>
		<p>provider: {user.provider}</p>
		<p>confirmed:{user.provider}</p>
		<p>blocked: {user.blocked}</p>
		<p>createdAt: {user.createdAt}</p>
		<p>updatedAt: {user.UpatedAt}</p>
	</div>
</section>
