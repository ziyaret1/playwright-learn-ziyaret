// import { test as base } from '@playwright/test';
// import {TestDataSignin} from '../../../src/testData/testData'
// type MyBaseFixtures = {
//     baseUrl: string;
//     token: string;
// };

// export const test = base.extend<MyBaseFixtures>({
//     baseURL: async ({}, use) => {
//         await use('https://qa-course-01-api.andersenlab.com');
//     },
//     token: async({request, baseUrl}, use) => {
//         const response = await request.post(`${baseUrl}/api/public/auth/login`, {
//             data: {
//                 email: 'test2@test.com',
//                 password: '12345678',
//             }
//         });
//         const body = await response.json();
//         await use(body)
//     }
// });

import { test as base } from '@playwright/test';
import { TestDataSignin } from '../../../src/testData/testData';
import { CoursesApi } from '../../pages/api/coursesApi';

type MyBaseFixtures = {
    coursesApi: CoursesApi;
};

export const test = base.extend<MyBaseFixtures>({
    coursesApi: async ({ request }, use) => {
        const baseUrl = 'https://qa-course-01-api.andersenlab.com';
        // login and get token
        const getNewToken = await request.post(`${baseUrl}/api/auth/signin`, {
            data: {
                email: 'zitest@gmail.com',
                password: '12345678',
            },
        });
        // take token from json
        const newToken = await getNewToken.json();
        console.log('new token',newToken);
        
        const token = getNewToken.token;
        const api = new CoursesApi(request, token, baseUrl);
        await use(api);
    },
});
