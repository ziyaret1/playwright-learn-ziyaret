// import { expect } from '@playwright/test';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { test } from '../src/fixtures/fixture_signIn';
// import { TestDataSignin, PageUrls } from '../src/testData/testData';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const authFile = path.join(__dirname, '../playwright/.auth/user.json');

// test('Authenticate', async ({ signInPage, userProfilePage }) => {
//     await signInPage.goto();
//     await signInPage.fillEmailAddress(TestDataSignin.EMAIL);
//     await signInPage.fillPasswordInput(TestDataSignin.PASSWORD);
//     await signInPage.submit();
//     await expect(userProfilePage.getPage()).toHaveURL(PageUrls.USER_PROFILE);
//     await userProfilePage.getPage().waitForLoadState('networkidle'); // tam yük üçün

//     await userProfilePage.getPage().context().storageState({ path: authFile });
//     await userProfilePage.getPage().close();
//     await userProfilePage.getPage().context().close();
// });


