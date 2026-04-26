import { COLORS, SCENES, SHARDS_REQUIRED, createDefaultParty } from "../gameData";

const ENDING_SCENES = {
  happy: "end_happy_1",
  missingMercy: "end_bad_mercy",
  missingMemory: "end_bad_memory",
  missingSacrifice: "end_bad_sacrifice",
  missingShards: "end_bad_shards",
  partyBroken: "end_bad_party",
  vaelthornDead: "end_bad_vaelthorn",
};

const SCREENS_BY_SCENE_TYPE = {
  choice: "choice",
  ending: "ending",
  scene: "scene",
  shop: "shop",
};

const initialInventory = () => [
  { id: "potion", name: "ยาฟื้นฟู / HEALTH POTION", d: "ฟื้น HP 60", count: 2 },
];

const hasShard = (shards, shardId) => shards.includes(shardId);

const hasAllRequiredShards = (shards) =>
  SHARDS_REQUIRED.every((shardId) => hasShard(shards, shardId));

const getFinalEndingSceneId = ({ shards, storyFlags }) => {
  if (!storyFlags.spared) return ENDING_SCENES.vaelthornDead;
  if (!storyFlags.saved || !hasShard(shards, "mercy")) {
    return ENDING_SCENES.missingMercy;
  }
  if (storyFlags.partyBroken) return ENDING_SCENES.partyBroken;
  if (!hasShard(shards, "memory")) return ENDING_SCENES.missingMemory;
  if (!hasShard(shards, "sacrifice")) return ENDING_SCENES.missingSacrifice;
  if (!hasAllRequiredShards(shards)) return ENDING_SCENES.missingShards;
  return ENDING_SCENES.happy;
};

export const createInitialGameState = () => ({
  screen: "title",
  sceneId: "s_prologue",
  lineIndex: 0,
  party: [createDefaultParty()[0]],
  gold: 50,
  inventory: initialInventory(),
  shards: [],
  storyFlags: {},
  battle: null,
  battleLog: [],
  battlePhase: "player",
  actedPartyIndexes: [],
  selectedPartyIndex: 0,
  battleMenu: "main",
  pendingBattleAction: null,
  shopMsg: "",
  purchasedUpgrades: [],
});

export const gameFlowComputed = {
  scene() {
    return SCENES[this.sceneId] || {};
  },
  sceneLines() {
    return this.scene.lines || [];
  },
  currentLine() {
    const line = this.sceneLines[this.lineIndex] || [];
    const text = this.splitText(line[1] || "");
    return {
      speaker: line[0],
      thai: text.thai,
      english: text.english,
      color: line[2] || COLORS.white,
    };
  },
  choiceText() {
    return this.splitText(this.scene.text || "");
  },
};

export const gameFlowMethods = {
  splitText(text) {
    const [thai, english] = String(text).split("\n//");
    return { thai, english };
  },
  applyReward(reward) {
    if (!reward) return;

    if (reward.gold) {
      this.gold += reward.gold;
    }

    if (reward.items) {
      this.addItemsToInventory(reward.items);
    }

    if (reward.shards) {
      this.addShards(reward.shards);
    }
  },
  addItemsToInventory(items) {
    items.forEach((rewardItem) => {
      const existingItem = this.inventory.find(
        (inventoryItem) => inventoryItem.id === rewardItem.id,
      );

      if (existingItem) {
        existingItem.count += rewardItem.c;
        return;
      }

      this.inventory.push({
        id: rewardItem.id,
        name: rewardItem.name,
        d: rewardItem.d,
        count: rewardItem.c,
      });
    });
  },
  addShards(shardIds) {
    this.shards = [...new Set([...this.shards, ...shardIds])];
  },
  hasAllRequiredShards() {
    return hasAllRequiredShards(this.shards);
  },
  resolveFinalEnding() {
    this.navigateToScene(
      getFinalEndingSceneId({
        shards: this.shards,
        storyFlags: this.storyFlags,
      }),
    );
  },
  navigateToScene(targetSceneId) {
    const targetScene = SCENES[targetSceneId];
    if (!targetScene) return;

    this.sceneId = targetSceneId;
    this.lineIndex = 0;
    this.screen = SCREENS_BY_SCENE_TYPE[targetScene.t] || this.screen;
  },
  advanceSceneLine() {
    if (this.lineIndex < this.sceneLines.length - 1) {
      this.lineIndex += 1;
      return;
    }

    if (this.scene.reward) {
      this.applyReward(this.scene.reward);
    }

    if (this.scene.joinParty) {
      const currentParty = this.party;
      this.party = createDefaultParty().map((defaultMember) => {
        const existingMember = currentParty.find(
          (currentMember) => currentMember.id === defaultMember.id,
        );
        return existingMember ? { ...existingMember } : defaultMember;
      });
    }

    if (this.scene.battle) {
      this.initializeBattle(this.scene.battle);
    } else if (this.scene.next === "c_shop" || SCENES[this.scene.next]?.t === "shop") {
      this.screen = "shop";
    } else if (this.scene.next) {
      this.navigateToScene(this.scene.next);
    }
  },
  handleChoice(choice) {
    this.storyFlags = { ...this.storyFlags, [choice.flag]: true };
    if (choice.reward) {
      this.applyReward(choice.reward);
    }
    this.navigateToScene(choice.next);
  },
  resetGame() {
    Object.assign(this, createInitialGameState());
  },
};
