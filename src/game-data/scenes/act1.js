import { COLORS } from "../colors";
import { GAME_VISUALS } from "../visuals";
import { line } from "../sceneLine";

export const ACT1_SCENES = {
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
      line({
        text: "AETHORIA ปีที่ 847\n//AETHORIA, YEAR 847",
        color: COLORS.gray,
      }),
      line({
        text: "เปลวเพลิงสูงกว่าหอคอย กลืนทุกสิ่งที่กษัตริย์ทุ่มทั้งชีวิตสร้างไว้\nท้องฟ้าแดงดั่งเลือด ควันดำพวยขึ้นกลบดาวทุกดวง\n//Flames taller than the castle towers devoured everything the King built.\nThe sky bled orange. Black smoke swallowed every star.",
        color: COLORS.white,
      }),
      line({
        text: "เสียงร่ำไห้ของผู้บริสุทธิ์ถูกกลืนหายไปในเสียงเพลิงคำราม\nกำแพงเมืองที่ยืนหยัดมานับพันปีพังทลายภายในคืนเดียว\n//The cries of the innocent dissolved into the roar of the flames.\nWalls that stood for a thousand years — crumbled in a single night.",
        color: COLORS.gray,
      }),
      line({
        text: "แต่สิ่งที่เผา Aethoria จนราบไม่ใช่ไฟมังกร\nหากเป็นไฟแห่งการทรยศ — ร้อนแรงกว่า และดับยากกว่าไฟใดในโลก\n//But it was not dragon fire that brought Aethoria down.\nIt was the fire of betrayal — hotter, and far harder to extinguish.",
        color: COLORS.red,
      }),
      line({
        text: "ลอร์ดมาลาชาร์ — ที่ปรึกษาที่กษัตริย์ไว้ใจดุจพี่น้อง —\nเปิดประตูเมืองในยามเที่ยงคืน กองทัพศัตรูหลั่งไหลเข้ามาราวน้ำหลากสีดำ\n//Lord Malachar — trusted by the King like a brother —\nopened the gates at midnight. The enemy army poured in like a dark flood.",
        color: COLORS.gray,
      }),
      line({
        text: "เมื่อรุ่งสางมาถึง... อาณาจักร Aethoria ก็ไม่เหลืออีกแล้ว\nมีทหารเพียงคนเดียวที่รอดจากการสังหารหมู่\n//By dawn... the kingdom of Aethoria was no more.\nOnly one soldier survived the massacre.",
        color: COLORS.white,
      }),
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
      line({
        speaker: "เพชรโตะ",
        text: "*ไอ* ...ฉันอยู่ที่ไหน?\n//*coughs* ...Where am I?",
        color: COLORS.gold,
      }),
      line({
        text: "[ เพชรโตะลืมตาขึ้น — ควันดำคลุ้งอยู่รอบตัว\nไฟยังลุกโชนอยู่ไกล ๆ กำแพงปราสาทพังถล่ม\nร่างของสหายทหารนอนกระจัดกระจายบนพื้นหิน ]\n//[ Phetto opens his eyes — black smoke fills the air.\nFires still rage in the distance. The castle walls have crumbled.\nThe bodies of his fallen comrades lie scattered across the stone floor. ]",
        color: COLORS.gray,
      }),
      line({
        speaker: "เพชรโตะ",
        text: "ฝ่าบาท... ทุกคนที่ข้าสาบานว่าจะปกป้อง...\nหายไปหมดแล้ว ไม่เหลือแม้แต่คนเดียว\n//The King... everyone I swore to protect...\nAll gone. Not one left.",
        color: COLORS.gold,
      }),
      line({
        speaker: "เพชรโตะ",
        text: "มาลาชาร์\nข้าจะตามหาเจ้า — ต่อให้ต้องฝ่านรกทุกขุมก็ตาม\nเจ้าต้องชดใช้เลือดทุกหยดที่หลั่งในคืนนี้\n//Malachar.\nI will find you — through every circle of hell if I must.\nYou will answer for every drop of blood spilled tonight.",
        color: COLORS.gold,
      }),
    ],
    next: "b1",
    battle: "b1",
  },

  c_after1: {
    t: "scene",
    bg: "#0a1400",
    illustration: GAME_VISUALS.scenes.aethoriaRuins,
    lines: [
      line({
        text: "คุณฝ่าซากเมืองที่ยังคุกรุ่น\nเถ้าถ่านปลิวแสบหน้า ทุกย่างก้าวเหยียบลงบนเศษซากของอดีต\n//You push through the smoldering ruins.\nAsh stings your face. Every step treads upon the remnants of the past.",
        color: COLORS.white,
      }),
      line({
        text: "แสงจันทร์แทงผ่านหลังคาที่พังถล่ม\nทอดเงาเป็นซี่กรงขวางทาง — ราวกับว่า\nแม้แต่แสงยังไม่กล้าส่องให้ทั่วสถานที่แห่งนี้\n//Moonlight pierces through the collapsed roof,\ncasting barred shadows across the path — as if\neven light fears to fully illuminate this place.",
        color: COLORS.gray,
      }),
      line({
        text: "แล้วท่ามกลางความเงียบที่บีบคั้น...\nเสียงร้องหนึ่งก็แทรกขึ้นมา — ชัดเจนและสิ้นหวัง\n//Then — cutting through the tense silence —\na cry rises. Clear. Desperate.",
        color: COLORS.white,
      }),
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
      line({
        text: "ก็อบลินสองตัวล้มลง พ่อค้าหอบหายใจหนัก\nมือของเขายังสั่น แต่ดวงตากลับมีประกาย\n//The two goblins fall. The merchant gasps for air.\nHis hands tremble — but his eyes burn bright.",
        color: COLORS.white,
      }),
      line({
        speaker: "พ่อค้า",
        text: "ขอบคุณ... ขอบคุณจริง ๆ\nข้าจะไม่มีวันลืมบุญคุณของท่าน\n//Thank you... thank you so much.\nI will never forget what you've done.",
        color: COLORS.orange,
      }),
      line({
        speaker: "พ่อค้า",
        text: "รับสิ่งนี้ไว้เถิด — อาจไม่มากนัก\nแต่นี่คือทั้งหมดที่ข้ามีในตอนนี้\n//Take this — it's little,\nbut it's everything I have right now.",
        color: COLORS.orange,
      }),
      line({
        text: ">> ได้รับ: 90 ทอง + ยาฟื้นฟู 2 ขวด!\n//>> Received: 90 Gold + 2 Health Potions!",
        color: COLORS.green,
      }),
      line({
        text: "[ ในความมืดของคืนนั้น เมล็ดพันธุ์แห่งความเมตตาถูกหว่านลงอย่างเงียบงัน\nยังไม่มีใครรู้ว่ามันจะออกดอกผลอย่างไรในวันข้างหน้า ]\n//[ In the darkness of that night, a small act of mercy was sown.\nNo one could know yet what it would one day bear. ]",
        color: COLORS.gold,
      }),
    ],
    next: "s_lyra",
  },

  c_left: {
    t: "scene",
    bg: "#0a0a0a",
    illustration: GAME_VISUALS.scenes.aethoriaRuins,
    lines: [
      line({
        text: "คุณเดินผ่านไปโดยไม่หยุด\nเสียงร้องของพ่อค้าค่อย ๆ จางหายอยู่ข้างหลัง\n//You walk past without stopping.\nThe merchant's cries fade behind you.",
        color: COLORS.gray,
      }),
      line({
        speaker: "เพชรโตะ",
        text: "...ข้าไม่มีเวลา ไม่ใช่คืนนี้\nยังมีหน้าที่ที่ใหญ่กว่านี้รออยู่\n//...I have no time. Not tonight.\nThere is a greater duty waiting.",
        color: COLORS.gold,
      }),
      line({
        text: "[ ความเย็นเยียบแทรกเข้ามาแทนความอบอุ่น\nนักรบที่มุ่งหน้าไปสู่เป้าหมาย เหลือพื้นที่ให้ความสงสารน้อยลงทุกที ]\n//[ A cold resolve replaces warmth.\nA determined warrior has no room for pity. ]",
        color: COLORS.red,
      }),
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
      line({
        text: "ป่าแอชวูด — ดงไม้โบราณที่ยืนเฝ้ายามราวทหารเก่า\nรากบิดเกลียวชอนไชขึ้นจากดินดำเหมือนเส้นเลือดของผืนป่า\nใบไม้แห้งเสียดสีกัน กระซิบเรื่องราวที่ถูกลืมมานาน\n//Ashwood Forest — where ancient trees stand sentinel like old soldiers.\nGnarled roots claw out of black earth like varicose veins.\nDry leaves rasp against each other, whispering stories long forgotten.",
        color: COLORS.gray,
      }),
      line({
        speaker: "ลีร่า",
        text: "ท่านกำลังมุ่งหน้าไปยังถ้ำของ Vaelthorn\n//You're heading for Vaelthorn's Lair.",
        color: COLORS.purple,
      }),
      line({
        speaker: "เพชรโตะ",
        text: "เจ้าเป็นใคร? ออกมาจากเงาเดี๋ยวนี้\n//Who are you? Step out of the shadow.",
        color: COLORS.gold,
      }),
      line({
        speaker: "ลีร่า",
        text: "คนที่รู้ว่ามาลาชาร์ทำอะไรลงไปจริง ๆ\n//Someone who knows what Malachar truly did.",
        color: COLORS.purple,
      }),
      line({
        speaker: "ลีร่า",
        text: "เขาไม่ได้ทรยศอาณาจักรเพียงอย่างเดียว\nเขาใช้ Vaelthorn เป็นอาวุธ — มังกรที่ถูกพันธนาการด้วยตรามืด\nข้ารู้คาถาที่ทำลายตรานั้นได้\n//He didn't just betray the kingdom.\nHe is using Vaelthorn as a weapon — a dragon bound by his dark sigil.\nI know the spell that can break it.",
        color: COLORS.purple,
      }),
      line({
        speaker: "เพชรโตะ",
        text: "...งั้นก็ตามมา แต่อย่าช้าก็แล้วกัน\n//...Come then. But keep up.",
        color: COLORS.gold,
      }),
    ],
    next: "s_riven",
  },

  s_riven: {
    t: "scene",
    bg: "#0a1a0a",
    illustration: GAME_VISUALS.scenes.ashwoodForest,
    lines: [
      line({
        text: "เสียงกิ่งไม้หักดังขึ้นเหนือศีรษะ\nเงาร่างหนึ่งร่วงลงมาจากยอดไม้สูง\nแล้วแตะพื้นอย่างเงียบกริบ\n//A branch snaps overhead.\nThen a figure drops from high above,\nlanding with the silent grace of a wildcat.",
        color: COLORS.white,
      }),
      line({
        speaker: "ริเวน",
        text: "เพชรโตะ! เจ้ายังมีชีวิตอยู่!\n//Phetto! You're alive!",
        color: COLORS.green,
      }),
      line({
        speaker: "เพชรโตะ",
        text: "ริเวน... ข้านึกว่าเจ้าตายไปแล้ว\n//Riven... I thought you were dead.",
        color: COLORS.gold,
      }),
      line({
        speaker: "ริเวน",
        text: "เกือบแล้ว รอยแผลห้าแห่งบนตัวข้าเป็นพยานได้\nแต่ข้าตามรอยกองกำลังของมาลาชาร์มาตลอด\n//Almost. Five scars can testify.\nBut I've been tracking Malachar's forces the whole time.",
        color: COLORS.green,
      }),
      line({
        speaker: "ริเวน",
        text: "กองกำลังทุกหน่วยกำลังมุ่งหน้าไปยังถ้ำ\nถ้าเราไม่หยุดพวกมันที่นั่น ทุกอย่างจะสายเกินไป\nข้าจะยืนเคียงข้างเจ้า — จนถึงที่สุด\n//Every unit is converging on the Lair.\nIf we don't stop them there, it will be too late.\nI'm with you — till the very end.",
        color: COLORS.green,
      }),
      line({
        text: "** ลีร่าและริเวนเข้าร่วมทีมแล้ว! **\n//** LYRA and RIVEN have joined the party! **",
        color: COLORS.gold,
      }),
    ],
    next: "s_act2",
    joinParty: true,
  },
};
