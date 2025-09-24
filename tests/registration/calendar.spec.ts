import { expect } from "@playwright/test";
import { test } from "../../src/fixtures/fixture_register";

test.describe("Calendar Suite", () => {

  test.beforeEach(async ({ registerPage }) => {
    await registerPage.goto();
    await registerPage.openCalendar();
  });


  test("[AQAPRACT-745] Month navigators switch months", async ({ registerPage }) => {
    const currentMonth = await registerPage.dateCalendar.textContent();

    await registerPage.nextMonthButton.click();
    const nextMonth = await registerPage.dateCalendar.textContent();

    expect(nextMonth).not.toEqual(currentMonth);

    await registerPage.prevMonthButton.click();
    const backToCurrentMonth = await registerPage.dateCalendar.textContent();
    expect(backToCurrentMonth).toEqual(currentMonth);
  });


  test("[AQAPRACT-746] Year drop down is possible to be opened", async ({
    registerPage
  }) => {
    await registerPage.yearDropdown.click();
    await registerPage.yearDropdown.selectOption("1900");

    await expect(registerPage.yearDropdown).toHaveValue("1900"); // means we scrool for 1900 option
  });


  test("[AQAPRACT-747] Year is possible to be selected", async ({registerPage}) => {
    const targetYear = "2000";
    await registerPage.yearDropdown.selectOption(targetYear);
    await expect(registerPage.yearDropdown).toHaveValue(targetYear);
  });


  test("[AQAPRACT-748] Month dropdown is possible to be opened", async ({registerPage}) => {
    await registerPage.monthDropdown.click();
    await registerPage.monthDropdown.selectOption("October");
    await expect(registerPage.monthDropdown).toHaveValue("October");
  });


  test("[AQAPRACT-749] Month is possible to be selected", async ({registerPage}) => {
    const targetMonth = "October"; 
    await registerPage.monthDropdown.selectOption(targetMonth);
    await expect(registerPage.monthDropdown).toHaveValue(targetMonth);
  });


  test("[AQAPRACT-750] The date is possible to be selected", async ({registerPage}) => {
    await registerPage.selectYear('1990');
    await registerPage.selectMonth('October');
    await registerPage.selectDay("16");

    await expect(registerPage.dateOfBirthInput).toHaveValue("03/15/1990");
    await expect(registerPage.dateCalendar).not.toBeVisible();             // Should close automatically
  });

});
