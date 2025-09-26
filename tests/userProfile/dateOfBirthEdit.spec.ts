import { test } from '../../src/fixtures/fixture_signIn';
import { expect } from '@playwright/test';
import { TestDataSignin } from '../../src/testData/testData';
test.describe('Edit Date of Birth Suite', () => {
    test.beforeEach(async ({ userProfilePage, signInPage }) => {
        await signInPage.goto();
        await signInPage.fillEmailAddress(TestDataSignin.EMAIL);
        await signInPage.fillPasswordInput(TestDataSignin.PASSWORD);
        await signInPage.submit();
        await userProfilePage.editButton.click();
        await expect(userProfilePage.editPersonalInfoTitle).toBeVisible();
    });
    test('[AQAPRACT-566] Edit the date with empty "Date of birth" field', async ({
        userProfilePage,
    }) => {
        await userProfilePage.dateOfBirthInput.fill('');
        await expect(userProfilePage.dateOfBirthInput).toHaveValue('');
        await expect(userProfilePage.saveButton).toBeDisabled();
    });
    test('[AQAPRACT-567] The elements on the calendar picker are available', async ({
        userProfilePage,
    }) => {
        await userProfilePage.dateOfBirthInput.click();
        await expect(userProfilePage.calendarModal).toBeVisible();
        await userProfilePage.calendarRightArrow.click();
        await expect(userProfilePage.calendarMonthTitle).toContainText('Feb 2000');
        await userProfilePage.calendarLeftArrow.click();
        await expect(userProfilePage.calendarMonthTitle).toContainText('Jan 2000');
        await userProfilePage.selectedDayFromCalendar.click();
        await expect(userProfilePage.dateOfBirthInput).toHaveValue(/15/);
        await expect(userProfilePage.calendarMonthTitle).toBeHidden();
    });
    test('[AQAPRACT-568] The date is filled in manually in the "Date of birth" field', async ({
        userProfilePage,
    }) => {
        await userProfilePage.dateOfBirthInput.click();
        await expect(userProfilePage.calendarModal).toBeVisible();
        await expect(userProfilePage.dateOfBirthInput).toHaveAttribute('placeholder', 'dd/MM/yyyy');
        await userProfilePage.dateOfBirthInput.fill('16/01/2000');
        await expect(userProfilePage.dateOfBirthInput).toHaveValue('16/01/2000');
        await userProfilePage.saveButton.click();
        await expect(userProfilePage.editPersonalInfoTitle).toBeVisible();
    });
});
