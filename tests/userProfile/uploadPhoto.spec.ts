import { test } from '../../src/fixtures/fixture_signIn';
import { expect } from '@playwright/test';
import { TestDataSignin, TestFiles } from '../../src/testData/testData';
test.describe('Edit Profile "First name"', () => {
    test.beforeEach(async ({ signInPage }) => {
        await signInPage.goto();
        await signInPage.fillEmailAddress(TestDataSignin.EMAIL);
        await signInPage.fillPasswordInput(TestDataSignin.PASSWORD);
        await signInPage.submit();
    });
    test('[AQAPRACT-751] Upload user photo', async ({ userProfilePage }) => {
        await userProfilePage.userUploadInput.setInputFiles(TestFiles.PHOTO);
        await expect(userProfilePage.successUploadModal).toBeVisible();
    });
});
