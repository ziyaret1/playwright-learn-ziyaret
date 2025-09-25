import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/fixture_signIn';
import { PageUrls, TestDataSignin } from '../../src/testData/testData';
//! User Profile Suite
test.describe('User Profile Suite', async () => {
    test.beforeEach(async ({ signInPage }) => {
        await signInPage.goto();
        await signInPage.fillEmailAddress(TestDataSignin.EMAIL);
        await signInPage.fillPasswordInput(TestDataSignin.PASSWORD);
        await signInPage.submit();
    });
    test('[AQAPRACT-545] Validation of "User profile" page layout', async ({ userProfilePage }) => {
        await userProfilePage.verifyProfileLayout();
    });
    test('[AQAPRACT-546] Successful Sign Out', async ({ userProfilePage }) => {
        await userProfilePage.signOutSuccessfully();
    });
    test('[AQAPRACT-547] "AQA Practice" dropdown options validation', async ({
        userProfilePage,
    }) => {
        await userProfilePage.verifyDropdownOptions();
    });
});
//! Edit Profile Suite
test.describe('Edit Profile Suite', async () => {
    test.beforeEach(async ({ signInPage }) => {
        await signInPage.goto();
        await signInPage.fillEmailAddress(TestDataSignin.EMAIL);
        await signInPage.fillPasswordInput(TestDataSignin.PASSWORD);
        await signInPage.submit();
    });
    test('[AQAPRACT-548] "Edit personal information" flyout available', async ({
        userProfilePage,
    }) => {
        await userProfilePage.editButton.click();
        await userProfilePage.verifyEditPersonalInfoModal();
    });
    test("[AQAPRACT-549] Edit 'First name' on User profile flyout", async ({ userProfilePage }) => {
        await userProfilePage.editButton.click();
        const newName: string = 'NewAQA';
        await userProfilePage.updateFirstname(newName);
        await userProfilePage.clickSave();
        await expect(userProfilePage.userName).toContainText(newName);
    });
    test('[AQAPRACT-550] Edit "Last name" on User profile flyout', async ({ userProfilePage }) => {
        await userProfilePage.editButton.click();
        const newLastName = 'Test';
        await userProfilePage.updateLastname(newLastName);
        await userProfilePage.clickSave();
        await expect(userProfilePage.userName).toContainText(newLastName);
    });
    test('[AQAPRACT-551] Edit "Email" on User profile flyout', async ({ userProfilePage }) => {
        await userProfilePage.editButton.click();
        const newEmail: string = 'ziqa1@gmail.com';
        await userProfilePage.emailInput.fill(newEmail);
        // Input value check before save
        await expect(userProfilePage.emailInput).toHaveValue(newEmail);
        await expect(userProfilePage.emailInfo).toHaveText(newEmail);
        await userProfilePage.clickSave();
    });
    test('[AQAPRACT-552] Edit "Date of Birth" on User profile flyout', async ({
        userProfilePage,
    }) => {
        await userProfilePage.editButton.click();
        const newDate = '01/01/2000';
        await userProfilePage.updateDateOfBirth(newDate);
        await userProfilePage.clickSave();
        await expect(userProfilePage.dateOfBirth).toHaveText(newDate);
    });
    test('[AQAPRACT-553] Cancel editing the data on the flyout (after the data is edited)', async ({
        userProfilePage,
    }) => {
        await userProfilePage.editButton.click();
        await userProfilePage.updateFirstname('TemporaryName');
        await userProfilePage.clickCancel();
        await expect(userProfilePage.userName).not.toContainText('TemporaryName');
    });
    test('[AQAPRACT-554] Cancel editing the data on the flyout (without editing)', async ({
        userProfilePage,
    }) => {
        await userProfilePage.editButton.click();
        await userProfilePage.clickCancel();
        await expect(userProfilePage.editPersonalInfoTitle).toHaveCount(0);
        await expect(userProfilePage.getPage()).toHaveURL(PageUrls.USER_PROFILE);
    });
    test('[AQAPRACT-555] Close "Edit personal information" flyout by "X" button', async ({
        userProfilePage,
    }) => {
        await userProfilePage.editButton.click();
        const originalFirstName = await userProfilePage.firstNameInput.inputValue();
        await userProfilePage.updateFirstname('TemporaryName');
        await userProfilePage.clickCloseModal();
        await expect(userProfilePage.editPersonalInfoTitle).toHaveCount(0);
        await expect(userProfilePage.userName).toContainText(originalFirstName);
    });
});
