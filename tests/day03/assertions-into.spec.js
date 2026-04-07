import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://the-internet-5chk.onrender.com");
  await expect(page).toHaveTitle("Practice");
  expect(await page.title()).toBe("Practice");
});

test.describe("Test Assertions Into Group", () => {
  test("Verify check boxes are checked", async ({ page }) => {
    let checkboxesLink = page.getByRole("link", { name: "Checkboxes" });
    let checkbox1 = page.locator("//input[@id='box1']");
    let checkbox2 = page.locator("//input[@id='box2']");
    await checkboxesLink.click();
    await page.waitForTimeout(2000);
    await checkbox1.check();
    await checkbox2.check();
    await page.waitForTimeout(2000);
    //-------------------------------------------------------------------------------
    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).toBeChecked();

    //-------------------------------------------------------------------------------
    expect(await checkbox1.isChecked()).toBeTruthy();
    expect(await checkbox2.isChecked()).toBeTruthy();

    //-------------------------------------------------------------------------------
    expect(await checkbox1.isChecked()).toBe(true);
    expect(await checkbox2.isChecked()).toBe(true);
  });

  test("Verify check boxes are unchecked", async ({ page }) => {
    let checkboxesLink = page.getByRole("link", { name: "Checkboxes" });
    let checkbox1 = page.locator("//input[@id='box1']");
    let checkbox2 = page.locator("//input[@id='box2']");
    await checkboxesLink.click();
    await page.waitForTimeout(2000);
    await checkbox1.uncheck();
    await checkbox2.uncheck();
    await page.waitForTimeout(2000);
    //-------------------------------------------------------------------------------
    await expect(checkbox1).not.toBeChecked();
    await expect(checkbox2).not.toBeChecked();

    //-------------------------------------------------------------------------------
    expect(await checkbox1.isChecked()).toBeFalsy();
    expect(await checkbox2.isChecked()).toBeFalsy();

    //-------------------------------------------------------------------------------
    expect(await checkbox1.isChecked()).toBe(false);
    expect(await checkbox2.isChecked()).toBe(false);
  });

  test("Verify visibility of elements", async ({ page }) => {
    let headerElement = page.locator("span.h1y");
    let actualHeaderText = await headerElement.innerText();
    await expect(headerElement).toBeVisible();
    expect(await headerElement.isVisible()).toBeTruthy();
    expect(await headerElement.isVisible()).toBe(true);
    await expect(headerElement).toHaveText("Test Automation Practice");
    await expect(headerElement).toContainText("Test Automation Practice");
    expect(actualHeaderText).toBe("Test Automation Practice");
    expect(actualHeaderText).toEqual("Test Automation Practice");
    expect(actualHeaderText).toMatch(/Test Automation Practice/);
    expect(actualHeaderText).toBeTruthy();
    expect(actualHeaderText).not.toBeFalsy();
    expect(actualHeaderText).toContain("Automation");
  });
});
