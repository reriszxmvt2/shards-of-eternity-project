<template>
  <div class="soe">
    <div class="soe__screen soe__screen--shop">
      <div class="soe__shop-header">
        <div class="soe__shop-title">ร้านค้าค่ายต่อต้าน / RESISTANCE CAMP SHOP</div>
        <div class="soe__shop-gold">ทอง / GOLD: {{ gold }}</div>
      </div>
      <div class="soe__shop-party">
        <div
          v-for="member in party"
          :key="member.id"
          class="soe__shop-member"
          :style="partyStyle(member, '55')"
        >
          {{ member.e }} {{ member.name }}<br />
          <span class="soe__stat-label">HP </span>
          <StatusBar :v="member.hp" :max="member.mxHp" :color="colors.hp" :w="52" />
          <br />
          <span class="soe__stat-label">MP </span>
          <StatusBar :v="member.mp" :max="member.mxMp" :color="colors.mp" :w="52" />
          <br />
          <span class="soe__shop-atk">ATK:{{ member.atk }}</span>
        </div>
      </div>
      <div class="soe__panel">
        <div v-for="item in shopItems" :key="item.id" class="soe__shop-item">
          <div>
            <div
              :class="[
                'soe__shop-item-name',
                isUpgradeOwned(item) && 'soe__shop-item-name--owned',
              ]"
            >
              {{ item.name }}
            </div>
            <div class="soe__shop-item-desc">{{ item.d }}</div>
          </div>
          <ActionButton
            small
            :disabled="isUpgradeOwned(item) || gold < item.price"
            :color="shopButtonColor(item)"
            @click="$emit('buy', item)"
          >
            {{ isUpgradeOwned(item) ? "ซื้อแล้ว" : `${item.price}G` }}
          </ActionButton>
        </div>
      </div>
      <div v-if="shopMsg" class="soe__shop-message">{{ shopMsg }}</div>
      <div class="soe__inventory-summary">ไอเทม: {{ inventorySummary }}</div>
      <ActionButton :color="colors.gold" @click="$emit('continue')">
        &gt;&gt; มุ่งหน้าถ้ำ Vaelthorn
      </ActionButton>
    </div>
  </div>
</template>

<script>
import ActionButton from "../ui/ActionButton.vue";
import StatusBar from "../ui/StatusBar.vue";

export default {
  name: "ShopScreen",
  components: { ActionButton, StatusBar },
  props: {
    colors: { type: Object, required: true },
    gold: { type: Number, required: true },
    inventory: { type: Array, required: true },
    party: { type: Array, required: true },
    purchasedUpgrades: { type: Array, required: true },
    shopItems: { type: Array, required: true },
    shopMsg: { type: String, default: "" },
  },
  emits: ["buy", "continue"],
  computed: {
    availableInventory() {
      return this.inventory.filter((item) => item.count > 0);
    },
    inventorySummary() {
      return (
        this.availableInventory
          .map((item) => `${item.name} x${item.count}`)
          .join(" · ") || "ว่างเปล่า"
      );
    },
  },
  methods: {
    isUpgradeOwned(item) {
      return item.type === "upgrade" && this.purchasedUpgrades.includes(item.id);
    },
    partyStyle(member, opacity) {
      return {
        "--soe-party-color": member.color,
        "--soe-party-border": `${member.color}${opacity}`,
      };
    },
    shopButtonColor(item) {
      if (this.isUpgradeOwned(item)) return this.colors.gray;
      return this.gold >= item.price ? this.colors.green : this.colors.red;
    },
  },
};
</script>
