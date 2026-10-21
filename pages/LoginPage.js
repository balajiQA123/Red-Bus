class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginButton = page.getByRole("button", { name: /login/i });
    this.phoneField = page.getByRole("textbox", { name: /mobile|phone/i });
  }

  async openLogin() {
    await this.loginButton.click();
  }

  async enterPhoneNumber(phoneNumber) {
    await this.phoneField.fill(phoneNumber);
  }
}

module.exports = { LoginPage };
