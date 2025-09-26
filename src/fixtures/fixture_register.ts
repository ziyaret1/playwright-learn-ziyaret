import { test as base, type Page } from '@playwright/test';
import { RegisterPage } from '../pages/registrationPage';
type MyFixtures = {
    page: Page;
    registerPage: RegisterPage;
};
export const test = base.extend<MyFixtures>({
    registerPage: async ({ page }, use) => {
        const registerPage = new RegisterPage(page);
        await use(registerPage);
    },
});
