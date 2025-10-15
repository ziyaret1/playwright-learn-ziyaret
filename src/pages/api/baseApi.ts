import { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseApi {
    protected request: APIRequestContext;
    protected baseUrl: string;

    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl;
    }

    protected async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
        const response = await this.request.get(`${this.baseUrl}${endpoint}`, { headers });
        return (await response.json()) as T;
    }

    protected async post<T>(
        endpoint: string,
        body?: object,
        headers?: Record<string, string>
    ): Promise<T> {
        const response = await this.request.post(`${this.baseUrl}${endpoint}`, { headers });
        return response.json() as T;
    }

    protected async put<T>(
        endpoint: string,
        body?: object,
        headers?: Record<string, string>
    ): Promise<T> {
        const response = await this.request.put(`${this.baseUrl}${endpoint}`, { headers });
        return response.json() as T;
    }

    protected async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
        const response = await this.request.delete(`${this.baseUrl}${endpoint}`, { headers });
        return response.json() as T;
    }
}

// create only one class for your api (all together: courses, auth, userprofile)
//! use generics for baseapi, use interfaces for courseApi methods

