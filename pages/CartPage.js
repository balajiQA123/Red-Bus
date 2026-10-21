class CartPage {
  constructor(page) {
    this.page = page;
    this.seatMap = page.getByRole("region", { name: /seat/i });
  }

  async selectSeat(seatName) {
    await this.page.getByRole("button", { name: new RegExp(seatName, "i") }).click();
  }
}

module.exports = { CartPage };
