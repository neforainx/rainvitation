import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  HardDrive,
  Check,
  Search,
  Filter,
  Eye,
  CreditCard,
  Crown,
  ChevronRight,
  UserCheck,
  LogOut,
  Layers,
  Heart,
  Music,
  Sliders,
  FolderHeart,
  ArrowLeft
} from 'lucide-react';
import { ThemeConfig, WeddingInvitation } from '../types';
import { WEDDING_THEMES } from '../data/themes';
import { WeddingOrnament } from './Ornaments';
import { formatRupiah } from '../data/pricingPlans';

interface TemplateLibraryScreenProps {
  currentThemeId: string;
  userName?: string;
  userEmail?: string;
  userPhoto?: string;
  isDriveConnected: boolean;
  onSelectAndPreviewTheme: (theme: ThemeConfig) => void;
  onBuyAndCustomize: (theme: ThemeConfig) => void;
  onOpenDriveModal: () => void;
  onOpenStudio: () => void;
  onGoBack: () => void;
  onSignOut: () => void;
}

type FilterTab = 'all' | 'adat' | 'luxury' | 'floral' | 'modern' | 'drive' | 'standard' | 'premium';

export const TemplateLibraryScreen: React.FC<TemplateLibraryScreenProps> = ({
  currentThemeId,
  userName = 'Calon Mempelai',
  userEmail = '',
  userPhoto,
  isDriveConnected,
  onSelectAndPreviewTheme,
  onBuyAndCustomize,
  onOpenDriveModal,
  onOpenStudio,
  onGoBack,
  onSignOut,
}) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThemeForDetail, setSelectedThemeForDetail] = useState<ThemeConfig | null>(null);

  const filteredThemes = WEDDING_THEMES.filter((t) => {
    let matchesTab = true;
    if (activeTab === 'adat') matchesTab = t.category === 'adat';
    else if (activeTab === 'luxury') matchesTab = t.category === 'luxury';
    else if (activeTab === 'floral') matchesTab = t.category === 'floral';
    else if (activeTab === 'modern') matchesTab = t.category === 'modern';
    else if (activeTab === 'drive') matchesTab = !!t.sourceDriveFolder || t.category === 'cloned-drive' || t.badge.includes('DRIVE');
    else if (activeTab === 'standard') matchesTab = !t.isPremium;
    else if (activeTab === 'premium') matchesTab = t.isPremium;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      t.name.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.tagline.toLowerCase().includes(query) ||
      t.badge.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 pb-28 pt-3 px-3 sm:px-6 relative select-text font-sans">
      {/* Background Soft Pastel Glows */}
      <div className="fixed top-[-5%] right-[-5%] w-[400px] h-[400px] rounded-full bg-pink-100/40 blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full bg-blue-100/40 blur-[120px] pointer-events-none -z-10" />

      {/* Main Container - Mobile Responsive */}
      <div className="max-w-4xl mx-auto space-y-5">
        {/* iOS Top Bar: User Profile & Drive Status */}
        <header className="flex items-center justify-between p-3.5 sm:p-4 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-3">
            <button
              id="btn-library-back"
              type="button"
              onClick={onGoBack}
              className="p-2 sm:px-3 sm:py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              title="Kembali ke Halaman Sebelumnya"
            >
              <ArrowLeft className="w-4 h-4 text-slate-700" />
              <span className="hidden sm:inline">Kembali</span>
            </button>

            <div className="relative">
              {userPhoto ? (
                <img
                  src={userPhoto}
                  alt={userName}
                  className="w-10 h-10 rounded-2xl object-cover border-2 border-white shadow-xs"
                />
              ) : (
                <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
              {isDriveConnected && (
                <span
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white"
                  title="Google Drive Terhubung"
                >
                  <HardDrive className="w-2.5 h-2.5" />
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                  {userName}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Google Drive Aktif
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate max-w-[180px] sm:max-w-xs">
                {userEmail || 'Penyimpanan Momen Cloud'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              id="btn-open-google-drive-vault"
              type="button"
              onClick={onOpenDriveModal}
              className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/80 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <FolderHeart className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Drive Vault</span>
            </button>

            <button
              id="btn-library-signout"
              type="button"
              onClick={onSignOut}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs cursor-pointer transition-all"
              title="Keluar Akun"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Pricing & Feature Comparison Banner (iOS Style) */}
        <section className="p-5 sm:p-6 rounded-[32px] bg-gradient-to-br from-white via-slate-50 to-amber-50/30 border border-white/90 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.04)] relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-amber-100/80 text-amber-900 border border-amber-200/60 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>KATALOG TEMPLATE RESMI</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 tracking-tight">
                Pilih Template Undangan Digital
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-lg leading-relaxed">
                Pilihan tema adat nusantara otentik & modern minimalis untuk momen bahagia Anda.
              </p>
            </div>

            {/* Price Cards Summary */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center min-w-[110px]">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Standar</span>
                <span className="text-base font-extrabold text-slate-900">Rp 75k</span>
                <span className="text-[9px] text-slate-400 block line-through">Rp 125k</span>
              </div>
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/80 shadow-xs text-center min-w-[110px] relative">
                <span className="absolute -top-2 right-2 px-1.5 py-0.2 rounded-full text-[8px] font-black bg-amber-500 text-white uppercase">
                  Best ⭐
                </span>
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Premium</span>
                <span className="text-base font-extrabold text-amber-900">Rp 150k</span>
                <span className="text-[9px] text-amber-600 block line-through">Rp 250k</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Pills & Search Box */}
        <div className="space-y-3">
          {/* iOS Segmented Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-2 rounded-full transition-all flex-shrink-0 cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              Semua ({WEDDING_THEMES.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('drive')}
              className={`px-3.5 py-2 rounded-full transition-all flex-shrink-0 cursor-pointer ${
                activeTab === 'drive'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200/80'
              }`}
            >
              📁 Google Drive ({WEDDING_THEMES.filter(t => !!t.sourceDriveFolder || t.category === 'cloned-drive' || t.badge.includes('DRIVE')).length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('adat')}
              className={`px-3.5 py-2 rounded-full transition-all flex-shrink-0 cursor-pointer ${
                activeTab === 'adat'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              Adat Nusantara
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('luxury')}
              className={`px-3.5 py-2 rounded-full transition-all flex-shrink-0 cursor-pointer ${
                activeTab === 'luxury'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200/80'
              }`}
            >
              Old Money & Luxury
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('floral')}
              className={`px-3.5 py-2 rounded-full transition-all flex-shrink-0 cursor-pointer ${
                activeTab === 'floral'
                  ? 'bg-rose-700 text-white shadow-sm'
                  : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200/80'
              }`}
            >
              Floral & Boho
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('modern')}
              className={`px-3.5 py-2 rounded-full transition-all flex-shrink-0 cursor-pointer ${
                activeTab === 'modern'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              Modern Minimalist
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('premium')}
              className={`px-3.5 py-2 rounded-full transition-all flex-shrink-0 cursor-pointer ${
                activeTab === 'premium'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              ⭐ Premium (Rp 150k)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('standard')}
              className={`px-3.5 py-2 rounded-full transition-all flex-shrink-0 cursor-pointer ${
                activeTab === 'standard'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              Standar (Rp 75k)
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari tema: Jawa, Sunda, Minang, Bali, Batak, Emerald, Rustic..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-white border border-slate-200/80 outline-none focus:ring-2 focus:ring-slate-900 text-slate-800 placeholder-slate-400 shadow-xs"
            />
          </div>
        </div>

        {/* Template Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredThemes.map((theme) => {
            const isCurrent = currentThemeId === theme.id;
            return (
              <motion.div
                key={theme.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`rounded-[30px] overflow-hidden bg-white border transition-all duration-300 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.08)] ${
                  theme.isPremium
                    ? 'border-amber-200 hover:border-amber-400'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {/* Visual Top Preview */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={theme.previewImage}
                    alt={theme.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                  {/* Badge Category & Premium Tag */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase backdrop-blur-md shadow-xs ${
                        theme.isPremium
                          ? 'bg-amber-500 text-white'
                          : 'bg-black/50 text-white border border-white/20'
                      }`}
                    >
                      {theme.isPremium ? 'PREMIUM ⭐' : 'STANDAR'}
                    </span>
                  </div>

                  {/* Price Tag on Top Right */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/90 shadow-sm text-right">
                    <span className="text-[11px] font-extrabold text-slate-900">
                      {theme.isPremium ? 'Rp 150k' : 'Rp 75k'}
                    </span>
                  </div>

                  {/* Bottom Header in Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5 text-white">
                    <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center flex-shrink-0">
                      <WeddingOrnament
                        type={theme.ornamentStyle}
                        className="w-6 h-6 text-white"
                        color="#FFFFFF"
                        isAnimated={theme.isPremium}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold font-serif leading-snug truncate">
                        {theme.name}
                      </h3>
                      <p className="text-[10px] text-slate-200 truncate">
                        {theme.tagline}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Cultural Animation Highlight Tag */}
                    {theme.isPremium ? (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200/70 text-[11px] text-amber-900 font-semibold mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                        <span className="truncate">Animasi Ukiran & Budaya Aktif</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 mb-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>Layout Bersih & Minimalis</span>
                      </div>
                    )}

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {theme.description}
                    </p>

                    {/* Features checklist */}
                    <div className="mt-2.5 space-y-1 text-[11px] text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Tersimpan di Google Drive Cloud</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Bebas Header & Footer (Immersive)</span>
                      </div>
                      {theme.isPremium && (
                        <div className="flex items-center gap-1.5 text-amber-800 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>Live Album Momen Tamu (Scan QR)</span>
                        </div>
                      )}
                      {theme.layoutArchetype && (
                        <div className="flex items-center gap-1.5 text-blue-700 font-medium text-[10px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          <span className="capitalize">Layout: {theme.layoutArchetype.replace('-', ' ')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons (Lihat Pratinjau & Beli) */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex items-center gap-2">
                      {/* Live Preview Button */}
                      <button
                        id={`btn-preview-theme-${theme.id}`}
                        type="button"
                        onClick={() => onSelectAndPreviewTheme(theme)}
                        className="flex-1 py-2.5 px-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Pratinjau</span>
                      </button>

                      {/* Buy / Customize Button */}
                      <button
                        id={`btn-buy-theme-${theme.id}`}
                        type="button"
                        onClick={() => onBuyAndCustomize(theme)}
                        className={`flex-1 py-2.5 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-all active:scale-[0.98] ${
                          theme.isPremium
                            ? 'bg-amber-600 hover:bg-amber-700 text-white'
                            : 'bg-slate-900 hover:bg-black text-white'
                        }`}
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Beli ({theme.isPremium ? '150k' : '75k'})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom Navigation Bar (iOS Style) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-full max-w-sm px-3">
        <div className="p-2 rounded-full bg-slate-900/90 backdrop-blur-xl border border-white/20 shadow-2xl text-white flex items-center justify-between">
          <button
            id="btn-floating-open-studio"
            type="button"
            onClick={onOpenStudio}
            className="flex-1 py-2.5 px-4 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>Studio Generator</span>
          </button>

          <button
            id="btn-floating-open-drive"
            type="button"
            onClick={onOpenDriveModal}
            className="flex-1 py-2.5 px-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>Google Drive</span>
          </button>
        </div>
      </div>
    </div>
  );
};
