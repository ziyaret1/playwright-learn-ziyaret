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
    readonly startDateInput: Locator;
    readonly endDateInput: Locator;
    // Search result
    readonly searchResultsTitle: Locator;
    readonly courseCards: Locator;
    readonly courseCategory: Locator;
    readonly courseName: Locator;
    readonly viewButton: Locator;
    // Select Course from list
    readonly selectionCourses: Locator;
    // No result message
    readonly noResultMessage: Locator;
    // Drag and Drop section
    readonly sortResponsibilitiesTitle: Locator;
    readonly sortResponsibleSubtitle: Locator;
    readonly chips: Locator;
    readonly chipWriteTestCases: Locator;
    readonly chipTestingRequirements: Locator;
    readonly chipAutomationScripts: Locator;
    readonly chipFrameworkSetup: Locator;
    readonly manualWorkTitle: Locator;
    readonly manualCol1: Locator;
    readonly manualCol2: Locator;
    readonly automationWorkTitle: Locator;
    readonly autoCol1: Locator;
    readonly autoCol2: Locator;
    readonly finishDragButton: Locator;
    readonly congratulationPopup: Locator;
    // Actions and Alerts section
    readonly actionAlertPageTitle: Locator;
    readonly actionAlertPageSubtitle: Locator;
    readonly confirmButton: Locator;
    readonly getDiscountButton: Locator;
    readonly cancelCourseButton: Locator;
    readonly actionResult: Locator;
    readonly finishActionButton: Locator;
    readonly confirmInfoIcon: Locator;
    readonly tooltip: Locator;
    // Class properties
    readonly manualColumnClass: string;
    readonly autoColumnClass: string;
    readonly finishButtonDisabledClass: string;
    readonly finishButtonEnabledClass: string;
    readonly hoverChipClass: string;

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
        this.startDateInput = page.locator('input[title="Start date"]');
        this.endDateInput = page.locator('input[title="End date"]');
        this.selectCoursesSection = page.locator('h2', { hasText: 'Select courses' });
        this.selectionCourses = page.locator('#MultipleSelect');
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
        // Drag and Drop
        this.sortResponsibilitiesTitle = page.locator('h1', {
            hasText: 'Sort your responsibilities',
        });
        this.sortResponsibleSubtitle = page.locator('h2', {
            hasText: 'Place the blocks into the cells below',
        });
        this.chips = page.locator('span[title="Draggable element"]');
        this.chipWriteTestCases = page.locator('#manual1');
        this.chipTestingRequirements = page.locator('#manual2');
        this.chipAutomationScripts = page.locator('#auto1');
        this.chipFrameworkSetup = page.locator('#auto2');
        this.manualWorkTitle = page.locator('h3', { hasText: 'Manual Work' });
        this.automationWorkTitle = page.locator('h3', { hasText: 'Automation Work' });
        this.manualCol1 = page.locator('#target-manual1');
        this.manualCol2 = page.locator('#target-manual2');
        this.autoCol1 = page.locator('#target-auto1');
        this.autoCol2 = page.locator('#target-auto2');
        // Finish button
        this.finishDragButton = page.locator('#DragNDropPageFinishButton');
        // Success message
        this.congratulationPopup = page.getByText('Congratulations', { exact: false });
        // Actions and Alerts
        this.actionAlertPageTitle = page.getByRole('heading', {
            name: 'Your application has been accepted!',
        });
        this.actionAlertPageSubtitle = page.getByText(
            'Click one of the buttons to complete your registration on Default course'
        );
        this.confirmButton = page.locator('#AlertButton');
        this.getDiscountButton = page.getByRole('button', { name: 'Get Discount' });
        this.cancelCourseButton = page.getByTestId('PromptButton');
        this.actionResult = page.locator('div').filter({ hasText: /^Results:/ });
        this.finishActionButton = page.getByRole('button', { name: 'Finish' });
        this.confirmInfoIcon = page.locator('#AlertButton + .info-icon');
        this.tooltip = page.locator('.tooltip');
        // Class Properties
        this.manualColumnClass =
            'flex flex-col flex-1 items-center justify-center min-h-[200px] border border-dashed border-zinc-200 ';
        this.autoColumnClass =
            'flex flex-col flex-1 items-center justify-center min-h-[200px] border border-dashed border-zinc-200 ';
        this.hoverChipClass =
            'px-[15px] py-[7px] bg-sky-100 rounded hover:bg-sky-300 active:bg-sky-200 cursor-pointer';
        this.finishButtonDisabledClass =
            'h-[42px] w-[180px] bg-[#EFEFF0] text-[#888D92] self-end flex items-center justify-center font-medium text-sm';
        this.finishButtonEnabledClass =
            'h-[42px] w-[180px] bg-[#feda00] hover:bg-[#FEC600] self-end flex items-center justify-center font-medium text-sm';
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
        await this.selectionCourses.selectOption({ label: course });
    }
    async selectMultipleCourses(courses: string[]): Promise<void> {
        for (const course of courses) {
            await this.selectionCourses.selectOption({ label: course });
        }
    }
    async dragAndDrop(source: Locator, target: Locator): Promise<void> {
        await source.dragTo(target);
    }
    async hoverChip(chip: Locator): Promise<void> {
        await chip.hover();
        await expect(chip).toHaveClass(/cursor-pointer/);
    }
}
