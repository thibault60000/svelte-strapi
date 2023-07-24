import { describe, test, expect } from 'vitest';
import Navbar from '../Navbar.svelte';

describe('Navbar Component', () => {
	test('should render the component', () => {
		// Create a new container for the test
		const host = document.createElement('div');

		// Append the new container in the HTML body
		document.body.appendChild(host);

		// Create an instance of the vertical tab
		const instance = new Navbar({ target: host });

		// Check if the instance has value
		expect(instance).toBeTruthy();

		// Test if we can find the links
		expect(host.innerHTML).toContain('Home');
		expect(host.innerHTML).toContain('About');
		expect(host.innerHTML).toContain('Shop');
		expect(host.innerHTML).toContain('Orders');

		// Test if we can find the href attributes
		const links = host.querySelectorAll('a');

		// Vérifiez les href de chaque lien
		expect(links.length).toEqual(4);
	});
});
