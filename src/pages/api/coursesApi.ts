import { CourseEndpoints } from '../../testData/testData';
import { BaseApi } from './baseApi';

export class CoursesApi extends BaseApi {
    async filterCourses(filterBody: object) {
        return this.post(CourseEndpoints.FILTER_COURSE_ENDP, filterBody);
    }
    async getCourses() {
        return this.get(CourseEndpoints.COURSES_ENDP);
    }
    async getTypes() {
        return this.get(CourseEndpoints.TYPES_ENDP);
    }
    async getLanguages() {
        return this.get(CourseEndpoints.LANGUAGES_ENDP);
    }
    async getCountries() {
        return this.get(CourseEndpoints.COUNTRIES_ENDP);
    }
}
