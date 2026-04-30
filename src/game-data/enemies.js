import { GAME_VISUALS } from "./visuals";

export const ENEMY_TEMPLATES = {
  goblin: {
    name: "GOBLIN",
    e: "(G)",
    sprite: GAME_VISUALS.enemies.goblin,
    hp: 45,
    atk: 14,
    def: 5,
    gold: 25,
    xp: 20,
    color: "#44aa44",
    boss: false,
  },
  goblin2: {
    name: "GOBLIN",
    e: "(G)",
    sprite: GAME_VISUALS.enemies.goblin,
    hp: 45,
    atk: 14,
    def: 5,
    gold: 25,
    xp: 20,
    color: "#44aa44",
    boss: false,
  },
  goblinChief: {
    name: "GOBLIN CHIEF",
    e: "(G!)",
    sprite: GAME_VISUALS.enemies.goblinChief,
    hp: 70,
    atk: 20,
    def: 8,
    gold: 40,
    xp: 35,
    color: "#88bb33",
    boss: false,
  },
  skeleton: {
    name: "SKELETON KNT",
    e: "(S)",
    sprite: GAME_VISUALS.enemies.skeletonKnight,
    hp: 95,
    atk: 24,
    def: 14,
    gold: 60,
    xp: 50,
    color: "#aaaacc",
    boss: false,
  },
  vaelthorn: {
    name: "VAELTHORN",
    e: "(BOSS)",
    sprite: GAME_VISUALS.enemies.vaelthorn,
    hp: 320,
    atk: 46,
    def: 22,
    gold: 300,
    xp: 0,
    color: "#ff6600",
    boss: true,
  },
  malachar: {
    name: "MALACHAR",
    e: "(M!)",
    sprite: GAME_VISUALS.enemies.malachar,
    hp: 420,
    atk: 52,
    def: 24,
    gold: 0,
    xp: 0,
    color: "#ccddff",
    boss: true,
  },
};

export const createEnemyFromKey = (key, index) => {
  const template = ENEMY_TEMPLATES[key];

  if (!template) {
    throw new Error(`Unknown enemy key: ${key}`);
  }

  return {
    ...template,
    id: index,
    mxHp: template.hp,
    alive: true,
    poison: false,
    poisonT: 0,
    stunned: false,
  };
};

export const createEnemiesFromKeys = (keys) =>
  keys.map((key, index) => createEnemyFromKey(key, index));
