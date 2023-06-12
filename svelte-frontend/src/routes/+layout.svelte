<script lang="ts">
	import { page } from '$app/stores';

	import { AppShell, AppBar, type ModalComponent, Modal } from '@skeletonlabs/skeleton';
	import { Drawer } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { modalStore, drawerStore } from '@skeletonlabs/skeleton';

	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import type { LayoutData } from './$types';

	import Search from '$lib/components/modals/Search.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	export let data: LayoutData;
	$: user = data.user;

	function drawerOpen(): void {
		drawerStore.open({});
	}

	const modalComponentRegistry: Record<string, ModalComponent> = {
		modalSearch: {
			ref: Search
		}
	};

	function triggerSearch(): void {
		const modal: ModalSettings = {
			type: 'component',
			component: 'modalSearch',
			position: 'item-start'
		};
		modalStore.trigger(modal);
	}

	// Keyboard Shortcut (CTRL/⌘+K) to Focus Search
	function onWindowKeydown(e: KeyboardEvent): void {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault();
			$modalStore.length ? modalStore.close() : triggerSearch();
		}
	}

	$: classesSidebarLeft = ['/login', '/register'].includes($page.url.pathname)
		? 'w-0'
		: 'w-0 lg:w-48';
</script>

<!-- NOTE: using stopPropagation to override Chrome for Windows search shortcut -->
<svelte:window on:keydown|stopPropagation={onWindowKeydown} />

<!-- Drawer -->
<Drawer>
	<h2 class="p-4">Navigation</h2>
	<hr />
	<Navbar />
</Drawer>

<Modal components={modalComponentRegistry} />

<AppShell slotSidebarLeft="bg-surface-900 border-r border-surface-500 {classesSidebarLeft}">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					<h1 class="h1">
						<span class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent"
							>Prout.</span
						>
					</h1>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if user}
					<form method="POST" action="/account?/logout">
						<button type="submit" name="logout" value="true" class="btn btn-sm"> Logout </button>
					</form>
					<a class="btn btn-sm" href="/account" rel="noreferrer">
						Account ({user && user.username})
					</a>
				{:else}
					<a class="btn btn-sm" href="/login" rel="noreferrer"> Login </a>
					<a class="btn btn-sm" href="/register" rel="noreferrer"> Register </a>
				{/if}
				<div class="md:inline md:ml-4">
					<button
						class="btn p-2 px-4 space-x-4 variant-soft hover:variant-soft-primary"
						on:click={triggerSearch}
					>
						<svg
							fill="#fff"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 50 50"
							width="20px"
							height="20px"
							><path
								d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"
							/></svg
						>
						<span class="hidden md:inline-block badge variant-soft">{true ? '⌘' : 'Ctrl'}+K</span>
					</button>
				</div>
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navbar />
	</svelte:fragment>

	<main>
		<slot />
	</main>

	<svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>

<style>
	main {
		@apply p-6;
	}
</style>
