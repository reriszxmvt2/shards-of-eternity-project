import { COLORS, SCENES, createDefaultParty } from "../gameData";

const initialInventory = () => [
  { id: "potion", name: "HEALTH POTION", d: "Restore 60 HP", count: 2 },
];

export const createInitialGameState = () => ({
  screen: "title",
  sceneId: "s_intro",
  lineIndex: 0,
  party: [createDefaultParty()[0]],
  gold: 50,
  inventory: initialInventory(),
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
      reward.items.forEach((rewardItem) => {
        const existingItem = this.inventory.find(
          (inventoryItem) => inventoryItem.id === rewardItem.id,
        );
        if (existingItem) {
          existingItem.count += rewardItem.c;
        } else {
          this.inventory.push({
            id: rewardItem.id,
            name: rewardItem.name,
            d: rewardItem.d,
            count: rewardItem.c,
          });
        }
      });
    }
  },
  navigateToScene(targetSceneId) {
    const targetScene = SCENES[targetSceneId];
    if (!targetScene) return;

    this.sceneId = targetSceneId;
    this.lineIndex = 0;

    if (targetScene.t === "scene") this.screen = "scene";
    else if (targetScene.t === "choice") this.screen = "choice";
    else if (targetScene.t === "ending") this.screen = "ending";
    else if (targetScene.t === "shop") this.screen = "shop";
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
