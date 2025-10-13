import { APIRequestContext, APIResponse } from '@playwright/test';

export abstract class BaseApi {
    protected request: APIRequestContext;
    protected baseUrl: string;

    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl;
    }

    protected async get(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
        return this.request.get(`${this.baseUrl}${endpoint}`, { headers });
    }

    protected async post(
        endpoint: string,
        body?: object,
        headers?: Record<string, string>
    ): Promise<APIResponse> {
        return this.request.post(`${this.baseUrl}${endpoint}`, { data: body, headers });
    }

    protected async put(
        endpoint: string,
        body?: object,
        headers?: Record<string, string>
    ): Promise<APIResponse> {
        return this.request.put(`${this.baseUrl}${endpoint}`, { data: body, headers });
    }

    protected async delete(
        endpoint: string,
        headers?: Record<string, string>
    ): Promise<APIResponse> {
        return this.request.delete(`${this.baseUrl}${endpoint}`, { headers });
    }
}
