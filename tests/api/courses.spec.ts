import { test } from '../../src/fixtures/api/baseApi_fixture';
import { expect } from '@playwright/test';
import { TestDataSignin } from '../../src/testData/testData';

test.describe('Courses API Tests', () => {
    test.beforeEach(async ({ coursesApi }) => {
        await coursesApi.ensureUserSignedIn(TestDataSignin.EMAIL, TestDataSignin.PASSWORD);
    });

    test('[AQAPRACT-601] Filter courses by language and type', async ({ coursesApi }) => {
        const response = await coursesApi.filterCourses({
            language: 'English',
            type: 'Programming',
        });
        await coursesApi.verifyResponseTruthy(response);
        expect(response.courses.length).toBeGreaterThan(0);
        for (const course of response.courses) {
            expect(course.language).toBe('English');
            expect(course.type).toBe('Programming');
        }
    });

    test('[AQAPRACT-602] Get list of secured courses', async ({ coursesApi }) => {
        const response = await coursesApi.getCoursesData();
        await coursesApi.verifyResponseTruthy(response, 'courses');
        expect(response.courses.length).toBeGreaterThan(0);
    });

    test('[AQAPRACT-603] Get list of course types', async ({ coursesApi }) => {
        const response = await coursesApi.getCourseTypes();
        await coursesApi.verifyResponseTruthy(response, 'types');
        expect(response.types.length).toBeGreaterThan(0);
    });

    test('[AQAPRACT-604] Get list of available languages', async ({ coursesApi }) => {
        const response = await coursesApi.getAvailableLanguageList();
        await coursesApi.verifyResponseTruthy(response, 'languages');
        expect(response.languages.length).toBeGreaterThan(0);
    });

    test('[AQAPRACT-605] Get list of available countries', async ({ coursesApi }) => {
        const response = await coursesApi.getCountriesFromCourse();
        await coursesApi.verifyResponseTruthy(response, 'countries');
        expect(response.countries.length).toBeGreaterThan(0);
    });
});
