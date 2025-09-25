import { expect, type Page, type Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { PageUrls } from "../testData/testData";
export class UserProfilePage extends BasePage {
    readonly logoHeader: Locator;
    readonly userPhoto: Locator;
    readonly userName: Locator;
    readonly position: Locator;
    readonly email: Locator;
    readonly technologies: Locator;
    readonly dateOfBirth: Locator;
    readonly editButton: Locator;
    readonly aqaPracticeDropdown: Locator;
    readonly signOutButton: Locator;
    readonly footerLogo: Locator;
    readonly footerContact: Locator;
    readonly footerPhone: Locator;
    readonly footerEmail: Locator;
    // Dropdown menu
    readonly dropdownOptionSelect: Locator;
    readonly dropdownOptionDragDrop: Locator;
    readonly dropdownOptionActions: Locator;
    // Edit Profile modal
    readonly modalCloseButton: Locator;
    readonly editPersonalInfoTitle: Locator;
    readonly editPersonalInfoText: Locator;
    readonly firstNameInput: Locator;
    readonly firstnameRequiredErrorMessage: Locator;
    readonly lengthErrorMessage: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly emailInfo: Locator;
    readonly dateOfBirthInput: Locator;
    readonly cancelButton: Locator;
    readonly saveButton: Locator;
    constructor(page: Page) {
        super(page);
        // Profile page
        this.logoHeader = page.locator('img[alt="Logo"]');
        this.userPhoto = page.locator('img[alt=""]').first();
        this.userName = page.locator("h1");
        this.position = page
            .locator("div.flex.flex-col.grow >> text=Position")
            .locator("xpath=following-sibling::div[1]");
        this.email = page
            .locator("div.flex.flex-col.grow >> text=E-mail")
            .locator("xpath=following-sibling::div[1]");
        this.technologies = page
            .locator("div.flex.flex-col.grow >> text=Technologies")
            .locator("xpath=following-sibling::div[1]");
        this.dateOfBirth = page
            .locator("div.flex.flex-col.grow >> text=Date of birth")
            .locator("xpath=following-sibling::div[1]");
        this.editButton = page.locator('img[alt="Edit"]');
        this.aqaPracticeDropdown = page.locator('div:text("AQA Practice")');
        this.signOutButton = page.locator('div:text("Sign Out")');
        this.footerLogo = page.locator('img[alt="Company Logo"]');
        this.footerContact = page.getByText("Contact us", { exact: true });
        this.footerPhone = page.locator('img[alt="Phone"]').locator("xpath=following-sibling::div");
        this.footerEmail = page.locator('img[alt="Email"]').locator("xpath=following-sibling::div");
        // Dropdown menu
        this.dropdownOptionSelect = page.getByText("Select", { exact: true });
        this.dropdownOptionDragDrop = page.getByText("Drag & Drop", {
            exact: true,
        });
        this.dropdownOptionActions = page.getByText("Actions, Alerts & Iframes", {
            exact: true,
        });
        // Edit Profile modal
        this.modalCloseButton = page.locator('img[alt="Close"]');
        this.editPersonalInfoTitle = page.getByRole("heading", {
            name: "Edit personal information",
        });
        this.editPersonalInfoText = page.getByText(
            "Please, provide your personal information in English.",
        );
        this.firstNameInput = page.locator('input[name="firstName"]');
        this.firstnameRequiredErrorMessage = page.locator('span.text-rose-500:text("Required")');
        this.lengthErrorMessage = page.getByText("The value length shouldn't exceed 255 symbols.");
        this.lastNameInput = page.locator('input[name="lastName"]');
        this.emailInput = page.locator('input[name="email"]');
        this.emailInfo = page
            .locator('div:has-text("E-mail")')
            .locator('xpath=following-sibling::div[contains(@class, "text-black")]');
        this.dateOfBirthInput = page.locator('input[name="dateOfBirth"]');
        this.cancelButton = page.getByRole("button", { name: "Cancel" });
        this.saveButton = page.getByRole("button", { name: "Save" });
    }
    //! Methods
    async goto(): Promise<void> {
        await super.goto(PageUrls.USER_PROFILE);
    }
    //! User Profile
    async verifyProfileLayout(): Promise<void> {
        await expect(this.logoHeader).toBeVisible();
        await expect(this.userPhoto).toBeVisible();
        await expect(this.userName).toBeVisible();
        await expect(this.position).toBeVisible();
        await expect(this.email).toBeVisible(); //error
        await expect(this.technologies).toBeVisible();
        await expect(this.dateOfBirth).toBeVisible();
        await expect(this.editButton).toBeVisible();
        await expect(this.aqaPracticeDropdown).toBeVisible();
        await expect(this.signOutButton).toBeVisible();
        await expect(this.footerLogo).toBeVisible();
        await expect(this.footerContact).toBeVisible();
        await expect(this.footerPhone).toBeVisible();
        await expect(this.footerEmail).toBeVisible();
    }
    async signOutSuccessfully(): Promise<void> {
        await this.signOutButton.click();
        await expect(this.page).toHaveURL(PageUrls.SIGNIN);
    }
    async verifyDropdownOptions() {
        await this.aqaPracticeDropdown.click();
        await expect(this.dropdownOptionSelect).toBeVisible();
        await expect(this.dropdownOptionDragDrop).toBeVisible();
        await expect(this.dropdownOptionActions).toBeVisible();
    }
    //! Edit Profile modal
    async verifyEditPersonalInfoModal(): Promise<void> {
        await expect(this.editPersonalInfoTitle).toBeVisible();
        await expect(this.editPersonalInfoText).toBeVisible();
        await expect(this.modalCloseButton).toBeVisible();
        await expect(this.firstNameInput).not.toHaveValue("");
        await expect(this.lastNameInput).not.toHaveValue("");
        await expect(this.emailInput).not.toHaveValue("");
        await expect(this.dateOfBirthInput).not.toHaveValue("");
        await expect(this.cancelButton).toBeVisible();
        await expect(this.saveButton).toBeVisible();
    }
    async updateFirstname(value: string): Promise<void> {
        await this.firstNameInput.fill(value);
    }
    async updateLastname(value: string): Promise<void> {
        await this.lastNameInput.fill(value);
    }
    async updateEmail(value: string): Promise<void> {
        await this.emailInput.fill(value);
    }
    async updateDateOfBirth(value: string): Promise<void> {
        await this.dateOfBirthInput.fill(value);
    }
    async clickSave(): Promise<void> {
        await this.saveButton.click();
        await expect(this.editPersonalInfoTitle).toHaveCount(0);
    }
    async clickCancel(): Promise<void> {
        await this.cancelButton.click();
        await expect(this.editPersonalInfoTitle).toHaveCount(0);
    }
    async clickCloseModal(): Promise<void> {
        await this.modalCloseButton.click();
        await expect(this.editPersonalInfoTitle).toHaveCount(0);
    }
}
