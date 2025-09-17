import { Page } from '@playwright/test';

export class LoginPage {
    page: Page;
    usernameInput: any;
    passwordInput: any;
    loginButton: any;

    constructor(page: Page){
        this.page = page;
        this.usernameInput = page.locator("#username");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.locator('button[type="submit"]');
    }

    async goto(){
        await this.page.goto("https://example.com/login")
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

