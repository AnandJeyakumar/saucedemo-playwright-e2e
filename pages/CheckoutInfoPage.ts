import { Page, expect } from '@playwright/test';
import endPoint from '../testData/urlEndpoints.json'

export class CheckoutInfoPage {

  private firstNameInputField : string;
  private lastNameInputField : string;
  private postalCodeInputField : string;
  private continue : string;

  constructor(private page: Page) {

    this.firstNameInputField = "firstName";
    this.lastNameInputField = "lastName";
    this.postalCodeInputField = "postalCode";
    this.continue = "continue";

  }

  async fillAndContinue(first: string, last: string, zip: string) {
    await this.page.getByTestId(this.firstNameInputField).fill(first);
    await this.page.getByTestId(this.lastNameInputField).fill(last);
    await this.page.getByTestId(this.postalCodeInputField).fill(zip);
    await this.page.getByTestId(this.continue).click();
    await expect(this.page).toHaveURL(`${process.env.BASE_URL}${endPoint.checkOutStepTwo}`);
  }
}
