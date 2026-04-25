<template>
  <div v-if="canAct" class="soe__panel soe__panel--gold">
    <div class="soe__action-title">
      {{ currentMember.e }} {{ currentMember.name }} — เทิร์นของคุณ
      {{ battleMenu === "target" ? " — คลิกศัตรูด้านบน" : "" }}
      {{ battleMenu === "targetAlly" ? " — เลือกพันธมิตร" : "" }}
    </div>

    <div v-if="battleMenu === 'main'" class="soe__action-grid">
      <ActionButton @click="$emit('start-targeting', 'attack', 0)">
        [ โจมตี / ATTACK ]
      </ActionButton>
      <ActionButton @click="$emit('set-menu', 'skill')">[ สกิล / SKILL ]</ActionButton>
      <ActionButton @click="$emit('set-menu', 'item')">[ ไอเทม / ITEM ]</ActionButton>
      <ActionButton @click="$emit('defend')">[ ตั้งรับ / DEFEND ]</ActionButton>
    </div>

    <div v-else-if="battleMenu === 'skill'">
      <div class="soe__menu-back" @click="$emit('set-menu', 'main')">
        &lt; กลับ / BACK
      </div>
      <div
        v-for="(skill, skillIndex) in currentMember.skills"
        :key="skill.name"
        class="soe__menu-item"
      >
        <ActionButton
          :disabled="currentMember.mp < skill.mp"
          :color="colors.purple"
          @click="$emit('select-skill', skill, skillIndex)"
        >
          {{ skill.name }} ({{ skill.mp }}MP) — {{ splitText(skill.desc).thai }}
          <span v-if="splitText(skill.desc).english" class="soe__button-note">
            / {{ splitText(skill.desc).english }}
          </span>
        </ActionButton>
      </div>
    </div>

    <div v-else-if="battleMenu === 'item'">
      <div class="soe__menu-back" @click="$emit('set-menu', 'main')">
        &lt; กลับ / BACK
      </div>
      <div v-if="availableInventory.length === 0" class="soe__empty-message">
        ไม่มีไอเทม
      </div>
      <div v-for="item in availableInventory" :key="item.id" class="soe__menu-item">
        <ActionButton :color="colors.green" @click="$emit('select-item', item)">
          {{ item.name }} x{{ item.count }} — {{ item.d }}
        </ActionButton>
      </div>
    </div>

    <div v-else-if="battleMenu === 'targetAlly'">
      <div class="soe__menu-back" @click="$emit('cancel-targeting')">
        &lt; ยกเลิก / CANCEL
      </div>
      <div v-for="(member, memberIndex) in party" :key="member.id" class="soe__menu-item">
        <ActionButton :color="member.color" @click="$emit('select-ally-target', memberIndex)">
          {{ member.e }} {{ member.name }} — HP:{{ member.hp }}/{{ member.mxHp }}
          {{ !member.alive ? " (KO)" : "" }}
        </ActionButton>
      </div>
    </div>

    <div v-else-if="battleMenu === 'target'" class="soe__target-prompt">
      👆 คลิกศัตรูด้านบน
      <span class="soe__target-cancel" @click="$emit('cancel-targeting')">ยกเลิก</span>
    </div>
  </div>
</template>

<script>
import ActionButton from "../ui/ActionButton.vue";

export default {
  name: "BattleActionMenu",
  components: { ActionButton },
  props: {
    availableInventory: { type: Array, required: true },
    battleMenu: { type: String, required: true },
    canAct: { type: Boolean, default: false },
    colors: { type: Object, required: true },
    currentMember: { type: Object, default: null },
    party: { type: Array, required: true },
  },
  emits: [
    "cancel-targeting",
    "defend",
    "select-ally-target",
    "select-item",
    "select-skill",
    "set-menu",
    "start-targeting",
  ],
  methods: {
    splitText(text) {
      const [thai, english] = String(text).split("\n//");
      return { thai, english };
    },
  },
};
</script>
