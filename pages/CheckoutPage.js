class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.passengerName = page.getByRole("textbox", { name: /passenger name|name/i });
    this.passengerAge = page.getByRole("textbox", { name: /age/i });
    this.passengerGender = page.getByRole("combobox", { name: /gender/i });
  }

  async enterPassengerDetails({ name, age, gender }) {
    await this.passengerName.fill(name);
    await this.passengerAge.fill(String(age));
    await this.passengerGender.selectOption({ label: gender });
  }
}

module.exports = { CheckoutPage };
