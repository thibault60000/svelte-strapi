<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import GoogleIcon from '$lib/components/icons/GoogleIcon.svelte';

	export let form: ActionData;
</script>

<section class="card card-hover p-4">
	<h1 class="h1">
		<span
			class="bg-gradient-to-br mb-2 from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
			>Register</span
		>
	</h1>
	<form
		method="POST"
		use:enhance
		class="container mx-auto my-4 flex flex-col gap-2"
		data-testid="login-form"
	>
		<!-- Username -->
		<label for="email"
			><span> Username </span>
			<input
				class="input"
				data-testid="username-input"
				type="text"
				name="username"
				placeholder="Enter username"
			/>
		</label>

		<!-- Email -->
		<label for="email" class="email">
			<span> Email </span>
			<input
				data-testid="email-input"
				class="input"
				type="email"
				name="email"
				placeholder="Enter your email"
			/>
		</label>

		<!-- Password -->
		<label class="label" for="password"
			><span>Password</span>
			<input
				class="input"
				type="password"
				name="password"
				placeholder="Enter your password"
				data-testid="password-input"
			/>
		</label>

		<div class="my-3">
			<button
				type="submit"
				class="btn btn-sm bg-gradient-to-br variant-gradient-primary-tertiary mt-2"
				data-testid="login-button">Confirm register</button
			>
			<div class="my-3">
				<p class="mb-2">Or</p>
				<a
					class="btn variant-filled-primary"
					rel="noopener"
					href="http://localhost:1337/api/connect/google"
				>
					<GoogleIcon />
					Login with Google
				</a>
			</div>
		</div>
	</form>
	<div class="my-3">
		<p class="font-thin">
			Already have account ?
			<a href="/login" data-testid="login-button" class="underline">Login</a>
		</p>
	</div>
</section>

{#if form?.error}
	<div class="notice error">
		{form.error}
	</div>
{/if}

<style lang="postcss">
	input {
		@apply w-[300px];
	}
	label > span {
		@apply font-semibold block mb-1 pl-3;
	}
</style>
