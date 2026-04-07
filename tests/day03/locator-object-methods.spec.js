import { test } from "@playwright/test";

test.describe("Test Locator Object Methods Group", () => {
  //create a before each hook to navigate to the page before each test
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet-5chk.onrender.com");
  });

  test("check(): Checks the checkbox 1 if it is not already checked", async ({
    page,
  }) => {
    let checkboxesLink = page.getByRole("link", { name: "Checkboxes" });
    let checkbox1 = page.locator("//input[@id='box1']");
    await checkboxesLink.click();

    //pause for 3 seconds to see the page navigate
    // await page.waitForTimeout(3000);
    await checkbox1.check();
    //await page.waitForTimeout(3000);
  });

  test("uncheck(): Unchecks the checkbox 2 if it is checked", async ({
    page,
  }) => {
    let checkboxesLink = page.getByRole("link", { name: "Checkboxes" });
    let checkbox2 = page.locator("//input[@id='box2']");
    await checkboxesLink.click();
    //pause for 3 seconds to see the page navigate
    //await page.waitForTimeout(3000);
    await checkbox2.uncheck();
    //await page.waitForTimeout(3000);
  });

  test("Select Option(): Are used for dropdowns and different options in the dropdown", async ({
    page,
  }) => {
    let dropdownLink = page.getByRole("link", { name: "Dropdown" });
    let simpleDropdown = page.locator("//select[@id='dropdown']");
    await dropdownLink.click();
    //pause for 3 seconds to see the page navigate
    //await page.waitForTimeout(3000);
    //await simpleDropdown.selectOption("1"); // this selects the option with value in the html
    //await simpleDropdown.selectOption({ label: "Option 2" }); // this selects the option with the visible text on the page
    await simpleDropdown.selectOption({ index: 1 }); // this selects the option with the index position in the dropdown starting from 0
    //await page.waitForTimeout(3000);
  });
});
