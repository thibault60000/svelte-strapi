<script lang="ts">
	import { getContext } from 'svelte';
	import type { User } from '../../lib/types';
	import type { Writable } from 'svelte/store';

	const user: Writable<User> = getContext('user');
</script>

<div>
	<h1>Mon compte</h1>
	{#if $user}
		<p>
			{$user.username}
		</p>
	{/if}
</div>
