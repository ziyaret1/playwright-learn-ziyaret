import { test as base } from '@playwright/test';
import { CoursesApi } from '../../pages/api/coursesApi';

type ApiServiceFixture = {
    coursesApi: CoursesApi;
};

export const test = base.extend<ApiServiceFixture>({
    coursesApi: async ({ request }, use) => {
        const baseApi = process.env.BASE_API;
        const courseApi = new CoursesApi(request, baseApi!);
        await use(courseApi);
    },
});
