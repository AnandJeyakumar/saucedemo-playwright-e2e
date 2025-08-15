import { Page, Locator, expect } from '@playwright/test';
import { BUTTON_TEXT } from '../constants/buttonText';
export type Item = { name: string; price: number };

export class InventoryPage {
  private items: Locator;
  private cartLink: Locator;
  private inventoryItemName : string;
  private inventoryItemPrice : string;
  private itemCountInCart : string;

  constructor(private page: Page) {
    this.items = page.locator('.inventory_item');
    this.cartLink = page.locator('a.shopping_cart_link');
    this.inventoryItemName = ".inventory_item_name",
    this.inventoryItemPrice = ".inventory_item_price",
    this.itemCountInCart = ".shopping_cart_badge"

  }

  async inventoryItemCount() {
     return await this.items.count(); 
    }

  private async readRow(i: number): Promise<Item> {
    const row = this.items.nth(i);
    const name = (await row.locator(this.inventoryItemName).textContent())!.trim();
    const priceText = (await row.locator(this.inventoryItemPrice).textContent())!.trim();
    const price = parseFloat(priceText.replace('$', ''));
    return { name, price };
  }

  async addRandomItems(n: number): Promise<Item[]> {
    console.log("Inside addRandomItems")
    const total = await this.inventoryItemCount();
    if (total < n) throw new Error(`Need ${n} items, found ${total}`);
    const indices = new Set<number>();
    while (indices.size < n) indices.add(Math.floor(Math.random() * total));
    const picked: Item[] = [];
    for (const i of indices) {
      const details = await this.readRow(i);  
      const row = this.items.nth(i);
      await row.getByRole('button', { name: BUTTON_TEXT.addToCart }).click();
      await expect(row.getByRole('button', {name: BUTTON_TEXT.remove})).toBeVisible();
      picked.push(details);
    }
    await expect(this.cartLink.locator(this.itemCountInCart) , "Validation of no.of Items in Cart").toHaveText(String(n));
    return picked;
  }


  async addRandomItemsWithSummary(n: number) {
  console.log("Inside addRandomItemsWithSummary ");
  const items = await this.addRandomItems(n); 
  const pickedNames  = items.map(i => i.name);
  const prices = items.map(i => i.price);
  const total  = Number(prices.reduce((t, p) => t + p, 0).toFixed(2));
  console.log("Inside addRandomItemsWithSummary ", pickedNames , prices , total);
  return {pickedNames, prices, total };
}



  async goToCart()
  {
    await this.cartLink.click();
  }

}
