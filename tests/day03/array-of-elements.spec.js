import { test, expect } from "@playwright/test";

/*
1. Verify that there are exactly 50 link elements within the <ul> tag.
2. Verify that each of the 50 link elements within the <ul> tag is visible and clickable.
3. Verify that each of the 50 link elements within the <ul> tag has a non-empty href attribute.
*/

test.describe("Test Array of Elements Group", () => {
 let linkElement;
    test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet-5chk.onrender.com");
    await expect(page).toHaveTitle("Practice");
    expect(await page.title()).toBe("Practice");
    linkElement = await page.locator("//ul[@class='list-group']//a").all();
  });
  test("Verify that there are exactly 50 link elements within the <ul> tag", async ({ page }) => {
    // let linkElement = await page.locator("//ul[@class='list-group']//a").all(); 
    // this is now being declared at the group level and assigned in the before each hook to be used in all the tests in this group
    expect(linkElement.length).toBe(50);
    expect(linkElement).toHaveLength(50);
    //expect(linkElement).toBeGreaterThanOrEqual(30);

  });

  test("Verify that each of the 50 link elements within the <ul> tag is visible and clickable", async ({ page }) => {
    // let linkElement = await page.locator("//ul[@class='list-group']//a").all();
    for (let link of linkElement) {
      await expect(link).toBeVisible();
      expect(await link.isVisible()).toBeTruthy();
      expect(await link.isVisible()).not.toBeFalsy();
      expect(await link.isVisible()).toBe(true);
      await expect(link).toBeEnabled();
      expect(await link.isEnabled()).toBeTruthy();
      expect(await link.isEnabled()).not.toBeFalsy();
      expect(await link.isEnabled()).toBe(true);
    }
  });

  test("Verify that each of the 50 link elements within the <ul> tag has a non-empty href attribute", async ({ page }) => {
    // let linkElement = await page.locator("//ul[@class='list-group']//a").all();
    for (let link of linkElement) {
      await expect(link).toHaveAttribute("href");
      console.log(await link.getAttribute("href"));
    }
  });

  
});
