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

const createDefaultParty = () => [
  {
    id: "phetto",
    name: "เพชรโตะ",
    nameEn: "PHETTO",
    cls: "WARRIOR",
    color: COLORS.gold,
    e: "[W]",
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
        desc: "ฟันดาบอันทรงพลัง\n//Powerful sword slash",
      },
      {
        name: "SHIELD BASH",
        mp: 8,
        mult: 0.9,
        type: "atk",
        tar: "one",
        stun: true,
        desc: "โจมตี + ทำให้งัก 1 เทิร์น\n//Attack + stun 1 turn",
      },
      {
        name: "WAR CRY",
        mp: 14,
        mult: 0,
        type: "buff",
        tar: "party",
        bufAmt: 8,
        bufT: 3,
        desc: "ATK ปาร์ตี้ +8 (3 เทิร์น)\n//Party ATK +8 for 3 turns",
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
        desc: "ระเบิดไฟเวทมนตร์\n//Magical fire blast",
      },
      {
        name: "BLIZZARD",
        mp: 20,
        mult: 1.1,
        type: "atk",
        tar: "all",
        desc: "น้ำแข็งโจมตีทุกศัตรู\n//Ice magic — all enemies",
      },
      {
        name: "HEAL",
        mp: 15,
        mult: 0,
        type: "heal",
        tar: "ally",
        healAmt: 55,
        desc: "ฟื้นฟู HP 55\n//Restore 55 HP to ally",
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
        desc: "ยิงธนูแม่นยำ\n//Precise piercing shot",
      },
      {
        name: "ARROW RAIN",
        mp: 16,
        mult: 0.85,
        type: "atk",
        tar: "all",
        desc: "ฝนธนูโจมตีทุกศัตรู\n//Volley hits all enemies",
      },
      {
        name: "POISON ARROW",
        mp: 10,
        mult: 0.75,
        type: "atk",
        tar: "one",
        poison: true,
        desc: "วางยาพิษ 3 เทิร์น\n//Poisons for 3 turns",
      },
    ],
  },
];

const createEnemiesFromKeys = (keys) => {
  const D = {
    goblin: {
      name: "GOBLIN",
      e: "(G)",
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
      hp: 320,
      atk: 46,
      def: 22,
      gold: 300,
      xp: 0,
      color: "#ff6600",
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
    msg: "ก็อบลินซุ่มโจมตีในซากปรักหักพัง!\n//Goblins ambush you in the ruins!",
    after: "c_after1",
  },
  b2: {
    keys: ["skeleton", "goblinChief"],
    msg: "อัศวินโครงกระดูกปิดกั้นช่องเขา!\n//A Skeleton Knight blocks the mountain pass!",
    after: "c_shop",
  },
  b3: {
    keys: ["vaelthorn"],
    msg: "VAELTHORN โผล่ขึ้นมาจากความมืดนิรันดร์!\n//VAELTHORN rises from the eternal dark!",
    after: "c_boss_after",
  },
};

const SHOP_ITEMS = [
  {
    id: "potion",
    name: "ยาฟื้นฟู / HEALTH POTION",
    d: "ฟื้นฟู HP 60 / Restore 60 HP",
    price: 30,
    type: "item",
  },
  {
    id: "ether",
    name: "อีเธอร์ / ETHER",
    d: "ฟื้นฟู MP 40 / Restore 40 MP",
    price: 40,
    type: "item",
  },
  {
    id: "revive",
    name: "ขนนกฟีนิกซ์ / PHOENIX DOWN",
    d: "ฟื้นคืนชีพที่ HP 50%",
    price: 75,
    type: "item",
  },
  {
    id: "up_phetto",
    name: "ตีดาบ: IRON SWORD+",
    d: "ATK ของ เพชรโตะ +12",
    price: 90,
    type: "upgrade",
    target: "phetto",
    amt: 12,
  },
  {
    id: "up_lyra",
    name: "ตีไม้เท้า: OAK STAFF+",
    d: "ATK ของ ลีร่า +14",
    price: 110,
    type: "upgrade",
    target: "lyra",
    amt: 14,
  },
  {
    id: "up_riven",
    name: "ตีธนู: ASH BOW+",
    d: "ATK ของ ริเวน +12",
    price: 90,
    type: "upgrade",
    target: "riven",
    amt: 12,
  },
];

// Lines: [speaker, "thai\n//english", color]
const SCENES = {
  s_intro: {
    t: "scene",
    bg: "#180008",
    title: "── บทที่ 1: การล่มสลาย / ACT I: THE FALL ──",
    lines: [
      [null, "AETHORIA ปีที่ 847\n//AETHORIA, YEAR 847", COLORS.gray],
      [
        null,
        "เปลวเพลิงสูงท่วมหลังคาปราสาท เผาทุกสิ่งที่กษัตริย์สร้างด้วยพระชนม์ชีพ\nท้องฟ้าเป็นสีส้มเลือด ควันดำพวยขึ้นปิดดาวทุกดวง\n//Flames taller than the castle towers devoured everything the King built.\nThe sky bled orange. Black smoke swallowed every star.",
        COLORS.white,
      ],
      [
        null,
        "เสียงร้องไห้ของผู้บริสุทธิ์กลืนหายไปในเสียงเพลิงที่ลุกท่วม\nกำแพงเมืองที่แข็งแกร่งมาพันปีพังทะลายในคืนเดียว\n//The cries of the innocent dissolved into the roar of the flames.\nWalls that stood for a thousand years — crumbled in a single night.",
        COLORS.gray,
      ],
      [
        null,
        "แต่ไม่ใช่ไฟมังกรที่เผาอาณาจักรลงจนราบ\nมันคือไฟแห่งการทรยศ — ร้อนกว่า และมอดยากกว่าไฟใดในโลก\n//But it was not dragon fire that brought Aethoria down.\nIt was the fire of betrayal — hotter, and far harder to extinguish.",
        COLORS.red,
      ],
      [
        null,
        "ลอร์ด มาลาชาร์ — ที่ปรึกษาที่กษัตริย์วางใจเหมือนพี่น้อง —\nเปิดประตูให้ศัตรูในคืนอันมืดมิด กองทัพหลั่งเข้าเมืองดั่งน้ำท่วม\n//Lord Malachar — trusted by the King like a brother —\nopened the gates at midnight. The enemy army poured in like a dark flood.",
        COLORS.gray,
      ],
      [
        null,
        "เมื่อรุ่งเช้า... อาณาจักร Aethoria ไม่มีอีกต่อไป\nมีทหารเพียงคนเดียวที่รอดจากการสังหารหมู่\n//By dawn... the kingdom of Aethoria was no more.\nOnly one soldier survived the massacre.",
        COLORS.white,
      ],
    ],
    next: "s_intro2",
  },

  s_intro2: {
    t: "scene",
    bg: "#1a0800",
    lines: [
      [
        "เพชรโตะ",
        "*ไอ* ...ฉันอยู่ที่ไหน?\n//*coughs* ...Where am I?",
        COLORS.gold,
      ],
      [
        null,
        "[ เพชรโตะลืมตาขึ้น — ควันดำคลุ้มโดยรอบ\nไฟยังลุกไหม้อยู่ไกลๆ ซากปราสาทพังทะลาย\nร่างของเพื่อนทหารนอนเรียงรายทั่วพื้นหิน ]\n//[ Phetto opens his eyes — black smoke fills the air.\nFires still rage in the distance. The castle walls have crumbled.\nThe bodies of his fallen comrades lie scattered across the stone floor. ]",
        COLORS.gray,
      ],
      [
        "เพชรโตะ",
        "กษัตริย์... ทุกคนที่ฉันปกป้อง...\nหายไปหมดแล้ว ไม่เหลือเลยสักคน\n//The King... everyone I swore to protect...\nAll gone. Not one left.",
        COLORS.gold,
      ],
      [
        "เพชรโตะ",
        "มาลาชาร์\nฉันจะตามหาเจ้า — ผ่านนรกกี่ชั้นก็ตาม\nเจ้าจะต้องชดใช้ทุกหยดเลือดที่หลั่งไหลคืนนี้\n//Malachar.\nI will find you — through every circle of hell if I must.\nYou will answer for every drop of blood spilled tonight.",
        COLORS.gold,
      ],
    ],
    next: "b1",
    battle: "b1",
  },

  c_after1: {
    t: "scene",
    bg: "#0a1400",
    lines: [
      [
        null,
        "คุณฝ่าซากปรักหักพังที่ยังคุกรุ่น\nเถ้าถ่านปลิวใส่หน้า เท้าทุกก้าวเหยียบลงบนซากของอดีต\n//You push through the smoldering ruins.\nAsh stings your face. Every step treads upon the remnants of the past.",
        COLORS.white,
      ],
      [
        null,
        "แสงจันทร์แหลมผ่านช่องหลังคาที่พังถล่ม\nทอดเงาขวางทางเหมือนลายซี่กรงขัง — ราวกับว่า\nแม้แต่แสงก็กลัวที่จะส่องพื้นที่แห่งนี้\n//Moonlight pierces through the collapsed roof,\ncasting barred shadows across the path — as if\neven light fears to fully illuminate this place.",
        COLORS.gray,
      ],
      [
        null,
        "แล้วในความเงียบที่ตึงเครียด...\nเสียงร้องก็แทรกขึ้นมา — ชัดเจน ตื่นตกใจ\n//Then — cutting through the tense silence —\na cry rises. Clear. Desperate.",
        COLORS.white,
      ],
    ],
    next: "ch_merchant",
  },

  ch_merchant: {
    t: "choice",
    bg: "#0a1400",
    text: 'กลางซากถนนที่เต็มไปด้วยเปลวไฟ\nพ่อค้าวัยกลางคนหมอบอยู่มุมตึก\nก็อบลินสองตัวรุมล้อม มีดในมือเขาสั่นรัว\n\nเขาตะโกนขึ้นเมื่อเห็นคุณ\n"ช่วยข้าด้วย!"\n\n// Amid burning ruins, a middle-aged merchant cowers in a corner.\n// Two goblins close in. The knife in his hand trembles.\n// He cries out the moment he sees you:\n// "Please — help me!"',
    choices: [
      {
        text: "[A] สู้เพื่อช่วยพ่อค้า! / Fight for him!",
        flag: "saved",
        reward: {
          gold: 90,
          items: [
            { id: "potion", name: "HEALTH POTION", d: "Restore 60 HP", c: 2 },
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
    lines: [
      [
        null,
        "ก็อบลินสองตัวล้มลง พ่อค้าหอบหายใจ\nมือของเขาสั่นแต่ตาเขาเป็นประกาย\n//The two goblins fall. The merchant gasps for air.\nHis hands tremble — but his eyes burn bright.",
        COLORS.white,
      ],
      [
        "พ่อค้า",
        "ขอบคุณ... ขอบคุณมาก\nข้าไม่เคยลืมบุญคุณของท่านได้เลย\n//Thank you... thank you so much.\nI will never forget what you've done.",
        COLORS.orange,
      ],
      [
        "พ่อค้า",
        "เอาสิ่งนี้ไปก่อน — มันน้อยนิด\nแต่มันคือทุกอย่างที่ข้ามีตอนนี้\n//Take this — it's little,\nbut it's everything I have right now.",
        COLORS.orange,
      ],
      [
        null,
        ">> ได้รับ: 90 ทอง + ยาฟื้นฟู 2 ขวด!\n//>> Received: 90 Gold + 2 Health Potions!",
        COLORS.green,
      ],
      [
        null,
        "[ ในความมืดของคืนนั้น ความเมตตาเล็กๆ ได้ถูกหว่านลงไป\nไม่มีใครรู้ว่ามันจะงอกออกดอกผลอะไรในอนาคต ]\n//[ In the darkness of that night, a small act of mercy was sown.\nNo one could know yet what it would one day bear. ]",
        COLORS.gold,
      ],
    ],
    next: "s_lyra",
  },

  c_left: {
    t: "scene",
    bg: "#0a0a0a",
    lines: [
      [
        null,
        "คุณเดินผ่านโดยไม่หยุด\nเสียงร้องของพ่อค้าจางลงข้างหลัง\n//You walk past without stopping.\nThe merchant's cries fade behind you.",
        COLORS.gray,
      ],
      [
        "เพชรโตะ",
        "...ฉันไม่มีเวลา ไม่ใช่คืนนี้\nมีหน้าที่ที่ใหญ่กว่านี้รออยู่\n//...I have no time. Not tonight.\nThere is a greater duty waiting.",
        COLORS.gold,
      ],
      [
        null,
        "[ ความเย็นชาแผ่ซ่านเข้าแทนที่ความอบอุ่น\nนักรบที่แน่วแน่ไม่มีที่ให้ความสงสาร ]\n//[ A cold resolve replaces warmth.\nA determined warrior has no room for pity. ]",
        COLORS.red,
      ],
    ],
    next: "s_lyra",
  },

  s_lyra: {
    t: "scene",
    bg: "#0a0a1a",
    title: "── ป่าแอชวูด / ASHWOOD FOREST ──",
    lines: [
      [
        null,
        "ป่าแอชวูด — ที่ซึ่งต้นไม้แก่นับร้อยปียืนราวทหารเฝ้ายาม\nรากไม้ขดงอออกจากดินดำราวเส้นเลือดขอด\nใบไม้แห้งกรอบเสียดสีกัน กระซิบเรื่องราวที่ลืมเลือนไปนานแล้ว\n//Ashwood Forest — where ancient trees stand sentinel like old soldiers.\nGnarled roots claw out of black earth like varicose veins.\nDry leaves rasp against each other, whispering stories long forgotten.",
        COLORS.gray,
      ],
      [
        "ลีร่า",
        "คุณกำลังมุ่งหน้าไปถ้ำของ Vaelthorn\n//You're heading for Vaelthorn's Lair.",
        COLORS.purple,
      ],
      [
        "เพชรโตะ",
        "คุณเป็นใคร? ออกมาจากเงาได้เลย\n//Who are you? Step out of the shadow.",
        COLORS.gold,
      ],
      [
        "ลีร่า",
        "ผู้ที่รู้ว่ามาลาชาร์ทำอะไรลงไปจริงๆ\n//Someone who knows what Malachar truly did.",
        COLORS.purple,
      ],
      [
        "ลีร่า",
        "เขาไม่ได้แค่ทรยศอาณาจักร\nเขาใช้ Vaelthorn เป็นอาวุธ — มังกรที่ถูกจองจำด้วยตราสัญลักษณ์มืด\nฉันรู้คาถาที่ทำลายมันได้\n//He didn't just betray the kingdom.\nHe is using Vaelthorn as a weapon — a dragon bound by his dark sigil.\nI know the spell that can break it.",
        COLORS.purple,
      ],
      [
        "เพชรโตะ",
        "...มาเลย แต่ตามให้ทัน\n//...Come then. But keep up.",
        COLORS.gold,
      ],
    ],
    next: "s_riven",
  },

  s_riven: {
    t: "scene",
    bg: "#0a1a0a",
    lines: [
      [
        null,
        "เสียงกิ่งหักดังขึ้นเหนือศีรษะ\nแล้วร่างก็ร่อนลงจากกิ่งไม้สูง\nลงจอดได้อย่างเงียบงันเหมือนแมวป่า\n//A branch snaps overhead.\nThen a figure drops from high above,\nlanding with the silent grace of a wildcat.",
        COLORS.white,
      ],
      [
        "ริเวน",
        "เพชรโตะ! ยังมีชีวิตอยู่!\n//Phetto! You're alive!",
        COLORS.green,
      ],
      [
        "เพชรโตะ",
        "ริเวน... ฉันคิดว่าแกตายไปแล้ว\n//Riven... I thought you were dead.",
        COLORS.gold,
      ],
      [
        "ริเวน",
        "เกือบแล้ว มีรอยแผลห้าแห่งเป็นพยาน\nแต่ฉันติดตามกองกำลังของมาลาชาร์มาตลอด\n//Almost. Five scars can testify.\nBut I've been tracking Malachar's forces the whole time.",
        COLORS.green,
      ],
      [
        "ริเวน",
        "พวกมันทุกกองกำลังมุ่งหน้าไปยังถ้ำ\nถ้าเราไม่หยุดพวกมันตรงนั้น มันจะสายเกินไป\nฉันอยู่เคียงข้างเจ้า — จนกว่าจะถึงที่สุด\n//Every unit is converging on the Lair.\nIf we don't stop them there, it will be too late.\nI'm with you — till the very end.",
        COLORS.green,
      ],
      [
        null,
        "** ลีร่า และ ริเวน เข้าร่วมปาร์ตี้แล้ว! **\n//** LYRA and RIVEN have joined the party! **",
        COLORS.gold,
      ],
    ],
    next: "s_act2",
    joinParty: true,
  },

  s_act2: {
    t: "scene",
    bg: "#1a0a00",
    title: "── บทที่ 2: ช่องเขา / ACT II: THE MOUNTAIN PASS ──",
    lines: [
      [
        null,
        "ช่องเขาที่ลมหนาวพัดไม่หยุด\nหินดำเปื้อนคราบสนิมและเลือดเก่าของผู้ที่เคยเดินผ่าน\nกระดูกของทหารนิรนามเรียงรายข้างทางดั่งหลักหมุด\n//A narrow mountain pass where bitter winds never cease.\nBlack stone stained with old rust and blood from those who came before.\nThe bones of nameless soldiers line the path like grim markers.",
        COLORS.gray,
      ],
      [
        null,
        "ไอน้ำจากปากปกคลุมอากาศ\nทุกเสียงเท้าก้องสะท้อนหน้าผาราวว่าภูเขากำลังฟังอยู่\n//Breath mists the freezing air.\nEvery footstep echoes off the cliffs as if the mountain itself is listening.",
        COLORS.white,
      ],
      [
        "ริเวน",
        "อัศวินโครงกระดูกข้างหน้า! เตรียมอาวุธ!\n//Skeleton Knights ahead! Weapons ready!",
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
    title: "── บทที่ 3: ถ้ำวาเอลธอร์น / ACT III: VAELTHORN'S LAIR ──",
    lines: [
      [
        null,
        "ถ้ำที่แม้แต่ลมก็ไม่กล้าเข้า\nผนังหินเต็มไปด้วยรอยเล็บที่ขีดซ้ำแล้วซ้ำเล่า\nเหมือนสัตว์ร้ายที่ถูกขังพยายามนับวันที่ผ่านไป\n//A cave where even the wind dares not enter.\nThe stone walls are covered in claw marks scratched over and over —\nlike a caged beast trying to count the passing days.",
        COLORS.gray,
      ],
      [
        null,
        "ในความมืดสนิท มีกลิ่นเหมือนเลือดเก่าและน้ำตา\nรอยขีดข่วนบางรอยลึกเป็นนิ้ว — ทำโดยสัตว์ที่เจ็บปวด\nไม่ใช่สัตว์ที่โกรธเกรี้ยว\n//In the pitch dark, there is a smell of old blood and something else.\nSome claw marks cut inches deep — made by something in anguish,\nnot in rage.",
        COLORS.white,
      ],
      [
        "ลีร่า",
        "นั่น — ตราสัญลักษณ์ของมาลาชาร์!\nมันผูกพัน Vaelthorn ไว้กับเจตจำนงของเขา!\n//There — Malachar's Sigil!\nIt binds Vaelthorn to his will!",
        COLORS.purple,
      ],
      ["เพชรโตะ", "คุณทำลายมันได้ไหม?\n//Can you break it?", COLORS.gold],
      [
        "ลีร่า",
        "ได้... แต่ต้องทำให้มันอ่อนแอก่อน\nตราสัญลักษณ์จะหลุดออกเองเมื่อเจ้าของมันสั่นคลอน\n//Yes... but we must weaken him first.\nThe Sigil loosens when its host is brought to the edge.",
        COLORS.purple,
      ],
      [
        null,
        "แผ่นดินแยกออก เพดานถ้ำสั่นสะเทือน\nเศษหินร่วงหล่นดังรอบข้าง\nแล้วเงาขนาดมหึมาก็พุ่งขึ้นจากความมืด\n//The ground splits. The cave ceiling shudders.\nStone fragments rain down all around.\nThen — from the dark below — a massive shadow rises.",
        COLORS.red,
      ],
      [
        "VAELTHORN",
        "ผู้บุกรุก...\nพวกเจ้ากล้าเดินเข้ามาในห้องขังของข้า?!\nเจ้าจะได้รู้ว่าเปลวไฟนิรันดร์หมายความว่าอะไร!!\n//Intruders...\nYou dare walk into my prison?!\nYou will learn what the eternal flame truly means!!",
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
    lines: [
      [
        null,
        "ในขณะที่ทั้งสามหายใจหอบ\nเสียงเท้าเร็วดังก้องเข้ามาจากปากถ้ำ\nพร้อมแสงไต้ที่ส่องกระพริบ\n//As the three of you struggle to catch your breath,\nquick footsteps echo from the cave entrance.\nA flickering torchlight bobs closer.",
        COLORS.white,
      ],
      [
        "พ่อค้า",
        "ท่าน! ท่านรอดมาได้!\nข้าตามมาตลอดทาง... ขาแทบขาด\n//You! You survived!\nI've been following you the whole way... my legs are gone.",
        COLORS.orange,
      ],
      [
        "เพชรโตะ",
        "คุณ...? ทำไม? ที่นี่อันตราย\n//You...? Why? It's dangerous here.",
        COLORS.gold,
      ],
      [
        "พ่อค้า",
        "เพราะข้ามีสิ่งที่ท่านต้องรู้\nสามคืนก่อน ข้าแอบเข้ามาถ้ำนี้เพื่อหาสมุนไพร\n//Because I have something you need to know.\nThree nights ago, I snuck into this cave searching for herbs.",
        COLORS.orange,
      ],
      [
        "พ่อค้า",
        "และข้าได้ยินเสียงมังกรนั้น...\nมันไม่ได้คำราม ไม่ได้เผาไหม้อะไร\nมันร้องไห้\n//And I heard that dragon...\nIt wasn't roaring. It wasn't burning anything.\nIt was weeping.",
        COLORS.orange,
      ],
      [
        "พ่อค้า",
        "มันร้องหาชื่อ — ชื่อลูกๆ ของมัน\nมาลาชาร์สังหารพวกมันก่อนที่จะจองจำ Vaelthorn\nตราสัญลักษณ์นั้นไม่ได้แค่ควบคุมมัน\nมันลบความทรงจำของมันทิ้งด้วย\n//It was calling out names — the names of its children.\nMalachar killed them before enslaving Vaelthorn.\nThat Sigil doesn't just control it —\nit erases its memory. Vaelthorn doesn't know who he is anymore.",
        COLORS.orange,
      ],
      [
        "ลีร่า",
        "...เขาพูดถูก ข้าเคยอ่านเจอในตำรา\nแต่ข้าไม่คิดว่ามาลาชาร์โหดร้ายถึงขนาดนั้น\n//...He's right. I've read about this.\nI never thought Malachar could be this cruel.",
        COLORS.purple,
      ],
      [
        "พ่อค้า",
        "เอาสิ่งนี้ไปด้วย ข้าเก็บมาตลอดทาง\nหวังว่าจะได้ตอบแทนบุญคุณของท่านสักครั้ง\n//Take these with you. I've been saving them the whole way.\nI hoped I'd have a chance to repay what you did for me.",
        COLORS.orange,
      ],
      [
        null,
        ">> ได้รับ: ยาฟื้นฟู 3 ขวด!\n>> [ ความจริงที่ซ่อนอยู่ในใจกลางความเจ็บปวดของมังกร\nกำลังรอให้คุณเลือก ]\n//>> Received: 3 Health Potions!\n//>> [ The truth hidden at the heart of the dragon's agony\nwaits for your judgment. ]",
        COLORS.green,
      ],
    ],
    next: "ch_vaelthorn",
    reward: {
      items: [
        { id: "potion", name: "HEALTH POTION", d: "Restore 60 HP", c: 3 },
      ],
    },
  },

  ch_vaelthorn: {
    t: "choice",
    bg: "#1a0000",
    text: 'Vaelthorn ล้มลง บาดเจ็บสาหัส\nตราสัญลักษณ์รอบคอของมันร้าวแตก\nแสงสีแดงดับวูบ...\n\nแล้วเสียงแผ่วเบาก็แทรกออกมาจากหน้ากากแห่งความเจ็บปวด:\n\n"พ่อมดนั้น... จองจำข้า\nข้าไม่เคยต้องการทำลายอาณาจักรของพวกเจ้า\nข้าแค่... อยากเห็นลูกๆ ข้าอีกครั้ง"\n\n//Vaelthorn collapses, gravely wounded.\n//The Sigil around his neck fractures.\n//The crimson light flickers and dies...\n//Then a faint voice escapes from beneath the mask of pain:\n//"The wizard enslaved me.\n//I never wanted to destroy your kingdom.\n//I only... wanted to see my children again."',
    choices: [
      {
        text: "[A] ทุบตราสัญลักษณ์ ปลดปล่อยมัน / Shatter the Sigil.",
        flag: "spared",
        next: "end_peace",
      },
      {
        text: "[B] ไม่มีความเมตตา ยุติมันตอนนี้ / No mercy. End this.",
        flag: "killed",
        next: "end_war",
      },
    ],
  },

  end_peace: {
    t: "ending",
    titleColor: COLORS.blue,
    title: "ตอนจบ: ผู้ไถ่โทษ / ENDING: THE REDEEMER",
    lines: [
      [
        null,
        "เพชรโตะยกดาบขึ้น — และฟาดลงที่ตราสัญลักษณ์\n//Phetto raises his blade — and strikes the Sigil.",
        COLORS.white,
      ],
      [
        null,
        "มันแตกเป็นเสี่ยงพร้อมเสียงดังกึก\nแสงสีทองพุ่งออกมา และ Vaelthorn คำรามขึ้น\nไม่ใช่ด้วยความโกรธ — แต่ด้วยความโล่งอก\n//It shatters with a thunderous crack.\nGolden light erupts, and Vaelthorn roars —\nnot in fury, but in overwhelming relief.",
        COLORS.orange,
      ],
      [
        "VAELTHORN",
        '"ลูกๆ ของข้า... ข้าจำพวกเจ้าได้แล้ว"\n"ข้าสาบานชีวิตให้แก่ Aethoria\nให้ข้าช่วยสร้างสิ่งที่สูญเสียไปให้กลับคืนมา"\n//"My children... I remember you now."\n//"I swear my life to Aethoria —\nlet me help rebuild what was lost."',
        "#ff8844",
      ],
      [
        null,
        "มาลาชาร์ถูกจับกุม อำนาจมืดของเขาพังทลาย\nเขาถูกนำตัวมาเผชิญกับขุนนางที่รอดชีวิต\n//Malachar is captured. His dark power collapses.\nHe is brought before the surviving lords of the realm.",
        COLORS.white,
      ],
      [
        null,
        "พ่อค้าผู้นั้นกลับไปบ้านเกิดเมืองนอน\nและเล่าเรื่องราวของเพชรโตะในทุกเมืองที่เขาผ่าน\nชื่อของนักรบผู้มีเมตตาแพร่กระจายไปทั่วแผ่นดิน\n//The merchant returned home\nand told Phetto's story in every town he passed through.\nThe name of the merciful warrior spread across the land.",
        COLORS.gold,
      ],
      [
        null,
        "ภายใต้พันธมิตรระหว่างมนุษย์กับมังกร\nAethoria ฟื้นคืนสู่ความรุ่งโรจน์มากกว่าเดิม\nและในทุกเมืองที่ถูกสร้างขึ้นใหม่ จะมีรูปสลักของมังกร\nเตือนให้คนจำว่า — ศัตรูที่แท้จริงอาจเป็นผู้ที่คุณไว้ใจที่สุด\n//Under the alliance of human and dragon,\nAethoria rose more glorious than ever before.\nIn every city rebuilt, a statue of the dragon stands —\na reminder that the true enemy may be the one you trust most.",
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
    titleColor: COLORS.red,
    title: "ตอนจบ: นักแก้แค้น / ENDING: THE AVENGER",
    lines: [
      [
        null,
        "ดาบของเพชรโตะพุ่งลงมา\nVaelthorn ไม่ได้สู้ตอบ — มันแค่หลับตาลง\n//Phetto's blade falls.\nVaelthorn doesn't resist — it simply closes its eyes.",
        COLORS.white,
      ],
      [
        null,
        "ถ้ำกลายเป็นความเงียบสนิท\nแม้แต่ไฟก็มอดลงพร้อมกัน\n//The cave falls into absolute silence.\nEven the fires seem to die with it.",
        COLORS.gray,
      ],
      [
        null,
        "อำนาจของมาลาชาร์พังทลายโดยไม่มีอาวุธ\nเขาถูกจับกุมในเวลาต่อมา — ขอบคุณข่าวจากริเวน\n//Malachar's power crumbles without his weapon.\nHe is captured later — thanks to intelligence from Riven.",
        COLORS.white,
      ],
      [
        null,
        "Aethoria ได้รับการแก้แค้นแล้ว\nกษัตริย์องค์ใหม่จะถูกสวมมงกุฎ อาณาจักรจะฟื้นคืน\n//Aethoria is avenged.\nA new king will be crowned. The kingdom will recover.",
        COLORS.gold,
      ],
      [null, "", COLORS.white],
      [
        null,
        "แต่ในคืนวันนั้น เมื่อทุกคนนอนหลับ\nเพชรโตะนั่งอยู่คนเดียวหน้ากองไฟ\nและได้ยินเสียงกระซิบจากความทรงจำ\n//But that night, when everyone sleeps,\nPhetto sits alone before a dying fire\nand hears a whisper from his memory.",
        COLORS.gray,
      ],
      [
        null,
        "...เสียงร้องไห้ของสัตว์ร้ายที่ไม่รู้ว่าตัวเองกำลังทำอะไร\n//...the weeping of a creature that didn't know what it was doing.",
        COLORS.red,
      ],
      [null, "", COLORS.white],
      [
        null,
        "** ราคาของการแก้แค้น คือความสงสัยที่ไม่มีวันจางหาย **\n//** THE PRICE OF VENGEANCE: A DOUBT THAT NEVER FADES **",
        COLORS.gold,
      ],
    ],
  },
};

export { COLORS, createDefaultParty, createEnemiesFromKeys, BATTLES, SHOP_ITEMS, SCENES };
