import { test as base } from '@playwright/test';
import { CoursesApi } from '../../pages/api/coursesApi';

type ApiServiceFixture = {
    courseApi: CoursesApi; // get new instance from courseapi
};

export const test = base.extend<ApiServiceFixture>({
    courseApi: async ({ request }, use) => {
        const baseApi = process.env.BASE_API;
        const courseApi = new CoursesApi(request, baseApi!);
        await use(courseApi);
    },
});
