# Petualangan Mario - 100 Level

Game platformer 2D ala Mario Bros dengan 100 level, dibuat pakai Phaser 3. Bisa jalan di browser (desktop + mobile touch), dideploy ke Vercel, dan dibuild jadi APK Android via Capacitor.

## Cara Main (Lokal)

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` di browser.

## Kontrol

### Desktop (keyboard)
| Tombol | Aksi |
|---|---|
| `←` `→` atau `A` `D` | Gerak kiri/kanan |
| `Space` / `↑` / `W` | Lompat |
| `P` / `Esc` | Pause |
| `R` | Restart level |
| `M` | Mute / unmute sound |
| `Space` / `Enter` | Lanjut dari layar "LEVEL SELESAI" |

### Mobile (touch)
- **◀ ▶** D-pad di kiri bawah untuk gerak
- **A** tombol besar di kanan bawah untuk lompat
- **Tap** tombol menu di layar pause / level complete

## Deploy ke Vercel

File `vercel.json` sudah disertakan dengan setting:

- `cleanUrls: true` — URL tanpa ekstensi `.html`
- `Cache-Control: max-age=0` — no cache supaya update langsung生效
- `Content-Type: application/javascript` untuk ES modules di `/src/`

### Cara deploy pertama kali

1. Pastikan repo sudah di-push ke GitHub (lihat URL repo di deskripsi)
2. Buka [vercel.com](https://vercel.com) → login dengan GitHub
3. Klik **"Add New Project"**
4. Pilih repo `Super-Mario-2D`
5. Vercel auto-detect sebagai static site — **tidak perlu** isi build command / output directory
6. Klik **Deploy**
7. Tunggu ±1 menit, dapat URL `https://super-mario-2d-xxx.vercel.app`

### Update deployment

Setiap push ke branch `main` akan trigger redeploy otomatis. Tunggu ±30 detik sampai perubahan生效.

### Kalau "gak bisa dijalankan" / layar kosong

Buka browser console (F12). Biasanya salah satu:

| Error | Solusi |
|---|---|
| `Failed to load module script: Expected MIME type` | `vercel.json` belum ada / belum terdeploy. Pastikan file `vercel.json` ada di root repo |
| `CORS policy` | Vercel sudah handle, tapi cek `vercel.json` headers |
| Blank canvas, no error | Phaser CDN diblock. Coba ganti ke `https://cdn.jsdelivr.net/npm/phaser@3.60.0` |
| `AudioContext was not allowed to start` | Normal — butuh interaksi user dulu (tap / klik) sebelum bunyi keluar |

## Build APK Android

```bash
npm install
npm run android:init      # inisialisasi Capacitor (sekali)
npm run android:sync      # sync web assets ke android/
npm run android:build:debug   # build APK debug
```

Lihat `KEYSTORE.md` untuk cara generate keystore sebelum build release.

## Struktur Project

```
game-mario/
├── index.html              # entry HTML (Phaser CDN)
├── package.json            # npm scripts
├── vercel.json             # konfigurasi Vercel (no-cache + MIME)
├── capacitor.config.json   # konfigurasi Capacitor
├── src/
│   ├── main.js             # inisialisasi Phaser.Game + scale config
│   ├── scenes/             # Boot, Preload, Intro, LevelSelect, Game, Cut, Ending
│   ├── entities/           # Player, Enemy, Coin, PowerUp
│   ├── systems/            # HUD, LevelManager, LevelGenerator, SoundManager
│   └── data/               # levels.js (8 manual + 92 generated), story.js
├── android/                # hasil `npx cap add android`
├── KEYSTORE.md             # cara generate keystore
└── README.md               # file ini
```

## Status

- [x] 100 level (8 handcrafted + 92 procedural deterministic)
- [x] Cutscene setiap kelipatan 10 level
- [x] Ending setelah level 100
- [x] Pixel art sprites (Mario, Goomba, bat, coin, flag, mushroom, star)
- [x] Web Audio API procedural SFX
- [x] Coyote time + jump buffer
- [x] HUD: nyawa, skor, level, waktu, koin, mute
- [x] **Touch controls untuk mobile** (D-pad + jump)
- [x] **Responsive canvas** (Phaser.Scale.FIT)
- [x] **Vercel-ready** (vercel.json dengan proper headers)
- [x] Auto-advance + SPACE shortcut dari "LEVEL SELESAI"
- [x] Capacitor Android config
