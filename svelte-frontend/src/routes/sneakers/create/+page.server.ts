import type { Actions, PageServerLoad } from './$types';
import { fail, type RequestEvent, redirect } from '@sveltejs/kit';
import boxen from 'boxen';

import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
const schema = z.object({
	name: z.string().min(5).default('Originals NY 90'),
	description: z.string().min(10).default('Best shoes ever'),
	price: z.number().min(1).default(55000),
	brand: z.string().default('1'),
	//availableSize: z.enum(['36', '37', '38', '39', '40', '41', '42', '43', '44', '45']).default('36'),
	availableSizes: z.array(z.string()).default(['38']),
	color: z.enum(['red', 'blue', 'green', 'yellow', 'black', 'white']).default('red'),
	stock: z.number().min(1).default(10)
});

export type Sneaker = z.infer<typeof schema>;

export const load: PageServerLoad = async (event: RequestEvent) => {
	const user = event.locals.user;

	const form = await superValidate(schema);

	return { form, user };
};

export const actions: Actions = {
	default: async (event: RequestEvent) => {
		const { request } = event;
		const createForm = await superValidate(request, schema);

		// 'black' 'red' 'green' 'yellow' 'blue' 'magenta' 'cyan' 'white'
		console.log(
			boxen(JSON.stringify(createForm, null, 2), {
				borderStyle: 'double',
				titleAlignment: 'center',
				title: 'Create Form',
				padding: 1,
				borderColor: 'green'
			})
		);

		if (!createForm.valid) {
			return fail(400, {
				createForm
			});
		}

		const { data }: { data: Sneaker } = createForm;

		console.log(
			boxen(JSON.stringify(data, null, 2), {
				borderStyle: 'double',
				titleAlignment: 'center',
				title: 'Create Form Data',
				padding: 1,
				borderColor: 'yellow'
			})
		);

		const response = await fetch('http://localhost:1337/api/sneakers', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ data })
		});

		const body = await response.json();

		console.log(
			boxen(JSON.stringify(body, null, 2), {
				borderStyle: 'double',
				titleAlignment: 'center',
				title: 'Create Form Response',
				padding: 1,
				borderColor: response.status !== 200 ? 'red' : 'green'
			})
		);

		if (response.status !== 200) {
			return fail(response.status, {
				createForm,
				body
			});
		}

		throw redirect(303, `/sneakers/${body.data.id}`);
	}
} satisfies Actions;
