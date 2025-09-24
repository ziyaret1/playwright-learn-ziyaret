import { expect } from "@playwright/test";
import { generateUniqueEmail, TestData } from "../../src/testData/testData";
import { test } from '../../src/fixtures/fixture_register';


test.describe("Password Suite", () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.goto();
    await registerPage.fillPassword("");
    await registerPage.fillConfirmPassword("");
    await registerPage.fillFirstname(TestData.FIRSTNAME);
    await registerPage.fillLastname(TestData.LASTNAME);
    await registerPage.fillDateOfBirth(TestData.DATE_OF_BIRTH);
    await registerPage.fillEmailInput(generateUniqueEmail());
  });

  test("[AQAPRACT-526] Register with min Password length (8 characters)", async ({
    registerPage
  }) => {
    const passwordLenght8: string = "A".repeat(8);
    await registerPage.fillPassword(passwordLenght8);
    await expect(registerPage.passwordInput).toHaveValue(passwordLenght8);
    await registerPage.fillConfirmPassword(passwordLenght8);
    await expect(registerPage.passwordInput).toHaveValue(passwordLenght8);
    await registerPage.submitButton.click();
    await expect(registerPage.getPage()).toHaveURL(
      "https://qa-course-01.andersenlab.com/login"
    );
  });

  test("[AQAPRACT-527] Register with max Password length (20 characters)", async ({
    registerPage
  }) => {
    const passwordLenght20: string = "A".repeat(20);
    await registerPage.fillPassword(passwordLenght20);
    await expect(registerPage.passwordInput).toHaveValue(passwordLenght20);
    await registerPage.fillConfirmPassword(passwordLenght20);
    await expect(registerPage.passwordInput).toHaveValue(passwordLenght20);
    await registerPage.submitButton.click();
    await expect(registerPage.getPage()).toHaveURL(
      "https://qa-course-01.andersenlab.com/login"
    );
  });

  test("[AQAPRACT-528] Register with min-1 Password length (7 characters)", async ({
    registerPage
  }) => {
    const passwordLenght7: string = "A".repeat(7);
    await registerPage.fillPassword(passwordLenght7);
    await expect(registerPage.passwordInput).toHaveValue(passwordLenght7);
    await registerPage.invalidPasswordError();
    await expect(registerPage.passwordErrorMin).toBeVisible();
  });

  test("[AQAPRACT-529] Register with max+1 Password length (21 characters)", async ({
    registerPage
  }) => {
    const passwordLenghtMax: string = "A".repeat(21);
    await registerPage.fillPassword(passwordLenghtMax);
    await expect(registerPage.passwordInput).toHaveValue(passwordLenghtMax);
    await registerPage.invalidPasswordError();
    await expect(registerPage.passwordErrorMax).toBeVisible();
  });

  test("[AQAPRACT-530] Register with empty Password field", async ({
    registerPage
  }) => {
    const emptyPassword: string = "";
    await registerPage.fillPassword(emptyPassword);
    await expect(registerPage.passwordInput).toHaveValue("");
    await expect(registerPage.submitButton).toBeDisabled();
  });

  // Confirm Password Suite

  test("[AQAPRACT-531] Register with equal data Password and Confirm password fields", async ({
    registerPage
  }) => {
    const passwordData: string = "TestConf11";
    await registerPage.fillPassword(passwordData);
    await registerPage.fillConfirmPassword(passwordData);
    await registerPage.submitButton.click();
    await expect(registerPage.getPage()).toHaveURL("https://qa-course-01.andersenlab.com/login");
  });


  test("[AQAPRACT-532] Register with different data in Password and Confirm password fields", async ({
    registerPage
  }) => {
    await registerPage.fillPassword("TestConf11");
    await registerPage.fillConfirmPassword("TestConf12");
    await expect(registerPage.submitButton).toBeDisabled();
    await expect(registerPage.confirmPasswordError).toBeVisible();
  });

  
  test("[AQAPRACT-533] Register with empty Confirm password field", async ({
    registerPage
  }) => {
    const passwordData: string = "TestConf11";
    await registerPage.fillPassword(passwordData);
    const emptyConfirmPass: string = "";
    await registerPage.fillConfirmPassword(emptyConfirmPass);
    await expect(registerPage.emptyConfirmPasswordError).toBeVisible();
    await expect(registerPage.emptyConfirmPasswordError).toHaveText("Required");
  });
});
