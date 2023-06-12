<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<section class="card p-4">
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
				data-testid="login-button">Confirm login</button
			>
			<div class="my-3">
				<p class="mb-2">Or</p>
				<a
					class="btn variant-filled-primary"
					rel="noopener"
					href="http://localhost:1337/api/connect/google"
				>
					<svg
						class="border-r border-slate-800 pr-2 mr-2"
						fill="#1A1A1A"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 30 30"
						width="24px"
						height="24px"
					>
						<path
							d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"
						/></svg
					>
					Login with Google
				</a>
			</div>
		</div>
	</form>
	<div class="mt-4">
		<p class="font-thin">
			No account ?
			<a href="/register" data-testid="register-button" class="underline">Register</a>
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
