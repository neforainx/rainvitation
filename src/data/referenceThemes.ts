import { ThemeConfig } from '../types';

export const REFERENCE_CANVA_THEMES: ThemeConfig[] = [
  // 1. Framer Cinematic Mood (Elian & Rose)
  {
    id: 'ref-framer-elian-rose',
    layoutArchetype: 'framer-cinematic',
    name: 'Elian & Rose Cinematic Mood',
    category: 'luxury',
    regionOrStyle: 'viding',
    tagline: 'The Wedding of Elian & Rose — Cinematic Golden Hour & Editorial Serifs',
    badge: 'FRAMER TRENDING ⭐',
    isPremium: true,
    price: 150000,
    originalPrice: 250000,
    description: 'Desain ultra-modern ala template Framer dengan visual golden hour romantis, monogram mawar emas E&R, dan tipografi editorial berukuran besar.',
    filosofi: {
      quote: 'Two souls with but a single thought, two hearts that beat as one.',
      source: 'John Keats',
      meaning: 'Kisah cinta yang terabadikan dalam keabadian sinematik, bersatu dalam harmoni dan keanggunan abadi.'
    },
    accentColor: '#F59E0B',
    primaryColor: '#F8FAFC',
    secondaryColor: '#1E293B',
    bgGradient: 'from-[#0A0E17] via-[#111827] to-[#050810]',
    glassCardBg: 'bg-black/60',
    glassBorder: 'border-white/20',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'rose-crest',
    previewImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    ornamentStyle: 'luxury-damask',
    culturalAnimationType: 'damask-glow',
    premiumFeatures: [
      'Top Navigation Bar Khusus (Venue, Schedule, FAQ, Dress Code, RSVP)',
      'Hero Cinematic Full-Bleed Overlay dengan Golden Glow',
      'Monogram Crest E&R Eksklusif Beranimasi',
      'Live Feed Hari-H & Google Drive Momen',
      'Integrasi Musik Spotify Langsung'
    ],
    sampleMusic: {
      title: 'A Thousand Years - Cinematic Piano & Cello',
      genre: 'Cinematic Orchestral',
      type: 'synth-strings'
    }
  },

  // 2. White Leaves & Meadow Grass (Anna & Evans)
  {
    id: 'ref-meadow-anna-evans',
    layoutArchetype: 'white-meadow-script',
    name: 'Anna & Evans White Meadow',
    category: 'modern',
    regionOrStyle: 'botanical',
    tagline: 'Fresh Meadow Romance & Floating Date Plaque with Line Florals',
    badge: 'BOTANICAL CHIC',
    isPremium: false,
    price: 75000,
    originalPrice: 125000,
    description: 'Padang rumput hijau segar dengan tulisan nama mempelai cursive putih melengkung anggun, kartu tanggal floating bersih, dan ornamen daun garis hijau.',
    filosofi: {
      quote: 'Where you go I will go, and where you stay I will stay.',
      source: 'Ruth 1:16',
      meaning: 'Ketulusan melangkah bersama bergandengan tangan menatap masa depan yang cerah dan penuh berkah.'
    },
    accentColor: '#65A30D',
    primaryColor: '#1E3A18',
    secondaryColor: '#F7FEE7',
    bgGradient: 'from-[#F8FCF3] via-[#EFF8E7] to-[#E2F2D5]',
    glassCardBg: 'bg-white/90',
    glassBorder: 'border-lime-700/20',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'meadow-leaf',
    previewImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    ornamentStyle: 'modern-leaves',
    culturalAnimationType: 'botanical-sway',
    sampleMusic: {
      title: 'Summer Breeze Meadow - Acoustic Guitar & Whistle',
      genre: 'Acoustic Folk Romance',
      type: 'synth-acoustic'
    }
  },

  // 3. Navy Sketch Poppy & Textured Paper (Jonathan & Juliana)
  {
    id: 'ref-poppy-jonathan-juliana',
    layoutArchetype: 'navy-sketch-poppy',
    name: 'Jonathan & Juliana Navy Poppy',
    category: 'modern',
    regionOrStyle: 'navy',
    tagline: 'Textured Watercolor Paper & Fine Line-Art Botanical Poppies',
    badge: 'CANVA BESTSELLER',
    isPremium: false,
    price: 75000,
    originalPrice: 125000,
    description: 'Kertas linen bertekstur watercolor dengan frame garis geometris offset, ilustrasi sketsa bunga poppy biru navy, dan kaligrafi modern Jonathan + Juliana.',
    filosofi: {
      quote: 'You are my sun, my moon, and all my stars.',
      source: 'E.E. Cummings',
      meaning: 'Keindahan cinta abadi yang tertuang dalam goresan tinta biru nan tenang dan bersahaja.'
    },
    accentColor: '#1E3A8A',
    primaryColor: '#0F172A',
    secondaryColor: '#EFF6FF',
    bgGradient: 'from-[#FAF8F5] via-[#F3EFE8] to-[#E8E2D5]',
    glassCardBg: 'bg-white/85',
    glassBorder: 'border-slate-300',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'poppy-sketch',
    previewImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85',
    ornamentStyle: 'rustic-floral',
    culturalAnimationType: 'botanical-sway',
    sampleMusic: {
      title: 'Clair de Lune - Navy Piano Solo',
      genre: 'Classical Piano',
      type: 'synth-piano'
    }
  },

  // 4. Botanical Bismillah Gardenia (Daniel & Marceline)
  {
    id: 'ref-bismillah-daniel-marceline',
    layoutArchetype: 'bismillah-botanical-watercolor',
    name: 'Daniel & Marceline Gardenia Islamic',
    category: 'adat',
    regionOrStyle: 'islamic',
    tagline: 'Bismillah Calligraphy & Soft Painted Gardenia Blossom Wreath',
    badge: 'ISLAMIC FLORAL ⭐',
    isPremium: true,
    price: 150000,
    originalPrice: 250000,
    description: 'Lafadz Basmalah suci di pucuk undangan berhiaskan lukisan cat air bunga gardenia putih dan dedaunan zaitun, dengan divider tanggal emas vertikal.',
    filosofi: {
      quote: 'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri agar kamu merasa tenteram.',
      source: 'QS. Ar-Rum: 21',
      meaning: 'Menjadikan pernikahan sebagai ibadah agung yang berakar pada ketenangan sakinah, mawaddah, dan rahmah.'
    },
    accentColor: '#D97706',
    primaryColor: '#166534',
    secondaryColor: '#FEFCE8',
    bgGradient: 'from-[#FDFCF7] via-[#F8F5EC] to-[#EFE8D8]',
    glassCardBg: 'bg-white/90',
    glassBorder: 'border-amber-600/30',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'gardenia-wreath',
    previewImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    ornamentStyle: 'islamic-arabesque',
    culturalAnimationType: 'gonjong-sparkle',
    premiumFeatures: [
      'Kaligrafi Basmalah & Doa Pengantin Beranimasi',
      'Border Lukisan Bunga Gardenia Cat Air di Keempat Sudut',
      'Balok Tanggal Emas Beraksen Pilar',
      'Buku Tamu RSVP Syar\'i & Live Feed Foto Hari-H'
    ],
    sampleMusic: {
      title: 'Bismillah Cinta - Syahdu Instrumental Strings',
      genre: 'Islamic Strings',
      type: 'synth-strings'
    }
  },

  // 5. French Arch & Olive Monogram (Greta & Morgan)
  {
    id: 'ref-french-arch-greta-morgan',
    layoutArchetype: 'french-arch-monogram',
    name: 'Greta & Morgan French Arch',
    category: 'modern',
    regionOrStyle: 'minimalist',
    tagline: 'Fine Line-Drawn Arched Trellis & Olive Leaf Monogram',
    badge: 'ETSY MINIMALIST',
    isPremium: false,
    price: 75000,
    originalPrice: 125000,
    description: 'Arsitektur lengkung Prancis minimalis berbalut ranting daun merambat lembut, monogram inisial R|T, dan tipografi serif bertata ruang lapang.',
    filosofi: {
      quote: 'In all the world, there is no heart for me like yours.',
      source: 'Maya Angelou',
      meaning: 'Keindahan janji suci dalam kesederhanaan arsitektural yang berakar pada ketulusan dan keterbukaan.'
    },
    accentColor: '#4D7C0F',
    primaryColor: '#1E293B',
    secondaryColor: '#F7FEE7',
    bgGradient: 'from-[#FCFBF7] via-[#F5F2E9] to-[#E9E4D4]',
    glassCardBg: 'bg-white/90',
    glassBorder: 'border-lime-800/25',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'french-arch',
    previewImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=85',
    ornamentStyle: 'modern-leaves',
    culturalAnimationType: 'botanical-sway',
    sampleMusic: {
      title: 'Parisiene Romance - Acoustic Fingerstyle',
      genre: 'Acoustic Guitar',
      type: 'synth-acoustic'
    }
  },

  // 6. Maroon Plumeria Monogram (Ketut & Dewi)
  {
    id: 'ref-maroon-ketut-dewi',
    layoutArchetype: 'maroon-plumeria-monogram',
    name: 'Ketut & Dewi Velvet Maroon',
    category: 'modern',
    regionOrStyle: 'olive-burgundy',
    tagline: 'Deep Maroon Velvet, Giant KD Monogram Stem & Graphic Plumeria',
    badge: 'BOLD CONTEMPORARY',
    isPremium: false,
    price: 75000,
    originalPrice: 125000,
    description: 'Latar merah maroon beludru mewah berani dengan inisial KD raksasa bertangkai bunga, ilustrasi bunga kamboja plumeria kontras, dan layout kolom waktu kembar.',
    filosofi: {
      quote: 'Love brought us together, and we would love for you to celebrate with us.',
      source: 'Pesan Kasih Pengantin',
      meaning: 'Warna keberanian dan keteguhan cinta yang mekar laksana bunga kamboja suci di tengah semesta.'
    },
    accentColor: '#F43F5E',
    primaryColor: '#FFFFFF',
    secondaryColor: '#FFE4E6',
    bgGradient: 'from-[#4C0519] via-[#3B0312] to-[#200109]',
    glassCardBg: 'bg-rose-950/40',
    glassBorder: 'border-rose-400/30',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'plumeria-monogram',
    previewImage: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85',
    ornamentStyle: 'bali-padma',
    culturalAnimationType: 'padma-bloom',
    sampleMusic: {
      title: 'Purnama Kedasa - Rindik Bali & Ambient Strings',
      genre: 'Modern Fusion Bali',
      type: 'synth-rindik'
    }
  },

  // 7. Frosted Floral Veil (Daniel & Estelle)
  {
    id: 'ref-frosted-daniel-estelle',
    layoutArchetype: 'frosted-veil-oval',
    name: 'Daniel & Estelle Frosted Veil',
    category: 'luxury',
    regionOrStyle: 'champagne-estate',
    tagline: 'Translucent Frosted Oval Glass & Romantic Bridal Veil Bouquet',
    badge: 'FROSTED GLASS ⭐',
    isPremium: true,
    price: 150000,
    originalPrice: 250000,
    description: 'Latar foto buket mawar putih dan selendang pengantin berkabut, dilapisi pelat oval kaca buram (glassmorphism) dan kaligrafi tembaga Daniel & Estelle.',
    filosofi: {
      quote: 'Once in a while, right in the middle of an ordinary life, love gives us a fairy tale.',
      source: 'Hans Christian Andersen',
      meaning: 'Kisah magis yang terselubung dalam keindahan gaun dan buket bunga pengantin abadi.'
    },
    accentColor: '#92400E',
    primaryColor: '#451A03',
    secondaryColor: '#FEF3C7',
    bgGradient: 'from-[#F9F7F4] via-[#F0EAE1] to-[#E3D7C8]',
    glassCardBg: 'bg-white/80',
    glassBorder: 'border-amber-900/20',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'oval-frost',
    previewImage: 'https://images.unsplash.com/photo-1545232979-fbf67114b081?auto=format&fit=crop&w=1200&q=85',
    ornamentStyle: 'luxury-damask',
    culturalAnimationType: 'damask-glow',
    premiumFeatures: [
      'Efek Frosted Glass Oval Interaktif dengan Blur Dinamis',
      'Divider Tanggal Minimalis Sunday 22 March',
      'Google Drive Moments Vault Auto-Sync',
      'Amplop Digital QRIS & Live Feed Foto Hari-H'
    ],
    sampleMusic: {
      title: 'Canon in D - Romantic Bronze Piano & Strings',
      genre: 'Romantic Classical',
      type: 'synth-piano'
    }
  },

  // 8. Pastel Meadow Wreath (Olivia & Richard)
  {
    id: 'ref-pastel-olivia-richard',
    layoutArchetype: 'pastel-meadow-wreath',
    name: 'Olivia & Richard Pastel Meadow',
    category: 'floral',
    regionOrStyle: 'wildflower',
    tagline: 'Delicate Watercolor Cosmos, Buttercups & Crisp Modern Serifs',
    badge: 'PASTEL WILDFLOWER',
    isPremium: false,
    price: 75000,
    originalPrice: 125000,
    description: 'Karangan bunga cat air pastel kuning, pink, dan biru forget-me-not yang melingkari nama mempelai dengan tipografi serif tebal yang bersih.',
    filosofi: {
      quote: 'Love is a flower which turns into fruit at marriage.',
      source: 'Moliere',
      meaning: 'Bunga cinta yang bermekaran warna-warni membawa kebahagiaan dan keceriaan sepanjang perjalanan rumah tangga.'
    },
    accentColor: '#F59E0B',
    primaryColor: '#3B2418',
    secondaryColor: '#FFFBEB',
    bgGradient: 'from-[#FFFFFF] via-[#FDFBF7] to-[#F7F2E7]',
    glassCardBg: 'bg-white/95',
    glassBorder: 'border-amber-400/30',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'wildflower-wreath',
    previewImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    ornamentStyle: 'rustic-floral',
    culturalAnimationType: 'botanical-sway',
    sampleMusic: {
      title: 'Wildflower Waltz - Sweet Acoustic Duo',
      genre: 'Acoustic Folk',
      type: 'synth-acoustic'
    }
  },

  // 9. Royal Palace Lotus Arch (Prerna & Sumit)
  {
    id: 'ref-palace-prerna-sumit',
    layoutArchetype: 'royal-palace-lotus-arch',
    name: 'Prerna & Sumit Royal Palace Lotus',
    category: 'adat',
    regionOrStyle: 'bali',
    tagline: 'Grand Palace Archway, Glowing Brass Lanterns & Blooming Lotuses',
    badge: 'ROYAL PALACE ⭐',
    isPremium: true,
    price: 150000,
    originalPrice: 250000,
    description: 'Lengkungan gerbang istana megah berpola damask kerajaan, dihiasi 4 lentera gantung kuningan bersinar, simbol suci Om, dan teratai pink mekar anggun.',
    filosofi: {
      quote: 'Om Shanti Shanti Shanti - Semoga damai di hati, damai di dunia, dan damai senantiasa bersama kita.',
      source: 'Mantra Keberkahan Suci',
      meaning: 'Pernikahan agung laksana bunga teratai yang mekar murni di atas telaga kedamaian dan kemuliaan.'
    },
    accentColor: '#D97706',
    primaryColor: '#78350F',
    secondaryColor: '#FEF3C7',
    bgGradient: 'from-[#FFF8F0] via-[#FDEBD8] to-[#F9DEC2]',
    glassCardBg: 'bg-white/90',
    glassBorder: 'border-amber-600/30',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'palace-lotus-arch',
    previewImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    ornamentStyle: 'bali-padma',
    culturalAnimationType: 'padma-bloom',
    premiumFeatures: [
      'Gerbang Lengkung Istana Damask dengan Animasi Lentera Bersinar',
      'Rumpun Bunga Teratai Pink & Calla Lily di Sisi Bawah',
      'Lambang Suci Om / Kerajaan Berkilau Emas',
      'Audio Instrumen Musik Tradisional HD & Live Feed Hari-H'
    ],
    sampleMusic: {
      title: 'Royal Mandap - Sitar & Santoor Melodies',
      genre: 'Traditional Heritage',
      type: 'synth-rindik'
    }
  },

  // 10. Editorial B&W Split (Sarah & Henry)
  {
    id: 'ref-editorial-sarah-henry',
    layoutArchetype: 'editorial-bw-vertical',
    name: 'Sarah & Henry Editorial B&W',
    category: 'modern',
    regionOrStyle: 'minimalist',
    tagline: 'Monochrome Fashion Split, Giant Edge Names & Interlocking Ampersand',
    badge: 'EDITORIAL HIGH-FASHION',
    isPremium: false,
    price: 75000,
    originalPrice: 125000,
    description: 'Layout majalah mode kontemporer hitam-putih dengan foto danau dramatis di kiri, tipografi vertikal raksasa SARAH & HENRY di tepi kartu, dan ampersand modern.',
    filosofi: {
      quote: 'Simplicity is the keynote of all true elegance.',
      source: 'Coco Chanel',
      meaning: 'Keindahan cinta monokromatik yang abadi, tegas, modern, dan tak lekang oleh waktu.'
    },
    accentColor: '#18181B',
    primaryColor: '#09090B',
    secondaryColor: '#F4F4F5',
    bgGradient: 'from-[#FFFFFF] via-[#F4F4F5] to-[#E4E4E7]',
    glassCardBg: 'bg-white',
    glassBorder: 'border-zinc-300',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'bw-ampersand',
    previewImage: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85',
    ornamentStyle: 'modern-leaves',
    culturalAnimationType: 'botanical-sway',
    sampleMusic: {
      title: 'Monochrome Nocturne - Minimalist Piano',
      genre: 'Modern Minimal Piano',
      type: 'synth-piano'
    }
  },

  // 11. Seafoam Sage Thistle (Richard & Amanda)
  {
    id: 'ref-seafoam-richard-amanda',
    layoutArchetype: 'seafoam-sage-thistle',
    name: 'Richard & Amanda Seafoam Thistle',
    category: 'floral',
    regionOrStyle: 'sage-boho',
    tagline: 'Misty Seafoam Watercolor Wash & Pink Botanical Cornflower Stems',
    badge: 'SEAFOAM SAGE',
    isPremium: false,
    price: 75000,
    originalPrice: 125000,
    description: 'Latar sapuan cat air hijau seafoam berkabut yang sejuk dan menenangkan, dihiasi tangkai bunga cornflower/thistle pink di sudut, dan tanggal titik 20.10.2025.',
    filosofi: {
      quote: 'Whatever our souls are made of, his and mine are the same.',
      source: 'Emily Bronte',
      meaning: 'Ketenteraman jiwa yang bersatu dalam kesejukan embun pagi dan mekarnya kuntum bunga liar.'
    },
    accentColor: '#059669',
    primaryColor: '#334155',
    secondaryColor: '#ECFDF5',
    bgGradient: 'from-[#F0FDF9] via-[#E4F8F1] to-[#D0EFE4]',
    glassCardBg: 'bg-white/85',
    glassBorder: 'border-emerald-600/20',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'thistle-stem',
    previewImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=85',
    ornamentStyle: 'rustic-floral',
    culturalAnimationType: 'botanical-sway',
    sampleMusic: {
      title: 'Morning Dew Thistle - Soft Celtic Harp & Flute',
      genre: 'Celtic Ambient',
      type: 'synth-saluang'
    }
  }
];
