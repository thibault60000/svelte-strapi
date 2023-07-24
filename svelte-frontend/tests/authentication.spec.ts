import { expect, test } from '@playwright/test';

const ID = 1;

const EMAIL = `toto${ID}@gmail.com`;
const USERNAME = `toto${ID}`;
const PASSWORD = 'homepilot';

const MAIN_PAGE_TITLE = 'Restaurants list';

test('Go To LoginPage', async ({ page }) => {
	await page.goto('/login');
	await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});

test('Login process', async ({ page }) => {
	await page.goto('/login');
	await page.waitForTimeout(1000);

	await page.fill('input[name="email"]', EMAIL);
	await page.fill('input[name="password"]', PASSWORD);

	await page.waitForTimeout(1000);
	await page.click('button[type="submit"]');

	await page.waitForTimeout(1000);

	await page.waitForURL('/');

	await expect(page.getByRole('heading', { name: MAIN_PAGE_TITLE })).toBeVisible();
});

test('Register process', async ({ page }) => {
	await page.goto('/register');
	await page.waitForTimeout(1000);

	await page.fill('input[name="username"]', USERNAME);
	await page.fill('input[name="email"]', EMAIL);
	await page.fill('input[name="password"]', PASSWORD);
	await page.waitForTimeout(1000);

	await page.click('button[type="submit"]');

	await page.waitForTimeout(1000);

	await page.waitForURL('/');

	await expect(page.getByRole('heading', { name: MAIN_PAGE_TITLE })).toBeVisible();
});
