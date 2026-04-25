import { BATTLES, createEnemiesFromKeys } from "../gameData";

export const battleComputed = {
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
};

export const battleMethods = {
  appendBattleLog(messages, previousLog = this.battleLog) {
    return [...previousLog, ...messages].filter(Boolean).slice(-8);
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
        const healedAmount =
          Math.min(targetMember.mxHp, targetMember.hp + 60) - targetMember.hp;
        nextParty[targetIndex] = { ...targetMember, hp: targetMember.hp + healedAmount };
        battleMessages.push(`ยาฟื้นฟู ${targetMember.name}: +${healedAmount} HP!`);
      } else if (selectedItem.id === "ether") {
        const restoredMana =
          Math.min(targetMember.mxMp, targetMember.mp + 40) - targetMember.mp;
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
};
