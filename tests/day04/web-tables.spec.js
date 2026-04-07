import { expect, test } from "@playwright/test";

test("Web Tables Practice Test", async ({ page }) => {
  await page.goto("https://the-internet-5chk.onrender.com/web-tables");
  await page.waitForTimeout(2000);

  let table = page.locator('//table[@id="ctl00_MainContent_orderGrid"]');
  let rows = await table.locator("//tr").all();
  let columns = await table.locator("//th").all();
  let cells = await table.locator("//td").all();

  expect(rows.length).toBe(9);
  expect(columns.length).toBe(13);

  // So instead of using the all method to get all the cells and then checking the length of the cells, we can directly use the count() method to get the count of the cells.
  expect(await table.locator("//td").count()).toBe(104);

  // Using the all method will get me the samething:
  expect(cells.length).toBe(104);

  for (let each of cells) {
    console.log(await each.textContent());
  }
});

test("Web Tables Practice Test 2", async ({ page }) => {
  await page.goto("https://the-internet-5chk.onrender.com/web-tables");
  await page.waitForTimeout(2000);

  let table = page.locator('//table[@id="ctl00_MainContent_orderGrid"]');
  let rows = await table.locator("//tr").all();
  let columns = await table.locator("//th").all();
  let cells = await table.locator("//td").all();

  // create a loop that prints each cell's data from each row.
  for (let row of rows) {
    let cells = await row.locator("td").all();
    for (let i = 1; i < cells.length - 1; i++) {
      console.log(await cells[i].textContent());
    }
  }
});

test("Web Tables Practice Test 3", async ({ page }) => {
  await page.goto("https://the-internet-5chk.onrender.com/web-tables");
  await page.waitForTimeout(2000);

  let table = page.locator('//table[@id="ctl00_MainContent_orderGrid"]');
  let checkBoxes = await table.locator("//input[@type='checkbox']").all();
  for (let checkeach of checkBoxes) {
    await checkeach.check();
    await expect(checkeach).toBeChecked();
  }
});
