import { test } from '@playwright/test';

test('', async ({ page }) => {
    let framesNarrativeBox = page.frameLocator("iframe#mce_0_ifr");
    let closeiframeMessage = page.locator("//button[contains(@class,'tox-notification__dismiss')]");
    let iframeTextBox = framesNarrativeBox.locator("//p[text()='Your content goes here.']");
    await page.goto('https://the-internet-5chk.onrender.com/iframe');
    await closeiframeMessage.click();
    await iframeTextBox.clear();
    // or you can clear by doing the following
    // await iframeTextBox.press("Control+A", "Backspace");
    await iframeTextBox.fill("This is the text box inside the iframe");
    await page.waitForTimeout(2000);    

});