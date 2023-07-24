import { render } from '@testing-library/svelte';
import { test, describe, expect } from 'vitest';
import Home from '../+page.svelte';

describe('Home Route', () => {
	test('renders without errors', () => {
		const { container, getByText } = render(Home, {
			data: {
				restaurants: [],
				user: {
					id: 1,
					username: 'johndoe',
					email: 'johndoe@test.com'
				},
				pagination: {}
			}
		});
		expect(container).toBeTruthy();

		const titleElement = getByText('Restaurants list');
		expect(titleElement).toBeDefined();
	});
});
