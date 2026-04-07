import { test } from "@playwright/test";

test("Bypass Authentication by embedding credentials in URL", async ({ page }) => {
  //https://username:password@the-internet-5chk.onrender.com/basic_auth
  await page.goto("https://admin:admin@the-internet-5chk.onrender.com/basic_auth");
  await page.waitForTimeout(3000);
});

test("Bypass Authentication by encoding credentials in base64 format", async ({ page }) => {
let encodedCredentials = Buffer.from("admin:admin").toString("base64"); // this is how you can encode the credentials in base64 format
  page.setExtraHTTPHeaders({
    Authorization: `Basic ${encodedCredentials}`,
  });
  await page.goto("https://the-internet-5chk.onrender.com/basic_auth");
  await page.waitForTimeout(3000);
});

