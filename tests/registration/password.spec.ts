import { expect, test } from "@playwright/test";
import { RegisterPage } from "../../src/pages/registrationPage";
import { generateUniqueEmail, TestData } from "../../src/testData/testData";

test.describe("Password Suite", () => {
  let register: RegisterPage;

  test.beforeEach(async ({ page }) => {
    register = new RegisterPage(page);
    await register.goto();
    await register.fillPassword("");
    await register.fillConfirmPassword("");
    await register.fillFirstname(TestData.FIRSTNAME);
    await register.fillLastname(TestData.LASTNAME);
    await register.fillDateOfBirth(TestData.DATE_OF_BIRTH);
    await register.fillEmailInput(generateUniqueEmail());
  });

  test("[AQAPRACT-526] Register with min Password length (8 characters)", async ({
    page,
  }) => {
    const passwordLenght8: string = "A".repeat(8);
    await register.fillPassword(passwordLenght8);
    await expect(register.passwordInput).toHaveValue(passwordLenght8);
    await register.fillConfirmPassword(passwordLenght8);
    await expect(register.passwordInput).toHaveValue(passwordLenght8);
    await register.submitButton.click();
    await expect(register.page).toHaveURL(
      "https://qa-course-01.andersenlab.com/login"
    );
  });

  test("[AQAPRACT-527] Register with max Password length (20 characters)", async ({
    page,
  }) => {
    const passwordLenght20: string = "A".repeat(20);
    await register.fillPassword(passwordLenght20);
    await expect(register.passwordInput).toHaveValue(passwordLenght20);
    await register.fillConfirmPassword(passwordLenght20);
    await expect(register.passwordInput).toHaveValue(passwordLenght20);
    await register.submitButton.click();
    await expect(register.page).toHaveURL(
      "https://qa-course-01.andersenlab.com/login"
    );
  });

  test("[AQAPRACT-528] Register with min-1 Password length (7 characters)", async ({
    page,
  }) => {
    const passwordLenght7: string = "A".repeat(7);
    await register.fillPassword(passwordLenght7);
    await expect(register.passwordInput).toHaveValue(passwordLenght7);
    await register.invalidPasswordError();
    await expect(register.passwordErrorMin).toBeVisible();
  });

  test("[AQAPRACT-529] Register with max+1 Password length (21 characters)", async ({
    page,
  }) => {
    const passwordLenghtMax: string = "A".repeat(21);
    await register.fillPassword(passwordLenghtMax);
    await expect(register.passwordInput).toHaveValue(passwordLenghtMax);
    await register.invalidPasswordError();
    await expect(register.passwordErrorMax).toBeVisible();
  });

  test("[AQAPRACT-530] Register with empty Password field", async ({
    page,
  }) => {
    const emptyPassword: string = "";
    await register.fillPassword(emptyPassword);
    await expect(register.passwordInput).toHaveValue("");
    await expect(register.submitButton).toBeDisabled();
  });

  // Confirm Password Suite

  test("[AQAPRACT-531] Register with equal data Password and Confirm password fields", async ({
    page,
  }) => {
    const passwordData: string = "TestConf11";
    await register.fillPassword(passwordData);
    await register.fillConfirmPassword(passwordData);
    await register.submitButton.click();
    await expect(register.page).toHaveURL("https://qa-course-01.andersenlab.com/login");
  });


  test("[AQAPRACT-532] Register with different data in Password and Confirm password fields", async ({
    page,
  }) => {
    await register.fillPassword("TestConf11");
    await register.fillConfirmPassword("TestConf12");
    await expect(register.submitButton).toBeDisabled();
    await expect(register.confirmPasswordError).toBeVisible();
  });

  
  test("[AQAPRACT-533] Register with empty Confirm password field", async ({
    page,
  }) => {
    const passwordData: string = "TestConf11";
    await register.fillPassword(passwordData);
    const emptyConfirmPass: string = "";
    await register.fillConfirmPassword(emptyConfirmPass);
    await expect(register.emptyConfirmPasswordError).toBeVisible();
    await expect(register.emptyConfirmPasswordError).toHaveText("Required");
  });
});
