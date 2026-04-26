<template>
  <div v-if="savePoint" class="soe__save-point">
    <div class="soe__save-point-label">SAVE POINT</div>
    <div class="soe__save-point-name">{{ savePoint.label }}</div>
    <div class="soe__save-point-note">{{ savePoint.note }}</div>
    <button class="soe__save-point-button" type="button" @click="$emit('save')">
      SAVE
    </button>
    <div v-if="message" class="soe__save-point-message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "SavePointPrompt",
  props: {
    message: { type: String, default: "" },
    savePoint: { type: Object, default: null },
  },
  emits: ["save"],
};
</script>
