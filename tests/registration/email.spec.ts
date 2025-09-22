import { expect, test } from "@playwright/test";
import { RegisterPage } from "../../src/pages/registrationPage";
import { generateUniqueEmail, InvalidEmail, TestData } from "../../src/testData/testData";

test.describe("Email Suite", () => {
  let register: RegisterPage;

  test.beforeEach(async ({ page }) => {
    register = new RegisterPage(page);
    await register.goto();
    await register.fillEmailInput("");
    await register.fillFirstname(TestData.FIRSTNAME);
    await register.fillLastname(TestData.LASTNAME);
    await register.fillDateOfBirth(TestData.DATE_OF_BIRTH);
    await register.fillPassword(TestData.PASSWORD);
    await register.fillConfirmPassword(TestData.PASSWORD);
  });


  test('[AQAPRACT-523] Register with empty "Email" field', async ({ page }) => {
    await register.fillEmailInput("");
    await expect(register.submitButton).toBeDisabled();
  });


  test("[AQAPRACT-524] Register with invalid format of email address", async ({
    page,
  }) => {
    for (const emailValueInvalid of Object.values(InvalidEmail)) {
      await register.fillEmailInput(emailValueInvalid);
      await register.invalidEmailError();
    }
  });


  test('[AQAPRAC-525] Register with already existed email', async({page}) => {
    const testEmailAddress: string = 'testexisting1@example.com';
    await register.fillEmailInput(testEmailAddress);
    await register.submitButton.click();
    await expect(page).toHaveURL('https://qa-course-01.andersenlab.com/login')

    // refresh and again submit with same email
    const registrationLink = page.locator('span:has-text("Registration")');
    await registrationLink.click();
    await register.fillEmailInput(generateUniqueEmail());
    await register.fillEmailInput(testEmailAddress);
    await register.submitButton.click();
    await register.dublicateEmailError();
  })

});
