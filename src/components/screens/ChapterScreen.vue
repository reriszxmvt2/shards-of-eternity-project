<template>
  <div class="soe soe--chapter" @click="$emit('continue')">
    <div class="soe__screen soe__screen--chapter">
      <div v-if="hasIllustration" class="soe__chapter-art">
        <img
          class="soe__pixel-art soe__chapter-image"
          :src="scene.illustration"
          alt=""
          @error="failedIllustration = scene.illustration"
        />
      </div>
      <div class="soe__chapter-kicker">{{ chapter.kicker }}</div>
      <div class="soe__chapter-title">{{ chapter.title }}</div>
      <div class="soe__chapter-subtitle">{{ chapter.subtitle }}</div>
      <div v-if="scene.location" class="soe__chapter-location">
        {{ scene.location.name }}
        <span>{{ scene.location.region }}</span>
      </div>
      <div v-if="scene.objective" class="soe__chapter-objective">
        <div class="soe__chapter-objective-label">CURRENT OBJECTIVE</div>
        <div>{{ scene.objective.title }}</div>
      </div>
      <ActionButton :color="colors.gold" @click.stop="$emit('continue')">
        &gt;&gt; เดินทางต่อ / CONTINUE
      </ActionButton>
    </div>
  </div>
</template>

<script>
import ActionButton from "../ui/ActionButton.vue";

export default {
  name: "ChapterScreen",
  components: { ActionButton },
  props: {
    colors: { type: Object, required: true },
    scene: { type: Object, required: true },
  },
  emits: ["continue"],
  data() {
    return {
      failedIllustration: "",
    };
  },
  computed: {
    chapter() {
      return this.scene.chapter || {};
    },
    hasIllustration() {
      return Boolean(
        this.scene.illustration && this.failedIllustration !== this.scene.illustration,
      );
    },
  },
};
</script>
