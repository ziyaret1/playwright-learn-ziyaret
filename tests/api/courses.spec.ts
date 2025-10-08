import { test } from '../../src/fixtures/api/base_fixture';
import { expect } from '@playwright/test';

test.describe('Courses API Tests', () => {
    test('[AQAPRACT-601]', async ({ coursesApi }) => {
        // const filterBody = { language: 'English', type: 'Programming' };
        // const response = await coursesApi.filterCourses(filterBody);
        // expect(response.ok()).toBeTruthy();
        // expect(response.status()).toBe(200);
        // const body = await response.json();
        // expect(body).toHaveProperty('courses');
        // expect(Array.isArray(body.courses)).toBeTruthy();
        // expect(body.courses.length).toBeGreaterThan(0);
        // for (const course of body.courses) {
        //     expect(course.language).toBe('English');
        //     expect(course.type).toBe('Programming');
        // }

        // console.log('Sample course:', body.courses[0]);
        const filterBody = { language: 'English', type: 'Programming' };
        const response = await coursesApi.filterCourses(filterBody);

        // 🪵 Debug üçün əlavə et
        console.log('Status code:', response.status());
        console.log('Response text:', await response.text());

        expect(response.ok()).toBeTruthy(); // burda hələ qalır
        expect(response.status()).toBe(200);
    });
});
