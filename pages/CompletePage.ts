import { Locator, Page, expect } from '@playwright/test';
import messages from "../testData/messages.json"

export class CompletePage {

  private thankYouHeader : Locator;
  private orderComplete : Locator;
  constructor(private page: Page) {
    this.thankYouHeader = page.locator('.complete-header');
    this.orderComplete = page.locator('.complete-text');
  }


  async assertSuccess() {
    await expect(this.page.getByTestId("title")).toHaveText(messages.checkoutMessage.checkoutCompleteTitle);
    await expect(this.thankYouHeader).toHaveText(messages.checkoutMessage.checkOutThankYouHeader);
    await expect(this.orderComplete).toHaveText(messages.checkoutMessage.checkoutCompleteInnerMessage);
  }
}
