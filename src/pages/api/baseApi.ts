import { APIRequestContext } from '@playwright/test';

export class BaseApi {
    protected request: APIRequestContext;
    protected baseUrl: string;
    protected token: string | null = null;

    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl;
    }

       async signIn(email: string, password: string): Promise<string> {
        const response = await this.request.post(`${this.baseUrl}/api/public/login`, {
            data: { email, password },
        });
        const json = await response.json();
        this.token = json['jwt-token'];
        return this.token!;
    }

    async getToken(email: string, password: string): Promise<string> {
        if (!this.token) {
            await this.signIn(email, password);
        }
        return this.token!;
    }
    protected getAuthHeaders() {
        if (!this.token) {
            throw new Error('Token is not set. Please sign in first.');
        }
        return {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
        };
    }
    //! HTTP methods
    protected async get(endpoint: string) {
        return this.request.get(`${this.baseUrl}${endpoint}`, {
            headers: this.getAuthHeaders(),
        });
    }
    protected async post(endpoint: string, body?: object) {
        return this.request.post(`${this.baseUrl}${endpoint}`, {
            headers: this.getAuthHeaders(),
            data: body,
        });
    }
    protected async put(endpoint: string, body?: object) {
        return this.request.put(`${this.baseUrl}${endpoint}`, {
            headers: this.getAuthHeaders(),
            data: body,
        });
    }
    protected async delete(endpoint: string) {
        return this.request.delete(`${this.baseUrl}${endpoint}`, {
            headers: this.getAuthHeaders(),
        });
    }
}
