import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { PageUrls } from "../testData/testData";
export class SignInPage extends BasePage {
    readonly emailAddressInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButtonSignIn: Locator;
    readonly emailIsRequiredErrorMessage: Locator;
    readonly passwordIsRequiredErrorMsg: Locator;
    readonly passwordErrorMinMsg: Locator;
    readonly passwordErrorMaxMsg: Locator;
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.emailAddressInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.submitButtonSignIn = page.locator('button[type="submit"]');
        this.emailIsRequiredErrorMessage = page.locator("text=Required");
        this.passwordIsRequiredErrorMsg = page.locator("text=Required");
        this.passwordErrorMinMsg = page.locator("text=Minimum 8 characters");
        this.passwordErrorMaxMsg = page.locator("text=Maximum 20 characters");
    }
    //! Open Sign in page
    async goto(): Promise<void> {
        await super.goto(PageUrls.SIGNIN);
    }
    //! Input fill
    async fillEmailAddress(email: string): Promise<void> {
        await this.emailAddressInput.fill(email);
    }
    async fillPasswordInput(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }
    async submit(): Promise<void> {
        await this.submitButtonSignIn.click();
    }
    //! Error message
    async verifyErrorRequiredEmail(): Promise<void> {
        await expect(this.emailAddressInput).toHaveClass(/border-rose-500/);
        await expect(this.emailIsRequiredErrorMessage).toBeVisible();
    }
    async verifyErrorRequiredPassword(): Promise<void> {
        await expect(this.passwordInput).toHaveClass(/border-rose-500/);
        await expect(this.passwordIsRequiredErrorMsg).toBeVisible();
        await expect(this.submitButtonSignIn).toBeDisabled();
    }
}
