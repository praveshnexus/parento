import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  // ✅ Always use absolute URL
  await page.goto('http://localhost:5173/login');

  // ✅ Scope to LOGIN FORM ONLY
  const loginForm = page.locator('form').first();

  await loginForm
    .getByRole('textbox', { name: /email/i })
    .fill('ypravesh0007@gmail.com');

  await loginForm
    .getByRole('textbox', { name: /password/i })
    .fill('123456789');

  await loginForm
    .getByRole('button', { name: /login/i })
    .click();

  // ✅ WAIT ONLY FOR FIREBASE AUTH (NOT UI)
  await page.waitForFunction(() => {
    return Object.keys(localStorage).some(key =>
      key.startsWith('firebase:authUser')
    );
  }, { timeout: 15000 });

  // ✅ SAVE AUTH STATE
  await page.context().storageState({
    path: 'e2e/auth.json',
  });
});
