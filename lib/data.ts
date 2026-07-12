import type { WallpaperItem, PackItem } from './types'

export const WP: WallpaperItem[] = [
  { slug: 'patience',    name: 'SABAR',    red: false, desc: { id: 'Diam bukan berarti kalah. Sabar itu strategi.',                 en: 'Silence is not defeat. Patience is the long game.' } },
  { slug: 'growth',     name: 'TUMBUH',   red: false, desc: { id: 'Tumbuh itu sepi dan pelan. Nikmatin prosesnya.',                en: 'Growth is quiet and slow. Trust the process.' } },
  { slug: 'exist',      name: 'ADA',      red: true,  desc: { id: 'Hadir aja udah setengah perjuangan. Muncul hari ini.',         en: 'Showing up is half the battle. Be here today.' } },
  { slug: 'bangkit',    name: 'BANGKIT',  red: false, desc: { id: 'Jatuh nggak masalah. Yang penting bangun lagi.',               en: 'Falling is fine. Getting back up is everything.' } },
  { slug: 'pride',      name: 'BANGGA',   red: false, desc: { id: 'Bangga sama progress kecil. Itu hak lo.',                     en: 'Be proud of small progress. You earned it.' } },
  { slug: 'resilience', name: 'TANGGUH',  red: false, desc: { id: 'Tahan banting bukan bawaan lahir. Itu dilatih.',              en: 'Resilience is not born. It is trained.' } },
  { slug: 'focus',      name: 'FOKUS',    red: true,  desc: { id: 'Satu hal, dikerjain sampai kelar. Sisanya nanti.',            en: 'One thing, done fully. The rest can wait.' } },
  { slug: 'consistency',name: 'KONSISTEN',red: false, desc: { id: 'Yang biasa, diulang terus, jadi luar biasa.',                en: 'Ordinary, repeated daily, becomes extraordinary.' } },
  { slug: 'discipline', name: 'DISIPLIN', red: false, desc: { id: 'Disiplin itu bebas. Lo nggak nunggu mood.',                  en: 'Discipline is freedom. You stop waiting for mood.' } },
  { slug: 'launch',     name: 'MELAJU',   red: false, desc: { id: 'Berhenti nyiapin. Mulai jalanin.',                           en: 'Stop preparing. Start moving.' } },
  { slug: 'waktu',      name: 'WAKTU',    red: false, desc: { id: 'Waktu lo jalan terus. Pakai sekarang.',                      en: 'Your time keeps moving. Spend it now.' } },
  { slug: 'mimpi',      name: 'MIMPI',    red: true,  desc: { id: 'Mimpi gede butuh kerja sunyi tiap hari.',                   en: 'Big dreams need quiet daily work.' } },
]

export const PACKS: PackItem[] = [
  {
    slug: 'edit-mastery',
    title: 'Edit Mastery',
    price: 'Rp 79K',
    lessonsN: 12,
    tier: { id: 'PEMULA', en: 'BEGINNER' },
    dur: { id: '2j 40m', en: '2h 40m' },
    desc: {
      id: 'Dasar dari nol. Cut, timing, sound, dan transisi yang bikin editan lo nggak keliatan kaku.',
      en: 'The fundamentals. Cuts, timing, sound and transitions that stop your edits looking stiff.',
    },
  },
  {
    slug: 'cinematic-edit',
    title: 'Cinematic Edit',
    price: 'Rp 149K',
    lessonsN: 18,
    tier: { id: 'MENENGAH', en: 'INTERMEDIATE' },
    dur: { id: '4j 15m', en: '4h 15m' },
    desc: {
      id: 'Color grade, motion, dan rasa sinematik. Bikin tiap klip kerasa kayak film pendek.',
      en: 'Color grade, motion and cinematic feel. Make every clip land like a short film.',
    },
  },
  {
    slug: 'the-method',
    title: 'The Method',
    price: 'Rp 299K',
    lessonsN: 30,
    tier: { id: 'LENGKAP', en: 'COMPLETE' },
    dur: { id: '9j+', en: '9h+' },
    desc: {
      id: 'Semuanya. Dari nol sampai bikin konten yang konsisten dan punya gaya sendiri.',
      en: 'Everything. From zero to a consistent style that is unmistakably yours.',
    },
  },
]
