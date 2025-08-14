import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CompletePage } from '../pages/CompletePage';
import { CheckOutAssertions } from '../utils/checkoutAssertions';

type Pages = {
  login: LoginPage;
  inventory: InventoryPage;
  cart: CartPage;
  info: CheckoutInfoPage;
  overview: CheckoutOverviewPage;
  complete: CompletePage;
  checkOutAssertions: CheckOutAssertions;
};

export const test = base.extend<Pages>({
  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventory: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cart: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  info: async ({ page }, use) => {
    await use(new CheckoutInfoPage(page));
  },
  overview: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },
  complete: async ({ page }, use) => {
    await use(new CompletePage(page));
  },
  checkOutAssertions: async ({ page }, use) => {
    await use(new CheckOutAssertions(page));
  },
});

export { expect };