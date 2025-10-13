import { BaseApi } from './baseApi';
import { AuthEndpoints } from '../../testData/testData';
import { APIResponse } from '@playwright/test';

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    password: string;
}

export class AuthApi extends BaseApi {
    private token: string | null = null;

    async registerUser(userData: RegisterRequest): Promise<APIResponse> {
        return this.post(AuthEndpoints.REGISTER_ENDP, userData, {
            'Content-Type': 'application/json',
        });
    }

    async signIn(email: string, password: string): Promise<string> {
        const response = await this.post(AuthEndpoints.SIGNIN_ENDP, { email, password });
        const json = await response.json();
        this.token = json['jwt-token'];
        return this.token!;
    }

    getAuthHeaders(): Record<string, string> {
        if (!this.token) throw new Error('Token is not set. Please sign in first.');
        return {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
        };
    }
}
