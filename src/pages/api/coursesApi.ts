import { BaseApi } from './baseApi';

export class CoursesApi extends BaseApi {
    async filterCourses(filterBody: object) {
        return this.post('/api/secured/course/filter', filterBody);
    }
    async getCourses() {
        return this.get('/api/secured/course');
    }
    async getTypes() {
        return this.get('/api/secured/course/types');
    }
    async getLanguages() {
        return this.get('/api/secured/course/languages');
    }
    async getCountries() {
        return this.get('/api/secured/course/countries');
    }
}
