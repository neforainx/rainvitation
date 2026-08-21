export type ThemeCategory = 'adat' | 'modern' | 'luxury' | 'floral' | 'cloned-drive';

export type AdatRegion = 
  | 'jawa'
  | 'sunda'
  | 'minang'
  | 'bali'
  | 'batak'
  | 'bugis'
  | 'betawi'
  | 'aceh'
  | 'palembang'
  | 'dayak'
  | 'walimatul'
  | 'kitaberdua'
  | 'viding'
  | 'gowedding'
  | 'sangmempelai'
  | 'helloinvitera'
  | 'ruanginvi'
  | 'indoinvite'
  | 'undangankita';

export type ModernStyle =
  | 'minimalist'
  | 'luxury'
  | 'rustic'
  | 'emerald'
  | 'islamic'
  | 'korean'
  | 'navy'
  | 'old-money'
  | 'lake-como'
  | 'olive-burgundy'
  | 'ivory-monogram'
  | 'wildflower'
  | 'pearl-lace'
  | 'champagne-estate'
  | 'sage-boho'
  | 'chocolate-luxury'
  | 'botanical';

export type LayoutArchetype = 
  | 'adat-royal' 
  | 'old-money-chateau' 
  | 'lake-como-arch' 
  | 'viding-cinematic' 
  | 'boho-wildflower' 
  | 'emerald-liquid-glass'
  | 'framer-cinematic'
  | 'white-meadow-script'
  | 'navy-sketch-poppy'
  | 'bismillah-botanical-watercolor'
  | 'french-arch-monogram'
  | 'maroon-plumeria-monogram'
  | 'frosted-veil-oval'
  | 'pastel-meadow-wreath'
  | 'royal-palace-lotus-arch'
  | 'editorial-bw-vertical'
  | 'seafoam-sage-thistle'
  | 'islamic-arabesque-free'
  | 'framer-islamic-arch'
  | 'moroccan-lantern-islamic'
  | 'crescent-midnight-islamic'
  | 'jasmine-syari-clean';

export interface ThemeConfig {
  id: string;
  name: string;
  category: ThemeCategory;
  regionOrStyle: AdatRegion | ModernStyle | string;
  layoutArchetype?: LayoutArchetype;
  tagline: string;
  badge: string;
  isPremium: boolean;
  price: number; // 75000 for regular, 150000 for premium
  originalPrice?: number;
  description: string;
  sourceDriveFolder?: string;
  filosofi: {
    quote: string;
    source: string;
    meaning: string;
  };
  accentColor: string;
  primaryColor: string;
  secondaryColor: string;
  bgGradient: string;
  glassCardBg: string;
  glassBorder: string;
  fontHeading: string;
  fontBody: string;
  motifSvg: string; // SVG icon or pattern name
  previewImage: string;
  ornamentStyle: 
    | 'jawa-gunungan' 
    | 'sunda-kujang' 
    | 'minang-gonjong' 
    | 'bali-padma' 
    | 'batak-gorga' 
    | 'bugis-bunga' 
    | 'betawi-ondel' 
    | 'aceh-pinto' 
    | 'palembang-songket' 
    | 'dayak-ukir' 
    | 'modern-leaves' 
    | 'luxury-damask' 
    | 'rustic-floral' 
    | 'islamic-arabesque'
    | string;
  culturalAnimationType?: 
    | 'gunungan-sway' 
    | 'kujang-shimmer' 
    | 'gonjong-sparkle' 
    | 'padma-bloom' 
    | 'gorga-pulse' 
    | 'bugis-wave' 
    | 'betawi-dance' 
    | 'aceh-glimmer' 
    | 'songket-gold' 
    | 'dayak-mystic' 
    | 'damask-glow' 
    | 'botanical-sway'
    | string;
  premiumFeatures?: string[];
  sampleMusic: {
    title: string;
    genre: string;
    type: 'synth-gamelan' | 'synth-rindik' | 'synth-saluang' | 'synth-piano' | 'synth-acoustic' | 'synth-strings';
  };
}

export interface CouplePerson {
  name: string;
  fullName: string;
  childNumber: string; // e.g. "Putri Pertama dari"
  father: string;
  mother: string;
  instagram?: string;
  photo: string;
  bio?: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  type: 'akad' | 'pemberkatan' | 'resepsi' | 'unduh-mantu' | 'adat';
  date: string; // YYYY-MM-DD
  timeStart: string; // e.g. "08:00"
  timeEnd: string; // e.g. "11:00" or "Selesai"
  timezone: string; // "WIB", "WITA", "WIT"
  locationName: string;
  address: string;
  mapsUrl: string;
  mapsEmbedQuery?: string;
  streamingUrl?: string;
  dresscode?: {
    title: string;
    colors: string[];
    note: string;
  };
}

export interface LoveStoryItem {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
}

export interface GalleryMedia {
  id: string;
  url: string;
  caption: string;
  type: 'image' | 'video';
  ratio?: 'square' | 'portrait' | 'landscape';
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  logo?: string;
  qrisUrl?: string;
}

export interface RSVPItem {
  id: string;
  name: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  guestCount: number;
  message: string;
  relation: string; // e.g. "Teman Kuliah", "Keluarga", "Rekan Kerja"
  timestamp: string;
  likes: number;
}

export interface LiveFeedPhoto {
  id: string;
  uploaderName: string;
  capturedBy?: string; // e.g. "Captured by Dimas & Rina"
  photoUrl: string;
  caption: string;
  timestamp: string;
  likes: number;
  filterUsed?: 'normal' | 'warm' | 'vintage' | 'bw' | 'golden';
  tableNumber?: string;
  likedByMe?: boolean;
}

export interface GuestRecipient {
  id: string;
  name: string;
  phone?: string;
  group?: string; // e.g. "Keluarga", "Teman Kantor", "VIP"
  customSlugParam?: string;
  isSent?: boolean;
}

export type PricingTier = 'standard' | 'premium' | 'free_trial' | 'basic' | 'gold' | 'platinum';

export interface PricingPlan {
  id: PricingTier;
  name: string;
  price: number; // in IDR
  originalPrice: number;
  badge?: string;
  isPopular?: boolean;
  description: string;
  features: string[];
  durationText: string;
}

export interface WeddingInvitation {
  id: string;
  slug: string; // custom slug like 'kevin-nadia'
  ownerEmail?: string; // Google OAuth email of template creator/buyer
  isPublished: boolean;
  publishedAt?: string;
  pricingTier: PricingTier;
  paymentStatus: 'unpaid' | 'paid';
  invoiceCode?: string;
  themeId: string;
  heroTagline: string;
  weddingDate: string; // ISO String or YYYY-MM-DD for countdown
  groom: CouplePerson;
  bride: CouplePerson;
  quoteAyat: {
    verse: string;
    source: string;
    translation: string;
  };
  events: WeddingEvent[];
  stories: LoveStoryItem[];
  gallery: GalleryMedia[];
  bankAccounts: BankAccount[];
  physicalGiftAddress?: {
    recipient: string;
    phone: string;
    address: string;
  };
  audioTrack: {
    title: string;
    artist: string;
    sourceType?: 'preset' | 'spotify' | 'custom_url';
    spotifyUrl?: string; // Spotify track or playlist URL
    customAudioUrl?: string; // Direct audio URL
    soundType: 'synth-gamelan' | 'synth-rindik' | 'synth-saluang' | 'synth-piano' | 'synth-acoustic' | 'synth-strings';
    autoplay?: boolean;
  };
  isLiveFeedActive: boolean; // Fitur Hari-H Album Bersama
  liveFeedPhotos: LiveFeedPhoto[];
  standingBannerConfig?: {
    title: string;
    subtitle: string;
    showPhoto: boolean;
    showOrnaments: boolean;
    customNotice: string;
    hallName: string;
    bannerFormat: 'rollup_60x160' | 'xbanner_60x160' | 'table_standee_a4';
  };
  attendanceConfig?: {
    isEnabled: boolean;
    checkInCode: string;
    welcomeTitle: string;
    welcomeMessage: string;
    tableGuideNote: string;
    enableSouvenirRedemption: boolean;
  };
  dockConfig?: {
    showAddPhotoLeft: boolean;
    showQrisRight: boolean;
    showCheckInCenter: boolean;
  };
  rsvps: RSVPItem[];
  protocolNotes: string[];
  guestRecipients: GuestRecipient[];
  analytics?: {
    views: number;
    rsvpsCount: number;
    wishesCount: number;
    lastVisited?: string;
  };
}

