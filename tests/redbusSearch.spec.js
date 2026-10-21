const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");

test("LoginPage opens the login form and accepts a phone number", async ({
  page,
}) => {
  await page.setContent(`
    <button type="button" aria-expanded="false">Login</button>
    <div role="dialog" aria-label="Login" hidden>
      <label for="phone">Mobile phone number</label>
      <input id="phone" type="tel">
    </div>
    <script>
      const loginButton = document.querySelector("button");
      const loginDialog = document.querySelector('[role="dialog"]');
      loginButton.addEventListener("click", () => {
        loginButton.setAttribute("aria-expanded", "true");
        loginDialog.hidden = false;
      });
    </script>
  `);

  const loginPage = new LoginPage(page);
  await loginPage.openLogin();

  await expect(page.getByRole("button", { name: /login/i })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await expect(page.getByRole("dialog", { name: "Login" })).toBeVisible();

  await loginPage.enterPhoneNumber("5550100");
  await expect(page.getByRole("textbox", { name: /mobile|phone/i })).toHaveValue(
    "5550100",
  );
});
