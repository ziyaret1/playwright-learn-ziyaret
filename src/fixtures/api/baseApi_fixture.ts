import { test as base } from '@playwright/test';
import { CoursesApi } from '../../pages/api/coursesApi';
import { UserProfilesApi } from '../../pages/api/userProfilesApi';
import { AuthApi } from '../../pages/api/authApi';

type ApiServices  = {
    coursesApi: CoursesApi;
    userProfilesApi: UserProfilesApi;
    authApi: AuthApi;
};

export const test = base.extend<ApiServices>({
    coursesApi: async ({ request }, use) => {
        const baseUrl = process.env.BASE_API;
        const coursesApi = new CoursesApi(request, baseUrl!);
        await use(coursesApi);
    },
    userProfilesApi: async({request}, use) =>{
        const baseUrl = process.env.BASE_API;
        const userProfilesApi = new UserProfilesApi(request, baseUrl!);
        await use(userProfilesApi);
    },
    authApi: async ({ request }, use) => {
        const baseUrl = process.env.BASE_API!;
        const authApi = new AuthApi(request, baseUrl);
        await use(authApi);
    }
});
