<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';

	let searchTerm = '';
	let htmlElementToFocus: HTMLElement;

	function onInput(event: Event): void {
		console.log('event', event);
		// TODO : Search
	}

	function onKeyDown(event: KeyboardEvent): void {
		if (['Enter', 'ArrowDown'].includes(event.code)) {
			const firstElementToFocus = htmlElementToFocus.querySelector('a');
			if (firstElementToFocus) firstElementToFocus.focus();
		}
	}

	let results = [
		{
			id: 1,
			label: 'Result 1',
			link: '/products/result-1'
		},
		{
			id: 2,
			label: 'Result 2',
			link: '/products/result-2'
		}
	];
</script>

<template>
	<section class="dark:bg-surface-500/30">
		<!-- Header -->

		<header class="bg-surface-300-600-token flex items-center">
			<input
				class="bg-transparent border-0 ring-0 focus:ring-0 w-full p-4 text-lg"
				bind:value={searchTerm}
				type="search"
				placeholder="Search..."
				on:input={onInput}
				on:keydown={onKeyDown}
			/>
		</header>

		<!-- Content -->

		<div bind:this={htmlElementToFocus} class="overflow-x-auto max-h-[480px] hide-scrollbar">
			<ul tabindex="-1">
				{#each results as result (result.id)}
					<li class="text-lg hover:bg-surface-600/50">
						<a
							href={result.link}
							class="flex justify-between items-center p-4"
							on:click={() => {
								modalStore.close();
							}}
						>
							<div class="flex items-center gap-4">
								<i class="fa-regular fa-file" />
								<span class="flex-auto font-bold opacity-75">{result.label}</span>
							</div>
							<span class="hidden md:block text-xs opacity-50">{result.link}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Footer -->

		<footer
			class="hidden md:flex items-center gap-2 bg-surface-300-600-token p-4 text-xs font-bold"
		>
			<div><kbd class="kbd">Esc</kbd> to close</div>
			<div><kbd class="kbd">Tab</kbd> to navigate</div>
			<div><kbd class="kbd">Enter</kbd> to select</div>
		</footer>
	</section>
</template>

<style lang="postcss">
	section {
		@apply card
        bg-surface-100/60
        backdrop-blur-lg
        overflow-hidden
        w-full
        max-w-[800px]
        shadow-xl mt-8 mb-auto;
	}
</style>
