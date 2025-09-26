import { test } from '../../src/fixtures/fixture_signIn';
import { expect } from '@playwright/test';
import { TestDataSignin } from '../../src/testData/testData';
import path from 'path';

test.describe('Edit Profile "First name"', () => {
    test.beforeEach(async ({ signInPage, userProfilePage }) => {
        await signInPage.goto();
        await signInPage.fillEmailAddress(TestDataSignin.EMAIL);
        await signInPage.fillPasswordInput(TestDataSignin.PASSWORD);
        await signInPage.submit();
    });
    test('[AQAPRACT-751] Upload user photo', async ({ userProfilePage }) => {
        const filePath = path.resolve(
            'C:/Users/ziyar/OneDrive/Resimler/Ekran Görüntüleri/Screenshot 2025-09-17 141442.png'
        );
        await userProfilePage.userUploadInput.setInputFiles(filePath)
        await expect(userProfilePage.successUploadModal).toBeVisible();
    });
});
