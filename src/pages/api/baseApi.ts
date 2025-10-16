import { APIRequestContext } from '@playwright/test';

export class BaseApi {
    protected request: APIRequestContext;
    protected baseUrl: string;

    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl;
    }

    protected async get<TRes>(endpoint: string, headers?: Record<string, string>): Promise<TRes> {
        const response = await this.request.get(`${this.baseUrl}${endpoint}`, { headers });
        return response.json() as TRes;
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
        if (response.status() === 204) return {} as TRes;
        return response.json() as TRes;
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
        return response.json() as TRes;
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
        return response.json() as TRes;
    }

    protected async delete<TRes>(
        endpoint: string,
        headers?: Record<string, string>
    ): Promise<TRes> {
        const response = await this.request.delete(`${this.baseUrl}${endpoint}`, { headers });
        if (response.status() === 204) {
            return {} as TRes;
        }
        return response.json() as TRes;
    }
}
