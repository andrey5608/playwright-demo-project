import { defineConfig, devices } from '@playwright/test';
import { Timeouts } from './enums/timeouts-enum';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    retries: 3,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    timeout: Timeouts.Global,
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        trace: 'retain-on-failure', // record trace for each test, but remove all traces from successful test runs
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
});
