import { render, fireEvent, screen, waitFor } from '@testing-library/svelte';
import { test, describe, expect, vi } from 'vitest';
import SneakersCreate from '../sneakers/create/+page.svelte';

// Popup with floating-ui
import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
import { storePopup } from '@skeletonlabs/skeleton';
storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

const form = {
	id: 'e1reer',
	valid: false,
	posted: false,
	errors: {},
	data: {
		name: 'Adidas',
		description: 'Best shoes ever',
		price: 55000,
		brand: '',
		availableSize: ['38', '39'],
		color: 'red',
		stock: 10
	},
	constraints: {
		name: { minlength: 5, required: true },
		description: { minlength: 10, required: true },
		price: { min: 1, required: true },
		brand: { minlength: 5, required: true },
		availableSize: { required: true },
		color: { required: true },
		stock: { min: 1, required: true }
	}
};

describe('Sneakers Create Route', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});
	test('route rendered properly', () => {
		const { container } = render(SneakersCreate, {
			data: {
				form
			}
		});
		expect(container).toBeTruthy();
	});
	test('renders with errors', () => {
		const { container } = render(SneakersCreate, {
			data: {
				form: {
					...form,
					errors: {
						brand: ['String must contain at least 5 character(s)']
					}
				}
			}
		});
		expect(container).toBeTruthy();
		const heading = screen.getByText('Create Sneaker');
		expect(heading).toBeInTheDocument();
	});
	test('form inputs exist', async () => {
		const { getByTestId } = render(SneakersCreate, {
			data: {
				form
			}
		});

		const name = getByTestId('name-input');

		fireEvent.input(name, { target: { value: 'Adidas' } });

		// await tick();

		expect(name).toHaveValue('Adidas');
		expect(name.getAttribute('type')).toEqual('text');
		expect(name).toHaveAttribute('required');
	});

	test.skip('form submit', async () => {
		render(SneakersCreate, {
			data: {
				form
			}
		});

		const formElement: HTMLFormElement = screen.getByTestId('create-sneaker-form');

		formElement.submit = vi.fn();

		const brandInput = screen.getByTestId('brand-input');

		const submitButton = screen.getByTestId('create-snakear-button');

		fireEvent.input(brandInput, { target: { value: 'adidas' } });

		console.log('submit', formElement.submit);

		await waitFor(() => {
			fireEvent.click(submitButton);
		});

		expect(formElement.submit).toHaveBeenCalled();
	});
});
