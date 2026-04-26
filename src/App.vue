<template>
  <TitleScreen
    v-if="screen === SCREEN_IDS.title"
    :colors="COLORS"
    :visuals="GAME_VISUALS"
    @start="startGame"
  />

  <SceneScreen
    v-else-if="screen === SCREEN_IDS.scene"
    :colors="COLORS"
    :current-line="currentLine"
    :line-index="lineIndex"
    :party="party"
    :scene="scene"
    :scene-lines="sceneLines"
    @advance="advanceSceneLine"
  />

  <ChoiceScreen
    v-else-if="screen === SCREEN_IDS.choice"
    :choice-text="choiceText"
    :colors="COLORS"
    :scene="scene"
    @choose="handleChoice"
  />

  <ShopScreen
    v-else-if="screen === SCREEN_IDS.shop"
    :colors="COLORS"
    :gold="gold"
    :inventory="inventory"
    :party="party"
    :purchased-upgrades="purchasedUpgrades"
    :shop-items="SHOP_ITEMS"
    :shop-msg="shopMsg"
    @buy="handleBuyItem"
    @continue="continueFromShop"
  />

  <BattleScreen
    v-else-if="screen === SCREEN_IDS.battle"
    :acted-party-indexes="actedPartyIndexes"
    :available-inventory="availableInventory"
    :battle="battle"
    :battle-log="battleLog"
    :battle-menu="battleMenu"
    :battle-phase="battlePhase"
    :can-act="canAct"
    :colors="COLORS"
    :current-member="currentMember"
    :gold="gold"
    :is-targeting-enemy="isTargetingEnemy"
    :party="party"
    :selected-party-index="selectedPartyIndex"
    @cancel-targeting="cancelTargeting"
    @defend="handleDefendAction"
    @reset="resetGame"
    @select-ally-target="selectAllyTarget"
    @select-enemy-target="selectEnemyTarget"
    @select-item="selectItem"
    @select-skill="selectSkill"
    @set-menu="battleMenu = $event"
    @start-targeting="startTargeting"
  />

  <EndingScreen
    v-else-if="screen === SCREEN_IDS.ending"
    :colors="COLORS"
    :scene="scene"
    :story-flags="storyFlags"
    @reset="resetGame"
  />

  <div v-else class="soe">
    <div class="soe__loading">Loading...</div>
  </div>

  <ShardTracker
    :catalog="SHARDS"
    :shards="shards"
    :visible="screen !== SCREEN_IDS.title"
  />
  <button
    v-if="canShowExitButton"
    class="soe__exit-button"
    type="button"
    @click="resetGame"
  >
    ออก / EXIT
  </button>
  <div class="soe__credit">Natthaphong P. Phattanakit (Phetto)</div>
</template>

<script>
import "../shards_of_eternity.css";
import BattleScreen from "./components/screens/BattleScreen.vue";
import ChoiceScreen from "./components/screens/ChoiceScreen.vue";
import EndingScreen from "./components/screens/EndingScreen.vue";
import SceneScreen from "./components/screens/SceneScreen.vue";
import ShopScreen from "./components/screens/ShopScreen.vue";
import TitleScreen from "./components/screens/TitleScreen.vue";
import ShardTracker from "./components/ui/ShardTracker.vue";
import { battleComputed, battleMethods } from "./composables/useBattle";
import {
  createInitialGameState,
  gameFlowComputed,
  gameFlowMethods,
} from "./composables/useGameFlow";
import { shopMethods } from "./composables/useShop";
import { COLORS, GAME_VISUALS, SCREEN_IDS, SHARDS, SHOP_ITEMS } from "./gameData";

export default {
  name: "App",
  components: {
    BattleScreen,
    ChoiceScreen,
    EndingScreen,
    SceneScreen,
    ShardTracker,
    ShopScreen,
    TitleScreen,
  },
  data() {
    return {
      COLORS,
      GAME_VISUALS,
      SHARDS,
      SHOP_ITEMS,
      SCREEN_IDS,
      ...createInitialGameState(),
    };
  },
  computed: {
    ...gameFlowComputed,
    ...battleComputed,
    canShowExitButton() {
      return [
        SCREEN_IDS.scene,
        SCREEN_IDS.choice,
        SCREEN_IDS.shop,
        SCREEN_IDS.battle,
      ].includes(this.screen);
    },
  },
  methods: {
    ...gameFlowMethods,
    ...battleMethods,
    ...shopMethods,
    handleDefendAction() {
      this.handlePartyAction(this.selectedPartyIndex, "defend", null, null);
    },
  },
};
</script>
