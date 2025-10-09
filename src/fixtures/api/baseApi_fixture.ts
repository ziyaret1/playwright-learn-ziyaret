import { test as base } from '@playwright/test';
import { CoursesApi } from '../../pages/api/coursesApi';

type MyBaseFixtures = {
    coursesApi: CoursesApi;
};

export const test = base.extend<MyBaseFixtures>({
    coursesApi: async ({ request }, use) => {
        const baseUrl = 'https://qa-course-01-api.andersenlab.com';
        const coursesApi = new CoursesApi(request, baseUrl);
        await use(coursesApi);
    },
});