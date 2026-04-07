import { test,expect } from "@playwright/test";

test.describe("Test JS Alerts Group", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet-5chk.onrender.com/javascript_alerts");
    
  });

  test("Test Regular JS Alert", async ({ page }) => {
    //alert mode is turned on with the help of page.on() method, we can listen to the alert and handle it with the help of dialog class methods like accept(), dismiss(), message() etc.
    await page.on("dialog", async (alert) => {
      console.log(`Dialog message is: ${alert.message()}`);
      //await page.waitForTimeout(3000);
      await alert.accept();
    });

    let jsAlertButton = page.locator("//button[text()='Click for JS Alert']");
    let successMessage = page.locator("//p[@id='result']");
    await jsAlertButton.click();
    // await page.waitForTimeout(5000); //the alret us automatically handled by playwright, we just need to add some wait time to see the alert being handled in the test execution

    await expect(successMessage).toBeVisible();
    // await page.waitForTimeout(2000);
  });

  test("Test JS Confirm", async ({ page }) => {
    let jsConfirmButton = page.getByRole('button', { name: 'Click for JS Confirm' });
    let cancelConfirmMessage = page.getByText('You clicked: Cancel');

    await page.on("dialog", async (alert) => {
      console.log(`Dialog message is: ${alert.message()}`);
      // await page.waitForTimeout(3000);
      await alert.dismiss();
    });

    await jsConfirmButton.click();
    await expect(cancelConfirmMessage).toBeVisible();
  });

  test("Test JS Prompt", async ({ page }) => {
        let jsPromptButton = page.getByRole('button', { name: 'Click for JS Prompt' });
        let promptMessage = page.locator("//p[@id='result']");

        await page.on("dialog", async (alert) => {
          console.log(`Dialog message is: ${alert.message()}`);
          // await page.waitForTimeout(3000);
          await alert.accept("Playwright JS Prompt test input");
        });

        await jsPromptButton.click();
        await expect(promptMessage).toBeVisible();
        // await page.waitForTimeout(2000);
  });
});
