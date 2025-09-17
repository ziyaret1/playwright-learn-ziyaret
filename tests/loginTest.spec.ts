import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';


test('Successful login with valid cred', async({page}) =>{

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('zi@gmail.com', 'zi1234');
    await expect(page).toHaveURL('/dashboard')
});