<script lang="ts">
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
	$: user = data.user;
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
					{#if user}
						<form method="POST" action="?/logout">
							<button
								type="submit"
								name="logout"
								value="true"
								class="btn btn-sm variant-ghost-surface"
							>
								Logout
							</button>
						</form>
						<a class="btn btn-sm variant-ghost-surface" href="/account" rel="noreferrer">
							Account ({user && user.username})
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

	<slot />
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
