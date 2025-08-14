import { Page, expect } from '@playwright/test';
import endPoint from '../testData/urlEndpoints.json'

export class CheckoutInfoPage {
  constructor(private page: Page) {

    
  }








  async fillAndContinue(first: string, last: string, zip: string) {
    await this.page.getByTestId('firstName').fill(first);
    await this.page.getByTestId('lastName').fill(last);
    await this.page.getByTestId('postalCode').fill(zip);
    await this.page.getByTestId('continue').click();
    await expect(this.page).toHaveURL(`${process.env.BASE_URL}${endPoint.checkOutStepTwo}`);
  }
}
