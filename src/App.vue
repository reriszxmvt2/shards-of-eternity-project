<template>
  <TitleScreen
    v-if="screen === 'title'"
    :colors="COLORS"
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
</template>

<script>
import "../shards_of_eternity.css";
import BattleScreen from "./components/screens/BattleScreen.vue";
import ChoiceScreen from "./components/screens/ChoiceScreen.vue";
import EndingScreen from "./components/screens/EndingScreen.vue";
import SceneScreen from "./components/screens/SceneScreen.vue";
import ShopScreen from "./components/screens/ShopScreen.vue";
import TitleScreen from "./components/screens/TitleScreen.vue";
import {
  BATTLES,
  COLORS,
  SCENES,
  SHOP_ITEMS,
  createDefaultParty,
  createEnemiesFromKeys,
} from "./gameData";

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
      SHOP_ITEMS,
      screen: "title",
      sceneId: "s_intro",
      lineIndex: 0,
      party: [createDefaultParty()[0]],
      gold: 50,
      inventory: [
        { id: "potion", name: "HEALTH POTION", d: "Restore 60 HP", count: 2 },
      ],
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
    };
  },
  computed: {
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
    currentMember() {
      return this.party[this.selectedPartyIndex];
    },
    canAct() {
      return (
        this.battlePhase === "player" &&
        this.currentMember &&
        this.currentMember.alive &&
        !this.actedPartyIndexes.includes(this.selectedPartyIndex)
      );
    },
    isTargetingEnemy() {
      return (
        this.battlePhase === "player" &&
        this.battleMenu === "target" &&
        Boolean(this.pendingBattleAction)
      );
    },
    availableInventory() {
      return this.inventory.filter((item) => item.count > 0);
    },
  },
  methods: {
    splitText(text) {
      const [thai, english] = String(text).split("\n//");
      return { thai, english };
    },
    appendBattleLog(messages, previousLog = this.battleLog) {
      return [...previousLog, ...messages].filter(Boolean).slice(-8);
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
    initializeBattle(battleKey) {
      const battleDefinition = BATTLES[battleKey];
      this.battle = {
        key: battleKey,
        enemies: createEnemiesFromKeys(battleDefinition.keys),
        def: battleDefinition,
      };

      const openingMessage = this.splitText(battleDefinition.msg);
      this.battleLog = [`>> ${openingMessage.thai}`];
      this.battlePhase = "player";
      this.actedPartyIndexes = [];
      this.selectedPartyIndex = 0;
      this.battleMenu = "main";
      this.pendingBattleAction = null;
      this.screen = "battle";
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
    calculateDamage(attackPower, attackBuff, skillMultiplier, defense) {
      return Math.max(
        1,
        Math.floor(
          (attackPower + (attackBuff || 0)) *
            skillMultiplier *
            (0.85 + Math.random() * 0.3),
        ) - Math.floor(defense * 0.4),
      );
    },
    startTargeting(action, skillIndex) {
      this.battleMenu = "target";
      this.pendingBattleAction = { action, skIdx: skillIndex };
    },
    cancelTargeting() {
      this.battleMenu = "main";
      this.pendingBattleAction = null;
    },
    selectSkill(skill, skillIndex) {
      if (this.currentMember.mp < skill.mp) {
        this.battleLog = this.appendBattleLog(["MP ไม่พอ!"]);
        return;
      }

      if (skill.type === "buff" || skill.tar === "all") {
        this.handlePartyAction(this.selectedPartyIndex, "skill", skillIndex, 0);
      } else if (skill.type === "heal") {
        this.battleMenu = "targetAlly";
        this.pendingBattleAction = { action: "skill", skIdx: skillIndex };
      } else {
        this.startTargeting("skill", skillIndex);
      }
    },
    selectItem(item) {
      this.battleMenu = "targetAlly";
      this.pendingBattleAction = {
        action: "item",
        skIdx: this.inventory.indexOf(item),
      };
    },
    selectEnemyTarget(enemy, enemyIndex) {
      if (!this.isTargetingEnemy || !enemy.alive) return;
      this.handlePartyAction(
        this.selectedPartyIndex,
        this.pendingBattleAction.action,
        this.pendingBattleAction.skIdx,
        enemyIndex,
      );
    },
    selectAllyTarget(memberIndex) {
      if (!this.pendingBattleAction) return;
      this.handlePartyAction(
        this.selectedPartyIndex,
        this.pendingBattleAction.action,
        this.pendingBattleAction.skIdx,
        memberIndex,
      );
    },
    handlePartyAction(memberIndex, actionType, skillIndex, targetIndex) {
      if (!this.battle) return;

      let nextParty = this.party.map((partyMember) => ({ ...partyMember }));
      let nextEnemies = this.battle.enemies.map((enemy) => ({ ...enemy }));
      const battleMessages = [];

      const actingMember = nextParty[memberIndex];
      if (!actingMember || !actingMember.alive) return;

      if (actionType === "attack") {
        const attackSkill = actingMember.skills[0];
        const targetEnemy = nextEnemies[targetIndex];
        if (targetEnemy && targetEnemy.alive) {
          const damage = this.calculateDamage(
            actingMember.atk,
            actingMember.buf,
            attackSkill.mult,
            targetEnemy.def,
          );
          const nextHp = Math.max(0, targetEnemy.hp - damage);
          nextEnemies[targetIndex] = { ...targetEnemy, hp: nextHp, alive: nextHp > 0 };
          battleMessages.push(
            `${actingMember.name} โจมตี ${targetEnemy.name}: ${damage} DMG!`,
          );
          if (nextHp <= 0) battleMessages.push(`${targetEnemy.name} พ่ายแพ้!`);
        }
      } else if (actionType === "skill") {
        const selectedSkill = actingMember.skills[skillIndex];
        if (!selectedSkill || actingMember.mp < selectedSkill.mp) {
          this.battleLog = this.appendBattleLog(["MP ไม่พอ!"]);
          this.battleMenu = "main";
          return;
        }

        nextParty[memberIndex] = {
          ...actingMember,
          mp: Math.max(0, actingMember.mp - selectedSkill.mp),
        };

        if (selectedSkill.type === "heal") {
          const targetMember = nextParty[targetIndex];
          if (targetMember) {
            const healedAmount =
              Math.min(targetMember.mxHp, targetMember.hp + selectedSkill.healAmt) -
              targetMember.hp;
            nextParty[targetIndex] = {
              ...targetMember,
              hp: targetMember.hp + healedAmount,
            };
            battleMessages.push(
              `${actingMember.name} รักษา ${targetMember.name}: +${healedAmount} HP!`,
            );
          }
        } else if (selectedSkill.type === "buff") {
          nextParty = nextParty.map((partyMember) => ({
            ...partyMember,
            buf: (partyMember.buf || 0) + selectedSkill.bufAmt,
            bufT: selectedSkill.bufT,
          }));
          battleMessages.push(`WAR CRY! ATK ทุกคน +${selectedSkill.bufAmt}!`);
        } else if (selectedSkill.tar === "all") {
          nextEnemies = nextEnemies.map((enemy) => {
            if (!enemy.alive) return enemy;
            const damage = this.calculateDamage(
              nextParty[memberIndex].atk,
              nextParty[memberIndex].buf,
              selectedSkill.mult,
              enemy.def,
            );
            const nextHp = Math.max(0, enemy.hp - damage);
            battleMessages.push(`${selectedSkill.name} โจมตี ${enemy.name}: ${damage}!`);
            if (nextHp <= 0) battleMessages.push(`${enemy.name} พ่ายแพ้!`);
            return { ...enemy, hp: nextHp, alive: nextHp > 0 };
          });
        } else {
          const targetEnemy = nextEnemies[targetIndex];
          if (targetEnemy && targetEnemy.alive) {
            const damage = this.calculateDamage(
              nextParty[memberIndex].atk,
              nextParty[memberIndex].buf,
              selectedSkill.mult,
              targetEnemy.def,
            );
            const nextHp = Math.max(0, targetEnemy.hp - damage);
            nextEnemies[targetIndex] = { ...targetEnemy, hp: nextHp, alive: nextHp > 0 };
            battleMessages.push(
              `${selectedSkill.name} โจมตี ${targetEnemy.name}: ${damage}!`,
            );
            if (nextHp <= 0) battleMessages.push(`${targetEnemy.name} พ่ายแพ้!`);
            if (selectedSkill.poison && nextEnemies[targetIndex].alive) {
              nextEnemies[targetIndex] = {
                ...nextEnemies[targetIndex],
                poison: true,
                poisonT: 3,
              };
              battleMessages.push(`${targetEnemy.name} ถูกวางยาพิษ!`);
            }
            if (selectedSkill.stun && nextEnemies[targetIndex].alive) {
              nextEnemies[targetIndex] = {
                ...nextEnemies[targetIndex],
                stunned: true,
              };
              battleMessages.push(`${targetEnemy.name} งัก!`);
            }
          }
        }
      } else if (actionType === "item") {
        const selectedItem = this.inventory[skillIndex];
        if (!selectedItem || selectedItem.count <= 0) {
          this.battleMenu = "main";
          return;
        }

        const targetMember = nextParty[targetIndex];
        if (!targetMember) {
          this.battleMenu = "main";
          return;
        }

        if (selectedItem.id === "potion") {
          const healedAmount = Math.min(targetMember.mxHp, targetMember.hp + 60) - targetMember.hp;
          nextParty[targetIndex] = { ...targetMember, hp: targetMember.hp + healedAmount };
          battleMessages.push(`ยาฟื้นฟู ${targetMember.name}: +${healedAmount} HP!`);
        } else if (selectedItem.id === "ether") {
          const restoredMana = Math.min(targetMember.mxMp, targetMember.mp + 40) - targetMember.mp;
          nextParty[targetIndex] = { ...targetMember, mp: targetMember.mp + restoredMana };
          battleMessages.push(`Ether ${targetMember.name}: +${restoredMana} MP!`);
        } else if (selectedItem.id === "revive" && !targetMember.alive) {
          nextParty[targetIndex] = {
            ...targetMember,
            alive: true,
            hp: Math.floor(targetMember.mxHp * 0.5),
          };
          battleMessages.push(`ฟื้นคืนชีพ ${targetMember.name}!`);
        }

        this.inventory = this.inventory.map((inventoryItem) =>
          inventoryItem.id === selectedItem.id
            ? { ...inventoryItem, count: Math.max(0, inventoryItem.count - 1) }
            : inventoryItem,
        );
      } else if (actionType === "defend") {
        nextParty[memberIndex] = { ...actingMember, defending: true };
        battleMessages.push(`${actingMember.name} ตั้งรับ!`);
      }

      const nextActedPartyIndexes = [...this.actedPartyIndexes, memberIndex];
      this.actedPartyIndexes = nextActedPartyIndexes;
      this.battle = { ...this.battle, enemies: nextEnemies };
      this.party = nextParty;
      this.battleLog = this.appendBattleLog(battleMessages);
      this.battleMenu = "main";
      this.pendingBattleAction = null;

      if (nextEnemies.every((enemy) => !enemy.alive)) {
        const totalGoldReward = this.battle.enemies.reduce(
          (sum, enemy) => sum + enemy.gold,
          0,
        );
        const totalExpReward = this.battle.enemies.reduce(
          (sum, enemy) => sum + enemy.xp,
          0,
        );
        const completedBattle = { ...this.battle };
        this.gold += totalGoldReward;
        setTimeout(() => {
          this.battleLog = this.appendBattleLog([
            `ชนะ! +${totalGoldReward} ทอง!`,
            totalExpReward > 0 ? `ปาร์ตี้ได้ ${totalExpReward} EXP!` : "",
          ]);
          this.battlePhase = "victory";
          setTimeout(() => {
            if (completedBattle.key === "b3") {
              this.navigateToScene(
                this.storyFlags.saved ? "c_merchant_twist" : "ch_vaelthorn",
              );
            } else {
              this.navigateToScene(completedBattle.def.after);
            }
          }, 2200);
        }, 300);
        return;
      }

      const alivePartyIndexes = nextParty
        .map((partyMember, partyMemberIndex) =>
          partyMember.alive ? partyMemberIndex : -1,
        )
        .filter((partyMemberIndex) => partyMemberIndex >= 0);
      const waitingPartyIndexes = alivePartyIndexes.filter(
        (partyMemberIndex) => !nextActedPartyIndexes.includes(partyMemberIndex),
      );

      if (waitingPartyIndexes.length > 0) {
        this.selectedPartyIndex = waitingPartyIndexes[0];
        this.battleMenu = "main";
      } else {
        this.battlePhase = "enemy";
        setTimeout(() => this.handleEnemyTurn(nextParty, nextEnemies), 600);
      }
    },
    handleEnemyTurn(partySnapshot, enemySnapshot) {
      let nextParty = partySnapshot.map((partyMember) => ({
        ...partyMember,
        defending: false,
      }));
      let nextEnemies = enemySnapshot.map((enemy) => ({ ...enemy }));
      const battleMessages = [];

      nextEnemies = nextEnemies.map((enemy) => {
        if (!enemy.alive) return enemy;
        if (enemy.poison && enemy.poisonT > 0) {
          const poisonDamage = 8;
          const nextHp = Math.max(0, enemy.hp - poisonDamage);
          battleMessages.push(`${enemy.name} รับพิษ ${poisonDamage}!`);
          return {
            ...enemy,
            hp: nextHp,
            alive: nextHp > 0,
            poisonT: enemy.poisonT - 1,
            poison: enemy.poisonT > 1,
          };
        }
        return enemy;
      });

      nextEnemies.forEach((enemy) => {
        if (!enemy.alive) return;
        if (enemy.stunned) {
          battleMessages.push(`${enemy.name} งัก! ข้ามเทิร์น`);
          return;
        }

        const alivePartyMembers = nextParty.filter((partyMember) => partyMember.alive);
        if (!alivePartyMembers.length) return;

        const targetMember =
          alivePartyMembers[Math.floor(Math.random() * alivePartyMembers.length)];
        const targetMemberIndex = nextParty.findIndex(
          (partyMember) => partyMember.id === targetMember.id,
        );

        if (enemy.boss && Math.random() < 0.35) {
          const specialAttack = ["ไฟมังกร", "ฟาดหาง", "คำรามโบราณ"][
            Math.floor(Math.random() * 3)
          ];
          if (specialAttack === "ไฟมังกร") {
            nextParty = nextParty.map((partyMember) => {
              if (!partyMember.alive) return partyMember;
              const damage = Math.max(
                1,
                Math.floor(enemy.atk * 0.55 * (0.8 + Math.random() * 0.4)) -
                  Math.floor(partyMember.def * 0.3),
              );
              const nextHp = Math.max(0, partyMember.hp - damage);
              battleMessages.push(`ไฟมังกร! ${partyMember.name}: ${damage}!`);
              return { ...partyMember, hp: nextHp, alive: nextHp > 0 };
            });
            return;
          }

          const damage = Math.max(
            1,
            Math.floor(enemy.atk * 1.4 * (0.85 + Math.random() * 0.3)) -
              Math.floor(targetMember.def * 0.4),
          );
          const nextHp = Math.max(0, targetMember.hp - damage);
          nextParty[targetMemberIndex] = {
            ...nextParty[targetMemberIndex],
            hp: nextHp,
            alive: nextHp > 0,
          };
          battleMessages.push(
            `${enemy.name} ${specialAttack} โจมตี ${targetMember.name}: ${damage}!`,
          );
          if (!nextParty[targetMemberIndex].alive) {
            battleMessages.push(`${targetMember.name} ล้มลง!`);
          }
          return;
        }

        const defense = targetMember.defending ? targetMember.def * 2 : targetMember.def;
        const damage = Math.max(
          1,
          Math.floor(enemy.atk * (0.85 + Math.random() * 0.3)) -
            Math.floor(defense * 0.4),
        );
        const nextHp = Math.max(0, targetMember.hp - damage);
        nextParty[targetMemberIndex] = {
          ...nextParty[targetMemberIndex],
          hp: nextHp,
          alive: nextHp > 0,
        };
        battleMessages.push(`${enemy.name} โจมตี ${targetMember.name}: ${damage} DMG!`);
        if (!nextParty[targetMemberIndex].alive) {
          battleMessages.push(`${targetMember.name} ล้มลง!`);
        }
      });

      nextEnemies = nextEnemies.map((enemy) => ({ ...enemy, stunned: false }));
      nextParty = nextParty.map((partyMember) => ({
        ...partyMember,
        bufT: Math.max(0, (partyMember.bufT || 0) - 1),
        buf: (partyMember.bufT || 0) > 1 ? partyMember.buf : 0,
      }));
      this.battle = { ...this.battle, enemies: nextEnemies };
      this.party = nextParty;
      this.battleLog = this.appendBattleLog(battleMessages);

      if (!nextParty.some((partyMember) => partyMember.alive)) {
        this.battlePhase = "defeat";
        return;
      }

      setTimeout(() => {
        this.actedPartyIndexes = [];
        const firstAliveMemberIndex = nextParty.findIndex(
          (partyMember) => partyMember.alive,
        );
        this.selectedPartyIndex =
          firstAliveMemberIndex >= 0 ? firstAliveMemberIndex : 0;
        this.battleMenu = "main";
        this.battlePhase = "player";
      }, 500);
    },
    handleBuyItem(shopItem) {
      if (this.gold < shopItem.price) {
        this.flashShopMessage("ทองไม่พอ!");
        return;
      }

      if (shopItem.type === "upgrade") {
        if (this.purchasedUpgrades.includes(shopItem.id)) {
          this.flashShopMessage("อัพเกรดแล้ว!");
          return;
        }

        this.purchasedUpgrades = [...this.purchasedUpgrades, shopItem.id];
        this.party = this.party.map((partyMember) =>
          partyMember.id === shopItem.target
            ? { ...partyMember, atk: partyMember.atk + shopItem.amt }
            : partyMember,
        );
      } else {
        const existingItem = this.inventory.find(
          (inventoryItem) => inventoryItem.id === shopItem.id,
        );
        if (existingItem) {
          existingItem.count += 1;
        } else {
          this.inventory.push({
            id: shopItem.id,
            name: shopItem.name,
            d: shopItem.d,
            count: 1,
          });
        }
      }

      this.gold -= shopItem.price;
      this.flashShopMessage("ซื้อแล้ว!");
    },
    flashShopMessage(message) {
      this.shopMsg = message;
      setTimeout(() => {
        this.shopMsg = "";
      }, 2000);
    },
    resetGame() {
      this.screen = "title";
      this.sceneId = "s_intro";
      this.lineIndex = 0;
      this.party = [createDefaultParty()[0]];
      this.gold = 50;
      this.inventory = [
        { id: "potion", name: "HEALTH POTION", d: "Restore 60 HP", count: 2 },
      ];
      this.storyFlags = {};
      this.battle = null;
      this.battleLog = [];
      this.purchasedUpgrades = [];
      this.battlePhase = "player";
      this.actedPartyIndexes = [];
      this.selectedPartyIndex = 0;
      this.battleMenu = "main";
      this.pendingBattleAction = null;
    },
  },
};
</script>
