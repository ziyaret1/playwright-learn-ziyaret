import { APIRequestContext } from '@playwright/test'; // like mini postman for send request, with this object we can use get post put

export class CoursesApi {
    constructor(
        private request: APIRequestContext,
        private token: string,
        private baseUrl: string
    ) {}

    //! Methods
    async filterCourses(filterBody: object) {
        return this.request.post(`${this.baseUrl}/api/secured/course/filter`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
            data: filterBody,
        });
    }

    async getCourses() {
        return this.request.get(`${this.baseUrl}/api/secured/course`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });
    }

    async getTypes() {
        return this.request.get(`${this.baseUrl}/api/secured/course/types`, {
            headers: { Authorization: `Bearer ${this.token}` },
        });
    }

    async getLanguages() {
        return this.request.get(`${this.baseUrl}/api/secured/course/languages`, {
            headers: { Authorization: `Bearer ${this.token}` },
        });
    }

    async getCountries() {
        return this.request.get(`${this.baseUrl}/api/secured/course/countries`, {
            headers: { Authorization: `Bearer ${this.token}` },
        });
    }
}
