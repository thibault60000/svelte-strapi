<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	import user from '$lib/user';

	export let data: PageData;
	export let form: ActionData;

	$: {
		console.group('+page.svelte');
		console.log('data', data);
		console.log('form', form);
		console.log('user', $user);
		console.groupEnd();
	}

	let email = 'thibault.jeanpierre.dev@gmail.com';
	let password = '';
</script>

<form method="POST" use:enhance class="container mx-auto my-4" data-testid="login-form">
	<h1 class="text-center text-2xl font-bold">Login</h1>
	<div class="my-1">
		<label for="email">Email</label>
		<input
			data-testid="email-input"
			type="email"
			name="email"
			placeholder="Enter your email"
			bind:value={email}
		/>
	</div>
	<div class="my-1">
		<label for="password">Mot de passe </label>
		<input
			type="password"
			name="password"
			placeholder="Enter your password"
			bind:value={password}
			data-testid="password-input"
		/>
	</div>
	<div class="my-3">
		<button type="submit" class="submit" data-testid="login-button">Se connecter</button>
	</div>

	{#if form}
		<p>{form.message}</p>
	{/if}
</form>

<style lang="postcss">
	label {
		@apply font-bold block mb-1;
	}
	input {
		@apply bg-white w-full border border-gray-500 rounded outline-none py-2 px-4;
	}
	.submit {
		@apply bg-blue-500 text-white border-transparent rounded px-4 py-2;
	}
</style>
