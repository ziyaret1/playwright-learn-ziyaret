import { expect, type Locator, type Page } from '@playwright/test';
import { PageUrls } from '../testData/testData';
import { BasePage } from './basePage';

export class AqaPractice extends BasePage {
    readonly aqaPracticeDropdown: Locator;
    readonly selectItem: Locator;
    readonly dragAndDropItem: Locator;
    readonly actionAlertItem: Locator;
    readonly backToProfileBtn: Locator;
    // Select items
    readonly chooseCourseTitle: Locator;
    readonly defineStudyPreferencesSection: Locator;
    readonly selectCountry: Locator;
    readonly selectLanguage: Locator;
    readonly selectType: Locator;
    readonly selectCoursesSection: Locator;
    readonly searchButton: Locator;
    // Calendars and items for select date
    readonly startDate: Locator;
    readonly endDate: Locator;
    // Search result
    readonly searchResultsTitle: Locator;
    readonly courseCards: Locator;
    readonly courseCategory: Locator;
    readonly courseName: Locator;
    readonly viewButton: Locator;
    // Select Course from list
    readonly multipleSelectionBtn: Locator;
    // No result message
    readonly noResultMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.aqaPracticeDropdown = page.locator('div.flex.cursor-pointer:has-text("AQA Practice")');
        this.selectItem = page.locator('text=Select');
        this.dragAndDropItem = page.locator('text=Drag & Drop');
        this.actionAlertItem = page.locator('text=Actions, Alerts & Iframes');
        this.backToProfileBtn = page.locator('a[data-test-id="NavLinkToHome"]');
        // Select items
        this.chooseCourseTitle = page.locator('h1', { hasText: 'Choose your course' });
        this.defineStudyPreferencesSection = page.locator('h2', {
            hasText: 'Define your study preferences',
        });
        this.selectCountry = page.locator('select[title="Select country"]');
        this.selectLanguage = page.locator('#SelectLanguage');
        this.selectType = page.locator('select[title="Select type"]');
        this.startDate = page.locator('input[title="Start date"]');
        this.endDate = page.locator('input[title="End date"]');
        this.selectCoursesSection = page.locator('h2', { hasText: 'Select courses' });
        this.multipleSelectionBtn = page.locator('#MultipleSelect');
        this.searchButton = page.locator('button[name="SelectPageSearchButton"]');
        // Search results
        this.searchResultsTitle = page.locator('h1', { hasText: 'Search results' });
        this.courseCards = page.locator('.course-card');
        this.courseCategory = page.locator('h2.mt-5.text-[24px]');
        this.courseName = page.locator('.p-10.bg-white.flex.cursor-pointer >> div.flex-1');
        this.viewButton = page.locator('.p-10.bg-white.flex.cursor-pointer span:text("View")');
        // No result message
        this.noResultMessage = page.locator(
            'text=Unfortunately, we did not find any courses matching your chosen criteria.'
        );
    }
    //! Methods
    async goto(): Promise<void> {
        await super.goto(PageUrls.SELECT_COURSES);
    }
    async selectCountryFill(country: string): Promise<void> {
        await this.selectCountry.selectOption({ label: country });
        await expect(this.searchButton).toBeEnabled();
    }
    async selectLanguageFill(language: string): Promise<void> {
        await this.selectLanguage.selectOption({ label: language });
        await expect(this.searchButton).toBeEnabled();
    }
    async selectTypeFill(type: string): Promise<void> {
        await this.selectType.selectOption({ label: type });
    }
    async clickSearchButton(): Promise<void> {
        await this.searchButton.click();
    }
    async selectSingleCourse(course: string): Promise<void> {
        await this.multipleSelectionBtn.selectOption({ label: course });
    }
    async selectMultipleCourses(courses: string[]): Promise<void> {
        for (const course of courses) {
            await this.multipleSelectionBtn.selectOption({ label: course });
        }
    }
}
