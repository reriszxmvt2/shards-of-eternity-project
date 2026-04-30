import { COLORS } from "../colors";
import { GAME_VISUALS } from "../visuals";
import { line } from "../sceneLine";

export const ENDING_SCENES = {
  end_peace: {
    t: "ending",
    illustration: GAME_VISUALS.scenes.vaelthornLair,
    titleColor: COLORS.blue,
    title: "ตอนจบ: ผู้ไถ่โทษ / ENDING: THE REDEEMER",
    lines: [
      line({
        text: "เพชรโตะยกดาบขึ้น — แล้วฟาดลงบนตราผนึก\n//Phetto raises his blade — and strikes the Sigil.",
        color: COLORS.white,
      }),
      line({
        text: "ตรานั้นแตกกระจายพร้อมเสียงสนั่น\nแสงสีทองพวยพุ่งออกมา และ Vaelthorn คำรามขึ้น\nไม่ใช่ด้วยความโกรธ — แต่ด้วยความโล่งใจจนเกินกลั้น\n//It shatters with a thunderous crack.\nGolden light erupts, and Vaelthorn roars —\nnot in fury, but in overwhelming relief.",
        color: COLORS.orange,
      }),
      line({
        speaker: "VAELTHORN",
        text: '"ลูก ๆ ของข้า... ข้าจำพวกเจ้าได้แล้ว"\n"ข้าขอสาบานด้วยชีวิตต่อ Aethoria\nให้ข้าได้ช่วยฟื้นฟูสิ่งที่สูญเสียไป"\n//"My children... I remember you now."\n//"I swear my life to Aethoria —\nlet me help rebuild what was lost."',
        color: "#ff8844",
      }),
      line({
        text: "มาลาชาร์ถูกจับกุม อำนาจมืดของเขาพังทลาย\nเขาถูกนำตัวไปเผชิญหน้ากับเหล่าขุนนางที่รอดชีวิต\n//Malachar is captured. His dark power collapses.\nHe is brought before the surviving lords of the realm.",
        color: COLORS.white,
      }),
      line({
        text: "พ่อค้าผู้นั้นกลับสู่บ้านเกิด\nและเล่าเรื่องของเพชรโตะในทุกเมืองที่เดินทางผ่าน\nชื่อของนักรบผู้มีเมตตาจึงแพร่ไปทั่วแผ่นดิน\n//The merchant returned home\nand told Phetto's story in every town he passed through.\nThe name of the merciful warrior spread across the land.",
        color: COLORS.gold,
      }),
      line({
        text: "ภายใต้พันธมิตรระหว่างมนุษย์และมังกร\nAethoria ฟื้นคืนสู่ความรุ่งเรืองยิ่งกว่าเดิม\nทุกเมืองที่สร้างขึ้นใหม่มีรูปสลักมังกรตั้งอยู่\nเพื่อเตือนใจว่า — ศัตรูที่แท้จริงอาจเป็นผู้ที่คุณไว้ใจที่สุด\n//Under the alliance of human and dragon,\nAethoria rose more glorious than ever before.\nIn every city rebuilt, a statue of the dragon stands —\na reminder that the true enemy may be the one you trust most.",
        color: COLORS.green,
      }),
      line({
        text: "",
        color: COLORS.white,
      }),
      line({
        text: "** ปลดล็อก TRUE ENDING — ผู้ไถ่โทษ **\n//** TRUE ENDING UNLOCKED — THE REDEEMER **",
        color: COLORS.gold,
      }),
    ],
  },

  end_war: {
    t: "ending",
    illustration: GAME_VISUALS.scenes.vaelthornLair,
    titleColor: COLORS.red,
    title: "ตอนจบ: นักแก้แค้น / ENDING: THE AVENGER",
    lines: [
      line({
        text: "ดาบของเพชรโตะพุ่งลงมา\nVaelthorn ไม่ได้ขัดขืน — เขาเพียงหลับตาลง\n//Phetto's blade falls.\nVaelthorn doesn't resist — it simply closes its eyes.",
        color: COLORS.white,
      }),
      line({
        text: "ทั้งถ้ำจมลงสู่ความเงียบสนิท\nแม้แต่เปลวไฟก็ดูเหมือนจะมอดดับไปพร้อมกัน\n//The cave falls into absolute silence.\nEven the fires seem to die with it.",
        color: COLORS.gray,
      }),
      line({
        text: "เมื่อไร้อาวุธชิ้นสำคัญ อำนาจของมาลาชาร์ก็พังทลาย\nเขาถูกจับกุมในเวลาต่อมา — ด้วยข่าวกรองจากริเวน\n//Malachar's power crumbles without his weapon.\nHe is captured later — thanks to intelligence from Riven.",
        color: COLORS.white,
      }),
      line({
        text: "Aethoria ได้รับการล้างแค้นแล้ว\nกษัตริย์องค์ใหม่จะขึ้นครองราชย์ อาณาจักรจะค่อย ๆ ฟื้นคืน\n//Aethoria is avenged.\nA new king will be crowned. The kingdom will recover.",
        color: COLORS.gold,
      }),
      line({
        text: "",
        color: COLORS.white,
      }),
      line({
        text: "แต่ในคืนนั้น เมื่อทุกคนหลับใหล\nเพชรโตะนั่งลำพังหน้าไฟที่ใกล้มอด\nและได้ยินเสียงกระซิบจากความทรงจำ\n//But that night, when everyone sleeps,\nPhetto sits alone before a dying fire\nand hears a whisper from his memory.",
        color: COLORS.gray,
      }),
      line({
        text: "...เสียงร่ำไห้ของผู้ที่ไม่รู้ด้วยซ้ำว่าตนกำลังทำอะไรลงไป\n//...the weeping of a creature that didn't know what it was doing.",
        color: COLORS.red,
      }),
      line({
        text: "",
        color: COLORS.white,
      }),
      line({
        text: "** ราคาของการแก้แค้น คือความสงสัยที่ไม่มีวันเลือนหาย **\n//** THE PRICE OF VENGEANCE: A DOUBT THAT NEVER FADES **",
        color: COLORS.gold,
      }),
    ],
  },

  end_happy_1: {
    t: "ending",
    illustration: GAME_VISUALS.scenes.shardsRestored,
    titleColor: COLORS.gold,
    title: "HAPPY ENDING 1: SHARDS OF ETERNITY",
    lines: [
      line({
        text: "เมื่อมาลาชาร์ล้มลง Shards ทั้งห้าหมุนวนรอบเพชรโตะ ไม่ใช่ดั่งอาวุธ แต่ดั่งคำถามที่ได้รับคำตอบครบถ้วน\n//When Malachar falls, the five Shards circle Phetto, not like weapons, but like questions finally answered.",
        color: COLORS.white,
      }),
      line({
        text: "เมตตา ความกล้าหาญ ความทรงจำ ความจริง และการเสียสละ หลอมรวมกันเป็นผนึกใหม่\nนิรันดร์ไม่ได้ถูกทำลาย หากถูกทำให้จดจำว่าโลกนี้ยังมีชีวิต\n//Mercy, Courage, Memory, Truth, and Sacrifice join into a new seal.\nEternity is not destroyed. It is made to remember that this world is still alive.",
        color: COLORS.gold,
      }),
      line({
        speaker: "VAELTHORN",
        text: "เจ้าไม่ได้ชนะเพราะแข็งแกร่งกว่าเขา แต่เพราะเจ้าไม่ยอมให้ความกลัวของเขากลายเป็นกฎของโลก\n//You did not win because you were stronger than him. You won because you refused to let his fear become the law of the world.",
        color: "#ff8844",
      }),
      line({
        text: "Aethoria เริ่มต้นใหม่ ไม่ได้ยืนบนคำสาบานแห่งการแก้แค้น แต่ยืนบนชื่อของผู้ที่ยังช่วยไว้ได้ทัน\n//Aethoria begins again, not upon a vow of vengeance, but upon the names of those saved in time.",
        color: COLORS.green,
      }),
      line({
        text: "** ปลดล็อก HAPPY ENDING 1 — SHARDS OF ETERNITY **\n//** HAPPY ENDING 1 UNLOCKED — SHARDS OF ETERNITY **",
        color: COLORS.gold,
      }),
    ],
  },

  end_bad_vaelthorn: {
    t: "ending",
    illustration: GAME_VISUALS.scenes.brokenSeal,
    titleColor: COLORS.red,
    title: "BAD ENDING: THE DRAGON'S SILENCE",
    lines: [
      line({
        text: "มาลาชาร์พ่ายแพ้ในการต่อสู้ แต่เมื่อแกนผนึกแตก ไม่มีเสียงใดตอบรับ Shard of Memory\nVaelthorn จากไปแล้ว และความทรงจำที่โลกต้องการก็เงียบงันไปตลอดกาล\n//Malachar loses the battle, but when the Seal's Core breaks, no voice answers the Shard of Memory.\nVaelthorn is dead, and the memory the world needed is silent forever.",
        color: COLORS.red,
      }),
      line({
        text: "โลกยังรอด... แต่ผนึกใหม่บิดเบี้ยว ในความฝัน ผู้คนเริ่มลืมชื่อของคนที่ตนรัก\n//The world survives... but the new seal is warped. In dreams, people begin forgetting the names of those they love.",
        color: COLORS.gray,
      }),
    ],
  },

  end_bad_fallen: {
    t: "ending",
    illustration: GAME_VISUALS.scenes.aethoriaRuins,
    titleColor: COLORS.red,
    title: "BAD ENDING: THE LAST SOLDIER FALLS",
    lines: [
      line({
        text: "เพชรโตะล้มลงก่อนจะรวบรวม Shards ได้ครบ เสียงดาบของเขากระทบพื้นแผ่วเบายิ่งกว่าลมหายใจสุดท้ายของอาณาจักร\n//Phetto falls before the Shards can be gathered. His sword strikes the ground softer than the kingdom's final breath.",
        color: COLORS.red,
      }),
      line({
        text: "มาลาชาร์ไม่จำเป็นต้องชนะอีกต่อไป เขาเพียงเดินผ่านซากความหวัง แล้วปล่อยให้นิรันดร์จัดการส่วนที่เหลือ\n//Malachar no longer needs to win. He only walks through the remains of hope and lets eternity finish the rest.",
        color: COLORS.gray,
      }),
    ],
  },

  end_bad_mercy: {
    t: "ending",
    illustration: GAME_VISUALS.scenes.aethoriaRuins,
    titleColor: COLORS.red,
    title: "BAD ENDING: A WORLD WITHOUT MERCY",
    lines: [
      line({
        text: "คุณเอาชนะมาลาชาร์ได้ แต่ Shard of Mercy ไม่เคยตื่นขึ้น\nผนึกยอมรับพลังของคุณ แต่ปฏิเสธหัวใจที่แข็งกระด้าง\n//You defeat Malachar, but the Shard of Mercy never wakes.\nThe seal accepts your strength, but rejects your heart.",
        color: COLORS.red,
      }),
      line({
        text: "Aethoria ถูกสร้างขึ้นใหม่อย่างแข็งแกร่ง เย็นชา และว่างเปล่า ผู้คนรอดชีวิต แต่ไม่มีใครเรียกที่แห่งนั้นว่าบ้าน\n//Aethoria is rebuilt strong, cold, and empty. People survive, but no one calls it home.",
        color: COLORS.gray,
      }),
    ],
  },

  end_bad_party: {
    t: "ending",
    illustration: GAME_VISUALS.scenes.brokenSeal,
    titleColor: COLORS.red,
    title: "BAD ENDING: THE BROKEN PARTY",
    lines: [
      line({
        text: "มาลาชาร์ล้มลง แต่ทีมไม่ได้ยืนเคียงกันเมื่อแสงสุดท้ายมาถึง\nรอยแผลจากการทิ้งผู้บริสุทธิ์ไว้เบื้องหลังลึกยิ่งกว่าคมดาบใด ๆ\n//Malachar falls, but the party does not stand together when the final light arrives.\nThe wound left by abandoning innocents is deeper than any blade.",
        color: COLORS.red,
      }),
      line({
        text: "ผนึกถูกสร้างขึ้นใหม่ด้วยมือที่ไม่อาจไว้ใจกัน และมันแตกร้าวอีกครั้งก่อนรุ่งสาง\n//The seal is remade by hands that no longer trust one another, and it cracks again before dawn.",
        color: COLORS.gray,
      }),
    ],
  },

  end_bad_memory: {
    t: "ending",
    illustration: GAME_VISUALS.scenes.brokenSeal,
    titleColor: COLORS.red,
    title: "BAD ENDING: NAMELESS TOMORROW",
    lines: [
      line({
        text: "คุณมีพลังมากพอจะปิดประตูสู่นิรันดร์ แต่ไม่มี Memory Shard คอยบอกโลกว่าสิ่งใดควรถูกจดจำ\n//You have enough power to close eternity's gate, but no Memory Shard to tell the world what must be remembered.",
        color: COLORS.red,
      }),
      line({
        text: "ผู้คนตื่นขึ้นในเมืองที่ปลอดภัย โดยไม่รู้ว่าตนกำลังหลั่งน้ำตาให้ใคร\n//People wake in safe cities, not knowing whose names they are crying for.",
        color: COLORS.gray,
      }),
    ],
  },

  end_bad_sacrifice: {
    t: "ending",
    illustration: GAME_VISUALS.scenes.brokenSeal,
    titleColor: COLORS.red,
    title: "BAD ENDING: PRICE UNPAID",
    lines: [
      line({
        text: "มาลาชาร์เข้าใจสิ่งหนึ่งถูกต้อง: ผนึกนิรันดร์ต้องมีผู้จ่ายราคา\nแต่เมื่อถึงเวลานั้น คุณเลือกชัยชนะที่เร็วกว่า แทนชีวิตที่รอความช่วยเหลือ\n//Malachar was right about one thing: eternity's seal demands a price.\nBut when the moment came, you chose the quicker victory over the lives waiting to be saved.",
        color: COLORS.red,
      }),
      line({
        text: "ประตูปิดลงพร้อมเสียงของผู้บริสุทธิ์ และนับจากคืนนั้น ไม่มีใครในทีมหลับสนิทได้อีกเลย\n//The gate closes with the voices of innocents, and no one in the party sleeps again.",
        color: COLORS.gray,
      }),
    ],
  },

  end_bad_shards: {
    t: "ending",
    illustration: GAME_VISUALS.scenes.brokenSeal,
    titleColor: COLORS.red,
    title: "BAD ENDING: SHARDS UNMADE",
    lines: [
      line({
        text: "Shards ที่ไม่ครบพยายามสร้างผนึกใหม่ แต่ช่องว่างระหว่างชิ้นส่วนกลับกลายเป็นประตู\nสิ่งที่มาลาชาร์หวาดกลัวไม่ได้ตายไป มันเพียงพบทางเข้าที่แคบกว่าเดิม\n//The incomplete Shards try to form a new seal, but the spaces between them become doors.\nThe thing Malachar feared does not die. It simply finds a narrower way in.",
        color: COLORS.red,
      }),
      line({
        text: "Aethoria ได้เห็นรุ่งเช้าอีกครั้ง แต่เงาของมันทอดยาวผิดธรรมชาติ และไม่มีใครกล้าถามว่าปลายเงานั้นชี้ไปหาอะไร\n//Aethoria sees dawn again, but its shadow is unnaturally long, and no one dares ask what it points toward.",
        color: COLORS.gray,
      }),
    ],
  },
};
