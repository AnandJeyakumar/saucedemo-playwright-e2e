import { Page, expect } from '@playwright/test';
import endPoint from '../testData/urlEndpoints.json'

export class LoginPage {
  constructor(private page: Page) {}
  async goto() { 
    await this.page.goto('/');
   }
   
  async login(username: string, password: string) {
    await this.page.getByTestId('username').fill(username);
    await this.page.getByTestId('password').fill(password);
    await this.page.getByTestId('login-button').click();
    await expect(this.page).toHaveURL(`${process.env.BASE_URL}${endPoint.inventory}`);
  }
}
