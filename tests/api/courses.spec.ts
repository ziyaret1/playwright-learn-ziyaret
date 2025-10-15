import { test } from '../../src/fixtures/api/baseApi_fixture';
import { expect } from '@playwright/test';
import { TestDataSignin } from '../../src/testData/testData';

test.describe('Courses API Tests', () => {
    test.beforeEach(async ({ coursesApi, authApi }) => {
        // if(!authApi.getToken()){
        //     await authApi.signIn(TestDataSignin.EMAIL, TestDataSignin.PASSWORD);
        // }
        //! not put logic in spec
        await authApi.ensureSignedIn(TestDataSignin.EMAIL, TestDataSignin.PASSWORD);
        console.log(authApi.getToken(), 'token Courses');
    });
    test('[AQAPRACT-601] Filter courses by language and type', async ({ coursesApi }) => {
        const response = await coursesApi.filterCourses({
            language: 'English',
            type: 'Programming',
        });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('courses');
        expect(Array.isArray(body.courses)).toBeTruthy();
        expect(body.courses.length).toBeGreaterThan(0);
        for (const course of body.courses) {
            expect(course.language).toBe('English');
            expect(course.type).toBe('Programming');
        }
    });
    test('[AQAPRACT-602] Get list of secured courses', async ({ coursesApi }) => {
        const response = await coursesApi.getCourses();
        // validateSuccessResponse
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        //
        const body = await response.json();
        expect(body).toHaveProperty('courses');
        // validateBodyHaveProperty
        expect(Array.isArray(body.courses)).toBeTruthy();
        expect(body.courses.length).toBeGreaterThan(0);
    });
    test('[AQAPRACT-603] Get list of course types', async ({ coursesApi }) => {
        const response = await coursesApi.getTypes();
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('types');
        expect(Array.isArray(body.types)).toBeTruthy();
        expect(body.types.length).toBeGreaterThan(0);
    });
    test('[AQAPRACT-604] Get list of available languages', async ({ coursesApi }) => {
        const response = await coursesApi.getLanguages();
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('languages');
        expect(Array.isArray(body.languages)).toBeTruthy();
        expect(body.languages.length).toBeGreaterThan(0);
    });
    test('[AQAPRACT-605] Get list of available countries', async ({ coursesApi }) => {
        const response = await coursesApi.getCountries();
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('countries');
        expect(Array.isArray(body.countries)).toBeTruthy();
        expect(body.countries.length).toBeGreaterThan(0);
    });
});
