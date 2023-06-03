<script lang="ts">
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { enhance } from '$app/forms';

	import type { User } from '../lib/types';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const user = writable<User | null>(null);
	$: user.set(data.user);

	setContext('user', user);
</script>

<div class="app">
	<!-- App Shell -->
	<AppShell>
		<svelte:fragment slot="header">
			<!-- App Bar -->
			<AppBar>
				<svelte:fragment slot="lead">
					<a href="/">
						<strong class="text-xl uppercase">Svelte + Strapi</strong>
					</a>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					{#if $user}
						<form method="POST" use:enhance action="/logout">
							<button type="submit" class="btn btn-sm variant-ghost-surface"> Logout </button>
						</form>
						<a class="btn btn-sm variant-ghost-surface" href="/account" rel="noreferrer">
							Account ({$user && $user.username})
						</a>
					{:else}
						<a class="btn btn-sm variant-ghost-surface" href="/login" rel="noreferrer"> Login </a>
						<a class="btn btn-sm variant-ghost-surface" href="/register" rel="noreferrer">
							Register
						</a>
					{/if}
				</svelte:fragment>
			</AppBar>
		</svelte:fragment>
	</AppShell>

	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
