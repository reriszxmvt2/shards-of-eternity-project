import { COLORS } from "../colors";
import { GAME_VISUALS } from "../visuals";
import { line } from "../sceneLine";

export const ACT3_SCENES = {
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
      line({
        text: "ถ้ำที่แม้แต่ลมยังไม่กล้าย่างกราย\nผนังหินเต็มไปด้วยรอยเล็บขูดซ้ำแล้วซ้ำเล่า\nราวกับผู้ถูกจองจำพยายามนับวันเวลาที่ผ่านไป\n//A cave where even the wind dares not enter.\nThe stone walls are covered in claw marks scratched over and over —\nlike a caged beast trying to count the passing days.",
        color: COLORS.gray,
      }),
      line({
        text: "ในความมืดสนิท มีกลิ่นเลือดเก่าและความเจ็บปวดตกค้าง\nรอยขีดข่วนบางรอยลึกเป็นนิ้ว — เกิดจากความทรมาน\nไม่ใช่ความโกรธเกรี้ยว\n//In the pitch dark, there is a smell of old blood and something else.\nSome claw marks cut inches deep — made by something in anguish,\nnot in rage.",
        color: COLORS.white,
      }),
      line({
        speaker: "ลีร่า",
        text: "นั่น — ตราผนึกของมาลาชาร์!\nมันพันธนาการ Vaelthorn ไว้กับเจตจำนงของเขา!\n//There — Malachar's Sigil!\nIt binds Vaelthorn to his will!",
        color: COLORS.purple,
      }),
      line({
        speaker: "เพชรโตะ",
        text: "เจ้าทำลายมันได้ไหม?\n//Can you break it?",
        color: COLORS.gold,
      }),
      line({
        speaker: "ลีร่า",
        text: "ได้... แต่เราต้องทำให้เขาอ่อนแรงก่อน\nตราผนึกจะคลายออกเมื่อผู้ถูกครอบงำถูกต้อนจนถึงขีดสุด\n//Yes... but we must weaken him first.\nThe Sigil loosens when its host is brought to the edge.",
        color: COLORS.purple,
      }),
      line({
        text: "พื้นดินปริแตก เพดานถ้ำสั่นสะเทือน\nเศษหินร่วงกราวลงมารอบด้าน\nแล้วเงามหึมาก็ผุดขึ้นจากความมืดเบื้องล่าง\n//The ground splits. The cave ceiling shudders.\nStone fragments rain down all around.\nThen — from the dark below — a massive shadow rises.",
        color: COLORS.red,
      }),
      line({
        speaker: "VAELTHORN",
        text: "ผู้บุกรุก...\nพวกเจ้ากล้าเหยียบเข้ามาในคุกของข้ารึ?!\nข้าจะสอนให้รู้ว่าเปลวไฟนิรันดร์หมายถึงสิ่งใด!!\n//Intruders...\nYou dare walk into my prison?!\nYou will learn what the eternal flame truly means!!",
        color: "#ff6600",
      }),
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
      line({
        text: "ขณะที่ทั้งสามยังหอบหายใจ\nเสียงฝีเท้าเร่งร้อนก็ดังมาจากปากถ้ำ\nพร้อมแสงคบไฟวูบไหวที่ใกล้เข้ามา\n//As the three of you struggle to catch your breath,\nquick footsteps echo from the cave entrance.\nA flickering torchlight bobs closer.",
        color: COLORS.white,
      }),
      line({
        speaker: "พ่อค้า",
        text: "ท่าน! ท่านยังรอด!\nข้าตามมาตลอดทาง... แทบไม่มีแรงเดินแล้ว\n//You! You survived!\nI've been following you the whole way... my legs are gone.",
        color: COLORS.orange,
      }),
      line({
        speaker: "เพชรโตะ",
        text: "เจ้า...? ทำไมถึงมาที่นี่? มันอันตราย\n//You...? Why? It's dangerous here.",
        color: COLORS.gold,
      }),
      line({
        speaker: "พ่อค้า",
        text: "เพราะมีเรื่องหนึ่งที่ท่านต้องรู้\nเมื่อสามคืนก่อน ข้าแอบเข้ามาในถ้ำนี้เพื่อหาสมุนไพร\n//Because I have something you need to know.\nThree nights ago, I snuck into this cave searching for herbs.",
        color: COLORS.orange,
      }),
      line({
        speaker: "พ่อค้า",
        text: "แล้วข้าก็ได้ยินเสียงมังกรตนนั้น...\nมันไม่ได้คำราม ไม่ได้เผาผลาญสิ่งใด\nมันกำลังร่ำไห้\n//And I heard that dragon...\nIt wasn't roaring. It wasn't burning anything.\nIt was weeping.",
        color: COLORS.orange,
      }),
      line({
        speaker: "พ่อค้า",
        text: "มันร้องเรียกชื่อ — ชื่อลูก ๆ ของมัน\nมาลาชาร์ฆ่าลูกของมันก่อนจะจองจำ Vaelthorn\nตราผนึกนั้นไม่ได้แค่ควบคุมเขา\nมันลบความทรงจำของเขาไปด้วย\n//It was calling out names — the names of its children.\nMalachar killed them before enslaving Vaelthorn.\nThat Sigil doesn't just control it —\nit erases its memory. Vaelthorn doesn't know who he is anymore.",
        color: COLORS.orange,
      }),
      line({
        speaker: "ลีร่า",
        text: "...เขาพูดจริง ข้าเคยอ่านเรื่องนี้ในตำรา\nแต่ไม่เคยคิดว่ามาลาชาร์จะโหดร้ายได้ถึงเพียงนี้\n//...He's right. I've read about this.\nI never thought Malachar could be this cruel.",
        color: COLORS.purple,
      }),
      line({
        speaker: "พ่อค้า",
        text: "รับสิ่งนี้ไปด้วย ข้าเก็บมันไว้ตลอดทาง\nหวังเพียงว่าจะได้ตอบแทนบุญคุณของท่านสักครั้ง\n//Take these with you. I've been saving them the whole way.\nI hoped I'd have a chance to repay what you did for me.",
        color: COLORS.orange,
      }),
      line({
        text: ">> ได้รับ: ยาฟื้นฟู 3 ขวด!\n>> [ ความจริงที่ซ่อนอยู่กลางความเจ็บปวดของมังกร\nกำลังรอการตัดสินใจของคุณ ]\n//>> Received: 3 Health Potions!\n//>> [ The truth hidden at the heart of the dragon's agony\nwaits for your judgment. ]",
        color: COLORS.green,
      }),
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
      line({
        text: "ดาบของเพชรโตะฟาดลงบนตราผนึก ไม่ใช่ลำคอของมังกร\nแสงสีแดงแตกสลายเป็นฝุ่น และเสียงคำรามของ Vaelthorn กลายเป็นเสียงสะอื้นของผู้ตื่นจากฝันร้าย\n//Phetto's blade falls upon the Sigil, not the dragon's throat.\nThe red light breaks into dust, and Vaelthorn's roar becomes the sob of one waking from a nightmare.",
        color: COLORS.white,
      }),
      line({
        speaker: "VAELTHORN",
        text: "ข้าจำได้แล้ว... ลูก ๆ ของข้า ชื่อของพวกเขา และคืนที่มาลาชาร์พรากข้าไปจากตัวข้าเอง\n//I remember now... my children, their names, and the night Malachar stole me from myself.",
        color: "#ff8844",
      }),
      line({
        text: "เกล็ดมังกรชิ้นหนึ่งหลุดจากอกของเขา สิ่งที่ไหลออกมาไม่ใช่เลือด แต่เป็นแสงม่วงเก่าแก่ราวดวงดาวที่จำชื่อตัวเองได้\n>> ได้รับ: SHARD OF MEMORY\n//A scale breaks from his chest, not as blood, but as old violet light like a star remembering its own name.\n//>> Received: SHARD OF MEMORY",
        color: COLORS.purple,
      }),
      line({
        speaker: "VAELTHORN",
        text: "จงตามมาลาชาร์ไป เขาไม่ได้หนีเพราะพ่ายแพ้ แต่หนีเพราะได้ยินเสียงของสิ่งที่รออยู่หลังนิรันดร์\n//Follow Malachar. He did not flee because he lost. He fled because he heard what waits behind eternity.",
        color: "#ff8844",
      }),
    ],
    next: "s_malachar_truth",
  },

  s_vaelthorn_killed: {
    t: "scene",
    bg: "#120000",
    illustration: GAME_VISUALS.scenes.vaelthornLair,
    title: "── ความทรงจำที่แตกหัก / BROKEN MEMORY ──",
    lines: [
      line({
        text: "ดาบของเพชรโตะพุ่งลงมา Vaelthorn ไม่สู้กลับ เขาเพียงหลับตาเหมือนพ่อที่เหนื่อยเกินกว่าจะเรียกหาลูกอีกครั้ง\n//Phetto's blade falls. Vaelthorn does not resist. He only closes his eyes like a father too tired to call for his children again.",
        color: COLORS.white,
      }),
      line({
        text: "เมื่อร่างมังกรแน่นิ่ง เศษแสงสีม่วงลอยขึ้น ก่อนแตกสลายเสียก่อนจะรวมตัวเป็น Shard\nความทรงจำของเขาตายไปพร้อมกับลมหายใจสุดท้าย\n//When the dragon grows still, violet light rises, then shatters before it can become a Shard.\nHis memory dies with him.",
        color: COLORS.red,
      }),
      line({
        speaker: "ลีร่า",
        text: "เราอาจชนะศึกนี้... แต่เราเพิ่งทำลายกุญแจดอกหนึ่งไปแล้ว\n//We may have won this battle... but we have destroyed one of the keys.",
        color: COLORS.purple,
      }),
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
      line({
        text: "บนแท่นหินหลังบัลลังก์มังกร มีแผนที่โลกสลักด้วยเลือดแห้ง\nจุดทั้งห้าบนแผนที่เรืองแสง ราวหัวใจดวงหนึ่งที่ถูกแบ่งเป็นชิ้น ๆ\n//Behind the dragon's throne, a world map is carved in dried blood.\nFive points glow upon it, like a heart divided into pieces.",
        color: COLORS.gray,
      }),
      line({
        speaker: "มาลาชาร์",
        text: "หากข้าดูเหมือนปีศาจ ก็เพราะมีเพียงปีศาจเท่านั้นที่กล้าผ่าโลกเพื่อดึงหนามแห่งนิรันดร์ออกจากอกของมัน\n//If I look like a monster, it is because only a monster dares cut the world open to pull eternity's thorn from its heart.",
        color: COLORS.white,
      }),
      line({
        speaker: "ลีร่า",
        text: "Shards of Eternity... ไม่ใช่ตำนาน แต่มันคือผนึกของโลก\n//The Shards of Eternity... they are not a legend. They are the world's seal.",
        color: COLORS.purple,
      }),
      line({
        text: "ภาพเวทมนตร์สุดท้ายของมาลาชาร์ยิ้มอย่างอ่อนล้า แต่มั่นใจ ก่อนเงาร่างจะหายไปทางประตูเหนือบัลลังก์\n>> ได้รับ: SHARD OF TRUTH\n//Malachar's last spell-image smiles with exhausted certainty before vanishing through the gate above the throne.\n//>> Received: SHARD OF TRUTH",
        color: COLORS.blue,
      }),
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
      line({
        text: "ทั้งสามหันหลังให้เส้นทางหลบหนีของมาลาชาร์ แล้วลดอาวุธลงเพื่อประคองเด็ก คนชรา และทหารที่ยังมีลมหายใจ\nชัยชนะถูกเลื่อนออกไป เพื่อให้ชีวิตเหล่านี้ยังมีโอกาสไปถึงวันพรุ่งนี้\n//The three turn away from Malachar's escape route and lower their weapons to carry children, elders, and soldiers who still breathe.\nVictory is delayed so life may still reach tomorrow.",
        color: COLORS.white,
      }),
      line({
        text: "เมื่อชีวิตสุดท้ายพ้นจากวงเวท แสงสีแดงที่เคยดูดกลืนพวกเขาก็หดตัวเป็น Shard สีเลือดอุ่น\n>> ได้รับ: SHARD OF SACRIFICE\n//When the last life leaves the circle, the red light that fed on them folds into a warm blood-colored Shard.\n//>> Received: SHARD OF SACRIFICE",
        color: COLORS.red,
      }),
      line({
        speaker: "เพชรโตะ",
        text: "ถ้านิรันดร์บังคับให้เราทิ้งใครไว้ข้างหลัง... เราก็จะเอาชนะมันด้วยการพาทุกคนไปด้วย\n//If eternity demands that we leave people behind... then we will defeat it by carrying everyone with us.",
        color: COLORS.gold,
      }),
    ],
    next: "s_final_act",
  },

  s_party_fracture: {
    t: "scene",
    bg: "#120000",
    illustration: GAME_VISUALS.scenes.sealCore,
    title: "── รอยร้าวของทีม / PARTY FRACTURE ──",
    lines: [
      line({
        text: "คุณพุ่งตามมาลาชาร์ไป เสียงกรีดร้องของผู้ลี้ภัยถูกทิ้งไว้เบื้องหลัง\nริเวนเป็นคนแรกที่หยุดวิ่ง ลีร่ากำมือแน่นจนเล็บจิกเข้าเนื้อ\n//You chase Malachar. The refugees' screams are left behind.\nRiven stops running first. Lyra clenches her fists until her nails draw blood.",
        color: COLORS.gray,
      }),
      line({
        speaker: "ริเวน",
        text: "ถ้าเราช่วยโลกด้วยการปล่อยให้คนตรงหน้าตาย เราจะต่างจากมาลาชาร์ตรงไหน?\n//If we save the world by letting the people before us die, how are we different from Malachar?",
        color: COLORS.green,
      }),
      line({
        text: "ทีมยังเดินหน้าต่อไป แต่บางสิ่งในใจพวกเขาไม่เคยกลับมาร่วมทางอีกเลย\n//The party continues, but something in them never walks together again.",
        color: COLORS.red,
      }),
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
      line({
        text: "แกนผนึกอยู่ใต้ถ้ำ ลึกลงไปกว่ารากของภูเขา ที่นั่นไม่มีท้องฟ้า ไม่มีเวลา มีเพียง Shards หมุนวนรอบบัลลังก์ว่างเปล่า\n//The Seal's Core lies beneath the cave, deeper than the mountain's roots. There is no sky there, no time, only Shards circling an empty throne.",
        color: COLORS.gray,
      }),
      line({
        speaker: "มาลาชาร์",
        text: "ข้าทำลายอาณาจักรหนึ่ง เพื่อไม่ให้อาณาจักรทั้งหมดถูกกลืน ข้าจองจำมังกรหนึ่งตน เพื่อไม่ให้ทั้งโลกกลายเป็นกรงขัง\n//I destroyed one kingdom so all kingdoms would not be swallowed. I caged one dragon so the whole world would not become a cage.",
        color: COLORS.white,
      }),
      line({
        speaker: "เพชรโตะ",
        text: "เจ้าเรียกมันว่าการช่วยโลก เพราะเจ้าไม่เคยถามโลกเลยว่าอยากถูกช่วยด้วยวิธีนั้นหรือไม่\n//You call it saving the world because you never asked the world if it wanted to be saved that way.",
        color: COLORS.gold,
      }),
      line({
        text: "ลีร่าแบ่งอีเธอร์ขวดสุดท้าย ริเวนพันแผลให้ทุกคน และเพชรโตะนับลมหายใจก่อนศึกสุดท้ายจะเริ่มขึ้น\n>> ได้รับ: ยาฟื้นฟู 3, อีเธอร์ 2, ขนนกฟีนิกซ์ 1\n//Lyra splits the last ethers. Riven binds everyone's wounds. Phetto counts one breath before the final battle.\n//>> Received: 3 Potions, 2 Ethers, 1 Phoenix Down",
        color: COLORS.green,
      }),
    ],
    next: "b4",
    battle: "b4",
  },
};
