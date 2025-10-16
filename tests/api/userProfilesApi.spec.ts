import { test } from '../../src/fixtures/api/baseApi_fixture';
import { expect } from '@playwright/test';
import fs from 'fs';
import {
    generateUniqueEmail,
    TestData,
    TestDataSignin,
    TestFiles,
} from '../../src/testData/testData';

test.describe('User Profiles API Tests', () => {
    let email: string;
    let password: string;
    // let testAccountCourseApi: new CoursesApi();

    test.beforeEach(async ({ coursesApi }) => {
        // coursesApi = new CoursesApi(request, BASE_URL);
        email = generateUniqueEmail();
        password = TestDataSignin.PASSWORD;

        await coursesApi.registerUserApi({
            firstName: TestData.FIRSTNAME,
            lastName: TestData.LASTNAME,
            email,
            dateOfBirth: TestData.DATE_OF_BIRTH,
            password,
        });
        // Sign in for get token
        await coursesApi.ensureUserSignedIn(email, password);
    });

    test('[AQAPRACT-606] Set account photo', async ({ coursesApi }) => {
        const profilePhoto = fs.readFileSync(TestFiles.PHOTO);
        const photoBase64 = profilePhoto.toString('base64');
        const response = await coursesApi.setUserPhoto(photoBase64);
        await coursesApi.verifyResponseTruthy(response);
    });

    test('[AQAPRACT-607] Edit user personal info', async ({ coursesApi }) => {
        const bodyData = {
            firstName: 'New name',
            lastName: TestData.LASTNAME,
            dateOfBirth: TestData.DATE_OF_BIRTH,
            email: email,
            password: TestData.PASSWORD,
        };
        const response = await coursesApi.editUserInfo(bodyData);
        await coursesApi.verifyResponseTruthy(response);
    });

    test('[AQAPRACT-608] Get user personal info', async ({ coursesApi }) => {
        const response = await coursesApi.getUserInfo();
        await coursesApi.verifyResponseTruthy(response);
        expect(response).toHaveProperty('firstName');
        expect(response).toHaveProperty('lastName');
        expect(response).toHaveProperty('email');
        expect(response).toHaveProperty('dateOfBirth');
    });

    test('[AQAPRACT-609] Delete user account', async ({ coursesApi }) => {
        await coursesApi.deleteUserAccount();
    });
});
