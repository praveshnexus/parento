// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',

  fullyParallel: true,
  reporter: 'html',

  projects: [
    // 🔐 AUTH SETUP (runs first)
    {
      name: 'setup',
      testMatch: /auth\.setup\.js/,
      use: {
        baseURL: 'http://localhost:5173', // 🔥 FIXED
        ...devices['Desktop Chrome'],
      }
    },

    // 🌐 REAL TESTS
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:5173',
        storageState: 'e2e/auth.json',
      },
      dependencies: ['setup'],
    }
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  },
});
