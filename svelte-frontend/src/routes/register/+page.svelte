<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;
	export let form: ActionData;

	let username = 'thibaultjp';
	let email = 'thibault.jeanpierre.dev@gmail.com';
	let password = '';
</script>

<form method="POST" use:enhance class="container mx-auto my-4" data-testid="login-form">
	<h1 class="text-center text-2xl font-bold">Register</h1>

	<!-- Username -->
	<div class="my-1">
		<label for="email">Username</label>
		<input
			data-testid="username-input"
			type="text"
			name="username"
			placeholder="Enter username"
			bind:value={username}
		/>
	</div>

	<!-- Email -->
	<div class="my-1">
		<label for="email">Email</label>
		<input
			data-testid="email-input"
			type="email"
			name="email"
			placeholder="Enter email"
			bind:value={email}
		/>
	</div>

	<!-- Password -->
	<div class="my-1">
		<label for="password">Password </label>
		<input
			type="password"
			name="password"
			placeholder="Enter password"
			bind:value={password}
			data-testid="password-input"
		/>
	</div>
	<div class="my-3">
		<button type="submit" class="submit" data-testid="login-button">Register</button>
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
