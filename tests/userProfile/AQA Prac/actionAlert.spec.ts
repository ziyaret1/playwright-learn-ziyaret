import { expect } from '@playwright/test';
import { test } from '../../../src/fixtures/fixture_signIn';
import { PageUrls, TestDataSignin } from '../../../src/testData/testData';

test.describe('AQA Practice - Drag and Drop Suite', () => {
    test.beforeEach(async ({ userProfilePage, signInPage, aqaPractice }) => {
        await signInPage.goto();
        await signInPage.fillEmailAddress(TestDataSignin.EMAIL);
        await signInPage.fillPasswordInput(TestDataSignin.PASSWORD);
        await signInPage.submit();
        await expect(userProfilePage.getPage()).toHaveURL(PageUrls.USER_PROFILE);
        await aqaPractice.aqaPracticeDropdown.hover();
        await aqaPractice.actionAlertItem.click();
        await expect(aqaPractice.getPage()).toHaveURL(PageUrls.ACTIONS_AND_ALERTS);
    });
    test('[AQAPRACT-591] Actions, Alerts & Iframes form elements validation', async ({
        aqaPractice,
    }) => {
        await aqaPractice.backButtonFromAction.click();
        await expect(aqaPractice.getPage()).toHaveURL(PageUrls.USER_PROFILE);
        await aqaPractice.aqaPracticeDropdown.hover();
        await aqaPractice.actionAlertItem.click();
        await expect(aqaPractice.getPage()).toHaveURL(PageUrls.ACTIONS_AND_ALERTS);
        await expect(aqaPractice.actionAlertPageTitle).toBeVisible();
        await expect(aqaPractice.actionAlertPageSubtitle).toBeVisible();
        await expect(aqaPractice.confirmButton).toBeVisible();
        await expect(aqaPractice.getDiscountButton).toBeVisible();
        await expect(aqaPractice.cancelCourseButton).toBeVisible();
        await expect(aqaPractice.finishActionButton).toBeVisible();
        await expect(aqaPractice.confirmInfoIcon).toBeVisible();
        await expect(aqaPractice.tooltip).toBeHidden();
    });
    test('[AQAPRACT-592]', async({aqaPractice}) =>{

    })
});
