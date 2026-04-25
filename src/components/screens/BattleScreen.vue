<template>
  <div class="soe soe--battle">
    <div v-if="!battle" class="soe__loading">Loading...</div>
    <div v-else class="soe__screen soe__screen--battle">
      <div class="soe__battle-header">
        <div class="soe__battle-title">[ การต่อสู้ / BATTLE ]</div>
        <div class="soe__battle-gold">ทอง: {{ gold }}</div>
      </div>

      <div class="soe__enemy-grid">
        <EnemyCard
          v-for="(enemy, enemyIndex) in battle.enemies"
          :key="enemy.id"
          :colors="colors"
          :enemy="enemy"
          :index="enemyIndex"
          :is-targeting-enemy="isTargetingEnemy"
          @select="$emit('select-enemy-target', enemy, $event)"
        />
      </div>

      <BattleLog :lines="battleLog" />

      <div class="soe__battle-party">
        <PartyMemberCard
          v-for="(member, memberIndex) in party"
          :key="member.id"
          :colors="colors"
          :has-acted="actedPartyIndexes.includes(memberIndex)"
          :is-active="isActiveMember(memberIndex)"
          :member="member"
        />
      </div>

      <BattleActionMenu
        :available-inventory="availableInventory"
        :battle-menu="battleMenu"
        :can-act="canAct"
        :colors="colors"
        :current-member="currentMember"
        :party="party"
        @cancel-targeting="$emit('cancel-targeting')"
        @defend="$emit('defend')"
        @select-ally-target="$emit('select-ally-target', $event)"
        @select-item="$emit('select-item', $event)"
        @select-skill="(...args) => $emit('select-skill', ...args)"
        @set-menu="$emit('set-menu', $event)"
        @start-targeting="(...args) => $emit('start-targeting', ...args)"
      />

      <div v-if="battlePhase === 'enemy'" class="soe__phase-message soe__phase-message--enemy">
        เทิร์นศัตรู / ENEMY TURN...
      </div>
      <div v-if="battlePhase === 'victory'" class="soe__phase-message soe__phase-message--victory">
        <div class="soe__phase-title soe__phase-title--victory">
          ** ชนะ! / VICTORY! **
        </div>
        <div class="soe__phase-subtitle">กำลังดำเนินต่อ...</div>
      </div>
      <div v-if="battlePhase === 'defeat'" class="soe__phase-message soe__phase-message--defeat">
        <div class="soe__phase-title soe__phase-title--defeat">
          เกมจบ / GAME OVER
        </div>
        <ActionButton :color="colors.red" @click="$emit('reset')">
          กลับหน้าหลัก / RETURN TO TITLE
        </ActionButton>
      </div>
    </div>
  </div>
</template>

<script>
import BattleActionMenu from "../battle/BattleActionMenu.vue";
import BattleLog from "../battle/BattleLog.vue";
import EnemyCard from "../battle/EnemyCard.vue";
import PartyMemberCard from "../battle/PartyMemberCard.vue";
import ActionButton from "../ui/ActionButton.vue";

export default {
  name: "BattleScreen",
  components: {
    ActionButton,
    BattleActionMenu,
    BattleLog,
    EnemyCard,
    PartyMemberCard,
  },
  props: {
    actedPartyIndexes: { type: Array, required: true },
    availableInventory: { type: Array, required: true },
    battle: { type: Object, default: null },
    battleLog: { type: Array, required: true },
    battleMenu: { type: String, required: true },
    battlePhase: { type: String, required: true },
    canAct: { type: Boolean, default: false },
    colors: { type: Object, required: true },
    currentMember: { type: Object, default: null },
    gold: { type: Number, required: true },
    isTargetingEnemy: { type: Boolean, default: false },
    party: { type: Array, required: true },
    selectedPartyIndex: { type: Number, required: true },
  },
  emits: [
    "cancel-targeting",
    "defend",
    "reset",
    "select-ally-target",
    "select-enemy-target",
    "select-item",
    "select-skill",
    "set-menu",
    "start-targeting",
  ],
  methods: {
    isActiveMember(memberIndex) {
      return memberIndex === this.selectedPartyIndex && this.battlePhase === "player";
    },
  },
};
</script>
