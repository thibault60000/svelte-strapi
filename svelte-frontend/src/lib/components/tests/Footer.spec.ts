import { afterEach, beforeEach, describe, test, expect, vi } from 'vitest';
import Footer from '../Footer.svelte';

function getLatest(index = messages.items.length - 1) {
	return messages.items[index];
}
const messages = {
	items: [
		{ message: 'Simple test message', from: 'Testman' },
		{ message: 'Simple other message', from: 'Testgirl' }
	],
	getLatest
};

describe('Example File', () => {
	test('Sample test', () => {
		expect(1 + 3).equal(4);
	});
});

describe.skip('Footer Component', () => {
	afterEach(() => {
		console.log('after');
		vi.restoreAllMocks();
	});
	beforeEach(() => {
		console.log('before');
	});
	test('should render the component', () => {
		// Create a new container for the test
		const host = document.createElement('div');

		// Append the new container in the HTML body
		document.body.appendChild(host);

		// Create an instance of the vertical tab
		const instance = new Footer(/*{ target: host }*/);

		// Check if the instance has value
		expect(instance).toBeTruthy();

		// Test if we can find the "Footer"
		expect(host.innerHTML).toContain('Footer');
	});
	test('should get the latest message with a spy', () => {
		const spy = vi.spyOn(messages, 'getLatest');
		expect(spy.getMockName()).toEqual('getLatest');

		expect(messages.getLatest()).toEqual(messages.items[messages.items.length - 1]);

		expect(spy).toHaveBeenCalledTimes(1);

		spy.mockImplementationOnce(() => ({
			message: 'access-restricted',
			from: 'mocker'
		}));
		expect(messages.getLatest()).toEqual({
			message: 'access-restricted',
			from: 'mocker'
		});

		expect(spy).toHaveBeenCalledTimes(2);
	});
});
