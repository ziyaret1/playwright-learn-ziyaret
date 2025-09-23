import {test as base} from '@playwright/test';
import { SignInPage } from '../pages/signInPage'; 
import { UserProfilePage } from '../pages/userProfilePage'; 
import { TestDataSignin } from '../testData/testData'; 


export const test = base.extend<{ userProfilePage: UserProfilePage}>({
    userProfilePage: async({page}, use) => {
        const signIn = new SignInPage(page);
        const userProfile = new UserProfilePage(page)
        await signIn.goto();
        await signIn.fillEmailAddress(TestDataSignin.EMAIL);
        await signIn.fillPasswordInput(TestDataSignin.PASSWORD);
        await signIn.submit();
        await use(userProfile);
    }
})