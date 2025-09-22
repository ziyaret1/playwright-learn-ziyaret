import { expect, type Locator, type Page } from "@playwright/test";

export class SignInPage {
  readonly page: Page;
  readonly emailAddress: Locator;
  readonly passwordInput: Locator;
  readonly buttonSignIn: Locator;
  readonly emailRequiredErrorMessage: Locator;
  readonly passwordRequiredErrorMessage: Locator;
  readonly passwordErrorMin: Locator;
  readonly passwordErrorMax: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailAddress = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.buttonSignIn = page.locator('button[type="submit"]');
    this.emailRequiredErrorMessage = page.locator("text=Required");
    this.passwordRequiredErrorMessage = page.locator("text=Required");
    this.passwordErrorMin = page.locator("text=Minimum 8 characters");
    this.passwordErrorMax = page.locator("text=Maximum 20 characters");
  }

  //! Open Sign in page
  async goto(): Promise<void> {
    await this.page.goto("https://qa-course-01.andersenlab.com/login");
  }

  //! Input fill
  async fillEmailAddress(email: string): Promise<void> {
    await this.emailAddress.fill(email);
  }
  async fillPasswordInput(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.buttonSignIn.click();
  }

  //! Error message
  async emailValidationError(): Promise<void> {
    await expect(this.emailAddress).toHaveClass(/border-rose-500/);
    await expect(this.emailRequiredErrorMessage).toBeVisible();
  }

  async passwordRequiredError(): Promise<void> {
    await expect(this.passwordInput).toHaveClass(/border-rose-500/);
    await expect(this.passwordRequiredErrorMessage).toBeVisible();
    await expect(this.buttonSignIn).toBeDisabled();
  }
}
