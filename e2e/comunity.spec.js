import { test, expect } from '@playwright/test';

test('comunity page loads', async ({ page }) => {
  await page.goto('/comunity');

  // ✅ Wait until URL is correct
  await expect(page).toHaveURL(/comunity/);

  // ✅ Check page is not blank
  await expect(page.locator('body')).toBeVisible();

  // ✅ Check something stable on the page
  await expect(
    page.getByRole('button', { name: /create/i }).first()
  ).toBeVisible();
});
