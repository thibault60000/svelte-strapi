<script lang="ts">
	import type { PageData } from './$types';
	import type { User } from '$lib/types';

	export let data: PageData;
	$: user = data.user as User;
</script>

<svelte:head>
	<title>My account</title>
</svelte:head>

<section class="card card-hover p-4">
	<div>
		<h1 class="h1">
			<span
				class="bg-gradient-to-br mb-2 from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
				>My account</span
			>
		</h1>
		<h2 class="my-3">
			Hello <span class="text-primary-400">
				{user.username}
			</span>
		</h2>

		<hr class="!border-t-4 mb-3" />
		<p><span class="text-secondary-400"> Email:</span> {user.email}</p>
		<p><span class="text-secondary-400"> Provider:</span>{user.provider}</p>
		<p><span class="text-secondary-400"> Confirmed:</span>{user.provider}</p>
		<p><span class="text-secondary-400"> Blocked: </span>{user.blocked}</p>
		<p><span class="text-secondary-400"> CreatedAt:</span> {user.createdAt}</p>
		<p><span class="text-secondary-400"> UpdatedAt:</span> {user.UpatedAt}</p>
	</div>
</section>
