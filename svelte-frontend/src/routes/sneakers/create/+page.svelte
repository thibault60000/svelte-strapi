<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	import { Autocomplete, InputChip, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';

	export let data: PageData;

	const brandsList: AutocompleteOption[] = [
		{ value: '1', label: 'Adidas' },
		{ value: '2', label: 'Air Jordan' }
	];
	let availableSizesList: AutocompleteOption[] = [
		{ value: '38', label: '38' },
		{ value: '39', label: '39' },
		{ value: '40', label: '40' }
	];

	let availableSizeChipInput: string = '';

	const popupSettings: PopupSettings = {
		event: 'click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	const { form, errors, message, constraints, delayed, enhance, reset } = superForm(data.form, {
		taintedMessage: 'Do you want to leave this page? Changes you made may not be saved.',

		onError: ({ result, message }) => {
			console.error('result', result);
			console.log('message', message);
			return { result, message };
		}
	});

	function onBrandSelection(event: any): void {
		form.update((n) => {
			n.brand = event.detail.value;
			return n;
		});
	}
	function onAvailableSizeSelection(event: any): void {
		console.log('onInputChipSelect', event.detail);
		if (!$form.availableSizes.includes(event.detail.value)) {
			form.update((n) => {
				n.availableSizes = [...$form.availableSizes, event.detail.value];
				return n;
			});
			availableSizeChipInput = '';
		}
	}
</script>

<svelte:head>
	<title>Create sneaker</title>
</svelte:head>

<section class="card card-hover p-4">
	<SuperDebug data={$form} />

	{#if $message}
		<div class="status" class:error={$page.status >= 400} class:success={$page.status == 200}>
			{$message}
		</div>
	{/if}

	<h1 class="h1">
		<span
			class="bg-gradient-to-br mb-2 from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
			>Create Sneaker</span
		>
	</h1>

	<form
		method="POST"
		use:enhance
		class="container mx-auto my-4 flex flex-col gap-2"
		data-testid="create-sneaker-form"
	>
		<!-- Name -->
		<label for="name" class="label">
			<span> Name </span>
			<input
				class="input"
				class:input-error={$errors.name}
				{...$constraints.name}
				bind:value={$form.name}
				type="text"
				aria-invalid={$errors.name ? 'true' : undefined}
				name="name"
				placeholder="Name"
				data-testid="name-input"
			/>
			{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
		</label>

		<!-- Description -->
		<label class="label" for="description"
			><span>Description</span>
			<textarea
				class="input"
				class:input-error={$errors.description}
				aria-invalid={$errors.description ? 'true' : undefined}
				bind:value={$form.description}
				name="description"
				placeholder="Description"
				data-testid="description-textarea"
			/>
			{#if $errors.description}<span class="invalid">{$errors.description}</span>{/if}
		</label>

		<!-- Price -->
		<label for="price" class="label">
			<span> Price </span>
			<input
				class="input"
				class:input-error={$errors.price}
				{...$constraints.price}
				bind:value={$form.price}
				type="number"
				aria-invalid={$errors.price ? 'true' : undefined}
				name="price"
				placeholder="price"
				data-testid="price-input"
			/>
			{#if $errors.price}<span class="invalid">{$errors.price}</span>{/if}
		</label>

		<!-- Stock -->
		<label for="stock" class="label">
			<span> Stock </span>
			<input
				class="input"
				class:input-error={$errors.stock}
				{...$constraints.stock}
				bind:value={$form.stock}
				type="number"
				aria-invalid={$errors.stock ? 'true' : undefined}
				name="stock"
				placeholder="stock"
				data-testid="stock-input"
			/>
			{#if $errors.stock}<span class="invalid">{$errors.stock}</span>{/if}
		</label>

		<!-- Color -->
		<label for="email" class="label">
			<span> Color </span>
			<input
				class="input"
				bind:value={$form.color}
				type="text"
				class:input-error={$errors.color}
				{...$constraints.color}
				aria-invalid={$errors.color ? 'true' : undefined}
				name="color"
				placeholder="Color"
				data-testid="email-input"
			/>
			{#if $errors.color}<span class="invalid">{$errors.color}</span>{/if}
		</label>

		<!-- Brand -->
		<label for="brand" class="label">
			<span> Brand </span>
			<input
				class="input autocomplete"
				type="search"
				name="brand"
				class:input-error={$errors.brand}
				{...$constraints.brand}
				aria-invalid={$errors.brand ? 'true' : undefined}
				data-testid="brand-input"
				bind:value={$form.brand}
				placeholder="Brand"
				use:popup={popupSettings}
			/>
			<div
				data-popup="popupAutocomplete"
				class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto"
				tabindex="-1"
			>
				<Autocomplete
					on:selection={onBrandSelection}
					bind:input={$form.brand}
					options={brandsList}
				/>
			</div>
		</label>

		<!-- Available Sizes -->
		<label for="availableSize" class="label">
			<span> Available Size </span>

			<InputChip
				bind:input={availableSizeChipInput}
				bind:value={$form.availableSizes}
				placeholder="Available Size"
				name="availableSize"
			/>
			<div class="card w-full max-w-sm max-h-48 p-1 overflow-y-auto" tabindex="-1">
				<Autocomplete
					on:selection={onAvailableSizeSelection}
					bind:input={availableSizeChipInput}
					denylist={$form.availableSizes}
					options={availableSizesList}
				/>
			</div>
		</label>

		<div class="my-3">
			<button
				type="submit"
				data-testid="create-snakear-button"
				class="btn btn-sm bg-gradient-to-br variant-gradient-primary-tertiary mt-2"
			>
				{$delayed ? 'Creation in progress' : 'Create'}
			</button>
		</div>
		<button on:click={() => reset()}> reset </button>
	</form>
</section>

<style lang="postcss">
	input {
		@apply w-[300px];
	}
	label > span {
		@apply font-semibold block mb-1 pl-3;
	}
</style>
