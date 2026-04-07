import { test, expect } from "@playwright/test";
import { CommonUI } from "./common-ui";
import { faker } from "@faker-js/faker";

test.describe("Payment Plan Page @smoke", () => {
  test.beforeEach(async ({ page }) => {
    await CommonUI.login(page);
    await CommonUI.completeStartApplicationStep(
      page,
      faker.person.firstName(),
      faker.person.lastName(),
      faker.internet.email(),
      faker.string.numeric(10),
    );
  });

  test("Step 2 stepper is blue and Step 1 stepper is green", async ({page}) => {
    let step1StepperCircle = page.locator("//div[@class='step-circle'][span='1']");
    let step2StepperCircle = page.locator("//div[@class='step-circle'][span='2']");
    let step3StepperCircle = page.locator("//div[@class='step-circle'][span='3']");

    await expect(step1StepperCircle).toHaveCSS("background-color","rgb(172, 245, 138)");
    await expect(step2StepperCircle).toHaveCSS("background-color","rgb(1, 201, 255)");
    await expect(step3StepperCircle).toHaveCSS("color","rgb(217, 226, 236)");
});

  test("Next button is disabled by default", async ({ page }) => {
    let disabledNextButton = page.getByRole("button", { name: "Next" });

    await expect(disabledNextButton).toBeDisabled();
  });

  test("Next button becomes enabled when a payment plan is selected", async ({page}) => {
    let enabledNextButton = page.getByRole("button", { name: "Next" });
    let upfrontPaymentPlan = page.getByRole("button", { name: /Upfront/ });
    
    await upfrontPaymentPlan.click();
    await expect(enabledNextButton).toBeEnabled();
  });
});
