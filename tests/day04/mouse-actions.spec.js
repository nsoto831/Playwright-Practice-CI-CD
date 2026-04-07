import { test } from "@playwright/test";

test.describe("Mouse Actions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet-5chk.onrender.com/");
    await page.waitForTimeout(2000);
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(2000);
  });

  test("left click", async ({ page }) => {
    await page.click("//a[text()='A/B Testing']");
    await page.waitForTimeout(2000);
    await page.getByRole("link", { name: "Home" }).click();
    await page.waitForTimeout(2000);
  });

  test("right click", async ({ page }) => {
    await page.click("//a[text()='A/B Testing']", { button: "right" });
    await page.waitForTimeout(2000);
  });

  test("mouse hover", async ({ page }) => {
    await page.getByRole("link", { name: "Hovers" }).click();
    // The hover over is only used for one element, so we can use the locator to hover over the first image
    // await page.hover("//img[@alt='User Avatar']");
    // await page.waitForTimeout(2000);

    //Since there are multiple images, we can use the for loop method to hover over each image since our locator is targeting all the images
    let avatar = await page.locator("//img[@alt='User Avatar']").all();

    for (let each of avatar) {
      await page.waitForTimeout(1000);
      await each.hover();
    }
  });

  test("mouse wheel scrolling", async ({ page }) => {
    // await page.mouse.wheel(deltaX (horizontal), deltaY (vertical));
    await page.mouse.wheel(0, 2000);
  });

  test("scrolling to a specific element", async ({ page }) => {
    // if the element is not visible on the page playwright will automatically scroll to the element before performing any action on it, but if we want to scroll to the element without performing any action we can use the scrollIntoViewIfNeeded() method

    let inputsLink = page.getByRole("link", { name: "Inputs" });
    await inputsLink.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    await inputsLink.click();
    await page.waitForTimeout(2000);
  });

  test("drag and drop", async ({ page }) => {
    await page.locator("//a[@href='/drag_and_drop']").click();
    await page.waitForTimeout(2000);
    let sourceElementA = page.locator("#column-a");
    let targetElementB = page.locator("#column-b");
    // The dragTo() method is used to perform the drag and drop action. It takes the target element as an argument and drags the source element to the target element.
    await sourceElementA.dragTo(targetElementB);
    await page.waitForTimeout(2000);
    //or we can also us the drag to source and target locators to perform the drag and drop action. Locators are used to identify the source and target elements and then we can use the dragAndDrop() method to perform the drag and drop action.
    //   await page.dragAndDrop("#column-a", "#column-b");
  });
});
