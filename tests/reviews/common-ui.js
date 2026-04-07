export class CommonUI {
  // constructor(page) {
  //   this.page = page;
  //   let step1StepperCircle = page.locator("//div[@class='step-circle'][span='1']");
  //   let step2StepperCircle = page.locator("//div[@class='step-circle'][span='2']");
  //   let step3StepperCircle = page.locator("//div[@class='step-circle'][span='3']");
  // }

  static async login(page) {
    let credentials = Buffer.from(
      `${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`,
    ).toString("base64");

    await page.setExtraHTTPHeaders({ Authorization: `Basic ${credentials}` });

    await page.goto("https://qa.sep.tdtm.cydeo.com/taws");
  }

  static async enterPersonalDetails(
    page,
    firstName = "John",
    lastName = "Doe",
    email = "john.doe@example.com",
    phoneNumber = "1234567890",
    howDidYouHear = "Instagram",
  ) {
    let firstNameInput = page.locator("//input[@formcontrolname='firstName']");
    let lastNameInput = page.getByLabel("Last Name");
    let emailInput = page.locator("//input[@formcontrolname='email']");
    let phoneNumberInput = page.locator(
      "//input[@formcontrolname='phoneNumber']",
    );
    let howDidYouHearDropDown = page.locator(
      "//mat-label[text()='How did you hear about us?']",
    );

    await firstNameInput.fill(firstName);
    await lastNameInput.fill(lastName);
    await emailInput.fill(email);
    await phoneNumberInput.fill(phoneNumber);
    await howDidYouHearDropDown.click();
    await page.click(
      `//span[@class='mdc-list-item__primary-text' and text()='${howDidYouHear}']`,
    );
  }

  static async completeStartApplicationStep(
    page,
    firstName = "John",
    lastName = "Doe",
    email = "john.doe@example.com",
    phoneNumber = "1234567890",
    howDidYouHear = "Instagram",
  ) {
    let nextButton = page.locator("//button[@class='next-button']");
    await this.enterPersonalDetails(
      page,
      firstName,
      lastName,
      email,
      phoneNumber,
      howDidYouHear,
    );
    await nextButton.click();
  }

  static async completePaymentPlanStep(page) {
    let enabledNextButton = page.getByRole("button", { name: "Next" });
    let upfrontPaymentPlan = page.getByRole("button", { name: /Upfront/ });

    await upfrontPaymentPlan.click();
    await enabledNextButton.click();
  }

  static async enterPaymentDetails(
    page,
    cardNumber = "4242424242424242",
    expiryDate = "12/30",
    cvc = "123",
    zipCode = "12345",
  ) {
    let paymentFrame = page.frameLocator(
      "(//iframe[starts-with(@name, '__privateStripeFrame')])[1]",
    );
    let cardNumberInput = paymentFrame.getByPlaceholder("1234 1234 1234 1234");
    let expiryDateInput = paymentFrame.getByPlaceholder("MM / YY");
    let cvcInput = paymentFrame.getByPlaceholder("CVC");
    let zipCodeInput = paymentFrame.getByPlaceholder("12345");

    await cardNumberInput.fill(cardNumber);
    await expiryDateInput.fill(expiryDate);
    await cvcInput.fill(cvc);
    await zipCodeInput.fill(zipCode);
  }
}
