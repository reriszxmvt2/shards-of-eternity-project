export const shopMethods = {
  handleBuyItem(shopItem) {
    if (this.gold < shopItem.price) {
      this.flashShopMessage("ทองไม่พอ!");
      return;
    }

    if (shopItem.type === "upgrade") {
      if (this.purchasedUpgrades.includes(shopItem.id)) {
        this.flashShopMessage("อัพเกรดแล้ว!");
        return;
      }

      this.purchasedUpgrades = [...this.purchasedUpgrades, shopItem.id];
      this.party = this.party.map((partyMember) =>
        partyMember.id === shopItem.target
          ? { ...partyMember, atk: partyMember.atk + shopItem.amt }
          : partyMember,
      );
    } else {
      const existingItem = this.inventory.find(
        (inventoryItem) => inventoryItem.id === shopItem.id,
      );
      if (existingItem) {
        existingItem.count += 1;
      } else {
        this.inventory.push({
          id: shopItem.id,
          name: shopItem.name,
          d: shopItem.d,
          count: 1,
        });
      }
    }

    this.gold -= shopItem.price;
    this.flashShopMessage("ซื้อแล้ว!");
  },
  flashShopMessage(message) {
    this.shopMsg = message;
    setTimeout(() => {
      this.shopMsg = "";
    }, 2000);
  },
};
