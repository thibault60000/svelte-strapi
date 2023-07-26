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
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	import type { LayoutServerData } from './$types';

	import Search from '$lib/components/modals/Search.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import BurgerIcon from '$lib/components/icons/BurgerIcon.svelte';

	export let data: LayoutServerData;

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
							<BurgerIcon />
						</span>
					</button>
					<h1 class="h1">
						<span class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent"
							>Sneakers.
						</span>
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
						<SearchIcon />
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

	<svelte:fragment slot="footer">
		<Footer />
		{data.deploymentGitBranch}
	</svelte:fragment>
</AppShell>

<style>
	main {
		@apply p-6;
	}
</style>
