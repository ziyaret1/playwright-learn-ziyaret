import { APIRequestContext } from '@playwright/test';

export class CoursesApi {
    private request: APIRequestContext;
    private token: string | null = null;
    private baseUrl: string;

    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl;
    }
    //! header helper
    private getAuthHeaders() {
        if (!this.token) {
            throw new Error('Token is not set. Please sign in first.');
        }
        return {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
        };
    }
    //! Methods
    async signIn(email: string, password: string) {
        const response = await this.request.post(`${this.baseUrl}/api/public/login`, {
            data: { email, password },
        });
        if (!response.ok()) {
            throw new Error(`Login failed: ${response.status()}`);
        }
        const json = await response.json();
        this.token = json['jwt-token'];
        if (!this.token) {
            throw new Error('JWT token not found');
        }
    }
    async filterCourses(filterBody: object) {
        return this.request.post(`${this.baseUrl}/api/secured/course/filter`, {
            headers: this.getAuthHeaders(),
            data: filterBody,
        });
    }

    async getCourses() {
        return this.request.get(`${this.baseUrl}/api/secured/course`, {
            headers: this.getAuthHeaders(),
        });
    }

    async getTypes() {
        return this.request.get(`${this.baseUrl}/api/secured/course/types`, {
            headers: this.getAuthHeaders(),
        });
    }

    async getLanguages() {
        return this.request.get(`${this.baseUrl}/api/secured/course/languages`, {
            headers: this.getAuthHeaders(),
        });
    }

    async getCountries() {
        return this.request.get(`${this.baseUrl}/api/secured/course/countries`, {
            headers: this.getAuthHeaders(),
        });
    }
}
