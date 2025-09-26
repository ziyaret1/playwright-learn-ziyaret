import { test } from '../../src/fixtures/fixture_signIn';
import { expect } from '@playwright/test';
import { TestDataSignin, InvalidEmail } from '../../src/testData/testData';

test.describe('Edit Email Suite', () => {
    test.beforeEach(async ({ userProfilePage, signInPage }) => {
        await signInPage.goto();
        await signInPage.fillEmailAddress(TestDataSignin.EMAIL);
        await signInPage.fillPasswordInput(TestDataSignin.PASSWORD);
        await signInPage.submit();
        await userProfilePage.editButton.click();
        await expect(userProfilePage.editPersonalInfoTitle).toBeVisible();
    });
    test('[AQAPRACT-569] Edit with empty "Email" field', async ({ userProfilePage }) => {
        await userProfilePage.emailInput.fill('');
        await expect(userProfilePage.emailInput).toHaveValue('');
        await userProfilePage.firstNameInput.click();
        await expect(userProfilePage.inputRequiredErrorMessage).toBeVisible();
        await expect(userProfilePage.saveButton).toBeDisabled();
    });
    test('[AQAPRACT-570] Edit with invalid email formats', async ({ userProfilePage }) => {
       const invalidEmails = [
        InvalidEmail.SIMPLE,
        InvalidEmail.DOUBLE_AT,
        InvalidEmail.SPACE_IN_LOCAL,
        InvalidEmail.INVALID_CHAR,
    ];

    for (const emailValue of invalidEmails) {
        await userProfilePage.emailInput.fill(emailValue);
        await userProfilePage.firstNameInput.click()
        await expect(userProfilePage.emailErrorMessage).toHaveText('Invalid email address');
        await expect(userProfilePage.emailInput).toHaveValue(emailValue);
        await expect(userProfilePage.saveButton).toBeDisabled();
    }
    });
});
