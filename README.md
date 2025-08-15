# Playwright UI Automation — SauceDemo

This project demonstrates end-to-end UI test automation using **Playwright** + **TypeScript** with **Allure** reporting on the SauceDemo website:  
🔗 https://www.saucedemo.com/

---

## ✅ Project Highlights

- ✅ **Page Object Model (POM)** with fixtures-based injection
- ✅ **Randomized product selection** (3 unique items per run)
- ✅ **Centralized UI text constants** (`constants/buttonText.ts`)
- ✅ **Externalized UI messages & URLs** (`testData/messages.json`, `testData/urlEndPoints.json`)
- ✅ **Reusable math & helper utilities** (`utils/math.ts`, `utils/helperActions.ts`)
- ✅ **Environment variables** via `.env` (`BASE_URL`, `STD_USER`, `STD_PASS`)
- ✅ **Allure reporting** locally & in CI (Docker-based GitHub Actions)
- ✅ **Trace, video, and screenshot artifacts** on failure
- ✅ **Allure deployment to GitHub Pages**

---

## 🧪 Automated Test Scenario

| Test Case | Description |
|-----------|-------------|
| Happy Path Checkout | Logs in, selects **3 random products**, validates cart & overview (names, prices, totals), completes checkout, verifies confirmation message. |

**Validations**  
- Cart count matches number of selected products  
- Names match across inventory → cart → overview  
- **Subtotal = sum(prices)**  
- **Tax = subtotal × 0.08**  
- **Total = subtotal + tax** (rounded to 2 decimals)  
- Final confirmation: **"Thank you for your order!"**

---

## 🛠️ Setup Instructions

1) **Clone**  
```bash
git clone https://github.com/AnandJeyakumar/saucedemo-playwright-e2e.git
cd cd saucedemo-playwright-e2e
```

2) **Install deps**  
```bash
npm ci
```

3) **Install Playwright browsers**  
```bash
npx playwright install
# or only Chromium:
# npx playwright install chromium
```

4) **Create `.env` (local runs)**  
> ℹ️ *Since this is a public demo site, credentials are shown here.  
> In a real-world project, sensitive data should **never** be committed or exposed in plain text.*  

```env
BASE_URL=https://www.saucedemo.com
STD_USER=standard_user
STD_PASS=secret_sauce
```
> Ensure `import 'dotenv/config'` is at the **top** of `playwright.config.ts` so env vars load during CI/local runs.

> In CI (GitHub Actions), these values are securely read from **repository secrets** — never hardcoded — using:  
> ```yaml
> env:
>   BASE_URL: ${{ secrets.BASE_URL }}
>   STD_USER: ${{ secrets.STD_USER }}
>   STD_PASS: ${{ secrets.STD_PASS }}
> ```
> This ensures credentials remain private and environment-specific.



---

## ▶️ Running Tests

**Headless (default)**  
```bash
npx playwright test --project=chromium
```

**Headed**  
```bash
npx playwright test --project=chromium --headed
```

**Debug**  
```bash
PWDEBUG=1 npx playwright test
```

**Single spec**  
```bash
npx playwright test tests/e2e-checkout-happy-path.spec.ts --project=chromium
```

---

## 📊 Reports

**Playwright HTML**  
```bash
npx playwright show-report
```

**Allure (local viewing)**  
```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

## ⚙️ CI/CD — GitHub Actions (Docker + Allure → Pages)

**Workflow**: `Playwright + Allure Using Docker Image`  
**Trigger**: Manual (`workflow_dispatch`) with `browser` input (`chromium|firefox|webkit`)

**Highlights**  
- Uses official Docker image: `mcr.microsoft.com/playwright:v1.54.2-jammy`  
- Injects secrets: `BASE_URL`, `STD_USER`, `STD_PASS`  
- Retries: `--retries=2`  
- Uploads Playwright HTML artifact (30 days)  
- Generates Allure via `simple-elf/allure-report-action@v1.7` (keeps 20 reports)  
- Publishes Allure to **GitHub Pages** (Actions → Pages URL)

**Repo Setup**  
- **Secrets**: `BASE_URL`, `STD_USER`, `STD_PASS`  
- **Pages**: Settings → Pages → Source: **GitHub Actions**

**Run & View**  
- Actions → Run workflow → choose browser  
- After run: download **Playwright HTML** artifact; open **Pages URL** for Allure

---

## 📂 Folder Structure

```
fixtures/fixtures.ts
pages/
  LoginPage.ts
  InventoryPage.ts
  CartPage.ts
  CheckoutInfoPage.ts
  CheckoutOverviewPage.ts
  CompletePage.ts
tests/
  e2e-checkout-happy-path.spec.ts
utils/
  math.ts
  helperActions.ts
constants/
  buttonText.ts
testData/
  messages.json
  urlEndPoints.json
playwright.config.ts
.env
```

---

## 📄 Files & Data Sources (as used in the suite)

### `constants/buttonText.ts`
```ts
export const BUTTON_TEXT = {
  addToCart: 'Add to cart',
  remove: 'Remove',
} as const;

export type ButtonKey = keyof typeof BUTTON_TEXT;
```

### `testData/messages.json`
```json
{
  "checkoutMessage": {
    "checkOutThankYouHeader": "Thank you for your order!",
    "checkoutCompleteInnerMessage": "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
    "checkoutCompleteTitle": "Checkout: Complete!"
  }
}
```

### `testData/urlEndPoints.json`
```json
{
  "inventory": "/inventory.html",
  "checkOutStepOne": "/checkout-step-one.html",
  "checkOutStepTwo": "/checkout-step-two.html",
  "checkOutComplete": "/checkout-complete.html"
}
```

### `utils/helperActions.ts`
```ts
export const extractSummaryAmounts = (sub: string, tax: string, total: string) => {
  return {
    itemTotal: parseFloat(sub.split('$')[1]),
    taxNum: parseFloat(tax.split('$')[1]),
    totalNum: parseFloat(total.split('$')[1])
  };
};
```

> **Note**: `utils/ariaButtons.ts` is **not used**. The helper for parsing summary amounts is `utils/helperActions.ts` (shown above).

---

## 📌 Notes

- **Selectors**: Prefer `data-test` attributes (configured via `testIdAttribute` in Playwright config). Fall back to `getByRole` with names from `constants/buttonText.ts` when needed.
- **Math utilities**: Use `utils/math.ts` to avoid floating-point issues during total/tax assertions.
- **Allure steps**: Use `test.step()` for clean, readable reporting.
- **Artifacts**: Traces/screenshots/videos captured on failure (per `playwright.config.ts`).

---

📬 **Contact**  
For questions or feedback: **janand819@gmail.com**
