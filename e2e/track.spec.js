import { test, expect } from '@playwright/test';

test('track page loads', async ({ page }) => {
  await page.goto('/track');

  // ✅ Wait until page is loaded
  await expect(page).toHaveURL(/track/);

  // ✅ Wait for loading to finish
  await page.waitForLoadState('networkidle');

  // ✅ Flexible & resilient check
  await expect(
    page.getByRole('button', { name: /add/i }).first()
  ).toBeVisible();
});
