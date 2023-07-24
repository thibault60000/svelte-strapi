import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

/** @type {import('vite').UserConfig} */
export default defineConfig({
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	plugins: [sveltekit()],
	define: {
		// Eliminate in-source test code
		'import.meta.vitest': 'undefined'
	},
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,ts}'],
		// Add @testing-library/jest-dom matchers & mocks of SvelteKit modules
		setupFiles: ['setupTest.ts', 'src/mocks/setup.ts'],
		coverage: {
			exclude: ['setupTest.ts', 'src/mocks'],
			provider: 'istanbul',
			reporter: ['text', 'json', 'html'],
			reportsDirectory: './tests/unit/coverage'
		}
	}
});
