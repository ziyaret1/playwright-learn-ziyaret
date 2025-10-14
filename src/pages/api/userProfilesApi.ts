import { BaseApi } from './baseApi';
import { UserProfilesEndpoints } from '../../testData/testData';
import { APIResponse } from '@playwright/test';
import { AuthApi } from './authApi';

export class UserProfilesApi extends BaseApi {
    private authApi: AuthApi;

    constructor(request: any, baseUrl: string, authApi: AuthApi) {
        super(request, baseUrl);
        this.authApi = authApi;
    }

    async setAccountPhoto(photoBytes: string): Promise<APIResponse> {
        return this.post(
            UserProfilesEndpoints.ACCOUNT_PHOTO_ENDP,
            { photoBytes },
            this.authApi.getAuthHeaders()
        );
    }

    async editUserInfo(body: object): Promise<APIResponse> {
        return this.request.patch(`${this.baseUrl}${UserProfilesEndpoints.EDIT_USERINFO_ENDP}`, {
            headers: this.authApi.getAuthHeaders(),
            data: body,
        });
    }

    async viewUserInfo(): Promise<APIResponse> {
        return this.get(UserProfilesEndpoints.VIEW_USERINFO_ENDP, this.authApi.getAuthHeaders());
    }

    async deleteUserAccount(): Promise<APIResponse> {
        return this.delete(
            UserProfilesEndpoints.DELETE_ACCOUNT_ENDP,
            this.authApi.getAuthHeaders()
        );
    }
}
