import { test } from "@playwright/test";

test.describe("Test retrieval methods", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet-5chk.onrender.com");
  });
  test("innerText(): Retrieves visible text of an element", async ({
    page,
  }) => {
    let headerElement = page.locator("//h1[@class='h1']");
    let actualHeaderText = await headerElement.innerText();
    console.log(actualHeaderText);
  });

  test("inputValue(): Retrieves the value of an input element. Only works <input>, <textarea>, <select> to retrieve input value", async ({
    page,
  }) => {
    let inputsLink = page.getByRole("link", { name: "Inputs" });
    let inputField = page.locator("//input[@type='number']");

    await inputsLink.click();
    await page.waitForTimeout(3000);
    await inputField.fill("12345");
    await page.waitForTimeout(3000);
    let actualInputValue = await inputField.inputValue();
    console.log(actualInputValue);
  });

  test("getAttribute(): Retrieves the value of an attribute of an element  ", async ({
    page,
  }) => {
    let abTestingLink = page.locator("//a[@href='/abtest']");
    await page.waitForTimeout(3000);
    let actualHrefValue = await abTestingLink.getAttribute("href");
    console.log(actualHrefValue);
  });
});
