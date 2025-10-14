import { test as base } from '@playwright/test';
import { CoursesApi } from '../../pages/api/coursesApi';
import { UserProfilesApi } from '../../pages/api/userProfilesApi';
import { AuthApi } from '../../pages/api/authApi';

type ApiServices = {
    authApi: AuthApi;
    coursesApi: CoursesApi;
    userProfilesApi: UserProfilesApi;
};

export const test = base.extend<ApiServices>({
    authApi: async ({ request }, use) => {
        const baseUrl = process.env.BASE_API!;
        const authApi = new AuthApi(request, baseUrl);
        await use(authApi);
    },
    coursesApi: async ({ request, authApi }, use) => {
        const baseUrl = process.env.BASE_API;
        const coursesApi = new CoursesApi(request, baseUrl!, authApi);
        await use(coursesApi);
    },
    userProfilesApi: async ({ request, authApi }, use) => {
        const baseUrl = process.env.BASE_API;
        const userProfilesApi = new UserProfilesApi(request, baseUrl!, authApi);
        await use(userProfilesApi);
    },
});
