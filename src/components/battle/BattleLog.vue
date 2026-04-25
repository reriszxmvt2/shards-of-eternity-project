<template>
  <div ref="logRef" class="soe__panel soe__battle-log">
    <div
      v-for="(line, index) in lines"
      :key="`${line}-${index}`"
      :class="[
        'soe__battle-log-line',
        index === lines.length - 1 && 'soe__battle-log-line--latest',
      ]"
    >
      {{ line }}
    </div>
  </div>
</template>

<script>
export default {
  name: "BattleLog",
  props: {
    lines: { type: Array, required: true },
  },
  watch: {
    lines() {
      this.$nextTick(this.scrollToBottom);
    },
  },
  mounted() {
    this.scrollToBottom();
  },
  methods: {
    scrollToBottom() {
      if (this.$refs.logRef) {
        this.$refs.logRef.scrollTop = this.$refs.logRef.scrollHeight;
      }
    },
  },
};
</script>
