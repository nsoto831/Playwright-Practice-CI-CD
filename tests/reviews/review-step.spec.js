import { test,expect } from '@playwright/test';
import { CommonUI } from './common-ui';
import { faker } from '@faker-js/faker';

test.describe('Review Step Page @smoke', () => {
    test.beforeEach(async ({ page }) => {
        await CommonUI.login(page);
        await CommonUI.completeStartApplicationStep(
            page,
            faker.person.firstName(),
            faker.person.lastName(),
            faker.internet.email(),
            faker.string.numeric(10),
        );
        await CommonUI.completePaymentPlanStep(page);
    });
        

test("Step 1 & Step 2 steppers are green and Step 3 stepper is blue", async ({ page }) => {
let step1StepperCircle = page.locator("//div[@class='step-circle'][span='1']");
let step2StepperCircle = page.locator("//div[@class='step-circle'][span='2']");
let step3StepperCircle = page.locator("//div[@class='step-circle'][span='3']");

await expect(step1StepperCircle).toHaveCSS("background-color","rgb(172, 245, 138)",);
await expect(step2StepperCircle).toHaveCSS("background-color","rgb(172, 245, 138)",);
await expect(step3StepperCircle).toHaveCSS("background-color","rgb(1, 201, 255)");
});

test("Payment input fields are enabled and accept card details", async ({ page }) => {

    let cardNumber = "4242424242424242";
    let expiryDate = "12/30";
    let cvc = "123";
    let zipCode = "12345";

    await CommonUI.enterPaymentDetails(
      page,
      cardNumber,
      expiryDate,
      cvc,
      zipCode,
    );

    let paymentFrame = page.frameLocator("(//iframe[starts-with(@name, '__privateStripeFrame')])[1]");
    let cardNumberInput = paymentFrame.getByPlaceholder("1234 1234 1234 1234");
    let expiryDateInput = paymentFrame.getByPlaceholder("MM / YY");
    let cvcInput = paymentFrame.getByPlaceholder("CVC");
    let zipCodeInput = paymentFrame.getByPlaceholder("12345");

    expect((await cardNumberInput.getAttribute("value")).replace(/\s/g, "")).toBe(cardNumber);
    expect( (await expiryDateInput.getAttribute("value")).replace(/\s/g, "")).toBe(expiryDate);
    await expect(cvcInput).toHaveValue(cvc);
    await expect(zipCodeInput).toHaveValue(zipCode);

    //await page.waitForTimeout(5000);
});

});