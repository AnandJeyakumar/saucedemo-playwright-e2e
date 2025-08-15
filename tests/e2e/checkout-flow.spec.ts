import { test } from '../../fixtures/fixtures';
import * as allure from "allure-js-commons";


test.describe('Sauce Lab -  Checkout', () => {

  test('Select 3 random items and complete checkout', async ({login,inventory,cart,info,overview,complete,checkOutAssertions }) => {

    await allure.epic("E2E Login to Checkout Flow")
    await allure.severity("critical");

    await test.step('Login', async () => {
      await login.goto();
      if (!process.env.STD_USER || !process.env.STD_PASS) {
        throw new Error('Missing STD_USER/STD_PASS env vars');
      }
      await login.login(process.env.STD_USER , process.env.STD_PASS);
    });

    const { pickedNames, prices, total } = await test.step('Add 3 random items', async () => {
      return await inventory.addRandomItemsWithSummary(3);
    });

    await test.step('Open Cart', async () => {
      await inventory.goToCart();
    });

    await test.step('Assert items in Cart', async () => {
      await checkOutAssertions.assertProductItems(pickedNames, prices);
    });

    await test.step('Proceed to Checkout', async () => {
      await cart.checkout();
    });

    await test.step('Fill Checkout Info', async () => {
      await info.fillAndContinue('Lean', 'Candidate', '00000');
    });

    await test.step('Assert items on Overview', async () => {
      await checkOutAssertions.assertProductItems(pickedNames, prices);
    });

    await test.step('Validate totals & Finish', async () => {
      await overview.validatePriceDetails(total);
      await overview.finish();
    });

    await test.step('Assert Success', async () => {
      await complete.assertSuccess();
    });
    
  });
});

