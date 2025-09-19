import { expect, test } from "@playwright/test";
import { RegisterPage } from "../../src/pages/registrationPage";

test.describe("Calendar Suite", () => {
  let register: RegisterPage;

  test.beforeEach(async ({ page }) => {
    register = new RegisterPage(page);
    await register.goto();
    await register.openCalendar();
  });


  test("[AQAPRACT-745] Month navigators switch months", async ({ page }) => {
    const currentMonth = await register.dateCalendar.textContent();

    await register.nextMonthButton.click();
    const nextMonth = await register.dateCalendar.textContent();

    expect(nextMonth).not.toEqual(currentMonth);

    await register.prevMonthButton.click();
    const backToCurrentMonth = await register.dateCalendar.textContent();
    expect(backToCurrentMonth).toEqual(currentMonth);
  });


  test("[AQAPRACT-746] Year drop down is possible to be opened", async ({
    page,
  }) => {
    await register.yearDropdown.click();
    await register.yearDropdown.selectOption("1900");

    await expect(register.yearDropdown).toHaveValue("1900"); // means we scrool for 1900 option
  });


  test("[AQAPRACT-747] Year is possible to be selected", async () => {
    const targetYear = "2000";
    await register.yearDropdown.selectOption(targetYear);
    await expect(register.yearDropdown).toHaveValue(targetYear);
  });


  test("[AQAPRACT-748] Month dropdown is possible to be opened", async () => {
    await register.monthDropdown.click();
    await register.monthDropdown.selectOption("October");
    await expect(register.monthDropdown).toHaveValue("October");
  });


  test("[AQAPRACT-749] Month is possible to be selected", async () => {
    const targetMonth = "October"; 
    await register.monthDropdown.selectOption(targetMonth);
    await expect(register.monthDropdown).toHaveValue(targetMonth);
  });


  test("[AQAPRACT-750] The date is possible to be selected", async () => {
    await register.selectYear('1990');
    await register.selectMonth('October');
    await register.selectDay("16");

    await expect(register.dateOfBirthInput).toHaveValue("03/15/1990");
    await expect(register.dateCalendar).not.toBeVisible();             // Should close automatically
  });

});
