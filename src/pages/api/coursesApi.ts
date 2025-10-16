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

import { BaseApi } from './baseApi';
import {
    CourseCountriesDTO,
    CourseDTO,
    CourseLanguagesResponseDTO,
    CoursesResponseDTO,
    CourseTypesResponseDTO,
    FilterCoursesRequestDTO,
    FilterCoursesResponseDTO,
    RegisterDataDTO,
    SignInRegisterResponseDTO,
    SignInRequestDTO,
} from '../../dto/authDTO';
import { AuthEndpoints, CourseEndpoints } from '../../testData/testData';
import { expect } from '@playwright/test';

export class CoursesApi extends BaseApi {
    private token: string | null = null;

    async registerUserApi(bodyData: RegisterDataDTO): Promise<void> {
        await this.post<RegisterDataDTO, void>(AuthEndpoints.REGISTER_ENDP, bodyData, {
            'Content-Type': 'application/json',
        });
    }
    async signInUserApi(bodyData: SignInRequestDTO): Promise<void> {
        //! check
        const response = await this.post<SignInRequestDTO, SignInRegisterResponseDTO>(
            AuthEndpoints.SIGNIN_ENDP,
            bodyData
        );
        this.token = response['jwt-token'];
    }

    getAuthHeader(): Record<string, string> {
        if (!this.token) {
            throw new Error('No tokenn');
        }
        return {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
        };
    }
    async ensureUserSignedIn(email: string, password: string): Promise<void> {
        if (!this.token) {
            await this.signInUserApi({ email, password });
        }
    }

    //! Common Method
    // async verifyResponseTruthy(response: Response): Promise<void> {
    //     expect(response.ok).toBeTruthy();
    //     expect(response.status).toBe(200);
    // }

    async verifyResponseTruthy(response: any, expectedProperty?: string): Promise<void> {
        if (expectedProperty) {
            expect(response).toHaveProperty(expectedProperty);
            const value = response[expectedProperty];
            expect(value).toBeTruthy();
        }
    }

    //! Courses Methods
    async filterCourses(bodyData: FilterCoursesRequestDTO): Promise<FilterCoursesResponseDTO> {
        return await this.post<FilterCoursesRequestDTO, FilterCoursesResponseDTO>(
            CourseEndpoints.FILTER_COURSE_ENDP,
            bodyData,
            this.getAuthHeader()
        );
    }

    async getCoursesData(): Promise<CoursesResponseDTO> {
        return this.get<CoursesResponseDTO>(CourseEndpoints.COURSES_ENDP, this.getAuthHeader());
    }

    async getCourseTypes(): Promise<CourseTypesResponseDTO> {
        return this.get<CourseTypesResponseDTO>(CourseEndpoints.TYPES_ENDP, this.getAuthHeader());
    }

    async getAvailableLanguageList(): Promise<CourseLanguagesResponseDTO> {
        return this.get<CourseLanguagesResponseDTO>(
            CourseEndpoints.LANGUAGES_ENDP,
            this.getAuthHeader()
        );
    }

    async getCountriesFromCourse(): Promise<CourseCountriesDTO> {
        return this.get<CourseCountriesDTO>(CourseEndpoints.COUNTRIES_ENDP, this.getAuthHeader());
    }

    //! User Profiles Methods
}
