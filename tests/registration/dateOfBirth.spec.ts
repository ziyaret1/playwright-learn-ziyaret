import { expect } from "@playwright/test";
import { test } from '../../src/fixtures/fixture_register';
import { generateUniqueEmail, TestData } from "../../src/testData/testData";

test.describe("Date of Birth Suite", () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.goto();
    await registerPage.fillDateOfBirth("");
    await registerPage.fillFirstname(TestData.FIRSTNAME);
    await registerPage.fillLastname(TestData.LASTNAME);
    await registerPage.fillPassword(TestData.PASSWORD);
    await registerPage.fillConfirmPassword(TestData.PASSWORD);
    await registerPage.fillEmailInput(generateUniqueEmail());
  });

  test('[AQAPRACT-519] Register with empty "Date of birth" field', async ({
   registerPage
  }) => {
    await registerPage.fillDateOfBirth("");
    await expect(registerPage.dateOfBirthInput).toHaveValue("");
    await expect(registerPage.submitButton).toBeDisabled();
  });

  test("[AQAPRACT-520] The elements on the calendar picker are available", async ({
   registerPage
  }) => {
    await registerPage.openCalendar();

    // Check dropdowns visible
    await expect(registerPage.yearDropdown).toBeVisible();
    await expect(registerPage.monthDropdown).toBeVisible();

    await expect(registerPage.dayOption.first()).toBeVisible(); // Check day elements visible
    await registerPage.selectDate("2000", "January", "15"); // Select any date
    await expect(registerPage.dateOfBirthInput).toHaveValue("01/15/2000"); // Verify input value (input format: MM/DD/YYYY)
  });

  test('[AQAPRACT-521] The date is filled in manually in the "Date of birth" field', async ({
    registerPage
  }) => {
    await registerPage.openCalendar();
    await expect(registerPage.dateCalendar).toBeVisible();

    const manualDate = "01/15/2000";
    await registerPage.enterDateOfBirthManually(manualDate);
    await expect(registerPage.dateOfBirthInput).toHaveValue(manualDate);
  });

  test('[AQAPRACT-522] It`s impossible to register with the "date of birth" in the future', async ({
    registerPage
  }) => {
    await registerPage.openCalendar();

    // Future data preparation
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const year = futureDate.getFullYear().toString();
    const month = futureDate.toLocaleDateString("default", { month: "long" });
    const day = futureDate.getDate().toString().padStart(2, "0");

    // Add future date
    await registerPage.selectFutureDate(year, month, day);
    await expect(registerPage.submitButton).toBeDisabled();
  });
});
