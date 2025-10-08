import { expect } from '@playwright/test';
import { test as setup} from '../src/fixtures/fixture_signIn';
import { TestDataSignin, PageUrls } from '../src/testData/testData';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const authFile = path.join(__dirname, 'playwright/.auth/user.json');
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
    // console.log('Auth state saved to:', userState);
})

// we can not use fixture
// manualy create context 
// use page object
// create context -> new page > initialize sign in page > use steps for filling > 