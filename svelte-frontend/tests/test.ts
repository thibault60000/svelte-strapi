import { expect, test } from '@playwright/test';

test('about page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});

test('login', async ({ page }) => {
	await page.goto('/login');
	await page.waitForTimeout(1000);
	await page.fill('input[name="password"]', 'homepilot');
	await page.waitForTimeout(1000);
	await page.click('button');

	await page.waitForTimeout(1000);

	await page.waitForURL('/');

	await expect(page.getByRole('heading', { name: 'Liste des restaurants' })).toBeVisible();
});
