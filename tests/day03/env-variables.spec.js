import { test } from "@playwright/test";

test("@env-variables", async ({ page }) => {
  console.log(process.env.PRACTICE_USERNAME);
  console.log(process.env.PRACTICE_PASSWORD);
  console.log(`Username is ${process.env.PRACTICE_USERNAME} and password is ${process.env.PRACTICE_PASSWORD}`);
});

test("Bypass Authentication by encoding credentials in base64 format", async ({
  page,
}) => {
  let encodedCredentials = Buffer.from(`${process.env.PRACTICE_USERNAME}:${process.env.PRACTICE_PASSWORD}`).toString("base64"); // this is how you can encode the credentials in base64 format
  page.setExtraHTTPHeaders({
    Authorization: `Basic ${encodedCredentials}`,
  });
  await page.goto("https://the-internet-5chk.onrender.com/basic_auth");
  await page.waitForTimeout(3000);
});
