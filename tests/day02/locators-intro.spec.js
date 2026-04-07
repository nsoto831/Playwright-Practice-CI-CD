//const { test, expect } = require('@playwright/test');
import { test, expect } from "@playwright/test"; //

test("Simple google test", async ({ page }) => {
  await page.goto("https://google.com/");
  await page.waitForTimeout(3000);
});

test("", async ({ page }) => {
  // test codes
  await page.goto("https://www.google.com");

  //await page.waitForTimeout(3000);

  let searchBox = page.locator("textarea[id='APjFqb1111']");

  // await searchBox.type("CYDEO");
  await searchBox.fill("CYDEO");

  await page.waitForTimeout(3000);

  await searchBox.press("Enter");

  //await page.waitForTimeout(3000);
});
