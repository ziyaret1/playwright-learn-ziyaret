import { expect, type Locator, type Page } from "@playwright/test";
import { generateUniqueEmail, TestData } from "../testData/testData";

export class RegisterPage {
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

  async fillRequiredFieldsExcept(skipField?: 'firstname' | 'lastname'): Promise<void> {  //for select which field will be empty
    if(skipField !== 'firstname') {
        await this.firstnameInput.fill(TestData.FIRSTNAME) 
    }
    if(skipField !== 'lastname') {
        await this.lastnameInput.fill(TestData.LASTNAME)
    }
    
    await this.emailInput.fill(generateUniqueEmail());  
    await this.passwordInput.fill(TestData.PASSWORD);
    await this.confirmPasswordInput.fill(TestData.PASSWORD);
    await this.dateOfBirthInput.fill(TestData.DATE_OF_BIRTH);
  }

}
