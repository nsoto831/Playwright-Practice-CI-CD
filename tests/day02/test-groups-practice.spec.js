import { test } from "@playwright/test";

test.describe("Practice.cydeo", () => {
  test.beforeEach(async ({ page }) => {
    console.log("This is before each hook");
    await page.goto("https://the-internet-5chk.onrender.com/");
  });
  test.afterEach(async ({ page }) => {
    console.log("This is after each hook");
    await page.waitForTimeout(3000);
  });

  test("Title of Page", async ({ page }) => {
    console.log("This is test 1");
    console.log(await page.title());
  });

  test("URL of Page", async ({ page }) => {
    console.log("This is test 2");
    console.log(page.url());
  });
});
