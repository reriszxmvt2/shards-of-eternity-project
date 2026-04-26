<template>
  <div v-if="visible" class="soe__quest-overlay" @click.self="$emit('close')">
    <div class="soe__quest-panel">
      <div class="soe__quest-header">
        <div>
          <div class="soe__quest-kicker">JOURNAL</div>
          <div class="soe__quest-title">Quest Log</div>
        </div>
        <button class="soe__quest-close" type="button" @click="$emit('close')">X</button>
      </div>

      <div class="soe__quest-section">
        <div class="soe__quest-section-title">Current Objective</div>
        <div v-if="questLog.current" class="soe__quest-current">
          <div class="soe__quest-item-title">{{ questLog.current.title }}</div>
          <div class="soe__quest-item-desc">{{ questLog.current.desc }}</div>
        </div>
        <div v-else class="soe__quest-empty">ไม่มีเป้าหมายปัจจุบัน / No active quest</div>
      </div>

      <div class="soe__quest-section">
        <div class="soe__quest-section-title">Completed</div>
        <div v-if="questLog.completed.length" class="soe__quest-list">
          <div
            v-for="quest in questLog.completed"
            :key="quest.id"
            class="soe__quest-completed"
          >
            <span>*</span>
            <div>
              <div class="soe__quest-item-title">{{ quest.title }}</div>
              <div class="soe__quest-item-desc">{{ quest.desc }}</div>
            </div>
          </div>
        </div>
        <div v-else class="soe__quest-empty">ยังไม่มีภารกิจที่เสร็จ / None yet</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestLog",
  props: {
    questLog: { type: Object, required: true },
    visible: { type: Boolean, default: false },
  },
  emits: ["close"],
};
</script>
