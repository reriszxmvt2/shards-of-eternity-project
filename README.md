# Shards of Eternity — ชิ้นส่วนแห่งนิรันดร์

> A turn-based RPG browser game with a bilingual Thai/English story.  
> เกม RPG ผลัดเทิร์นบนเบราว์เซอร์ พร้อมเนื้อเรื่องสองภาษา ไทย/อังกฤษ

## About

อาณาจักร **Aethoria** ล่มสลายในคืนเดียวจากการทรยศของคนที่ไว้ใจที่สุด  
คุณคือทหารคนเดียวที่รอดชีวิต และต้องออกเดินทางเพื่อแก้แค้น ค้นหาความจริง และตัดสินชะตาของผู้คนที่เหลืออยู่

**The kingdom of Aethoria fell in a single night, betrayed from within.**  
You are the sole surviving soldier. Set out to uncover the truth, face ancient darkness, and decide what vengeance should cost.

## Features

- Turn-based RPG battle system
- Playable party members: warrior, mage, and archer
- Skills, items, defend actions, poison, stun, buffs, and boss battle mechanics
- Thai/English story scenes
- Branching choices with multiple endings
- Shop system for items and weapon upgrades

## Tech Stack

| Technology | Purpose |
| --- | --- |
| Vue 3 | UI and game screen rendering |
| JavaScript ES6 | Game logic and modules |
| Vite | Dev server and production build |
| CSS BEM | Maintainable game styling |

## Run Locally

Requires Node.js 18 or newer.

```bash
git clone https://github.com/reriszxmvt2/shards-of-eternity-project.git
cd shards-of-eternity-project
npm install
npm run start
```

Open the game at:

```text
http://localhost:5173/
```

You can also use:

```bash
npm run dev
```

## Available Scripts

```bash
npm run start    # Start Vite dev server
npm run dev      # Start Vite dev server
npm run build    # Build production files into dist/
npm run preview  # Preview the production build locally
```

## Project Structure

```text
shards-of-eternity-project/
├── src/
│   ├── App.vue                    # App coordinator and screen state
│   ├── main.js                    # Vue entry point
│   ├── gameData.js                # Story, party, enemies, shop data
│   ├── components/
│   │   ├── battle/                # Battle UI pieces
│   │   ├── screens/               # Main game screens
│   │   └── ui/                    # Shared UI controls
│   └── composables/               # Game flow, battle, and shop logic
├── shards_of_eternity.css         # BEM-based game styles
├── index.html
├── package.json
└── vite.config.js
```

## Build

```bash
npm run build
```

The production files will be generated in `dist/`.

## Notes

The current codebase is organized around small Vue components and composables:

- `components/screens` handles each game screen.
- `components/battle` handles battle-specific UI.
- `components/ui` holds shared controls.
- `composables` holds game behavior and state transitions.

Made with Vue 3 + JavaScript ES6.
