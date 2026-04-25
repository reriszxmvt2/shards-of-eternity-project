<template>
  <div v-if="visible" class="soe__shard-tracker" aria-label="Shards of Eternity">
    <div class="soe__shard-title">SHARDS</div>
    <div class="soe__shard-list">
      <span
        v-for="shard in catalog"
        :key="shard.id"
        :class="['soe__shard-chip', hasShard(shard.id) && 'soe__shard-chip--active']"
        :style="shardStyle(shard)"
        :title="`${shard.nameTh} / ${shard.name}`"
      >
        {{ shard.mark }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShardTracker",
  props: {
    catalog: { type: Array, required: true },
    shards: { type: Array, required: true },
    visible: { type: Boolean, default: true },
  },
  methods: {
    hasShard(shardId) {
      return this.shards.includes(shardId);
    },
    shardStyle(shard) {
      return {
        "--soe-shard-color": shard.color,
      };
    },
  },
};
</script>
