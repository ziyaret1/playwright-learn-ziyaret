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
        return (response.json()) as T;
    }

    protected async post<TReq, TRes>(
        endpoint: string,
        body?: TReq,
        headers?: Record<string, string>
    ): Promise<TRes> {
        const response = await this.request.post(`${this.baseUrl}${endpoint}`, {
            data: body,
            headers,
        });
        return (await response.json()) as TRes;
    }

    protected async put<TReq, TRes>(
        endpoint: string,
        body?: TReq,
        headers?: Record<string, string>
    ): Promise<TRes> {
        const response = await this.request.put(`${this.baseUrl}${endpoint}`, {
            data: body,
            headers,
        });
        return (response.json()) as TRes;
    }

    protected async patch<TReq, TRes>(
        endpoint: string,
        body?: TReq,
        headers?: Record<string, string>
    ): Promise<TRes> {
        const response = await this.request.patch(`${this.baseUrl}${endpoint}`, {
            data: body,
            headers,
        });
        return (await response.json()) as TRes;
    }

    protected async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
        const response = await this.request.delete(`${this.baseUrl}${endpoint}`, { headers });
        return response.json() as T;
    }
}

// create only one class for your api (all together: courses, auth, userprofile)
//! use generics for baseapi, use interfaces for courseApi methods
