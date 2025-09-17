import { expect, test } from "@playwright/test";
import { registerPage } from "../../src/pages/registrationPage";

test.describe('First name Suite', () =>{
    
    test.beforeEach(async ({page}) =>{
        const register = new registerPage(page);
        await register.goto();
        await register.fillRequiredFieldsExceptFirstName();
    });

    test('[AQAPRACT-509]: Register with max First name length (255 characters)', async ({page}) =>{
        const register = new registerPage(page);
        const maxLength = 'A'.repeat(255);

        await register.fillFirstname(maxLength);
        await expect(register.firstnameInput).toHaveValue(maxLength);

        await register.submit();
        await expect(page).toHaveURL('https://qa-course-01.andersenlab.com/login')

    });

    test('[AQAPRACT-510]: Register with min First name length (1 character)', async({page}) =>{
        const register = new registerPage(page);
        await register.fillFirstname('A');
        await expect(register.firstnameInput).toHaveValue('A');

        await register.submit();
        await expect(page).toHaveURL('https://qa-course-01.andersenlab.com/login');
    });

    test('[AQAPRACT-511]: Register with max+1 First name length (256 characters)', async({page}) =>{
        const register = new registerPage(page);
        const aboveMaxLength = 'A'.repeat(256);

        await register.fillFirstname(aboveMaxLength);
        await expect(register.firstnameInput).toHaveValue(aboveMaxLength);

        await register.submit();
        await expect(register.firstnameInput).toHaveClass(/border-rose-500/);
        await expect(page.locator('text=The value length shouldn\'t exceed 255 symbols')).toBeVisible();
    });

    test('[AQAPRACT-512]: Register with empty First name field', async({page}) => {
        const register = new registerPage(page);
        await register.fillFirstname('');
        await expect(register.firstnameInput).toHaveValue(''); 

        await expect(register.submitButton).toBeDisabled();
    });

    test('[AQAPRACT-513]: Register with spaces in First name field', async({page}) =>{
        const register = new registerPage(page);
        await register.fillFirstname('   ');
        await expect(register.firstnameInput).toHaveValue('   ');
        await register.submit();
        await expect(page.locator('text=The field is required.')).toBeVisible();
        await expect(register.firstnameInput).toHaveClass(/border-rose-500/);

    })

})