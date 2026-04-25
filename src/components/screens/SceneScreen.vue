<template>
  <div class="soe" @click="$emit('advance')">
    <div class="soe__screen soe__screen--scene">
      <div v-if="scene.title" class="soe__scene-title">
        {{ scene.title }}
      </div>
      <div v-if="hasSceneIllustration" class="soe__scene-art">
        <img
          :key="scene.illustration"
          class="soe__pixel-art soe__scene-image"
          :src="scene.illustration"
          alt=""
          @error="failedIllustration = scene.illustration"
        />
      </div>
      <div class="soe__panel soe__panel--scene">
        <div v-if="currentLine.speaker" class="soe__scene-speaker">
          [{{ currentLine.speaker }}]
        </div>
        <div class="soe__scene-body">
          <div class="soe__scene-text" :style="textColorStyle(currentLine.color)">
            {{ currentLine.thai }}
          </div>
          <div v-if="currentLine.english" class="soe__scene-translation">
            {{ currentLine.english }}
          </div>
        </div>
        <div class="soe__scene-progress">
          {{ lineIndex + 1 }}/{{ sceneLines.length }} &gt;
        </div>
      </div>
      <div class="soe__party-strip">
        <div
          v-for="member in party"
          :key="member.id"
          class="soe__party-chip"
          :style="partyStyle(member, '44')"
        >
          {{ member.e }} {{ member.name }}
          <StatusBar :v="member.hp" :max="member.mxHp" :color="colors.hp" :w="50" />
          <span class="soe__muted"> {{ member.hp }}</span>
        </div>
      </div>
      <div class="soe__continue-hint">
        — คลิกเพื่อดำเนินต่อ / CLICK TO CONTINUE —
      </div>
    </div>
  </div>
</template>

<script>
import StatusBar from "../ui/StatusBar.vue";

export default {
  name: "SceneScreen",
  components: { StatusBar },
  props: {
    colors: { type: Object, required: true },
    currentLine: { type: Object, required: true },
    lineIndex: { type: Number, required: true },
    party: { type: Array, required: true },
    scene: { type: Object, required: true },
    sceneLines: { type: Array, required: true },
  },
  emits: ["advance"],
  data() {
    return {
      failedIllustration: "",
    };
  },
  computed: {
    hasSceneIllustration() {
      return Boolean(
        this.scene.illustration && this.failedIllustration !== this.scene.illustration,
      );
    },
  },
  methods: {
    textColorStyle(color) {
      return { "--soe-text-color": color };
    },
    partyStyle(member, opacity) {
      return {
        "--soe-party-color": member.color,
        "--soe-party-border": `${member.color}${opacity}`,
      };
    },
  },
};
</script>
