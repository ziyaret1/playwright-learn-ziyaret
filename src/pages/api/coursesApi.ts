import { APIRequestContext } from '@playwright/test';
import { CourseEndpoints } from '../../testData/testData';
import { AuthApi } from './authApi';
import { BaseApi } from './baseApi';

export class CoursesApi extends BaseApi {
    constructor(
        request: APIRequestContext,
        baseUrl: string,
        private authApi: AuthApi
    ) {
        super(request, baseUrl); // Call BaseApi constructor
    }
    async filterCourses(filterBody: object) {
        return this.post(
            CourseEndpoints.FILTER_COURSE_ENDP,
            filterBody,
            this.authApi.getAuthHeaders()
        );
    }
    async getCourses() {
        return this.get(CourseEndpoints.COURSES_ENDP, this.authApi.getAuthHeaders());
    }
    async getTypes() {
        return this.get(CourseEndpoints.TYPES_ENDP, this.authApi.getAuthHeaders());
    }
    async getLanguages() {
        return this.get(CourseEndpoints.LANGUAGES_ENDP, this.authApi.getAuthHeaders());
    }
    async getCountries() {
        return this.get(CourseEndpoints.COUNTRIES_ENDP, this.authApi.getAuthHeaders());
    }
}
