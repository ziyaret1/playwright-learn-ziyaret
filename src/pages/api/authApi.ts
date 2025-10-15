import { BaseApi } from './baseApi';
import { AuthEndpoints } from '../../testData/testData';
import { APIResponse } from '@playwright/test';


export class AuthApi extends BaseApi {
    private token: string | null = null;

    async registerUser(userData: {
        firstName: string;
        lastName: string;
        email: string;
        dateOfBirth: string;
        password: string;
    }): Promise<APIResponse> {
        return this.post(AuthEndpoints.REGISTER_ENDP, userData, {
            'Content-Type': 'application/json',
        });
    }

    async signIn(email: string, password: string): Promise<void> {
        const response = await this.post(AuthEndpoints.SIGNIN_ENDP, { email, password });
        const json = await response.json();
        this.token = json['jwt-token'];
    }

    getToken(): string | null {
        return this.token;
    }

    getAuthHeaders(): Record<string, string> {
        if (!this.token) {
            throw new Error('Token is not set. Please sign in first.');
        } else {
            return { Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json' };
        }
    }

    //! we need token from register / should put token as a constructor in courseApi, use gettoken. We need gettoken, getvalidtoken.
    //! Use in courses for check if we have token or not, if we dont signin

    async ensureSignedIn(email: string, password: string): Promise<void> {
        if (!this.token) await this.signIn(email, password);
    }
}
