import { test, expect } from "@playwright/test";

test("Getting page title", async ({ page }) => {
  await page.goto("https://the-internet-5chk.onrender.com/");
  // await page.waitForTimeout(2000);
  //get page title
  const actualTitle = await page.title();
  console.log(actualTitle);
});

test("Getting page URL", async ({ page }) => {
  await page.goto("https://the-internet-5chk.onrender.com/");
  // await page.waitForTimeout(2000);
  //get page URL
  const actualURL = await page.url();
  console.log(actualURL);
  await page.waitForTimeout(2000);
});

test("Adjusting Window Size", async ({ page }) => {
  await page.goto("https://the-internet-5chk.onrender.com/");
  await page.waitForTimeout(2000);
  //   await page.setViewportSize({ width: 1880, height: 1080 });
  //   await page.waitForTimeout(2000);
});
