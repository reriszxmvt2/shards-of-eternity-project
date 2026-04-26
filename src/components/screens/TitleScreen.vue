<template>
  <div class="soe">
    <div class="soe__screen soe__screen--title">
      <div class="soe__title-stars">{{ "* ".repeat(16) }}</div>
      <div v-if="hasHeroImage" class="soe__title-art">
        <img
          class="soe__pixel-art soe__title-image"
          :src="visuals.title.heroImage"
          alt=""
          @error="heroImageFailed = true"
        />
      </div>
      <div class="soe__title-kicker">AN 8-BIT LEGEND</div>
      <div class="soe__title-main">SHARDS OF</div>
      <div class="soe__title-sub">ETERNITY</div>
      <div class="soe__title-thai">ชิ้นส่วนแห่งนิรันดร์</div>
      <div class="soe__title-lore">
        อาณาจักรล่มสลาย มังกรถูกจองจำ
        <br />
        <span class="soe__title-lore-note">
          A kingdom fallen. A dragon enslaved.
        </span>
      </div>
      <div class="soe__title-party">[W] [M] [A]</div>
      <div class="soe__title-actions">
        <ActionButton
          v-if="canContinue"
          :color="colors.green"
          @click="$emit('continue')"
        >
          &gt;&gt; เล่นต่อ / CONTINUE
        </ActionButton>
        <ActionButton :color="colors.gold" @click="$emit('start')">
          {{ canContinue ? "เริ่มใหม่ / NEW GAME" : ">> เริ่มเกม / PRESS START" }}
        </ActionButton>
        <ActionButton
          v-if="canContinue"
          small
          :color="colors.red"
          @click="$emit('clear-save')"
        >
          ลบเซฟ / CLEAR SAVE
        </ActionButton>
      </div>
      <div v-if="canContinue && saveSummary" class="soe__title-save">
        {{ saveSummary.location }}
        <br />
        <span>{{ saveSummary.objective }}</span>
      </div>
      <div class="soe__title-meta">
        นักรบ / นักเวท / นักธนู · ต่อสู้ผลัดเทิร์น
        <br />
        เนื้อเรื่องสองทาง · สองตอนจบ · ทุกการเลือกมีความหมาย
        <br />
        <span class="soe__title-meta-note">
          Every choice echoes. Every mercy counts.
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import ActionButton from "../ui/ActionButton.vue";

export default {
  name: "TitleScreen",
  components: { ActionButton },
  props: {
    canContinue: { type: Boolean, default: false },
    colors: { type: Object, required: true },
    saveSummary: { type: Object, default: null },
    visuals: { type: Object, default: () => ({}) },
  },
  emits: ["clear-save", "continue", "start"],
  data() {
    return {
      heroImageFailed: false,
    };
  },
  computed: {
    hasHeroImage() {
      return Boolean(this.visuals.title?.heroImage && !this.heroImageFailed);
    },
  },
};
</script>
