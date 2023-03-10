const { test, expect } = require('@playwright/test');

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main .introduction h1')).toHaveText('Добро пожаловать во Fresh Сервис');
})

test('visits the app root url and check for button', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main .introduction__button')).toBeVisible();
})
