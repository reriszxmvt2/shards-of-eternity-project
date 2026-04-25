<template>
  <div class="soe">
    <div class="soe__screen soe__screen--choice">
      <div class="soe__choice-title">
        ── การตัดสินใจของคุณ / YOUR CHOICE ──
      </div>
      <div class="soe__panel soe__panel--gold soe__choice-panel">
        <div class="soe__choice-text">{{ choiceText.thai }}</div>
        <div v-if="choiceText.english" class="soe__choice-translation">
          {{ choiceText.english }}
        </div>
      </div>
      <div class="soe__choice-list">
        <ActionButton
          v-for="choice in scene.choices || []"
          :key="choice.text"
          :color="colors.blue"
          @click="$emit('choose', choice)"
        >
          {{ choice.text }}
        </ActionButton>
      </div>
    </div>
  </div>
</template>

<script>
import ActionButton from "../ui/ActionButton.vue";

export default {
  name: "ChoiceScreen",
  components: { ActionButton },
  props: {
    choiceText: { type: Object, required: true },
    colors: { type: Object, required: true },
    scene: { type: Object, required: true },
  },
  emits: ["choose"],
};
</script>
