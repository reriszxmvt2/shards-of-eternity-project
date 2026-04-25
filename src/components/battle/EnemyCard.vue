<template>
  <div :class="cardClass" :style="cardStyle" @click="$emit('select', index)">
    <img
      v-if="hasSprite"
      :class="['soe__pixel-art', 'soe__enemy-sprite', enemy.boss && 'soe__enemy-sprite--boss']"
      :src="enemy.sprite"
      alt=""
      @error="spriteFailed = true"
    />
    <div v-else :class="['soe__enemy-icon', enemy.boss && 'soe__enemy-icon--boss']">
      {{ enemy.e }}
    </div>
    <div :class="['soe__enemy-name', enemy.boss && 'soe__enemy-name--boss']">
      {{ enemy.name }}
    </div>
    <StatusBar
      :v="enemy.hp"
      :max="enemy.mxHp"
      :color="colors.hp"
      :w="enemy.boss ? 90 : 62"
    />
    <div :class="['soe__enemy-hp', !enemy.alive && 'soe__enemy-hp--defeated']">
      {{ enemy.alive ? `${enemy.hp}/${enemy.mxHp}` : "พ่ายแพ้" }}
    </div>
    <div v-if="enemy.boss && enemy.alive" class="soe__enemy-badge">★ BOSS</div>
    <div
      v-if="enemy.poison && enemy.alive"
      class="soe__enemy-status soe__enemy-status--poison"
    >
      ถูกพิษ
    </div>
    <div
      v-if="enemy.stunned && enemy.alive"
      class="soe__enemy-status soe__enemy-status--stunned"
    >
      งัก!
    </div>
    <div v-if="isTargetingEnemy && enemy.alive" class="soe__enemy-click-hint">
      [คลิก]
    </div>
  </div>
</template>

<script>
import StatusBar from "../ui/StatusBar.vue";

export default {
  name: "EnemyCard",
  components: { StatusBar },
  props: {
    colors: { type: Object, required: true },
    enemy: { type: Object, required: true },
    index: { type: Number, required: true },
    isTargetingEnemy: { type: Boolean, default: false },
  },
  emits: ["select"],
  data() {
    return {
      spriteFailed: false,
    };
  },
  computed: {
    hasSprite() {
      return Boolean(this.enemy.sprite && !this.spriteFailed);
    },
    cardClass() {
      return [
        "soe__enemy-card",
        this.enemy.boss && "soe__enemy-card--boss",
        !this.enemy.alive && "soe__enemy-card--defeated",
        this.isTargetingEnemy && this.enemy.alive && "soe__enemy-card--targetable",
      ];
    },
    cardStyle() {
      return {
        "--soe-enemy-color": this.enemy.color,
        "--soe-enemy-border": this.enemy.alive
          ? this.isTargetingEnemy
            ? this.colors.red
            : this.enemy.color
          : "#222244",
        "--soe-enemy-shadow":
          this.enemy.boss && this.enemy.alive
            ? `0 0 18px ${this.enemy.color}44`
            : "none",
      };
    },
  },
};
</script>
