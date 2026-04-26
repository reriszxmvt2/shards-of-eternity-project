import { pixelArt } from "./assets/pixelArt";

const COLORS = {
  bg: "#07071a",
  panel: "#0e0e28",
  dark: "#050514",
  border: "#4477ff",
  gold: "#ffcc00",
  red: "#ff3344",
  green: "#22ee55",
  blue: "#4477ff",
  purple: "#bb44ff",
  white: "#ccddef",
  gray: "#7788aa",
  orange: "#ff8833",
  hp: "#ee2233",
  mp: "#2266ee",
};

const GAME_VISUALS = pixelArt;

const SCREEN_IDS = {
  battle: "battle",
  chapter: "chapter",
  choice: "choice",
  ending: "ending",
  scene: "scene",
  shop: "shop",
  title: "title",
};

const SCENE_IDS = {
  prologue: "s_prologue",
  act3: "s_act3",
  merchantTwist: "c_merchant_twist",
  vaelthornChoice: "ch_vaelthorn",
  fallenEnding: "end_bad_fallen",
};

const BATTLE_IDS = {
  vaelthorn: "b3",
  finalBoss: "b4",
};

const SHARDS = [
  {
    id: "mercy",
    name: "Mercy",
    nameTh: "เมตตา",
    mark: "MRC",
    color: COLORS.green,
  },
  {
    id: "courage",
    name: "Courage",
    nameTh: "ความกล้าหาญ",
    mark: "CRG",
    color: COLORS.gold,
  },
  {
    id: "memory",
    name: "Memory",
    nameTh: "ความทรงจำ",
    mark: "MEM",
    color: COLORS.purple,
  },
  {
    id: "truth",
    name: "Truth",
    nameTh: "ความจริง",
    mark: "TRU",
    color: COLORS.blue,
  },
  {
    id: "sacrifice",
    name: "Sacrifice",
    nameTh: "การเสียสละ",
    mark: "SAC",
    color: COLORS.red,
  },
];

const SHARDS_REQUIRED = SHARDS.map((shard) => shard.id);

const createDefaultParty = () => [
  {
    id: "phetto",
    name: "เพชรโตะ",
    nameEn: "PHETTO",
    cls: "WARRIOR",
    color: COLORS.gold,
    e: "[W]",
    portrait: GAME_VISUALS.portraits.phetto,
    sprite: GAME_VISUALS.portraits.phetto,
    hp: 120,
    mxHp: 120,
    mp: 40,
    mxMp: 40,
    atk: 28,
    def: 14,
    lv: 1,
    alive: true,
    buf: 0,
    bufT: 0,
    defending: false,
    wName: "Iron Sword",
    wLv: 1,
    skills: [
      {
        name: "SLASH",
        mp: 0,
        mult: 1.3,
        type: "atk",
        tar: "one",
        desc: "ฟันดาบอย่างหนักหน่วง\n//Powerful sword slash",
      },
      {
        name: "SHIELD BASH",
        mp: 8,
        mult: 0.9,
        type: "atk",
        tar: "one",
        stun: true,
        desc: "โจมตีและทำให้ชะงัก 1 เทิร์น\n//Attack + stun 1 turn",
      },
      {
        name: "WAR CRY",
        mp: 14,
        mult: 0,
        type: "buff",
        tar: "party",
        bufAmt: 8,
        bufT: 3,
        desc: "เพิ่ม ATK ทั้งทีม +8 เป็นเวลา 3 เทิร์น\n//Party ATK +8 for 3 turns",
      },
    ],
  },
  {
    id: "lyra",
    name: "ลีร่า",
    nameEn: "LYRA",
    cls: "MAGE",
    color: COLORS.purple,
    e: "[M]",
    portrait: GAME_VISUALS.portraits.lyra,
    sprite: GAME_VISUALS.portraits.lyra,
    hp: 75,
    mxHp: 75,
    mp: 100,
    mxMp: 100,
    atk: 36,
    def: 6,
    lv: 1,
    alive: true,
    buf: 0,
    bufT: 0,
    defending: false,
    wName: "Oak Staff",
    wLv: 1,
    skills: [
      {
        name: "FIREBALL",
        mp: 12,
        mult: 1.6,
        type: "atk",
        tar: "one",
        desc: "ปล่อยเปลวไฟเวทมนตร์\n//Magical fire blast",
      },
      {
        name: "BLIZZARD",
        mp: 20,
        mult: 1.1,
        type: "atk",
        tar: "all",
        desc: "เวทน้ำแข็งโจมตีศัตรูทั้งหมด\n//Ice magic — all enemies",
      },
      {
        name: "HEAL",
        mp: 15,
        mult: 0,
        type: "heal",
        tar: "ally",
        healAmt: 55,
        desc: "ฟื้นฟู HP ให้พันธมิตร 55\n//Restore 55 HP to ally",
      },
    ],
  },
  {
    id: "riven",
    name: "ริเวน",
    nameEn: "RIVEN",
    cls: "ARCHER",
    color: COLORS.green,
    e: "[A]",
    portrait: GAME_VISUALS.portraits.riven,
    sprite: GAME_VISUALS.portraits.riven,
    hp: 95,
    mxHp: 95,
    mp: 50,
    mxMp: 50,
    atk: 30,
    def: 10,
    lv: 1,
    alive: true,
    buf: 0,
    bufT: 0,
    defending: false,
    wName: "Ash Bow",
    wLv: 1,
    skills: [
      {
        name: "AIMED SHOT",
        mp: 0,
        mult: 1.25,
        type: "atk",
        tar: "one",
        desc: "ยิงธนูเจาะจุดอ่อน\n//Precise piercing shot",
      },
      {
        name: "ARROW RAIN",
        mp: 16,
        mult: 0.85,
        type: "atk",
        tar: "all",
        desc: "ระดมธนูใส่ศัตรูทั้งหมด\n//Volley hits all enemies",
      },
      {
        name: "POISON ARROW",
        mp: 10,
        mult: 0.75,
        type: "atk",
        tar: "one",
        poison: true,
        desc: "ทำให้ติดพิษ 3 เทิร์น\n//Poisons for 3 turns",
      },
    ],
  },
];

const createEnemiesFromKeys = (keys) => {
  const D = {
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
  return keys.map((k, i) => ({
    ...D[k],
    id: i,
    mxHp: D[k].hp,
    alive: true,
    poison: false,
    poisonT: 0,
    stunned: false,
  }));
};

const BATTLES = {
  b1: {
    keys: ["goblin", "goblin2"],
    msg: "ก็อบลินกระโจนออกมาจากซากเมือง!\n//Goblins ambush you in the ruins!",
    after: "c_after1",
  },
  b2: {
    keys: ["skeleton", "goblinChief"],
    msg: "อัศวินโครงกระดูกขวางทางอยู่กลางช่องเขา!\n//A Skeleton Knight blocks the mountain pass!",
    after: "c_shop",
  },
  b3: {
    keys: ["vaelthorn"],
    msg: "VAELTHORN ผุดขึ้นจากความมืดอันไร้กาลเวลา!\n//VAELTHORN rises from the eternal dark!",
    after: "c_boss_after",
  },
  b4: {
    keys: ["malachar"],
    msg: "มาลาชาร์ยืนอยู่ในวงแหวน Shards ที่แตกร้าว!\n//Malachar stands inside a ring of broken Shards!",
    after: "final",
  },
};

const SHOP_ITEMS = [
  {
    id: "potion",
    name: "ยาฟื้นฟู / HEALTH POTION",
    d: "ฟื้น HP 60 / Restore 60 HP",
    price: 30,
    type: "item",
  },
  {
    id: "ether",
    name: "อีเธอร์ / ETHER",
    d: "ฟื้น MP 40 / Restore 40 MP",
    price: 40,
    type: "item",
  },
  {
    id: "revive",
    name: "ขนนกฟีนิกซ์ / PHOENIX DOWN",
    d: "ชุบชีวิตพร้อม HP 50%",
    price: 75,
    type: "item",
  },
  {
    id: "up_phetto",
    name: "ลับคมดาบ: IRON SWORD+",
    d: "เพิ่ม ATK ให้เพชรโตะ +12",
    price: 90,
    type: "upgrade",
    target: "phetto",
    amt: 12,
  },
  {
    id: "up_lyra",
    name: "เสริมพลังไม้เท้า: OAK STAFF+",
    d: "เพิ่ม ATK ให้ลีร่า +14",
    price: 110,
    type: "upgrade",
    target: "lyra",
    amt: 14,
  },
  {
    id: "up_riven",
    name: "แต่งสายธนู: ASH BOW+",
    d: "เพิ่ม ATK ให้ริเวน +12",
    price: 90,
    type: "upgrade",
    target: "riven",
    amt: 12,
  },
];

// Lines: [speaker, "thai\n//english", color]
const SCENES = {
  s_prologue: {
    t: "scene",
    bg: "#050014",
    illustration: GAME_VISUALS.scenes.brokenSeal,
    chapter: {
      kicker: "AN 8-BIT LEGEND BEGINS",
      title: "PROLOGUE",
      subtitle: "THE ETERNAL SEAL",
    },
    location: {
      name: "ผนึกที่แตกสลาย / THE BROKEN SEAL",
      region: "Before Aethoria",
    },
    objective: {
      id: "prologue",
      title: "ฟังตำนานผนึก / Hear the legend",
      desc: "เรียนรู้ต้นกำเนิดของ Shards of Eternity",
    },
    title: "── ปฐมบท: ผนึกแห่งนิรันดร์ / PROLOGUE: THE ETERNAL SEAL ──",
    lines: [
      [
        null,
        "ก่อนที่ชื่อของ Aethoria จะถูกจารึกไว้ในตำนาน\nโลกใบนี้เคยเกือบถูกกลืนหายไปในสิ่งที่ไม่มีใครกล้าเรียกชื่อ\n//Before Aethoria's name was written into legend,\nthis world was nearly swallowed by something no one dared to name.",
        COLORS.gray,
      ],
      [
        null,
        "เหล่านักปราชญ์จึงสร้างผนึกโบราณขึ้นมา\nและเมื่อผนึกนั้นแตกออก พลังของมันกลายเป็น Shards of Eternity ทั้งห้า\n//The sages forged an ancient seal to hold it back.\nWhen that seal fractured, its power became the five Shards of Eternity.",
        COLORS.white,
      ],
      [
        null,
        "เมตตา ความกล้าหาญ ความทรงจำ ความจริง และการเสียสละ\nห้าชิ้นส่วนนี้ไม่ได้เลือกคนที่แข็งแกร่งที่สุด\nแต่มันตอบรับคนที่ยังไม่ทิ้งหัวใจของตัวเอง\n//Mercy, Courage, Memory, Truth, and Sacrifice.\nThese five fragments do not choose the strongest.\nThey answer those who have not abandoned their own hearts.",
        COLORS.gold,
      ],
      [
        null,
        "Aethoria เติบโตขึ้นใต้แสงของผนึกนั้น\nอาณาจักรที่ผู้คนเชื่อในคำสาบาน เชื่อในดาบของผู้ปกป้อง\nและเชื่อว่าตราบใดที่ประตูเมืองยังปิด ความสงบก็จะไม่จากไป\n//Aethoria grew beneath that seal's light.\nIt was a kingdom that believed in vows, in the blades of its guardians,\nand in the peace kept safe behind closed gates.",
        COLORS.white,
      ],
      [
        null,
        "แต่บางครั้ง โลกไม่ได้พังเพราะปีศาจ\nมันพังเพราะคนที่เชื่อว่าตัวเองกำลังช่วยมัน\n//But sometimes, the world does not break because of demons.\nIt breaks because of those who believe they are saving it.",
        COLORS.red,
      ],
      [
        null,
        "ลอร์ดมาลาชาร์เคยเป็นมันสมองของราชสำนัก\nคนที่กษัตริย์ไว้ใจ คนที่มองเห็นภัยร้ายก่อนใคร\nแต่ยิ่งเขามองเห็นความมืดชัดเท่าไร เขาก็ยิ่งเชื่อว่าชีวิตบางชีวิตต้องถูกสละเพื่อให้โลกเดินต่อ\n//Lord Malachar was once the mind behind the throne.\nTrusted by the King, he saw danger before anyone else.\nBut the clearer he saw the darkness, the more he believed some lives had to be sacrificed so the world could continue.",
        COLORS.gray,
      ],
      [
        null,
        "ในช่วงหลายคืนก่อนการล่มสลาย เงาของเมืองยาวผิดธรรมชาติ\nผู้คนลืมชื่อคนที่รักไปชั่วขณะ และข่าวลือเรื่องมังกร Vaelthorn ก็เริ่มดังขึ้นเหมือนลางร้าย\n//In the nights before the fall, the city's shadows stretched too far.\nPeople forgot the names of loved ones for a heartbeat,\nand rumors of the dragon Vaelthorn rose like an omen.",
        COLORS.purple,
      ],
      [
        null,
        "แล้วปีที่ 847 ก็มาถึง\nคืนนั้น Aethoria ไม่ได้แพ้เพราะกำแพงอ่อนแอ\nแต่แพ้เพราะประตูถูกเปิดจากข้างใน\n//Then came the year 847.\nThat night, Aethoria did not fall because its walls were weak.\nIt fell because the gates were opened from within.",
        COLORS.red,
      ],
    ],
    next: "s_intro",
  },

  s_intro: {
    t: "scene",
    bg: "#180008",
    illustration: GAME_VISUALS.scenes.aethoriaRuins,
    chapter: {
      kicker: "ACT I",
      title: "THE FALL",
      subtitle: "AETHORIA, YEAR 847",
    },
    location: {
      name: "ซากอาณาจักรเอเธอเรีย / AETHORIA RUINS",
      region: "The Fallen Capital",
    },
    objective: {
      id: "survive_ruins",
      title: "เอาชีวิตรอดจากซากเมือง / Survive the ruins",
      desc: "ฝ่าคืนแห่งการทรยศและตามรอยมาลาชาร์",
    },
    questUpdate: {
      completeCurrent: true,
    },
    title: "── บทที่ 1: การล่มสลาย / ACT I: THE FALL ──",
    lines: [
      [null, "AETHORIA ปีที่ 847\n//AETHORIA, YEAR 847", COLORS.gray],
      [
        null,
        "เปลวเพลิงสูงกว่าหอคอย กลืนทุกสิ่งที่กษัตริย์ทุ่มทั้งชีวิตสร้างไว้\nท้องฟ้าแดงดั่งเลือด ควันดำพวยขึ้นกลบดาวทุกดวง\n//Flames taller than the castle towers devoured everything the King built.\nThe sky bled orange. Black smoke swallowed every star.",
        COLORS.white,
      ],
      [
        null,
        "เสียงร่ำไห้ของผู้บริสุทธิ์ถูกกลืนหายไปในเสียงเพลิงคำราม\nกำแพงเมืองที่ยืนหยัดมานับพันปีพังทลายภายในคืนเดียว\n//The cries of the innocent dissolved into the roar of the flames.\nWalls that stood for a thousand years — crumbled in a single night.",
        COLORS.gray,
      ],
      [
        null,
        "แต่สิ่งที่เผา Aethoria จนราบไม่ใช่ไฟมังกร\nหากเป็นไฟแห่งการทรยศ — ร้อนแรงกว่า และดับยากกว่าไฟใดในโลก\n//But it was not dragon fire that brought Aethoria down.\nIt was the fire of betrayal — hotter, and far harder to extinguish.",
        COLORS.red,
      ],
      [
        null,
        "ลอร์ดมาลาชาร์ — ที่ปรึกษาที่กษัตริย์ไว้ใจดุจพี่น้อง —\nเปิดประตูเมืองในยามเที่ยงคืน กองทัพศัตรูหลั่งไหลเข้ามาราวน้ำหลากสีดำ\n//Lord Malachar — trusted by the King like a brother —\nopened the gates at midnight. The enemy army poured in like a dark flood.",
        COLORS.gray,
      ],
      [
        null,
        "เมื่อรุ่งสางมาถึง... อาณาจักร Aethoria ก็ไม่เหลืออีกแล้ว\nมีทหารเพียงคนเดียวที่รอดจากการสังหารหมู่\n//By dawn... the kingdom of Aethoria was no more.\nOnly one soldier survived the massacre.",
        COLORS.white,
      ],
    ],
    next: "s_intro2",
  },

  s_intro2: {
    t: "scene",
    bg: "#1a0800",
    illustration: GAME_VISUALS.scenes.aethoriaRuins,
    savePoint: {
      label: "ประกายผนึกที่ยังไม่ดับ / Lingering Seal Spark",
      note: "พักหายใจก่อนศึกแรก",
    },
    lines: [
      [
        "เพชรโตะ",
        "*ไอ* ...ฉันอยู่ที่ไหน?\n//*coughs* ...Where am I?",
        COLORS.gold,
      ],
      [
        null,
        "[ เพชรโตะลืมตาขึ้น — ควันดำคลุ้งอยู่รอบตัว\nไฟยังลุกโชนอยู่ไกล ๆ กำแพงปราสาทพังถล่ม\nร่างของสหายทหารนอนกระจัดกระจายบนพื้นหิน ]\n//[ Phetto opens his eyes — black smoke fills the air.\nFires still rage in the distance. The castle walls have crumbled.\nThe bodies of his fallen comrades lie scattered across the stone floor. ]",
        COLORS.gray,
      ],
      [
        "เพชรโตะ",
        "ฝ่าบาท... ทุกคนที่ข้าสาบานว่าจะปกป้อง...\nหายไปหมดแล้ว ไม่เหลือแม้แต่คนเดียว\n//The King... everyone I swore to protect...\nAll gone. Not one left.",
        COLORS.gold,
      ],
      [
        "เพชรโตะ",
        "มาลาชาร์\nข้าจะตามหาเจ้า — ต่อให้ต้องฝ่านรกทุกขุมก็ตาม\nเจ้าต้องชดใช้เลือดทุกหยดที่หลั่งในคืนนี้\n//Malachar.\nI will find you — through every circle of hell if I must.\nYou will answer for every drop of blood spilled tonight.",
        COLORS.gold,
      ],
    ],
    next: "b1",
    battle: "b1",
  },

  c_after1: {
    t: "scene",
    bg: "#0a1400",
    illustration: GAME_VISUALS.scenes.aethoriaRuins,
    lines: [
      [
        null,
        "คุณฝ่าซากเมืองที่ยังคุกรุ่น\nเถ้าถ่านปลิวแสบหน้า ทุกย่างก้าวเหยียบลงบนเศษซากของอดีต\n//You push through the smoldering ruins.\nAsh stings your face. Every step treads upon the remnants of the past.",
        COLORS.white,
      ],
      [
        null,
        "แสงจันทร์แทงผ่านหลังคาที่พังถล่ม\nทอดเงาเป็นซี่กรงขวางทาง — ราวกับว่า\nแม้แต่แสงยังไม่กล้าส่องให้ทั่วสถานที่แห่งนี้\n//Moonlight pierces through the collapsed roof,\ncasting barred shadows across the path — as if\neven light fears to fully illuminate this place.",
        COLORS.gray,
      ],
      [
        null,
        "แล้วท่ามกลางความเงียบที่บีบคั้น...\nเสียงร้องหนึ่งก็แทรกขึ้นมา — ชัดเจนและสิ้นหวัง\n//Then — cutting through the tense silence —\na cry rises. Clear. Desperate.",
        COLORS.white,
      ],
    ],
    next: "ch_merchant",
  },

  ch_merchant: {
    t: "choice",
    bg: "#0a1400",
    illustration: GAME_VISUALS.scenes.aethoriaRuins,
    objective: {
      id: "merchant_choice",
      title: "เสียงร้องในซากเมือง / A cry in the ruins",
      desc: "ตัดสินใจว่าจะช่วยชายที่ถูกล้อมไว้หรือเดินหน้าต่อ",
    },
    questUpdate: {
      completeCurrent: true,
    },
    text: 'กลางถนนที่ยังมีไฟลามเลีย\nพ่อค้าวัยกลางคนหมอบอยู่ตรงมุมตึก\nก็อบลินสองตัวล้อมเขาไว้ มีดในมือสั่นไม่หยุด\n\nเขาตะโกนทันทีที่เห็นคุณ\n"ช่วยข้าด้วย!"\n\n// Amid burning ruins, a middle-aged merchant cowers in a corner.\n// Two goblins close in. The knife in his hand trembles.\n// He cries out the moment he sees you:\n// "Please — help me!"',
    choices: [
      {
        text: "[A] เข้าช่วยพ่อค้า! / Fight for him!",
        flag: "saved",
        reward: {
          gold: 90,
          shards: ["mercy"],
          items: [
            { id: "potion", name: "ยาฟื้นฟู / HEALTH POTION", d: "ฟื้น HP 60", c: 2 },
          ],
        },
        next: "c_saved",
      },
      {
        text: "[B] ไม่มีเวลา เดินหน้าต่อ / No time. Move on.",
        flag: "left",
        next: "c_left",
      },
    ],
  },

  c_saved: {
    t: "scene",
    bg: "#0a1400",
    illustration: GAME_VISUALS.scenes.aethoriaRuins,
    lines: [
      [
        null,
        "ก็อบลินสองตัวล้มลง พ่อค้าหอบหายใจหนัก\nมือของเขายังสั่น แต่ดวงตากลับมีประกาย\n//The two goblins fall. The merchant gasps for air.\nHis hands tremble — but his eyes burn bright.",
        COLORS.white,
      ],
      [
        "พ่อค้า",
        "ขอบคุณ... ขอบคุณจริง ๆ\nข้าจะไม่มีวันลืมบุญคุณของท่าน\n//Thank you... thank you so much.\nI will never forget what you've done.",
        COLORS.orange,
      ],
      [
        "พ่อค้า",
        "รับสิ่งนี้ไว้เถิด — อาจไม่มากนัก\nแต่นี่คือทั้งหมดที่ข้ามีในตอนนี้\n//Take this — it's little,\nbut it's everything I have right now.",
        COLORS.orange,
      ],
      [
        null,
        ">> ได้รับ: 90 ทอง + ยาฟื้นฟู 2 ขวด!\n//>> Received: 90 Gold + 2 Health Potions!",
        COLORS.green,
      ],
      [
        null,
        "[ ในความมืดของคืนนั้น เมล็ดพันธุ์แห่งความเมตตาถูกหว่านลงอย่างเงียบงัน\nยังไม่มีใครรู้ว่ามันจะออกดอกผลอย่างไรในวันข้างหน้า ]\n//[ In the darkness of that night, a small act of mercy was sown.\nNo one could know yet what it would one day bear. ]",
        COLORS.gold,
      ],
    ],
    next: "s_lyra",
  },

  c_left: {
    t: "scene",
    bg: "#0a0a0a",
    illustration: GAME_VISUALS.scenes.aethoriaRuins,
    lines: [
      [
        null,
        "คุณเดินผ่านไปโดยไม่หยุด\nเสียงร้องของพ่อค้าค่อย ๆ จางหายอยู่ข้างหลัง\n//You walk past without stopping.\nThe merchant's cries fade behind you.",
        COLORS.gray,
      ],
      [
        "เพชรโตะ",
        "...ข้าไม่มีเวลา ไม่ใช่คืนนี้\nยังมีหน้าที่ที่ใหญ่กว่านี้รออยู่\n//...I have no time. Not tonight.\nThere is a greater duty waiting.",
        COLORS.gold,
      ],
      [
        null,
        "[ ความเย็นเยียบแทรกเข้ามาแทนความอบอุ่น\nนักรบที่มุ่งหน้าไปสู่เป้าหมาย เหลือพื้นที่ให้ความสงสารน้อยลงทุกที ]\n//[ A cold resolve replaces warmth.\nA determined warrior has no room for pity. ]",
        COLORS.red,
      ],
    ],
    next: "s_lyra",
  },

  s_lyra: {
    t: "scene",
    bg: "#0a0a1a",
    illustration: GAME_VISUALS.scenes.ashwoodForest,
    chapter: {
      kicker: "NEW ALLIES",
      title: "ASHWOOD FOREST",
      subtitle: "Tracks beneath old trees",
    },
    location: {
      name: "ป่าแอชวูด / ASHWOOD FOREST",
      region: "Northern Road",
    },
    objective: {
      id: "gather_allies",
      title: "รวบรวมผู้ร่วมทาง / Gather allies",
      desc: "ตามหาคนที่รู้ความจริงของมาลาชาร์และ Vaelthorn",
    },
    questUpdate: {
      completeCurrent: true,
    },
    title: "── ป่าแอชวูด / ASHWOOD FOREST ──",
    lines: [
      [
        null,
        "ป่าแอชวูด — ดงไม้โบราณที่ยืนเฝ้ายามราวทหารเก่า\nรากบิดเกลียวชอนไชขึ้นจากดินดำเหมือนเส้นเลือดของผืนป่า\nใบไม้แห้งเสียดสีกัน กระซิบเรื่องราวที่ถูกลืมมานาน\n//Ashwood Forest — where ancient trees stand sentinel like old soldiers.\nGnarled roots claw out of black earth like varicose veins.\nDry leaves rasp against each other, whispering stories long forgotten.",
        COLORS.gray,
      ],
      [
        "ลีร่า",
        "ท่านกำลังมุ่งหน้าไปยังถ้ำของ Vaelthorn\n//You're heading for Vaelthorn's Lair.",
        COLORS.purple,
      ],
      [
        "เพชรโตะ",
        "เจ้าเป็นใคร? ออกมาจากเงาเดี๋ยวนี้\n//Who are you? Step out of the shadow.",
        COLORS.gold,
      ],
      [
        "ลีร่า",
        "คนที่รู้ว่ามาลาชาร์ทำอะไรลงไปจริง ๆ\n//Someone who knows what Malachar truly did.",
        COLORS.purple,
      ],
      [
        "ลีร่า",
        "เขาไม่ได้ทรยศอาณาจักรเพียงอย่างเดียว\nเขาใช้ Vaelthorn เป็นอาวุธ — มังกรที่ถูกพันธนาการด้วยตรามืด\nข้ารู้คาถาที่ทำลายตรานั้นได้\n//He didn't just betray the kingdom.\nHe is using Vaelthorn as a weapon — a dragon bound by his dark sigil.\nI know the spell that can break it.",
        COLORS.purple,
      ],
      [
        "เพชรโตะ",
        "...งั้นก็ตามมา แต่อย่าช้าก็แล้วกัน\n//...Come then. But keep up.",
        COLORS.gold,
      ],
    ],
    next: "s_riven",
  },

  s_riven: {
    t: "scene",
    bg: "#0a1a0a",
    illustration: GAME_VISUALS.scenes.ashwoodForest,
    lines: [
      [
        null,
        "เสียงกิ่งไม้หักดังขึ้นเหนือศีรษะ\nเงาร่างหนึ่งร่วงลงมาจากยอดไม้สูง\nแล้วแตะพื้นอย่างเงียบกริบ\n//A branch snaps overhead.\nThen a figure drops from high above,\nlanding with the silent grace of a wildcat.",
        COLORS.white,
      ],
      [
        "ริเวน",
        "เพชรโตะ! เจ้ายังมีชีวิตอยู่!\n//Phetto! You're alive!",
        COLORS.green,
      ],
      [
        "เพชรโตะ",
        "ริเวน... ข้านึกว่าเจ้าตายไปแล้ว\n//Riven... I thought you were dead.",
        COLORS.gold,
      ],
      [
        "ริเวน",
        "เกือบแล้ว รอยแผลห้าแห่งบนตัวข้าเป็นพยานได้\nแต่ข้าตามรอยกองกำลังของมาลาชาร์มาตลอด\n//Almost. Five scars can testify.\nBut I've been tracking Malachar's forces the whole time.",
        COLORS.green,
      ],
      [
        "ริเวน",
        "กองกำลังทุกหน่วยกำลังมุ่งหน้าไปยังถ้ำ\nถ้าเราไม่หยุดพวกมันที่นั่น ทุกอย่างจะสายเกินไป\nข้าจะยืนเคียงข้างเจ้า — จนถึงที่สุด\n//Every unit is converging on the Lair.\nIf we don't stop them there, it will be too late.\nI'm with you — till the very end.",
        COLORS.green,
      ],
      [
        null,
        "** ลีร่าและริเวนเข้าร่วมทีมแล้ว! **\n//** LYRA and RIVEN have joined the party! **",
        COLORS.gold,
      ],
    ],
    next: "s_act2",
    joinParty: true,
  },

  s_act2: {
    t: "scene",
    bg: "#1a0a00",
    illustration: GAME_VISUALS.scenes.mountainPass,
    chapter: {
      kicker: "ACT II",
      title: "THE MOUNTAIN PASS",
      subtitle: "The road narrows",
    },
    location: {
      name: "ช่องเขาเก่า / THE MOUNTAIN PASS",
      region: "Road to Vaelthorn's Lair",
    },
    objective: {
      id: "cross_pass",
      title: "ข้ามช่องเขา / Cross the pass",
      desc: "ฝ่าด่านหินดำและเปิดทางสู่ถ้ำ Vaelthorn",
    },
    questUpdate: {
      completeCurrent: true,
    },
    savePoint: {
      label: "คบไฟริมช่องเขา / Pass Torch",
      note: "บันทึกก่อนปะทะกองหน้า",
    },
    title: "── บทที่ 2: ช่องเขา / ACT II: THE MOUNTAIN PASS ──",
    reward: {
      shards: ["courage"],
    },
    lines: [
      [
        null,
        "ช่องเขาแคบที่ลมหนาวพัดไม่เคยหยุด\nหินดำเปื้อนสนิมและคราบเลือดเก่าของผู้ที่เคยผ่านทางนี้\nกระดูกของทหารไร้นามเรียงรายข้างทางราวหลักหมายแห่งความตาย\n//A narrow mountain pass where bitter winds never cease.\nBlack stone stained with old rust and blood from those who came before.\nThe bones of nameless soldiers line the path like grim markers.",
        COLORS.gray,
      ],
      [
        null,
        "ลมหายใจกลายเป็นไอขาวในอากาศเย็นจัด\nทุกฝีก้าวสะท้อนก้องหน้าผา ราวกับภูเขาทั้งลูกกำลังเงี่ยหูฟัง\n//Breath mists the freezing air.\nEvery footstep echoes off the cliffs as if the mountain itself is listening.",
        COLORS.white,
      ],
      [
        "ริเวน",
        "อัศวินโครงกระดูกอยู่ข้างหน้า! เตรียมอาวุธ!\n//Skeleton Knights ahead! Weapons ready!",
        COLORS.green,
      ],
    ],
    next: "b2",
    battle: "b2",
  },

  c_shop: { t: "shop" },

  s_act3: {
    t: "scene",
    bg: "#1a0000",
    illustration: GAME_VISUALS.scenes.vaelthornLair,
    chapter: {
      kicker: "ACT III",
      title: "VAELTHORN'S LAIR",
      subtitle: "A prison under flame",
    },
    location: {
      name: "ถ้ำวาเอลธอร์น / VAELTHORN'S LAIR",
      region: "Dragon's Hollow",
    },
    objective: {
      id: "break_sigil",
      title: "ทำลายตราผนึก / Break the sigil",
      desc: "ทำให้ Vaelthorn อ่อนแรงและเปิดเผยความจริงของตรามืด",
    },
    questUpdate: {
      completeCurrent: true,
    },
    savePoint: {
      label: "ผนึกหน้าถ้ำ / Lair Seal",
      note: "บันทึกก่อนเผชิญหน้า Vaelthorn",
    },
    title: "── บทที่ 3: ถ้ำวาเอลธอร์น / ACT III: VAELTHORN'S LAIR ──",
    lines: [
      [
        null,
        "ถ้ำที่แม้แต่ลมยังไม่กล้าย่างกราย\nผนังหินเต็มไปด้วยรอยเล็บขูดซ้ำแล้วซ้ำเล่า\nราวกับผู้ถูกจองจำพยายามนับวันเวลาที่ผ่านไป\n//A cave where even the wind dares not enter.\nThe stone walls are covered in claw marks scratched over and over —\nlike a caged beast trying to count the passing days.",
        COLORS.gray,
      ],
      [
        null,
        "ในความมืดสนิท มีกลิ่นเลือดเก่าและความเจ็บปวดตกค้าง\nรอยขีดข่วนบางรอยลึกเป็นนิ้ว — เกิดจากความทรมาน\nไม่ใช่ความโกรธเกรี้ยว\n//In the pitch dark, there is a smell of old blood and something else.\nSome claw marks cut inches deep — made by something in anguish,\nnot in rage.",
        COLORS.white,
      ],
      [
        "ลีร่า",
        "นั่น — ตราผนึกของมาลาชาร์!\nมันพันธนาการ Vaelthorn ไว้กับเจตจำนงของเขา!\n//There — Malachar's Sigil!\nIt binds Vaelthorn to his will!",
        COLORS.purple,
      ],
      ["เพชรโตะ", "เจ้าทำลายมันได้ไหม?\n//Can you break it?", COLORS.gold],
      [
        "ลีร่า",
        "ได้... แต่เราต้องทำให้เขาอ่อนแรงก่อน\nตราผนึกจะคลายออกเมื่อผู้ถูกครอบงำถูกต้อนจนถึงขีดสุด\n//Yes... but we must weaken him first.\nThe Sigil loosens when its host is brought to the edge.",
        COLORS.purple,
      ],
      [
        null,
        "พื้นดินปริแตก เพดานถ้ำสั่นสะเทือน\nเศษหินร่วงกราวลงมารอบด้าน\nแล้วเงามหึมาก็ผุดขึ้นจากความมืดเบื้องล่าง\n//The ground splits. The cave ceiling shudders.\nStone fragments rain down all around.\nThen — from the dark below — a massive shadow rises.",
        COLORS.red,
      ],
      [
        "VAELTHORN",
        "ผู้บุกรุก...\nพวกเจ้ากล้าเหยียบเข้ามาในคุกของข้ารึ?!\nข้าจะสอนให้รู้ว่าเปลวไฟนิรันดร์หมายถึงสิ่งใด!!\n//Intruders...\nYou dare walk into my prison?!\nYou will learn what the eternal flame truly means!!",
        "#ff6600",
      ],
    ],
    next: "b3",
    battle: "b3",
  },

  // === MERCHANT TWIST — plays after boss if merchant was saved ===
  c_merchant_twist: {
    t: "scene",
    bg: "#1a0500",
    illustration: GAME_VISUALS.scenes.vaelthornLair,
    lines: [
      [
        null,
        "ขณะที่ทั้งสามยังหอบหายใจ\nเสียงฝีเท้าเร่งร้อนก็ดังมาจากปากถ้ำ\nพร้อมแสงคบไฟวูบไหวที่ใกล้เข้ามา\n//As the three of you struggle to catch your breath,\nquick footsteps echo from the cave entrance.\nA flickering torchlight bobs closer.",
        COLORS.white,
      ],
      [
        "พ่อค้า",
        "ท่าน! ท่านยังรอด!\nข้าตามมาตลอดทาง... แทบไม่มีแรงเดินแล้ว\n//You! You survived!\nI've been following you the whole way... my legs are gone.",
        COLORS.orange,
      ],
      [
        "เพชรโตะ",
        "เจ้า...? ทำไมถึงมาที่นี่? มันอันตราย\n//You...? Why? It's dangerous here.",
        COLORS.gold,
      ],
      [
        "พ่อค้า",
        "เพราะมีเรื่องหนึ่งที่ท่านต้องรู้\nเมื่อสามคืนก่อน ข้าแอบเข้ามาในถ้ำนี้เพื่อหาสมุนไพร\n//Because I have something you need to know.\nThree nights ago, I snuck into this cave searching for herbs.",
        COLORS.orange,
      ],
      [
        "พ่อค้า",
        "แล้วข้าก็ได้ยินเสียงมังกรตนนั้น...\nมันไม่ได้คำราม ไม่ได้เผาผลาญสิ่งใด\nมันกำลังร่ำไห้\n//And I heard that dragon...\nIt wasn't roaring. It wasn't burning anything.\nIt was weeping.",
        COLORS.orange,
      ],
      [
        "พ่อค้า",
        "มันร้องเรียกชื่อ — ชื่อลูก ๆ ของมัน\nมาลาชาร์ฆ่าลูกของมันก่อนจะจองจำ Vaelthorn\nตราผนึกนั้นไม่ได้แค่ควบคุมเขา\nมันลบความทรงจำของเขาไปด้วย\n//It was calling out names — the names of its children.\nMalachar killed them before enslaving Vaelthorn.\nThat Sigil doesn't just control it —\nit erases its memory. Vaelthorn doesn't know who he is anymore.",
        COLORS.orange,
      ],
      [
        "ลีร่า",
        "...เขาพูดจริง ข้าเคยอ่านเรื่องนี้ในตำรา\nแต่ไม่เคยคิดว่ามาลาชาร์จะโหดร้ายได้ถึงเพียงนี้\n//...He's right. I've read about this.\nI never thought Malachar could be this cruel.",
        COLORS.purple,
      ],
      [
        "พ่อค้า",
        "รับสิ่งนี้ไปด้วย ข้าเก็บมันไว้ตลอดทาง\nหวังเพียงว่าจะได้ตอบแทนบุญคุณของท่านสักครั้ง\n//Take these with you. I've been saving them the whole way.\nI hoped I'd have a chance to repay what you did for me.",
        COLORS.orange,
      ],
      [
        null,
        ">> ได้รับ: ยาฟื้นฟู 3 ขวด!\n>> [ ความจริงที่ซ่อนอยู่กลางความเจ็บปวดของมังกร\nกำลังรอการตัดสินใจของคุณ ]\n//>> Received: 3 Health Potions!\n//>> [ The truth hidden at the heart of the dragon's agony\nwaits for your judgment. ]",
        COLORS.green,
      ],
    ],
    next: "ch_vaelthorn",
    reward: {
      items: [
        { id: "potion", name: "ยาฟื้นฟู / HEALTH POTION", d: "ฟื้น HP 60", c: 3 },
      ],
    },
  },

  ch_vaelthorn: {
    t: "choice",
    bg: "#1a0000",
    illustration: GAME_VISUALS.scenes.vaelthornLair,
    text: 'Vaelthorn ทรุดลง บาดเจ็บสาหัส\nตราผนึกรอบคอแตกร้าว\nแสงสีแดงวูบดับ...\n\nแล้วเสียงแผ่วเบาก็ลอดออกมาจากหน้ากากแห่งความเจ็บปวด:\n\n"พ่อมดนั่น... จองจำข้า\nข้าไม่เคยอยากทำลายอาณาจักรของพวกเจ้า\nข้าแค่... อยากเห็นลูก ๆ ของข้าอีกครั้ง"\n\n//Vaelthorn collapses, gravely wounded.\n//The Sigil around his neck fractures.\n//The crimson light flickers and dies...\n//Then a faint voice escapes from beneath the mask of pain:\n//"The wizard enslaved me.\n//I never wanted to destroy your kingdom.\n//I only... wanted to see my children again."',
    choices: [
      {
        text: "[A] ทำลายตราผนึก ปลดปล่อยเขา / Shatter the Sigil.",
        flag: "spared",
        next: "s_vaelthorn_spared",
      },
      {
        text: "[B] ไร้ความเมตตา จบเรื่องนี้เดี๋ยวนี้ / No mercy. End this.",
        flag: "killed",
        next: "s_vaelthorn_killed",
      },
    ],
  },

  s_vaelthorn_spared: {
    t: "scene",
    bg: "#100014",
    illustration: GAME_VISUALS.scenes.vaelthornLair,
    title: "── ชิ้นส่วนแห่งความทรงจำ / SHARD OF MEMORY ──",
    reward: {
      shards: ["memory"],
    },
    lines: [
      [
        null,
        "ดาบของเพชรโตะฟาดลงบนตราผนึก ไม่ใช่ลำคอของมังกร\nแสงสีแดงแตกสลายเป็นฝุ่น และเสียงคำรามของ Vaelthorn กลายเป็นเสียงสะอื้นของผู้ตื่นจากฝันร้าย\n//Phetto's blade falls upon the Sigil, not the dragon's throat.\nThe red light breaks into dust, and Vaelthorn's roar becomes the sob of one waking from a nightmare.",
        COLORS.white,
      ],
      [
        "VAELTHORN",
        "ข้าจำได้แล้ว... ลูก ๆ ของข้า ชื่อของพวกเขา และคืนที่มาลาชาร์พรากข้าไปจากตัวข้าเอง\n//I remember now... my children, their names, and the night Malachar stole me from myself.",
        "#ff8844",
      ],
      [
        null,
        "เกล็ดมังกรชิ้นหนึ่งหลุดจากอกของเขา สิ่งที่ไหลออกมาไม่ใช่เลือด แต่เป็นแสงม่วงเก่าแก่ราวดวงดาวที่จำชื่อตัวเองได้\n>> ได้รับ: SHARD OF MEMORY\n//A scale breaks from his chest, not as blood, but as old violet light like a star remembering its own name.\n//>> Received: SHARD OF MEMORY",
        COLORS.purple,
      ],
      [
        "VAELTHORN",
        "จงตามมาลาชาร์ไป เขาไม่ได้หนีเพราะพ่ายแพ้ แต่หนีเพราะได้ยินเสียงของสิ่งที่รออยู่หลังนิรันดร์\n//Follow Malachar. He did not flee because he lost. He fled because he heard what waits behind eternity.",
        "#ff8844",
      ],
    ],
    next: "s_malachar_truth",
  },

  s_vaelthorn_killed: {
    t: "scene",
    bg: "#120000",
    illustration: GAME_VISUALS.scenes.vaelthornLair,
    title: "── ความทรงจำที่แตกหัก / BROKEN MEMORY ──",
    lines: [
      [
        null,
        "ดาบของเพชรโตะพุ่งลงมา Vaelthorn ไม่สู้กลับ เขาเพียงหลับตาเหมือนพ่อที่เหนื่อยเกินกว่าจะเรียกหาลูกอีกครั้ง\n//Phetto's blade falls. Vaelthorn does not resist. He only closes his eyes like a father too tired to call for his children again.",
        COLORS.white,
      ],
      [
        null,
        "เมื่อร่างมังกรแน่นิ่ง เศษแสงสีม่วงลอยขึ้น ก่อนแตกสลายเสียก่อนจะรวมตัวเป็น Shard\nความทรงจำของเขาตายไปพร้อมกับลมหายใจสุดท้าย\n//When the dragon grows still, violet light rises, then shatters before it can become a Shard.\nHis memory dies with him.",
        COLORS.red,
      ],
      [
        "ลีร่า",
        "เราอาจชนะศึกนี้... แต่เราเพิ่งทำลายกุญแจดอกหนึ่งไปแล้ว\n//We may have won this battle... but we have destroyed one of the keys.",
        COLORS.purple,
      ],
    ],
    next: "s_malachar_truth",
  },

  s_malachar_truth: {
    t: "scene",
    bg: "#050014",
    illustration: GAME_VISUALS.scenes.vaelthornLair,
    title: "── ความจริงของมาลาชาร์ / MALACHAR'S TRUTH ──",
    reward: {
      shards: ["truth"],
    },
    lines: [
      [
        null,
        "บนแท่นหินหลังบัลลังก์มังกร มีแผนที่โลกสลักด้วยเลือดแห้ง\nจุดทั้งห้าบนแผนที่เรืองแสง ราวหัวใจดวงหนึ่งที่ถูกแบ่งเป็นชิ้น ๆ\n//Behind the dragon's throne, a world map is carved in dried blood.\nFive points glow upon it, like a heart divided into pieces.",
        COLORS.gray,
      ],
      [
        "มาลาชาร์",
        "หากข้าดูเหมือนปีศาจ ก็เพราะมีเพียงปีศาจเท่านั้นที่กล้าผ่าโลกเพื่อดึงหนามแห่งนิรันดร์ออกจากอกของมัน\n//If I look like a monster, it is because only a monster dares cut the world open to pull eternity's thorn from its heart.",
        COLORS.white,
      ],
      [
        "ลีร่า",
        "Shards of Eternity... ไม่ใช่ตำนาน แต่มันคือผนึกของโลก\n//The Shards of Eternity... they are not a legend. They are the world's seal.",
        COLORS.purple,
      ],
      [
        null,
        "ภาพเวทมนตร์สุดท้ายของมาลาชาร์ยิ้มอย่างอ่อนล้า แต่มั่นใจ ก่อนเงาร่างจะหายไปทางประตูเหนือบัลลังก์\n>> ได้รับ: SHARD OF TRUTH\n//Malachar's last spell-image smiles with exhausted certainty before vanishing through the gate above the throne.\n//>> Received: SHARD OF TRUTH",
        COLORS.blue,
      ],
    ],
    next: "ch_sacrifice",
  },

  ch_sacrifice: {
    t: "choice",
    bg: "#08000c",
    illustration: GAME_VISUALS.scenes.sealCore,
    text: "ประตูเหนือบัลลังก์เปิดออก เศษนิรันดร์เริ่มดูดกลืนชีวิตของผู้ลี้ภัยที่ซ่อนอยู่ในถ้ำ\nหากคุณหยุดพิธีตอนนี้ มาลาชาร์จะมีเวลาหนีเข้าสู่แกนผนึก\nหากคุณไล่ตามเขาทันที ผู้บริสุทธิ์เหล่านั้นจะถูกเผาเป็นเชื้อไฟให้ Shard ชิ้นสุดท้าย\n\n//The gate above the throne opens. Shards of eternity begin feeding on refugees hidden in the cave.\n//If you stop the ritual now, Malachar will gain time to reach the Seal's Core.\n//If you chase him immediately, those innocents will burn as fuel for the final Shard.",
    choices: [
      {
        text: "[A] ช่วยผู้คนก่อน / Protect the people first.",
        flag: "protectedAethoria",
        reward: {
          shards: ["sacrifice"],
        },
        next: "s_sacrifice_shard",
      },
      {
        text: "[B] ไล่ตามมาลาชาร์ทันที / Pursue Malachar now.",
        flag: "partyBroken",
        next: "s_party_fracture",
      },
    ],
  },

  s_sacrifice_shard: {
    t: "scene",
    bg: "#100800",
    illustration: GAME_VISUALS.scenes.sealCore,
    title: "── ชิ้นส่วนแห่งการเสียสละ / SHARD OF SACRIFICE ──",
    lines: [
      [
        null,
        "ทั้งสามหันหลังให้เส้นทางหลบหนีของมาลาชาร์ แล้วลดอาวุธลงเพื่อประคองเด็ก คนชรา และทหารที่ยังมีลมหายใจ\nชัยชนะถูกเลื่อนออกไป เพื่อให้ชีวิตเหล่านี้ยังมีโอกาสไปถึงวันพรุ่งนี้\n//The three turn away from Malachar's escape route and lower their weapons to carry children, elders, and soldiers who still breathe.\nVictory is delayed so life may still reach tomorrow.",
        COLORS.white,
      ],
      [
        null,
        "เมื่อชีวิตสุดท้ายพ้นจากวงเวท แสงสีแดงที่เคยดูดกลืนพวกเขาก็หดตัวเป็น Shard สีเลือดอุ่น\n>> ได้รับ: SHARD OF SACRIFICE\n//When the last life leaves the circle, the red light that fed on them folds into a warm blood-colored Shard.\n//>> Received: SHARD OF SACRIFICE",
        COLORS.red,
      ],
      [
        "เพชรโตะ",
        "ถ้านิรันดร์บังคับให้เราทิ้งใครไว้ข้างหลัง... เราก็จะเอาชนะมันด้วยการพาทุกคนไปด้วย\n//If eternity demands that we leave people behind... then we will defeat it by carrying everyone with us.",
        COLORS.gold,
      ],
    ],
    next: "s_final_act",
  },

  s_party_fracture: {
    t: "scene",
    bg: "#120000",
    illustration: GAME_VISUALS.scenes.sealCore,
    title: "── รอยร้าวของทีม / PARTY FRACTURE ──",
    lines: [
      [
        null,
        "คุณพุ่งตามมาลาชาร์ไป เสียงกรีดร้องของผู้ลี้ภัยถูกทิ้งไว้เบื้องหลัง\nริเวนเป็นคนแรกที่หยุดวิ่ง ลีร่ากำมือแน่นจนเล็บจิกเข้าเนื้อ\n//You chase Malachar. The refugees' screams are left behind.\nRiven stops running first. Lyra clenches her fists until her nails draw blood.",
        COLORS.gray,
      ],
      [
        "ริเวน",
        "ถ้าเราช่วยโลกด้วยการปล่อยให้คนตรงหน้าตาย เราจะต่างจากมาลาชาร์ตรงไหน?\n//If we save the world by letting the people before us die, how are we different from Malachar?",
        COLORS.green,
      ],
      [
        null,
        "ทีมยังเดินหน้าต่อไป แต่บางสิ่งในใจพวกเขาไม่เคยกลับมาร่วมทางอีกเลย\n//The party continues, but something in them never walks together again.",
        COLORS.red,
      ],
    ],
    next: "s_final_act",
  },

  s_final_act: {
    t: "scene",
    bg: "#000014",
    illustration: GAME_VISUALS.scenes.sealCore,
    chapter: {
      kicker: "FINAL ACT",
      title: "THE SEAL'S CORE",
      subtitle: "Where every choice returns",
    },
    location: {
      name: "แกนผนึก / THE SEAL'S CORE",
      region: "Below the Mountain",
    },
    objective: {
      id: "final_battle",
      title: "หยุดมาลาชาร์ / Stop Malachar",
      desc: "นำ Shards ที่รวบรวมมาเข้าสู่ศึกตัดสินชะตา",
    },
    questUpdate: {
      completeCurrent: true,
    },
    savePoint: {
      label: "คริสตัลแกนผนึก / Core Crystal",
      note: "บันทึกก่อนศึกสุดท้าย",
    },
    title: "── บทสุดท้าย: แกนผนึก / FINAL ACT: THE SEAL'S CORE ──",
    reward: {
      items: [
        { id: "potion", name: "ยาฟื้นฟู / HEALTH POTION", d: "ฟื้น HP 60", c: 3 },
        { id: "ether", name: "อีเธอร์ / ETHER", d: "ฟื้น MP 40", c: 2 },
        { id: "revive", name: "ขนนกฟีนิกซ์ / PHOENIX DOWN", d: "ชุบชีวิตพร้อม HP 50%", c: 1 },
      ],
    },
    lines: [
      [
        null,
        "แกนผนึกอยู่ใต้ถ้ำ ลึกลงไปกว่ารากของภูเขา ที่นั่นไม่มีท้องฟ้า ไม่มีเวลา มีเพียง Shards หมุนวนรอบบัลลังก์ว่างเปล่า\n//The Seal's Core lies beneath the cave, deeper than the mountain's roots. There is no sky there, no time, only Shards circling an empty throne.",
        COLORS.gray,
      ],
      [
        "มาลาชาร์",
        "ข้าทำลายอาณาจักรหนึ่ง เพื่อไม่ให้อาณาจักรทั้งหมดถูกกลืน ข้าจองจำมังกรหนึ่งตน เพื่อไม่ให้ทั้งโลกกลายเป็นกรงขัง\n//I destroyed one kingdom so all kingdoms would not be swallowed. I caged one dragon so the whole world would not become a cage.",
        COLORS.white,
      ],
      [
        "เพชรโตะ",
        "เจ้าเรียกมันว่าการช่วยโลก เพราะเจ้าไม่เคยถามโลกเลยว่าอยากถูกช่วยด้วยวิธีนั้นหรือไม่\n//You call it saving the world because you never asked the world if it wanted to be saved that way.",
        COLORS.gold,
      ],
      [
        null,
        "ลีร่าแบ่งอีเธอร์ขวดสุดท้าย ริเวนพันแผลให้ทุกคน และเพชรโตะนับลมหายใจก่อนศึกสุดท้ายจะเริ่มขึ้น\n>> ได้รับ: ยาฟื้นฟู 3, อีเธอร์ 2, ขนนกฟีนิกซ์ 1\n//Lyra splits the last ethers. Riven binds everyone's wounds. Phetto counts one breath before the final battle.\n//>> Received: 3 Potions, 2 Ethers, 1 Phoenix Down",
        COLORS.green,
      ],
    ],
    next: "b4",
    battle: "b4",
  },

  end_peace: {
    t: "ending",
    illustration: GAME_VISUALS.scenes.vaelthornLair,
    titleColor: COLORS.blue,
    title: "ตอนจบ: ผู้ไถ่โทษ / ENDING: THE REDEEMER",
    lines: [
      [
        null,
        "เพชรโตะยกดาบขึ้น — แล้วฟาดลงบนตราผนึก\n//Phetto raises his blade — and strikes the Sigil.",
        COLORS.white,
      ],
      [
        null,
        "ตรานั้นแตกกระจายพร้อมเสียงสนั่น\nแสงสีทองพวยพุ่งออกมา และ Vaelthorn คำรามขึ้น\nไม่ใช่ด้วยความโกรธ — แต่ด้วยความโล่งใจจนเกินกลั้น\n//It shatters with a thunderous crack.\nGolden light erupts, and Vaelthorn roars —\nnot in fury, but in overwhelming relief.",
        COLORS.orange,
      ],
      [
        "VAELTHORN",
        '"ลูก ๆ ของข้า... ข้าจำพวกเจ้าได้แล้ว"\n"ข้าขอสาบานด้วยชีวิตต่อ Aethoria\nให้ข้าได้ช่วยฟื้นฟูสิ่งที่สูญเสียไป"\n//"My children... I remember you now."\n//"I swear my life to Aethoria —\nlet me help rebuild what was lost."',
        "#ff8844",
      ],
      [
        null,
        "มาลาชาร์ถูกจับกุม อำนาจมืดของเขาพังทลาย\nเขาถูกนำตัวไปเผชิญหน้ากับเหล่าขุนนางที่รอดชีวิต\n//Malachar is captured. His dark power collapses.\nHe is brought before the surviving lords of the realm.",
        COLORS.white,
      ],
      [
        null,
        "พ่อค้าผู้นั้นกลับสู่บ้านเกิด\nและเล่าเรื่องของเพชรโตะในทุกเมืองที่เดินทางผ่าน\nชื่อของนักรบผู้มีเมตตาจึงแพร่ไปทั่วแผ่นดิน\n//The merchant returned home\nand told Phetto's story in every town he passed through.\nThe name of the merciful warrior spread across the land.",
        COLORS.gold,
      ],
      [
        null,
        "ภายใต้พันธมิตรระหว่างมนุษย์และมังกร\nAethoria ฟื้นคืนสู่ความรุ่งเรืองยิ่งกว่าเดิม\nทุกเมืองที่สร้างขึ้นใหม่มีรูปสลักมังกรตั้งอยู่\nเพื่อเตือนใจว่า — ศัตรูที่แท้จริงอาจเป็นผู้ที่คุณไว้ใจที่สุด\n//Under the alliance of human and dragon,\nAethoria rose more glorious than ever before.\nIn every city rebuilt, a statue of the dragon stands —\na reminder that the true enemy may be the one you trust most.",
        COLORS.green,
      ],
      [null, "", COLORS.white],
      [
        null,
        "** ปลดล็อก TRUE ENDING — ผู้ไถ่โทษ **\n//** TRUE ENDING UNLOCKED — THE REDEEMER **",
        COLORS.gold,
      ],
    ],
  },

  end_war: {
    t: "ending",
    illustration: GAME_VISUALS.scenes.vaelthornLair,
    titleColor: COLORS.red,
    title: "ตอนจบ: นักแก้แค้น / ENDING: THE AVENGER",
    lines: [
      [
        null,
        "ดาบของเพชรโตะพุ่งลงมา\nVaelthorn ไม่ได้ขัดขืน — เขาเพียงหลับตาลง\n//Phetto's blade falls.\nVaelthorn doesn't resist — it simply closes its eyes.",
        COLORS.white,
      ],
      [
        null,
        "ทั้งถ้ำจมลงสู่ความเงียบสนิท\nแม้แต่เปลวไฟก็ดูเหมือนจะมอดดับไปพร้อมกัน\n//The cave falls into absolute silence.\nEven the fires seem to die with it.",
        COLORS.gray,
      ],
      [
        null,
        "เมื่อไร้อาวุธชิ้นสำคัญ อำนาจของมาลาชาร์ก็พังทลาย\nเขาถูกจับกุมในเวลาต่อมา — ด้วยข่าวกรองจากริเวน\n//Malachar's power crumbles without his weapon.\nHe is captured later — thanks to intelligence from Riven.",
        COLORS.white,
      ],
      [
        null,
        "Aethoria ได้รับการล้างแค้นแล้ว\nกษัตริย์องค์ใหม่จะขึ้นครองราชย์ อาณาจักรจะค่อย ๆ ฟื้นคืน\n//Aethoria is avenged.\nA new king will be crowned. The kingdom will recover.",
        COLORS.gold,
      ],
      [null, "", COLORS.white],
      [
        null,
        "แต่ในคืนนั้น เมื่อทุกคนหลับใหล\nเพชรโตะนั่งลำพังหน้าไฟที่ใกล้มอด\nและได้ยินเสียงกระซิบจากความทรงจำ\n//But that night, when everyone sleeps,\nPhetto sits alone before a dying fire\nand hears a whisper from his memory.",
        COLORS.gray,
      ],
      [
        null,
        "...เสียงร่ำไห้ของผู้ที่ไม่รู้ด้วยซ้ำว่าตนกำลังทำอะไรลงไป\n//...the weeping of a creature that didn't know what it was doing.",
        COLORS.red,
      ],
      [null, "", COLORS.white],
      [
        null,
        "** ราคาของการแก้แค้น คือความสงสัยที่ไม่มีวันเลือนหาย **\n//** THE PRICE OF VENGEANCE: A DOUBT THAT NEVER FADES **",
        COLORS.gold,
      ],
    ],
  },

  end_happy_1: {
    t: "ending",
    illustration: GAME_VISUALS.scenes.shardsRestored,
    titleColor: COLORS.gold,
    title: "HAPPY ENDING 1: SHARDS OF ETERNITY",
    lines: [
      [
        null,
        "เมื่อมาลาชาร์ล้มลง Shards ทั้งห้าหมุนวนรอบเพชรโตะ ไม่ใช่ดั่งอาวุธ แต่ดั่งคำถามที่ได้รับคำตอบครบถ้วน\n//When Malachar falls, the five Shards circle Phetto, not like weapons, but like questions finally answered.",
        COLORS.white,
      ],
      [
        null,
        "เมตตา ความกล้าหาญ ความทรงจำ ความจริง และการเสียสละ หลอมรวมกันเป็นผนึกใหม่\nนิรันดร์ไม่ได้ถูกทำลาย หากถูกทำให้จดจำว่าโลกนี้ยังมีชีวิต\n//Mercy, Courage, Memory, Truth, and Sacrifice join into a new seal.\nEternity is not destroyed. It is made to remember that this world is still alive.",
        COLORS.gold,
      ],
      [
        "VAELTHORN",
        "เจ้าไม่ได้ชนะเพราะแข็งแกร่งกว่าเขา แต่เพราะเจ้าไม่ยอมให้ความกลัวของเขากลายเป็นกฎของโลก\n//You did not win because you were stronger than him. You won because you refused to let his fear become the law of the world.",
        "#ff8844",
      ],
      [
        null,
        "Aethoria เริ่มต้นใหม่ ไม่ได้ยืนบนคำสาบานแห่งการแก้แค้น แต่ยืนบนชื่อของผู้ที่ยังช่วยไว้ได้ทัน\n//Aethoria begins again, not upon a vow of vengeance, but upon the names of those saved in time.",
        COLORS.green,
      ],
      [
        null,
        "** ปลดล็อก HAPPY ENDING 1 — SHARDS OF ETERNITY **\n//** HAPPY ENDING 1 UNLOCKED — SHARDS OF ETERNITY **",
        COLORS.gold,
      ],
    ],
  },

  end_bad_vaelthorn: {
    t: "ending",
    illustration: GAME_VISUALS.scenes.brokenSeal,
    titleColor: COLORS.red,
    title: "BAD ENDING: THE DRAGON'S SILENCE",
    lines: [
      [
        null,
        "มาลาชาร์พ่ายแพ้ในการต่อสู้ แต่เมื่อแกนผนึกแตก ไม่มีเสียงใดตอบรับ Shard of Memory\nVaelthorn จากไปแล้ว และความทรงจำที่โลกต้องการก็เงียบงันไปตลอดกาล\n//Malachar loses the battle, but when the Seal's Core breaks, no voice answers the Shard of Memory.\nVaelthorn is dead, and the memory the world needed is silent forever.",
        COLORS.red,
      ],
      [
        null,
        "โลกยังรอด... แต่ผนึกใหม่บิดเบี้ยว ในความฝัน ผู้คนเริ่มลืมชื่อของคนที่ตนรัก\n//The world survives... but the new seal is warped. In dreams, people begin forgetting the names of those they love.",
        COLORS.gray,
      ],
    ],
  },

  end_bad_fallen: {
    t: "ending",
    illustration: GAME_VISUALS.scenes.aethoriaRuins,
    titleColor: COLORS.red,
    title: "BAD ENDING: THE LAST SOLDIER FALLS",
    lines: [
      [
        null,
        "เพชรโตะล้มลงก่อนจะรวบรวม Shards ได้ครบ เสียงดาบของเขากระทบพื้นแผ่วเบายิ่งกว่าลมหายใจสุดท้ายของอาณาจักร\n//Phetto falls before the Shards can be gathered. His sword strikes the ground softer than the kingdom's final breath.",
        COLORS.red,
      ],
      [
        null,
        "มาลาชาร์ไม่จำเป็นต้องชนะอีกต่อไป เขาเพียงเดินผ่านซากความหวัง แล้วปล่อยให้นิรันดร์จัดการส่วนที่เหลือ\n//Malachar no longer needs to win. He only walks through the remains of hope and lets eternity finish the rest.",
        COLORS.gray,
      ],
    ],
  },

  end_bad_mercy: {
    t: "ending",
    illustration: GAME_VISUALS.scenes.aethoriaRuins,
    titleColor: COLORS.red,
    title: "BAD ENDING: A WORLD WITHOUT MERCY",
    lines: [
      [
        null,
        "คุณเอาชนะมาลาชาร์ได้ แต่ Shard of Mercy ไม่เคยตื่นขึ้น\nผนึกยอมรับพลังของคุณ แต่ปฏิเสธหัวใจที่แข็งกระด้าง\n//You defeat Malachar, but the Shard of Mercy never wakes.\nThe seal accepts your strength, but rejects your heart.",
        COLORS.red,
      ],
      [
        null,
        "Aethoria ถูกสร้างขึ้นใหม่อย่างแข็งแกร่ง เย็นชา และว่างเปล่า ผู้คนรอดชีวิต แต่ไม่มีใครเรียกที่แห่งนั้นว่าบ้าน\n//Aethoria is rebuilt strong, cold, and empty. People survive, but no one calls it home.",
        COLORS.gray,
      ],
    ],
  },

  end_bad_party: {
    t: "ending",
    illustration: GAME_VISUALS.scenes.brokenSeal,
    titleColor: COLORS.red,
    title: "BAD ENDING: THE BROKEN PARTY",
    lines: [
      [
        null,
        "มาลาชาร์ล้มลง แต่ทีมไม่ได้ยืนเคียงกันเมื่อแสงสุดท้ายมาถึง\nรอยแผลจากการทิ้งผู้บริสุทธิ์ไว้เบื้องหลังลึกยิ่งกว่าคมดาบใด ๆ\n//Malachar falls, but the party does not stand together when the final light arrives.\nThe wound left by abandoning innocents is deeper than any blade.",
        COLORS.red,
      ],
      [
        null,
        "ผนึกถูกสร้างขึ้นใหม่ด้วยมือที่ไม่อาจไว้ใจกัน และมันแตกร้าวอีกครั้งก่อนรุ่งสาง\n//The seal is remade by hands that no longer trust one another, and it cracks again before dawn.",
        COLORS.gray,
      ],
    ],
  },

  end_bad_memory: {
    t: "ending",
    illustration: GAME_VISUALS.scenes.brokenSeal,
    titleColor: COLORS.red,
    title: "BAD ENDING: NAMELESS TOMORROW",
    lines: [
      [
        null,
        "คุณมีพลังมากพอจะปิดประตูสู่นิรันดร์ แต่ไม่มี Memory Shard คอยบอกโลกว่าสิ่งใดควรถูกจดจำ\n//You have enough power to close eternity's gate, but no Memory Shard to tell the world what must be remembered.",
        COLORS.red,
      ],
      [
        null,
        "ผู้คนตื่นขึ้นในเมืองที่ปลอดภัย โดยไม่รู้ว่าตนกำลังหลั่งน้ำตาให้ใคร\n//People wake in safe cities, not knowing whose names they are crying for.",
        COLORS.gray,
      ],
    ],
  },

  end_bad_sacrifice: {
    t: "ending",
    illustration: GAME_VISUALS.scenes.brokenSeal,
    titleColor: COLORS.red,
    title: "BAD ENDING: PRICE UNPAID",
    lines: [
      [
        null,
        "มาลาชาร์เข้าใจสิ่งหนึ่งถูกต้อง: ผนึกนิรันดร์ต้องมีผู้จ่ายราคา\nแต่เมื่อถึงเวลานั้น คุณเลือกชัยชนะที่เร็วกว่า แทนชีวิตที่รอความช่วยเหลือ\n//Malachar was right about one thing: eternity's seal demands a price.\nBut when the moment came, you chose the quicker victory over the lives waiting to be saved.",
        COLORS.red,
      ],
      [
        null,
        "ประตูปิดลงพร้อมเสียงของผู้บริสุทธิ์ และนับจากคืนนั้น ไม่มีใครในทีมหลับสนิทได้อีกเลย\n//The gate closes with the voices of innocents, and no one in the party sleeps again.",
        COLORS.gray,
      ],
    ],
  },

  end_bad_shards: {
    t: "ending",
    illustration: GAME_VISUALS.scenes.brokenSeal,
    titleColor: COLORS.red,
    title: "BAD ENDING: SHARDS UNMADE",
    lines: [
      [
        null,
        "Shards ที่ไม่ครบพยายามสร้างผนึกใหม่ แต่ช่องว่างระหว่างชิ้นส่วนกลับกลายเป็นประตู\nสิ่งที่มาลาชาร์หวาดกลัวไม่ได้ตายไป มันเพียงพบทางเข้าที่แคบกว่าเดิม\n//The incomplete Shards try to form a new seal, but the spaces between them become doors.\nThe thing Malachar feared does not die. It simply finds a narrower way in.",
        COLORS.red,
      ],
      [
        null,
        "Aethoria ได้เห็นรุ่งเช้าอีกครั้ง แต่เงาของมันทอดยาวผิดธรรมชาติ และไม่มีใครกล้าถามว่าปลายเงานั้นชี้ไปหาอะไร\n//Aethoria sees dawn again, but its shadow is unnaturally long, and no one dares ask what it points toward.",
        COLORS.gray,
      ],
    ],
  },
};

export {
  BATTLE_IDS,
  COLORS,
  GAME_VISUALS,
  SCENE_IDS,
  SCREEN_IDS,
  SHARDS,
  SHARDS_REQUIRED,
  createDefaultParty,
  createEnemiesFromKeys,
  BATTLES,
  SHOP_ITEMS,
  SCENES,
};
