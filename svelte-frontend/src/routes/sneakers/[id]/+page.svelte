<script lang="ts">
	import { formatCurrency } from '$lib/utils/currency';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log('data', data);

	$: sneaker = data.sneaker.attributes;
	$: images = sneaker.image && sneaker.image.data;
	$: mainImage = images?.length && images[0].attributes;
	$: url = mainImage
		? `http://localhost:1337${mainImage.url}`
		: 'https://img01.ztat.net/article/spp-media-p1/fa57974272cf47e499049f858fb6e8c5/7d683a5d45da46a282862777042a1bcc.jpg?imwidth=1800&filter=packshot';
</script>

<h1>
	<span
		class="text-4xl bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
		>{sneaker.name}</span
	>
</h1>

<div class="w-full text-token grid grid-cols-1 md:grid-cols-2 gap-4">
	<div class="card card-hover overflow-hidden">
		<header>
			<img
				class="bg-black/50 w-full aspect-[21/9] object-cover max-h-[400px]"
				src={url}
				alt={sneaker.name}
			/>
		</header>

		<div class="p-4 space-y-4">
			<h6 class="h6">{formatCurrency(sneaker.price)}</h6>
			<h3 class="h3" data-toc-ignore>{sneaker.name}</h3>
			<article>
				<p>
					{sneaker.description}
				</p>
			</article>
		</div>
		<hr class="opacity-50" />
		<footer class="p-4 flex justify-start items-center space-x-4">
			<div class="flex-auto flex justify-between items-center">
				<h6 class="font-bold">Stock {sneaker.stock}</h6>
				<small>{sneaker.color}</small>
			</div>
		</footer>
	</div>
	<pre>
		<code>
			{sneaker && JSON.stringify(sneaker, null, '\t')}
		</code>
	</pre>
</div>
