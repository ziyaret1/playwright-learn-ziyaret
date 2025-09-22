import { expect, test } from "@playwright/test";
import { SignInPage } from "../../src/pages/signInPage";
import { TestDataSignin } from "../../src/testData/testData";

let signIn: SignInPage;

//! Email input
test.describe("Sign In Suite: Email Address", () => {
  test.beforeEach(async ({ page }) => {
    signIn = new SignInPage(page);
    await signIn.goto();
  });

  test('[AQAPRACT-539] Validation of empty "Email" field on "Sign in" page', async ({
    page,
  }) => {
    await signIn.fillEmailAddress("");
    await signIn.fillPasswordInput(TestDataSignin.PASSWORD);
    await expect(signIn.emailAddressInput).toHaveValue("");
    await signIn.errorRequiredEmail();
  });
});

//! Password input
test.describe("Sign In Suite: Password", () => {
  test.beforeEach(async ({ page }) => {
    signIn = new SignInPage(page);
    await signIn.goto();
  });

  test("[AQAPRACT-540] Validation of empty Password field on sign in page", async ({
    page,
  }) => {
    await signIn.fillEmailAddress(TestDataSignin.EMAIL);
    await expect(signIn.emailAddressInput).toHaveValue(TestDataSignin.EMAIL);
    await signIn.fillPasswordInput("");
    await signIn.emailAddressInput.click();
    await expect(signIn.passwordInput).toHaveValue("");
    await signIn.errorRequiredPassword();
  });

  test('[AQAPRACT-541] Validation of "Password" on min length (8 characters)', async () => {
    await signIn.fillPasswordInput(TestDataSignin.PASSWORD_MIN);
    await expect(signIn.passwordErrorMinMsg).not.toBeVisible();
    // check masked
    await expect(signIn.passwordInput).toHaveAttribute("type", "password");
  });

  test('[AQAPRACT-542] Validation of "Password" on max length (20 characters)', async () => {
    await signIn.fillEmailAddress(TestDataSignin.EMAIL);
    await signIn.fillPasswordInput(TestDataSignin.PASSWORD_MAX);
    await expect(signIn.passwordErrorMinMsg).not.toBeVisible();
    await expect(signIn.submitButtonSignIn).toBeVisible();
  });

  test('[AQAPRACT-543] Validation of "Password" on 7 characters', async () => {
    await signIn.fillEmailAddress(TestDataSignin.EMAIL);
    await signIn.fillPasswordInput(TestDataSignin.PASSWORD_UNDER_MIN);
    await signIn.emailAddressInput.click();
    await expect(signIn.passwordInput).toHaveClass(/border-rose-500/);
    await expect(signIn.passwordErrorMinMsg).toBeVisible();
  });

  test('[AQAPRACT-544] Validation of "Password" on 21 chacacters', async () => {
    await signIn.fillEmailAddress(TestDataSignin.EMAIL);
    await signIn.fillPasswordInput(TestDataSignin.PASSWORD_OVER_MAX);
    await signIn.emailAddressInput.click();
    await expect(signIn.passwordInput).toHaveClass(/border-rose-500/);
    await expect(signIn.passwordErrorMaxMsg).toBeVisible();
  });
});
