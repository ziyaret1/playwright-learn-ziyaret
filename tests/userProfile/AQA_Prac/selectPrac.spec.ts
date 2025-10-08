import { expect } from '@playwright/test';
import { test } from '../../../src/fixtures/fixture_signIn';
import { PageUrls, TestDataSignin } from '../../../src/testData/testData';
test.describe('AQA Practice - Select Suite', () => {
    // test.use({storageState: 'user.json'});
    test.beforeEach(async ({ userProfilePage, signInPage, aqaPractice }) => {
        await signInPage.goto();
        await signInPage.fillEmailAddress(TestDataSignin.EMAIL);
        await signInPage.fillPasswordInput(TestDataSignin.PASSWORD);
        await signInPage.submit();
        await userProfilePage.goto();
        await expect(userProfilePage.getPage()).toHaveURL(PageUrls.USER_PROFILE);
        await aqaPractice.aqaPracticeDropdown.hover();
        await aqaPractice.selectItem.click();
        await expect(aqaPractice.getPage()).toHaveURL(PageUrls.SELECT_COURSES);
    });
    test.only('[AQAPRACT-571] Validation element in Select course page', async ({ aqaPractice }) => {
        await aqaPractice.backToProfileBtn.click();
        await expect(aqaPractice.getPage()).toHaveURL(PageUrls.USER_PROFILE);
        await aqaPractice.aqaPracticeDropdown.hover();
        await expect(aqaPractice.selectItem).toBeVisible();
        await expect(aqaPractice.dragAndDropItem).toBeVisible();
        await expect(aqaPractice.actionAlertItem).toBeVisible();
        await aqaPractice.selectItem.click();
        // Verify elements
        await expect(aqaPractice.backToProfileBtn).toBeVisible();
        await expect(aqaPractice.chooseCourseTitle).toBeVisible();
        await expect(aqaPractice.defineStudyPreferencesSection).toBeVisible();
        await expect(aqaPractice.selectCountry).toBeVisible();
        await expect(aqaPractice.selectLanguage).toBeVisible();
        await expect(aqaPractice.selectType).toBeVisible();
        await expect(aqaPractice.startDateInput).toBeVisible();
        await expect(aqaPractice.endDateInput).toBeVisible();
        await expect(aqaPractice.selectCoursesSection).toBeVisible();
        await expect(aqaPractice.searchButton).toHaveClass(/bg-\[#EFEFF0\]/);
    });
    test('[AQAPRACT-572] Search for existing course', async ({ aqaPractice }) => {
        await aqaPractice.selectTypeFill('Testing');
        await expect(aqaPractice.searchButton).toBeEnabled();
        await aqaPractice.clickSearchButton();
        await expect(aqaPractice.getPage()).toHaveURL(/search_results/);
        await expect(aqaPractice.searchResultsTitle).toBeVisible();
        const courseCards = await aqaPractice.courseCards.all();
        for (const courseCard of courseCards) {
            await expect(courseCard.locator('.course-title')).toBeVisible();
            await expect(courseCard.locator('.course-description')).toBeVisible();
            await expect(courseCard.locator('.view-button')).toBeVisible();
        }
    });
    test('[AQAPRACT-573] Search for a non-existent course', async ({ aqaPractice }) => {
        await aqaPractice.selectCountryFill('Italy');
        await expect(aqaPractice.searchButton).toBeEnabled();
        await aqaPractice.selectLanguageFill('Dutch');
        await expect(aqaPractice.searchButton).toBeEnabled();
        await aqaPractice.clickSearchButton();
        await expect(aqaPractice.noResultMessage).toBeVisible();
    });
    test('[AQAPRACT-574] Select country from drop-down list', async ({ aqaPractice }) => {
        await aqaPractice.selectCountry.click();
        await aqaPractice.selectCountryFill('Italy');
        await expect(aqaPractice.selectCountry).toHaveValue('Italy');
        await expect(aqaPractice.searchButton).toBeEnabled();
    });
    test('[AQAPRACT-575] Select a language from thelanguage drop-down list', async ({
        aqaPractice,
    }) => {
        await aqaPractice.selectLanguage.click();
        await aqaPractice.selectLanguageFill('Dutch');
        await expect(aqaPractice.selectLanguage).toHaveValue('Dutch');
        await expect(aqaPractice.searchButton).toBeEnabled();
    });
    test('[AQAPRACT-576] Select a type from the type drop-down list', async ({ aqaPractice }) => {
        await aqaPractice.selectType.click();
        await aqaPractice.selectTypeFill('Testing');
        await expect(aqaPractice.selectType).toHaveValue('Testing');
        await expect(aqaPractice.searchButton).toBeEnabled();
    });
    test('[AQAPRACT-581]  Select a course from the Select courses list', async ({
        aqaPractice,
    }) => {
        await aqaPractice.selectSingleCourse('Frontend Development');
        await aqaPractice.selectCountryFill('Italy');
        await expect(aqaPractice.searchButton).toBeEnabled();
        await aqaPractice.clickSearchButton();
        await expect(aqaPractice.getPage()).toHaveURL(/search_results/);
        await expect(aqaPractice.searchResultsTitle).toBeVisible();
    });
    test('[AQAPRACT-582]  Multiselection for course from the Select courses list', async ({
        aqaPractice,
    }) => {
        const courses = ['Frontend Development', 'Backend Development'];
        await aqaPractice.selectCountryFill('Italy');
        await aqaPractice.selectMultipleCourses(courses);
        await expect(aqaPractice.searchButton).toBeEnabled();
        await aqaPractice.clickSearchButton();
        await expect(aqaPractice.getPage()).toHaveURL(/search_results/);
        await expect(aqaPractice.searchResultsTitle).toBeVisible();
    });
});
