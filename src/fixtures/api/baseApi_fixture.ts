import { test as base } from '@playwright/test';
import { CoursesApi } from '../../pages/api/coursesApi';

type MyApiFixtures = {
    coursesApi: CoursesApi;
};

export const test = base.extend<MyApiFixtures>({
    coursesApi: async ({ request }, use) => {
        const baseUrl = process.env.BASE_API;
        const coursesApi = new CoursesApi(request, baseUrl!);
        await use(coursesApi);
    },
});
