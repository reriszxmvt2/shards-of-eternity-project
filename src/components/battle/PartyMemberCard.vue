<template>
  <div :class="cardClass" :style="cardStyle">
    <div class="soe__battle-member-row">
      <span :class="['soe__battle-member-name', isActive && 'soe__battle-member-name--active']">
        {{ member.e }} {{ member.name }}
      </span>
      <span :class="stateClass">
        {{ !member.alive ? "KO" : hasActed ? "OK" : "--" }}
      </span>
    </div>
    <div class="soe__battle-member-class">{{ member.cls }}</div>
    <div class="soe__battle-member-stat soe__battle-member-stat--hp">
      <span class="soe__muted">HP </span>
      <StatusBar :v="member.hp" :max="member.mxHp" :color="colors.hp" :w="52" />
      <span
        :class="[
          'soe__battle-member-value',
          member.hp < member.mxHp * 0.3 && 'soe__battle-member-value--danger',
        ]"
      >
        {{ member.hp }}
      </span>
    </div>
    <div class="soe__battle-member-stat">
      <span class="soe__muted">MP </span>
      <StatusBar :v="member.mp" :max="member.mxMp" :color="colors.mp" :w="52" />
      <span class="soe__battle-member-value"> {{ member.mp }}</span>
    </div>
    <div v-if="member.buf > 0" class="soe__battle-member-buff">
      ATK+{{ member.buf }}({{ member.bufT }}T)
    </div>
  </div>
</template>

<script>
import StatusBar from "../ui/StatusBar.vue";

export default {
  name: "PartyMemberCard",
  components: { StatusBar },
  props: {
    colors: { type: Object, required: true },
    hasActed: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    member: { type: Object, required: true },
  },
  computed: {
    cardClass() {
      return [
        "soe__battle-member",
        this.isActive && "soe__battle-member--active",
        !this.member.alive && "soe__battle-member--ko",
      ];
    },
    cardStyle() {
      return {
        "--soe-member-color": this.member.color,
        "--soe-member-border": this.isActive
          ? this.colors.gold
          : this.hasActed
            ? "#334455"
            : `${this.member.color}88`,
      };
    },
    stateClass() {
      return [
        "soe__battle-member-state",
        this.hasActed && "soe__battle-member-state--acted",
        !this.member.alive && "soe__battle-member-state--ko",
      ];
    },
  },
};
</script>
