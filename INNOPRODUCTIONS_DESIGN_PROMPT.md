# SUPERPROMPT — InnoProductions Subpage

> Copy semua isi di bawah garis ini, paste ke Claude Design sebagai satu prompt.

---

## ROLE

You are designing and building one new page for an existing, already-deployed Next.js website. This is not a greenfield project — the page must drop into a running codebase and look like it was always there. Match the existing conventions exactly; do not introduce new libraries, new styling paradigms, or a new design language.

## GOAL

Build `/innoproductions` — the business/agency subpage of the INNOSXNCE website. It sells one thing: **video editing as a service**. A visitor lands here, understands what is offered, sees the price without asking, sees proof the editing is worth paying for, and sends a structured brief via WhatsApp or email. That is the entire job of the page.

---

# 1. CONTEXT — the existing site

**INNOSXNCE** is an Indonesian creator brand built on the idea of *1% per hari* (one percent a day) — discipline, consistency, no drama. It sells wallpapers, editing tutorial packs, and runs a Discord community. Dark, cinematic, editorial. Very serious, zero playfulness, no emoji, no rounded corners, no gradients-as-decoration.

**Existing routes:** `/` (home), `/manifesto`, `/wallpapers`, `/tutorials`, `/community`, `/journal`.

**Brand relationship — this is the single most important thing to communicate on the new page:**

- **INNOSXNCE** = the creator brand. The face, the content, the audience.
- **InnoProductions** = the production house. The business entity that does client work.

InnoProductions is the parent business; INNOSXNCE is its creator sub-brand. But because the audience arrives through the INNOSXNCE website, InnoProductions lives here as a subpage reached from the header. The page must make that relationship legible within the first screen and a half, without a diagram and without a paragraph of corporate lore — one sentence does it.

**The service, plainly:** a client sends raw footage; we send back an edited video built to their request. Shortform (Reels / TikTok / Shorts), longform (YouTube), and podcast clipping.

---

# 2. TECH STACK — non-negotiable

| Layer | What it is |
|---|---|
| Framework | **Next.js 16.2 (App Router)**, `app/` directory |
| React | **React 19** |
| Language | **TypeScript**, strict |
| Styling | **Tailwind CSS v4** (`@import "tailwindcss"` + `@theme` block in `app/globals.css`) |
| Fonts | `next/font/google` — Cinzel, Cormorant Garamond, Manrope |
| Hosting | Vercel |
| Backend | **None. There is no server, no database, no API route.** |

### Styling convention — read this twice

The codebase does **not** style with Tailwind utility classes for anything visual. Tailwind is used *only* for structural layout primitives (`flex`, `grid`, `items-center`, `justify-between`, `hidden lg:flex`, `fixed inset-0`). **Every color, font, size, border, and spacing value is written as an inline `style={{ }}` object.** Fonts are referenced through CSS variables inside those objects:

```tsx
style={{
  fontFamily: 'var(--font-cinzel), serif',
  fontWeight: 700,
  fontSize: 'clamp(28px,5vw,54px)',
  color: '#fff',
}}
```

Follow this. Do not convert the page to Tailwind classes. Do not add CSS modules, styled-components, or a `.css` file. Font variables available: `--font-cinzel`, `--font-cormorant`, `--font-manrope`.

### Existing app shell (already built — do not rebuild, just fit inside it)

- `app/layout.tsx` renders, in order: `<SpaceBackdrop />` (animated starfield), `<NoiseOverlay />` (film grain), `<KeyboardNav />`, `<Header />`, `{children}`, `<Footer />`. Your page renders as `{children}` — it needs **no** header or footer of its own.
- **Header** is `position: fixed`, `height: 58px`, `background: rgba(0,0,0,0.78)`, `backdropFilter: blur(10px)`, `borderBottom: 1px solid #161616`, `zIndex: 60`. Any anchor target on your page needs `scrollMarginTop: 78` so it does not slide under the header.
- **Language** is a global ID/EN toggle in the header. Read it with `const { lang } = useLang()` from `@/lib/lang-context`. All copy lives in `lib/copy.ts` as `COPY.id` / `COPY.en` and is read as `COPY[lang]`. **Both language objects must have identical key structure** — this is enforced by TypeScript at build time.
- **Navigation between routes** does not use `next/link`. It uses `const router = useRouter()` from `next/navigation`, then `router.push('/route')` — no transition or overlay in between. External links and same-page anchors use normal `<a>`.
- **Cursor** is a custom SVG dot-and-ring set on `body`. Every interactive element must use `cursor: 'inherit'` — never `pointer`. Buttons are always `background: 'none', border: 'none'` unless a border is part of the design.
- **Scrollbars are hidden** (`::-webkit-scrollbar { width: 0 }`).
- `<ScrollPop>` from `@/components/ScrollPop` is an existing wrapper that scroll-links a scale-up/push-up reveal on a section's contents. Use it on static sections. **Do not wrap interactive sections** (the comparison slider, the form) — it disables pointer events until the reveal settles.

### Hard constraints

- Every component that uses state or hooks starts with `'use client'`.
- **No `localStorage`, `sessionStorage`, or any browser storage.** State lives in React only.
- No new npm dependencies. No animation library, no form library, no UI kit, no icon package.
- No images or video files — there is no real client footage yet. All visuals must be composed from CSS/SVG (see §5.2).
- Respect `prefers-reduced-motion` on anything that moves.

---

# 3. DESIGN DIRECTION

## Palette

InnoProductions runs **monochrome / silver**. This is deliberate: INNOSXNCE owns the red, so the studio side stays achromatic and the two brands read as related but distinct inside the same shell.

| Token | Value | Use |
|---|---|---|
| Background | `#000` | page |
| Card background (featured) | `#060606` | the highlighted pricing tier only |
| Primary text | `#fff` | headings, key figures |
| Body text | `#9a9a9a` | paragraphs |
| Dim text | `#7a7a7a` | kickers, labels, metadata |
| Faint text | `#5a5a5a` / `#3a3a3a` | fine print, disabled-feeling detail |
| Border | `#1a1a1a` | every hairline rule and card edge |
| **Accent — silver** | **`#d4d4d4`** | bullets, prices, step numbers, featured tier edge |
| INNOSXNCE red | `#c83232` | **do not use**, except one place: form validation error text |

Hover behaviour throughout the site: borders go `#1a1a1a → #fff`, and primary buttons invert (white fill / black text ⇄ transparent fill / white text). Transitions are fast — `0.12s`. Keep it.

## Typography

| Role | Spec |
|---|---|
| H1 | Cinzel 700, `clamp(42px,8.5vw,96px)`, `line-height: 0.94`, `letterSpacing: -0.01em` |
| H2 (section) | Cinzel 700, `clamp(28px,5vw,54px)`, `line-height: 1.02` |
| H3 (card) | Cinzel 600, `clamp(17px,2.4vw,25px)` |
| Kicker / eyebrow | Manrope 11px, `letterSpacing: 0.3em`, uppercase, `#7a7a7a` |
| Micro label | Manrope 9–10px, `letterSpacing: 0.18–0.22em`, uppercase |
| Body | Manrope 13–15px, `line-height: 1.7–1.8`, `#9a9a9a` |
| Pull quote | Cormorant Garamond **italic** 16–17px, `line-height: 1.5–1.65` |
| Price figure | Cinzel 700, `clamp(28px,4vw,40px)`, `#fff` |

## Layout system

- Content max-width **1100px**, centered.
- Horizontal padding `clamp(20px,5vw,48px)`.
- Vertical section rhythm `clamp(64px,9vw,104px)`; final section gets `clamp(72px,10vw,120px)` bottom.
- Card grids: `repeat(auto-fit, minmax(270px, 1fr))` with `gap: clamp(12px,1.6vw,18px)`.
- **Sharp corners everywhere.** `borderRadius: 0`. The only exception is the circular drag handle on the comparison slider.
- Lists and tables are built from 1px `#1a1a1a` hairlines, not from boxes or fills.
- The `✦` glyph is the house bullet — use it before feature list items, in silver.

## Tone

Direct, unhyped, slightly blunt. Indonesian copy is casual-but-professional (`kamu`, not `Anda`; not slangy like the creator-side pages). English copy is plain and declarative. **No exclamation marks. No emoji. No "amazing", "stunning", "unlock", "elevate".** Trust the specificity of the numbers to do the persuading.

---

# 4. PAGE STRUCTURE & FULL CONTENT

Ten sections, in this order. All copy below is final and bilingual — put it in `lib/copy.ts` under an `inno` key inside both `COPY.id` and `COPY.en`.

---

### 4.1 HERO

Kicker → oversized headline → lead paragraph (max-width 560) → two buttons.

| | ID | EN |
|---|---|---|
| Kicker | `INNOPRODUCTIONS · RUMAH PRODUKSI` | `INNOPRODUCTIONS · PRODUCTION HOUSE` |
| Headline | `Kami yang\nngedit.` | `We do\nthe edit.` |
| Lead | InnoProductions adalah sisi bisnis dari INNOSXNCE. Kamu kirim footage mentah, kami kirim balik video yang layak diupload — shortform, longform, atau keduanya. | InnoProductions is the business side of INNOSXNCE. You send the raw footage, we send back a video worth publishing — shortform, longform, or both. |
| Button 1 (solid white → `#brief`) | `Mulai Proyek →` | `Start a Project →` |
| Button 2 (outline → `#pricing`) | `Lihat Harga` | `See Pricing` |

Headline renders with `whiteSpace: 'pre-line'` so the `\n` breaks.

---

### 4.2 SPEC STRIP + BRAND RELATIONSHIP

A 4-cell grid, hairline-separated (`gap: 1` over a `#1a1a1a` background — the classic 1px-gap grid trick), each cell `background: #000`, centered, big Cinzel figure over a tiny Manrope label.

**These are specifications, not vanity metrics — deliberately so.** Do not replace them with invented client counts or testimonial numbers. Nothing on this page may claim social proof that cannot be verified.

| Figure | Label ID | Label EN |
|---|---|---|
| `48 JAM` | DRAFT PERTAMA | FIRST DRAFT |
| `4K` | RESOLUSI MAKS | MAX RESOLUTION |
| `9:16 · 16:9 · 1:1` | SEMUA FORMAT | EVERY FORMAT |
| `2×` | REVISI MINIMUM | MINIMUM REVISIONS |

Directly beneath, a Cormorant italic pull-quote with a 1px silver left border and 18px left padding, max-width 620:

- **ID:** INNOSXNCE adalah brand kreatornya. InnoProductions adalah studio yang ngerjain. Skill yang sama, cuma kali ini buat channel kamu.
- **EN:** INNOSXNCE is the creator brand. InnoProductions is the studio that does the work. Same craft, pointed at your channel this time.

---

### 4.3 SERVICES — three cards

Header — ID: kicker `LAYANAN · 03`, title `Tiga cara kerjanya.`, sub `Semua dikerjain manual. Nggak ada template yang tinggal diisi.` / EN: `SERVICES · 03`, `Three ways in.`, `All cut by hand. No fill-in-the-blank templates.`

Card anatomy: top row = index number (left, dim) + aspect-ratio badge in a hairline box (right, silver) → Cinzel title → description → hairline-ruled list of deliverables, each prefixed with a silver `✦`. Border goes white on hover. Cards must be equal height (`height: '100%'` inside the grid).

**Card 01 — `9:16` — Shortform**
- ID desc: Reels, TikTok, dan Shorts yang nahan orang di tiga detik pertama. Retensi dulu, estetika belakangan.
- EN desc: Reels, TikTok and Shorts built to hold people through the first three seconds. Retention first, gloss second.
- Includes — ID: Hook editing 0–3 detik / Subtitle bergaya (auto-sync) / Sound design & SFX / Pacing cepat, zero dead air / Export 1080×1920 siap upload
- Includes — EN: Hook editing, 0–3 seconds / Styled auto-synced subtitles / Sound design & SFX / Fast pacing, zero dead air / 1080×1920 export, upload-ready

**Card 02 — `16:9` — Longform**
- ID desc: Video YouTube yang punya alur. Bukan cuma potongan yang disambung, tapi cerita yang ditata.
- EN desc: YouTube videos with a spine. Not clips stitched together, but a story arranged.
- Includes — ID: Struktur naratif & pacing / Penempatan b-roll / Color grading / Motion graphics dasar & lower third / Chapter marker & mixing audio
- Includes — EN: Narrative structure & pacing / B-roll placement / Color grading / Base motion graphics & lower thirds / Chapter markers & audio mixing

**Card 03 — `9:16` — Podcast Clipping**
- ID desc: Satu episode panjang dibedah jadi sepuluh klip vertikal. Satu rekaman, sebulan konten.
- EN desc: One long episode dissected into ten vertical clips. One recording, a month of content.
- Includes — ID: Seleksi momen paling kuat / 10 klip per episode / Reframe otomatis ke 9:16 / Subtitle + speaker highlight / Penamaan file siap jadwal
- Includes — EN: Selection of the strongest moments / 10 clips per episode / Auto-reframe to 9:16 / Subtitles + speaker highlight / Scheduling-ready file naming

---

### 4.4 THE WORK — before/after comparison

Header — ID: `HASIL KERJA`, `Geser buat lihat bedanya.`, `Kiri footage mentah. Kanan hasil akhir. Selisihnya itu yang kamu bayar.` / EN: `THE WORK`, `Drag to see the difference.`, `Raw footage on the left. Finished cut on the right. The gap is what you are paying for.`

Three comparison sliders in a responsive grid. Corner labels — ID `MENTAH` / `HASIL`, EN `RAW` / `FINAL`. Hint text below the grid — ID: `Geser · atau pakai tombol panah`, EN: `Drag · or use the arrow keys`.

| Slug | Title ID / EN | Category | Ratio | Burned-in hook (ID / EN) |
|---|---|---|---|---|
| `hook-retention` | Hook & Retensi / Hook & Retention | `SHORTFORM · 9:16` | 9:16 | `JANGAN\nSKIP\nDULU` / `DO NOT\nSKIP\nTHIS` |
| `narrative-cut` | Potongan Naratif / Narrative Cut | `LONGFORM · 16:9` | 16:9 | `BAB 01 — AWAL` / `CHAPTER 01 — THE START` |
| `clip-extraction` | Ekstraksi Klip / Clip Extraction | `PODCAST · 9:16` | 9:16 | `BAGIAN\nINI YANG\nPENTING` / `THIS IS\nTHE PART\nTHAT MATTERS` |

Below each slider: Cinzel title, dim Manrope category line, and the live slider position as a percentage on the right.

Full interaction and visual spec in **§5.2** — read it, this is the most involved component on the page.

---

### 4.5 PROCESS — four steps

Header — ID: `ALUR KERJA · 04`, `Dari brief sampai file final.`, `Nggak ada tahap yang disembunyiin. Kamu selalu tahu posisi proyeknya di mana.` / EN: `PROCESS · 04`, `From brief to final file.`, `No hidden stage. You always know where the project stands.`

Rendered as hairline-ruled rows, not cards. Two-column grid per row: `minmax(52px, 88px)` for the big silver Cinzel number, then the text block (title + description, max-width 620).

| # | Title ID / EN | Description |
|---|---|---|
| 01 | Brief / Brief | **ID:** Isi form di bawah atau chat langsung. Kirim footage lewat Drive atau WeTransfer, plus 1–2 referensi gaya yang kamu suka. **EN:** Fill the form below or message directly. Send footage via Drive or WeTransfer, plus one or two style references you like. |
| 02 | Kesepakatan / Agreement | **ID:** Kamu dapat penawaran, timeline, dan lingkup kerja yang jelas. Kerja dimulai setelah DP 50%. **EN:** You get a quote, a timeline and a clear scope. Work starts once the 50% deposit lands. |
| 03 | Draft & Revisi / Draft & Revisions | **ID:** Draft pertama dikirim sesuai paket. Catatan revisi ditulis pakai timestamp, biar nggak ada yang meleset. **EN:** The first draft arrives on schedule. Revision notes come with timestamps so nothing gets lost. |
| 04 | Delivery / Delivery | **ID:** File final dikirim siap upload, dalam semua rasio yang kamu butuh. Pelunasan sebelum file bersih diserahkan. **EN:** Final files land upload-ready, in every ratio you need. Balance is settled before the clean files are handed over. |

---

### 4.6 PRICING — three tiers · `id="pricing"`

Header — ID: `HARGA`, `Angkanya di depan.`, `Nggak perlu nanya dulu buat tahu harga. Semua sudah termasuk revisi dan file siap upload.` / EN: `PRICING`, `Numbers up front.`, `No need to ask before you know the cost. Revisions and upload-ready files are already in.`

Card anatomy: tier name (tiny, wide letter-spacing, dim) → price + unit on one baseline → Cormorant italic tagline → hairline feature list with silver `✦` → a footer row splitting turnaround (left) and revision count (right) in faint 10px → full-width CTA button linking to a pre-filled WhatsApp message naming the chosen package.

The featured tier gets: `#d4d4d4` border instead of `#1a1a1a`, `#060606` background, a solid silver ribbon pinned to its top-left corner at `top:-1, left:-1` (ID `PALING SERING DIAMBIL` / EN `MOST CHOSEN`), and a pre-filled white CTA. All three cards stay equal height.

CTA label — ID `Ambil Paket →`, EN `Take This →`.

**Tier 1 — CUT — `Rp 350K` / video**
- Tagline ID: Satu video pendek, dikerjain sampai tajam. / EN: One short video, cut until it is sharp.
- Features ID: Durasi hasil maks 90 detik / Format vertikal 9:16 / Subtitle bergaya + sound design / Footage mentah maks 20 menit / Export 1080p
- Features EN: Final runtime up to 90 seconds / Vertical 9:16 format / Styled subtitles + sound design / Raw footage up to 20 minutes / 1080p export
- Footer: `2 hari kerja` · `2× revisi` / `2 working days` · `2 revisions`

**Tier 2 — FEATURE — `Rp 1.5JT` / video — ★ FEATURED**
- Tagline ID: Longform utuh, dari struktur sampai warna. / EN: A full longform, from structure to color.
- Features ID: Durasi hasil 5–20 menit / Color grading & mixing audio / Motion graphics + lower third / Footage mentah maks 3 jam / Bonus 1 thumbnail / Export sampai 4K
- Features EN: Final runtime 5–20 minutes / Color grading & audio mixing / Motion graphics + lower thirds / Raw footage up to 3 hours / One thumbnail included / Export up to 4K
- Footer: `4–5 hari kerja` · `3× revisi` / `4–5 working days` · `3 revisions`

**Tier 3 — STUDIO — `Rp 6.5JT` / bulan**
- Tagline ID: Editor tetap buat channel yang jalan tiap minggu. / EN: A standing editor for a channel that ships weekly.
- Features ID: 12 shortform + 2 longform / bulan / Podcast clipping termasuk / Editor tetap & antrean prioritas / Thumbnail untuk semua longform / Kanal komunikasi langsung / Slot terbatas per bulan
- Features EN: 12 shortform + 2 longform / month / Podcast clipping included / Dedicated editor & priority queue / Thumbnails for every longform / Direct communication channel / Limited slots per month
- Footer: `24–48 jam / aset` · `Revisi wajar tanpa batas` / `24–48 hours / asset` · `Unlimited fair revisions`

Fine print under the grid (max-width 660, `#5a5a5a`, 12px):
- **ID:** Harga di atas untuk lingkup standar. Proyek dengan footage sangat panjang, animasi berat, atau deadline mepet dihitung terpisah — tanya aja, penawarannya gratis.
- **EN:** These prices cover standard scope. Projects with very long footage, heavy animation or a tight deadline are quoted separately — just ask, quoting is free.

---

### 4.7 ADD-ONS

Header — ID: `TAMBAHAN`, `Bisa ditambah kapan aja.`, `Dibeli terpisah atau digabung ke paket mana pun.` / EN: `ADD-ONS`, `Bolt on anything.`, `Bought on their own or attached to any package.`

A hairline-ruled list, not cards. Each row: name (white, 14px) + inline note (`#5a5a5a`, 11px) on the left, silver Cinzel price on the right, wrapping gracefully on narrow screens.

| Name ID / EN | Price | Note ID / EN |
|---|---|---|
| Desain thumbnail / Thumbnail design | `Rp 150K` | per desain, 2× revisi / per design, 2 revisions |
| Motion graphics lanjutan / Advanced motion graphics | `Rp 300K` | per video, animasi kustom / per video, custom animation |
| Subtitle dua bahasa (ID + EN) / Bilingual subtitles (ID + EN) | `Rp 100K` | per video, sudah diproofread / per video, proofread |
| Color grading kustom / Custom color grading | `Rp 250K` | per video, LUT khusus / per video, bespoke LUT |
| Podcast clipping batch / Podcast clipping batch | `Rp 2.5JT` | 1 episode → 10 klip vertikal / 1 episode → 10 vertical clips |
| Express 24 jam / 24-hour express | `+50%` | dari harga paket, sesuai slot / on package price, subject to slots |

---

### 4.8 FAQ — accordion

Header — ID: `PERTANYAAN`, `Yang biasanya ditanya.` / EN: `QUESTIONS`, `What people usually ask.` (no sub-line). Max-width 760.

Each row: a full-width borderless button, question on the left, a silver `+` / `−` on the right, hairline underneath. Answer expands below in `#8a8a8a` 13px, `line-height: 1.8`, with right padding so it does not run under the toggle. Closed by default; rows open independently.

1. **Gimana cara kirim footage-nya?** / **How do I send my footage?**
   ID: Google Drive, WeTransfer, atau Dropbox. Cukup kirim satu link yang bisa diakses, jangan dikompres dulu — makin mentah makin bagus hasil gradingnya.
   EN: Google Drive, WeTransfer or Dropbox. One accessible link is enough, and please do not pre-compress it — the rawer the file, the better the grade.

2. **Berapa lama pengerjaannya?** / **How long does it take?**
   ID: Shortform 2 hari kerja, longform 4–5 hari kerja, klien retainer 24–48 jam per aset. Hitungan dimulai setelah footage lengkap dan DP masuk, bukan sejak chat pertama.
   EN: Shortform takes 2 working days, longform 4–5, retainer clients 24–48 hours per asset. The clock starts when the footage is complete and the deposit is in, not at first message.

3. **Kalau hasilnya belum sesuai?** / **What if the result misses the mark?**
   ID: Setiap paket punya kuota revisi. Catatan revisi ditulis pakai timestamp dan dikirim sekaligus, biar satu putaran revisi beres dalam sekali kerja. Di luar kuota, ada biaya tambahan per putaran.
   EN: Every package includes a revision quota. Notes come with timestamps and arrive in one batch, so a round is closed in a single pass. Beyond the quota, extra rounds are billed.

4. **Pakai software apa? Bisa minta project file?** / **What software do you use? Can I get the project file?**
   ID: Adobe Premiere Pro dan After Effects. Project file bisa diserahkan sebagai add-on, tapi asetnya menyesuaikan lisensi yang dipakai.
   EN: Adobe Premiere Pro and After Effects. The project file can be handed over as an add-on, though assets follow whatever licence they were sourced under.

5. **Pembayarannya gimana?** / **How does payment work?**
   ID: DP 50% di awal, sisanya sebelum file final tanpa watermark diserahkan. Retainer dibayar di awal bulan. Transfer bank atau e-wallet.
   EN: 50% up front, the balance before the clean final files are handed over. Retainers are billed at the start of the month. Bank transfer or e-wallet.

6. **Konten aku belum rilis. Aman?** / **My content is unreleased. Is it safe?**
   ID: Aman. Nggak ada footage klien yang dipublikasikan tanpa izin tertulis, dan NDA bisa ditandatangani kalau kamu butuh.
   EN: It is. No client footage is published without written permission, and an NDA can be signed if you need one.

7. **Musik dan stock footage-nya berlisensi?** / **Is the music and stock footage licensed?**
   ID: Semua dari library royalty-free yang aman buat monetisasi. Kalau kamu butuh trek komersial tertentu, lisensinya dibeli terpisah atas nama kamu.
   EN: Everything comes from royalty-free libraries that are safe for monetisation. If you need a specific commercial track, the licence is bought separately in your name.

8. **Bisa cuma ambil satu video dulu?** / **Can I start with just one video?**
   ID: Bisa. Paket CUT dan FEATURE dibayar per video, tanpa komitmen bulanan. Kalau cocok, baru naik ke retainer.
   EN: Yes. CUT and FEATURE are billed per video with no monthly commitment. Move to a retainer only once it clicks.

---

### 4.9 BRIEF FORM · `id="brief"`

Header — ID: `MULAI`, `Ceritain proyeknya.`, `Isi brief singkat ini. Formnya otomatis nyusun pesan — tinggal pilih mau dikirim lewat WhatsApp atau email.` / EN: `START`, `Tell me about the project.`, `Fill in this short brief. The form assembles the message for you — just pick WhatsApp or email to send it.`

Max-width 760. Fields in a `repeat(auto-fit, minmax(230px, 1fr))` grid, with the notes textarea full-width below. Every field label is a flex row: uppercase Manrope 10px label on the left, a lowercase `wajib`/`opsional` (`required`/`optional`) hint in `#333` on the right. Inputs are black-filled with a `#1a1a1a` border, `borderRadius: 0`, no focus glow — just swap the border to `#fff`.

| Field | Label ID / EN | Type | Placeholder ID / EN | Required |
|---|---|---|---|---|
| name | Nama / brand — Name / brand | text | Siapa yang aku ajak ngomong? / Who am I talking to? | **yes** |
| type | Tipe proyek / Project type | select | — | **yes** |
| qty | Jumlah video / Number of videos | text, numeric | contoh: 4 / e.g. 4 | no |
| dur | Perkiraan durasi hasil / Approximate final runtime | text | contoh: 60 detik / 12 menit — e.g. 60 seconds / 12 minutes | no |
| deadline | Deadline / Deadline | date | — | no |
| footage | Link footage / Footage link | text | Google Drive / WeTransfer / Dropbox | no |
| notes | Referensi & catatan / References & notes | textarea, 4 rows | Gaya edit yang kamu suka, mood, atau apa pun yang perlu aku tahu. / Edit styles you like, the mood, or anything else I should know. | no |

**Select options — ID:** Shortform (Reels / TikTok / Shorts) · Longform (YouTube) · Podcast clipping · Retainer bulanan · Belum yakin
**Select options — EN:** Shortform (Reels / TikTok / Shorts) · Longform (YouTube) · Podcast clipping · Monthly retainer · Not sure yet

Two submit buttons side by side: `Kirim via WhatsApp →` / `Send via WhatsApp →` (white outline, primary) and `Kirim via Email →` / `Send via Email →` (dim `#1a1a1a` outline, secondary). Below them, in `#3a3a3a` 10px: `Senin–Sabtu · 09.00–21.00 WIB` / `Mon–Sat · 09:00–21:00 WIB`.

Validation error text (`#c83232`, 12px, `role="alert"`): `Isi dulu nama dan tipe proyeknya.` / `Add your name and project type first.`

Form mechanics are in **§5.3**.

---

### 4.10 DIRECT CONTACT

Sits inside the brief section, separated by a top hairline and 26px of padding. A dim uppercase lead-in — `ATAU LANGSUNG AJA:` / `OR GO DIRECT:` — then three links in a wrapping flex row with `gap: clamp(16px,4vw,42px)`. Each link is a tiny `#3a3a3a` label above a silver value that goes white with an underline on hover.

| Label | Value | Target |
|---|---|---|
| `WHATSAPP` | `+62 822-2999-1807` | `https://wa.me/6282229991807?text=…` (pre-filled greeting) |
| `EMAIL` | `innosxnce@gmail.com` | `mailto:innosxnce@gmail.com` |
| `INSTAGRAM` | `@innosxnce1` | `https://www.instagram.com/innosxnce1/` |

---

# 5. INTERACTION SPECS

## 5.1 Header & keyboard navigation

Add a seventh nav item to the existing `NAV` array in `components/Header.tsx`: key `business`, href `/innoproductions`. Labels: **ID `BISNIS`**, **EN `BUSINESS`**. It appears in both the desktop row and the numbered mobile overlay. Verify the seven-item desktop row still fits at the `lg` breakpoint without wrapping — tighten the existing `gap: clamp(12px,2.2vw,28px)` if it does not.

Register `'7': '/innoproductions'` in the `KEY_MAP` of `components/KeyboardNav.tsx`, matching the existing 1–6 shortcuts.

## 5.2 Before/after comparison slider

The centrepiece. Build it as `components/BeforeAfter.tsx`.

**Structure.** A relatively-positioned box with `aspect-ratio: 9/16` or `16/9` depending on the item, `overflow: hidden`, `touchAction: 'none'`, `userSelect: 'none'`, 1px `#1a1a1a` border. The AFTER frame sits full-bleed underneath. The BEFORE frame is layered on top and clipped with `clipPath: inset(0 ${100 - pos}% 0 0)`. A 1px white vertical divider and a circular handle track `left: ${pos}%`.

**Interaction.**
- Pointer-down anywhere on the surface (primary button only) starts a drag and immediately jumps the divider to that x.
- `pointermove` / `pointerup` / `pointercancel` are bound to `window`, not the element, so a drag that leaves the frame keeps tracking and always releases cleanly.
- The handle is a real `role="slider"` with `tabIndex={0}`, `aria-valuemin/max/now`, and an `aria-label`. Arrow keys move it 2%, Shift+Arrow 10%, Home/End jump to the ends.
- Position is clamped 0–100 and guards against a zero-width bounding rect.

**Visuals — there is no real footage, so both frames are composed in CSS.** This is a design problem, not a placeholder problem: the two halves must make the value of editing obvious at a glance.

*BEFORE — an ungraded camera file.* Flat neutral-grey diagonal gradient with `filter: saturate(0.25) contrast(0.82) brightness(0.86)`. A soft, unlit blob shape as the unposed subject. A `● REC 00:00:00:00` camera OSD readout in the top-right at 50% white, and a filename `A001_C007.MP4` bottom-left at 35% white. Nothing else — no text, no captions, no shaping.

*AFTER — the finished cut.* Near-black cinematic gradient. A radial key light behind the subject. The same blob, now sculpted with a white-to-charcoal vertical gradient and a soft white glow so it separates from the background. A radial vignette. Then the editing work made visible: a burned-in Cinzel hook headline near the top (multi-line, heavy text-shadow), a white subtitle pill near the bottom (`SUBTITLE TER-SYNC` / `SYNCED SUBTITLES`), a 12-bar silver waveform below it standing in for sound design, and a thin 38%-filled progress bar along the very bottom edge.

Both corner tags (`MENTAH`/`HASIL`) are `pointerEvents: 'none'` so they never intercept a drag.

**Design the frames so real media can replace them later with a two-line change** — the mock frames must be isolated components slotted into the wrapper, not tangled into the slider logic.

## 5.3 Brief form → WhatsApp / mailto

**There is no backend, and none may be added.** The form composes its answers into a single formatted message and hands it off:

- WhatsApp: `https://wa.me/6282229991807?text=${encodeURIComponent(message)}` — number in international format, digits only, no `+` and no leading `0`.
- Email: `mailto:innosxnce@gmail.com?subject=${…}&body=${…}`.

**Message format** — a greeting line, a blank line, then `Label: value` rows. **Only non-empty fields are included**, so a half-filled brief still reads cleanly instead of being padded with blank labels. Labels come from the current language.

```
Halo InnoProductions, aku mau order edit video.

Nama / brand: Rizky
Tipe proyek: Shortform (Reels / TikTok / Shorts)
Jumlah video: 4
Deadline: 2026-08-15
Link footage: https://drive.google.com/...
```

EN greeting: `Hi InnoProductions, I would like to order a video edit.` Email subject: `Brief Proyek — InnoProductions` / `Project Brief — InnoProductions`.

Both buttons are `<a>` elements whose `href` is recomputed on every render from current state. An `onClick` guard calls `preventDefault()` and shows the error message when name or project type is empty.

Each pricing tier's CTA uses the same WhatsApp helper with a shorter message naming the package, e.g. `…\n\nPaket: FEATURE (Rp 1.5JT / video)`.

## 5.4 Scroll reveals

Wrap the Services and Process sections in `<ScrollPop>`. Leave Hero, spec strip, Work, Pricing, Add-ons, FAQ, and the form unwrapped — the first for immediacy, the rest because they are interactive.

---

# 6. RESPONSIVE

Design mobile-first; this audience is overwhelmingly on phones.

- **≤480px:** everything single-column. H1 lands near 42px. Pricing cards stack with the featured tier still visually distinct (its border and ribbon carry it — do not reorder it to the top). The three 9:16 comparison sliders stack full-width and remain comfortably draggable with a thumb; the 16:9 one is short and wide, which is correct. Add-on rows wrap so the price drops below the name rather than colliding. Form fields go full-width. Direct-contact links wrap to two rows.
- **481–1023px:** two-column grids where `minmax()` allows. Header shows the `MENU` overlay, not the nav row.
- **≥1024px:** full seven-item nav row. Three-column service and pricing grids. Content caps at 1100px.

Every fluid value uses `clamp()` — no fixed pixel breakpoint jumps for type or spacing.

---

# 7. ACCESSIBILITY

- Semantic landmarks: one `<main>`, `<section>` per block, a single `<h1>`, `<h2>` per section, `<h3>` on cards. No heading levels skipped.
- The comparison slider is fully keyboard-operable (see §5.2) and announces its value.
- FAQ toggles are `<button>` with `aria-expanded`.
- Every form input is wrapped in a `<label>`; the error message carries `role="alert"`.
- Text contrast: body `#9a9a9a` on `#000` passes AA. Never take supporting text below `#5a5a5a`, and never use `#3a3a3a` for anything a user must read.
- All external links carry `target="_blank" rel="noopener noreferrer"`; `mailto:` links do not.
- Honour `prefers-reduced-motion` — reveals and any animation resolve to their final state instantly.

---

# 8. FILES TO PRODUCE

| Path | Purpose |
|---|---|
| `app/innoproductions/page.tsx` | `'use client'` — the page, its section components, and card components |
| `app/innoproductions/layout.tsx` | Server component exporting `metadata` (title, description, OpenGraph) — needed because `page.tsx` is a client component and cannot export metadata itself |
| `components/BeforeAfter.tsx` | `'use client'` — comparison slider + the two mock frame components |
| `components/BriefForm.tsx` | `'use client'` — brief form and message composition |
| `lib/inno-productions.ts` | **All** structured data: contact config, `waLink`/`mailLink` helpers, stats, services, tiers, add-ons, process, work items, FAQ |
| `lib/types.ts` | *(edit)* add the interfaces for the above |
| `lib/copy.ts` | *(edit)* add `nav.business` and the `inno` copy block to **both** `COPY.id` and `COPY.en` |
| `components/Header.tsx` | *(edit)* add the nav entry |
| `components/KeyboardNav.tsx` | *(edit)* add the `7` shortcut |

**Architectural requirement:** every price, service name, FAQ entry, and contact detail must live in `lib/inno-productions.ts` with `{ id, en }` string pairs — matching the existing `lib/data.ts` convention. The page component reads data and renders it; it never hard-codes a number or a sentence. The owner must be able to change a price by editing one line in one file.

Put the contact details in a single exported `CONTACT` object at the very top of that file, commented as the one block to edit.

**Metadata:**
- Title: `InnoProductions — Jasa Edit Video | INNOSXNCE`
- Description ID: `Rumah produksi di balik INNOSXNCE. Jasa edit video shortform, longform, dan podcast clipping dengan harga transparan dan turnaround jelas.`
- OG title: `InnoProductions — Video Editing Studio`

---

# 9. DEFINITION OF DONE

- [ ] `npx tsc --noEmit` passes clean. Because copy is read as `COPY[lang]` where `lang` is `'id' | 'en'`, this also proves the two language objects are structurally identical — a missing key in either one is a type error.
- [ ] `npm run build` and `npm run lint` pass.
- [ ] Toggling ID ⇄ EN in the header swaps every string on the page, including select options, form placeholders, and the burned-in hook text inside the AFTER frames. Nothing is left hard-coded in one language.
- [ ] The comparison slider works with mouse, touch, and keyboard, and a drag released outside the frame does not leave it stuck.
- [ ] The WhatsApp and email buttons open with a correctly formatted, correctly encoded, pre-filled message — and blank fields are omitted from it.
- [ ] `#pricing` and `#brief` anchors land clear of the fixed header.
- [ ] No red anywhere except the form validation message.
- [ ] No `localStorage`, no new dependencies, no images, no API routes.
- [ ] The page renders correctly at 360px, 768px, and 1440px.
