import { ACT1_SCENES } from "./act1";
import { ACT2_SCENES } from "./act2";
import { ACT3_SCENES } from "./act3";
import { ENDING_SCENES } from "./endings";
import { PROLOGUE_SCENES } from "./prologue";

export const SCENES = {
  ...PROLOGUE_SCENES,
  ...ACT1_SCENES,
  ...ACT2_SCENES,
  ...ACT3_SCENES,
  ...ENDING_SCENES,
};
