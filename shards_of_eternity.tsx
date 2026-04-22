import { useState, useEffect, useRef, useCallback } from "react";

const F = "'Consolas','Monaco','Menlo','Lucida Console',monospace";
const C = {
  bg:"#07071a",panel:"#0e0e28",dark:"#050514",
  border:"#4477ff",gold:"#ffcc00",red:"#ff3344",
  green:"#22ee55",blue:"#4477ff",purple:"#bb44ff",
  white:"#ccddef",gray:"#7788aa",orange:"#ff8833",
  hp:"#ee2233",mp:"#2266ee",
};

function Bar({v,max,color,w=80}){
  const p=Math.max(0,Math.min(100,(v/max)*100));
  return <div style={{display:"inline-block",width:w,height:8,background:"#111133",border:"1px solid #223366",verticalAlign:"middle"}}>
    <div style={{width:`${p}%`,height:"100%",background:color,transition:"width 0.3s"}}/>
  </div>;
}

function Btn({children,onClick,color=C.border,disabled,small}){
  const [hov,setHov]=useState(false);
  return <button disabled={disabled} onClick={onClick}
    onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
    style={{background:hov&&!disabled?"#1a1a3a":C.panel,
      border:`2px solid ${disabled?"#333355":hov?C.gold:color}`,
      color:disabled?"#334466":hov?C.gold:C.white,
      fontFamily:F,fontSize:small?12:14,
      padding:small?"6px 12px":"10px 18px",cursor:disabled?"not-allowed":"pointer",
      transition:"all 0.15s",textAlign:"left",lineHeight:1.5}}>
    {children}
  </button>;
}

const mkParty=()=>[
  {id:"phetto",name:"เพชรโตะ",nameEn:"PHETTO",cls:"WARRIOR",color:C.gold,e:"[W]",
   hp:120,mxHp:120,mp:40,mxMp:40,atk:28,def:14,lv:1,alive:true,buf:0,bufT:0,defending:false,
   wName:"Iron Sword",wLv:1,
   skills:[
     {name:"SLASH",mp:0,mult:1.3,type:"atk",tar:"one",desc:"ฟันดาบอันทรงพลัง\n//Powerful sword slash"},
     {name:"SHIELD BASH",mp:8,mult:0.9,type:"atk",tar:"one",stun:true,desc:"โจมตี + ทำให้งัก 1 เทิร์น\n//Attack + stun 1 turn"},
     {name:"WAR CRY",mp:14,mult:0,type:"buff",tar:"party",bufAmt:8,bufT:3,desc:"ATK ปาร์ตี้ +8 (3 เทิร์น)\n//Party ATK +8 for 3 turns"},
   ]},
  {id:"lyra",name:"ลีร่า",nameEn:"LYRA",cls:"MAGE",color:C.purple,e:"[M]",
   hp:75,mxHp:75,mp:100,mxMp:100,atk:36,def:6,lv:1,alive:true,buf:0,bufT:0,defending:false,
   wName:"Oak Staff",wLv:1,
   skills:[
     {name:"FIREBALL",mp:12,mult:1.6,type:"atk",tar:"one",desc:"ระเบิดไฟเวทมนตร์\n//Magical fire blast"},
     {name:"BLIZZARD",mp:20,mult:1.1,type:"atk",tar:"all",desc:"น้ำแข็งโจมตีทุกศัตรู\n//Ice magic — all enemies"},
     {name:"HEAL",mp:15,mult:0,type:"heal",tar:"ally",healAmt:55,desc:"ฟื้นฟู HP 55\n//Restore 55 HP to ally"},
   ]},
  {id:"riven",name:"ริเวน",nameEn:"RIVEN",cls:"ARCHER",color:C.green,e:"[A]",
   hp:95,mxHp:95,mp:50,mxMp:50,atk:30,def:10,lv:1,alive:true,buf:0,bufT:0,defending:false,
   wName:"Ash Bow",wLv:1,
   skills:[
     {name:"AIMED SHOT",mp:0,mult:1.25,type:"atk",tar:"one",desc:"ยิงธนูแม่นยำ\n//Precise piercing shot"},
     {name:"ARROW RAIN",mp:16,mult:0.85,type:"atk",tar:"all",desc:"ฝนธนูโจมตีทุกศัตรู\n//Volley hits all enemies"},
     {name:"POISON ARROW",mp:10,mult:0.75,type:"atk",tar:"one",poison:true,desc:"วางยาพิษ 3 เทิร์น\n//Poisons for 3 turns"},
   ]},
];

const mkEnemies=keys=>{
  const D={
    goblin:{name:"GOBLIN",e:"(G)",hp:45,atk:14,def:5,gold:25,xp:20,color:"#44aa44",boss:false},
    goblin2:{name:"GOBLIN",e:"(G)",hp:45,atk:14,def:5,gold:25,xp:20,color:"#44aa44",boss:false},
    goblinChief:{name:"GOBLIN CHIEF",e:"(G!)",hp:70,atk:20,def:8,gold:40,xp:35,color:"#88bb33",boss:false},
    skeleton:{name:"SKELETON KNT",e:"(S)",hp:95,atk:24,def:14,gold:60,xp:50,color:"#aaaacc",boss:false},
    vaelthorn:{name:"VAELTHORN",e:"(BOSS)",hp:320,atk:46,def:22,gold:300,xp:0,color:"#ff6600",boss:true},
  };
  return keys.map((k,i)=>({...D[k],id:i,mxHp:D[k].hp,alive:true,poison:false,poisonT:0,stunned:false}));
};

const BATTLES={
  b1:{keys:["goblin","goblin2"],msg:"ก็อบลินซุ่มโจมตีในซากปรักหักพัง!\n//Goblins ambush you in the ruins!",after:"c_after1"},
  b2:{keys:["skeleton","goblinChief"],msg:"อัศวินโครงกระดูกปิดกั้นช่องเขา!\n//A Skeleton Knight blocks the mountain pass!",after:"c_shop"},
  b3:{keys:["vaelthorn"],msg:"VAELTHORN โผล่ขึ้นมาจากความมืดนิรันดร์!\n//VAELTHORN rises from the eternal dark!",after:"c_boss_after"},
};

const SHOP_ITEMS=[
  {id:"potion",name:"ยาฟื้นฟู / HEALTH POTION",d:"ฟื้นฟู HP 60 / Restore 60 HP",price:30,type:"item"},
  {id:"ether",name:"อีเธอร์ / ETHER",d:"ฟื้นฟู MP 40 / Restore 40 MP",price:40,type:"item"},
  {id:"revive",name:"ขนนกฟีนิกซ์ / PHOENIX DOWN",d:"ฟื้นคืนชีพที่ HP 50%",price:75,type:"item"},
  {id:"up_phetto",name:"ตีดาบ: IRON SWORD+",d:"ATK ของ เพชรโตะ +12",price:90,type:"upgrade",target:"phetto",amt:12},
  {id:"up_lyra",name:"ตีไม้เท้า: OAK STAFF+",d:"ATK ของ ลีร่า +14",price:110,type:"upgrade",target:"lyra",amt:14},
  {id:"up_riven",name:"ตีธนู: ASH BOW+",d:"ATK ของ ริเวน +12",price:90,type:"upgrade",target:"riven",amt:12},
];

// Lines: [speaker, "thai\n//english", color]
const SCENES={
  s_intro:{t:"scene",bg:"#180008",title:"── บทที่ 1: การล่มสลาย / ACT I: THE FALL ──",
    lines:[
      [null,"AETHORIA ปีที่ 847\n//AETHORIA, YEAR 847",C.gray],
      [null,"เปลวเพลิงสูงท่วมหลังคาปราสาท เผาทุกสิ่งที่กษัตริย์สร้างด้วยพระชนม์ชีพ\nท้องฟ้าเป็นสีส้มเลือด ควันดำพวยขึ้นปิดดาวทุกดวง\n//Flames taller than the castle towers devoured everything the King built.\nThe sky bled orange. Black smoke swallowed every star.",C.white],
      [null,"เสียงร้องไห้ของผู้บริสุทธิ์กลืนหายไปในเสียงเพลิงที่ลุกท่วม\nกำแพงเมืองที่แข็งแกร่งมาพันปีพังทะลายในคืนเดียว\n//The cries of the innocent dissolved into the roar of the flames.\nWalls that stood for a thousand years — crumbled in a single night.",C.gray],
      [null,"แต่ไม่ใช่ไฟมังกรที่เผาอาณาจักรลงจนราบ\nมันคือไฟแห่งการทรยศ — ร้อนกว่า และมอดยากกว่าไฟใดในโลก\n//But it was not dragon fire that brought Aethoria down.\nIt was the fire of betrayal — hotter, and far harder to extinguish.",C.red],
      [null,"ลอร์ด มาลาชาร์ — ที่ปรึกษาที่กษัตริย์วางใจเหมือนพี่น้อง —\nเปิดประตูให้ศัตรูในคืนอันมืดมิด กองทัพหลั่งเข้าเมืองดั่งน้ำท่วม\n//Lord Malachar — trusted by the King like a brother —\nopened the gates at midnight. The enemy army poured in like a dark flood.",C.gray],
      [null,"เมื่อรุ่งเช้า... อาณาจักร Aethoria ไม่มีอีกต่อไป\nมีทหารเพียงคนเดียวที่รอดจากการสังหารหมู่\n//By dawn... the kingdom of Aethoria was no more.\nOnly one soldier survived the massacre.",C.white],
    ],next:"s_intro2"},

  s_intro2:{t:"scene",bg:"#1a0800",
    lines:[
      ["เพชรโตะ","*ไอ* ...ฉันอยู่ที่ไหน?\n//*coughs* ...Where am I?",C.gold],
      [null,"[ เพชรโตะลืมตาขึ้น — ควันดำคลุ้มโดยรอบ\nไฟยังลุกไหม้อยู่ไกลๆ ซากปราสาทพังทะลาย\nร่างของเพื่อนทหารนอนเรียงรายทั่วพื้นหิน ]\n//[ Phetto opens his eyes — black smoke fills the air.\nFires still rage in the distance. The castle walls have crumbled.\nThe bodies of his fallen comrades lie scattered across the stone floor. ]",C.gray],
      ["เพชรโตะ","กษัตริย์... ทุกคนที่ฉันปกป้อง...\nหายไปหมดแล้ว ไม่เหลือเลยสักคน\n//The King... everyone I swore to protect...\nAll gone. Not one left.",C.gold],
      ["เพชรโตะ","มาลาชาร์\nฉันจะตามหาเจ้า — ผ่านนรกกี่ชั้นก็ตาม\nเจ้าจะต้องชดใช้ทุกหยดเลือดที่หลั่งไหลคืนนี้\n//Malachar.\nI will find you — through every circle of hell if I must.\nYou will answer for every drop of blood spilled tonight.",C.gold],
    ],next:"b1",battle:"b1"},

  c_after1:{t:"scene",bg:"#0a1400",
    lines:[
      [null,"คุณฝ่าซากปรักหักพังที่ยังคุกรุ่น\nเถ้าถ่านปลิวใส่หน้า เท้าทุกก้าวเหยียบลงบนซากของอดีต\n//You push through the smoldering ruins.\nAsh stings your face. Every step treads upon the remnants of the past.",C.white],
      [null,"แสงจันทร์แหลมผ่านช่องหลังคาที่พังถล่ม\nทอดเงาขวางทางเหมือนลายซี่กรงขัง — ราวกับว่า\nแม้แต่แสงก็กลัวที่จะส่องพื้นที่แห่งนี้\n//Moonlight pierces through the collapsed roof,\ncasting barred shadows across the path — as if\neven light fears to fully illuminate this place.",C.gray],
      [null,"แล้วในความเงียบที่ตึงเครียด...\nเสียงร้องก็แทรกขึ้นมา — ชัดเจน ตื่นตกใจ\n//Then — cutting through the tense silence —\na cry rises. Clear. Desperate.",C.white],
    ],next:"ch_merchant"},

  ch_merchant:{t:"choice",bg:"#0a1400",
    text:"กลางซากถนนที่เต็มไปด้วยเปลวไฟ\nพ่อค้าวัยกลางคนหมอบอยู่มุมตึก\nก็อบลินสองตัวรุมล้อม มีดในมือเขาสั่นรัว\n\nเขาตะโกนขึ้นเมื่อเห็นคุณ\n\"ช่วยข้าด้วย!\"\n\n// Amid burning ruins, a middle-aged merchant cowers in a corner.\n// Two goblins close in. The knife in his hand trembles.\n// He cries out the moment he sees you:\n// \"Please — help me!\"",
    choices:[
      {text:"[A] สู้เพื่อช่วยพ่อค้า! / Fight for him!",flag:"saved",reward:{gold:90,items:[{id:"potion",name:"HEALTH POTION",d:"Restore 60 HP",c:2}]},next:"c_saved"},
      {text:"[B] ไม่มีเวลา เดินหน้าต่อ / No time. Move on.",flag:"left",next:"c_left"},
    ]},

  c_saved:{t:"scene",bg:"#0a1400",
    lines:[
      [null,"ก็อบลินสองตัวล้มลง พ่อค้าหอบหายใจ\nมือของเขาสั่นแต่ตาเขาเป็นประกาย\n//The two goblins fall. The merchant gasps for air.\nHis hands tremble — but his eyes burn bright.",C.white],
      ["พ่อค้า","ขอบคุณ... ขอบคุณมาก\nข้าไม่เคยลืมบุญคุณของท่านได้เลย\n//Thank you... thank you so much.\nI will never forget what you've done.",C.orange],
      ["พ่อค้า","เอาสิ่งนี้ไปก่อน — มันน้อยนิด\nแต่มันคือทุกอย่างที่ข้ามีตอนนี้\n//Take this — it's little,\nbut it's everything I have right now.",C.orange],
      [null,">> ได้รับ: 90 ทอง + ยาฟื้นฟู 2 ขวด!\n//>> Received: 90 Gold + 2 Health Potions!",C.green],
      [null,"[ ในความมืดของคืนนั้น ความเมตตาเล็กๆ ได้ถูกหว่านลงไป\nไม่มีใครรู้ว่ามันจะงอกออกดอกผลอะไรในอนาคต ]\n//[ In the darkness of that night, a small act of mercy was sown.\nNo one could know yet what it would one day bear. ]",C.gold],
    ],next:"s_lyra"},

  c_left:{t:"scene",bg:"#0a0a0a",
    lines:[
      [null,"คุณเดินผ่านโดยไม่หยุด\nเสียงร้องของพ่อค้าจางลงข้างหลัง\n//You walk past without stopping.\nThe merchant's cries fade behind you.",C.gray],
      ["เพชรโตะ","...ฉันไม่มีเวลา ไม่ใช่คืนนี้\nมีหน้าที่ที่ใหญ่กว่านี้รออยู่\n//...I have no time. Not tonight.\nThere is a greater duty waiting.",C.gold],
      [null,"[ ความเย็นชาแผ่ซ่านเข้าแทนที่ความอบอุ่น\nนักรบที่แน่วแน่ไม่มีที่ให้ความสงสาร ]\n//[ A cold resolve replaces warmth.\nA determined warrior has no room for pity. ]",C.red],
    ],next:"s_lyra"},

  s_lyra:{t:"scene",bg:"#0a0a1a",title:"── ป่าแอชวูด / ASHWOOD FOREST ──",
    lines:[
      [null,"ป่าแอชวูด — ที่ซึ่งต้นไม้แก่นับร้อยปียืนราวทหารเฝ้ายาม\nรากไม้ขดงอออกจากดินดำราวเส้นเลือดขอด\nใบไม้แห้งกรอบเสียดสีกัน กระซิบเรื่องราวที่ลืมเลือนไปนานแล้ว\n//Ashwood Forest — where ancient trees stand sentinel like old soldiers.\nGnarled roots claw out of black earth like varicose veins.\nDry leaves rasp against each other, whispering stories long forgotten.",C.gray],
      ["ลีร่า","คุณกำลังมุ่งหน้าไปถ้ำของ Vaelthorn\n//You're heading for Vaelthorn's Lair.",C.purple],
      ["เพชรโตะ","คุณเป็นใคร? ออกมาจากเงาได้เลย\n//Who are you? Step out of the shadow.",C.gold],
      ["ลีร่า","ผู้ที่รู้ว่ามาลาชาร์ทำอะไรลงไปจริงๆ\n//Someone who knows what Malachar truly did.",C.purple],
      ["ลีร่า","เขาไม่ได้แค่ทรยศอาณาจักร\nเขาใช้ Vaelthorn เป็นอาวุธ — มังกรที่ถูกจองจำด้วยตราสัญลักษณ์มืด\nฉันรู้คาถาที่ทำลายมันได้\n//He didn't just betray the kingdom.\nHe is using Vaelthorn as a weapon — a dragon bound by his dark sigil.\nI know the spell that can break it.",C.purple],
      ["เพชรโตะ","...มาเลย แต่ตามให้ทัน\n//...Come then. But keep up.",C.gold],
    ],next:"s_riven"},

  s_riven:{t:"scene",bg:"#0a1a0a",
    lines:[
      [null,"เสียงกิ่งหักดังขึ้นเหนือศีรษะ\nแล้วร่างก็ร่อนลงจากกิ่งไม้สูง\nลงจอดได้อย่างเงียบงันเหมือนแมวป่า\n//A branch snaps overhead.\nThen a figure drops from high above,\nlanding with the silent grace of a wildcat.",C.white],
      ["ริเวน","เพชรโตะ! ยังมีชีวิตอยู่!\n//Phetto! You're alive!",C.green],
      ["เพชรโตะ","ริเวน... ฉันคิดว่าแกตายไปแล้ว\n//Riven... I thought you were dead.",C.gold],
      ["ริเวน","เกือบแล้ว มีรอยแผลห้าแห่งเป็นพยาน\nแต่ฉันติดตามกองกำลังของมาลาชาร์มาตลอด\n//Almost. Five scars can testify.\nBut I've been tracking Malachar's forces the whole time.",C.green],
      ["ริเวน","พวกมันทุกกองกำลังมุ่งหน้าไปยังถ้ำ\nถ้าเราไม่หยุดพวกมันตรงนั้น มันจะสายเกินไป\nฉันอยู่เคียงข้างเจ้า — จนกว่าจะถึงที่สุด\n//Every unit is converging on the Lair.\nIf we don't stop them there, it will be too late.\nI'm with you — till the very end.",C.green],
      [null,"** ลีร่า และ ริเวน เข้าร่วมปาร์ตี้แล้ว! **\n//** LYRA and RIVEN have joined the party! **",C.gold],
    ],next:"s_act2",joinParty:true},

  s_act2:{t:"scene",bg:"#1a0a00",title:"── บทที่ 2: ช่องเขา / ACT II: THE MOUNTAIN PASS ──",
    lines:[
      [null,"ช่องเขาที่ลมหนาวพัดไม่หยุด\nหินดำเปื้อนคราบสนิมและเลือดเก่าของผู้ที่เคยเดินผ่าน\nกระดูกของทหารนิรนามเรียงรายข้างทางดั่งหลักหมุด\n//A narrow mountain pass where bitter winds never cease.\nBlack stone stained with old rust and blood from those who came before.\nThe bones of nameless soldiers line the path like grim markers.",C.gray],
      [null,"ไอน้ำจากปากปกคลุมอากาศ\nทุกเสียงเท้าก้องสะท้อนหน้าผาราวว่าภูเขากำลังฟังอยู่\n//Breath mists the freezing air.\nEvery footstep echoes off the cliffs as if the mountain itself is listening.",C.white],
      ["ริเวน","อัศวินโครงกระดูกข้างหน้า! เตรียมอาวุธ!\n//Skeleton Knights ahead! Weapons ready!",C.green],
    ],next:"b2",battle:"b2"},

  c_shop:{t:"shop"},

  s_act3:{t:"scene",bg:"#1a0000",title:"── บทที่ 3: ถ้ำวาเอลธอร์น / ACT III: VAELTHORN'S LAIR ──",
    lines:[
      [null,"ถ้ำที่แม้แต่ลมก็ไม่กล้าเข้า\nผนังหินเต็มไปด้วยรอยเล็บที่ขีดซ้ำแล้วซ้ำเล่า\nเหมือนสัตว์ร้ายที่ถูกขังพยายามนับวันที่ผ่านไป\n//A cave where even the wind dares not enter.\nThe stone walls are covered in claw marks scratched over and over —\nlike a caged beast trying to count the passing days.",C.gray],
      [null,"ในความมืดสนิท มีกลิ่นเหมือนเลือดเก่าและน้ำตา\nรอยขีดข่วนบางรอยลึกเป็นนิ้ว — ทำโดยสัตว์ที่เจ็บปวด\nไม่ใช่สัตว์ที่โกรธเกรี้ยว\n//In the pitch dark, there is a smell of old blood and something else.\nSome claw marks cut inches deep — made by something in anguish,\nnot in rage.",C.white],
      ["ลีร่า","นั่น — ตราสัญลักษณ์ของมาลาชาร์!\nมันผูกพัน Vaelthorn ไว้กับเจตจำนงของเขา!\n//There — Malachar's Sigil!\nIt binds Vaelthorn to his will!",C.purple],
      ["เพชรโตะ","คุณทำลายมันได้ไหม?\n//Can you break it?",C.gold],
      ["ลีร่า","ได้... แต่ต้องทำให้มันอ่อนแอก่อน\nตราสัญลักษณ์จะหลุดออกเองเมื่อเจ้าของมันสั่นคลอน\n//Yes... but we must weaken him first.\nThe Sigil loosens when its host is brought to the edge.",C.purple],
      [null,"แผ่นดินแยกออก เพดานถ้ำสั่นสะเทือน\nเศษหินร่วงหล่นดังรอบข้าง\nแล้วเงาขนาดมหึมาก็พุ่งขึ้นจากความมืด\n//The ground splits. The cave ceiling shudders.\nStone fragments rain down all around.\nThen — from the dark below — a massive shadow rises.",C.red],
      ["VAELTHORN","ผู้บุกรุก...\nพวกเจ้ากล้าเดินเข้ามาในห้องขังของข้า?!\nเจ้าจะได้รู้ว่าเปลวไฟนิรันดร์หมายความว่าอะไร!!\n//Intruders...\nYou dare walk into my prison?!\nYou will learn what the eternal flame truly means!!","#ff6600"],
    ],next:"b3",battle:"b3"},

  // === MERCHANT TWIST — plays after boss if merchant was saved ===
  c_merchant_twist:{t:"scene",bg:"#1a0500",
    lines:[
      [null,"ในขณะที่ทั้งสามหายใจหอบ\nเสียงเท้าเร็วดังก้องเข้ามาจากปากถ้ำ\nพร้อมแสงไต้ที่ส่องกระพริบ\n//As the three of you struggle to catch your breath,\nquick footsteps echo from the cave entrance.\nA flickering torchlight bobs closer.",C.white],
      ["พ่อค้า","ท่าน! ท่านรอดมาได้!\nข้าตามมาตลอดทาง... ขาแทบขาด\n//You! You survived!\nI've been following you the whole way... my legs are gone.",C.orange],
      ["เพชรโตะ","คุณ...? ทำไม? ที่นี่อันตราย\n//You...? Why? It's dangerous here.",C.gold],
      ["พ่อค้า","เพราะข้ามีสิ่งที่ท่านต้องรู้\nสามคืนก่อน ข้าแอบเข้ามาถ้ำนี้เพื่อหาสมุนไพร\n//Because I have something you need to know.\nThree nights ago, I snuck into this cave searching for herbs.",C.orange],
      ["พ่อค้า","และข้าได้ยินเสียงมังกรนั้น...\nมันไม่ได้คำราม ไม่ได้เผาไหม้อะไร\nมันร้องไห้\n//And I heard that dragon...\nIt wasn't roaring. It wasn't burning anything.\nIt was weeping.",C.orange],
      ["พ่อค้า","มันร้องหาชื่อ — ชื่อลูกๆ ของมัน\nมาลาชาร์สังหารพวกมันก่อนที่จะจองจำ Vaelthorn\nตราสัญลักษณ์นั้นไม่ได้แค่ควบคุมมัน\nมันลบความทรงจำของมันทิ้งด้วย\n//It was calling out names — the names of its children.\nMalachar killed them before enslaving Vaelthorn.\nThat Sigil doesn't just control it —\nit erases its memory. Vaelthorn doesn't know who he is anymore.",C.orange],
      ["ลีร่า","...เขาพูดถูก ข้าเคยอ่านเจอในตำรา\nแต่ข้าไม่คิดว่ามาลาชาร์โหดร้ายถึงขนาดนั้น\n//...He's right. I've read about this.\nI never thought Malachar could be this cruel.",C.purple],
      ["พ่อค้า","เอาสิ่งนี้ไปด้วย ข้าเก็บมาตลอดทาง\nหวังว่าจะได้ตอบแทนบุญคุณของท่านสักครั้ง\n//Take these with you. I've been saving them the whole way.\nI hoped I'd have a chance to repay what you did for me.",C.orange],
      [null,">> ได้รับ: ยาฟื้นฟู 3 ขวด!\n>> [ ความจริงที่ซ่อนอยู่ในใจกลางความเจ็บปวดของมังกร\nกำลังรอให้คุณเลือก ]\n//>> Received: 3 Health Potions!\n//>> [ The truth hidden at the heart of the dragon's agony\nwaits for your judgment. ]",C.green],
    ],next:"ch_vaelthorn",
    reward:{items:[{id:"potion",name:"HEALTH POTION",d:"Restore 60 HP",c:3}]}},

  ch_vaelthorn:{t:"choice",bg:"#1a0000",
    text:"Vaelthorn ล้มลง บาดเจ็บสาหัส\nตราสัญลักษณ์รอบคอของมันร้าวแตก\nแสงสีแดงดับวูบ...\n\nแล้วเสียงแผ่วเบาก็แทรกออกมาจากหน้ากากแห่งความเจ็บปวด:\n\n\"พ่อมดนั้น... จองจำข้า\nข้าไม่เคยต้องการทำลายอาณาจักรของพวกเจ้า\nข้าแค่... อยากเห็นลูกๆ ข้าอีกครั้ง\"\n\n//Vaelthorn collapses, gravely wounded.\n//The Sigil around his neck fractures.\n//The crimson light flickers and dies...\n//Then a faint voice escapes from beneath the mask of pain:\n//\"The wizard enslaved me.\n//I never wanted to destroy your kingdom.\n//I only... wanted to see my children again.\"",
    choices:[
      {text:"[A] ทุบตราสัญลักษณ์ ปลดปล่อยมัน / Shatter the Sigil.",flag:"spared",next:"end_peace"},
      {text:"[B] ไม่มีความเมตตา ยุติมันตอนนี้ / No mercy. End this.",flag:"killed",next:"end_war"},
    ]},

  end_peace:{t:"ending",titleColor:C.blue,
    title:"ตอนจบ: ผู้ไถ่โทษ / ENDING: THE REDEEMER",
    lines:[
      [null,"เพชรโตะยกดาบขึ้น — และฟาดลงที่ตราสัญลักษณ์\n//Phetto raises his blade — and strikes the Sigil.",C.white],
      [null,"มันแตกเป็นเสี่ยงพร้อมเสียงดังกึก\nแสงสีทองพุ่งออกมา และ Vaelthorn คำรามขึ้น\nไม่ใช่ด้วยความโกรธ — แต่ด้วยความโล่งอก\n//It shatters with a thunderous crack.\nGolden light erupts, and Vaelthorn roars —\nnot in fury, but in overwhelming relief.",C.orange],
      ["VAELTHORN","\"ลูกๆ ของข้า... ข้าจำพวกเจ้าได้แล้ว\"\n\"ข้าสาบานชีวิตให้แก่ Aethoria\nให้ข้าช่วยสร้างสิ่งที่สูญเสียไปให้กลับคืนมา\"\n//\"My children... I remember you now.\"\n//\"I swear my life to Aethoria —\nlet me help rebuild what was lost.\"","#ff8844"],
      [null,"มาลาชาร์ถูกจับกุม อำนาจมืดของเขาพังทลาย\nเขาถูกนำตัวมาเผชิญกับขุนนางที่รอดชีวิต\n//Malachar is captured. His dark power collapses.\nHe is brought before the surviving lords of the realm.",C.white],
      [null,"พ่อค้าผู้นั้นกลับไปบ้านเกิดเมืองนอน\nและเล่าเรื่องราวของเพชรโตะในทุกเมืองที่เขาผ่าน\nชื่อของนักรบผู้มีเมตตาแพร่กระจายไปทั่วแผ่นดิน\n//The merchant returned home\nand told Phetto's story in every town he passed through.\nThe name of the merciful warrior spread across the land.",C.gold],
      [null,"ภายใต้พันธมิตรระหว่างมนุษย์กับมังกร\nAethoria ฟื้นคืนสู่ความรุ่งโรจน์มากกว่าเดิม\nและในทุกเมืองที่ถูกสร้างขึ้นใหม่ จะมีรูปสลักของมังกร\nเตือนให้คนจำว่า — ศัตรูที่แท้จริงอาจเป็นผู้ที่คุณไว้ใจที่สุด\n//Under the alliance of human and dragon,\nAethoria rose more glorious than ever before.\nIn every city rebuilt, a statue of the dragon stands —\na reminder that the true enemy may be the one you trust most.",C.green],
      [null,"",C.white],
      [null,"** ปลดล็อก TRUE ENDING — ผู้ไถ่โทษ **\n//** TRUE ENDING UNLOCKED — THE REDEEMER **",C.gold],
    ]},

  end_war:{t:"ending",titleColor:C.red,
    title:"ตอนจบ: นักแก้แค้น / ENDING: THE AVENGER",
    lines:[
      [null,"ดาบของเพชรโตะพุ่งลงมา\nVaelthorn ไม่ได้สู้ตอบ — มันแค่หลับตาลง\n//Phetto's blade falls.\nVaelthorn doesn't resist — it simply closes its eyes.",C.white],
      [null,"ถ้ำกลายเป็นความเงียบสนิท\nแม้แต่ไฟก็มอดลงพร้อมกัน\n//The cave falls into absolute silence.\nEven the fires seem to die with it.",C.gray],
      [null,"อำนาจของมาลาชาร์พังทลายโดยไม่มีอาวุธ\nเขาถูกจับกุมในเวลาต่อมา — ขอบคุณข่าวจากริเวน\n//Malachar's power crumbles without his weapon.\nHe is captured later — thanks to intelligence from Riven.",C.white],
      [null,"Aethoria ได้รับการแก้แค้นแล้ว\nกษัตริย์องค์ใหม่จะถูกสวมมงกุฎ อาณาจักรจะฟื้นคืน\n//Aethoria is avenged.\nA new king will be crowned. The kingdom will recover.",C.gold],
      [null,"",C.white],
      [null,"แต่ในคืนวันนั้น เมื่อทุกคนนอนหลับ\nเพชรโตะนั่งอยู่คนเดียวหน้ากองไฟ\nและได้ยินเสียงกระซิบจากความทรงจำ\n//But that night, when everyone sleeps,\nPhetto sits alone before a dying fire\nand hears a whisper from his memory.",C.gray],
      [null,"...เสียงร้องไห้ของสัตว์ร้ายที่ไม่รู้ว่าตัวเองกำลังทำอะไร\n//...the weeping of a creature that didn't know what it was doing.",C.red],
      [null,"",C.white],
      [null,"** ราคาของการแก้แค้น คือความสงสัยที่ไม่มีวันจางหาย **\n//** THE PRICE OF VENGEANCE: A DOUBT THAT NEVER FADES **",C.gold],
    ]},
};

export default function Game(){
  const [screen,setScreen]=useState("title");
  const [scId,setScId]=useState("s_intro");
  const [lnIdx,setLnIdx]=useState(0);
  const [party,setParty]=useState([mkParty()[0]]);
  const [gold,setGold]=useState(50);
  const [inv,setInv]=useState([{id:"potion",name:"HEALTH POTION",d:"Restore 60 HP",count:2}]);
  const [flags,setFlags]=useState({});
  const [btl,setBtl]=useState(null);
  const [bLog,setBLog]=useState([]);
  const [bPhase,setBPhase]=useState("player");
  const [bActed,setBActed]=useState([]);
  const [bSel,setBSel]=useState(0);
  const [bMenu,setBMenu]=useState("main");
  const [bPending,setBPending]=useState(null);
  const [shopMsg,setShopMsg]=useState("");
  const [upgBought,setUpgBought]=useState([]);
  const logRef=useRef(null);
  const flagsRef=useRef(flags);
  useEffect(()=>{flagsRef.current=flags;},[flags]);
  const scene=SCENES[scId]||{};

  useEffect(()=>{if(logRef.current) logRef.current.scrollTop=logRef.current.scrollHeight;},[bLog]);
  const addLog=useCallback((msgs,prev)=>[...prev,...msgs].slice(-8),[]);

  const applyReward=useCallback((reward)=>{
    if(!reward) return;
    if(reward.gold) setGold(g=>g+reward.gold);
    if(reward.items) setInv(iv=>{
      let n=[...iv];
      reward.items.forEach(ri=>{
        const ex=n.find(x=>x.id===ri.id);
        if(ex) n=n.map(x=>x.id===ri.id?{...x,count:x.count+ri.c}:x);
        else n=[...n,{id:ri.id,name:ri.name,d:ri.d,count:ri.c}];
      });
      return n;
    });
  },[]);

  const goScene=useCallback((id)=>{
    const s=SCENES[id]; if(!s) return;
    setScId(id); setLnIdx(0);
    if(s.t==="scene") setScreen("scene");
    else if(s.t==="choice") setScreen("choice");
    else if(s.t==="ending") setScreen("ending");
    else if(s.t==="shop") setScreen("shop");
  },[]);

  const initBattle=useCallback((bKey)=>{
    const def=BATTLES[bKey];
    setBtl({key:bKey,enemies:mkEnemies(def.keys),def});
    const m=def.msg.split("\n//");
    setBLog([`>> ${m[0]}`]);
    setBPhase("player"); setBActed([]); setBSel(0); setBMenu("main"); setBPending(null);
    setScreen("battle");
  },[]);

  const nextLine=useCallback(()=>{
    const lines=scene.lines||[];
    if(lnIdx<lines.length-1){setLnIdx(l=>l+1); return;}
    if(scene.reward) applyReward(scene.reward);
    if(scene.joinParty){
      setParty(prev=>{const full=mkParty(); return full.map(np=>{const ex=prev.find(p=>p.id===np.id); return ex?{...ex}:np;});});
    }
    if(scene.battle) initBattle(scene.battle);
    else if(scene.next==="c_shop"||SCENES[scene.next]?.t==="shop") setScreen("shop");
    else if(scene.next) goScene(scene.next);
  },[scene,lnIdx,initBattle,goScene,applyReward]);

  const makeChoice=useCallback((ch)=>{
    setFlags(f=>({...f,[ch.flag]:true}));
    if(ch.reward) applyReward(ch.reward);
    goScene(ch.next);
  },[goScene,applyReward]);

  const calcDmg=(atk,buf,mult,def)=>Math.max(1,Math.floor((atk+(buf||0))*mult*(0.85+Math.random()*0.3))-Math.floor(def*0.4));

  const doPartyAction=useCallback((mIdx,action,skIdx,tIdx)=>{
    if(!btl) return;
    let nP=party.map(p=>({...p})); let nE=btl.enemies.map(e=>({...e})); let logs=[];
    const m=nP[mIdx]; if(!m||!m.alive) return;
    if(action==="attack"){
      const sk=m.skills[0]; const t=nE[tIdx];
      if(t&&t.alive){const d=calcDmg(m.atk,m.buf,sk.mult,t.def); nE[tIdx]={...t,hp:Math.max(0,t.hp-d),alive:t.hp-d>0}; logs.push(`${m.name} โจมตี ${t.name}: ${d} DMG!`); if(!nE[tIdx].alive) logs.push(`${t.name} พ่ายแพ้!`);}
    } else if(action==="skill"){
      const sk=m.skills[skIdx];
      if(!sk||m.mp<sk.mp){logs.push("MP ไม่พอ!");setBMenu("main");return;}
      nP[mIdx]={...m,mp:Math.max(0,m.mp-sk.mp)};
      if(sk.type==="heal"){const t=nP[tIdx]; if(t){const h=Math.min(t.mxHp,t.hp+sk.healAmt)-t.hp; nP[tIdx]={...t,hp:t.hp+h}; logs.push(`${m.name} รักษา ${t.name}: +${h} HP!`);}}
      else if(sk.type==="buff"){nP=nP.map(p=>({...p,buf:(p.buf||0)+sk.bufAmt,bufT:sk.bufT})); logs.push(`WAR CRY! ATK ทุกคน +${sk.bufAmt}!`);}
      else if(sk.tar==="all"){nE=nE.map(e=>{if(!e.alive) return e; const d=calcDmg(nP[mIdx].atk,nP[mIdx].buf,sk.mult,e.def); const nHp=Math.max(0,e.hp-d); logs.push(`${sk.name} โจมตี ${e.name}: ${d}!`); if(nHp<=0) logs.push(`${e.name} พ่ายแพ้!`); return {...e,hp:nHp,alive:nHp>0};});}
      else{const t=nE[tIdx]; if(t&&t.alive){const d=calcDmg(nP[mIdx].atk,nP[mIdx].buf,sk.mult,t.def); const nHp=Math.max(0,t.hp-d); nE[tIdx]={...t,hp:nHp,alive:nHp>0}; logs.push(`${sk.name} โจมตี ${t.name}: ${d}!`); if(!nE[tIdx].alive) logs.push(`${t.name} พ่ายแพ้!`); if(sk.poison&&nE[tIdx].alive){nE[tIdx]={...nE[tIdx],poison:true,poisonT:3};logs.push(`${t.name} ถูกวางยาพิษ!`);} if(sk.stun&&nE[tIdx].alive){nE[tIdx]={...nE[tIdx],stunned:true};logs.push(`${t.name} งัก!`);}}}
    } else if(action==="item"){
      const item=inv[skIdx]; if(!item||item.count<=0){setBMenu("main");return;}
      const t=nP[tIdx];
      if(item.id==="potion"){const h=Math.min(t.mxHp,t.hp+60)-t.hp;nP[tIdx]={...t,hp:t.hp+h};logs.push(`ยาฟื้นฟู ${t.name}: +${h} HP!`);}
      else if(item.id==="ether"){const r=Math.min(t.mxMp,t.mp+40)-t.mp;nP[tIdx]={...t,mp:t.mp+r};logs.push(`Ether ${t.name}: +${r} MP!`);}
      else if(item.id==="revive"&&!t.alive){nP[tIdx]={...t,alive:true,hp:Math.floor(t.mxHp*0.5)};logs.push(`ฟื้นคืนชีพ ${t.name}!`);}
      setInv(iv=>iv.map(it=>it.id===item.id?{...it,count:Math.max(0,it.count-1)}:it));
    } else if(action==="defend"){nP[mIdx]={...m,defending:true}; logs.push(`${m.name} ตั้งรับ!`);}

    const newActed=[...bActed,mIdx];
    setBActed(newActed); setBtl(b=>({...b,enemies:nE})); setParty(nP);
    setBLog(prev=>addLog(logs,prev)); setBMenu("main"); setBPending(null);

    if(nE.every(e=>!e.alive)){
      const tG=btl.enemies.reduce((s,e)=>s+e.gold,0);
      const tX=btl.enemies.reduce((s,e)=>s+e.xp,0);
      setGold(g=>g+tG);
      setTimeout(()=>{
        setBLog(prev=>addLog([`ชนะ! +${tG} ทอง!`,tX>0?`ปาร์ตี้ได้ ${tX} EXP!`:""].filter(Boolean),prev));
        setBPhase("victory");
        const bKey=btl.key;
        setTimeout(()=>{
          if(bKey==="b3") goScene(flagsRef.current.saved?"c_merchant_twist":"ch_vaelthorn");
          else goScene(btl.def.after);
        },2200);
      },300); return;
    }

    const aliveIdx=nP.map((p,i)=>p.alive?i:-1).filter(i=>i>=0);
    const notActed=aliveIdx.filter(i=>!newActed.includes(i));
    if(notActed.length>0){setBSel(notActed[0]);setBMenu("main");}
    else{setBPhase("enemy"); setTimeout(()=>doEnemyTurn(nP,nE),600);}
  },[btl,party,inv,bActed,addLog,goScene]);

  const doEnemyTurn=useCallback((partyS,enemyS)=>{
    let nP=partyS.map(p=>({...p,defending:false}));
    let nE=enemyS.map(e=>({...e})); let logs=[];
    nE=nE.map(e=>{
      if(!e.alive) return e;
      if(e.poison&&e.poisonT>0){const pd=8;const nHp=Math.max(0,e.hp-pd);logs.push(`${e.name} รับพิษ ${pd}!`);return{...e,hp:nHp,alive:nHp>0,poisonT:e.poisonT-1,poison:e.poisonT>1};}
      return e;
    });
    nE.forEach(enemy=>{
      if(!enemy.alive) return;
      if(enemy.stunned){logs.push(`${enemy.name} งัก! ข้ามเทิร์น`);return;}
      const aliveP=nP.filter(p=>p.alive); if(!aliveP.length) return;
      const t=aliveP[Math.floor(Math.random()*aliveP.length)];
      const ti=nP.findIndex(p=>p.id===t.id);
      if(enemy.boss&&Math.random()<0.35){
        const sp=["ไฟมังกร","ฟาดหาง","คำรามโบราณ"][Math.floor(Math.random()*3)];
        if(sp==="ไฟมังกร"){nP=nP.map(p=>{if(!p.alive)return p;const d=Math.max(1,Math.floor(enemy.atk*0.55*(0.8+Math.random()*0.4))-Math.floor(p.def*0.3));const nHp=Math.max(0,p.hp-d);logs.push(`ไฟมังกร! ${p.name}: ${d}!`);return{...p,hp:nHp,alive:nHp>0};});return;}
        const d=Math.max(1,Math.floor(enemy.atk*1.4*(0.85+Math.random()*0.3))-Math.floor(t.def*0.4));
        const nHp=Math.max(0,t.hp-d);nP[ti]={...nP[ti],hp:nHp,alive:nHp>0};
        logs.push(`${enemy.name} ${sp} โจมตี ${t.name}: ${d}!`);if(!nP[ti].alive)logs.push(`${t.name} ล้มลง!`);return;
      }
      const def=t.defending?t.def*2:t.def;
      const d=Math.max(1,Math.floor(enemy.atk*(0.85+Math.random()*0.3))-Math.floor(def*0.4));
      const nHp=Math.max(0,t.hp-d);nP[ti]={...nP[ti],hp:nHp,alive:nHp>0};
      logs.push(`${enemy.name} โจมตี ${t.name}: ${d} DMG!`);if(!nP[ti].alive)logs.push(`${t.name} ล้มลง!`);
    });
    nE=nE.map(e=>({...e,stunned:false}));
    nP=nP.map(p=>({...p,bufT:Math.max(0,(p.bufT||0)-1),buf:(p.bufT||0)>1?p.buf:0}));
    setBtl(b=>b?{...b,enemies:nE}:b); setParty(nP);
    setBLog(prev=>addLog(logs,prev));
    if(!nP.some(p=>p.alive)){setBPhase("defeat");return;}
    setTimeout(()=>{setBActed([]);const fa=nP.findIndex(p=>p.alive);setBSel(fa>=0?fa:0);setBMenu("main");setBPhase("player");},500);
  },[addLog]);

  const buyItem=useCallback((item)=>{
    if(gold<item.price){setShopMsg("ทองไม่พอ!"); setTimeout(()=>setShopMsg(""),2000); return;}
    if(item.type==="upgrade"){
      if(upgBought.includes(item.id)){setShopMsg("อัพเกรดแล้ว!"); setTimeout(()=>setShopMsg(""),2000); return;}
      setUpgBought(p=>[...p,item.id]);
      setParty(prev=>prev.map(p=>p.id===item.target?{...p,atk:p.atk+item.amt}:p));
    } else {
      setInv(iv=>{const ex=iv.find(i=>i.id===item.id);if(ex)return iv.map(i=>i.id===item.id?{...i,count:i.count+1}:i);return[...iv,{id:item.id,name:item.name,d:item.d,count:1}];});
    }
    setGold(g=>g-item.price); setShopMsg(`ซื้อแล้ว!`); setTimeout(()=>setShopMsg(""),2000);
  },[gold,upgBought]);

  const resetGame=()=>{
    setScreen("title"); setScId("s_intro"); setLnIdx(0); setParty([mkParty()[0]]); setGold(50);
    setInv([{id:"potion",name:"HEALTH POTION",d:"Restore 60 HP",count:2}]); setFlags({});
    setBtl(null); setBLog([]); setUpgBought([]); setBPhase("player"); setBActed([]);
    setBSel(0); setBMenu("main"); setBPending(null);
  };

  const wrap={minHeight:"100vh",background:C.bg,color:C.white,fontFamily:F,
    display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
    padding:14,boxSizing:"border-box",userSelect:"none"};
  const pnl=(col=C.border)=>({border:`2px solid ${col}`,background:C.panel,padding:18,boxShadow:`0 0 12px ${col}22`});

  // TITLE
  if(screen==="title") return (
    <div style={wrap}>
      <div style={{maxWidth:480,width:"100%",textAlign:"center"}}>
        <div style={{color:C.gold,fontSize:11,letterSpacing:4,marginBottom:10}}>{"* ".repeat(16)}</div>
        <div style={{fontSize:11,color:C.purple,letterSpacing:5,marginBottom:4}}>AN 8-BIT LEGEND</div>
        <div style={{fontSize:28,color:C.gold,letterSpacing:2,marginBottom:2,textShadow:`0 0 14px ${C.gold}66`}}>SHARDS OF</div>
        <div style={{fontSize:36,fontWeight:"bold",color:C.white,letterSpacing:5,marginBottom:6,textShadow:`0 0 18px ${C.blue}66`}}>ETERNITY</div>
        <div style={{fontSize:12,color:C.gray,marginBottom:6}}>ชิ้นส่วนแห่งนิรันดร์</div>
        <div style={{fontSize:11,color:C.gray,marginBottom:26,lineHeight:2}}>
          อาณาจักรล่มสลาย มังกรถูกจองจำ<br/>
          <span style={{color:"#334466",fontSize:10}}>A kingdom fallen. A dragon enslaved.</span>
        </div>
        <div style={{fontSize:22,marginBottom:18,color:C.orange}}>[W] [M] [A]</div>
        <Btn onClick={()=>setScreen("scene")} color={C.gold}>&gt;&gt; เริ่มเกม / PRESS START</Btn>
        <div style={{marginTop:26,fontSize:10,color:C.gray,lineHeight:2}}>
          นักรบ / นักเวทย์ / นักธนู · ต่อสู้ผลัดเทิร์น<br/>
          เนื้อเรื่องสองทาง · สองตอนจบ · ทุกการเลือกมีความหมาย<br/>
          <span style={{color:"#223355",fontSize:9}}>Every choice echoes. Every mercy counts.</span>
        </div>
      </div>
    </div>
  );

  // SCENE
  if(screen==="scene"){
    const lines=scene.lines||[]; const cur=lines[lnIdx]||[]; const [spk,txt,col]=cur;
    const tp=(txt||"").split("\n//");
    return (
      <div style={wrap} onClick={nextLine}>
        <div style={{maxWidth:540,width:"100%"}}>
          {scene.title&&<div style={{textAlign:"center",color:C.gold,fontSize:12,letterSpacing:2,marginBottom:14}}>{scene.title}</div>}
          <div style={{...pnl(C.border),minHeight:200,position:"relative",cursor:"pointer"}}>
            {spk&&<div style={{color:C.gold,fontSize:12,marginBottom:10,letterSpacing:1}}>[{spk}]</div>}
            <div style={{minHeight:80}}>
              <div style={{color:col||C.white,fontSize:15,lineHeight:2.1,whiteSpace:"pre-wrap"}}>{tp[0]}</div>
              {tp[1]&&<div style={{color:C.gray,fontSize:12,lineHeight:1.8,marginTop:6,fontStyle:"italic",whiteSpace:"pre-wrap",borderTop:`1px solid #1a1a3a`,paddingTop:6}}>{tp[1]}</div>}
            </div>
            <div style={{position:"absolute",bottom:8,right:12,color:C.gray,fontSize:11}}>{lnIdx+1}/{lines.length} &gt;</div>
          </div>
          <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
            {party.map(p=>(
              <div key={p.id} style={{border:`1px solid ${p.color}44`,background:C.dark,padding:"6px 10px",fontSize:11,color:p.color,flex:"1 1 100px"}}>
                {p.e} {p.name} <Bar v={p.hp} max={p.mxHp} color={C.hp} w={50}/><span style={{color:C.gray}}> {p.hp}</span>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",fontSize:10,color:C.gray,marginTop:8}}>— คลิกเพื่อดำเนินต่อ / CLICK TO CONTINUE —</div>
        </div>
      </div>
    );
  }

  // CHOICE
  if(screen==="choice"){
    const tp=(scene.text||"").split("\n//");
    return (
      <div style={wrap}>
        <div style={{maxWidth:520,width:"100%"}}>
          <div style={{textAlign:"center",color:C.gold,fontSize:12,letterSpacing:2,marginBottom:12}}>── การตัดสินใจของคุณ / YOUR CHOICE ──</div>
          <div style={{...pnl(C.gold),marginBottom:20}}>
            <div style={{color:C.white,fontSize:14,lineHeight:2.1,whiteSpace:"pre-wrap"}}>{tp[0]}</div>
            {tp[1]&&<div style={{color:C.gray,fontSize:11,lineHeight:1.8,marginTop:8,fontStyle:"italic",whiteSpace:"pre-wrap",borderTop:`1px solid #2a1a00`,paddingTop:8}}>{tp[1]}</div>}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {(scene.choices||[]).map((ch,i)=><Btn key={i} onClick={()=>makeChoice(ch)} color={C.blue}>{ch.text}</Btn>)}
          </div>
        </div>
      </div>
    );
  }

  // SHOP
  if(screen==="shop") return (
    <div style={wrap}>
      <div style={{maxWidth:560,width:"100%"}}>
        <div style={{textAlign:"center",marginBottom:14}}>
          <div style={{color:C.gold,fontSize:14,letterSpacing:2}}>ร้านค้าค่ายต่อต้าน / RESISTANCE CAMP SHOP</div>
          <div style={{color:C.gold,fontSize:12,marginTop:4}}>ทอง / GOLD: {gold}</div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
          {party.map(p=>(
            <div key={p.id} style={{flex:"1 1 110px",border:`1px solid ${p.color}55`,background:C.dark,padding:"8px 10px",fontSize:11,color:p.color}}>
              {p.e} {p.name}<br/>
              <span style={{color:C.gray,fontSize:10}}>HP </span><Bar v={p.hp} max={p.mxHp} color={C.hp} w={52}/><br/>
              <span style={{color:C.gray,fontSize:10}}>MP </span><Bar v={p.mp} max={p.mxMp} color={C.mp} w={52}/><br/>
              <span style={{color:C.white,fontSize:10}}>ATK:{p.atk}</span>
            </div>
          ))}
        </div>
        <div style={pnl(C.border)}>
          {SHOP_ITEMS.map(item=>{
            const ob=upgBought.includes(item.id)&&item.type==="upgrade";
            return (
              <div key={item.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid #1a1a3a`}}>
                <div><div style={{color:ob?C.gray:C.white,fontSize:12}}>{item.name}</div><div style={{color:C.gray,fontSize:10}}>{item.d}</div></div>
                <Btn small onClick={()=>!ob&&buyItem(item)} disabled={ob||gold<item.price} color={ob?C.gray:gold>=item.price?C.green:C.red}>
                  {ob?"ซื้อแล้ว":`${item.price}G`}
                </Btn>
              </div>
            );
          })}
        </div>
        {shopMsg&&<div style={{textAlign:"center",color:C.green,fontSize:12,marginTop:8}}>{shopMsg}</div>}
        <div style={{fontSize:10,color:C.gray,marginTop:8,marginBottom:12}}>
          ไอเทม: {inv.filter(i=>i.count>0).map(i=>`${i.name} x${i.count}`).join(" · ")||"ว่างเปล่า"}
        </div>
        <Btn onClick={()=>goScene("s_act3")} color={C.gold}>&gt;&gt; มุ่งหน้าถ้ำ Vaelthorn</Btn>
      </div>
    </div>
  );

  // BATTLE
  if(screen==="battle"){
    if(!btl) return <div style={wrap}>Loading...</div>;
    const curM=party[bSel]; const isPlayer=bPhase==="player";
    return (
      <div style={{...wrap,justifyContent:"flex-start",paddingTop:14}}>
        <div style={{maxWidth:580,width:"100%"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
            <div style={{color:C.red,fontSize:11,letterSpacing:2}}>[ การต่อสู้ / BATTLE ]</div>
            <div style={{color:C.gold,fontSize:11}}>ทอง: {gold}</div>
          </div>
          <div style={{display:"flex",gap:10,marginBottom:12}}>
            {btl.enemies.map((en,ei)=>(
              <div key={en.id}
                style={{flex:1,border:`2px solid ${en.alive?(bMenu==="target"&&bPending?C.red:en.color):"#222244"}`,
                  background:en.boss?"#180400":C.panel,padding:"10px 8px",textAlign:"center",
                  opacity:en.alive?1:0.35,cursor:isPlayer&&bMenu==="target"&&bPending&&en.alive?"crosshair":"default",
                  boxShadow:en.boss&&en.alive?`0 0 18px ${en.color}44`:"none"}}
                onClick={()=>{if(!isPlayer||bMenu!=="target"||!bPending||!en.alive)return;doPartyAction(bSel,bPending.action,bPending.skIdx,ei);}}>
                <div style={{fontSize:en.boss?26:20,color:en.color,fontWeight:"bold"}}>{en.e}</div>
                <div style={{color:en.color,fontSize:en.boss?12:10,marginTop:3}}>{en.name}</div>
                <Bar v={en.hp} max={en.mxHp} color={C.hp} w={en.boss?90:62}/>
                <div style={{color:en.alive?C.white:C.red,fontSize:10,marginTop:2}}>{en.alive?`${en.hp}/${en.mxHp}`:"พ่ายแพ้"}</div>
                {en.boss&&en.alive&&<div style={{color:en.color,fontSize:9}}>★ BOSS</div>}
                {en.poison&&en.alive&&<div style={{color:"#88ff44",fontSize:9}}>ถูกพิษ</div>}
                {en.stunned&&en.alive&&<div style={{color:"#ffff44",fontSize:9}}>งัก!</div>}
                {isPlayer&&bMenu==="target"&&bPending&&en.alive&&<div style={{color:C.red,fontSize:9,marginTop:2}}>[คลิก]</div>}
              </div>
            ))}
          </div>
          <div ref={logRef} style={{...pnl(C.border),height:95,overflowY:"auto",padding:"7px 12px",marginBottom:10}}>
            {bLog.map((l,i)=><div key={i} style={{fontSize:11,color:i===bLog.length-1?C.white:C.gray,lineHeight:1.8}}>{l}</div>)}
          </div>
          <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
            {party.map((p,pi)=>{
              const isAct=pi===bSel&&isPlayer; const hasAct=bActed.includes(pi);
              return (
                <div key={p.id} style={{flex:"1 1 130px",border:`2px solid ${isAct?C.gold:hasAct?"#334455":p.color+"88"}`,
                  background:isAct?"#1a1800":C.dark,padding:"8px 10px",opacity:p.alive?1:0.4}}>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <span style={{color:isAct?C.gold:p.color,fontSize:11}}>{p.e} {p.name}</span>
                    <span style={{color:hasAct?C.green:p.alive?C.gray:C.red,fontSize:10}}>{!p.alive?"KO":hasAct?"OK":"--"}</span>
                  </div>
                  <div style={{fontSize:9,color:C.gray}}>{p.cls}</div>
                  <div style={{marginTop:4,fontSize:10}}>
                    <span style={{color:C.gray}}>HP </span><Bar v={p.hp} max={p.mxHp} color={C.hp} w={52}/>
                    <span style={{color:p.hp<p.mxHp*0.3?C.red:C.white}}> {p.hp}</span>
                  </div>
                  <div style={{fontSize:10}}>
                    <span style={{color:C.gray}}>MP </span><Bar v={p.mp} max={p.mxMp} color={C.mp} w={52}/>
                    <span style={{color:C.white}}> {p.mp}</span>
                  </div>
                  {p.buf>0&&<div style={{fontSize:9,color:C.green}}>ATK+{p.buf}({p.bufT}T)</div>}
                </div>
              );
            })}
          </div>
          {isPlayer&&curM&&curM.alive&&!bActed.includes(bSel)&&(
            <div style={pnl(C.gold)}>
              <div style={{color:C.gold,fontSize:11,marginBottom:8}}>
                {curM.e} {curM.name} — เทิร์นของคุณ
                {bMenu==="target"&&" — คลิกศัตรูด้านบน"}
                {bMenu==="targetAlly"&&" — เลือกพันธมิตร"}
              </div>
              {bMenu==="main"&&(
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {[
                    {label:"[ โจมตี / ATTACK ]",do:()=>{setBMenu("target");setBPending({action:"attack",skIdx:0});}},
                    {label:"[ สกิล / SKILL ]",do:()=>setBMenu("skill")},
                    {label:"[ ไอเทม / ITEM ]",do:()=>setBMenu("item")},
                    {label:"[ ตั้งรับ / DEFEND ]",do:()=>doPartyAction(bSel,"defend",null,null)},
                  ].map((b,i)=><Btn key={i} onClick={b.do}>{b.label}</Btn>)}
                </div>
              )}
              {bMenu==="skill"&&(
                <div>
                  <div style={{fontSize:10,color:C.blue,marginBottom:6,cursor:"pointer"}} onClick={()=>setBMenu("main")}>&lt; กลับ / BACK</div>
                  {curM.skills.map((sk,si)=>{
                    const dp=sk.desc.split("\n//");
                    return <div key={si} style={{marginBottom:6}}>
                      <Btn onClick={()=>{
                        if(curM.mp<sk.mp){setBLog(p=>addLog(["MP ไม่พอ!"],p));return;}
                        if(sk.type==="buff"||sk.tar==="all") doPartyAction(bSel,"skill",si,0);
                        else if(sk.type==="heal"){setBMenu("targetAlly");setBPending({action:"skill",skIdx:si});}
                        else{setBMenu("target");setBPending({action:"skill",skIdx:si});}
                      }} disabled={curM.mp<sk.mp} color={C.purple}>
                        {sk.name} ({sk.mp}MP) — {dp[0]}{dp[1]&&<span style={{color:C.gray,fontSize:10}}> / {dp[1]}</span>}
                      </Btn>
                    </div>;
                  })}
                </div>
              )}
              {bMenu==="item"&&(
                <div>
                  <div style={{fontSize:10,color:C.blue,marginBottom:6,cursor:"pointer"}} onClick={()=>setBMenu("main")}>&lt; กลับ / BACK</div>
                  {inv.filter(i=>i.count>0).length===0&&<div style={{color:C.gray,fontSize:12,padding:8}}>ไม่มีไอเทม</div>}
                  {inv.filter(i=>i.count>0).map(item=>(
                    <div key={item.id} style={{marginBottom:6}}>
                      <Btn onClick={()=>{setBMenu("targetAlly");setBPending({action:"item",skIdx:inv.indexOf(item)});}} color={C.green}>
                        {item.name} x{item.count} — {item.d}
                      </Btn>
                    </div>
                  ))}
                </div>
              )}
              {bMenu==="targetAlly"&&(
                <div>
                  <div style={{fontSize:10,color:C.blue,marginBottom:6,cursor:"pointer"}} onClick={()=>{setBMenu("main");setBPending(null);}}>&lt; ยกเลิก / CANCEL</div>
                  {party.map((p,pi)=>(
                    <div key={p.id} style={{marginBottom:6}}>
                      <Btn onClick={()=>{if(bPending) doPartyAction(bSel,bPending.action,bPending.skIdx,pi);}} color={p.color}>
                        {p.e} {p.name} — HP:{p.hp}/{p.mxHp}{!p.alive?" (KO)":""}
                      </Btn>
                    </div>
                  ))}
                </div>
              )}
              {bMenu==="target"&&(
                <div style={{fontSize:12,color:C.white}}>
                  👆 คลิกศัตรูด้านบน
                  <span style={{cursor:"pointer",color:C.blue,marginLeft:12,fontSize:11}} onClick={()=>{setBMenu("main");setBPending(null);}}>ยกเลิก</span>
                </div>
              )}
            </div>
          )}
          {bPhase==="enemy"&&<div style={{textAlign:"center",border:`1px solid ${C.red}`,padding:12,color:C.red,fontSize:13}}>เทิร์นศัตรู / ENEMY TURN...</div>}
          {bPhase==="victory"&&(
            <div style={{textAlign:"center",border:`2px solid ${C.gold}`,padding:14,background:"#0a0a0a"}}>
              <div style={{color:C.gold,fontSize:16,marginBottom:4}}>** ชนะ! / VICTORY! **</div>
              <div style={{color:C.green,fontSize:11}}>กำลังดำเนินต่อ...</div>
            </div>
          )}
          {bPhase==="defeat"&&(
            <div style={{textAlign:"center",border:`2px solid ${C.red}`,padding:14,background:"#1a0000"}}>
              <div style={{color:C.red,fontSize:16,marginBottom:12}}>เกมจบ / GAME OVER</div>
              <Btn onClick={resetGame} color={C.red}>กลับหน้าหลัก / RETURN TO TITLE</Btn>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ENDING
  if(screen==="ending") return (
    <div style={wrap}>
      <div style={{maxWidth:500,width:"100%",textAlign:"center"}}>
        <div style={{color:scene.titleColor,fontSize:17,marginBottom:20,letterSpacing:1,textShadow:`0 0 14px ${scene.titleColor}55`}}>
          {scene.title}
        </div>
        <div style={{border:`2px solid ${scene.titleColor}`,background:C.panel,padding:24,marginBottom:22,boxShadow:`0 0 16px ${scene.titleColor}22`}}>
          {(scene.lines||[]).map((l,i)=>{
            const pts=(l[1]||"").split("\n//");
            return <div key={i} style={{marginBottom:4}}>
              <div style={{color:l[2]||C.white,fontSize:14,lineHeight:2.1,whiteSpace:"pre-wrap"}}>{pts[0]}</div>
              {pts[1]&&<div style={{color:C.gray,fontSize:11,lineHeight:1.7,fontStyle:"italic",whiteSpace:"pre-wrap"}}>{pts[1]}</div>}
            </div>;
          })}
        </div>
        <div style={{fontSize:11,color:C.gray,marginBottom:20}}>
          {flags.spared?"เพชรโตะ เลือกเมตตา — ชีวิตหนึ่งที่ช่วยไว้ เปลี่ยนอีกหลายชีวิต":"ราคาของการแก้แค้น คือคำถามที่ไม่มีวันจางหาย"}
        </div>
        <Btn onClick={resetGame} color={C.gold}>&gt;&gt; เล่นอีกครั้ง / PLAY AGAIN</Btn>
      </div>
    </div>
  );

  return <div style={wrap}><div style={{fontSize:14}}>Loading...</div></div>;
}
