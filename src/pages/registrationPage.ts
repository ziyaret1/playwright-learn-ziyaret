import { expect, type Locator, type Page } from "@playwright/test";

export class registerPage {
  readonly page: Page;
  readonly firstnameInput: Locator;
  readonly lastnameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstnameInput = page.locator("input[name='firstName']");
    this.lastnameInput = page.locator("input[name='lastName']");
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.confirmPasswordInput = page.locator('input[name="passwordConfirmation"]');
    this.dateOfBirthInput = page.locator('input[name="dateOfBirth"]');
    this.submitButton = page.locator("button[type='submit']");
  }

  async goto(): Promise<void> {
    await this.page.goto("https://qa-course-01.andersenlab.com/registration");
  }

  async fillFirstname(firstname: string): Promise<void> {
    await this.firstnameInput.fill(firstname);
  }

  async fillLastname(lastname: string): Promise<void> {
    await this.lastnameInput.fill(lastname);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
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

  async fillRequiredFieldsExcept(skipField: 'firstname' | 'lastname' | null = null): Promise<void> {  //for select which field will be empty
    if(skipField !== 'firstname') {
        await this.firstnameInput.fill('TestFirstName') 
    }
    if(skipField !== 'lastname') {
        await this.lastnameInput.fill('TestLastname')
    }
    
    await this.emailInput.fill(`testzi${Date.now()}@mail.com`);  //for make email address unique
    await this.passwordInput.fill("Test1234!");
    await this.confirmPasswordInput.fill("Test1234!");
    await this.dateOfBirthInput.fill("2000-01-01");
  }

}
