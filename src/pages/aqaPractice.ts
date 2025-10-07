import { expect, type Locator, type Page, type FrameLocator } from '@playwright/test';
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
    readonly backButtonFromAction: Locator;
    readonly actionAlertIframe: FrameLocator;
    readonly actionAlertPageTitle: Locator;
    readonly actionAlertPageSubtitle: Locator;
    readonly confirmButton: Locator;
    readonly getDiscountButton: Locator;
    readonly cancelCourseButton: Locator;
    readonly actionResult: Locator;
    readonly finishActionButton: Locator;
    readonly confirmInfoIcon: Locator;
    readonly confirmTooltip: Locator;
    readonly getDiscountInfoIcon: Locator;
    readonly discountTooltip: Locator;
    readonly cancelCourseInfoIcon: Locator;
    readonly cancelCourseTooltip: Locator;
    // Class properties
    readonly manualColumnClass: string;
    readonly autoColumnClass: string;
    readonly finishButtonDisabledClass: string;
    readonly finishButtonEnabledClass: string;
    readonly hoverChipClass: string;
    readonly actionButtonColorOnHover: string;

    constructor(page: Page) {
        super(page);
        this.aqaPracticeDropdown = page.locator('div.flex.cursor-pointer:has-text("AQA Practice")');
        this.selectItem = page.locator('text=Select');
        this.dragAndDropItem = page.locator('text=Drag & Drop');
        this.actionAlertItem = page.locator('text=Actions, Alerts & Iframes');
        this.backToProfileBtn = page.locator('a[data-test-id="NavLinkToHome"]');
        //! Select items
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
        //! Drag and Drop
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
        //! Actions and Alerts
        this.backButtonFromAction = page.locator(
            'div[data-for-tests----seems-like-cool-attribute-name="NavButtonToBack"]'
        );
        this.actionAlertIframe = page.frameLocator('iframe[title="Finish your registration"]');
        this.actionAlertPageTitle = page.getByRole('heading', {
            name: 'Your application has been accepted!',
        });
        this.actionAlertPageSubtitle = this.actionAlertIframe.locator('h2', {
            hasText: 'Click one of the buttons to complete your registration on Default course',
        });
        this.confirmButton = this.actionAlertIframe.locator('#AlertButton');
        this.getDiscountButton = this.actionAlertIframe.getByRole('button', {
            name: 'Get Discount',
        });
        this.cancelCourseButton = this.actionAlertIframe.locator(
            'button[data-test-id="PromptButton"]'
        );
        this.actionResult = this.actionAlertIframe.locator('div').filter({ hasText: /^Results:/ });
        this.finishActionButton = this.actionAlertIframe.getByRole('button', { name: 'Finish' });
        this.confirmInfoIcon = this.actionAlertIframe.locator('svg.cursor-pointer').nth(0);
        this.confirmTooltip = this.actionAlertIframe.locator(
            'text=Click the button to open a JavaScript alert'
        );
        this.getDiscountInfoIcon = this.actionAlertIframe.locator('svg.cursor-pointer').nth(1);
        this.discountTooltip = this.actionAlertIframe.locator(
            'text=Double click the button to open a JavaScript confirm'
        );
        this.cancelCourseInfoIcon = this.actionAlertIframe.locator('svg.cursor-pointer').nth(2);
        this.cancelCourseTooltip = this.actionAlertIframe.locator(
            'text=Right click to open a JavaScript prompt'
        );
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
        this.actionButtonColorOnHover = 'hover:bg-sky-300';
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
    //! Alerts
    async handleConfirmAlert(expectedMessage: string = 'You have called alert!'): Promise<void> {
        this.page.once('dialog', async (dialog) => {
            expect(dialog.message()).toBe(expectedMessage);
            await dialog.accept();
        });
    }
    async expectEnrollmentSuccess(): Promise<void> {
        await expect(this.actionResult).toHaveText(
            /Congratulations, you have successfully enrolled in the course!/
        );
        await expect(this.finishActionButton).toBeEnabled();
    }
    async handleDiscountAlert(
        accept: boolean = true,
        expectedMessage: string = 'Are you sure you want to apply the discount?'
    ): Promise<void> {
        this.page.once('dialog', async (dialog) => {
            expect(dialog.message()).toBe(expectedMessage);
            if (accept) {
                await dialog.accept();
            } else {
                await dialog.dismiss();
            }
        });
    }
    async expectDiscountResult(accept: boolean = true): Promise<void> {
        if (accept) {
            await expect(this.actionResult).toHaveText(
                /You received a 10% discount on the second course./
            );
        } else {
            const resultText = await this.actionResult.textContent();
            expect(resultText?.trim()).toBe('Results:');
            await expect(this.finishActionButton).toHaveClass(/bg-\[#EFEFF0\]/); // inactive (toBeEnabled not working)
        }
    }
    async handleCancelCoursePrompt(
        reason: string | null = 'Test reason',
        expectedMessage: string = 'Here you may describe a reason why you are cancelling your registration (or leave this field empty).'
    ): Promise<void> {
        this.page.once('dialog', async (dialog) => {
            expect(dialog.message()).toBe(expectedMessage);
            if (reason === null) {
                await dialog.dismiss();
            } else {
                await dialog.accept(reason);
            }
        });
    }
    async expectCancelCourseResult(reason: string | null = 'Test reason'): Promise<void> {
        if (reason && reason.trim() !== '') { // for not sending empty reason message  
            await expect(this.actionResult).toHaveText(
                new RegExp(`Your course application has been cancelled\\. Reason: ${reason}`)
            );
        } else {
            await expect(this.actionResult).toHaveText(
                /Your course application has been cancelled\. Reason: You did not notice any reason\./
            );
        }
        await expect(this.finishActionButton).toBeEnabled();
    }
}
