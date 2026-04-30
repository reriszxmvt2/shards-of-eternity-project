import { COLORS } from "../colors";
import { GAME_VISUALS } from "../visuals";
import { line } from "../sceneLine";

export const PROLOGUE_SCENES = {
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
      line({
        text: "ก่อนที่ชื่อของ Aethoria จะถูกจารึกไว้ในตำนาน\nโลกใบนี้เคยเกือบถูกกลืนหายไปในสิ่งที่ไม่มีใครกล้าเรียกชื่อ\n//Before Aethoria's name was written into legend,\nthis world was nearly swallowed by something no one dared to name.",
        color: COLORS.gray,
      }),
      line({
        text: "เหล่านักปราชญ์จึงสร้างผนึกโบราณขึ้นมา\nและเมื่อผนึกนั้นแตกออก พลังของมันกลายเป็น Shards of Eternity ทั้งห้า\n//The sages forged an ancient seal to hold it back.\nWhen that seal fractured, its power became the five Shards of Eternity.",
        color: COLORS.white,
      }),
      line({
        text: "เมตตา ความกล้าหาญ ความทรงจำ ความจริง และการเสียสละ\nห้าชิ้นส่วนนี้ไม่ได้เลือกคนที่แข็งแกร่งที่สุด\nแต่มันตอบรับคนที่ยังไม่ทิ้งหัวใจของตัวเอง\n//Mercy, Courage, Memory, Truth, and Sacrifice.\nThese five fragments do not choose the strongest.\nThey answer those who have not abandoned their own hearts.",
        color: COLORS.gold,
      }),
      line({
        text: "Aethoria เติบโตขึ้นใต้แสงของผนึกนั้น\nอาณาจักรที่ผู้คนเชื่อในคำสาบาน เชื่อในดาบของผู้ปกป้อง\nและเชื่อว่าตราบใดที่ประตูเมืองยังปิด ความสงบก็จะไม่จากไป\n//Aethoria grew beneath that seal's light.\nIt was a kingdom that believed in vows, in the blades of its guardians,\nand in the peace kept safe behind closed gates.",
        color: COLORS.white,
      }),
      line({
        text: "แต่บางครั้ง โลกไม่ได้พังเพราะปีศาจ\nมันพังเพราะคนที่เชื่อว่าตัวเองกำลังช่วยมัน\n//But sometimes, the world does not break because of demons.\nIt breaks because of those who believe they are saving it.",
        color: COLORS.red,
      }),
      line({
        text: "ลอร์ดมาลาชาร์เคยเป็นมันสมองของราชสำนัก\nคนที่กษัตริย์ไว้ใจ คนที่มองเห็นภัยร้ายก่อนใคร\nแต่ยิ่งเขามองเห็นความมืดชัดเท่าไร เขาก็ยิ่งเชื่อว่าชีวิตบางชีวิตต้องถูกสละเพื่อให้โลกเดินต่อ\n//Lord Malachar was once the mind behind the throne.\nTrusted by the King, he saw danger before anyone else.\nBut the clearer he saw the darkness, the more he believed some lives had to be sacrificed so the world could continue.",
        color: COLORS.gray,
      }),
      line({
        text: "ในช่วงหลายคืนก่อนการล่มสลาย เงาของเมืองยาวผิดธรรมชาติ\nผู้คนลืมชื่อคนที่รักไปชั่วขณะ และข่าวลือเรื่องมังกร Vaelthorn ก็เริ่มดังขึ้นเหมือนลางร้าย\n//In the nights before the fall, the city's shadows stretched too far.\nPeople forgot the names of loved ones for a heartbeat,\nand rumors of the dragon Vaelthorn rose like an omen.",
        color: COLORS.purple,
      }),
      line({
        text: "แล้วปีที่ 847 ก็มาถึง\nคืนนั้น Aethoria ไม่ได้แพ้เพราะกำแพงอ่อนแอ\nแต่แพ้เพราะประตูถูกเปิดจากข้างใน\n//Then came the year 847.\nThat night, Aethoria did not fall because its walls were weak.\nIt fell because the gates were opened from within.",
        color: COLORS.red,
      }),
    ],
    next: "s_intro",
  },
};
