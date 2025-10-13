import { UserProfilesEndpoints } from '../../testData/testData';
import { BaseApi } from './baseApi';

export class UserProfilesApi extends BaseApi {
    async setAccountPhoto(photoBytes: string) {
        return this.request.post(`${this.baseUrl}${UserProfilesEndpoints.ACCOUNT_PHOTO_ENDP}`, {
            headers: this.getAuthHeaders(),
            data: { photoBytes },
        });
    }
    async editUserInfo(body: object) {
        return this.request.patch(`${this.baseUrl}${UserProfilesEndpoints.EDIT_USERINFO_ENDP}`, {
            headers: this.getAuthHeaders(),
            data: body,
        });
    }
    async viewUserInfo() {
        return this.request.get(`${this.baseUrl}${UserProfilesEndpoints.VIEW_USERINFO_ENDP}`, {
            headers: this.getAuthHeaders(),
        });
    }
    async deleteUserAccount() {
        return this.request.delete(`${this.baseUrl}${UserProfilesEndpoints.DELETE_ACCOUNT_ENDP}`, {
            headers: this.getAuthHeaders(),
        });
    }
}
