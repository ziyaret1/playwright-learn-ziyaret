import { BaseApi } from './baseApi';
import {
    CourseCountriesDTO,
    CourseLanguagesResponseDTO,
    CoursesResponseDTO,
    CourseTypesResponseDTO,
    EditUserProfilesRequestDTO,
    FilterCoursesRequestDTO,
    FilterCoursesResponseDTO,
    RegisterDataDTO,
    SignInRegisterResponseDTO,
    SignInRequestDTO,
    UserPhotoResponseDTO,
    UserProfilesResponseDTO,
} from '../../dto/authDTO';
import { AuthEndpoints, CourseEndpoints, UserProfilesEndpoints } from '../../testData/testData';
import { expect } from '@playwright/test';

export class CoursesApi extends BaseApi {
    private token: string | null = null;

    async registerUserApi(bodyData: RegisterDataDTO): Promise<void> {
        await this.post<RegisterDataDTO, void>(AuthEndpoints.REGISTER_ENDP, bodyData, {
            'Content-Type': 'application/json',
        });
    }
    async signInUserApi(bodyData: SignInRequestDTO): Promise<void> {
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

    //! Common Verify Method
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
    async setUserPhoto(photoBytes: string): Promise<void> {
        const dataBody: UserPhotoResponseDTO = { photoBytes };
        const response = await this.post<UserPhotoResponseDTO, void>(
            UserProfilesEndpoints.ACCOUNT_PHOTO_ENDP,
            dataBody,
            this.getAuthHeader()
        );
    }

    async editUserInfo(dataBody: EditUserProfilesRequestDTO): Promise<UserProfilesResponseDTO> {
        return this.patch<EditUserProfilesRequestDTO, UserProfilesResponseDTO>(
            UserProfilesEndpoints.EDIT_USERINFO_ENDP,
            dataBody,
            this.getAuthHeader()
        );
    }

    async getUserInfo(): Promise<UserProfilesResponseDTO> {
        return this.get<UserProfilesResponseDTO>(
            UserProfilesEndpoints.VIEW_USERINFO_ENDP,
            this.getAuthHeader()
        );
    }

    async deleteUserAccount(): Promise<void> {
        await this.delete<void>(UserProfilesEndpoints.DELETE_ACCOUNT_ENDP, this.getAuthHeader());
    }
}
