import { test, expect } from "@playwright/test";

test.describe("Groups Intro- This is where user story goes", () => {
  test.beforeAll(async () => {
    console.log("This is before all hook");
  });

  test.afterAll(async () => {
    console.log("This is after all hook");
  });

  test.beforeEach(async () => {
    console.log("This is before each hook");
  });

  test.afterEach(async () => {
    console.log("This is after each hook");
  });

  test("Test 1", async () => {
    console.log("This is test 1");
  });

  test("Test 2", async () => {
    console.log("This is test 2");
  });
  test("Test 3", async () => {
    console.log("This is test 3");
  });
});
