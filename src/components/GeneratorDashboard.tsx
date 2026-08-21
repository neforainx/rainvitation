import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Palette,
  Users,
  Calendar,
  Image as ImageIcon,
  Gift,
  CreditCard,
  Globe,
  Plus,
  Trash2,
  ExternalLink,
  Smartphone,
  CheckCircle2,
  Sparkles,
  QrCode,
  Share2,
  Copy,
  Check,
  Eye,
  Camera,
  HeartHandshake,
  MessageCircle,
  HelpCircle,
  Clock,
  Upload,
  ArrowLeft,
  RefreshCw,
  Music,
  Disc3,
  Radio,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';

import {
  WeddingInvitation,
  ThemeConfig,
  PricingPlan,
  WeddingEvent,
  LoveStoryItem,
  BankAccount,
  GuestRecipient,
  GalleryMedia
} from '../types';
import { WEDDING_THEMES, getThemeById } from '../data/themes';
import { PRICING_PLANS, formatRupiah } from '../data/pricingPlans';
import { getInvitationBaseUrl, getGuestInvitationUrl } from '../utils/urlHelper';
import { StandingBannerModal } from './StandingBannerModal';
import { parseSpotifyUrl, POPULAR_SPOTIFY_PRESETS, SpotifyPreset } from '../utils/spotifyHelper';
import { audioEngine } from '../utils/audioEngine';

interface GeneratorDashboardProps {
  invitation: WeddingInvitation;
  theme: ThemeConfig;
  allInvitations: WeddingInvitation[];
  onSelectInvitation: (inv: WeddingInvitation) => void;
  onCreateNewInvitation: () => void;
  onUpdateInvitation: (updated: Partial<WeddingInvitation>) => void;
  onSelectTheme: (theme: ThemeConfig) => void;
  onOpenPricingModal: () => void;
  onOpenPublishModal: () => void;
  onOpenTemplateCatalog: () => void;
  onSwitchToGuestView: () => void;
  onGoBack: () => void;
  childrenMobilePreview: React.ReactNode;
}

type StudioTab =
  | 'design'
  | 'couples'
  | 'events'
  | 'stories_gallery'
  | 'music'
  | 'gifts'
  | 'banner_checkin'
  | 'livefeed_dock'
  | 'publish'
  | 'pricing';

// Helper to compress & read image files as Data URLs
const readImageFileAsDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 1200;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        } else {
          resolve(result);
        }
      };
      img.onerror = () => resolve(result);
      img.src = result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const GeneratorDashboard: React.FC<GeneratorDashboardProps> = ({
  invitation,
  theme,
  allInvitations,
  onSelectInvitation,
  onCreateNewInvitation,
  onUpdateInvitation,
  onSelectTheme,
  onOpenPricingModal,
  onOpenPublishModal,
  onOpenTemplateCatalog,
  onSwitchToGuestView,
  onGoBack,
  childrenMobilePreview
}) => {
  const [activeTab, setActiveTab] = useState<StudioTab>('design');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isUploadingGroom, setIsUploadingGroom] = useState(false);
  const [isUploadingBride, setIsUploadingBride] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [isStandingBannerModalOpen, setIsStandingBannerModalOpen] = useState(false);
  const [previewingSynth, setPreviewingSynth] = useState<string | null>(null);
  const [isTestingCustomAudio, setIsTestingCustomAudio] = useState<boolean>(false);
  const customAudioPreviewRef = useRef<HTMLAudioElement | null>(null);

  // Stop audio preview when navigating away
  useEffect(() => {
    return () => {
      audioEngine.stop();
      if (customAudioPreviewRef.current) {
        customAudioPreviewRef.current.pause();
        customAudioPreviewRef.current = null;
      }
    };
  }, []);

  const groomFileInputRef = useRef<HTMLInputElement | null>(null);
  const brideFileInputRef = useRef<HTMLInputElement | null>(null);
  const galleryFileInputRef = useRef<HTMLInputElement | null>(null);

  const currentPlan = PRICING_PLANS.find((p) => p.id === invitation.pricingTier) || PRICING_PLANS[1];
  const liveBaseUrl = getInvitationBaseUrl(invitation.slug);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(liveBaseUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Upload Groom Photo
  const handleGroomPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingGroom(true);
    try {
      const dataUrl = await readImageFileAsDataUrl(file);
      onUpdateInvitation({
        groom: { ...invitation.groom, photo: dataUrl }
      });
    } catch (err) {
      console.error('Failed reading photo:', err);
    } finally {
      setIsUploadingGroom(false);
    }
  };

  // Upload Bride Photo
  const handleBridePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingBride(true);
    try {
      const dataUrl = await readImageFileAsDataUrl(file);
      onUpdateInvitation({
        bride: { ...invitation.bride, photo: dataUrl }
      });
    } catch (err) {
      console.error('Failed reading photo:', err);
    } finally {
      setIsUploadingBride(false);
    }
  };

  // Upload Multiple Gallery Photos (Max 5 total)
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = Math.max(0, 5 - invitation.gallery.length);
    if (remainingSlots <= 0) return;

    setIsUploadingGallery(true);
    try {
      const filesToProcess = (Array.from(files) as File[]).slice(0, remainingSlots);
      const newItems: GalleryMedia[] = [];

      for (let i = 0; i < filesToProcess.length; i++) {
        const dataUrl = await readImageFileAsDataUrl(filesToProcess[i]);
        newItems.push({
          id: `gal-${Date.now()}-${i}`,
          url: dataUrl,
          caption: `Momen Kenangan #${invitation.gallery.length + i + 1}`,
          type: 'image'
        });
      }

      const updatedGallery = [...invitation.gallery, ...newItems].slice(0, 5);
      onUpdateInvitation({ gallery: updatedGallery });
    } catch (err) {
      console.error('Failed uploading gallery:', err);
    } finally {
      setIsUploadingGallery(false);
      if (galleryFileInputRef.current) {
        galleryFileInputRef.current.value = '';
      }
    }
  };

  // Upload Story Photo
  const handleStoryPhotoUpload = async (storyId: string, file: File) => {
    try {
      const dataUrl = await readImageFileAsDataUrl(file);
      const updated = invitation.stories.map((s) =>
        s.id === storyId ? { ...s, image: dataUrl } : s
      );
      onUpdateInvitation({ stories: updated });
    } catch (err) {
      console.error('Failed reading story photo:', err);
    }
  };

  // Helper to add a new event
  const handleAddEvent = () => {
    const newEvent: WeddingEvent = {
      id: `evt-${Date.now()}`,
      title: 'Resepsi Pernikahan',
      type: 'resepsi',
      date: invitation.weddingDate.slice(0, 10),
      timeStart: '11:00',
      timeEnd: '14:00',
      timezone: 'WIB',
      locationName: 'Gedung Pertemuan / Ballroom',
      address: 'Jl. Utama No. 1, Kota',
      mapsUrl: 'https://maps.google.com'
    };
    onUpdateInvitation({
      events: [...invitation.events, newEvent]
    });
  };

  const handleRemoveEvent = (id: string) => {
    onUpdateInvitation({
      events: invitation.events.filter((e) => e.id !== id)
    });
  };

  // Helper to add a new bank account
  const handleAddBankAccount = () => {
    const newAcc: BankAccount = {
      id: `bank-${Date.now()}`,
      bankName: 'BCA (Bank Central Asia)',
      accountNumber: '1234567890',
      accountHolder: invitation.groom.name.split(',')[0],
      logo: 'BCA'
    };
    onUpdateInvitation({
      bankAccounts: [...invitation.bankAccounts, newAcc]
    });
  };

  const handleRemoveBankAccount = (id: string) => {
    onUpdateInvitation({
      bankAccounts: invitation.bankAccounts.filter((b) => b.id !== id)
    });
  };

  // Helper to add a love story (max 5)
  const handleAddStory = () => {
    if (invitation.stories.length >= 5) return;
    const newStory: LoveStoryItem = {
      id: `story-${Date.now()}`,
      year: new Date().getFullYear().toString(),
      title: 'Momen Bahagia',
      description: 'Ceritakan kisah indah perjalanan cinta Anda berdua di sini...',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'
    };
    onUpdateInvitation({
      stories: [...invitation.stories, newStory].slice(0, 5)
    });
  };

  const handleRemoveStory = (id: string) => {
    onUpdateInvitation({
      stories: invitation.stories.filter((s) => s.id !== id)
    });
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-800 flex flex-col font-sans">
      {/* Top Studio Control Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Brand & Back Button & Project Selector */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            {/* Back Button to Previous Page */}
            <button
              id="btn-studio-back"
              type="button"
              onClick={onGoBack}
              className="p-2 sm:px-3.5 sm:py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
              title="Kembali ke Halaman Sebelumnya"
            >
              <ArrowLeft className="w-4 h-4 text-slate-700" />
              <span>Kembali</span>
            </button>

            <div className="flex items-center gap-2">
              <div>
                <h1 className="text-sm font-extrabold text-slate-900 leading-tight">
                  Rainvitation Studio
                </h1>
                <p className="text-[10px] text-slate-500 font-medium">
                  Platform Undangan Digital Premium
                </p>
              </div>
            </div>

            {/* Invitation Selector */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <select
                value={invitation.id}
                onChange={(e) => {
                  const found = allInvitations.find((inv) => inv.id === e.target.value);
                  if (found) onSelectInvitation(found);
                }}
                className="text-xs font-semibold bg-transparent border-none outline-none text-slate-800 px-2 py-1 max-w-[140px] truncate"
              >
                {allInvitations.map((inv) => (
                  <option key={inv.id} value={inv.id}>
                    /{inv.slug} ({inv.groom.name.split(',')[0]} & {inv.bride.name.split(',')[0]})
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={onCreateNewInvitation}
                className="p-1 rounded-lg bg-white hover:bg-slate-200 text-slate-700 shadow-2xs transition-colors"
                title="Buat Undangan Baru"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Actions (Package button removed as requested) */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {/* Copy Live Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Salin URL Publik"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden md:inline font-mono">/{invitation.slug}</span>
              <span>{copiedLink ? 'Tersalin' : 'Salin Link'}</span>
            </button>

            {/* Publish & Guest Links Modal Button */}
            <button
              type="button"
              id="btn-publish-studio"
              onClick={onOpenPublishModal}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Publish & Link Tamu</span>
            </button>

            {/* View As Guest / Mobile Screen */}
            <button
              type="button"
              id="btn-view-guest-mode"
              onClick={onSwitchToGuestView}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-900 hover:bg-black text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Tampilan Tamu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Body: Split View (Editor Pane + Live Mobile Preview) */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: BUILDER TABS & FORMS (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/80">
          {/* Tab Navigation Pill Bar */}
          <div className="flex p-1 bg-slate-100 rounded-2xl mb-6 overflow-x-auto gap-1 text-xs font-semibold scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab('design')}
              className={`py-2 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'design'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Desain & Tema</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('couples')}
              className={`py-2 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'couples'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Mempelai</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('events')}
              className={`py-2 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'events'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Acara & Lokasi</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('stories_gallery')}
              className={`py-2 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'stories_gallery'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Cerita & Galeri</span>
            </button>

            <button
              type="button"
              id="btn-tab-music"
              onClick={() => setActiveTab('music')}
              className={`py-2 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'music'
                  ? 'bg-white text-emerald-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              <Music className="w-3.5 h-3.5 text-[#1DB954]" />
              <span>Musik & Spotify</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('gifts')}
              className={`py-2 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'gifts'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Amplop Digital</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('banner_checkin')}
              className={`py-2 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'banner_checkin'
                  ? 'bg-white text-emerald-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Spanduk & Check-in</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('livefeed_dock')}
              className={`py-2 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'livefeed_dock'
                  ? 'bg-white text-purple-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-purple-700'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Live Feed & Dock</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('publish')}
              className={`py-2 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'publish'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Link & Tamu</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pricing')}
              className={`py-2 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'pricing'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-600 hover:text-amber-700'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Paket Bayar</span>
            </button>
          </div>

          {/* TAB 1: DESIGN & THEME */}
          {activeTab === 'design' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    Pilihan Template & Identitas Visual
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pilih dari 13+ ragam desain adat tradisional Indonesia dan modern minimalis.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenTemplateCatalog}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Buka Katalog Lengkap
                </button>
              </div>

              {/* Current Active Theme Preview Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-amber-50/40 border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={theme.previewImage}
                  alt={theme.name}
                  className="w-24 h-24 rounded-2xl object-cover border border-white shadow-sm flex-shrink-0"
                />
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      {theme.badge}
                    </span>
                    <span className="text-xs text-slate-400">• {theme.category.toUpperCase()}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{theme.name}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">{theme.description}</p>
                  <p className="text-[11px] text-amber-700 font-medium italic mt-1">"{theme.tagline}"</p>
                </div>
              </div>

              {/* Quick Template Swatches */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Pilih Cepat Template Populer:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {WEDDING_THEMES.slice(0, 8).map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        onSelectTheme(t);
                        onUpdateInvitation({ themeId: t.id });
                      }}
                      className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        theme.id === t.id
                          ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-400/20'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div
                          className="w-4 h-4 rounded-full border border-white"
                          style={{ backgroundColor: t.accentColor }}
                        />
                        {theme.id === t.id && (
                          <Check className="w-3.5 h-3.5 text-amber-600" />
                        )}
                      </div>
                      <div className="text-[11px] font-bold text-slate-800 line-clamp-1">
                        {t.name.split(' ')[0]} {t.name.split(' ')[1] || ''}
                      </div>
                      <div className="text-[9px] text-slate-400 capitalize">{t.category}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tagline & Verse Input */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tagline Undangan / Ucapan Pembuka:
                  </label>
                  <input
                    type="text"
                    value={invitation.heroTagline}
                    onChange={(e) => onUpdateInvitation({ heroTagline: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kutipan Ayat Suci / Doa Pernikahan:
                  </label>
                  <textarea
                    rows={3}
                    value={invitation.quoteAyat.verse}
                    onChange={(e) =>
                      onUpdateInvitation({
                        quoteAyat: { ...invitation.quoteAyat, verse: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <input
                      type="text"
                      placeholder="Sumber (e.g. QS. Ar-Rum: 21)"
                      value={invitation.quoteAyat.source}
                      onChange={(e) =>
                        onUpdateInvitation({
                          quoteAyat: { ...invitation.quoteAyat, source: e.target.value }
                        })
                      }
                      className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Arti / Terjemahan singkat"
                      value={invitation.quoteAyat.translation}
                      onChange={(e) =>
                        onUpdateInvitation({
                          quoteAyat: { ...invitation.quoteAyat, translation: e.target.value }
                        })
                      }
                      className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COUPLES (GROOM & BRIDE WITH PHOTO UPLOAD) */}
          {activeTab === 'couples' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  Data & Foto Mempelai Pria / Wanita
                </h3>
                <p className="text-xs text-slate-500">
                  Upload langsung foto mempelai dari perangkat Anda atau ubah data orang tua dan Instagram.
                </p>
              </div>

              {/* Groom Section */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                  MEMPELAI PRIA (GROOM)
                </span>

                {/* Photo Upload Card for Groom */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 border-2 border-blue-200 flex-shrink-0 shadow-xs">
                    {invitation.groom.photo ? (
                      <img
                        src={invitation.groom.photo}
                        alt="Foto Mempelai Pria"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <Camera className="w-8 h-8" />
                      </div>
                    )}
                    {isUploadingGroom && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <div className="text-xs font-bold text-slate-900">
                      Foto Profil Mempelai Pria
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Format JPG, PNG, atau WEBP. Foto akan otomatis ditampilkan rapi pada cover dan profil mempelai.
                    </p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <input
                        ref={groomFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleGroomPhotoUpload}
                        className="hidden"
                        id="upload-groom-photo"
                      />
                      <button
                        type="button"
                        onClick={() => groomFileInputRef.current?.click()}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all active:scale-95"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Foto Pria</span>
                      </button>
                      {invitation.groom.photo && (
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateInvitation({
                              groom: {
                                ...invitation.groom,
                                photo:
                                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
                              }
                            })
                          }
                          className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-semibold transition-colors"
                        >
                          Reset Foto
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Nama Panggilan:
                    </label>
                    <input
                      type="text"
                      value={invitation.groom.name}
                      onChange={(e) =>
                        onUpdateInvitation({
                          groom: { ...invitation.groom, name: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Nama Lengkap & Gelar:
                    </label>
                    <input
                      type="text"
                      value={invitation.groom.fullName}
                      onChange={(e) =>
                        onUpdateInvitation({
                          groom: { ...invitation.groom, fullName: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Urutan Anak:
                    </label>
                    <input
                      type="text"
                      placeholder="Putra Pertama dari"
                      value={invitation.groom.childNumber}
                      onChange={(e) =>
                        onUpdateInvitation({
                          groom: { ...invitation.groom, childNumber: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Nama Ayah:
                    </label>
                    <input
                      type="text"
                      value={invitation.groom.father}
                      onChange={(e) =>
                        onUpdateInvitation({
                          groom: { ...invitation.groom, father: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Nama Ibu:
                    </label>
                    <input
                      type="text"
                      value={invitation.groom.mother}
                      onChange={(e) =>
                        onUpdateInvitation({
                          groom: { ...invitation.groom, mother: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Username Instagram (Opsional):
                  </label>
                  <input
                    type="text"
                    placeholder="tanpa @"
                    value={invitation.groom.instagram || ''}
                    onChange={(e) =>
                      onUpdateInvitation({
                        groom: { ...invitation.groom, instagram: e.target.value }
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                  />
                </div>
              </div>

              {/* Bride Section */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-100 text-pink-800">
                  MEMPELAI WANITA (BRIDE)
                </span>

                {/* Photo Upload Card for Bride */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 border-2 border-pink-200 flex-shrink-0 shadow-xs">
                    {invitation.bride.photo ? (
                      <img
                        src={invitation.bride.photo}
                        alt="Foto Mempelai Wanita"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <Camera className="w-8 h-8" />
                      </div>
                    )}
                    {isUploadingBride && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <div className="text-xs font-bold text-slate-900">
                      Foto Profil Mempelai Wanita
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Format JPG, PNG, atau WEBP. Foto akan otomatis ditampilkan cantik pada cover dan profil mempelai.
                    </p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <input
                        ref={brideFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleBridePhotoUpload}
                        className="hidden"
                        id="upload-bride-photo"
                      />
                      <button
                        type="button"
                        onClick={() => brideFileInputRef.current?.click()}
                        className="px-3.5 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all active:scale-95"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Foto Wanita</span>
                      </button>
                      {invitation.bride.photo && (
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateInvitation({
                              bride: {
                                ...invitation.bride,
                                photo:
                                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
                              }
                            })
                          }
                          className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-semibold transition-colors"
                        >
                          Reset Foto
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Nama Panggilan:
                    </label>
                    <input
                      type="text"
                      value={invitation.bride.name}
                      onChange={(e) =>
                        onUpdateInvitation({
                          bride: { ...invitation.bride, name: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Nama Lengkap & Gelar:
                    </label>
                    <input
                      type="text"
                      value={invitation.bride.fullName}
                      onChange={(e) =>
                        onUpdateInvitation({
                          bride: { ...invitation.bride, fullName: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Urutan Anak:
                    </label>
                    <input
                      type="text"
                      placeholder="Putri Kedua dari"
                      value={invitation.bride.childNumber}
                      onChange={(e) =>
                        onUpdateInvitation({
                          bride: { ...invitation.bride, childNumber: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Nama Ayah:
                    </label>
                    <input
                      type="text"
                      value={invitation.bride.father}
                      onChange={(e) =>
                        onUpdateInvitation({
                          bride: { ...invitation.bride, father: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Nama Ibu:
                    </label>
                    <input
                      type="text"
                      value={invitation.bride.mother}
                      onChange={(e) =>
                        onUpdateInvitation({
                          bride: { ...invitation.bride, mother: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Username Instagram (Opsional):
                  </label>
                  <input
                    type="text"
                    placeholder="tanpa @"
                    value={invitation.bride.instagram || ''}
                    onChange={(e) =>
                      onUpdateInvitation({
                        bride: { ...invitation.bride, instagram: e.target.value }
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EVENTS & SCHEDULE */}
          {activeTab === 'events' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    Rangkaian Acara Pernikahan
                  </h3>
                  <p className="text-xs text-slate-500">
                    Atur jadwal akad, resepsi, pemberkatan, dan navigasi Google Maps.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddEvent}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Acara</span>
                </button>
              </div>

              {/* Main Wedding Date for Countdown */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
                <label className="block text-xs font-bold text-amber-950 mb-1">
                  Patokan Tanggal Utama (Untuk Countdown Timer):
                </label>
                <input
                  type="datetime-local"
                  value={invitation.weddingDate.slice(0, 16)}
                  onChange={(e) => onUpdateInvitation({ weddingDate: e.target.value })}
                  className="px-3 py-1.5 text-xs rounded-xl bg-white border border-amber-300 outline-none font-medium"
                />
              </div>

              {/* Events List */}
              <div className="space-y-4">
                {invitation.events.map((evt, index) => (
                  <div
                    key={evt.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 relative space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">
                        Acara #{index + 1}: {evt.title}
                      </span>
                      {invitation.events.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveEvent(evt.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                          Nama Acara:
                        </label>
                        <input
                          type="text"
                          value={evt.title}
                          onChange={(e) => {
                            const updated = invitation.events.map((ev) =>
                              ev.id === evt.id ? { ...ev, title: e.target.value } : ev
                            );
                            onUpdateInvitation({ events: updated });
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                          Tanggal Acara (YYYY-MM-DD):
                        </label>
                        <input
                          type="date"
                          value={evt.date}
                          onChange={(e) => {
                            const updated = invitation.events.map((ev) =>
                              ev.id === evt.id ? { ...ev, date: e.target.value } : ev
                            );
                            onUpdateInvitation({ events: updated });
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                          Jam Mulai:
                        </label>
                        <input
                          type="text"
                          value={evt.timeStart}
                          onChange={(e) => {
                            const updated = invitation.events.map((ev) =>
                              ev.id === evt.id ? { ...ev, timeStart: e.target.value } : ev
                            );
                            onUpdateInvitation({ events: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                          Jam Selesai:
                        </label>
                        <input
                          type="text"
                          value={evt.timeEnd}
                          onChange={(e) => {
                            const updated = invitation.events.map((ev) =>
                              ev.id === evt.id ? { ...ev, timeEnd: e.target.value } : ev
                            );
                            onUpdateInvitation({ events: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                          Zona Waktu:
                        </label>
                        <select
                          value={evt.timezone}
                          onChange={(e) => {
                            const updated = invitation.events.map((ev) =>
                              ev.id === evt.id ? { ...ev, timezone: e.target.value } : ev
                            );
                            onUpdateInvitation({ events: updated });
                          }}
                          className="w-full px-2 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                        >
                          <option value="WIB">WIB</option>
                          <option value="WITA">WITA</option>
                          <option value="WIT">WIT</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                        Nama Tempat / Gedung:
                      </label>
                      <input
                        type="text"
                        value={evt.locationName}
                        onChange={(e) => {
                          const updated = invitation.events.map((ev) =>
                            ev.id === evt.id ? { ...ev, locationName: e.target.value } : ev
                          );
                          onUpdateInvitation({ events: updated });
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                        Alamat Lengkap:
                      </label>
                      <input
                        type="text"
                        value={evt.address}
                        onChange={(e) => {
                          const updated = invitation.events.map((ev) =>
                            ev.id === evt.id ? { ...ev, address: e.target.value } : ev
                          );
                          onUpdateInvitation({ events: updated });
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                        Link URL Google Maps:
                      </label>
                      <input
                        type="text"
                        value={evt.mapsUrl}
                        onChange={(e) => {
                          const updated = invitation.events.map((ev) =>
                            ev.id === evt.id ? { ...ev, mapsUrl: e.target.value } : ev
                          );
                          onUpdateInvitation({ events: updated });
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none text-blue-600 font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}          {/* TAB 4: STORIES & GALLERY (MAX 5 PHOTOS EACH) */}
          {activeTab === 'stories_gallery' && (
            <div className="space-y-6">
              {/* Gallery Section - Upload Max 5 Photos */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900 font-serif">
                        Galeri Foto Prewedding
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {invitation.gallery.length} / 5 Foto
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Upload maksimal 5 foto kenangan terbaik Anda berdua.
                    </p>
                  </div>

                  {invitation.gallery.length < 5 && (
                    <div>
                      <input
                        ref={galleryFileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryUpload}
                        className="hidden"
                        id="upload-gallery-files"
                      />
                      <button
                        type="button"
                        onClick={() => galleryFileInputRef.current?.click()}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Foto</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Upload Notice or Drag Zone */}
                {invitation.gallery.length < 5 ? (
                  <div
                    onClick={() => galleryFileInputRef.current?.click()}
                    className="my-3 p-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100/80 transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-1.5"
                  >
                    <Upload className="w-6 h-6 text-slate-400" />
                    <span className="text-xs font-bold text-slate-700">
                      Klik atau Drag Foto ke sini untuk Upload (Sisa {5 - invitation.gallery.length} slot)
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Mendukung format JPG, PNG, atau WEBP
                    </span>
                  </div>
                ) : (
                  <div className="my-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Batas maksimal 5 foto galeri telah terpenuhi. Hapus foto untuk mengganti.</span>
                  </div>
                )}

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {invitation.gallery.map((media, idx) => (
                    <div
                      key={media.id}
                      className="group relative rounded-2xl overflow-hidden aspect-square border border-slate-200 bg-slate-100 shadow-xs"
                    >
                      <img
                        src={media.url}
                        alt={media.caption}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between text-white">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-black/50">
                            #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = invitation.gallery.filter((g) => g.id !== media.id);
                              onUpdateInvitation({ gallery: updated });
                            }}
                            className="p-1 rounded-lg bg-red-600/90 hover:bg-red-600 text-white cursor-pointer shadow-xs"
                            title="Hapus Foto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={media.caption}
                          placeholder="Caption foto..."
                          onChange={(e) => {
                            const updated = invitation.gallery.map((g) =>
                              g.id === media.id ? { ...g, caption: e.target.value } : g
                            );
                            onUpdateInvitation({ gallery: updated });
                          }}
                          className="w-full text-[10px] font-medium bg-white/20 backdrop-blur-md rounded-lg px-2 py-1 outline-none text-white placeholder-white/60"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Love Story Section */}
              <div className="pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900 font-serif">
                        Love Story Timeline
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
                        {invitation.stories.length} / 5 Kisah
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Bagikan momen perjalanan cinta Anda berdua (maksimal 5 momen).
                    </p>
                  </div>
                  {invitation.stories.length < 5 && (
                    <button
                      type="button"
                      onClick={handleAddStory}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1 cursor-pointer active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Momen</span>
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {invitation.stories.map((story) => (
                    <div
                      key={story.id}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 relative"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="text"
                            placeholder="Tahun"
                            value={story.year}
                            onChange={(e) => {
                              const updated = invitation.stories.map((s) =>
                                s.id === story.id ? { ...s, year: e.target.value } : s
                              );
                              onUpdateInvitation({ stories: updated });
                            }}
                            className="w-20 px-2 py-1 text-xs font-bold rounded-lg bg-white border border-slate-300 text-amber-700"
                          />
                          <input
                            type="text"
                            placeholder="Judul Momen"
                            value={story.title}
                            onChange={(e) => {
                              const updated = invitation.stories.map((s) =>
                                s.id === story.id ? { ...s, title: e.target.value } : s
                              );
                              onUpdateInvitation({ stories: updated });
                            }}
                            className="flex-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-white border border-slate-300"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveStory(story.id)}
                          className="p-1 text-slate-400 hover:text-red-600 transition-colors ml-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <textarea
                        rows={2}
                        placeholder="Deskripsi cerita singkat..."
                        value={story.description}
                        onChange={(e) => {
                          const updated = invitation.stories.map((s) =>
                            s.id === story.id ? { ...s, description: e.target.value } : s
                          );
                          onUpdateInvitation({ stories: updated });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-slate-300 outline-none"
                      />

                      {/* Story Photo Upload Button */}
                      <div className="flex items-center gap-3 pt-1">
                        {story.image ? (
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0">
                            <img
                              src={story.image}
                              alt={story.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : null}
                        <label className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs">
                          <Upload className="w-3 h-3 text-slate-500" />
                          <span>{story.image ? 'Ganti Foto Cerita' : 'Upload Foto Cerita'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleStoryPhotoUpload(story.id, file);
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: MUSIC & SPOTIFY INTEGRATION */}
          {activeTab === 'music' && (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-3xl bg-gradient-to-r from-emerald-50 via-slate-50 to-emerald-50/40 border border-emerald-200/60">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#121212] flex items-center justify-center text-[#1DB954] shadow-md">
                    <Music className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900 font-serif">
                        Musik Pengiring & Spotify
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#1DB954]/15 text-[#0d7331] border border-[#1DB954]/30 flex items-center gap-1">
                        <Disc3 className="w-3 h-3 text-[#1DB954] animate-spin" />
                        Spotify Ready
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Gunakan lagu atau playlist favorit dari Spotify, instrumen synthesizer tradisional, atau audio kustom.
                    </p>
                  </div>
                </div>
              </div>

              {/* Source Type Selector (Pills) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Pilih Sumber Musik Undangan:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Mode 1: Spotify */}
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateInvitation({
                        audioTrack: {
                          ...invitation.audioTrack,
                          sourceType: 'spotify',
                          spotifyUrl: invitation.audioTrack.spotifyUrl || 'https://open.spotify.com/track/59iQz3E8m03Jv8aZ8dG3rD',
                          title: invitation.audioTrack.title || 'Teman Hidup',
                          artist: invitation.audioTrack.artist || 'Tulus'
                        }
                      });
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                      invitation.audioTrack?.sourceType === 'spotify' || (!invitation.audioTrack?.sourceType && invitation.audioTrack?.spotifyUrl)
                        ? 'bg-slate-900 text-white border-emerald-500 shadow-md ring-2 ring-emerald-500/30'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#1DB954] flex items-center justify-center text-black">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                          </svg>
                        </div>
                        <span className="text-xs font-bold">Spotify (Rekomendasi)</span>
                      </div>
                      {(invitation.audioTrack?.sourceType === 'spotify' || (!invitation.audioTrack?.sourceType && invitation.audioTrack?.spotifyUrl)) && (
                        <CheckCircle2 className="w-4 h-4 text-[#1DB954]" />
                      )}
                    </div>
                    <span className="text-[11px] opacity-75">
                      Input link lagu / playlist Spotify resmi
                    </span>
                  </button>

                  {/* Mode 2: Synth Preset */}
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateInvitation({
                        audioTrack: {
                          ...invitation.audioTrack,
                          sourceType: 'preset',
                          title: theme.sampleMusic.title,
                          artist: theme.sampleMusic.genre,
                          soundType: theme.sampleMusic.type
                        }
                      });
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                      invitation.audioTrack?.sourceType === 'preset'
                        ? 'bg-slate-900 text-white border-amber-500 shadow-md ring-2 ring-amber-500/30'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Radio className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-bold">Synthesizer Tradisional</span>
                      </div>
                      {invitation.audioTrack?.sourceType === 'preset' && (
                        <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      )}
                    </div>
                    <span className="text-[11px] opacity-75">
                      Gamelan, Rindik, Saluang, Piano (Offline)
                    </span>
                  </button>

                  {/* Mode 3: Custom Audio File URL */}
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateInvitation({
                        audioTrack: {
                          ...invitation.audioTrack,
                          sourceType: 'custom_url',
                          customAudioUrl: invitation.audioTrack.customAudioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
                        }
                      });
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                      invitation.audioTrack?.sourceType === 'custom_url'
                        ? 'bg-slate-900 text-white border-blue-500 shadow-md ring-2 ring-blue-500/30'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Disc3 className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-bold">Link MP3 / Audio</span>
                      </div>
                      {invitation.audioTrack?.sourceType === 'custom_url' && (
                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                    <span className="text-[11px] opacity-75">
                      Direct link file .mp3 hosting sendiri
                    </span>
                  </button>
                </div>
              </div>

              {/* 🟢 CONFIGURATION FOR SPOTIFY MODE */}
              {(invitation.audioTrack?.sourceType === 'spotify' || (!invitation.audioTrack?.sourceType && invitation.audioTrack?.spotifyUrl)) && (
                <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 text-white space-y-5 border border-slate-800 shadow-lg">
                  {/* Spotify URL Input */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-200">
                        URL / Link Spotify (Track atau Playlist):
                      </label>
                      {invitation.audioTrack.spotifyUrl && parseSpotifyUrl(invitation.audioTrack.spotifyUrl).isValid && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1DB954]/20 text-[#1DB954] border border-[#1DB954]/40 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Link Spotify Valid ({parseSpotifyUrl(invitation.audioTrack.spotifyUrl).type?.toUpperCase()})
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <input
                        type="url"
                        placeholder="Contoh: https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT atau playlist"
                        value={invitation.audioTrack.spotifyUrl || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          const parsed = parseSpotifyUrl(val);
                          onUpdateInvitation({
                            audioTrack: {
                              ...invitation.audioTrack,
                              sourceType: 'spotify',
                              spotifyUrl: val
                            }
                          });
                        }}
                        className="w-full pl-3 pr-24 py-2.5 text-xs font-mono rounded-2xl bg-slate-800/90 border border-slate-700 text-emerald-300 focus:border-[#1DB954] focus:ring-1 focus:ring-[#1DB954] outline-none"
                      />
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            const text = await navigator.clipboard.readText();
                            if (text) {
                              onUpdateInvitation({
                                audioTrack: {
                                  ...invitation.audioTrack,
                                  sourceType: 'spotify',
                                  spotifyUrl: text
                                }
                              });
                            }
                          } catch (e) {
                            console.error('Clipboard paste error', e);
                          }
                        }}
                        className="absolute right-2 top-1.5 px-3 py-1 text-[10px] font-bold rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors cursor-pointer"
                      >
                        Paste Link
                      </button>
                    </div>
                  </div>

                  {/* LIVE SPOTIFY EMBED PREVIEW */}
                  {invitation.audioTrack.spotifyUrl && parseSpotifyUrl(invitation.audioTrack.spotifyUrl).isValid ? (
                    <div className="p-3.5 rounded-2xl bg-black/60 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span className="font-bold flex items-center gap-1.5 text-slate-200">
                          <Disc3 className="w-3.5 h-3.5 text-[#1DB954]" />
                          Pratinjau Widget Spotify Undangan:
                        </span>
                        <a
                          href={invitation.audioTrack.spotifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[#1DB954] hover:underline flex items-center gap-1"
                        >
                          Buka di Spotify App <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="w-full rounded-2xl overflow-hidden shadow-inner bg-black">
                        <iframe
                          title="Spotify Studio Preview"
                          src={parseSpotifyUrl(invitation.audioTrack.spotifyUrl).embedUrl!}
                          width="100%"
                          height={parseSpotifyUrl(invitation.audioTrack.spotifyUrl).type === 'playlist' || parseSpotifyUrl(invitation.audioTrack.spotifyUrl).type === 'album' ? '152' : '80'}
                          frameBorder="0"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                          className="w-full rounded-2xl border-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 text-xs text-slate-400 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>
                        Masukkan link lagu atau playlist Spotify di atas, atau pilih dari daftar rekomendasi lagu pernikahan di bawah ini.
                      </span>
                    </div>
                  )}

                  {/* Title & Artist Override */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        Judul Lagu yang Ditampilkan:
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Teman Hidup"
                        value={invitation.audioTrack.title}
                        onChange={(e) =>
                          onUpdateInvitation({
                            audioTrack: { ...invitation.audioTrack, title: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-[#1DB954]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        Nama Artis / Penyanyi:
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Tulus"
                        value={invitation.audioTrack.artist}
                        onChange={(e) =>
                          onUpdateInvitation({
                            audioTrack: { ...invitation.audioTrack, artist: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-[#1DB954]"
                      />
                    </div>
                  </div>

                  {/* POPULAR WEDDING SONG PRESETS */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        Pilihan Cepat Lagu & Playlist Pernikahan Populer:
                      </span>
                      <span className="text-[10px] text-slate-400">Klik untuk menerapkan</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {POPULAR_SPOTIFY_PRESETS.map((preset) => {
                        const isSelected = invitation.audioTrack.spotifyUrl === preset.spotifyUrl;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => {
                              onUpdateInvitation({
                                audioTrack: {
                                  ...invitation.audioTrack,
                                  sourceType: 'spotify',
                                  spotifyUrl: preset.spotifyUrl,
                                  title: preset.title,
                                  artist: preset.artist
                                }
                              });
                            }}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                              isSelected
                                ? 'bg-emerald-950/80 border-[#1DB954] text-emerald-300'
                                : 'bg-slate-800/70 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                            }`}
                          >
                            <div className="truncate">
                              <div className="text-xs font-bold truncate">{preset.title}</div>
                              <div className="text-[10px] text-slate-400 truncate">{preset.artist}</div>
                            </div>
                            {isSelected ? (
                              <CheckCircle2 className="w-4 h-4 text-[#1DB954] shrink-0" />
                            ) : (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-700 text-slate-300 shrink-0">
                                Pilih
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* HOW TO GET SPOTIFY URL GUIDE */}
                  <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-1.5">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                      Cara Mengambil Link Lagu/Playlist dari Spotify:
                    </span>
                    <ol className="text-[11px] text-slate-400 space-y-1 list-decimal list-inside pl-1">
                      <li>Buka aplikasi Spotify (di HP atau Komputer) & cari lagu/playlist yang Anda inginkan.</li>
                      <li>Tekan tombol menu titik tiga (•••) atau tombol <strong>Bagikan (Share)</strong>.</li>
                      <li>Pilih <strong>Salin Tautan Lagu</strong> (atau Salin Tautan Playlist).</li>
                      <li>Tempel (Paste) tautan tersebut ke kolom URL Spotify di atas.</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* 🎵 CONFIGURATION FOR SYNTHESIZER MODE */}
              {invitation.audioTrack?.sourceType === 'preset' && (
                <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Pilihan Synthesizer Nada Tradisional & Romantis
                    </h4>
                    <p className="text-xs text-slate-500">
                      Musik berbasis Web Audio Synthesizer ringan yang langsung berputar otomatis tanpa buffering kuota internet.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'synth-gamelan', name: 'Gamelan Jawa Solo / Keraton', genre: 'Adat Jawa & Tradisional Gendhing' },
                      { id: 'synth-rindik', name: 'Rindik Bambu Bali', genre: 'Adat Bali & Suasana Tenang' },
                      { id: 'synth-saluang', name: 'Saluang & Seruling Minang / Sunda', genre: 'Adat Minangkabau & Nuansa Melayu' },
                      { id: 'synth-piano', name: 'Romantic Grand Piano', genre: 'Modern Luxury & Classic Romance' },
                      { id: 'synth-acoustic', name: 'Acoustic Guitar Romance', genre: 'Rustic, Minimalist & Boho' },
                      { id: 'synth-strings', name: 'Orchestral Symphony Strings', genre: 'Royal, Chateau & Lake Como' }
                    ].map((item) => {
                      const isSelected = invitation.audioTrack.soundType === item.id;
                      const isTestingThis = previewingSynth === item.id;
                      return (
                        <div
                          key={item.id}
                          className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-2.5 ${
                            isSelected
                              ? 'bg-amber-50/70 border-amber-400 shadow-xs'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-xs font-bold text-slate-900 block">
                                {item.name}
                              </span>
                              <span className="text-[11px] text-slate-500 block">
                                {item.genre}
                              </span>
                            </div>
                            {isSelected && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900">
                                Aktif
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                            <button
                              type="button"
                              onClick={() => {
                                onUpdateInvitation({
                                  audioTrack: {
                                    ...invitation.audioTrack,
                                    soundType: item.id as any,
                                    title: item.name,
                                    artist: item.genre
                                  }
                                });
                              }}
                              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-amber-600 text-white'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                              }`}
                            >
                              {isSelected ? 'Terpilih' : 'Gunakan'}
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (isTestingThis) {
                                  audioEngine.stop();
                                  setPreviewingSynth(null);
                                } else {
                                  audioEngine.play(item.id as any);
                                  setPreviewingSynth(item.id);
                                }
                              }}
                              className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                                isTestingThis
                                  ? 'bg-red-500 text-white'
                                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                              }`}
                              title={isTestingThis ? 'Hentikan Tes' : 'Dengarkan Sampel'}
                            >
                              {isTestingThis ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                              <span className="text-[10px]">{isTestingThis ? 'Stop' : 'Tes'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 🔗 CONFIGURATION FOR CUSTOM MP3 MODE */}
              {invitation.audioTrack?.sourceType === 'custom_url' && (
                <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Link URL File Audio Langsung (.mp3)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Gunakan file MP3 yang di-host di server publik atau cloud storage Anda.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        URL File MP3:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="https://domain.com/musik-pernikahan.mp3"
                          value={invitation.audioTrack.customAudioUrl || ''}
                          onChange={(e) =>
                            onUpdateInvitation({
                              audioTrack: {
                                ...invitation.audioTrack,
                                sourceType: 'custom_url',
                                customAudioUrl: e.target.value
                              }
                            })
                          }
                          className="flex-1 px-3 py-2 text-xs font-mono rounded-xl bg-white border border-slate-300 text-blue-600 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (isTestingCustomAudio) {
                              if (customAudioPreviewRef.current) {
                                customAudioPreviewRef.current.pause();
                              }
                              setIsTestingCustomAudio(false);
                            } else if (invitation.audioTrack.customAudioUrl) {
                              customAudioPreviewRef.current = new Audio(invitation.audioTrack.customAudioUrl);
                              customAudioPreviewRef.current.play()
                                .then(() => setIsTestingCustomAudio(true))
                                .catch(() => alert('Gagal memutar audio dari URL tersebut. Pastikan URL dapat diakses secara publik.'));
                            }
                          }}
                          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          {isTestingCustomAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          <span>{isTestingCustomAudio ? 'Stop Tes' : 'Uji Audio'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Judul Lagu:
                        </label>
                        <input
                          type="text"
                          value={invitation.audioTrack.title}
                          onChange={(e) =>
                            onUpdateInvitation({
                              audioTrack: { ...invitation.audioTrack, title: e.target.value }
                            })
                          }
                          className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Artis / Penggubah:
                        </label>
                        <input
                          type="text"
                          value={invitation.audioTrack.artist}
                          onChange={(e) =>
                            onUpdateInvitation({
                              audioTrack: { ...invitation.audioTrack, artist: e.target.value }
                            })
                          }
                          className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: GIFTS & DIGITAL ENVELOPE */}
          {activeTab === 'gifts' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    Amplop Digital & Rekening Hadiah
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tamu dapat mengirimkan kado cashless via transfer bank atau QRIS dengan mudah.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddBankAccount}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Rekening</span>
                </button>
              </div>

              {/* Bank Accounts List */}
              <div className="space-y-3">
                {invitation.bankAccounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">
                        {acc.bankName}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveBankAccount(acc.id)}
                        className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                          Nama Bank / E-Wallet:
                        </label>
                        <input
                          type="text"
                          value={acc.bankName}
                          onChange={(e) => {
                            const updated = invitation.bankAccounts.map((b) =>
                              b.id === acc.id ? { ...b, bankName: e.target.value } : b
                            );
                            onUpdateInvitation({ bankAccounts: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                          Nomor Rekening:
                        </label>
                        <input
                          type="text"
                          value={acc.accountNumber}
                          onChange={(e) => {
                            const updated = invitation.bankAccounts.map((b) =>
                              b.id === acc.id ? { ...b, accountNumber: e.target.value } : b
                            );
                            onUpdateInvitation({ bankAccounts: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-white border border-slate-300 font-mono outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                          Atas Nama Pemilik:
                        </label>
                        <input
                          type="text"
                          value={acc.accountHolder}
                          onChange={(e) => {
                            const updated = invitation.bankAccounts.map((b) =>
                              b.id === acc.id ? { ...b, accountHolder: e.target.value } : b
                            );
                            onUpdateInvitation({ bankAccounts: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Physical Gift Address */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-800">
                  Alamat Kirim Kado Fisik (Opsional):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Nama Penerima"
                    value={invitation.physicalGiftAddress?.recipient || ''}
                    onChange={(e) =>
                      onUpdateInvitation({
                        physicalGiftAddress: {
                          recipient: e.target.value,
                          phone: invitation.physicalGiftAddress?.phone || '',
                          address: invitation.physicalGiftAddress?.address || ''
                        }
                      })
                    }
                    className="px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="No. Telepon / WhatsApp"
                    value={invitation.physicalGiftAddress?.phone || ''}
                    onChange={(e) =>
                      onUpdateInvitation({
                        physicalGiftAddress: {
                          recipient: invitation.physicalGiftAddress?.recipient || '',
                          phone: e.target.value,
                          address: invitation.physicalGiftAddress?.address || ''
                        }
                      })
                    }
                    className="px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Alamat lengkap pengiriman kado..."
                  value={invitation.physicalGiftAddress?.address || ''}
                  onChange={(e) =>
                    onUpdateInvitation({
                      physicalGiftAddress: {
                        recipient: invitation.physicalGiftAddress?.recipient || '',
                        phone: invitation.physicalGiftAddress?.phone || '',
                        address: e.target.value
                      }
                    })
                  }
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 6: PRICING & PAYMENT */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  Paket Berbayar & Status Langganan
                </h3>
                <p className="text-xs text-slate-500">
                  Nikmati fitur lengkap tanpa watermark, masa aktif panjang, dan link publik instan.
                </p>
              </div>

              {/* Current Status Card */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-50 via-white to-amber-100/40 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-600 text-white">
                      {currentPlan.badge || 'Paket Aktif'}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      ✓ Pembayaran Lunas
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{currentPlan.name}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{currentPlan.description}</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Kode Invoice: <strong className="font-mono text-slate-700">{invitation.invoiceCode || 'INV-2026-PAID'}</strong>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenPricingModal}
                  className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md cursor-pointer whitespace-nowrap transition-all"
                >
                  Upgrade / Ganti Paket
                </button>
              </div>

              {/* Comparison Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PRICING_PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between ${
                      invitation.pricingTier === plan.id
                        ? 'border-amber-500 bg-amber-50/40 shadow-sm'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">{plan.name}</div>
                      <div className="text-base font-extrabold text-amber-700 font-serif my-1">
                        {formatRupiah(plan.price)}
                      </div>
                      <p className="text-[10px] text-slate-500 line-clamp-2 mb-3">
                        {plan.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onOpenPricingModal}
                      className="w-full py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                    >
                      {invitation.pricingTier === plan.id ? 'Paket Aktif' : 'Pilih'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SPANDUK BERDIRI & QR KEHADIRAN */}
          {activeTab === 'banner_checkin' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    Spanduk Berdiri Selamat Datang & QR Kehadiran Tamu
                  </h3>
                  <p className="text-xs text-slate-500">
                    Cetak spanduk X-Banner 60x160cm atau standing sign A4 dengan QR code terintegrasi untuk verifikasi kehadiran tamu di resepsi.
                  </p>
                </div>
                <button
                  type="button"
                  id="btn-open-standing-banner-modal"
                  onClick={() => setIsStandingBannerModalOpen(true)}
                  className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer whitespace-nowrap active:scale-95"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview & Cetak Spanduk HD</span>
                </button>
              </div>

              {/* Spanduk Customizer Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800 border-b border-slate-100 pb-2.5">
                  <Palette className="w-4 h-4 text-emerald-600" />
                  <span>Pengaturan Visual Spanduk Selamat Datang</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Judul Spanduk / Welcome Text
                    </label>
                    <input
                      type="text"
                      value={invitation.standingBannerConfig?.headlineText || 'Selamat Datang di Pernikahan Kami'}
                      onChange={(e) =>
                        onUpdateInvitation({
                          standingBannerConfig: {
                            ...(invitation.standingBannerConfig || {
                              enabled: true,
                              headlineText: 'Selamat Datang di Pernikahan Kami',
                              subHeadlineText: 'Silakan Scan QR Code di Bawah Ini untuk Konfirmasi Kehadiran & Buku Tamu Digital',
                              venueLocationName: invitation.events[0]?.location || 'Grand Ballroom',
                              bannerStyle: 'vertical_banner',
                              customQrTargetUrl: ''
                            }),
                            headlineText: e.target.value
                          }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:ring-2 focus:ring-emerald-500/40 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nama Lokasi / Gedung Resepsi
                    </label>
                    <input
                      type="text"
                      value={invitation.standingBannerConfig?.venueLocationName || invitation.events[0]?.location || 'Grand Ballroom'}
                      onChange={(e) =>
                        onUpdateInvitation({
                          standingBannerConfig: {
                            ...(invitation.standingBannerConfig || {
                              enabled: true,
                              headlineText: 'Selamat Datang di Pernikahan Kami',
                              subHeadlineText: 'Silakan Scan QR Code di Bawah Ini untuk Konfirmasi Kehadiran & Buku Tamu Digital',
                              venueLocationName: invitation.events[0]?.location || 'Grand Ballroom',
                              bannerStyle: 'vertical_banner',
                              customQrTargetUrl: ''
                            }),
                            venueLocationName: e.target.value
                          }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:ring-2 focus:ring-emerald-500/40 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Petunjuk Scan Tamu pada Spanduk
                  </label>
                  <textarea
                    rows={2}
                    value={invitation.standingBannerConfig?.subHeadlineText || 'Silakan Scan QR Code di Bawah Ini untuk Konfirmasi Kehadiran & Buku Tamu Digital'}
                    onChange={(e) =>
                      onUpdateInvitation({
                        standingBannerConfig: {
                          ...(invitation.standingBannerConfig || {
                            enabled: true,
                            headlineText: 'Selamat Datang di Pernikahan Kami',
                            subHeadlineText: 'Silakan Scan QR Code di Bawah Ini untuk Konfirmasi Kehadiran & Buku Tamu Digital',
                            venueLocationName: invitation.events[0]?.location || 'Grand Ballroom',
                            bannerStyle: 'vertical_banner',
                            customQrTargetUrl: ''
                          }),
                          subHeadlineText: e.target.value
                        }
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:ring-2 focus:ring-emerald-500/40 outline-none"
                  />
                </div>

                {/* Banner Style Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Ukuran & Format Standee:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'vertical_banner', label: 'Standing Banner', desc: '60 x 160 cm' },
                      { id: 'standee_table', label: 'Meja Tamu / Standee', desc: 'Ukuran A4 / Akrilik' },
                      { id: 'minimalist', label: 'Spanduk Gate', desc: 'Pintu Masuk Resepsi' }
                    ].map((fmt) => (
                      <button
                        key={fmt.id}
                        type="button"
                        onClick={() =>
                          onUpdateInvitation({
                            standingBannerConfig: {
                              ...(invitation.standingBannerConfig || {
                                enabled: true,
                                headlineText: 'Selamat Datang di Pernikahan Kami',
                                subHeadlineText: 'Silakan Scan QR Code di Bawah Ini untuk Konfirmasi Kehadiran & Buku Tamu Digital',
                                venueLocationName: invitation.events[0]?.location || 'Grand Ballroom',
                                bannerStyle: 'vertical_banner',
                                customQrTargetUrl: ''
                              }),
                              bannerStyle: fmt.id as any
                            }
                          })
                        }
                        className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                          (invitation.standingBannerConfig?.bannerStyle || 'vertical_banner') === fmt.id
                            ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/20'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-800">{fmt.label}</div>
                        <div className="text-[10px] text-slate-500">{fmt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Attendance Flow Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Konfirmasi Kehadiran Tamu via Scan QR di Lokasi</span>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <span>{invitation.attendanceConfig?.enabled !== false ? 'Aktif' : 'Nonaktif'}</span>
                    <input
                      type="checkbox"
                      checked={invitation.attendanceConfig?.enabled !== false}
                      onChange={(e) =>
                        onUpdateInvitation({
                          attendanceConfig: {
                            ...(invitation.attendanceConfig || {
                              enabled: true,
                              checkInCode: `INV-${invitation.slug.toUpperCase()}-VIP`,
                              welcomeTitle: 'Selamat Datang di Acara Kami!',
                              welcomeMessage: 'Terima kasih atas kehadiran dan doa restu Anda.',
                              showSouvenirCounter: true,
                              allowCameraScanner: true,
                              totalCheckedIn: 0
                            }),
                            enabled: e.target.checked
                          }
                        })
                      }
                      className="w-4 h-4 accent-emerald-600 rounded"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Kode Verifikasi QR Check-in
                    </label>
                    <input
                      type="text"
                      value={invitation.attendanceConfig?.checkInCode || `INV-${invitation.slug.toUpperCase()}-VIP`}
                      onChange={(e) =>
                        onUpdateInvitation({
                          attendanceConfig: {
                            ...(invitation.attendanceConfig || {
                              enabled: true,
                              checkInCode: `INV-${invitation.slug.toUpperCase()}-VIP`,
                              welcomeTitle: 'Selamat Datang di Acara Kami!',
                              welcomeMessage: 'Terima kasih atas kehadiran dan doa restu Anda.',
                              showSouvenirCounter: true,
                              allowCameraScanner: true,
                              totalCheckedIn: 0
                            }),
                            checkInCode: e.target.value
                          }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-mono focus:ring-2 focus:ring-emerald-500/40 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Judul Sambutan Tamu Setelah Scan
                    </label>
                    <input
                      type="text"
                      value={invitation.attendanceConfig?.welcomeTitle || 'Selamat Datang di Acara Kami!'}
                      onChange={(e) =>
                        onUpdateInvitation({
                          attendanceConfig: {
                            ...(invitation.attendanceConfig || {
                              enabled: true,
                              checkInCode: `INV-${invitation.slug.toUpperCase()}-VIP`,
                              welcomeTitle: 'Selamat Datang di Acara Kami!',
                              welcomeMessage: 'Terima kasih atas kehadiran dan doa restu Anda.',
                              showSouvenirCounter: true,
                              allowCameraScanner: true,
                              totalCheckedIn: 0
                            }),
                            welcomeTitle: e.target.value
                          }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:ring-2 focus:ring-emerald-500/40 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pesan Terima Kasih / Instruksi Pengambilan Suvenir
                  </label>
                  <textarea
                    rows={2}
                    value={invitation.attendanceConfig?.welcomeMessage || 'Terima kasih atas kehadiran dan doa restu Anda. Silakan tukarkan barcode ini di meja resepsionis untuk suvenir pernikahan.'}
                    onChange={(e) =>
                      onUpdateInvitation({
                        attendanceConfig: {
                          ...(invitation.attendanceConfig || {
                            enabled: true,
                            checkInCode: `INV-${invitation.slug.toUpperCase()}-VIP`,
                            welcomeTitle: 'Selamat Datang di Acara Kami!',
                            welcomeMessage: 'Terima kasih atas kehadiran dan doa restu Anda.',
                            showSouvenirCounter: true,
                            allowCameraScanner: true,
                            totalCheckedIn: 0
                          }),
                          welcomeMessage: e.target.value
                        }
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:ring-2 focus:ring-emerald-500/40 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: LIVE FEED & MOBILE ACTION DOCK */}
          {activeTab === 'livefeed_dock' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  Mobile Action Dock & Live Feed Foto Hari-H
                </h3>
                <p className="text-xs text-slate-500">
                  Navigasi mobile interaktif di layar smartphone tamu dengan akses cepat: Kiri [Tambah Foto], Tengah [Scan Kehadiran], dan Kanan [QRIS Hadiah].
                </p>
              </div>

              {/* Mobile Dock Configuration */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                    <Smartphone className="w-4 h-4 text-purple-600" />
                    <span>Bar Navigasi Bawah Layar HP (Mobile Action Dock)</span>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <span>{invitation.dockConfig?.enabled !== false ? 'Aktif' : 'Nonaktif'}</span>
                    <input
                      type="checkbox"
                      checked={invitation.dockConfig?.enabled !== false}
                      onChange={(e) =>
                        onUpdateInvitation({
                          dockConfig: {
                            ...(invitation.dockConfig || {
                              enabled: true,
                              showAddPhotoButton: true,
                              showQrisButton: true,
                              showCheckInButton: true,
                              photoButtonLabel: 'Foto Feed',
                              qrisButtonLabel: 'QRIS Scan'
                            }),
                            enabled: e.target.checked
                          }
                        })
                      }
                      className="w-4 h-4 accent-purple-600 rounded"
                    />
                  </label>
                </div>

                {/* 3 Buttons Breakdown Explanation */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="p-1.5 rounded-lg bg-purple-600 text-white">
                        <Camera className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-purple-950">Tombol Kiri Bawah</span>
                    </div>
                    <p className="text-[11px] text-purple-900 leading-snug">
                      <strong>Tambah Foto</strong>: Membuka dialog kamera selfie atau unggah foto untuk dimasukkan ke Live Feed album tamu.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="p-1.5 rounded-lg bg-amber-600 text-white">
                        <QrCode className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-amber-950">Tombol Tengah</span>
                    </div>
                    <p className="text-[11px] text-amber-900 leading-snug">
                      <strong>Scan Hadir</strong>: Mengaktifkan pemindai kamera untuk scan QR Code di spanduk selamat datang dan verifikasi kehadiran.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="p-1.5 rounded-lg bg-emerald-600 text-white">
                        <Gift className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-emerald-950">Tombol Kanan Bawah</span>
                    </div>
                    <p className="text-[11px] text-emerald-900 leading-snug">
                      <strong>QRIS Scan</strong>: Membuka modal QRIS instan berlisensi Mayar / Bank Indonesia untuk transfer amplop digital tamu.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Label Tombol Kiri (Upload Foto)
                    </label>
                    <input
                      type="text"
                      value={invitation.dockConfig?.photoButtonLabel || 'Foto Feed'}
                      onChange={(e) =>
                        onUpdateInvitation({
                          dockConfig: {
                            ...(invitation.dockConfig || {
                              enabled: true,
                              showAddPhotoButton: true,
                              showQrisButton: true,
                              showCheckInButton: true,
                              photoButtonLabel: 'Foto Feed',
                              qrisButtonLabel: 'QRIS Scan'
                            }),
                            photoButtonLabel: e.target.value
                          }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:ring-2 focus:ring-purple-500/40 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Label Tombol Kanan (QRIS)
                    </label>
                    <input
                      type="text"
                      value={invitation.dockConfig?.qrisButtonLabel || 'QRIS Scan'}
                      onChange={(e) =>
                        onUpdateInvitation({
                          dockConfig: {
                            ...(invitation.dockConfig || {
                              enabled: true,
                              showAddPhotoButton: true,
                              showQrisButton: true,
                              showCheckInButton: true,
                              photoButtonLabel: 'Foto Feed',
                              qrisButtonLabel: 'QRIS Scan'
                            }),
                            qrisButtonLabel: e.target.value
                          }
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:ring-2 focus:ring-purple-500/40 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: PUBLISH & GUEST LINKS */}
          {activeTab === 'publish' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  Kustomisasi Tautan Tambahan (Slug) & Link Tamu
                </h3>
                <p className="text-xs text-slate-500">
                  Bagikan tautan resmi dengan link tambahan <code>/{invitation.slug}</code> dan undang ribuan tamu secara personal via WhatsApp.
                </p>
              </div>

              {/* Custom Slug Editor */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Tautan Tambahan (URL Slug):
                </label>
                <div className="flex items-center bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm shadow-2xs">
                  <span className="text-slate-400 font-mono text-xs select-none">/</span>
                  <input
                    type="text"
                    value={invitation.slug}
                    onChange={(e) =>
                      onUpdateInvitation({
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '')
                      })
                    }
                    className="w-full bg-transparent border-none outline-none font-semibold text-slate-800 text-xs sm:text-sm ml-1"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Tautan Live:{' '}
                  <strong className="text-blue-600 font-mono select-all">
                    {liveBaseUrl}
                  </strong>
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onOpenPublishModal}
                  className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Users className="w-4 h-4" />
                  <span>Buka Generator Link Tamu & WhatsApp Blast</span>
                </button>

                <a
                  href={liveBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Buka Tautan Langsung</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: LIVE INTERACTIVE MOBILE DEVICE PREVIEW (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Device Controls Bar */}
          <div className="w-full max-w-sm flex items-center justify-between px-3 py-2 rounded-2xl bg-white shadow-2xs border border-slate-200/80 mb-3 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <Smartphone className="w-4 h-4 text-amber-600" />
              <span>Preview Layar Mobile (iOS)</span>
            </div>
            <button
              type="button"
              onClick={onSwitchToGuestView}
              className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Layar Penuh</span>
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Realistic iPhone Bezel Wrapper */}
          <div className="w-full max-w-[380px] rounded-[42px] p-3.5 bg-slate-900 shadow-2xl ring-8 ring-slate-800/40 relative">
            {/* Speaker & Dynamic Island Notch */}
            <div className="w-24 h-4 bg-slate-950 rounded-full mx-auto mb-2.5 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-900 mr-2" />
              <div className="w-2 h-2 rounded-full bg-slate-800" />
            </div>

            {/* Viewport Screen Content */}
            <div className="w-full h-[620px] rounded-[32px] overflow-y-auto overflow-x-hidden bg-white relative scrollbar-none select-text shadow-inner">
              {childrenMobilePreview}
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="w-32 h-1 bg-slate-600 rounded-full mx-auto mt-2.5" />
          </div>
        </div>
      </div>

      {/* Standing Banner & Signage Modal */}
      <StandingBannerModal
        isOpen={isStandingBannerModalOpen}
        onClose={() => setIsStandingBannerModalOpen(false)}
        invitation={invitation}
        theme={theme}
      />
    </div>
  );
};
