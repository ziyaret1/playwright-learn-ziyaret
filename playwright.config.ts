import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

// For find the replacement for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });
export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['list'], ['allure-playwright']],
    use: {
        // storageState: 'playwright/.auth/user.json', // bad practice if you work more credential
        // baseURL: process.env.BASE_URL,
        trace: 'on-first-retry',
    },
    projects: [
        // {
        //     name: 'setup',
        //     testMatch: /.*\.setup\.ts/,
        // },
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                // storageState: 'playwright/.auth/user.json', // here storage state is active
            },
            // dependencies: ['setup'], // will work after setup test
        },
    ],
});
