import { test as base, type Page } from '@playwright/test';
import { SignInPage } from '../pages/signInPage';
import { UserProfilePage } from '../pages/userProfilePage';
import { AqaPractice } from '../pages/aqaPractice';
type MyFixtures = {
    page: Page;
    signInPage: SignInPage;
    userProfilePage: UserProfilePage;
    aqaPractice: AqaPractice;
}; 
export const test = base.extend<MyFixtures>({
    signInPage: async ({ page }, use) => {
        const signInpage = new SignInPage(page);
        await use(signInpage);
    },
    userProfilePage: async ({ page }, use) => {
        const userProfilePage = new UserProfilePage(page);
        await use(userProfilePage);
    },
    aqaPractice: async ({ page }, use) => {
        const aqaPractice = new AqaPractice(page);
        await use(aqaPractice);
    },
});
