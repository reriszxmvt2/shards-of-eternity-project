import { COLORS } from "../colors";
import { GAME_VISUALS } from "../visuals";
import { line } from "../sceneLine";

export const ACT2_SCENES = {
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
      line({
        text: "ช่องเขาแคบที่ลมหนาวพัดไม่เคยหยุด\nหินดำเปื้อนสนิมและคราบเลือดเก่าของผู้ที่เคยผ่านทางนี้\nกระดูกของทหารไร้นามเรียงรายข้างทางราวหลักหมายแห่งความตาย\n//A narrow mountain pass where bitter winds never cease.\nBlack stone stained with old rust and blood from those who came before.\nThe bones of nameless soldiers line the path like grim markers.",
        color: COLORS.gray,
      }),
      line({
        text: "ลมหายใจกลายเป็นไอขาวในอากาศเย็นจัด\nทุกฝีก้าวสะท้อนก้องหน้าผา ราวกับภูเขาทั้งลูกกำลังเงี่ยหูฟัง\n//Breath mists the freezing air.\nEvery footstep echoes off the cliffs as if the mountain itself is listening.",
        color: COLORS.white,
      }),
      line({
        speaker: "ริเวน",
        text: "อัศวินโครงกระดูกอยู่ข้างหน้า! เตรียมอาวุธ!\n//Skeleton Knights ahead! Weapons ready!",
        color: COLORS.green,
      }),
    ],
    next: "b2",
    battle: "b2",
  },

  c_shop: { t: "shop" },
};
