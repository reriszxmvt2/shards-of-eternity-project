import { COLORS } from "./colors";

export const SHARDS = [
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

export const SHARDS_REQUIRED = SHARDS.map((shard) => shard.id);
