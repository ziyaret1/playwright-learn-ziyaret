import { expect } from "@playwright/test";
import { test } from "../../src/fixtures/fixture_register";
import { generateUniqueEmail, InvalidEmail, TestData } from "../../src/testData/testData";
test.describe("Email Suite", () => {
    test.beforeEach(async ({ registerPage }) => {
        await registerPage.goto();
        await registerPage.fillEmailInput("");
        await registerPage.fillFirstname(TestData.FIRSTNAME);
        await registerPage.fillLastname(TestData.LASTNAME);
        await registerPage.fillDateOfBirth(TestData.DATE_OF_BIRTH);
        await registerPage.fillPassword(TestData.PASSWORD);
        await registerPage.fillConfirmPassword(TestData.PASSWORD);
    });
    test('[AQAPRACT-523] Register with empty "Email" field', async ({ registerPage }) => {
        await registerPage.fillEmailInput("");
        await expect(registerPage.submitButton).toBeDisabled();
    });
    test("[AQAPRACT-524] Register with invalid format of email address", async ({
        registerPage,
    }) => {
        for (const emailValueInvalid of Object.values(InvalidEmail)) {
            await registerPage.fillEmailInput(emailValueInvalid);
            await registerPage.invalidEmailError();
        }
    });
    test("[AQAPRAC-525] Register with already existed email", async ({ registerPage }) => {
        const testEmailAddress: string = "testexisting1@example.com";
        await registerPage.fillEmailInput(testEmailAddress);
        await registerPage.submitButton.click();
        await expect(registerPage.getPage()).toHaveURL(
            "https://qa-course-01.andersenlab.com/login",
        );
        // refresh and again submit with same email
        const registrationLink = registerPage.getPage().locator('span:has-text("Registration")');
        await registrationLink.click();
        await registerPage.fillEmailInput(generateUniqueEmail());
        await registerPage.fillEmailInput(testEmailAddress);
        await registerPage.submitButton.click();
        await registerPage.dublicateEmailError();
    });
});
