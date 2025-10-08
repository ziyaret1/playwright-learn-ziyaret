import { expect } from '@playwright/test';
import { test as setup} from '../src/fixtures/fixture_signIn';
import { TestDataSignin, PageUrls } from '../src/testData/testData';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const userState: string = 'user.json'

setup('authenticate', async({signInPage, userProfilePage}) =>{
    await signInPage.goto();
    await signInPage.fillEmailAddress(TestDataSignin.EMAIL);
    await signInPage.fillPasswordInput(TestDataSignin.PASSWORD);
    await signInPage.submit();
    await signInPage.getPage().waitForURL(PageUrls.USER_PROFILE);
    await signInPage.getPage().waitForTimeout(1000);
    await expect(userProfilePage.getPage()).toHaveURL(PageUrls.USER_PROFILE);
    await signInPage.getPage().context().storageState({path: userState});
})
