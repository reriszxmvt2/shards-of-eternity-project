<template>
  <div v-if="screen === 'title'" class="soe">
    <div class="soe__screen soe__screen--title">
      <div class="soe__title-stars">{{ "* ".repeat(16) }}</div>
      <div class="soe__title-kicker">AN 8-BIT LEGEND</div>
      <div class="soe__title-main">SHARDS OF</div>
      <div class="soe__title-sub">ETERNITY</div>
      <div class="soe__title-thai">ชิ้นส่วนแห่งนิรันดร์</div>
      <div class="soe__title-lore">
        อาณาจักรล่มสลาย มังกรถูกจองจำ
        <br />
        <span class="soe__title-lore-note">
          A kingdom fallen. A dragon enslaved.
        </span>
      </div>
      <div class="soe__title-party">[W] [M] [A]</div>
      <ActionButton :color="COLORS.gold" @click="screen = 'scene'">
        &gt;&gt; เริ่มเกม / PRESS START
      </ActionButton>
      <div class="soe__title-meta">
        นักรบ / นักเวทย์ / นักธนู · ต่อสู้ผลัดเทิร์น
        <br />
        เนื้อเรื่องสองทาง · สองตอนจบ · ทุกการเลือกมีความหมาย
        <br />
        <span class="soe__title-meta-note">
          Every choice echoes. Every mercy counts.
        </span>
      </div>
    </div>
  </div>

  <div v-else-if="screen === 'scene'" class="soe" @click="advanceSceneLine">
    <div class="soe__screen soe__screen--scene">
      <div v-if="scene.title" class="soe__scene-title">
        {{ scene.title }}
      </div>
      <div class="soe__panel soe__panel--scene">
        <div v-if="currentLine.speaker" class="soe__scene-speaker">
          [{{ currentLine.speaker }}]
        </div>
        <div class="soe__scene-body">
          <div class="soe__scene-text" :style="textColorStyle(currentLine.color)">
            {{ currentLine.thai }}
          </div>
          <div v-if="currentLine.english" class="soe__scene-translation">
            {{ currentLine.english }}
          </div>
        </div>
        <div class="soe__scene-progress">
          {{ lineIndex + 1 }}/{{ sceneLines.length }} &gt;
        </div>
      </div>
      <div class="soe__party-strip">
        <div
          v-for="member in party"
          :key="member.id"
          class="soe__party-chip"
          :style="partyStyle(member, '44')"
        >
          {{ member.e }} {{ member.name }}
          <StatusBar :v="member.hp" :max="member.mxHp" :color="COLORS.hp" :w="50" />
          <span class="soe__muted"> {{ member.hp }}</span>
        </div>
      </div>
      <div class="soe__continue-hint">
        — คลิกเพื่อดำเนินต่อ / CLICK TO CONTINUE —
      </div>
    </div>
  </div>

  <div v-else-if="screen === 'choice'" class="soe">
    <div class="soe__screen soe__screen--choice">
      <div class="soe__choice-title">
        ── การตัดสินใจของคุณ / YOUR CHOICE ──
      </div>
      <div class="soe__panel soe__panel--gold soe__choice-panel">
        <div class="soe__choice-text">{{ choiceText.thai }}</div>
        <div v-if="choiceText.english" class="soe__choice-translation">
          {{ choiceText.english }}
        </div>
      </div>
      <div class="soe__choice-list">
        <ActionButton
          v-for="choice in scene.choices || []"
          :key="choice.text"
          :color="COLORS.blue"
          @click="handleChoice(choice)"
        >
          {{ choice.text }}
        </ActionButton>
      </div>
    </div>
  </div>

  <div v-else-if="screen === 'shop'" class="soe">
    <div class="soe__screen soe__screen--shop">
      <div class="soe__shop-header">
        <div class="soe__shop-title">ร้านค้าค่ายต่อต้าน / RESISTANCE CAMP SHOP</div>
        <div class="soe__shop-gold">ทอง / GOLD: {{ gold }}</div>
      </div>
      <div class="soe__shop-party">
        <div
          v-for="member in party"
          :key="member.id"
          class="soe__shop-member"
          :style="partyStyle(member, '55')"
        >
          {{ member.e }} {{ member.name }}<br />
          <span class="soe__stat-label">HP </span>
          <StatusBar :v="member.hp" :max="member.mxHp" :color="COLORS.hp" :w="52" />
          <br />
          <span class="soe__stat-label">MP </span>
          <StatusBar :v="member.mp" :max="member.mxMp" :color="COLORS.mp" :w="52" />
          <br />
          <span class="soe__shop-atk">ATK:{{ member.atk }}</span>
        </div>
      </div>
      <div class="soe__panel">
        <div v-for="item in SHOP_ITEMS" :key="item.id" class="soe__shop-item">
          <div>
            <div
              :class="[
                'soe__shop-item-name',
                isUpgradeOwned(item) && 'soe__shop-item-name--owned',
              ]"
            >
              {{ item.name }}
            </div>
            <div class="soe__shop-item-desc">{{ item.d }}</div>
          </div>
          <ActionButton
            small
            :disabled="isUpgradeOwned(item) || gold < item.price"
            :color="shopButtonColor(item)"
            @click="handleBuyItem(item)"
          >
            {{ isUpgradeOwned(item) ? "ซื้อแล้ว" : `${item.price}G` }}
          </ActionButton>
        </div>
      </div>
      <div v-if="shopMsg" class="soe__shop-message">{{ shopMsg }}</div>
      <div class="soe__inventory-summary">ไอเทม: {{ inventorySummary }}</div>
      <ActionButton :color="COLORS.gold" @click="navigateToScene('s_act3')">
        &gt;&gt; มุ่งหน้าถ้ำ Vaelthorn
      </ActionButton>
    </div>
  </div>

  <div v-else-if="screen === 'battle'" class="soe soe--battle">
    <div v-if="!battle" class="soe__loading">Loading...</div>
    <div v-else class="soe__screen soe__screen--battle">
      <div class="soe__battle-header">
        <div class="soe__battle-title">[ การต่อสู้ / BATTLE ]</div>
        <div class="soe__battle-gold">ทอง: {{ gold }}</div>
      </div>
      <div class="soe__enemy-grid">
        <div
          v-for="(enemy, enemyIndex) in battle.enemies"
          :key="enemy.id"
          :class="enemyCardClass(enemy)"
          :style="enemyStyle(enemy)"
          @click="selectEnemyTarget(enemy, enemyIndex)"
        >
          <div :class="['soe__enemy-icon', enemy.boss && 'soe__enemy-icon--boss']">
            {{ enemy.e }}
          </div>
          <div :class="['soe__enemy-name', enemy.boss && 'soe__enemy-name--boss']">
            {{ enemy.name }}
          </div>
          <StatusBar
            :v="enemy.hp"
            :max="enemy.mxHp"
            :color="COLORS.hp"
            :w="enemy.boss ? 90 : 62"
          />
          <div :class="['soe__enemy-hp', !enemy.alive && 'soe__enemy-hp--defeated']">
            {{ enemy.alive ? `${enemy.hp}/${enemy.mxHp}` : "พ่ายแพ้" }}
          </div>
          <div v-if="enemy.boss && enemy.alive" class="soe__enemy-badge">★ BOSS</div>
          <div
            v-if="enemy.poison && enemy.alive"
            class="soe__enemy-status soe__enemy-status--poison"
          >
            ถูกพิษ
          </div>
          <div
            v-if="enemy.stunned && enemy.alive"
            class="soe__enemy-status soe__enemy-status--stunned"
          >
            งัก!
          </div>
          <div v-if="isTargetingEnemy && enemy.alive" class="soe__enemy-click-hint">
            [คลิก]
          </div>
        </div>
      </div>

      <div ref="logRef" class="soe__panel soe__battle-log">
        <div
          v-for="(line, index) in battleLog"
          :key="`${line}-${index}`"
          :class="[
            'soe__battle-log-line',
            index === battleLog.length - 1 && 'soe__battle-log-line--latest',
          ]"
        >
          {{ line }}
        </div>
      </div>

      <div class="soe__battle-party">
        <div
          v-for="(member, memberIndex) in party"
          :key="member.id"
          :class="battleMemberClass(member, memberIndex)"
          :style="battleMemberStyle(member, memberIndex)"
        >
          <div class="soe__battle-member-row">
            <span
              :class="[
                'soe__battle-member-name',
                isActiveMember(memberIndex) && 'soe__battle-member-name--active',
              ]"
            >
              {{ member.e }} {{ member.name }}
            </span>
            <span :class="battleMemberStateClass(member, memberIndex)">
              {{ !member.alive ? "KO" : actedPartyIndexes.includes(memberIndex) ? "OK" : "--" }}
            </span>
          </div>
          <div class="soe__battle-member-class">{{ member.cls }}</div>
          <div class="soe__battle-member-stat soe__battle-member-stat--hp">
            <span class="soe__muted">HP </span>
            <StatusBar :v="member.hp" :max="member.mxHp" :color="COLORS.hp" :w="52" />
            <span
              :class="[
                'soe__battle-member-value',
                member.hp < member.mxHp * 0.3 && 'soe__battle-member-value--danger',
              ]"
            >
              {{ member.hp }}
            </span>
          </div>
          <div class="soe__battle-member-stat">
            <span class="soe__muted">MP </span>
            <StatusBar :v="member.mp" :max="member.mxMp" :color="COLORS.mp" :w="52" />
            <span class="soe__battle-member-value"> {{ member.mp }}</span>
          </div>
          <div v-if="member.buf > 0" class="soe__battle-member-buff">
            ATK+{{ member.buf }}({{ member.bufT }}T)
          </div>
        </div>
      </div>

      <div v-if="canAct" class="soe__panel soe__panel--gold">
        <div class="soe__action-title">
          {{ currentMember.e }} {{ currentMember.name }} — เทิร์นของคุณ
          {{ battleMenu === "target" ? " — คลิกศัตรูด้านบน" : "" }}
          {{ battleMenu === "targetAlly" ? " — เลือกพันธมิตร" : "" }}
        </div>

        <div v-if="battleMenu === 'main'" class="soe__action-grid">
          <ActionButton @click="startTargeting('attack', 0)">[ โจมตี / ATTACK ]</ActionButton>
          <ActionButton @click="battleMenu = 'skill'">[ สกิล / SKILL ]</ActionButton>
          <ActionButton @click="battleMenu = 'item'">[ ไอเทม / ITEM ]</ActionButton>
          <ActionButton @click="handlePartyAction(selectedPartyIndex, 'defend', null, null)">
            [ ตั้งรับ / DEFEND ]
          </ActionButton>
        </div>

        <div v-else-if="battleMenu === 'skill'">
          <div class="soe__menu-back" @click="battleMenu = 'main'">
            &lt; กลับ / BACK
          </div>
          <div v-for="(skill, skillIndex) in currentMember.skills" :key="skill.name" class="soe__menu-item">
            <ActionButton
              :disabled="currentMember.mp < skill.mp"
              :color="COLORS.purple"
              @click="selectSkill(skill, skillIndex)"
            >
              {{ skill.name }} ({{ skill.mp }}MP) — {{ splitText(skill.desc).thai }}
              <span v-if="splitText(skill.desc).english" class="soe__button-note">
                / {{ splitText(skill.desc).english }}
              </span>
            </ActionButton>
          </div>
        </div>

        <div v-else-if="battleMenu === 'item'">
          <div class="soe__menu-back" @click="battleMenu = 'main'">
            &lt; กลับ / BACK
          </div>
          <div v-if="availableInventory.length === 0" class="soe__empty-message">
            ไม่มีไอเทม
          </div>
          <div v-for="item in availableInventory" :key="item.id" class="soe__menu-item">
            <ActionButton :color="COLORS.green" @click="selectItem(item)">
              {{ item.name }} x{{ item.count }} — {{ item.d }}
            </ActionButton>
          </div>
        </div>

        <div v-else-if="battleMenu === 'targetAlly'">
          <div class="soe__menu-back" @click="cancelTargeting">
            &lt; ยกเลิก / CANCEL
          </div>
          <div v-for="(member, memberIndex) in party" :key="member.id" class="soe__menu-item">
            <ActionButton :color="member.color" @click="selectAllyTarget(memberIndex)">
              {{ member.e }} {{ member.name }} — HP:{{ member.hp }}/{{ member.mxHp }}
              {{ !member.alive ? " (KO)" : "" }}
            </ActionButton>
          </div>
        </div>

        <div v-else-if="battleMenu === 'target'" class="soe__target-prompt">
          👆 คลิกศัตรูด้านบน
          <span class="soe__target-cancel" @click="cancelTargeting">ยกเลิก</span>
        </div>
      </div>

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
        <ActionButton :color="COLORS.red" @click="resetGame">
          กลับหน้าหลัก / RETURN TO TITLE
        </ActionButton>
      </div>
    </div>
  </div>

  <div v-else-if="screen === 'ending'" class="soe">
    <div class="soe__screen soe__screen--ending">
      <div class="soe__ending-title" :style="endingTitleStyle">
        {{ scene.title }}
      </div>
      <div class="soe__ending-panel" :style="endingPanelStyle">
        <div v-for="(line, index) in scene.lines || []" :key="index" class="soe__ending-line">
          <div class="soe__ending-text" :style="textColorStyle(line[2] || COLORS.white)">
            {{ splitText(line[1] || '').thai }}
          </div>
          <div v-if="splitText(line[1] || '').english" class="soe__ending-translation">
            {{ splitText(line[1] || '').english }}
          </div>
        </div>
      </div>
      <div class="soe__ending-note">
        {{
          storyFlags.spared
            ? "เพชรโตะ เลือกเมตตา — ชีวิตหนึ่งที่ช่วยไว้ เปลี่ยนอีกหลายชีวิต"
            : "ราคาของการแก้แค้น คือคำถามที่ไม่มีวันจางหาย"
        }}
      </div>
      <ActionButton :color="COLORS.gold" @click="resetGame">
        &gt;&gt; เล่นอีกครั้ง / PLAY AGAIN
      </ActionButton>
    </div>
  </div>

  <div v-else class="soe">
    <div class="soe__loading">Loading...</div>
  </div>
</template>

<script>
import { h } from "vue";
import "../shards_of_eternity.css";
import {
  BATTLES,
  COLORS,
  SCENES,
  SHOP_ITEMS,
  createDefaultParty,
  createEnemiesFromKeys,
} from "./gameData";

const StatusBar = {
  name: "StatusBar",
  props: {
    v: { type: Number, required: true },
    max: { type: Number, required: true },
    color: { type: String, required: true },
    w: { type: Number, default: 80 },
  },
  computed: {
    percent() {
      return Math.max(0, Math.min(100, (this.v / this.max) * 100));
    },
  },
  render() {
    return h(
      "div",
      {
        class: "soe__status-bar",
        style: { "--soe-status-width": `${this.w}px` },
      },
      [
        h("div", {
          class: "soe__status-fill",
          style: {
            "--soe-status-fill": this.color,
            "--soe-status-percent": `${this.percent}%`,
          },
        }),
      ],
    );
  },
};

const ActionButton = {
  name: "ActionButton",
  props: {
    color: { type: String, default: COLORS.border },
    disabled: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
  },
  emits: ["click"],
  render() {
    return h(
      "button",
      {
        class: ["soe__button", this.small && "soe__button--small"],
        disabled: this.disabled,
        style: { "--soe-button-border": this.color },
        onClick: () => this.$emit("click"),
      },
      this.$slots.default?.(),
    );
  },
};

export default {
  name: "App",
  components: { ActionButton, StatusBar },
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
    inventorySummary() {
      return (
        this.availableInventory
          .map((item) => `${item.name} x${item.count}`)
          .join(" · ") || "ว่างเปล่า"
      );
    },
    endingTitleStyle() {
      return {
        "--soe-ending-color": this.scene.titleColor,
        "--soe-ending-shadow": `0 0 14px ${this.scene.titleColor}55`,
      };
    },
    endingPanelStyle() {
      return {
        "--soe-ending-color": this.scene.titleColor,
        "--soe-ending-panel-shadow": `0 0 16px ${this.scene.titleColor}22`,
      };
    },
  },
  watch: {
    battleLog() {
      this.$nextTick(() => {
        if (this.$refs.logRef) {
          this.$refs.logRef.scrollTop = this.$refs.logRef.scrollHeight;
        }
      });
    },
  },
  methods: {
    splitText(text) {
      const [thai, english] = String(text).split("\n//");
      return { thai, english };
    },
    textColorStyle(color) {
      return { "--soe-text-color": color };
    },
    partyStyle(member, opacity) {
      return {
        "--soe-party-color": member.color,
        "--soe-party-border": `${member.color}${opacity}`,
      };
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
    isUpgradeOwned(item) {
      return item.type === "upgrade" && this.purchasedUpgrades.includes(item.id);
    },
    shopButtonColor(item) {
      if (this.isUpgradeOwned(item)) return COLORS.gray;
      return this.gold >= item.price ? COLORS.green : COLORS.red;
    },
    isActiveMember(memberIndex) {
      return memberIndex === this.selectedPartyIndex && this.battlePhase === "player";
    },
    enemyCardClass(enemy) {
      return [
        "soe__enemy-card",
        enemy.boss && "soe__enemy-card--boss",
        !enemy.alive && "soe__enemy-card--defeated",
        this.isTargetingEnemy && enemy.alive && "soe__enemy-card--targetable",
      ];
    },
    enemyStyle(enemy) {
      return {
        "--soe-enemy-color": enemy.color,
        "--soe-enemy-border": enemy.alive
          ? this.isTargetingEnemy
            ? COLORS.red
            : enemy.color
          : "#222244",
        "--soe-enemy-shadow": enemy.boss && enemy.alive ? `0 0 18px ${enemy.color}44` : "none",
      };
    },
    battleMemberClass(member, memberIndex) {
      return [
        "soe__battle-member",
        this.isActiveMember(memberIndex) && "soe__battle-member--active",
        !member.alive && "soe__battle-member--ko",
      ];
    },
    battleMemberStyle(member, memberIndex) {
      const hasActed = this.actedPartyIndexes.includes(memberIndex);
      return {
        "--soe-member-color": member.color,
        "--soe-member-border": this.isActiveMember(memberIndex)
          ? COLORS.gold
          : hasActed
            ? "#334455"
            : `${member.color}88`,
      };
    },
    battleMemberStateClass(member, memberIndex) {
      return [
        "soe__battle-member-state",
        this.actedPartyIndexes.includes(memberIndex) &&
          "soe__battle-member-state--acted",
        !member.alive && "soe__battle-member-state--ko",
      ];
    },
  },
};
</script>
