import { expect, type Locator, type Page } from "@playwright/test";
import { TestData, generateUniqueEmail } from "../testData/testData";

export class RegisterPage {
  // Inputs
  readonly page: Page;
  readonly firstnameInput: Locator;
  readonly lastnameInput: Locator;
  readonly emailInput: Locator;
  readonly emailErrorMessage: Locator;
  readonly emailExistsErrorMessage: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly dateOfBirthInput: Locator;

  // Calendar elements
  readonly dateCalendar: Locator;
  readonly nextMonthButton: Locator;
  readonly prevMonthButton: Locator;
  readonly yearDropdown: Locator;
  readonly yearOption: Locator;
  readonly monthDropdown: Locator;
  readonly monthOption: Locator;
  readonly dayOption: Locator;

  // Button
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Inputs
    this.firstnameInput = page.locator("input[name='firstName']");
    this.lastnameInput = page.locator("input[name='lastName']");
    this.emailInput = page.locator('input[name="email"]');
    this.emailErrorMessage = page.locator("text=Invalid email address");
    this.emailExistsErrorMessage = page.locator(
      "text=User with email address already exist"
    );
    this.passwordInput = page.locator('input[name="password"]');
    this.confirmPasswordInput = page.locator(
      'input[name="passwordConfirmation"]'
    );
    this.dateOfBirthInput = page.locator('input[name="dateOfBirth"]');

    // Calendar
    this.dateCalendar = page.locator(".react-datepicker__month");
    this.nextMonthButton = page.locator("div > button:last-of-type"); // button >
    this.prevMonthButton = page.locator("div > button:first-of-type"); // button <
    this.yearDropdown = page.locator("div > select:first-of-type");
    this.yearOption = page.locator("div > select:first-of-type > option");
    this.monthDropdown = page.locator("div > select:last-of-type");
    this.monthOption = page.locator("div > select:last-of-type > option");
    this.dayOption = page.locator(".react-datepicker__day");

    // Button
    this.submitButton = page.locator("button[type='submit']");
  }

  // Page navigation
  async goto(): Promise<void> {
    await this.page.goto("https://qa-course-01.andersenlab.com/registration");
  }

  // Fill inputs
  async fillFirstname(firstname: string): Promise<void> {
    await this.firstnameInput.fill(firstname);
  }
  async fillLastname(lastname: string): Promise<void> {
    await this.lastnameInput.fill(lastname);
  }
  async fillEmailInput(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.emailInput.press("Tab"); // focus out
  }
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }
  async fillConfirmPassword(password: string): Promise<void> {
    await this.confirmPasswordInput.fill(password);
  }
  async fillDateOfBirth(dateOfBirth: string): Promise<void> {
    await this.dateOfBirthInput.fill(dateOfBirth);
    await this.page.keyboard.press("Tab");
  }

  // Fill required fields
  async fillRequiredFieldsExcept(
    skipField?: "firstname" | "lastname" | "dateOfBirth" | "email"
  ): Promise<void> {
    if (skipField !== "firstname") {
      await this.firstnameInput.fill(TestData.FIRSTNAME);
    }
    if (skipField !== "lastname") {
      await this.lastnameInput.fill(TestData.LASTNAME);
    }
    if (skipField !== "dateOfBirth") {
      await this.dateOfBirthInput.fill(TestData.DATE_OF_BIRTH);
    }
    if (skipField !== "email") {
      await this.emailInput.fill(generateUniqueEmail());
    }
    await this.passwordInput.fill(TestData.PASSWORD);
    await this.confirmPasswordInput.fill(TestData.PASSWORD);
  }

  // Calendar
  async openCalendar(): Promise<void> {
    await this.dateOfBirthInput.click();
  }

  async selectYear(year: string): Promise<void> {
    await this.yearDropdown.selectOption(year);
  }

  async selectMonth(month: string): Promise<void> {
    await this.monthDropdown.selectOption(month);
  }

  async selectDay(day: string): Promise<void> {
    const dayLocator = this.dayOption.filter({ hasText: day });
    await dayLocator.first().click();
  }

  async selectDate(year: string, month: string, day: string) {
    await this.openCalendar();
    await this.selectYear(year);
    await this.selectMonth(month);
    await this.selectDay(day);
  }

  async enterDateOfBirthManually(date: string): Promise<void> {
    await this.dateOfBirthInput.fill(date);
    await this.dateOfBirthInput.press("Tab"); // for close calendar
  }

  async selectFutureDate(
    year: string,
    month: string,
    day: string
  ): Promise<void> {
    await this.selectDate(year, month, day);
  }

  // Email
  async invalidEmailError(): Promise<void> {
    await expect(this.emailErrorMessage).toBeVisible();
    await expect(this.emailInput).toHaveClass(/border-rose-500/);
  }
  async dublicateEmailError(): Promise<void> {
    await expect(this.emailExistsErrorMessage).toBeVisible();
  }


}
