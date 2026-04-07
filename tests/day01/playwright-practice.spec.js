import { test, expect } from "@playwright/test";

test("", async ({ page }) => {
  //navigate to youtube
  await page.goto("https://youtube.com/");

  // pause for 3 seconds
  await page.waitForTimeout(3000);
});
