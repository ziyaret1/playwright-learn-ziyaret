import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/api/baseApi_fixture';
import { generateUniqueEmail, TestData, TestDataSignin } from '../../src/testData/testData';

test.describe('Auth Suite', () => {
    let email: string;
    test.beforeEach(() => {
        email = generateUniqueEmail();
    });

    test('[] Register', async ({ coursesApi }) => {
        const bodyData = {
            firstName: TestData.FIRSTNAME,
            lastName: TestData.LASTNAME,
            email,
            dateOfBirth: TestData.DATE_OF_BIRTH,
            password: TestData.PASSWORD,
        };

        const response = await coursesApi.registerUserApi(bodyData);
        await coursesApi.verifyResponseTruthy(response);
        expect(response).toHaveProperty('jwt-token');
    });

    test('[] Login', async ({ coursesApi }) => {
        const bodyData = {
            email: TestDataSignin.EMAIL,
            password: TestDataSignin.PASSWORD,
        };
        const response = await coursesApi.signInUserApi(bodyData);
        await coursesApi.verifyResponseTruthy(response);
        expect(response).toHaveProperty('jwt-token');
    });
});
