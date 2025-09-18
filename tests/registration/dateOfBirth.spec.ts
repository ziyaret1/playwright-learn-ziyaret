import { expect, test } from "@playwright/test";
import { RegisterPage } from "../../src/pages/registrationPage";

test.describe("Date of Birth Suite", () => {
  let register: RegisterPage;

  test.beforeEach(async ({ page }) => {
    register = new RegisterPage(page);
    await register.goto();
    await register.fillRequiredFieldsExcept("dateOfBirth");
  });

  test('[AQAPRACT-519] Register with empty "Date of birth" field', async ({
    page,
  }) => {
    await register.fillDateOfBirth("");
    await expect(register.dateOfBirthInput).toHaveValue("");
    await expect(register.submitButton).toBeDisabled();
  });

  test("[AQAPRACT-520] The elements on the calendar picker are available", async ({
    page,
  }) => {
    await register.openCalendar();

    // Check dropdowns visible
    await expect(register.yearDropdown).toBeVisible();
    await expect(register.monthDropdown).toBeVisible();

    await expect(register.dayOption.first()).toBeVisible(); // Check day elements visible
    await register.selectDate("2000", "January", "15"); // Select any date
    await expect(register.dateOfBirthInput).toHaveValue("01/15/2000"); // Verify input value (input format: MM/DD/YYYY)
  });

  test('[AQAPRACT-521] The date is filled in manually in the "Date of birth" field', async ({
    page,
  }) => {
    await register.openCalendar();
    await expect(register.dateCalendar).toBeVisible();

    const manualDate = "01/15/2000";
    await register.enterDateOfBirthManually(manualDate);
    await expect(register.dateOfBirthInput).toHaveValue(manualDate);
  });

  test('[AQAPRACT-522] It`s impossible to register with the "date of birth" in the future', async ({
    page,
  }) => {
    await register.openCalendar();

    // Future data preparation
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const year = futureDate.getFullYear().toString();
    const month = futureDate.toLocaleDateString("default", { month: "long" });
    const day = futureDate.getDate().toString().padStart(2, "0");

    // Add future date
    await register.selectFutureDate(year, month, day);
    await expect(register.submitButton).toBeDisabled();
  });
});
