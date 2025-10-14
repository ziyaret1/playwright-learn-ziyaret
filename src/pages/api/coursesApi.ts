import { CourseEndpoints } from '../../testData/testData';
import { BaseApi } from './baseApi';

export class CoursesApi extends BaseApi {
    private token: string | null = null;

    setToken(token: string) {
        this.token = token;
    }

    private getHeaders() {
        if (!this.token) throw new Error('Token is not set');
        return { Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json' };
    }

    async filterCourses(filterBody: object) {
        return this.post(CourseEndpoints.FILTER_COURSE_ENDP, filterBody, this.getHeaders());
    }

    async getCourses() {
        return this.get(CourseEndpoints.COURSES_ENDP, this.getHeaders());
    }

    async getTypes() {
        return this.get(CourseEndpoints.TYPES_ENDP, this.getHeaders());
    }

    async getLanguages() {
        return this.get(CourseEndpoints.LANGUAGES_ENDP, this.getHeaders());
    }

    async getCountries() {
        return this.get(CourseEndpoints.COUNTRIES_ENDP, this.getHeaders());
    }
}
