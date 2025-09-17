import { expect, test } from "@playwright/test";
import { registerPage } from "../../src/pages/registrationPage";

test.describe("Last name Suite", () => {
  test.beforeEach(async ({ page }) => {
    const register = new registerPage(page);
    register.goto();
    await register.fillRequiredFieldsExcept("lastname");
  });

  test("[AQAPRACT-514]: Register with max Last name length (255 characters)", async ({
    page,
  }) => {
    const register = new registerPage(page);
    const maxLength = "A".repeat(255);

    await register.fillLastname(maxLength);
    await expect(register.lastnameInput).toHaveValue(maxLength);
    await register.submit();
    await expect(page).toHaveURL("https://qa-course-01.andersenlab.com/login");
  });

  test("[AQAPRACT-515]: Register with min Last name length (1 character)", async ({
    page,
  }) => {
    const register = new registerPage(page);
    await register.fillLastname("A");
    await expect(register.lastnameInput).toHaveValue("A");

    await register.submit();
    await expect(page).toHaveURL("https://qa-course-01.andersenlab.com/login");
  });


  test("[AQAPRACT-516]: Register with max+1 Last name length (256 characters)", async ({
    page,
  }) => {
    const register = new registerPage(page);
    const aboveMaxLength = "A".repeat(256);

    await register.fillLastname(aboveMaxLength);
    await expect(register.lastnameInput).toHaveValue(aboveMaxLength);

    await register.submit();
    await expect(register.lastnameInput).toHaveClass(/border-rose-500/);
    await expect(
      page.locator("text=The value length shouldn't exceed 255 symbols")
    ).toBeVisible();
  });


  test('[AQAPRACT-517]: Register with empty Last name field', async({page}) => {
        const register = new registerPage(page);
        await register.fillLastname('');
        await expect(register.lastnameInput).toHaveValue(''); 

        await expect(register.submitButton).toBeDisabled();
    });

    test('[AQAPRACT-518]: Register with spaces in Last name field', async({page}) =>{
        const register = new registerPage(page);
        await register.fillLastname('   ');
        await expect(register.lastnameInput).toHaveValue('   ');
        await register.submit();
        await expect(page.locator('text=The field is required.')).toBeVisible();
        await expect(register.lastnameInput).toHaveClass(/border-rose-500/);

    })
});
