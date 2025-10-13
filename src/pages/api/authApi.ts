import { BaseApi } from './baseApi';
import { AuthEndpoints, generateUniqueEmail, TestData } from '../../testData/testData';

export class AuthApi extends BaseApi {
    //! Register user
    async registerUser(userData: object) {
        return await this.request.post(`${this.baseUrl}${AuthEndpoints.REGISTER_ENDP}`, {
            data: userData,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    //! Register and login, returns token + credentials
    async registerAndLoginUser() {
        const email = generateUniqueEmail();
        const password = TestData.PASSWORD;

        const response = await this.registerUser({
            firstName: TestData.FIRSTNAME,
            lastName: TestData.LASTNAME,
            email,
            dateOfBirth: TestData.DATE_OF_BIRTH,
            password,
        });
        if (response.status() !== 200) {
            const text = await response.text();
            console.error('Register failed response:', text);
            throw new Error('Registration failed');
        }
        // Use BaseApi.signIn
        await this.signIn(email, password);
        return { token: this.token!, email, password };
    }
}
