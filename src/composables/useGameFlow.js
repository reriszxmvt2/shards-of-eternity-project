import {
  COLORS,
  SCENES,
  SCENE_IDS,
  SCREEN_IDS,
  SHARDS_REQUIRED,
  createDefaultParty,
} from "../gameData";

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
  choice: SCREEN_IDS.choice,
  ending: SCREEN_IDS.ending,
  scene: SCREEN_IDS.scene,
  shop: SCREEN_IDS.shop,
};

const STORY_TEXT_SEPARATOR = "\n//";
const SAVE_KEY = "shards-of-eternity-save-v1";
const SAVE_VERSION = 1;

const createInitialInventory = () => [
  { id: "potion", name: "ยาฟื้นฟู / HEALTH POTION", d: "ฟื้น HP 60", count: 2 },
];

const createInitialParty = () => [createDefaultParty()[0]];

const createInitialQuestLog = () => ({
  current: null,
  completed: [],
});

const readSaveSlot = () => {
  if (typeof window === "undefined") return null;

  try {
    const rawSave = window.localStorage.getItem(SAVE_KEY);
    if (!rawSave) return null;

    const saveSlot = JSON.parse(rawSave);
    return saveSlot.version === SAVE_VERSION ? saveSlot : null;
  } catch {
    return null;
  }
};

const writeSaveSlot = (saveSlot) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SAVE_KEY, JSON.stringify(saveSlot));
};

const clearSaveSlot = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SAVE_KEY);
};

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
  screen: SCREEN_IDS.title,
  sceneId: SCENE_IDS.prologue,
  lineIndex: 0,
  party: createInitialParty(),
  gold: 50,
  inventory: createInitialInventory(),
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
  questLog: createInitialQuestLog(),
  isQuestLogOpen: false,
  saveMsg: "",
  saveSlot: readSaveSlot(),
  shownChapterSceneIds: [],
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
  currentSavePoint() {
    return this.screen === SCREEN_IDS.scene ? this.scene.savePoint || null : null;
  },
  canShowQuestButton() {
    return ![SCREEN_IDS.title, SCREEN_IDS.chapter].includes(this.screen);
  },
  canContinueSavedGame() {
    return Boolean(this.saveSlot);
  },
  saveSummary() {
    return this.saveSlot?.summary || null;
  },
};

export const gameFlowMethods = {
  splitText(text) {
    const [thai, english] = String(text).split(STORY_TEXT_SEPARATOR);
    return { thai, english };
  },
  startGame() {
    Object.assign(this, {
      ...createInitialGameState(),
      saveSlot: this.saveSlot,
    });
    this.navigateToScene(SCENE_IDS.prologue);
  },
  continueSavedGame() {
    const saveSlot = readSaveSlot();
    if (!saveSlot) {
      this.saveSlot = null;
      return;
    }

    const savedState = saveSlot.state;
    Object.assign(this, {
      ...createInitialGameState(),
      sceneId: savedState.sceneId,
      lineIndex: savedState.lineIndex,
      party: savedState.party,
      gold: savedState.gold,
      inventory: savedState.inventory,
      shards: savedState.shards,
      storyFlags: savedState.storyFlags,
      questLog: savedState.questLog || createInitialQuestLog(),
      purchasedUpgrades: savedState.purchasedUpgrades,
      shownChapterSceneIds: savedState.shownChapterSceneIds || [savedState.sceneId],
      saveSlot,
    });
    this.battle = null;
    this.battleLog = [];
    this.battlePhase = "player";
    this.actedPartyIndexes = [];
    this.selectedPartyIndex = 0;
    this.battleMenu = "main";
    this.pendingBattleAction = null;
    this.shopMsg = "";
    this.saveMsg = "โหลดเกมแล้ว / SAVE LOADED";
    this.isQuestLogOpen = false;
    this.screen = this.getScreenForScene(this.scene);
  },
  clearSavedGame() {
    clearSaveSlot();
    this.saveSlot = null;
    this.saveMsg = "";
  },
  continueFromShop() {
    this.navigateToScene(SCENE_IDS.act3);
  },
  hasMoreSceneLines() {
    return this.lineIndex < this.sceneLines.length - 1;
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
  addCompletedQuest(quest) {
    if (!quest) return;

    const completedIds = new Set(this.questLog.completed.map((item) => item.id));
    if (completedIds.has(quest.id)) return;

    this.questLog = {
      ...this.questLog,
      completed: [...this.questLog.completed, quest],
    };
  },
  applyQuestProgress(scene) {
    const questUpdate = scene.questUpdate || {};

    if (questUpdate.completeCurrent && this.questLog.current) {
      this.addCompletedQuest(this.questLog.current);
    }

    if (questUpdate.complete) {
      questUpdate.complete.forEach((quest) => this.addCompletedQuest(quest));
    }

    if (scene.objective || questUpdate.current) {
      this.questLog = {
        ...this.questLog,
        current: scene.objective || questUpdate.current,
      };
    } else if (questUpdate.clearCurrent) {
      this.questLog = {
        ...this.questLog,
        current: null,
      };
    }
  },
  getScreenForScene(scene) {
    return SCREENS_BY_SCENE_TYPE[scene.t] || this.screen;
  },
  shouldShowChapterIntro(targetSceneId, targetScene) {
    return Boolean(
      targetScene.chapter && !this.shownChapterSceneIds.includes(targetSceneId),
    );
  },
  continueFromChapter() {
    this.shownChapterSceneIds = [
      ...new Set([...this.shownChapterSceneIds, this.sceneId]),
    ];
    this.screen = this.getScreenForScene(this.scene);
  },
  toggleQuestLog() {
    this.isQuestLogOpen = !this.isQuestLogOpen;
  },
  closeQuestLog() {
    this.isQuestLogOpen = false;
  },
  saveGameAtPoint() {
    if (!this.currentSavePoint) return;

    const saveSlot = {
      version: SAVE_VERSION,
      savedAt: new Date().toISOString(),
      summary: {
        chapter: this.scene.chapter?.title || this.scene.title || "Aethoria",
        location: this.scene.location?.name || "Unknown path",
        objective: this.questLog.current?.title || "",
      },
      state: {
        sceneId: this.sceneId,
        lineIndex: this.lineIndex,
        party: this.party,
        gold: this.gold,
        inventory: this.inventory,
        shards: this.shards,
        storyFlags: this.storyFlags,
        questLog: this.questLog,
        purchasedUpgrades: this.purchasedUpgrades,
        shownChapterSceneIds: [
          ...new Set([...this.shownChapterSceneIds, this.sceneId]),
        ],
      },
    };

    writeSaveSlot(saveSlot);
    this.saveSlot = saveSlot;
    this.saveMsg = "บันทึกแล้ว / GAME SAVED";
    setTimeout(() => {
      this.saveMsg = "";
    }, 2200);
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
    this.applyQuestProgress(targetScene);
    this.isQuestLogOpen = false;
    this.screen = this.shouldShowChapterIntro(targetSceneId, targetScene)
      ? SCREEN_IDS.chapter
      : this.getScreenForScene(targetScene);
  },
  advanceSceneLine() {
    if (this.hasMoreSceneLines()) {
      this.lineIndex += 1;
      return;
    }

    this.completeCurrentScene();
  },
  completeCurrentScene() {
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
