import { expect } from "@playwright/test";
import { test } from "../../src/fixtures/fixture_register";
import { generateUniqueEmail, TestData } from "../../src/testData/testData";
test.describe("First name Suite", () => {
    test.beforeEach(async ({ registerPage }) => {
        await registerPage.goto();
        await registerPage.fillLastname(TestData.LASTNAME);
        await registerPage.fillDateOfBirth(TestData.DATE_OF_BIRTH);
        await registerPage.fillPassword(TestData.PASSWORD);
        await registerPage.fillConfirmPassword(TestData.PASSWORD);
        await registerPage.fillEmailInput(generateUniqueEmail());
    });
    test("AQAPRACT-509 Register with max First name length (255 characters)", async ({
        registerPage,
    }) => {
        const maxLength = "A".repeat(255);
        await registerPage.fillFirstname(maxLength);
        await expect(registerPage.firstnameInput).toHaveValue(maxLength);
        await registerPage.submitButton.click();
        await expect(registerPage.getPage()).toHaveURL(
            "https://qa-course-01.andersenlab.com/login",
        );
    });
    test("AQAPRACT-510 Register with min First name length (1 character)", async ({
        registerPage,
    }) => {
        await registerPage.fillFirstname("A");
        await expect(registerPage.firstnameInput).toHaveValue("A");
        await registerPage.submitButton.click();
        await expect(registerPage.getPage()).toHaveURL(
            "https://qa-course-01.andersenlab.com/login",
        );
    });
    test("AQAPRACT-511 Register with max+1 First name length (256 characters)", async ({
        registerPage,
    }) => {
        const aboveMaxLength = "A".repeat(256);
        await registerPage.fillFirstname(aboveMaxLength);
        await expect(registerPage.firstnameInput).toHaveValue(aboveMaxLength);
        await registerPage.submitButton.click();
        await expect(registerPage.firstnameInput).toHaveClass(/border-rose-500/);
        await expect(
            registerPage.getPage().locator("text=The value length shouldn't exceed 255 symbols"),
        ).toBeVisible();
    });
    test("AQAPRACT-512 Register with empty First name field", async ({ registerPage }) => {
        await expect(registerPage.firstnameInput).toHaveValue("");
        await expect(registerPage.submitButton).toBeDisabled();
    });
    test("AQAPRACT-513 Register with spaces in First name field", async ({ registerPage }) => {
        await registerPage.fillFirstname("   ");
        await expect(registerPage.firstnameInput).toHaveValue("   ");
        await registerPage.submitButton.click();
        await expect(registerPage.getPage().locator("text=The field is required.")).toBeVisible();
        await expect(registerPage.firstnameInput).toHaveClass(/border-rose-500/);
    });
});
