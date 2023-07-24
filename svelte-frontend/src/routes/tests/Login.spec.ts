import { render, fireEvent, screen, waitFor } from '@testing-library/svelte';
import { test, describe, expect, vi } from 'vitest';
import Login from '../login/+page.svelte';

const form = {
	id: 'e1reir',
	valid: false,
	posted: false,
	errors: {},
	data: { email: 'test@gmail.com', password: '' },
	constraints: {
		email: { required: true },
		password: { minlength: 8, required: true }
	}
};

describe('Login Route', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});
	test('route rendered properly', () => {
		const { container } = render(Login, {
			data: {
				form
			}
		});
		expect(container).toBeTruthy();
	});
	test('renders with errors', () => {
		const { container } = render(Login, {
			data: {
				form: {
					...form,
					errors: {
						password: ['String must contain at least 8 character(s)']
					}
				}
			}
		});
		expect(container).toBeTruthy();
		const heading = screen.getByText('Login');
		expect(heading).toBeInTheDocument();
	});
	test('form inputs exist', async () => {
		const { getByTestId, getByText } = render(Login, {
			data: {
				form
			}
		});

		const heading = getByText('Login');
		expect(heading).toBeDefined();

		const inputEmail = getByTestId('email-input');

		fireEvent.input(inputEmail, { target: { value: 'test' } });

		// await tick();

		expect(inputEmail).toHaveValue('test');
		expect(inputEmail.getAttribute('type')).toEqual('email');
		expect(inputEmail.getAttribute('data-testid')).toEqual('email-input');
		expect(inputEmail).toHaveAttribute('required');
	});

	test.skip('form submit', async () => {
		render(Login, {
			data: {
				form
			}
		});

		const formElement: HTMLFormElement = screen.getByTestId('login-form');
		// const submit = vi.spyOn(formElement, 'submit');

		formElement.submit = vi.fn();

		const emailInput = screen.getByTestId('email-input');
		const passwordInput = screen.getByTestId('password-input');
		const loginButton = screen.getByTestId('login-button');

		fireEvent.input(emailInput, { target: { value: 'test@example.com' } });
		fireEvent.input(passwordInput, { target: { value: 'password123' } });

		console.log('login', loginButton);
		console.log('submit', formElement.submit);

		await waitFor(() => {
			fireEvent.click(loginButton);
		});

		expect(formElement.submit).toHaveBeenCalled();
	});
});
