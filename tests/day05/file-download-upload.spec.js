import { expect, test } from "@playwright/test";
import path from "node:path";
import fs from "node:fs";

test("File Download and change filename", async ({ page }) => {
  /*
Create an event listener for the 'download' event on the page object. 
This event is triggered when a file download is initiated. 
The listener will capture the download object representing the file being 
downloaded. Do not add await before the event listener because we want to capture 
the download object as soon as the download is initiated. If we add "await" before 
the event listener, it will wait for the event to be triggered before capturing 
the download object, which may cause us to miss the download if it is initiated
 before we start waiting for it.
*/

  let promisedDownloadEvent = page.waitForEvent("download");

  await page.goto("https://the-internet-5chk.onrender.com/download");
  await page.getByRole("link", { name: "cydeo error message.png" }).click();

  let download = await promisedDownloadEvent;

  // Now that the event listener has captured the download object,
  // we can use it to perform actions on the downloaded file.
  // Save the downloaded file to a specific location on your local machine
  // using the saveAs() method.

  // Lets first get the suggested filename for the downloaded file using the
  // suggestedFilename() method and then we can use that filename to save the file
  // in a specific location on our local machine. The suggestedFilename() method
  // returns the suggested filename for the downloaded file based on the content-disposition
  // header sent by the server. If the server does not provide a filename, it will return a
  // default name like "download" or "unknown". We can use this suggested filename to save
  // the file with its original name or we can also change the filename before saving it.

  // File name is changed to bananas.png before saving it to the local machine. We can use
  // the path module to join the directory path and the new filename to create the full file
  // path for saving the downloaded file.
  //let filePath = path.join(__dirname, "./downloads", "bananas.png");

  // If we want to save the file with its original name, we can use the suggested filename
  // directly.
  let filePath = path.join(__dirname, "./downloads", download.suggestedFilename());
  await download.saveAs(filePath);
  expect(fs.existsSync(filePath)).toBeTruthy();
});

test("File Upload", async ({ page }) => {
  await page.goto("https://the-internet-5chk.onrender.com/upload");
  let filePath = path.join(__dirname, "./uploads", "TestUpload.txt");

  // The setInputFiles() method is used to set the file input element with the specified file. 
  // It takes the selector for the file input element and the file path as arguments. 
  // This method simulates the user selecting a file for upload.

  await page.waitForTimeout(2000);
  await page.setInputFiles("#file-upload", filePath);
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Upload" }).click();
  await page.waitForTimeout(2000);
  let fileSuccessMessage = page.getByRole('heading', { name: 'File Uploaded!' })
  expect(fileSuccessMessage).toBeVisible();
  expect(fileSuccessMessage).toHaveText("File Uploaded!");
  
});
