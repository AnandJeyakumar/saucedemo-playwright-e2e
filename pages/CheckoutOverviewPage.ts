import { Page, expect,Locator } from '@playwright/test';
import { extractSummaryAmounts } from '../utils/helperActions';
import {calculateTax  , sum} from '../utils/math'
import endPoint from '../testData/urlEndpoints.json'


export class CheckoutOverviewPage {

  private itemTotal : Locator;
  private tax : Locator;
  private total : Locator;

  constructor(private page: Page) 
  {
      this.itemTotal = this.page.locator('.summary_subtotal_label');
      this.tax = this.page.locator(".summary_tax_label")
      this.total = this.page.locator('.summary_total_label')


  }

  async getSummary() {
    const sub = (await this.itemTotal.textContent())!;
    const tax = (await this.tax.textContent())!;
    const total = (await this.total.textContent())!;
    console.log("The sub , tax , total are ==> ", sub , tax , total )
    return extractSummaryAmounts(sub, tax, total);
  }


  async validatePriceDetails(sumPrice)
  {
    console.log("Inside validatePriceDetails")
    const {itemTotal, taxNum, totalNum} = await this.getSummary();
    console.log("The UI Summary values are " , itemTotal , taxNum , totalNum);
    const expectedTax = await calculateTax(sumPrice);
    console.log("The  Expected calculated values are " , sumPrice , expectedTax , sumPrice+expectedTax);
    await expect(itemTotal).toBe(sumPrice);
    await expect(taxNum).toBe(expectedTax);
    await expect(totalNum).toBe(sum([sumPrice,expectedTax] ))

  }

  async finish() {
    await this.page.getByTestId('finish').click();
    await expect(this.page).toHaveURL(`${process.env.BASE_URL}${endPoint.checkOutComplete}`);
  }
}
