<template>
  <div class="soe__status-bar" :style="{ '--soe-status-width': `${w}px` }">
    <div
      class="soe__status-fill"
      :style="{
        '--soe-status-fill': color,
        '--soe-status-percent': `${percent}%`,
      }"
    />
  </div>
</template>

<script>
export default {
  name: "StatusBar",
  props: {
    v: { type: Number, required: true },
    max: { type: Number, required: true },
    color: { type: String, required: true },
    w: { type: Number, default: 80 },
  },
  computed: {
    percent() {
      return Math.max(0, Math.min(100, (this.v / this.max) * 100));
    },
  },
};
</script>
