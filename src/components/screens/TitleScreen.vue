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
      <ActionButton :color="colors.gold" @click="$emit('start')">
        &gt;&gt; เริ่มเกม / PRESS START
      </ActionButton>
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
    colors: { type: Object, required: true },
    visuals: { type: Object, default: () => ({}) },
  },
  emits: ["start"],
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
