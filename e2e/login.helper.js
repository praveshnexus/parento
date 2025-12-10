import { expect } from "@playwright/test";

export async function login(page) {
  await page.goto('/login');

  await page.fill('input[type="email"]', 'ypravesh0007@gmail.com');
  await page.fill('input[type="password"]', '123456789');

  await page.click('button:has-text("Login")');

  // Wait for redirect
  await page.waitForTimeout(1000);
}
