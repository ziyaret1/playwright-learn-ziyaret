import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/fixture_signIn';
import { TestDataSignin } from '../../src/testData/testData';
//! Email input
test.describe('Sign In Suite: Email Address', () => {
    test.beforeEach(async ({ signInPage }) => {
        await signInPage.goto();
    });
    test('[AQAPRACT-539] Validation of empty "Email" field on "Sign in" page', async ({
        signInPage,
    }) => {
        await signInPage.fillEmailAddress('');
        await signInPage.fillPasswordInput(TestDataSignin.PASSWORD);
        await expect(signInPage.emailAddressInput).toHaveValue('');
        await signInPage.verifyErrorRequiredEmail();
    });
});
//! Password input
test.describe('Sign In Suite: Password', () => {
    test.beforeEach(async ({ signInPage }) => {
        await signInPage.goto();
    });
    test('[AQAPRACT-540] Validation of empty Password field on sign in page', async ({
        signInPage,
    }) => {
        await signInPage.fillEmailAddress(TestDataSignin.EMAIL);
        await expect(signInPage.emailAddressInput).toHaveValue(TestDataSignin.EMAIL);
        await signInPage.fillPasswordInput('');
        await signInPage.emailAddressInput.click();
        await expect(signInPage.passwordInput).toHaveValue('');
        await signInPage.verifyErrorRequiredPassword();
    });
    test('[AQAPRACT-541] Validation of "Password" on min length (8 characters)', async ({
        signInPage,
    }) => {
        await signInPage.fillPasswordInput(TestDataSignin.PASSWORD_MIN);
        await expect(signInPage.passwordErrorMinMsg).not.toBeVisible();
        // check masked
        await expect(signInPage.passwordInput).toHaveAttribute('type', 'password');
    });
    test('[AQAPRACT-542] Validation of "Password" on max length (20 characters)', async ({
        signInPage,
    }) => {
        await signInPage.fillEmailAddress(TestDataSignin.EMAIL);
        await signInPage.fillPasswordInput(TestDataSignin.PASSWORD_MAX);
        await expect(signInPage.passwordErrorMinMsg).not.toBeVisible();
        await expect(signInPage.submitButtonSignIn).toBeVisible();
    });
    test('[AQAPRACT-543] Validation of "Password" on 7 characters', async ({ signInPage }) => {
        await signInPage.fillEmailAddress(TestDataSignin.EMAIL);
        await signInPage.fillPasswordInput(TestDataSignin.PASSWORD_UNDER_MIN);
        await signInPage.emailAddressInput.click();
        await expect(signInPage.passwordInput).toHaveClass(/border-rose-500/);
        await expect(signInPage.passwordErrorMinMsg).toBeVisible();
    });
    test('[AQAPRACT-544] Validation of "Password" on 21 chacacters', async ({ signInPage }) => {
        await signInPage.fillEmailAddress(TestDataSignin.EMAIL);
        await signInPage.fillPasswordInput(TestDataSignin.PASSWORD_OVER_MAX);
        await signInPage.emailAddressInput.click();
        await expect(signInPage.passwordInput).toHaveClass(/border-rose-500/);
        await expect(signInPage.passwordErrorMaxMsg).toBeVisible();
    });
});
