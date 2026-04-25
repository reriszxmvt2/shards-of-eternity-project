<template>
  <div class="soe">
    <div class="soe__screen soe__screen--ending">
      <div class="soe__ending-title" :style="endingTitleStyle">
        {{ scene.title }}
      </div>
      <div v-if="hasEndingIllustration" class="soe__scene-art">
        <img
          :key="scene.illustration"
          class="soe__pixel-art soe__scene-image"
          :src="scene.illustration"
          alt=""
          @error="failedIllustration = scene.illustration"
        />
      </div>
      <div class="soe__ending-panel" :style="endingPanelStyle">
        <div v-for="(line, index) in scene.lines || []" :key="index" class="soe__ending-line">
          <div class="soe__ending-text" :style="textColorStyle(line[2] || colors.white)">
            {{ splitText(line[1] || '').thai }}
          </div>
          <div v-if="splitText(line[1] || '').english" class="soe__ending-translation">
            {{ splitText(line[1] || '').english }}
          </div>
        </div>
      </div>
      <div class="soe__ending-note">
        {{ endingNote }}
      </div>
      <ActionButton :color="colors.gold" @click="$emit('reset')">
        &gt;&gt; เล่นอีกครั้ง / PLAY AGAIN
      </ActionButton>
    </div>
  </div>
</template>

<script>
import ActionButton from "../ui/ActionButton.vue";

export default {
  name: "EndingScreen",
  components: { ActionButton },
  props: {
    colors: { type: Object, required: true },
    scene: { type: Object, required: true },
    storyFlags: { type: Object, required: true },
  },
  emits: ["reset"],
  data() {
    return {
      failedIllustration: "",
    };
  },
  computed: {
    hasEndingIllustration() {
      return Boolean(
        this.scene.illustration && this.failedIllustration !== this.scene.illustration,
      );
    },
    endingNote() {
      if (this.scene.note) return this.scene.note;
      return this.storyFlags.spared
        ? "เพชรโตะ เลือกเมตตา — ชีวิตหนึ่งที่ช่วยไว้ เปลี่ยนอีกหลายชีวิต"
        : "ราคาของการแก้แค้น คือคำถามที่ไม่มีวันจางหาย";
    },
    endingTitleStyle() {
      return {
        "--soe-ending-color": this.scene.titleColor,
        "--soe-ending-shadow": `0 0 14px ${this.scene.titleColor}55`,
      };
    },
    endingPanelStyle() {
      return {
        "--soe-ending-color": this.scene.titleColor,
        "--soe-ending-panel-shadow": `0 0 16px ${this.scene.titleColor}22`,
      };
    },
  },
  methods: {
    splitText(text) {
      const [thai, english] = String(text).split("\n//");
      return { thai, english };
    },
    textColorStyle(color) {
      return { "--soe-text-color": color };
    },
  },
};
</script>
