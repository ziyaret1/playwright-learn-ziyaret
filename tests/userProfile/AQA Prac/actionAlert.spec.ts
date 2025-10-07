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
        await expect(aqaPractice.confirmTooltip).toBeHidden();
    });
    test('[AQAPRACT-592] Showing hint for Confirm button on Actions, Alerts & Iframes page', async ({
        aqaPractice,
    }) => {
        await aqaPractice.confirmInfoIcon.hover();
        await aqaPractice.getPage().waitForTimeout(1000);
        await expect(aqaPractice.confirmTooltip).toBeVisible({ timeout: 2000 });
    });
    test('[AQAPRACT-593] Showing hint for Get Discount button on Actions, Alerts & Iframes page', async ({ aqaPractice }) => {
        await aqaPractice.getDiscountInfoIcon.hover();
        await aqaPractice.getPage().waitForTimeout(1000);
        await expect(aqaPractice.discountTooltip).toBeVisible({ timeout: 2000 });
    });
    test('[AQAPRACT-594] Showing hint for Cancel course button on  Actions, Alerts & Iframes page', async ({ aqaPractice }) => {
        await aqaPractice.cancelCourseInfoIcon.hover();
        await aqaPractice.getPage().waitForTimeout(1000);
        await expect(aqaPractice.cancelCourseTooltip).toBeVisible({ timeout: 2000 });
    });
    test('[AQAPRACT-595] Click on the Confirm button', async ({ aqaPractice }) => {
        await aqaPractice.confirmButton.hover();
        await expect(aqaPractice.confirmButton).toHaveClass(
            new RegExp(aqaPractice.actionButtonColorOnHover)
        );
        await aqaPractice.handleConfirmAlert();
        await aqaPractice.confirmButton.click();
        await aqaPractice.handleConfirmAlert();
        await aqaPractice.expectEnrollmentSuccess();
        await expect(aqaPractice.finishActionButton).toBeEnabled();
        await aqaPractice.finishActionButton.click();
        await expect(aqaPractice.getPage()).toHaveURL(PageUrls.USER_PROFILE);
    });
    test('[AQAPRACT-596] Confirmation of Get discount operation', async ({ aqaPractice }) => {
        await aqaPractice.getDiscountButton.hover();
        await expect(aqaPractice.getDiscountButton).toHaveClass(
            new RegExp(aqaPractice.actionButtonColorOnHover)
        );
        await aqaPractice.handleDiscountAlert(true); // mean we click OK inside alert
        await aqaPractice.getDiscountButton.dblclick();
        await aqaPractice.expectDiscountResult(true);
        await expect(aqaPractice.finishActionButton).toBeEnabled();
        await aqaPractice.finishActionButton.click();
        await expect(aqaPractice.getPage()).toHaveURL(PageUrls.USER_PROFILE);
    });
    test('[AQAPRACT-597] Cancellation of Get discount operation', async ({ aqaPractice }) => {
        await aqaPractice.getDiscountButton.hover();
        await expect(aqaPractice.getDiscountButton).toHaveClass(
            new RegExp(aqaPractice.actionButtonColorOnHover)
        );
        await aqaPractice.handleDiscountAlert(false);
        await aqaPractice.getDiscountButton.dblclick();
        await aqaPractice.expectDiscountResult(false);
    });
    test('[AQAPRACT-598] Right click on the Cancel course button and confirming with a reason', async ({ aqaPractice }) => {
        await aqaPractice.cancelCourseButton.hover();
        await expect(aqaPractice.getDiscountButton).toHaveClass(
            new RegExp(aqaPractice.actionButtonColorOnHover)
        );
        await aqaPractice.handleCancelCoursePrompt('Test reason');
        await aqaPractice.cancelCourseButton.click({ button: 'right' });
        await aqaPractice.expectCancelCourseResult('Test reason');
    });
    test('[AQAPRACT-599] Canceling a course without filling in the reason field', async ({ aqaPractice }) => {
        await aqaPractice.cancelCourseButton.hover();
        await expect(aqaPractice.getDiscountButton).toHaveClass(
            new RegExp(aqaPractice.actionButtonColorOnHover)
        );
        await aqaPractice.handleCancelCoursePrompt('');
        await aqaPractice.cancelCourseButton.click({ button: 'right' });
        await aqaPractice.expectCancelCourseResult('');
    });
    test('[AQAPRACT-600] Cancelling a course', async ({ aqaPractice }) => {
        await aqaPractice.cancelCourseButton.hover();
        await expect(aqaPractice.getDiscountButton).toHaveClass(
            new RegExp(aqaPractice.actionButtonColorOnHover)
        );
        await aqaPractice.handleCancelCoursePrompt(null);
        await aqaPractice.cancelCourseButton.click({ button: 'right' });
        await aqaPractice.expectCancelCourseResult(null);
    });
});
