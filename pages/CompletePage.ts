import { Locator, Page, expect } from '@playwright/test';
import messages from "../testData/messages.json"

export class CompletePage {

  private thankYouHeader : Locator;
  private orderComplete : Locator;
  private title : string;
  constructor(private page: Page) {
    this.thankYouHeader = page.locator('.complete-header');
    this.orderComplete = page.locator('.complete-text');
    this.title = "title";

  }


  async assertSuccess() {
    await expect(this.page.getByTestId(this.title)).toHaveText(messages.checkoutMessage.checkoutCompleteTitle);
    await expect(this.thankYouHeader).toHaveText(messages.checkoutMessage.checkOutThankYouHeader);
    await expect(this.orderComplete).toHaveText(messages.checkoutMessage.checkoutCompleteInnerMessage);
  }
}
