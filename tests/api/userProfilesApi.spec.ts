import { test } from '../../src/fixtures/api/baseApi_fixture';
import { expect } from '@playwright/test';
import fs from 'fs';
import { generateUniqueEmail, TestData, TestFiles } from '../../src/testData/testData';
import { CoursesApi } from '../../src/pages/api/coursesApi';

test.describe('User Profiles API Tests', () => {
    let email: string;
    let password: string;
    let testAccountCourseApi: CoursesApi;

    test.beforeEach(async ({ authApi, userProfilesApi }) => {
        // call new courseapi, 
        const testAccountCourseApi = new CoursesApi();
        
        email = generateUniqueEmail();
        password = TestData.PASSWORD;
 
        await authApi.registerUser({
            firstName: TestData.FIRSTNAME,
            lastName: TestData.LASTNAME,
            email,
            dateOfBirth: TestData.DATE_OF_BIRTH,
            password,
        });
        // await authApi.signIn(email, password);
    });

    test('[AQAPRACT-606] Set account photo', async ({ userProfilesApi }) => {
        const profilePhoto = fs.readFileSync(TestFiles.PHOTO);
        const photoBase64 = profilePhoto.toString('base64');
        const response = await userProfilesApi.setAccountPhoto(photoBase64);
        expect(response.status()).toBe(204);
    });

    test('[AQAPRACT-607] Edit user personal info', async ({ userProfilesApi }) => {
        const body = {
            firstName: 'New name',
            lastName: TestData.LASTNAME,
            dateOfBirth: TestData.DATE_OF_BIRTH,
            email: email,
        };
        const response = await userProfilesApi.editUserInfo(body);
        expect(response.status()).toBe(200);
        const json = await response.json();
        expect(json).toMatchObject(body);
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

    test('[AQAPRACT-609] Delete user account', async () => {
        const response = await testAccountCourseApi.deleteUserAccount();
        expect(response.status()).toBe(204);
    });
});


// dto for methods, generics for baseapi
