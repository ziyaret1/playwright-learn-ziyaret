import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/api/baseApi_fixture';
import { generateUniqueEmail, TestData, TestDataSignin } from '../../src/testData/testData';

test.describe('Auth Suite', () => {
    test('[AQAPRACT-612] User registration with valid data', async ({ coursesApi }) => {
        const bodyData = {
            firstName: TestData.FIRSTNAME,
            lastName: TestData.LASTNAME,
            email: generateUniqueEmail(),
            dateOfBirth: TestData.DATE_OF_BIRTH,
            password: TestData.PASSWORD,
        };

        const response = await coursesApi.registerUserApi(bodyData);
        await coursesApi.verifyResponseTruthy(response);
        expect(response).toHaveProperty('jwt-token');
    });

    test('[AQAPRACT-611] Log in with valid data', async ({ coursesApi }) => {
        const bodyData = {
            email: TestDataSignin.EMAIL,
            password: TestDataSignin.PASSWORD,
        };
        const response = await coursesApi.signInUserApi(bodyData);
        await coursesApi.verifyResponseTruthy(response);
        expect(response).toHaveProperty('jwt-token');
    });
});
