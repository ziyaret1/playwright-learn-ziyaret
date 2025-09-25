import { test as base, type Page } from "@playwright/test";
import { SignInPage } from "../pages/signInPage";
import { UserProfilePage } from "../pages/userProfilePage";
type MyFixtures = {
    page: Page;
    signInPage: SignInPage;
    userProfilePage: UserProfilePage;
};
export const test = base.extend<MyFixtures>({
    signInPage: async ({ page }, use) => {
        const signInpage = new SignInPage(page);
        await use(signInpage);
    },
    userProfilePage: async ({ page }, use) => {
        const userProfilePage = new UserProfilePage(page);
        use(userProfilePage);
    },
});
