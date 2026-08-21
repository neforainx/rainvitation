import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FolderHeart,
  Eye,
  QrCode,
  Search,
  Smartphone,
  Heart,
  Sliders,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Calendar,
  MapPin,
  Gift
} from 'lucide-react';
import { ThemeConfig, WeddingInvitation } from '../types';
import { WEDDING_THEMES } from '../data/themes';
import { WeddingOrnament } from './Ornaments';
import { GoogleUser } from '../utils/googleOAuth';

interface LandingPageProps {
  currentUser: GoogleUser | null;
  currentTheme: ThemeConfig;
  invitation: WeddingInvitation;
  onSelectAndPreviewTheme: (theme: ThemeConfig) => void;
  onCustomizeTheme: (theme: ThemeConfig) => void;
  onOpenStudio: () => void;
  onOpenDriveModal: () => void;
  onOpenAuthModal: () => void;
  onSignOut: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  currentUser,
  currentTheme,
  invitation,
  onSelectAndPreviewTheme,
  onCustomizeTheme,
  onOpenStudio,
  onOpenDriveModal,
  onOpenAuthModal,
  onSignOut,
}) => {
  const [activeNav, setActiveNav] = useState<'home' | 'template' | 'about'>('home');
  const [templateFilter, setTemplateFilter] = useState<'all' | 'adat' | 'modern' | 'standard' | 'premium'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset pagination when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [templateFilter, searchQuery]);

  // Filter templates
  const filteredThemes = WEDDING_THEMES.filter((t) => {
    let matchesTab = true;
    if (templateFilter === 'adat') matchesTab = t.category === 'adat';
    else if (templateFilter === 'modern') matchesTab = t.category === 'modern';
    else if (templateFilter === 'standard') matchesTab = !t.isPremium;
    else if (templateFilter === 'premium') matchesTab = t.isPremium;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      t.name.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.tagline.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredThemes.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredThemes.length);
  const paginatedThemes = filteredThemes.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-[#071F15] text-white font-sans selection:bg-emerald-500 selection:text-black relative overflow-x-hidden">
      {/* ================= BACKGROUND MOTIF DAUN-DAUN & BUNGA PUTIH PUDAR ================= */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Deep Emerald Ambient Velvet Glows */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-emerald-600/15 blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[650px] h-[650px] rounded-full bg-teal-800/20 blur-[140px]" />

        {/* 1. Real Botanical Floral & Leaves Texture Image in Faded Translucent White */}
        <div
          className="absolute inset-0 opacity-[0.14] mix-blend-screen bg-cover bg-center pointer-events-none filter brightness-150 grayscale"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />

        {/* 2. Full-Canvas Visible Faded White Floral & Botanical Leaf Patterns */}
        <div className="absolute inset-0">
          {/* TOP-LEFT: White Faded Monstera & Jasmine Blossoms */}
          <motion.div
            animate={{ rotate: [-1, 2, -1], y: [0, -6, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 -left-4 sm:top-2 sm:left-2 w-64 sm:w-96 h-64 sm:h-96 opacity-35"
          >
            <svg viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
              {/* Monstera Big Leaf in Faded White */}
              <path
                d="M40 30 C120 35 220 95 230 200 C190 205 170 175 160 150 C145 170 125 155 120 130 C100 150 80 130 70 100 C50 90 45 60 40 30 Z"
                fill="currentColor"
                fillOpacity="0.2"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeOpacity="0.6"
              />
              <path d="M45 35 Q130 115 225 195" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.7" />
              <path d="M95 80 Q140 60 175 75" stroke="currentColor" strokeWidth="2" strokeOpacity="0.6" />
              <path d="M130 115 Q175 105 200 120" stroke="currentColor" strokeWidth="2" strokeOpacity="0.6" />
              <path d="M165 150 Q195 145 215 160" stroke="currentColor" strokeWidth="2" strokeOpacity="0.6" />

              {/* Second Palm Frond in Faded White */}
              <path
                d="M20 140 Q110 150 190 240 Q100 230 20 140 Z"
                fill="currentColor"
                fillOpacity="0.15"
                stroke="currentColor"
                strokeWidth="2"
                strokeOpacity="0.5"
              />
              <path d="M50 155 Q90 135 110 145" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.6" />
              <path d="M80 175 Q125 155 145 168" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.6" />

              {/* White Jasmine Blossom 1 */}
              <g transform="translate(170, 80)">
                <circle cx="20" cy="20" r="7" fill="currentColor" fillOpacity="0.5" />
                <path d="M20 20 C14 2 26 2 20 20 Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
                <path d="M20 20 C38 14 38 26 20 20 Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
                <path d="M20 20 C26 38 14 38 20 20 Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
                <path d="M20 20 C2 26 2 14 20 20 Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
              </g>

              {/* White Jasmine Blossom 2 */}
              <g transform="translate(100, 160)">
                <circle cx="16" cy="16" r="6" fill="currentColor" fillOpacity="0.5" />
                <path d="M16 16 C10 2 22 2 16 16 Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
                <path d="M16 16 C30 10 30 22 16 16 Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
                <path d="M16 16 C22 30 10 30 16 16 Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
                <path d="M16 16 C2 22 2 10 16 16 Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
              </g>
            </svg>
          </motion.div>

          {/* TOP-RIGHT: White Faded Vines, Sakura & Floral Spray */}
          <motion.div
            animate={{ rotate: [1.5, -1.5, 1.5], y: [0, 8, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 -right-4 sm:top-2 sm:right-2 w-64 sm:w-96 h-64 sm:h-96 opacity-35"
          >
            <svg viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
              <path d="M330 20 Q190 70 130 200" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6" />
              <path d="M330 20 Q220 140 170 260" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5" />

              {/* Faded White Leaves */}
              <path d="M280 40 Q265 15 290 15 Q298 35 280 40 Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
              <path d="M235 65 Q210 45 230 35 Q248 50 235 65 Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
              <path d="M190 100 Q165 80 185 70 Q200 90 190 100 Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
              <path d="M150 150 Q120 135 135 115 Q158 130 150 150 Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />

              {/* White Blossom Cluster */}
              <g transform="translate(200, 50)">
                <circle cx="22" cy="22" r="7" fill="currentColor" fillOpacity="0.6" />
                <circle cx="22" cy="8" r="9" fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
                <circle cx="36" cy="22" r="9" fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
                <circle cx="22" cy="36" r="9" fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
                <circle cx="8" cy="22" r="9" fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
              </g>
            </svg>
          </motion.div>

          {/* BOTTOM-LEFT: White Faded Botanical Fern & Fronds */}
          <motion.div
            animate={{ rotate: [-2, 2, -2], x: [0, 6, 0] }}
            transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-8 -left-8 sm:bottom-2 sm:left-4 w-72 sm:w-96 h-72 sm:h-96 opacity-30"
          >
            <svg viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
              <path d="M20 330 Q100 230 220 190" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6" />
              <path d="M50 290 Q15 255 40 230 Q80 255 50 290 Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.8" strokeOpacity="0.6" />
              <path d="M90 255 Q55 210 85 190 Q118 220 90 255 Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.8" strokeOpacity="0.6" />
              <path d="M135 225 Q105 175 140 160 Q162 195 135 225 Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.8" strokeOpacity="0.6" />
            </svg>
          </motion.div>

          {/* BOTTOM-RIGHT: White Faded Lotus & Floral Wreath */}
          <motion.div
            animate={{ rotate: [2, -2, 2], y: [0, -6, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-8 -right-8 sm:bottom-2 sm:right-4 w-72 sm:w-96 h-72 sm:h-96 opacity-30"
          >
            <svg viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
              <path d="M330 330 Q240 230 150 200" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6" />
              <path d="M295 290 Q325 255 300 230 Q265 255 295 290 Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.8" strokeOpacity="0.6" />
              <path d="M255 255 Q285 210 260 190 Q225 220 255 255 Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.8" strokeOpacity="0.6" />
              {/* White Lotus in Faded Translucent White */}
              <circle cx="160" cy="195" r="9" fill="currentColor" fillOpacity="0.5" />
              <path d="M160 178 C148 160 172 160 160 178 Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
              <path d="M178 195 C195 183 195 207 178 195 Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
              <path d="M160 212 C172 230 148 230 160 212 Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
              <path d="M142 195 C125 207 125 183 142 195 Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
            </svg>
          </motion.div>
        </div>

        {/* Subtle Silk Texture Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Mac/iOS Liquid Glass Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-2.5 backdrop-blur-2xl bg-[#071F15]/90 border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo & Name: Rainvitation */}
          <div
            onClick={() => setActiveNav('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <span className="text-base sm:text-lg font-bold tracking-tight text-white font-sans">
              Rainvitation
            </span>
          </div>

          {/* Center Navigation Links: Home, Template, About */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
            <button
              id="nav-home-btn"
              type="button"
              onClick={() => setActiveNav('home')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeNav === 'home'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </button>
            <button
              id="nav-template-btn"
              type="button"
              onClick={() => setActiveNav('template')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeNav === 'template'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Template
            </button>
            <button
              id="nav-about-btn"
              type="button"
              onClick={() => setActiveNav('about')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeNav === 'about'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              About
            </button>
          </nav>

          {/* Right Action: User Avatar / Sign In (Clean, No Technical Words) */}
          <div className="flex items-center gap-2.5">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 p-1 pl-2.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xl">
                  <span className="text-xs font-bold text-white max-w-[100px] sm:max-w-[140px] truncate">
                    {currentUser.name}
                  </span>
                  <img
                    src={currentUser.picture}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-full object-cover border border-white/40"
                  />
                  <button
                    id="btn-nav-signout"
                    type="button"
                    onClick={onSignOut}
                    title="Keluar"
                    className="p-1 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                id="btn-nav-signin"
                type="button"
                onClick={onOpenAuthModal}
                className="px-4 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-bold shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                Sign in with Google
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden items-center justify-around pt-2 border-t border-white/5 mt-1.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveNav('home')}
            className={`pb-1 border-b-2 transition-all ${
              activeNav === 'home'
                ? 'border-emerald-400 text-emerald-400 font-bold'
                : 'border-transparent text-slate-400'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => setActiveNav('template')}
            className={`pb-1 border-b-2 transition-all ${
              activeNav === 'template'
                ? 'border-emerald-400 text-emerald-400 font-bold'
                : 'border-transparent text-slate-400'
            }`}
          >
            Template
          </button>
          <button
            type="button"
            onClick={() => setActiveNav('about')}
            className={`pb-1 border-b-2 transition-all ${
              activeNav === 'about'
                ? 'border-emerald-400 text-emerald-400 font-bold'
                : 'border-transparent text-slate-400'
            }`}
          >
            About
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-3 sm:py-6">
        {/* ================= SECTION: HOME (3 WHITE PLAYING CARDS IN LAYERED DECK) ================= */}
        {activeNav === 'home' && (
          <div className="flex flex-col items-center justify-between text-center relative py-1 sm:py-2 space-y-5 sm:space-y-7">
            {/* Headline & CTA Block */}
            <div className="space-y-2.5 sm:space-y-3 max-w-2xl mx-auto">
              <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-white/10 text-emerald-300 border border-white/20 backdrop-blur-md">
                PLATFORM UNDANGAN DIGITAL NUSANTARA
              </span>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug font-sans">
                Satu akun untuk seluruh momen pernikahan
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                Undangan digital elegan berpadu ornamen seni budaya nusantara, kemudahan konfirmasi kehadiran tamu, dan kenangan indah yang abadi.
              </p>

              {/* Single Prominent CTA Button */}
              <div className="pt-1">
                <button
                  id="btn-hero-get-started"
                  type="button"
                  onClick={() => setActiveNav('template')}
                  className="px-7 py-2.5 rounded-full bg-[#4ADE80] hover:bg-[#22C55E] text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  Mulai Buat Undangan
                </button>
              </div>
            </div>

            {/* ================= 3 WHITE PLAYING CARDS IN LAYERED DECK ================= */}
            <div className="w-full max-w-4xl mx-auto relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 pt-2 pb-6 min-h-[390px] sm:min-h-[430px]">
              
              {/* CARD 1 (LEFT): WHITE CARD - Sampul & Foto Mempelai (Rotated Left Layered Card) */}
              <motion.div
                initial={{ opacity: 0, x: -30, rotate: -8 }}
                animate={{ opacity: 1, x: 0, rotate: -8 }}
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 40 }}
                transition={{ duration: 0.4 }}
                onClick={() => onSelectAndPreviewTheme(currentTheme)}
                className="w-full max-w-[280px] sm:max-w-[290px] rounded-[28px] bg-white text-slate-900 border border-slate-200/80 p-3.5 shadow-2xl relative overflow-hidden flex flex-col justify-between cursor-pointer group md:absolute md:left-[8%] lg:left-[12%] z-10 transition-all"
              >
                {/* Visual Invitation Website Cover Image */}
                <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={currentTheme.previewImage || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"}
                    alt="Sampul Undangan"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-500 text-white uppercase tracking-wider shadow-sm">
                      Sampul Adat
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-2.5 right-2.5 text-center">
                    <p className="text-[10px] text-amber-300 font-serif tracking-widest uppercase">The Wedding of</p>
                    <h3 className="text-lg font-bold font-serif text-white leading-tight">
                      {invitation.groom.nickname} & {invitation.bride.nickname}
                    </h3>
                  </div>
                </div>

                <div className="pt-3">
                  <div className="w-full py-2.5 px-3 rounded-full bg-slate-900 group-hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all">
                    <Heart className="w-3.5 h-3.5 fill-current text-rose-400" />
                    <span>Buka Undangan</span>
                  </div>
                </div>
              </motion.div>

              {/* CARD 2 (CENTER): WHITE CARD - Rangkaian Acara Akad & Resepsi (Elevated Front Stage) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.08, zIndex: 40 }}
                transition={{ duration: 0.4 }}
                onClick={() => onSelectAndPreviewTheme(currentTheme)}
                className="w-full max-w-[290px] sm:max-w-[310px] rounded-[28px] bg-white text-slate-900 border-2 border-emerald-500 p-4 shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col justify-between cursor-pointer group z-30 md:scale-105 transition-all"
              >
                {/* Visual Ceremony Image */}
                <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                    alt="Rangkaian Acara"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black bg-amber-500 text-white uppercase tracking-wider shadow-sm">
                      Jadwal Hari-H
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-2.5 right-2.5 text-center">
                    <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">WAKTU & TEMPAT</p>
                    <h3 className="text-lg font-bold font-serif text-white leading-tight">
                      Akad & Resepsi
                    </h3>
                  </div>
                </div>

                <div className="pt-3">
                  <div className="w-full py-2.5 px-3 rounded-full bg-emerald-600 group-hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all">
                    <MapPin className="w-3.5 h-3.5 text-white" />
                    <span>Petunjuk Arah & Peta</span>
                  </div>
                </div>
              </motion.div>

              {/* CARD 3 (RIGHT): WHITE CARD - Galeri Kenangan & Amplop Kasih (Rotated Right Layered Card) */}
              <motion.div
                initial={{ opacity: 0, x: 30, rotate: 8 }}
                animate={{ opacity: 1, x: 0, rotate: 8 }}
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 40 }}
                transition={{ duration: 0.4 }}
                onClick={() => onSelectAndPreviewTheme(currentTheme)}
                className="w-full max-w-[280px] sm:max-w-[290px] rounded-[28px] bg-white text-slate-900 border border-slate-200/80 p-3.5 shadow-2xl relative overflow-hidden flex flex-col justify-between cursor-pointer group md:absolute md:right-[8%] lg:right-[12%] z-20 transition-all"
              >
                {/* Visual Moments & Gallery Image */}
                <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
                    alt="Galeri & Ucapan"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black bg-blue-500 text-white uppercase tracking-wider shadow-sm">
                      RSVP & Kasih
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-2.5 right-2.5 text-center">
                    <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">DOA & HADIAH</p>
                    <h3 className="text-lg font-bold font-serif text-white leading-tight">
                      Amplop & Kenangan
                    </h3>
                  </div>
                </div>

                <div className="pt-3">
                  <div className="w-full py-2.5 px-3 rounded-full bg-slate-900 group-hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all">
                    <Gift className="w-3.5 h-3.5 text-amber-300" />
                    <span>Kirim Doa & Amplop</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* ================= SECTION: TEMPLATE (Clean, no counts, animated batik ukiran) ================= */}
        {activeNav === 'template' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Template Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  KATALOG LENGKAP TEMPLATE
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white mt-1">
                  Koleksi Tema Adat Nusantara & Modern
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                  Lengkap dengan animasi ukiran batik otentik khas masing-masing adat.
                </p>
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari: Jawa, Sunda, Minang, Bali..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 backdrop-blur-xl"
                />
              </div>
            </div>

            {/* Filter Pills without count numbers */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar text-xs font-semibold">
              <button
                type="button"
                onClick={() => setTemplateFilter('all')}
                className={`px-3.5 py-1.5 rounded-full transition-all flex-shrink-0 cursor-pointer ${
                  templateFilter === 'all'
                    ? 'bg-white text-slate-900 font-bold shadow-md'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                Semua
              </button>
              <button
                type="button"
                onClick={() => setTemplateFilter('adat')}
                className={`px-3.5 py-1.5 rounded-full transition-all flex-shrink-0 cursor-pointer ${
                  templateFilter === 'adat'
                    ? 'bg-white text-slate-900 font-bold shadow-md'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                Adat Nusantara
              </button>
              <button
                type="button"
                onClick={() => setTemplateFilter('modern')}
                className={`px-3.5 py-1.5 rounded-full transition-all flex-shrink-0 cursor-pointer ${
                  templateFilter === 'modern'
                    ? 'bg-white text-slate-900 font-bold shadow-md'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                Modern & Minimalis
              </button>
              <button
                type="button"
                onClick={() => setTemplateFilter('standard')}
                className={`px-3.5 py-1.5 rounded-full transition-all flex-shrink-0 cursor-pointer ${
                  templateFilter === 'standard'
                    ? 'bg-white text-slate-900 font-bold shadow-md'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                Standar (Rp 75k)
              </button>
              <button
                type="button"
                onClick={() => setTemplateFilter('premium')}
                className={`px-3.5 py-1.5 rounded-full transition-all flex-shrink-0 cursor-pointer ${
                  templateFilter === 'premium'
                    ? 'bg-emerald-400 text-slate-950 font-bold shadow-md'
                    : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30'
                }`}
              >
                ⭐ Premium (Rp 150k)
              </button>
            </div>

            {/* Template Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedThemes.map((theme) => {
                return (
                  <motion.div
                    key={theme.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`rounded-[28px] overflow-hidden bg-[#0A2419] border transition-all flex flex-col justify-between shadow-xl ${
                      theme.isPremium
                        ? 'border-emerald-500/40 hover:border-emerald-400'
                        : 'border-white/10 hover:border-white/25'
                    }`}
                  >
                    {/* Visual Banner Preview */}
                    <div className="relative h-48 overflow-hidden bg-slate-900">
                      <img
                        src={theme.previewImage}
                        alt={theme.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A2419] via-black/40 to-transparent" />

                      {/* Badge Top Left */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase backdrop-blur-md ${
                            theme.isPremium
                              ? 'bg-emerald-400 text-slate-950 shadow-md'
                              : 'bg-black/60 text-white border border-white/20'
                          }`}
                        >
                          {theme.isPremium ? 'PREMIUM ⭐' : 'STANDAR'}
                        </span>
                      </div>

                      {/* Price Tag Top Right */}
                      <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-bold text-white">
                        {theme.isPremium ? 'Rp 150k' : 'Rp 75k'}
                      </div>

                      {/* Animated Batik Ukiran Ornament Showcase */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5 text-white">
                        <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center flex-shrink-0 shadow-lg">
                          <WeddingOrnament
                            type={theme.ornamentStyle}
                            className="w-6 h-6 text-emerald-300"
                            color="#6EE7B7"
                            isAnimated={true}
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold font-serif leading-snug truncate">
                            {theme.name}
                          </h3>
                          <p className="text-[10px] text-emerald-300 truncate">
                            {theme.tagline}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Cultural Batik Ukiran Badge */}
                        <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-[10px] text-slate-200 mb-2">
                          <WeddingOrnament
                            type={theme.ornamentStyle}
                            className="w-3.5 h-3.5 text-amber-400 flex-shrink-0"
                            color="#FBBF24"
                            isAnimated={true}
                          />
                          <span className="font-semibold truncate">
                            Ukiran Khas: <strong className="text-amber-300">{theme.badge}</strong>
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {theme.description}
                        </p>
                      </div>

                      {/* Action Buttons: Pratinjau & Beli/Kustomisasi */}
                      <div className="pt-2.5 border-t border-white/10 flex items-center gap-2">
                        <button
                          id={`btn-preview-${theme.id}`}
                          type="button"
                          onClick={() => onSelectAndPreviewTheme(theme)}
                          className="flex-1 py-2 px-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                        >
                          <Eye className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Pratinjau</span>
                        </button>

                        <button
                          id={`btn-customize-${theme.id}`}
                          type="button"
                          onClick={() => onCustomizeTheme(theme)}
                          className={`flex-1 py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95 ${
                            theme.isPremium
                              ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold'
                              : 'bg-white hover:bg-slate-100 text-slate-950'
                          }`}
                        >
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Pilih & Edit</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination Controls without count numbers */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <span className="text-xs text-slate-400">
                  Halaman <strong className="text-white">{currentPage}</strong> dari <strong className="text-white">{totalPages}</strong>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 border transition-all cursor-pointer ${
                      currentPage === 1
                        ? 'opacity-40 cursor-not-allowed border-white/5 bg-white/5 text-slate-400'
                        : 'border-white/15 bg-white/10 text-white hover:bg-white/20 active:scale-95'
                    }`}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Sebelumnya</span>
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-emerald-400 text-slate-950 shadow-md font-extrabold'
                          : 'bg-white/5 text-slate-300 hover:bg-white/15'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 border transition-all cursor-pointer ${
                      currentPage === totalPages
                        ? 'opacity-40 cursor-not-allowed border-white/5 bg-white/5 text-slate-400'
                        : 'border-white/15 bg-white/10 text-white hover:bg-white/20 active:scale-95'
                    }`}
                  >
                    <span>Selanjutnya</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= SECTION: ABOUT (Warm, non-technical, refined) ================= */}
        {activeNav === 'about' && (
          <div className="space-y-8 max-w-4xl mx-auto py-2">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                TENTANG RAINVITATION
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-sans text-white">
                Melestarikan Budaya Melalui Sentuhan Digital Modern
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Rainvitation memadukan keagungan tradisi pernikahan adat nusantara dengan tampilan modern yang bersih, cepat, dan elegan.
              </p>
            </div>

            {/* 3 Key Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-2">
                <div className="w-9 h-9 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
                <h3 className="text-sm font-bold text-white">Otentisitas Adat Nusantara</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Setiap motif budaya seperti Gunungan Wayang Jawa, Kujang Pasundan, Rumah Gadang Minang, hingga Ukiran Sape Dayak dihadirkan penuh makna dan sakral.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-2">
                <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <FolderHeart className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">Galeri & Album Kenangan</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ruang privat untuk menyimpan kenangan indah, foto-foto resepsi bersama keluarga dan ucapan doa restu tamu.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-2">
                <div className="w-9 h-9 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">Desain Eksklusif & Elegan</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tampilan mewah dan nyaman dipandang di semua perangkat, tanpa iklan maupun gangguan.
                </p>
              </div>
            </div>

            {/* CTA Box */}
            <div className="p-6 rounded-[30px] bg-[#0A2419] border border-white/15 text-center space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-white">Mulai Pengalaman Undangan Digital Terbaik</h3>
              <p className="text-xs text-slate-300 max-w-lg mx-auto">
                Siap membagikan kabar bahagia kepada sahabat dan keluarga besar? Buat undangan Anda sekarang dalam hitungan menit.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setActiveNav('template')}
                  className="px-6 py-2.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-emerald-400/20 cursor-pointer transition-all active:scale-95"
                >
                  Jelajahi Koleksi Template
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating QR Modal for Mobile Preview */}
      <AnimatePresence>
        {showQrModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQrModal(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-[#0E1713] rounded-[32px] p-5 border border-white/20 text-center space-y-3 shadow-2xl"
            >
              <h3 className="text-sm font-bold text-white">Scan untuk Pratinjau di HP</h3>
              <p className="text-xs text-slate-300">
                Arahkan kamera smartphone Anda ke QR code ini untuk melihat tampilan undangan secara langsung di perangkat seluler.
              </p>
              <div className="w-40 h-40 bg-white p-2.5 rounded-2xl mx-auto flex items-center justify-center">
                <QrCode className="w-36 h-36 text-slate-900" />
              </div>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="w-full py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all cursor-pointer"
              >
                Tutup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
