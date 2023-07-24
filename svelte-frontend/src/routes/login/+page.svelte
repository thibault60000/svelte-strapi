<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	import GoogleIcon from '$lib/components/icons/GoogleIcon.svelte';

	export let data: PageData;

	const { form, errors, message, constraints, delayed, enhance, reset } = superForm(data.form, {
		taintedMessage: 'Do you want to leave this page? Changes you made may not be saved.',

		onError: ({ result, message }) => {
			console.error('result', result);
			console.log('message', message);
			return { result, message };
		}
	});
</script>

<svelte:head>
	<title>Login</title>
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
			>Login</span
		>
	</h1>

	<form
		method="POST"
		action="?/login"
		use:enhance
		class="container mx-auto my-4 flex flex-col gap-2"
		data-testid="login-form"
	>
		<!-- Email -->
		<label for="email" class="email">
			<span> Email </span>
			<input
				class="input"
				class:input-error={$errors.email}
				{...$constraints.email}
				bind:value={$form.email}
				type="email"
				aria-invalid={$errors.email ? 'true' : undefined}
				name="email"
				placeholder="Enter your email"
				data-testid="email-input"
			/>
			{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
		</label>

		<!-- Password -->
		<label class="label" for="password"
			><span>Password</span>
			<input
				class="input"
				class:input-error={$errors.password}
				aria-invalid={$errors.password ? 'true' : undefined}
				bind:value={$form.password}
				type="password"
				name="password"
				placeholder="Enter your password"
				data-testid="password-input"
			/>
			{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}
		</label>

		<div class="my-3">
			<button
				type="submit"
				data-testid="login-button"
				class="btn btn-sm bg-gradient-to-br variant-gradient-primary-tertiary mt-2"
			>
				{$delayed ? 'Login in progress' : 'Confirm login'}
			</button>
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
		<button on:click={() => reset()}> reset </button>
	</form>
	<div class="mt-4">
		<p class="font-thin">
			No account ?
			<a href="/register" data-testid="register-button" class="underline">Register</a>
		</p>
	</div>
</section>

<style lang="postcss">
	input {
		@apply w-[300px];
	}
	label > span {
		@apply font-semibold block mb-1 pl-3;
	}
</style>
