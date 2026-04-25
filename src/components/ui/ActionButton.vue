<template>
  <button
    :class="['soe__button', small && 'soe__button--small']"
    :disabled="disabled"
    :style="{ '--soe-button-border': color }"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
import { COLORS } from "../../gameData";

export default {
  name: "ActionButton",
  props: {
    color: { type: String, default: COLORS.border },
    disabled: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
  },
  emits: ["click"],
};
</script>
