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
        await aqaPractice.dragAndDropItem.click();
        await expect(aqaPractice.getPage()).toHaveURL(PageUrls.DRAG_AND_DROP);
    });
    test('[AQAPRACT-583] Drag & Drop page elements validation', async ({ aqaPractice }) => {
        await aqaPractice.backToProfileBtn.click();
        await expect(aqaPractice.getPage()).toHaveURL(PageUrls.USER_PROFILE);
        await aqaPractice.aqaPracticeDropdown.hover();
        await aqaPractice.dragAndDropItem.click();
        await expect(aqaPractice.getPage()).toHaveURL(PageUrls.DRAG_AND_DROP);
        await expect(aqaPractice.sortResponsibilitiesTitle).toBeVisible();
        await expect(aqaPractice.sortResponsibleSubtitle).toBeVisible();
        await expect(aqaPractice.chipWriteTestCases).toBeVisible();
        await expect(aqaPractice.chipTestingRequirements).toBeVisible();
        await expect(aqaPractice.chipAutomationScripts).toBeVisible();
        await expect(aqaPractice.chipFrameworkSetup).toBeVisible();
        await expect(aqaPractice.manualWorkTitle).toBeVisible();
        await expect(aqaPractice.automationWorkTitle).toBeVisible();
        await expect(aqaPractice.finishDragButton).toHaveClass(
            aqaPractice.finishButtonDisabledClass
        );
    });
    test('[AQAPRACT-584] Redirection to the user profile after finishing course', async ({
        aqaPractice,
        userProfilePage,
    }) => {
        await aqaPractice.dragAndDrop(aqaPractice.chipWriteTestCases, aqaPractice.manualCol1);
        await aqaPractice.dragAndDrop(aqaPractice.chipTestingRequirements, aqaPractice.manualCol2);
        await aqaPractice.dragAndDrop(aqaPractice.chipAutomationScripts, aqaPractice.autoCol1);
        await aqaPractice.dragAndDrop(aqaPractice.chipFrameworkSetup, aqaPractice.autoCol2);
        await expect(aqaPractice.finishDragButton).toHaveClass(
            aqaPractice.finishButtonEnabledClass
        );
        await aqaPractice.finishDragButton.click();
        await expect(aqaPractice.congratulationPopup).toBeVisible();
        await expect(userProfilePage.getPage()).toHaveURL(PageUrls.USER_PROFILE);
    });
    test('[AQAPRACT-585] Moving the Write test cases chips to the first column of the Manual Work section', async ({
        aqaPractice,
    }) => {
        await aqaPractice.hoverChip(aqaPractice.chipWriteTestCases);
        await aqaPractice.dragAndDrop(aqaPractice.chipWriteTestCases, aqaPractice.manualCol1);
        await expect(aqaPractice.finishDragButton).toHaveClass(
            aqaPractice.finishButtonDisabledClass
        );
    });
    test('[AQAPRACT-586] Moving the Testing requirements chips to the first column on the second column of the Manual work', async ({
        aqaPractice,
    }) => {
        await aqaPractice.hoverChip(aqaPractice.chipTestingRequirements);
        await aqaPractice.dragAndDrop(aqaPractice.chipTestingRequirements, aqaPractice.manualCol2);
        await expect(aqaPractice.manualCol2).toHaveClass(aqaPractice.manualColumnClass);
        await expect(aqaPractice.finishDragButton).toHaveClass(
            aqaPractice.finishButtonDisabledClass
        );
    });
    test('[AQAPRACT-587] Moving Write automation scripts chip to the first column of the first column on the Automation work', async ({
        aqaPractice,
    }) => {
        await aqaPractice.hoverChip(aqaPractice.chipAutomationScripts);
        await aqaPractice.dragAndDrop(aqaPractice.chipAutomationScripts, aqaPractice.autoCol1);
        await expect(aqaPractice.autoCol1).toHaveClass(aqaPractice.autoColumnClass);
        await expect(aqaPractice.finishDragButton).toHaveClass(
            aqaPractice.finishButtonDisabledClass
        );
    });
    test('[AQAPRACT-588] Moving Framework set chip to the first column of the second column on the Automation work', async ({
        aqaPractice,
    }) => {
        await aqaPractice.hoverChip(aqaPractice.chipFrameworkSetup);
        await aqaPractice.dragAndDrop(aqaPractice.chipFrameworkSetup, aqaPractice.autoCol2);
        await expect(aqaPractice.autoCol2).toHaveClass(aqaPractice.autoColumnClass);
        await expect(aqaPractice.finishDragButton).toHaveClass(
            aqaPractice.finishButtonDisabledClass
        );
    });
    test('[AQAPRACT-589] Availability of the Finish button after transferring all chips', async ({
        aqaPractice,
    }) => {
        await expect(aqaPractice.finishDragButton).toHaveClass(
            aqaPractice.finishButtonDisabledClass
        );
        await aqaPractice.dragAndDrop(aqaPractice.chipWriteTestCases, aqaPractice.manualCol1);
        await aqaPractice.dragAndDrop(aqaPractice.chipTestingRequirements, aqaPractice.manualCol2);
        await aqaPractice.dragAndDrop(aqaPractice.chipAutomationScripts, aqaPractice.autoCol1);
        await aqaPractice.dragAndDrop(aqaPractice.chipFrameworkSetup, aqaPractice.autoCol2);
        await expect(aqaPractice.finishDragButton).toHaveClass(aqaPractice.finishButtonEnabledClass);
        await aqaPractice.finishDragButton.click();
        await expect(aqaPractice.congratulationPopup).toBeVisible();
    });
    test('[AQAPRACT-590] Moving chips to the wrong column', async ({ aqaPractice }) => {
        await aqaPractice.dragAndDrop(aqaPractice.manualWorkTitle, aqaPractice.manualCol2);
        await expect(aqaPractice.finishDragButton).toHaveClass(
            aqaPractice.finishButtonDisabledClass
        );
    });
});
