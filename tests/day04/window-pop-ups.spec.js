import { expect, test } from "@playwright/test";

test("Window Pop-ups practice", async ({ page }) => {
  // Create a event listener for the 'popup' event on the page object.
  // This event is triggered when a new window or tab is opened.
  // The listener will capture the new page object representing the pop-up window.
  // Do not add await before the event listener because we want to capture
  // the new page object as soon as the pop-up is triggered.
  // If we add "await" before the event listener, it will wait for the event to be
  // triggered before capturing the new page object, which may cause us to miss the
  // pop-up window if it is triggered before we start waiting for it.
  let promisedNewPage = page.waitForEvent("popup");

  await page.goto("https://the-internet-5chk.onrender.com/windows");
  await page.getByRole("link", { name: "Click Here" }).click();
  await page.waitForTimeout(2000);

  // Now we can add the "await"
  let newPage = await promisedNewPage;
  //Now that the event listener has captured
  // the new page object, we can use it to perform actions on the pop-up window.

  await expect(newPage).toHaveTitle("New Window");
  expect(newPage.url()).toBe(
    "https://the-internet-5chk.onrender.com/windows/new",
  );
  await expect(page).toHaveTitle("Windows");
  await expect(newPage.locator("h3")).toHaveText("New Window");
  await expect(newPage.locator("h3")).toBeVisible();

  let firstPageHeader = page.locator("//h3[text()='Opening a new window']");
  // Playwright will automatically switch to the new page when the pop-up event is
  // triggered, so we need to switch back to the original page before performing any
  // action on it to actually see the test being executed but will be executed
  // regardless if bringToFront() is used or not. We can use the bringToFront() method
  //  to bring the original page to the front and make it the active page.

  await page.bringToFront();
  await page.waitForTimeout(2000);
  await expect(firstPageHeader).toBeVisible();
  await expect(firstPageHeader).toHaveText("Opening a new window");
  await newPage.bringToFront();
  await page.waitForTimeout(2000);

  /*
   */
});
