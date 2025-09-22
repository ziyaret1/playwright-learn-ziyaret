import { expect, type Locator, type Page } from "@playwright/test";

export class SignInPage {
  readonly page: Page;
  readonly emailAddress: Locator;
  readonly passwordInput: Locator;
  readonly buttonSignIn: Locator;
  readonly emailErrorMessage: Locator;
  readonly passwordErrorMessage: Locator;
  readonly passwordErrorMin: Locator;
  readonly passwordErrorMax: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailAddress = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.buttonSignIn = page.locator('button[type="submit"]');
    this.emailErrorMessage = page.locator("text=Required");
    this.passwordErrorMessage = page.locator("text=Required");
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

  async submitClick() {
    await this.buttonSignIn.click();
  }

  //! Error message
  async emailError(): Promise<void> {
    await expect(this.emailAddress).toHaveClass(/border-rose-500/);
    await expect(this.emailErrorMessage).toBeVisible();
  }

  async passwordEmptyError(): Promise<void> {
    await expect(this.passwordInput).toHaveClass(/border-rose-500/);
    await expect(this.passwordErrorMessage).toBeVisible();
    await expect(this.buttonSignIn).toBeDisabled();
  }
}
