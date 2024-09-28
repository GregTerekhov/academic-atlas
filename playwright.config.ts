import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
  testDir: './e2e_tests',
  fullyParallel: true,
  forbidOnly: false,
  retries: 1,
  workers: 4, 
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    baseURL: 'http://localhost:3000/'
  },
  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], defaultBrowserType: 'firefox' },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], defaultBrowserType: 'webkit' },
    },
    {
      name: 'google chrome',
      use: { ...devices['Desktop Chrome'], defaultBrowserType: 'chromium' },
    },
  ],
});
