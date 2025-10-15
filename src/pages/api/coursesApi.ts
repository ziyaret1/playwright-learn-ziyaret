// import { APIRequestContext, APIResponse } from '@playwright/test';
// import { CourseEndpoints } from '../../testData/testData';
// import { AuthApi } from './authApi';
// import { BaseApi } from './baseApi';

// // remove auth api, collect all our methods
// export class CoursesApi extends BaseApi {
//     constructor(
//         request: APIRequestContext,
//         baseUrl: string,
//         // private authApi: AuthApi
//     ) {
//         super(request, baseUrl); // Call BaseApi constructor
//     }
//     async filterCourses(filterBody: object): Promise<APIResponse> {
//         return this.post(
//             CourseEndpoints.FILTER_COURSE_ENDP,
//             filterBody,
//             this.authApi.getAuthHeaders()
//         );
//     }
//     async getCourses(): Promise<APIResponse> {
//         return this.get(CourseEndpoints.COURSES_ENDP, this.authApi.getAuthHeaders());
//     }
//     async getTypes(): Promise<APIResponse> {
//         return this.get(CourseEndpoints.TYPES_ENDP, this.authApi.getAuthHeaders());
//     }
//     async getLanguages(): Promise<APIResponse> {
//         return this.get(CourseEndpoints.LANGUAGES_ENDP, this.authApi.getAuthHeaders());
//     }
//     async getCountries(): Promise<APIResponse> {
//         return this.get(CourseEndpoints.COUNTRIES_ENDP, this.authApi.getAuthHeaders());
//     }
// }

// //! add all methods here

import { APIRequestContext } from '@playwright/test';
import { test } from '../../../src/fixtures/api/baseApi_fixture';
import { BaseApi } from './baseApi';
import { RegisterDataDTO, SignInRegisterResponseDTO, SignInRequestDTO } from '../../dto/authDTO';
import { AuthEndpoints } from '../../testData/testData';

export class CourseApi extends BaseApi {
    private token: string | null = null;

    async registerUserApi(bodyData: RegisterDataDTO): Promise<void> {
        await this.post<RegisterDataDTO>(AuthEndpoints.REGISTER_ENDP, bodyData, {
            'Content-Type': 'application/json',
        });
    };
    async signInUserApi(bodyData: SignInRequestDTO): Promise<SignInRegisterResponseDTO>{
        const response = await this.post<SignInRegisterResponseDTO>(AuthEndpoints.SIGNIN_ENDP, bodyData)
        this.token = response['jwt-token']
    }
}
