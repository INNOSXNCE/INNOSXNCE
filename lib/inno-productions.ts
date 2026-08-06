import type {
  ServiceItem,
  TierItem,
  AddOnItem,
  ProcessStep,
  WorkItem,
  FaqItem,
} from './types'

/* ──────────────────────────────────────────────────────────────────────
   CONTACT — the only block you need to touch to change where leads land.
   `waNumber` must be in international format, digits only (no +, no 0).
   ────────────────────────────────────────────────────────────────────── */
export const CONTACT = {
  waNumber: '6282229991807',
  waDisplay: '+62 822-2999-1807',
  email: 'innosxnce@gmail.com',
  instagram: 'https://www.instagram.com/innosxnce1/',
  instagramHandle: '@innosxnce1',
  tiktok: 'https://tiktok.com/@innosxnce1',
  /** Shown on the contact block so clients know when to expect a reply. */
  hours: { id: 'Senin–Sabtu · 09.00–21.00 WIB', en: 'Mon–Sat · 09:00–21:00 WIB' },
} as const

export const waLink = (message: string) =>
  `https://wa.me/${CONTACT.waNumber}?text=${encodeURIComponent(message)}`

export const mailLink = (subject: string, body: string) =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

/* ── Trust strip ───────────────────────────────────────────────────── */
/* Deliberately specs, not vanity metrics — verifiable claims only. */
export const STATS: Array<{ n: string; l: { id: string; en: string } }> = [
  { n: '48 JAM', l: { id: 'DRAFT PERTAMA', en: 'FIRST DRAFT' } },
  { n: '4K', l: { id: 'RESOLUSI MAKS', en: 'MAX RESOLUTION' } },
  { n: '16:9', l: { id: 'FORMAT STANDAR', en: 'STANDARD FORMAT' } },
  { n: '2×', l: { id: 'REVISI MINIMUM', en: 'MINIMUM REVISIONS' } },
]

/* ── Services ──────────────────────────────────────────────────────── */
export const SERVICES: ServiceItem[] = [
  {
    slug: 'shortform',
    num: '01',
    ratio: '16:9',
    title: { id: 'Shortform', en: 'Shortform' },
    desc: {
      id: 'Reels, TikTok, dan Shorts yang nahan orang di tiga detik pertama. Retensi dulu, estetika belakangan.',
      en: 'Reels, TikTok and Shorts built to hold people through the first three seconds. Retention first, gloss second.',
    },
    includes: [
      { id: 'Hook editing 0–3 detik', en: 'Hook editing, 0–3 seconds' },
      { id: 'Subtitle bergaya (auto-sync)', en: 'Styled auto-synced subtitles' },
      { id: 'Sound design & SFX', en: 'Sound design & SFX' },
      { id: 'Pacing cepat, zero dead air', en: 'Fast pacing, zero dead air' },
      { id: 'Export 1920×1080 siap upload', en: '1920×1080 export, upload-ready' },
    ],
  },
  {
    slug: 'longform',
    num: '02',
    ratio: '16:9',
    title: { id: 'Longform', en: 'Longform' },
    desc: {
      id: 'Video YouTube yang punya alur. Bukan cuma potongan yang disambung, tapi cerita yang ditata.',
      en: 'YouTube videos with a spine. Not clips stitched together, but a story arranged.',
    },
    includes: [
      { id: 'Struktur naratif & pacing', en: 'Narrative structure & pacing' },
      { id: 'Penempatan b-roll', en: 'B-roll placement' },
      { id: 'Color grading', en: 'Color grading' },
      { id: 'Motion graphics dasar & lower third', en: 'Base motion graphics & lower thirds' },
      { id: 'Chapter marker & mixing audio', en: 'Chapter markers & audio mixing' },
    ],
  },
  {
    slug: 'podcast-clipping',
    num: '03',
    ratio: '16:9',
    title: { id: 'Podcast Clipping', en: 'Podcast Clipping' },
    desc: {
      id: 'Satu episode panjang dibedah jadi sepuluh klip. Satu rekaman, sebulan konten.',
      en: 'One long episode dissected into ten clips. One recording, a month of content.',
    },
    includes: [
      { id: 'Seleksi momen paling kuat', en: 'Selection of the strongest moments' },
      { id: '10 klip per episode', en: '10 clips per episode' },
      { id: 'Reframe otomatis ke 16:9', en: 'Auto-reframe to 16:9' },
      { id: 'Subtitle + speaker highlight', en: 'Subtitles + speaker highlight' },
      { id: 'Penamaan file siap jadwal', en: 'Scheduling-ready file naming' },
    ],
  },
]

/* ── Pricing ───────────────────────────────────────────────────────── */
/* Angka di bawah adalah proposal berdasarkan rate pasar Indonesia 2026,
   diposisikan di atas lantai marketplace (Rp99–150K) yang perang harga.
   Ubah `price` di sini dan seluruh halaman ikut berubah. */
export const TIERS: TierItem[] = [
  {
    slug: 'cut',
    name: 'CUT',
    price: 'Rp 299K',
    unit: { id: '/ video', en: '/ video' },
    tagline: {
      id: 'Satu video pendek, dikerjain sampai tajam.',
      en: 'One short video, cut until it is sharp.',
    },
    featured: false,
    features: [
      { id: 'Durasi hasil maks 90 detik', en: 'Final runtime up to 90 seconds' },
      { id: 'Format 16:9', en: '16:9 format' },
      { id: 'Subtitle bergaya + sound design', en: 'Styled subtitles + sound design' },
      { id: 'Footage mentah maks 20 menit', en: 'Raw footage up to 20 minutes' },
      { id: 'Export 1080p', en: '1080p export' },
    ],
    turnaround: { id: '2 hari kerja', en: '2 working days' },
    revisions: { id: '2× revisi', en: '2 revisions' },
  },
  {
    slug: 'feature',
    name: 'FEATURE',
    price: 'Rp 449K',
    unit: { id: '/ video', en: '/ video' },
    tagline: {
      id: 'Longform utuh, dari struktur sampai warna.',
      en: 'A full longform, from structure to color.',
    },
    featured: true,
    features: [
      { id: 'Durasi hasil 5–20 menit', en: 'Final runtime 5–20 minutes' },
      { id: 'Color grading & mixing audio', en: 'Color grading & audio mixing' },
      { id: 'Motion graphics + lower third', en: 'Motion graphics + lower thirds' },
      { id: 'Footage mentah maks 3 jam', en: 'Raw footage up to 3 hours' },
      { id: 'Bonus 1 thumbnail', en: 'One thumbnail included' },
      { id: 'Export sampai 4K', en: 'Export up to 4K' },
    ],
    turnaround: { id: '4–5 hari kerja', en: '4–5 working days' },
    revisions: { id: '3× revisi', en: '3 revisions' },
  },
  {
    slug: 'studio',
    name: 'STUDIO',
    price: 'Custom',
    tagline: {
      id: 'Editor tetap buat channel yang jalan tiap minggu.',
      en: 'A standing editor for a channel that ships weekly.',
    },
    featured: false,
    features: [
      { id: '12 shortform + 2 longform / bulan', en: '12 shortform + 2 longform / month' },
      { id: 'Podcast clipping termasuk', en: 'Podcast clipping included' },
      { id: 'Editor tetap & antrean prioritas', en: 'Dedicated editor & priority queue' },
      { id: 'Thumbnail untuk semua longform', en: 'Thumbnails for every longform' },
      { id: 'Kanal komunikasi langsung', en: 'Direct communication channel' },
      { id: 'Slot terbatas per bulan', en: 'Limited slots per month' },
    ],
    turnaround: { id: '24–48 jam / aset', en: '24–48 hours / asset' },
    revisions: { id: 'Revisi wajar tanpa batas', en: 'Unlimited fair revisions' },
  },
]

export const ADDONS: AddOnItem[] = [
  {
    slug: 'thumbnail',
    name: { id: 'Desain thumbnail', en: 'Thumbnail design' },
    price: 'Rp 150K',
    note: { id: 'per desain, 2× revisi', en: 'per design, 2 revisions' },
  },
  {
    slug: 'motion',
    name: { id: 'Motion graphics lanjutan', en: 'Advanced motion graphics' },
    price: 'Rp 300K',
    note: { id: 'per video, animasi kustom', en: 'per video, custom animation' },
  },
  {
    slug: 'subtitle',
    name: { id: 'Subtitle dua bahasa (ID + EN)', en: 'Bilingual subtitles (ID + EN)' },
    price: 'Rp 100K',
    note: { id: 'per video, sudah diproofread', en: 'per video, proofread' },
  },
  {
    slug: 'grading',
    name: { id: 'Color grading kustom', en: 'Custom color grading' },
    price: 'Rp 250K',
    note: { id: 'per video, LUT khusus', en: 'per video, bespoke LUT' },
  },
  {
    slug: 'clipping',
    name: { id: 'Podcast clipping batch', en: 'Podcast clipping batch' },
    price: 'Rp 2.5JT',
    note: { id: '1 episode → 10 klip', en: '1 episode → 10 clips' },
  },
  {
    slug: 'express',
    name: { id: 'Express 24 jam', en: '24-hour express' },
    price: '+50%',
    note: { id: 'dari harga paket, sesuai slot', en: 'on package price, subject to slots' },
  },
]

/* ── Process ───────────────────────────────────────────────────────── */
export const PROCESS: ProcessStep[] = [
  {
    num: '01',
    title: { id: 'Brief', en: 'Brief' },
    desc: {
      id: 'Isi form di bawah atau chat langsung. Kirim footage lewat Drive atau WeTransfer, plus 1–2 referensi gaya yang kamu suka.',
      en: 'Fill the form below or message directly. Send footage via Drive or WeTransfer, plus one or two style references you like.',
    },
  },
  {
    num: '02',
    title: { id: 'Kesepakatan', en: 'Agreement' },
    desc: {
      id: 'Kamu dapat penawaran, timeline, dan lingkup kerja yang jelas. Kerja dimulai setelah DP 50%.',
      en: 'You get a quote, a timeline and a clear scope. Work starts once the 50% deposit lands.',
    },
  },
  {
    num: '03',
    title: { id: 'Draft & Revisi', en: 'Draft & Revisions' },
    desc: {
      id: 'Draft pertama dikirim sesuai paket. Catatan revisi ditulis pakai timestamp, biar nggak ada yang meleset.',
      en: 'The first draft arrives on schedule. Revision notes come with timestamps so nothing gets lost.',
    },
  },
  {
    num: '04',
    title: { id: 'Delivery', en: 'Delivery' },
    desc: {
      id: 'File final dikirim siap upload, dalam semua rasio yang kamu butuh. Pelunasan sebelum file bersih diserahkan.',
      en: 'Final files land upload-ready, in every ratio you need. Balance is settled before the clean files are handed over.',
    },
  },
]

/* ── Work / before–after showcase ──────────────────────────────────── */
/* Tambahkan `href` kalau videonya sudah publik, kartunya otomatis jadi link. */
export const WORK: WorkItem[] = [
  {
    slug: 'hook-retention',
    title: { id: 'Hook & Retensi', en: 'Hook & Retention' },
    category: { id: 'SHORTFORM · 16:9', en: 'SHORTFORM · 16:9' },
    ratio: '16:9',
    hook: { id: 'JANGAN\nSKIP\nDULU', en: 'DO NOT\nSKIP\nTHIS' },
  },
  {
    slug: 'narrative-cut',
    title: { id: 'Potongan Naratif', en: 'Narrative Cut' },
    category: { id: 'LONGFORM · 16:9', en: 'LONGFORM · 16:9' },
    ratio: '16:9',
    hook: { id: 'BAB 01 — AWAL', en: 'CHAPTER 01 — THE START' },
  },
  {
    slug: 'clip-extraction',
    title: { id: 'Ekstraksi Klip', en: 'Clip Extraction' },
    category: { id: 'PODCAST · 16:9', en: 'PODCAST · 16:9' },
    ratio: '16:9',
    hook: { id: 'BAGIAN\nINI YANG\nPENTING', en: 'THIS IS\nTHE PART\nTHAT MATTERS' },
  },
]

/* ── FAQ ───────────────────────────────────────────────────────────── */
export const FAQ: FaqItem[] = [
  {
    q: { id: 'Gimana cara kirim footage-nya?', en: 'How do I send my footage?' },
    a: {
      id: 'Google Drive, WeTransfer, atau Dropbox. Cukup kirim satu link yang bisa diakses, jangan dikompres dulu. Makin mentah, makin bagus hasil gradingnya.',
      en: 'Google Drive, WeTransfer or Dropbox. One accessible link is enough, and please do not pre-compress it. The rawer the file, the better the grade.',
    },
  },
  {
    q: { id: 'Berapa lama pengerjaannya?', en: 'How long does it take?' },
    a: {
      id: 'Shortform 2 hari kerja, longform 4–5 hari kerja, klien retainer 24–48 jam per aset. Hitungan dimulai setelah footage lengkap dan DP masuk, bukan sejak chat pertama.',
      en: 'Shortform takes 2 working days, longform 4–5, retainer clients 24–48 hours per asset. The clock starts when the footage is complete and the deposit is in, not at first message.',
    },
  },
  {
    q: { id: 'Kalau hasilnya belum sesuai?', en: 'What if the result misses the mark?' },
    a: {
      id: 'Setiap paket punya kuota revisi. Catatan revisi ditulis pakai timestamp dan dikirim sekaligus, biar satu putaran revisi beres dalam sekali kerja. Di luar kuota, ada biaya tambahan per putaran.',
      en: 'Every package includes a revision quota. Notes come with timestamps and arrive in one batch, so a round is closed in a single pass. Beyond the quota, extra rounds are billed.',
    },
  },
  {
    q: { id: 'Pakai software apa? Bisa minta project file?', en: 'What software do you use? Can I get the project file?' },
    a: {
      id: 'Adobe Premiere Pro dan After Effects. Project file bisa diserahkan sebagai add-on, tapi asetnya menyesuaikan lisensi yang dipakai.',
      en: 'Adobe Premiere Pro and After Effects. The project file can be handed over as an add-on, though assets follow whatever licence they were sourced under.',
    },
  },
  {
    q: { id: 'Pembayarannya gimana?', en: 'How does payment work?' },
    a: {
      id: 'DP 50% di awal, sisanya sebelum file final tanpa watermark diserahkan. Retainer dibayar di awal bulan. Transfer bank atau e-wallet.',
      en: '50% up front, the balance before the clean final files are handed over. Retainers are billed at the start of the month. Bank transfer or e-wallet.',
    },
  },
  {
    q: { id: 'Konten aku belum rilis. Aman?', en: 'My content is unreleased. Is it safe?' },
    a: {
      id: 'Aman. Nggak ada footage klien yang dipublikasikan tanpa izin tertulis, dan NDA bisa ditandatangani kalau kamu butuh.',
      en: 'It is. No client footage is published without written permission, and an NDA can be signed if you need one.',
    },
  },
  {
    q: { id: 'Musik dan stock footage-nya berlisensi?', en: 'Is the music and stock footage licensed?' },
    a: {
      id: 'Semua dari library royalty-free yang aman buat monetisasi. Kalau kamu butuh trek komersial tertentu, lisensinya dibeli terpisah atas nama kamu.',
      en: 'Everything comes from royalty-free libraries that are safe for monetisation. If you need a specific commercial track, the licence is bought separately in your name.',
    },
  },
  {
    q: { id: 'Bisa cuma ambil satu video dulu?', en: 'Can I start with just one video?' },
    a: {
      id: 'Bisa. Paket CUT dan FEATURE dibayar per video, tanpa komitmen bulanan. Kalau cocok, baru naik ke retainer.',
      en: 'Yes. CUT and FEATURE are billed per video with no monthly commitment. Move to a retainer only once it clicks.',
    },
  },
]
