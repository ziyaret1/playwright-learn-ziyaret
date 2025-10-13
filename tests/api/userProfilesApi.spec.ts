import { test } from '../../src/fixtures/api/baseApi_fixture';
import { expect } from '@playwright/test';
import fs from 'fs';
import {
    TestData,
    TestDataSignin,
    TestFiles,
} from '../../src/testData/testData';

test.describe('User Profiles API Tests', () => {
    let token: string;
    let email: string;
    test.beforeEach(async ({ userProfilesApi, authApi }) => {
        const result = await authApi.registerAndLoginUser();
        token = result.token;
        email = result.email; // take email
        userProfilesApi.setToken(token);
    });
    test('[AQAPRACT-606] Set account photo', async ({ userProfilesApi }) => {
        const profilePhoto = fs.readFileSync(TestFiles.PHOTO);
        const photoBase64 = profilePhoto.toString('base64');
        const response = await userProfilesApi.setAccountPhoto(photoBase64);
        expect(response.status(), 'Expected 204 No Content').toBe(204);
    });
    test('[AQAPRACT-607] Edit user personal info', async ({ userProfilesApi }) => {
        const body = {
            firstName: TestData.FIRSTNAME,
            lastName: TestData.LASTNAME,
            dateOfBirth: TestData.DATE_OF_BIRTH,
            email: TestDataSignin.EMAIL,
        };
        const response = await userProfilesApi.editUserInfo(body);
        expect(response.status()).toBe(200);

        const json = await response.json();
        expect(json).toMatchObject({
            firstName: TestData.FIRSTNAME,
            lastName: TestData.LASTNAME,
            email,
            dateOfBirth: TestData.DATE_OF_BIRTH,
        });
    });
    test('[AQAPRACT-608] Get user personal info', async ({ userProfilesApi }) => {
        const response = await userProfilesApi.viewUserInfo();
        expect(response.status()).toBe(200);

        const json = await response.json();
        expect(json).toHaveProperty('firstName');
        expect(json).toHaveProperty('lastName');
        expect(json).toHaveProperty('email');
        expect(json).toHaveProperty('dateOfBirth');
    });
    test('[AQAPRACT-609] Delete user account', async ({ userProfilesApi }) => {
        const response = await userProfilesApi.deleteUserAccount();
        expect(response.status()).toBe(204);
    });
});
