import { test } from '../../src/fixtures/fixture_signIn';
import { expect } from '@playwright/test';
import { TestDataSignin } from '../../src/testData/testData';

test.describe('Edit Profile "First name"', () => {

    test.beforeEach(async({signInPage, userProfilePage}) => {
         await signInPage.goto();
            await signInPage.fillEmailAddress(TestDataSignin.EMAIL);
            await signInPage.fillPasswordInput(TestDataSignin.PASSWORD);
            await signInPage.submit();
            // Edit perfonal info modal
            await userProfilePage.editButton.click();
            await expect(userProfilePage.editPersonalInfoTitle).toBeVisible();
    });

    test('[AQAPRACT-556] Leave "First name" empty', async({userProfilePage}) =>{
        await userProfilePage.firstNameInput.fill('');
        await expect(userProfilePage.firstNameInput).toHaveValue('');
        await userProfilePage.lastNameInput.click();
        await expect(userProfilePage.requiredErrorMessage).toBeVisible();
        await expect(userProfilePage.saveButton).toBeDisabled();
    });

    test('[AQAPRACT-557] ', async({userProfilePage}) => {
        await userProfilePage.firstNameInput.fill('A');
        await expect(userProfilePage.firstNameInput).toHaveValue('A');
        await userProfilePage.saveButton.click();
        await expect(userProfilePage.editPersonalInfoTitle).not.toBeVisible();
    });

    test('[AQAPRACT-558]', async({userProfilePage}) => {
        const firstnameLength255: string = 'A'.repeat(255);
        await userProfilePage.firstNameInput.fill(firstnameLength255);
        await expect(userProfilePage.firstNameInput).toHaveValue(firstnameLength255);
        await userProfilePage.saveButton.click();
        await expect(userProfilePage.editPersonalInfoTitle).not.toBeVisible();
    });

    test('[AQAPRACT-559]', async({userProfilePage}) => {
        const firstnameLength256: string = 'A'.repeat(256);
        await userProfilePage.firstNameInput.fill(firstnameLength256);
        await expect(userProfilePage.firstNameInput).toHaveValue(firstnameLength256);
        await expect(userProfilePage.saveButton).not.toBeDisabled();
        await userProfilePage.saveButton.click();
        await expect(userProfilePage.lengthErrorMessage).toBeVisible();
    });

    test('[AQAPRACT-560]', async({userProfilePage}) =>{
        await userProfilePage.firstNameInput.fill('   ');
        await userProfilePage.saveButton.click();
        await expect(userProfilePage.requiredErrorMessage).toHaveText('The field is required');
    })
})