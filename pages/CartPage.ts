import { Page, Locator, expect } from '@playwright/test';
import endPoint from '../testData/urlEndpoints.json'

export class CartPage {

  private cartItems: Locator; 
  private productName : string;
  private productPrice : string;

  constructor(private page: Page) {
    this.cartItems = this.page.locator('.cart_item');
    this.productName = ".inventory_item_name",
    this.productPrice = ".inventory_item_price"

  }

async assertItems(names: string[], prices: number[]) {
  const rows = this.cartItems;
  await expect(rows).toHaveCount(names.length);
  for (let i = 0; i < names.length; i++) {
    const row = rows.nth(i);
    await expect(row.locator(this.productName)).toHaveText(names[i]);
    await expect(row.locator(this.productPrice)).toHaveText(`$${prices[i]}`);
  }
}

  async checkout() {
    await this.page.getByTestId('checkout').click();
    await expect(this.page).toHaveURL(`${process.env.BASE_URL}${endPoint.checkOutStepOne}`);
  }
}
