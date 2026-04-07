//const { test, expect } = require('@playwright/test');
import { test, expect } from "@playwright/test"; //

test("Simple google test", async ({ page }) => {
  await page.goto("https://google.com/");
  await page.waitForTimeout(3000);
});

test("", async ({ page }) => {});
