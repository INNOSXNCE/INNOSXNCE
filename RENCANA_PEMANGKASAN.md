# Rencana Pemangkasan & Perbaikan — INNOSXNCE

**Status:** rencana, belum ada kode yang disentuh.
**Tujuan website yang disepakati:** jualan produk digital (wallpaper + kelas edit).
**Di luar cakupan:** `/innoproductions` dan semua file terkait — diabaikan sepenuhnya, dihitung seolah tidak ada.

---

## Diagnosis singkat

Masalahnya bukan "terlalu banyak fitur". Masalahnya **website ini nggak pernah milih apa yang paling penting.**

Nav punya 6 item dengan bobot visual identik. Homepage berakhir di CTA Discord, padahal yang menghasilkan uang ada di Wallpaper dan Kelas. Manifesto ngulang isi section `1%`. Journal isinya angka karangan. Hasilnya: pengunjung datang, scroll, lalu nggak tahu harus ngapain.

Setelah tujuan ditetapkan sebagai **jualan**, tiap halaman bisa dinilai dengan satu pertanyaan: *ini mendekatkan orang ke checkout, atau menjauhkan?* Semua keputusan di bawah keluar dari pertanyaan itu.

**Estetikanya tidak diganggu.** Cinzel/Manrope/Cormorant, hairline `#1a1a1a`, merah `#c83232` yang dipakai irit, framing produksi film (REC · DAY 437, timecode, REEL 01/A) — itu kekuatan website ini dan tetap utuh. Yang dibongkar strukturnya.

---

## BAGIAN A — Pemangkasan

### A1. Hapus halaman Manifesto, lebur ke homepage

**Kenapa:** `COPY.manifesto.body` dan `COPY.onePctBody` menyampaikan gagasan yang sama persis — satu persen sehari, konsistensi ngalahin bakat. Pengunjung membaca argumen yang sama dua kali di dua tempat.

**Yang dikerjakan:**

| Aksi | Lokasi |
|---|---|
| Hapus folder | `app/manifesto/` |
| Hapus blok `manifesto` (id + en) | `lib/copy.ts` |
| Hapus `nav.manifesto` (id + en) | `lib/copy.ts` |
| Hapus entri NAV | `components/Header.tsx` |
| Hapus shortcut `'2'` | `components/KeyboardNav.tsx` |
| Hapus komponen `PullQuote` | ikut terhapus bersama halaman |

**Yang diselamatkan:** satu baris terkuat dari manifesto dipindah ke section `1%` di homepage sebagai penutup, menggantikan `onePctSub` yang sekarang cuma statistik kering:

- Sekarang: `1% setiap hari = 37x lebih baik dalam setahun.`
- Usulan: tetap tampilkan angka itu, **tambah** satu baris Cinzel di bawahnya — `Konsistensi ngalahin bakat yang nggak pernah muncul.` / `Consistency beats talent that never shows up.`

Jadi gagasan brand tetap hidup dalam satu layar, bukan satu halaman penuh yang harus diklik.

---

### A2. Hapus halaman Journal

**Kenapa:** tiga kartu video hardcoded dengan view count karangan (`1.2M`, `890K`, `2.4M`), thumbnail kosong berisi ikon ▶, dan **ketiganya membuka URL yang sama** — profil TikTok. Ini bukan cuma nggak berguna, ini merusak kepercayaan: pengunjung yang klik dua kartu berbeda dan mendarat di tempat yang sama akan menyimpulkan sisa website ini juga palsu. Di halaman yang tujuannya jualan, itu mahal.

**Yang dikerjakan:**

| Aksi | Lokasi |
|---|---|
| Hapus folder | `app/journal/` |
| Hapus blok `journal` (id + en) | `lib/copy.ts` |
| Hapus `nav.journal` (id + en) | `lib/copy.ts` |
| Hapus entri NAV | `components/Header.tsx` |
| Hapus shortcut `'6'` | `components/KeyboardNav.tsx` |
| Tambah `TIKTOK` ke daftar SOCIALS | `components/Footer.tsx` — **sudah ada**, tidak perlu diubah |

TikTok sudah tercantum di footer. Jadi menghapus halaman ini tidak menghilangkan akses ke TikTok sama sekali — cuma menghilangkan versi palsunya.

> **Kalau nanti mau balik:** halaman ini layak dihidupkan lagi *hanya* kalau kontennya embed TikTok asli lewat `blockquote.tiktok-embed` + script resmi mereka, dengan view count yang benar. Jangan dibangun ulang pakai data statis.

---

### A3. Hapus dua interstitial di homepage

**Kenapa:** section `Growth.` dan `Bangkit.` masing-masing `minHeight: 54vh` dan hanya berisi satu kata plus satu subtitle. Gabungan keduanya ≈ **108vh scroll tanpa satu pun informasi baru atau jalan menuju checkout.** Di tengah corong penjualan, itu dua kali tinggi layar yang memisahkan orang dari produk.

**Yang dikerjakan:**

| Aksi | Lokasi |
|---|---|
| Hapus 2 pemanggilan `<Interstitial>` | `app/page.tsx` baris ~225 dan ~256 |
| Hapus komponen `Interstitial` | `app/page.tsx` |
| Hapus `interOneSub` & `interTwoSub` (id + en) | `lib/copy.ts` |

---

### A4. Turunkan Komunitas dari nav utama ke footer

**Kenapa:** dengan tujuan jualan, nav utama harus jadi jalur uang. Discord itu retensi, bukan konversi — dan homepage sudah punya section Discord penuh dengan CTA sendiri.

**Yang dikerjakan:**

| Aksi | Lokasi |
|---|---|
| Hapus entri NAV `community` | `components/Header.tsx` |
| Hapus shortcut `'5'` | `components/KeyboardNav.tsx` |
| Tambah link internal `KOMUNITAS` / `COMMUNITY` → `/community` | `components/Footer.tsx` |

**Halaman `/community` TIDAK dihapus.** Isinya tetap, cuma pintu masuknya pindah. Orang tetap sampai ke sana lewat section Discord di homepage dan lewat footer.

Catatan teknis: link footer sekarang semuanya `<a href>` eksternal. Link internal baru ini harus pakai `startFlash('/community')` dari `usePageFlash()` supaya transisinya konsisten dengan nav — artinya `Footer.tsx` perlu jadi konsumen context itu (dia sudah `'use client'`, jadi aman).

---

### A5. Hasil akhir struktur

| Sebelum | Sesudah |
|---|---|
| **Nav:** Beranda · Manifesto · Wallpaper · Kelas · Komunitas · Tonton | **Nav:** Beranda · Wallpaper · Kelas |
| **Halaman:** 6 | **Halaman:** 4 (3 di nav + `/community` via footer) |
| **Section homepage:** 7 | **Section homepage:** 5 |
| **Shortcut keyboard:** 1–6 | **Shortcut keyboard:** 1–3 |

Homepage jadi: **Hero → 1% (+ baris manifesto) → Wallpaper pilihan → Kelas → Discord.** Dua blok jualan berdiri berdampingan tanpa disela apa pun.

---

## BAGIAN B — Perbaikan usability

Sesuai keputusan: *benerin yang bikin bingung, vibe tetap jalan.*

### B1. Kembalikan sinyal "ini bisa diklik" — prioritas tertinggi

Di `app/globals.css` ada:

```css
a, span, div, button { cursor: inherit; }
```

Efeknya: **tidak ada satu pun elemen di seluruh website yang berubah kursornya saat di-hover.** Tombol beli, kartu produk, item nav — semuanya terasa sama seperti latar belakang kosong. Di website yang menjual sesuatu, ini menghapus satu-satunya isyarat universal bahwa sesuatu bisa ditekan.

**Usulan:** pertahankan kursor kustom sebagai kursor default `body` (itu ciri khasnya), tapi ganti aturan di atas jadi:

```css
/* elemen non-interaktif ikut kursor kustom */
span, div { cursor: inherit; }

/* elemen interaktif dapat isyarat, tetap pakai varian kustom */
a, button, [role="button"], [role="slider"], label, select, input, textarea {
  cursor: url("...dot-ring-with-outer-highlight...") 7 7, pointer;
}
```

Kuncinya `, pointer` di akhir — kalau SVG kustom gagal dimuat, browser jatuh ke pointer biasa, bukan ke default. Buat satu varian SVG kedua (lingkaran luar jadi putih penuh, bukan 40% opacity) supaya perubahannya terasa tanpa merusak gaya.

### B2. Munculkan lagi scrollbar tipis

Sekarang:

```css
::-webkit-scrollbar { width: 0; height: 0; }
```

Di halaman dengan hero scroll sepanjang `280vh`, ini menghilangkan satu-satunya petunjuk seberapa panjang halamannya. Orang nggak tahu apakah sisa 10% atau 90%.

**Usulan:** scrollbar 6px, track transparan, thumb `#1a1a1a` yang jadi `#333` saat hover. Nyaris tak terlihat di latar hitam, tapi posisinya terbaca.

### B3. Pendekkan hero scroll dari 280vh → 160vh

`SPACER_VH = 280` di `components/ScrollHero.tsx`. Artinya pengunjung harus scroll hampir **tiga layar penuh** sebelum kata ketiga (`CONSISTENCY.`) selesai muncul dan halaman benar-benar mulai. Di HP, itu banyak sekali gerakan jempol sebelum melihat satu produk pun.

**Usulan:** turunkan ke `160`. Animasi reveal-nya tetap utuh dan tetap terasa sinematik, cuma jaraknya masuk akal. Angka ini satu konstanta — gampang di-tune, gampang dibalikin.

> Ini satu-satunya perubahan di area "vibe". Kalau setelah dicoba terasa terlalu cepat, naikkan ke 200. Tapi 280 terlalu jauh untuk halaman yang tujuannya menjual.

### B4. Perbaiki `<html lang>` yang tidak ikut toggle bahasa

`app/layout.tsx` menetapkan `<html lang="id">` secara statis, sementara `LangProvider` bisa ganti ke `en`. Screen reader akan membaca teks Inggris dengan pelafalan Indonesia, dan Google salah menandai bahasa halaman.

**Usulan:** di `LangProvider`, sinkronkan `document.documentElement.lang` setiap kali `lang` berubah lewat `useEffect`. Tiga baris.

### B5. Simpan pilihan bahasa

`useState<Lang>('id')` — setiap reload, pengunjung berbahasa Inggris balik ke Indonesia. Simpan di `localStorage`, baca saat mount dengan penanganan hidrasi yang benar (render `'id'` di server, baru sesuaikan setelah mount) supaya tidak kena hydration mismatch.

---

## BAGIAN C — Perbaikan jalur jualan

Ini bagian yang tidak kamu minta, tapi paling berdampak sekarang setelah tujuannya ditetapkan sebagai jualan. **Rekomendasiku: C1 dikerjakan bareng Bagian A. Sisanya bisa menyusul.**

### C1. Tombol beli harus `<a href>`, bukan `onClick` + `window.open()` ⚠️

Ini cacat paling mahal di website ini.

`WallpaperCard` dan `PackCard` adalah `<div onClick={...}>` yang memanggil `window.open('https://lynk.id/innosxnce/...')`. Akibatnya:

- **Middle-click mati.** Buka-di-tab-baru mati. Ctrl/Cmd+klik mati.
- **Keyboard mati total** — tidak ada `tabIndex`, tidak ada `role`, tidak bisa di-Enter.
- **Google tidak melihat satu pun link produk.** Tidak ada `<a href>` = tidak ada jalur yang bisa dirayapi ke katalog Lynk.id kamu.
- **Sebagian browser mobile memblokir `window.open()`** kalau tidak terdeteksi sebagai gestur langsung pengguna. Klik yang gagal diam-diam, tanpa pesan error.

**Usulan:** ubah elemen terluar kedua kartu jadi `<a href={...} target="_blank" rel="noopener noreferrer">` dengan `display: block` dan `textDecoration: 'none'`. Prop `onBuy` / `onTake` diganti prop `href`. Semua styling tetap sama persis — nol perubahan visual, tapi kartunya jadi link sungguhan.

Karena tujuan website ini jualan, **ini satu-satunya item di dokumen ini yang aku sarankan tidak ditunda.**

### C2. Pindahkan harga wallpaper ke data

Sekarang harga `'Rp 9K'` ditulis hardcode di `app/page.tsx` baris 214, dan **halaman `/wallpapers` sendiri tidak menampilkan harga sama sekali** — di sana kolom itu diisi deskripsi. Jadi homepage nunjukin harga, halaman produk nggak.

**Usulan:** tambah field `price` ke `WallpaperItem` di `lib/types.ts` dan ke setiap entri `WP` di `lib/data.ts`. Tampilkan di dua tempat. Toko yang menyembunyikan harga di halaman produknya sendiri kehilangan penjualan.

### C3. Metadata per halaman + sitemap

Cuma `app/layout.tsx` yang punya `metadata`. Semua halaman lain adalah client component, jadi tidak bisa mengekspor metadata sendiri — hasilnya `/wallpapers` dan `/tutorials` muncul di Google dengan judul dan deskripsi yang sama persis dengan homepage.

**Usulan:** tambah `layout.tsx` tipis (server component) di tiap folder route yang isinya cuma `export const metadata`. Sekalian `app/sitemap.ts` dan `app/robots.ts` — masing-masing ~10 baris, dan Next.js menanganinya otomatis.

### C4. Transisi halaman menunda tiap klik ~260ms

`page-flash-context.tsx` menunggu `setTimeout(120)` sebelum `router.push`, lalu `setTimeout(140)` lagi untuk melepas overlay. Setiap navigasi jadi terasa berat sekitar seperempat detik. Ditambah karena pakai `router.push` dan bukan `<Link>`, Next.js **tidak bisa prefetch halaman tujuan** — jadi delay buatan itu ditumpuk di atas waktu muat yang sebenarnya.

**Usulan (opsional, sentuhan paling dalam di dokumen ini):** turunkan delay pertama ke 60ms, dan bungkus tombol nav dengan `<Link prefetch>` yang `onClick`-nya menjalankan flash lalu `router.push`. Ini mengembalikan prefetch tanpa membuang efek flash-nya.

---

## BAGIAN D — Temuan lain (belum masuk rencana kerja)

Butuh keputusan kamu dulu, atau di luar cakupan pemangkasan:

1. **⚠️ Angka di halaman Komunitas kemungkinan karangan.** `12.4K MEMBER`, `2.1K AKTIF / HARI`. Kalau ini bukan angka Discord yang sebenarnya, harus diganti atau dihapus — bukan cuma soal etika, tapi karena pengunjung yang gabung Discord lalu lihat member-nya jauh lebih sedikit akan langsung meragukan harga produkmu juga. **Tolong konfirmasi.**

2. **`DevicePreview` tidak pernah muncul di HP.** Komponen ini cuma tampil saat `onMouseEnter` — perangkat sentuh tidak punya hover. Padahal audiens TikTok mayoritas mobile, jadi fitur paling menarik di halaman wallpaper tidak pernah dilihat oleh sebagian besar pengunjung. Perlu keputusan terpisah: bikin versi mobile (tap untuk buka preview), atau terima sebagai bonus desktop saja.

3. **`lib/scroll-pop.test.ts` tidak pernah dijalankan** — tidak ada script `test` di `package.json` dan tidak ada test runner terpasang. Entah pasang Vitest, atau hapus filenya biar tidak menyesatkan.

4. **`.next.zip` (151 MB) ada di root dan tidak masuk `.gitignore`.** Belum ter-commit ke git, tapi sekali `git add .` dilakukan tanpa sadar, repo-nya membengkak permanen. Tambahkan `*.zip` ke `.gitignore`.

5. **`Lombakita_Brandbook_v1.pdf` (5 MB) di root** — sepertinya tidak berkaitan dengan proyek ini.

---

## Urutan eksekusi yang disarankan

| # | Langkah | Risiko | Bisa dibalik? |
|---|---|---|---|
| 1 | A3 — hapus interstitial | nol | ya, sepele |
| 2 | A2 — hapus Journal | nol | ya |
| 3 | A1 — hapus Manifesto + lebur satu baris | rendah | ya |
| 4 | A4 — Komunitas turun ke footer | rendah | ya |
| 5 | **C1 — kartu jadi `<a href>`** | rendah | ya |
| 6 | B1 + B2 — kursor & scrollbar | rendah | ya |
| 7 | B3 — hero 280 → 160 | nol (satu konstanta) | ya |
| 8 | B4 + B5 — `html lang` & simpan bahasa | rendah | ya |
| 9 | C2 + C3 — harga di data, metadata, sitemap | sedang (sentuh tipe data) | ya |
| 10 | C4 — transisi & prefetch | sedang | ya |

Langkah 1–8 semuanya penghapusan atau perubahan satu-dua baris — aman dikerjakan sekaligus. Setelah itu `npx tsc --noEmit` akan langsung menangkap sisa referensi ke `manifesto` / `journal` yang terlewat, karena `COPY` dibaca sebagai `COPY[lang]` dan strukturnya diperiksa TypeScript.

**Verifikasi setelah selesai:** `npx tsc --noEmit` → `npm run lint` → `npm run build`, lalu cek manual toggle ID/EN di tiap halaman yang tersisa dan pastikan tombol beli membuka Lynk.id di tab baru.

---

## Yang sengaja TIDAK diubah

- Seluruh bahasa visual — font, warna, hairline, framing produksi film.
- Hero scroll-scrub (cuma diperpendek, tidak dibuang).
- `SpaceBackdrop`, `NoiseOverlay`, efek page-flash.
- Halaman `/community`, `/wallpapers`, `/tutorials` — isinya utuh.
- Preview produk di homepage — dengan tujuan jualan, ini corong, bukan duplikasi.
- Kursor kustom sebagai identitas — cuma ditambah isyarat di elemen interaktif.
- `/innoproductions` dan semua file terkait — di luar cakupan.
