import { ThemeConfig } from '../types';
import { CLONED_ADAT_THEMES, CANVA_ETSY_THEMES, CLONED_MODERN_THEMES } from './driveTemplates';
import { REFERENCE_CANVA_THEMES } from './referenceThemes';
import { FREE_ISLAMIC_THEMES } from './freeIslamicThemes';

export const BASE_WEDDING_THEMES: ThemeConfig[] = [
  // === ADAT TRADISIONAL INDONESIA ===
  {
    id: 'adat-jawa',
    layoutArchetype: 'adat-royal',
    name: 'Adat Jawa Solo & Jogja',
    category: 'adat',
    regionOrStyle: 'jawa',
    tagline: 'Kidung Katresnan & Gemebyaring Pangantin',
    badge: 'PREMIUM ⭐',
    isPremium: true,
    price: 150000,
    originalPrice: 250000,
    description: 'Nuansa luhur budaya Jawa dengan animasi Gunungan Wayang emas bersinar, aksen tembaga keraton, dan filosofi Bibit, Bebet, Bobot.',
    filosofi: {
      quote: 'Tresno iku ora amarga rupa, nanging amarga rasa suci ing njero ati.',
      source: 'Falsafah Jawa Kuno',
      meaning: 'Cinta sejati bukan karena rupa, melainkan karena kesucian rasa di dalam hati yang bersatu dalam ikatan suci pernikahan.'
    },
    accentColor: '#D97706', // Warm Amber Gold
    primaryColor: '#78350F', // Warm Deep Teak Wood
    secondaryColor: '#FEF3C7', // Soft Cream
    bgGradient: 'from-[#FAF6F0] via-[#F5EBE1] to-[#EBD9C8]',
    glassCardBg: 'bg-amber-950/5',
    glassBorder: 'border-amber-700/20',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'gunungan',
    previewImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    ornamentStyle: 'jawa-gunungan',
    culturalAnimationType: 'gunungan-sway',
    premiumFeatures: [
      'Animasi Emas Gunungan Hayat & Partikel Keraton',
      'Google Drive Auto-Sync Momen & Album Tamu',
      'Live Feed Foto Hari-H Interaktif',
      'Audio Gamelan Ladrang Kualitas HD',
      'Unlimited Guest WhatsApp Links'
    ],
    sampleMusic: {
      title: 'Ladrang Wilujeng - Gamelan Jawa',
      genre: 'Tradisional Jawa Solo',
      type: 'synth-gamelan'
    }
  },
  {
    id: 'adat-sunda',
    layoutArchetype: 'adat-royal',
    name: 'Adat Sunda Priangan',
    category: 'adat',
    regionOrStyle: 'sunda',
    tagline: 'Silih Asih, Silih Asah, Silih Asuh',
    badge: 'STANDAR',
    isPremium: false,
    price: 75000,
    originalPrice: 125000,
    description: 'Kelembutan tanah Parahyangan dengan hiasan bunga Melati Ronce, Kujang anggun, dan kecapi suling syahdu.',
    filosofi: {
      quote: 'Kudu silih asih, silih asah, jeung silih asuh dina ngambah sagara kahirupan.',
      source: 'Pepatah Luhur Sunda',
      meaning: 'Saling mencintai, saling mendidik, dan saling menjaga dalam mengarungi samudra kehidupan rumah tangga.'
    },
    accentColor: '#059669', // Emerald Green Melati
    primaryColor: '#064E3B', // Forest Emerald
    secondaryColor: '#ECFDF5', // Mint Mist
    bgGradient: 'from-[#F2FBF7] via-[#E6F7F0] to-[#D5EFE3]',
    glassCardBg: 'bg-emerald-950/5',
    glassBorder: 'border-emerald-700/20',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'kujang',
    previewImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    ornamentStyle: 'sunda-kujang',
    culturalAnimationType: 'kujang-shimmer',
    sampleMusic: {
      title: 'Kecapi Suling Ayun Ambing - Sunda',
      genre: 'Tradisional Parahyangan',
      type: 'synth-saluang'
    }
  },
  {
    id: 'adat-minang',
    layoutArchetype: 'adat-royal',
    name: 'Adat Minangkabau',
    category: 'adat',
    regionOrStyle: 'minang',
    tagline: 'Adaik Basandi Syarak, Syarak Basandi Kitabullah',
    badge: 'PREMIUM ⭐',
    isPremium: true,
    price: 150000,
    originalPrice: 250000,
    description: 'Kemegahan Ranah Minang dengan animasi kilau mahkota Suntiang emas bertingkat, ornamen Gonjong Rumah Gadang berwibawa.',
    filosofi: {
      quote: 'Nan kuriak kundi, nan merah sago. Nan baiak budi, nan rancak baso.',
      source: 'Pepatah Adat Minangkabau',
      meaning: 'Kebaikan budi pekerti dan keindahan tutur kata adalah perhiasan utama bagi pasangan dalam berumah tangga.'
    },
    accentColor: '#DC2626', // Ruby Red
    primaryColor: '#991B1B', // Deep Maroon
    secondaryColor: '#FEF2F2', // Soft Crimson Tint
    bgGradient: 'from-[#FFF5F5] via-[#FFE8E8] to-[#FED7D7]',
    glassCardBg: 'bg-red-950/5',
    glassBorder: 'border-red-700/20',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'gonjong',
    previewImage: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80',
    ornamentStyle: 'minang-gonjong',
    culturalAnimationType: 'gonjong-sparkle',
    premiumFeatures: [
      'Animasi Kemilau Emas Suntiang & Atap Gonjong Megah',
      'Google Drive Cloud Sync Foto Momen Pernikahan',
      'Live Guest Camera & Upload Hari-H',
      'Audio Saluang Bungo Parawitan',
      'Buku Tamu VIP & Download Excel RSVP'
    ],
    sampleMusic: {
      title: 'Bungo Parawitan - Saluang Minang',
      genre: 'Tradisional Minangkabau',
      type: 'synth-saluang'
    }
  },
  {
    id: 'adat-bali',
    layoutArchetype: 'adat-royal',
    name: 'Adat Bali Pawiwahan',
    category: 'adat',
    regionOrStyle: 'bali',
    tagline: 'Tri Hita Karana & Yadnya Suci Pawiwahan',
    badge: 'PREMIUM ⭐',
    isPremium: true,
    price: 150000,
    originalPrice: 250000,
    description: 'Kesakralan upacara Pawiwahan Bali berhiaskan animasi kelopak Padma mekar, ornamen Janur Penjor, dan nada Rindik bambu.',
    filosofi: {
      quote: 'Rahajeng Manggeh ring Sangkan Paraning Dumadi, Tri Kaya Parisudha.',
      source: 'Lontar Yadnya Pawiwahan',
      meaning: 'Menjaga keselarasan pikiran, perkataan, dan perbuatan demi keharmonisan cinta lahir dan batin.'
    },
    accentColor: '#EAB308', // Sacred Bali Gold
    primaryColor: '#854D0E', // Golden Ochre
    secondaryColor: '#FEFCE8', // Sand Sun
    bgGradient: 'from-[#FCFBF4] via-[#F9F5E3] to-[#F1E8C5]',
    glassCardBg: 'bg-amber-950/5',
    glassBorder: 'border-amber-600/25',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'padma',
    previewImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    ornamentStyle: 'bali-padma',
    culturalAnimationType: 'padma-bloom',
    premiumFeatures: [
      'Animasi Bunga Padma Melayang & Efek Janur Emas',
      'Sinkronisasi Google Drive Album Momen Manten',
      'Live Streaming YouTube / Zoom Integration',
      'Harmoni Musik Rindik Tradisional Bali',
      'QR Code Check-in Tamu Resepsi'
    ],
    sampleMusic: {
      title: 'Tabuh Sekar Sandat - Rindik Bali',
      genre: 'Tradisional Gamelan Bali',
      type: 'synth-rindik'
    }
  },
  {
    id: 'adat-batak',
    layoutArchetype: 'adat-royal',
    name: 'Adat Batak Toba & Karo',
    category: 'adat',
    regionOrStyle: 'batak',
    tagline: 'Dalihan Na Tolu & Ulos Hela Pangoli',
    badge: 'STANDAR',
    isPremium: false,
    price: 75000,
    originalPrice: 125000,
    description: 'Kekayaan ornamen Gorga Batak dengan motif Ulos Ragi Hotang, warna merah hitam putih, dan kehangatan keluarga besar.',
    filosofi: {
      quote: 'Anakhon hi do hamoraon di au. Tampuk ni ate-ate, rokkap ni tondi.',
      source: 'Falsafah Batak Toba',
      meaning: 'Cinta sejati adalah belahan jiwa (rokkap ni tondi) yang diberkati untuk membangun keturunan yang bijaksana dan terhormat.'
    },
    accentColor: '#B91C1C', // Batak Red
    primaryColor: '#18181B', // Batak Charcoal Black
    secondaryColor: '#FAFAFA', // Pure White Accent
    bgGradient: 'from-[#FAF8F8] via-[#F4EEEE] to-[#E9DFDF]',
    glassCardBg: 'bg-stone-950/5',
    glassBorder: 'border-stone-800/20',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'gorga',
    previewImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    ornamentStyle: 'batak-gorga',
    culturalAnimationType: 'gorga-pulse',
    sampleMusic: {
      title: 'Gondang Hasahatan - Batak Instrumental',
      genre: 'Tradisional Batak',
      type: 'synth-acoustic'
    }
  },
  {
    id: 'adat-bugis',
    layoutArchetype: 'adat-royal',
    name: 'Adat Bugis - Makassar',
    category: 'adat',
    regionOrStyle: 'bugis',
    tagline: 'Siri\' Na Pacce & Baju Bodo Sutera Bugis',
    badge: 'PREMIUM ⭐',
    isPremium: true,
    price: 150000,
    originalPrice: 250000,
    description: 'Kemilau Sutera Lagosi dengan animasi ombak Phinisi dan motif Bunga Boddong emas, serta nuansa hijau toska bangsawan.',
    filosofi: {
      quote: 'Taro ada taro gau, tennapada salo maelo pasilele onroang.',
      source: 'Pappaseng Bugis Kuno',
      meaning: 'Kesesuaian kata dan perbuatan, teguh memegang janji suci pernikahan laksana aliran sungai yang jernih.'
    },
    accentColor: '#0D9488', // Emerald Teal Lagosi
    primaryColor: '#134E4A', // Dark Pine Teal
    secondaryColor: '#F0FDFA', // Glacial Teal Tint
    bgGradient: 'from-[#F0FBF9] via-[#E2F7F3] to-[#C9EFE7]',
    glassCardBg: 'bg-teal-950/5',
    glassBorder: 'border-teal-700/20',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'bugis-bunga',
    previewImage: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    ornamentStyle: 'bugis-bunga',
    culturalAnimationType: 'bugis-wave',
    premiumFeatures: [
      'Animasi Gelombang Sutera Lagosi & Bunga Boddong Emas',
      'Google Drive Cloud Auto-Save Momen Resepsi',
      'Live Album Tamu Interaktif Hari-H',
      'Musik Tradisional Bugis Balo Lipa',
      'Kustomisasi Slug Eksklusif'
    ],
    sampleMusic: {
      title: 'Balo Lipa - Kecapi Suling Makassar',
      genre: 'Tradisional Bugis Makassar',
      type: 'synth-saluang'
    }
  },
  {
    id: 'adat-betawi',
    layoutArchetype: 'adat-royal',
    name: 'Adat Betawi Klasik',
    category: 'adat',
    regionOrStyle: 'betawi',
    tagline: 'Palang Pintu & Kembang Kelapa Betawi',
    badge: 'STANDAR',
    isPremium: false,
    price: 75000,
    originalPrice: 125000,
    description: 'Keceriaan dan keakraban khas Jakarta dengan ornamen Gigi Balang, Kembang Kelapa, dan paduan warna ceria berenergi positif.',
    filosofi: {
      quote: 'Kagak ade rintangan nyang berat kalo niat ibadah udah mantep di dalam hati.',
      source: 'Petuah Pantun Betawi',
      meaning: 'Segala tantangan kehidupan pernikahan dapat dilalui dengan keikhlasan, rasa syukur, dan saling menghormati.'
    },
    accentColor: '#EA580C', // Betawi Orange
    primaryColor: '#9A3412', // Rust Red
    secondaryColor: '#FFF7ED', // Peach Blossom
    bgGradient: 'from-[#FFF8F0] via-[#FFEDE0] to-[#FEDBC4]',
    glassCardBg: 'bg-orange-950/5',
    glassBorder: 'border-orange-600/20',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'betawi-ondel',
    previewImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80',
    ornamentStyle: 'betawi-ondel',
    culturalAnimationType: 'betawi-dance',
    sampleMusic: {
      title: 'Gambang Kromong Instrumental - Betawi',
      genre: 'Tradisional Betawi',
      type: 'synth-acoustic'
    }
  },
  {
    id: 'adat-aceh',
    layoutArchetype: 'adat-royal',
    name: 'Adat Aceh Serambi Mekkah',
    category: 'adat',
    regionOrStyle: 'aceh',
    tagline: 'Pinto Aceh & Mawaddah Warahmah',
    badge: 'STANDAR',
    isPremium: false,
    price: 75000,
    originalPrice: 125000,
    description: 'Keindahan seni ornamen Pinto Aceh yang melambangkan keramahan dan keteguhan iman, dipadukan nuansa emas safir.',
    filosofi: {
      quote: 'Adat bak Po Teumeureuhom, Hukom bak Syiah Kuala.',
      source: 'Hadih Maja Aceh',
      meaning: 'Adat dan hukum syariat berjalan beriringan melandasi rumah tangga yang berkah, damai, dan diridhai Ilahi.'
    },
    accentColor: '#CA8A04', // Aceh Royal Gold
    primaryColor: '#1E3A8A', // Aceh Royal Sapphire
    secondaryColor: '#EFF6FF', // Soft Cloud Blue
    bgGradient: 'from-[#F4F7FC] via-[#E8EFFB] to-[#D4E3F8]',
    glassCardBg: 'bg-blue-950/5',
    glassBorder: 'border-blue-700/20',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'aceh-pinto',
    previewImage: 'https://images.unsplash.com/photo-1519225429871-332349071077?auto=format&fit=crop&w=800&q=80',
    ornamentStyle: 'aceh-pinto',
    culturalAnimationType: 'aceh-glimmer',
    sampleMusic: {
      title: 'Bungong Jeumpa Instrumental - Serunai Aceh',
      genre: 'Tradisional Aceh',
      type: 'synth-strings'
    }
  },
  {
    id: 'adat-palembang',
    layoutArchetype: 'adat-royal',
    name: 'Adat Palembang Aesan Gede',
    category: 'adat',
    regionOrStyle: 'palembang',
    tagline: 'Keagungan Sriwijaya & Songket Emas Palembang',
    badge: 'PREMIUM ⭐',
    isPremium: true,
    price: 150000,
    originalPrice: 250000,
    description: 'Kemewahan Songket Lepus benang emas Palembang berpadu ornamen Teratai Melati dan animasi kilau mahkota Aesan Gede.',
    filosofi: {
      quote: 'Elok nian laksana emas bertatah permata, rukun selamanya.',
      source: 'Kiasan Adat Wong Kito',
      meaning: 'Dua insan yang dipersatukan dalam ikatan mulia, saling menyinari dengan kemuliaan budi dan kesetiaan.'
    },
    accentColor: '#D97706', // Royal Songket Gold
    primaryColor: '#831843', // Deep Wine Velvet
    secondaryColor: '#FDF2F8', // Rose Mist
    bgGradient: 'from-[#FDF5F8] via-[#FCE7F0] to-[#F8D2E2]',
    glassCardBg: 'bg-pink-950/5',
    glassBorder: 'border-pink-800/20',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'songket',
    previewImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    ornamentStyle: 'palembang-songket',
    culturalAnimationType: 'songket-gold',
    premiumFeatures: [
      'Animasi Kilau Anyaman Songket Benang Emas Keraton',
      'Penyimpanan Google Drive Cloud Tak Terbatas',
      'Live Feed Hari-H Tamu Realtime',
      'Musik Gending Sriwijaya Kerajaan',
      'VIP Dedicated Customer Support'
    ],
    sampleMusic: {
      title: 'Gending Sriwijaya - Instrumental Palembang',
      genre: 'Tradisional Sriwijaya',
      type: 'synth-gamelan'
    }
  },
  {
    id: 'adat-dayak',
    layoutArchetype: 'adat-royal',
    name: 'Adat Dayak Borneo',
    category: 'adat',
    regionOrStyle: 'dayak',
    tagline: 'Adat Dayak Kenyah & Ukiran Batang Garing',
    badge: 'PREMIUM ⭐',
    isPremium: true,
    price: 150000,
    originalPrice: 250000,
    description: 'Keindahan ukiran spiral Dayak Kalimantan dengan animasi getar mistis alam, manik-manik etnik, dan harmoni petikan Sape.',
    filosofi: {
      quote: 'Belom Bahadat, Adil Ka\' Talino, Bacuramin Ka\' Saruga, Basengat Ka\' Jubata.',
      source: 'Falsafah Luhur Suku Dayak',
      meaning: 'Hidup beradat, bersikap adil sesama manusia, bercermin ke surga, dan bernafaskan kepada Tuhan Yang Maha Esa.'
    },
    accentColor: '#D97706', // Ochre Clay
    primaryColor: '#365314', // Borneo Jungle Olive
    secondaryColor: '#F7FEE7', // Lime Mist
    bgGradient: 'from-[#F8FAF4] via-[#EEF5E5] to-[#DDEACF]',
    glassCardBg: 'bg-lime-950/5',
    glassBorder: 'border-lime-700/20',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'dayak-ukir',
    previewImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    ornamentStyle: 'dayak-ukir',
    culturalAnimationType: 'dayak-mystic',
    premiumFeatures: [
      'Animasi Ukiran Spiral Batang Garing Borneo Berdenyut',
      'Google Drive Cloud Auto-Sync Galeri Foto',
      'Live Guest Moments Upload Hari-H',
      'Petikan Asli Sape Borneo Instrumental',
      'Custom Link Tautan VIP'
    ],
    sampleMusic: {
      title: 'Petikan Sape Dayak Borneo - Harmoni Alam',
      genre: 'Tradisional Borneo Sape',
      type: 'synth-acoustic'
    }
  },

  // === TEMA POPULER & MODERN ===
  {
    id: 'modern-minimalist',
    layoutArchetype: 'viding-cinematic',
    name: 'Modern Minimalist iOS',
    category: 'modern',
    regionOrStyle: 'minimalist',
    tagline: 'Clean Lines, Pure Harmony & Understated Elegance',
    badge: 'STANDAR',
    isPremium: false,
    price: 75000,
    originalPrice: 125000,
    description: 'Estetika minimalis kontemporer dengan tipografi sans-serif bersih, ruang negatif lega, dan sentuhan warna netral hangat.',
    filosofi: {
      quote: 'Two souls with but a single thought, two hearts that beat as one.',
      source: 'John Keats',
      meaning: 'Kesederhanaan yang menonjolkan esensi cinta sejati, berjanji untuk saling menemani di setiap langkah waktu.'
    },
    accentColor: '#2563EB', // Modern Accent Blue
    primaryColor: '#1E293B', // Slate 800
    secondaryColor: '#F8FAFC', // Crisp Off-White
    bgGradient: 'from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0]',
    glassCardBg: 'bg-slate-900/5',
    glassBorder: 'border-slate-300/40',
    fontHeading: 'font-sans font-bold',
    fontBody: 'font-sans',
    motifSvg: 'leaves',
    previewImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    ornamentStyle: 'modern-leaves',
    culturalAnimationType: 'botanical-sway',
    sampleMusic: {
      title: 'Canon in D - Romantic Acoustic Piano',
      genre: 'Modern Acoustic',
      type: 'synth-piano'
    }
  },
  {
    id: 'luxury-gold',
    layoutArchetype: 'old-money-chateau',
    name: 'Luxury Royal Gold & Ivory',
    category: 'modern',
    regionOrStyle: 'luxury',
    tagline: 'Opulent Romance in Shimmering Gold & Soft Velvet',
    badge: 'PREMIUM ⭐',
    isPremium: true,
    price: 150000,
    originalPrice: 250000,
    description: 'Gaya pernikahan mewah berbalut animasi cahaya emas berkilau, kartu kaca frosted liquid glass mengkilat, dan ornamen damask eropa.',
    filosofi: {
      quote: 'Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.',
      source: 'Romantic Reflections',
      meaning: 'Sebuah mahakarya cinta abadi yang dirayakan dengan penuh keagungan dan sukacita bersama keluarga tercinta.'
    },
    accentColor: '#D97706', // Liquid Gold
    primaryColor: '#451A03', // Deep Amber Roast
    secondaryColor: '#FFFBEB', // Warm Ivory
    bgGradient: 'from-[#FFFDF5] via-[#FFF8E7] to-[#FCEECC]',
    glassCardBg: 'bg-amber-950/5',
    glassBorder: 'border-amber-500/30',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'damask',
    previewImage: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    ornamentStyle: 'luxury-damask',
    culturalAnimationType: 'damask-glow',
    premiumFeatures: [
      'Animasi Liquid Gold & Cahaya Kristal Mewah',
      'Google Drive Cloud Auto-Sync Moments Tamu',
      'Live Photo Feed Album Hari-H',
      'Orkestra A Thousand Years String Ensemble',
      'Custom Domain & VIP WhatsApp Generator'
    ],
    sampleMusic: {
      title: 'A Thousand Years - Classical String Ensemble',
      genre: 'Orchestral Romance',
      type: 'synth-strings'
    }
  },
  {
    id: 'rustic-botanical',
    layoutArchetype: 'boho-wildflower',
    name: 'Rustic Botanical Sage',
    category: 'modern',
    regionOrStyle: 'rustic',
    tagline: 'Earthy Warmth, Dry Flowers & Green Foliage',
    badge: 'STANDAR',
    isPremium: false,
    price: 75000,
    originalPrice: 125000,
    description: 'Nuansa taman botani asri dengan daun eucalyptus perak, bunga kering pampas grass, dan sentuhan kayu hangat.',
    filosofi: {
      quote: 'Grow old along with me! The best is yet to be.',
      source: 'Robert Browning',
      meaning: 'Tumbuh bersama dalam keteduhan cinta alami, saling menguatkan bagai akar pepohonan yang menopang kehidupan.'
    },
    accentColor: '#65A30D', // Sage Olive
    primaryColor: '#3F6212', // Forest Sage
    secondaryColor: '#F7FEE7', // Soft Sage Cream
    bgGradient: 'from-[#FAFDF6] via-[#F1F8EB] to-[#E2EED7]',
    glassCardBg: 'bg-emerald-950/5',
    glassBorder: 'border-lime-700/20',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'floral',
    previewImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80',
    ornamentStyle: 'rustic-floral',
    culturalAnimationType: 'botanical-sway',
    sampleMusic: {
      title: 'Acoustic Morning Bloom - Warm Guitar',
      genre: 'Acoustic Folk Romance',
      type: 'synth-acoustic'
    }
  },
  {
    id: 'islamic-arabesque',
    layoutArchetype: 'adat-royal',
    name: 'Islamic Arabesque Emerald',
    category: 'modern',
    regionOrStyle: 'islamic',
    tagline: 'Pernikahan Berkah, Sakinah Mawaddah Warahmah',
    badge: 'PREMIUM ⭐',
    isPremium: true,
    price: 150000,
    originalPrice: 250000,
    description: 'Motif geometri kubah islami dengan animasi rotasi arabesque halus, kaligrafi estetik, dan nuansa hijau zamrud toska.',
    filosofi: {
      quote: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu merasa tenteram kepadanya.',
      source: 'QS. Ar-Rum: 21',
      meaning: 'Menjalin ikatan suci pernikahan di bawah naungan rahmat dan kasih sayang Allah SWT untuk menggapai surga-Nya.'
    },
    accentColor: '#0D9488', // Zamrud Teal
    primaryColor: '#115E59', // Deep Islamic Teal
    secondaryColor: '#F0FDFA', // Glacial Teal Tint
    bgGradient: 'from-[#F0FBF9] via-[#E4F7F3] to-[#CEEFE8]',
    glassCardBg: 'bg-teal-950/5',
    glassBorder: 'border-teal-600/20',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'arabesque',
    previewImage: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80',
    ornamentStyle: 'islamic-arabesque',
    culturalAnimationType: 'gonjong-sparkle',
    premiumFeatures: [
      'Animasi Geometri Kubah Arabesque Berputar Halus',
      'Google Drive Momen Sync & Audio Player',
      'Ayat Suci Interaktif & Doa Keberkahan',
      'Live Guest Wish & RSVP Real-time',
      'Generator Undangan Tamu Tanpa Batas'
    ],
    sampleMusic: {
      title: 'Kalam Cinta Kasih - Instrumental Gambus Strings',
      genre: 'Islamic Ambient Instrumental',
      type: 'synth-strings'
    }
  },
  {
    id: 'korean-pastel',
    layoutArchetype: 'adat-royal',
    name: 'Korean Aesthetic Pastel',
    category: 'modern',
    regionOrStyle: 'korean',
    tagline: 'Sweet Blossoms, Soft Lavender & Pastel Breeze',
    badge: 'STANDAR',
    isPremium: false,
    price: 75000,
    originalPrice: 125000,
    description: 'Warna pastel lembut (peach, soft lilac & creamy rose) dengan layout kartu mengapung kaca, dan animasi manis.',
    filosofi: {
      quote: 'You are my blue sky, my sweetest dream and my forever home.',
      source: 'Korean Romantic Poetry',
      meaning: 'Kisah manis yang bertaut abadi, menghiasi setiap detik kehidupan dengan senyuman dan kehangatan rasa.'
    },
    accentColor: '#EC4899', // Pink Peach
    primaryColor: '#831843', // Deep Berry
    secondaryColor: '#FDF2F8', // Rose Mist
    bgGradient: 'from-[#FFF7F9] via-[#FEEDF3] to-[#FDDCE7]',
    glassCardBg: 'bg-pink-950/5',
    glassBorder: 'border-pink-400/25',
    fontHeading: 'font-sans font-semibold',
    fontBody: 'font-sans',
    motifSvg: 'leaves',
    previewImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    ornamentStyle: 'modern-leaves',
    culturalAnimationType: 'botanical-sway',
    sampleMusic: {
      title: 'Spring Day Blossom - Sweet Lo-Fi Piano',
      genre: 'Korean Romantic Pop Piano',
      type: 'synth-piano'
    }
  },
  {
    id: 'royal-navy',
    layoutArchetype: 'adat-royal',
    name: 'Midnight Royal Navy & Silver',
    category: 'modern',
    regionOrStyle: 'navy',
    tagline: 'Deep Midnight Sky with Starlight Silver Accents',
    badge: 'STANDAR',
    isPremium: false,
    price: 75000,
    originalPrice: 125000,
    description: 'Nuansa biru navy yang elegan dipadu dengan aksen perak dan kristal es, memberikan kesan eksklusif dan timeless.',
    filosofi: {
      quote: 'True love stories never have endings, only eternal beginnings.',
      source: 'Richard Bach',
      meaning: 'Komitmen sejati yang teguh laksana samudra yang tenang, saling menjaga dalam suka dan duka.'
    },
    accentColor: '#3B82F6', // Royal Blue
    primaryColor: '#1E3A8A', // Deep Midnight Navy
    secondaryColor: '#EFF6FF', // Soft Starlight Blue
    bgGradient: 'from-[#F5F8FF] via-[#EAF0FD] to-[#D5E3FA]',
    glassCardBg: 'bg-blue-950/5',
    glassBorder: 'border-blue-700/20',
    fontHeading: 'font-serif',
    fontBody: 'font-sans',
    motifSvg: 'damask',
    previewImage: 'https://images.unsplash.com/photo-1519225429871-332349071077?auto=format&fit=crop&w=800&q=80',
    ornamentStyle: 'luxury-damask',
    culturalAnimationType: 'damask-glow',
    sampleMusic: {
      title: 'Moonlight Serenade - Midnight Strings',
      genre: 'Classic Symphony',
      type: 'synth-strings'
    }
  }
];

export const WEDDING_THEMES: ThemeConfig[] = [
  ...FREE_ISLAMIC_THEMES,
  ...REFERENCE_CANVA_THEMES,
  ...BASE_WEDDING_THEMES,
  ...CLONED_ADAT_THEMES,
  ...CANVA_ETSY_THEMES,
  ...CLONED_MODERN_THEMES,
];

export const getThemeById = (id: string): ThemeConfig => {
  return WEDDING_THEMES.find(t => t.id === id) || WEDDING_THEMES[0];
};

