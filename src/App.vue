<template>
  <TitleScreen
    v-if="screen === 'title'"
    :colors="COLORS"
    :visuals="GAME_VISUALS"
    @start="screen = 'scene'"
  />

  <SceneScreen
    v-else-if="screen === 'scene'"
    :colors="COLORS"
    :current-line="currentLine"
    :line-index="lineIndex"
    :party="party"
    :scene="scene"
    :scene-lines="sceneLines"
    @advance="advanceSceneLine"
  />

  <ChoiceScreen
    v-else-if="screen === 'choice'"
    :choice-text="choiceText"
    :colors="COLORS"
    :scene="scene"
    @choose="handleChoice"
  />

  <ShopScreen
    v-else-if="screen === 'shop'"
    :colors="COLORS"
    :gold="gold"
    :inventory="inventory"
    :party="party"
    :purchased-upgrades="purchasedUpgrades"
    :shop-items="SHOP_ITEMS"
    :shop-msg="shopMsg"
    @buy="handleBuyItem"
    @continue="navigateToScene('s_act3')"
  />

  <BattleScreen
    v-else-if="screen === 'battle'"
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
    @defend="handlePartyAction(selectedPartyIndex, 'defend', null, null)"
    @reset="resetGame"
    @select-ally-target="selectAllyTarget"
    @select-enemy-target="selectEnemyTarget"
    @select-item="selectItem"
    @select-skill="selectSkill"
    @set-menu="battleMenu = $event"
    @start-targeting="startTargeting"
  />

  <EndingScreen
    v-else-if="screen === 'ending'"
    :colors="COLORS"
    :scene="scene"
    :story-flags="storyFlags"
    @reset="resetGame"
  />

  <div v-else class="soe">
    <div class="soe__loading">Loading...</div>
  </div>

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
import { battleComputed, battleMethods } from "./composables/useBattle";
import {
  createInitialGameState,
  gameFlowComputed,
  gameFlowMethods,
} from "./composables/useGameFlow";
import { shopMethods } from "./composables/useShop";
import { COLORS, GAME_VISUALS, SHOP_ITEMS } from "./gameData";

export default {
  name: "App",
  components: {
    BattleScreen,
    ChoiceScreen,
    EndingScreen,
    SceneScreen,
    ShopScreen,
    TitleScreen,
  },
  data() {
    return {
      COLORS,
      GAME_VISUALS,
      SHOP_ITEMS,
      ...createInitialGameState(),
    };
  },
  computed: {
    ...gameFlowComputed,
    ...battleComputed,
  },
  methods: {
    ...gameFlowMethods,
    ...battleMethods,
    ...shopMethods,
  },
};
</script>
