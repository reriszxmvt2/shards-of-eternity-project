# ⚔️ Shards of Eternity — ชิ้นส่วนแห่งนิรันดร์

> A turn-based RPG browser game with a bilingual Thai/English story.
> เกม RPG ผลัดเทิร์นในเบราว์เซอร์ เนื้อเรื่องสองภาษา ไทย/อังกฤษ

---

## 🎮 เกี่ยวกับเกม / About

อาณาจักร **Aethoria** ล่มสลายในคืนเดียว เพราะคนที่ไว้วางใจมากที่สุด
คุณคือทหารคนเดียวที่รอดชีวิต — ออกเดินทางแก้แค้นและค้นหาความจริง

**The kingdom of Aethoria fell in a single night — betrayed from within.**
You are the sole surviving soldier. Set out to find the truth and confront the darkness.

- 3 ตัวละครเล่นได้ — นักรบ / นักเวทย์ / นักธนู
- ระบบต่อสู้ผลัดเทิร์นพร้อม Skills, Items, Defend
- เนื้อเรื่อง 3 บท พร้อมการตัดสินใจที่เปลี่ยนตอนจบ
- **2 ตอนจบ** — True Ending และ Avenger Ending

---

## 🚀 วิธีรันบนเครื่อง / Run Locally

**ต้องการ:** [Node.js](https://nodejs.org) v18 ขึ้นไป

```bash
# 1. Clone โปรเจกต์
git clone https://github.com/reriszxmvt2/shards-of-eternity-project.git
cd shards-of-eternity-project

# 2. ติดตั้ง dependencies
npm install

# 3. รัน dev server
npm run dev
```

จากนั้นเปิดเบราว์เซอร์ไปที่ `http://localhost:5173`

---

## 🏗️ Build สำหรับ Production

```bash
npm run build
```

ไฟล์ที่ได้จะอยู่ในโฟลเดอร์ `dist/` พร้อม deploy ได้เลย

---

## 🛠️ Tech Stack

| เทคโนโลยี | รายละเอียด |
|-----------|-----------|
| React 18 | UI & Game State |
| TypeScript | Type Safety |
| Vite | Build Tool & Dev Server |

---

## 📁 โครงสร้างโปรเจกต์

```
shards-of-eternity-project/
├── shards_of_eternity.tsx   # ตัวเกมทั้งหมด
├── src/
│   └── main.tsx             # Entry point
├── index.html
├── vite.config.ts
└── tsconfig.json
```

---

## 📸 Screenshots

| หน้า Title | ฉากเนื้อเรื่อง | ระบบต่อสู้ |
|-----------|-------------|----------|
| หน้าจอเริ่มเกม | บทสนทนาสองภาษา | Turn-based battle |

---

*Made with React + TypeScript · ทำด้วย React + TypeScript*
