import { test } from "../../src/fixtures/fixture_signIn";
import { expect } from "@playwright/test";
import { TestDataSignin } from "../../src/testData/testData";

test.describe('Edit Profile "Lastname"', () => {
    test.beforeEach(async ({ signInPage, userProfilePage }) => {
        await signInPage.goto();
        await signInPage.fillEmailAddress(TestDataSignin.EMAIL);
        await signInPage.fillPasswordInput(TestDataSignin.PASSWORD);
        await signInPage.submit();
        // Edit perfonal info modal
        await userProfilePage.editButton.click();
        await expect(userProfilePage.editPersonalInfoTitle).toBeVisible();
    });
    test('[AQAPRACT-561] Leave "Last name" empty', async ({ userProfilePage }) => {
        await userProfilePage.lastNameInput.fill("");
        await expect(userProfilePage.lastNameInput).toHaveValue("");
        await userProfilePage.firstNameInput.click();
        await expect(userProfilePage.inputRequiredErrorMessage).toBeVisible();
        await expect(userProfilePage.saveButton).toBeDisabled();
    });
    test('[AQAPRACT-562] Edit the "Last name" with 1 character length', async ({
        userProfilePage,
    }) => {
        await userProfilePage.lastNameInput.fill("A");
        await expect(userProfilePage.lastNameInput).toHaveValue("A");
        await userProfilePage.saveButton.click();
        await expect(userProfilePage.editPersonalInfoTitle).not.toBeVisible();
    });
    test('[AQAPRACT-563] Edit the "Last name" with 255 character length', async ({
        userProfilePage,
    }) => {
        const lastnameLength255: string = "A".repeat(255);
        await userProfilePage.lastNameInput.fill(lastnameLength255);
        await expect(userProfilePage.lastNameInput).toHaveValue(lastnameLength255);
        await userProfilePage.saveButton.click();
        await expect(userProfilePage.editPersonalInfoTitle).not.toBeVisible();
    });
    test('[AQAPRACT-564] Edit the "Last name" with 256 character length', async ({
        userProfilePage,
    }) => {
        const firstnameLength256: string = "A".repeat(256);
        await userProfilePage.lastNameInput.fill(firstnameLength256);
        await expect(userProfilePage.lastNameInput).toHaveValue(firstnameLength256);
        await expect(userProfilePage.saveButton).not.toBeDisabled();
        await userProfilePage.saveButton.click();
        await expect(userProfilePage.lengthErrorMessage).toBeVisible();
    });
    test('[AQAPRACT-565] Edit the "Last name" field with spaces', async ({ userProfilePage }) => {
        await userProfilePage.lastNameInput.fill("   ");
        await userProfilePage.saveButton.click();
        await expect(userProfilePage.inputRequiredErrorMessage).toHaveText(
            "The field is required",
        );
    });
});
