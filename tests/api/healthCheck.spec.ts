import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/api/baseApi_fixture';
import { HealthCheckEndpoints, TestDataSignin } from '../../src/testData/testData';

test.describe('API / Health Check Suite', () => {
    test('[secured]', async ({ coursesApi }) => {
        await coursesApi.ensureUserSignedIn(TestDataSignin.EMAIL, TestDataSignin.PASSWORD);
        const response = await coursesApi.getHealtCheck(HealthCheckEndpoints.HEALTH_CHECK_SECURED, true);
        expect(response).toBe('OK');
    });
    test('[public]', async ({ coursesApi }) => {
        const response = await coursesApi.getHealtCheck(HealthCheckEndpoints.HEALTH_CHECK_PUBLIC, false);
        expect(response).toBe('OK');
    });
});
