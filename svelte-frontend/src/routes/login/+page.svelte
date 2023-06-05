<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { signIn, signOut, initialize } from 'svelte-google-auth/client';

	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';

	export let form: ActionData;

	export let data: PageData;

	$: {
		console.log('===DATA====', data);
	}

	// data {
	//  auth: {
	// 	  access_token: undefined,
	// 	  client_id: "1098387602742-ici7cnmodqe13e14scjfba3rg6es8g5i.apps.googleusercontent.com"
	// 	  user: undefined
	//  }
	//  user: undefined
	// }

	initialize(data, invalidateAll);
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<section>
	<form
		method="POST"
		action="?/login"
		use:enhance
		class="container mx-auto my-4"
		data-testid="login-form"
	>
		<h1 class="text-center text-2xl font-bold">Login</h1>
		<div class="my-1">
			<label for="email">Email</label>
			<input data-testid="email-input" type="email" name="email" placeholder="Enter your email" />
		</div>
		<div class="my-1">
			<label for="password">Password </label>
			<input
				type="password"
				name="password"
				placeholder="Enter your password"
				data-testid="password-input"
			/>
		</div>
		<div class="my-3">
			<button type="submit" class="submit" data-testid="login-button">Login</button>
		</div>
	</form>
	<div class="m-3 w-[300px]">
		<button on:click={() => signIn()}>Sign In</button>
		<button on:click={() => signOut()}>Sign Out</button>
	</div>
	<div class="my-3">
		<p>
			No account ?
			<a href="/register" data-testid="register-button">Register</a>
		</p>
	</div>
</section>

{#if form?.error}
	<div class="notice error">
		{form.error}
	</div>
{/if}

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
