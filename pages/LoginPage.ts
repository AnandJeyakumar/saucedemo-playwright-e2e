import { Page, expect } from '@playwright/test';
import endPoint from '../testData/urlEndpoints.json'

export class LoginPage {

  private username: string;
  private password : string;
  private loginButton : string;

  constructor(private page: Page) {
        this.username = "username";
        this.password = "password";
        this.loginButton = "login-button";
  }


  async goto() { 
    await this.page.goto('/');
   }
   
  async login(username: string, password: string) {
    await this.page.getByTestId(this.username).fill(username);
    await this.page.getByTestId(this.password).fill(password);
    await this.page.getByTestId(this.loginButton).click();
    await expect(this.page).toHaveURL(`${process.env.BASE_URL}${endPoint.inventory}`);
  }
}
