import { BaseApi } from './baseApi';
import { generateUniqueEmail, TestData } from '../../testData/testData';

export class AuthApi extends BaseApi {
    async registerUser(userData: any) {
        return await this.request.post(`${this.baseUrl}/api/public/registration`, {
            data: userData,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    async signInUser(email: string, password: string) {
        return await this.request.post(`${this.baseUrl}/api/public/login`, {
            data: { email, password },
            headers: { 'Content-Type': 'application/json' },
        });
    }

    async registerAndLoginUser() {
        const email = generateUniqueEmail();
        const password = TestData.PASSWORD;

        const registerResponse = await this.registerUser({
            firstName: TestData.FIRSTNAME,
            lastName: TestData.LASTNAME,
            email,
            dateOfBirth: TestData.DATE_OF_BIRTH,
            password,
        });

        if (registerResponse.status() !== 200) {
            const text = await registerResponse.text();
            console.log('Register failed response:', text);
            throw new Error('Registration failed');
        }

        const loginResponse = await this.signInUser(email, password);
        const json = await loginResponse.json();
        return { token: json['jwt-token'], email, password };
    }
}
