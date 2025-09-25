import { expect } from "@playwright/test";
import { test } from "../../src/fixtures/fixture_register";
import { generateUniqueEmail, TestData } from "../../src/testData/testData";
test.describe("Last name Suite", () => {
    test.beforeEach(async ({ registerPage }) => {
        await registerPage.goto();
        await registerPage.fillFirstname(TestData.FIRSTNAME);
        await registerPage.fillLastname(TestData.LASTNAME);
        await registerPage.fillDateOfBirth(TestData.DATE_OF_BIRTH);
        await registerPage.fillPassword(TestData.PASSWORD);
        await registerPage.fillConfirmPassword(TestData.PASSWORD);
        await registerPage.fillEmailInput(generateUniqueEmail());
    });
    test("[AQAPRACT-514] Register with max Last name length (255 characters)", async ({
        registerPage,
    }) => {
        const maxLength = "A".repeat(255);
        await registerPage.fillLastname(maxLength);
        await expect(registerPage.lastnameInput).toHaveValue(maxLength);
        await registerPage.submitButton.click();
        await expect(registerPage.getPage()).toHaveURL(
            "https://qa-course-01.andersenlab.com/login",
        );
    });
    test("[AQAPRACT-515] Register with min Last name length (1 character)", async ({
        registerPage,
    }) => {
        await registerPage.fillLastname("A");
        await expect(registerPage.lastnameInput).toHaveValue("A");
        await registerPage.submitButton.click();
        await expect(registerPage.getPage()).toHaveURL(
            "https://qa-course-01.andersenlab.com/login",
        );
    });
    test("[AQAPRACT-516] Register with max+1 Last name length (256 characters)", async ({
        registerPage,
    }) => {
        const aboveMaxLength = "A".repeat(256);
        await registerPage.fillLastname(aboveMaxLength);
        await expect(registerPage.lastnameInput).toHaveValue(aboveMaxLength);
        await registerPage.submitButton.click();
        await expect(registerPage.lastnameInput).toHaveClass(/border-rose-500/);
        await expect(
            registerPage.getPage().locator("text=The value length shouldn't exceed 255 symbols"),
        ).toBeVisible();
    });
    test("[AQAPRACT-517] Register with empty Last name field", async ({ registerPage }) => {
        await registerPage.fillLastname("");
        await expect(registerPage.lastnameInput).toHaveValue("");
        await expect(registerPage.submitButton).toBeDisabled();
    });
    test("[AQAPRACT-518] Register with spaces in Last name field", async ({ registerPage }) => {
        await registerPage.fillLastname("   ");
        await expect(registerPage.lastnameInput).toHaveValue("   ");
        await registerPage.submitButton.click();
        await expect(registerPage.getPage().locator("text=The field is required.")).toBeVisible();
        await expect(registerPage.lastnameInput).toHaveClass(/border-rose-500/);
    });
});
