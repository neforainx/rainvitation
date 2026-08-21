import React, { useState, useRef, useEffect } from 'react';
import { Camera, Image as ImageIcon, Heart, Upload, Sparkles, Tv, MessageCircle, RefreshCw, X, Check, Users, Share2, Layers, Filter, Lock, QrCode, CheckCircle2, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LiveFeedPhoto, ThemeConfig } from '../types';
import confetti from 'canvas-confetti';

interface LiveFeedHariHProps {
  photos: LiveFeedPhoto[];
  onUploadPhoto: (newPhoto: Omit<LiveFeedPhoto, 'id' | 'timestamp' | 'likes'>) => void;
  onLikePhoto: (id: string) => void;
  theme: ThemeConfig;
  weddingTitle: string;
  isExternalUploadOpen?: boolean;
  onCloseExternalUpload?: () => void;
  isGuestCheckedIn?: boolean;
  onOpenCheckInScanner?: () => void;
  defaultGuestName?: string;
  isOwner?: boolean;
}

export const LiveFeedHariH: React.FC<LiveFeedHariHProps> = ({
  photos,
  onUploadPhoto,
  onLikePhoto,
  theme,
  weddingTitle,
  isExternalUploadOpen,
  onCloseExternalUpload,
  isGuestCheckedIn = false,
  onOpenCheckInScanner,
  defaultGuestName = '',
  isOwner = false
}) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isProjectorMode, setIsProjectorMode] = useState(false);
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  // Sync external open state
  useEffect(() => {
    if (isExternalUploadOpen !== undefined) {
      if (isGuestCheckedIn || isOwner) {
        setIsUploadModalOpen(isExternalUploadOpen);
      }
    }
  }, [isExternalUploadOpen, isGuestCheckedIn, isOwner]);

  const handleCloseModal = () => {
    setIsUploadModalOpen(false);
    if (onCloseExternalUpload) {
      onCloseExternalUpload();
    }
  };

  // Upload Form States
  const [uploaderName, setUploaderName] = useState(defaultGuestName);
  const [tableNumber, setTableNumber] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'normal' | 'warm' | 'vintage' | 'bw' | 'golden'>('normal');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultGuestName && !uploaderName) {
      setUploaderName(defaultGuestName);
    }
  }, [defaultGuestName]);

  // Sample quick presets
  const samplePresets = [
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80'
  ];

  // Auto slide for projector mode
  useEffect(() => {
    if (!isProjectorMode || photos.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % photos.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isProjectorMode, photos.length]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePickPreset = (url: string) => {
    setPreviewUrl(url);
  };

  const handleSubmitPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl || !uploaderName.trim()) return;

    const guestTag = uploaderName.trim();
    setIsSubmitting(true);
    setTimeout(() => {
      onUploadPhoto({
        uploaderName: guestTag,
        capturedBy: `Captured by ${guestTag}`,
        photoUrl: previewUrl,
        caption: caption.trim() || 'Selamat menempuh hidup baru!',
        tableNumber: tableNumber.trim() ? `Meja ${tableNumber.trim()}` : undefined,
        filterUsed: selectedFilter
      });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });

      setIsSubmitting(false);
      setIsUploadModalOpen(false);
      setPreviewUrl(null);
      setCaption('');
      setTableNumber('');
      if (onCloseExternalUpload) {
        onCloseExternalUpload();
      }
    }, 600);
  };

  const getFilterClass = (filter?: string) => {
    switch (filter) {
      case 'warm':
        return 'sepia-[0.25] saturate-[1.3] brightness-[1.05]';
      case 'vintage':
        return 'sepia-[0.5] contrast-[1.1]';
      case 'bw':
        return 'grayscale contrast-[1.2]';
      case 'golden':
        return 'sepia-[0.35] hue-rotate-[340deg] saturate-[1.4]';
      default:
        return '';
    }
  };

  const isUnlocked = isGuestCheckedIn || isOwner;

  return (
    <div className="w-full">
      {/* 1. JIKA BELUM CHECK-IN SCAN QR DI LOKASI: TAMPILKAN STATUS TERKUNCI */}
      {!isUnlocked ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-2xl text-center max-w-xl mx-auto"
        >
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-amber-50 border-2 border-amber-400 text-amber-600 shadow-md">
            <Lock className="w-7 h-7" />
          </div>

          <span className="text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 inline-block mb-3">
            VERIFIKASI KEHADIRAN DI LOKASI
          </span>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-2">
            Album Momen Bersama
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            Album Momen Bersama dan akses unggah kamera akan terbuka otomatis setelah Anda melakukan <strong>Scan QR Kehadiran</strong> di meja registrasi / standing banner selamat datang di lokasi acara.
          </p>

          <button
            id="btn-unlock-album-scan"
            type="button"
            onClick={onOpenCheckInScanner}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 shadow-lg hover:shadow-xl cursor-pointer active:scale-95 transition-all"
          >
            <QrCode className="w-4 h-4" />
            <span>Scan QR Kehadiran di Acara</span>
          </button>
        </motion.div>
      ) : (
        /* 2. JIKA SUDAH CHECK-IN: TAMPILKAN ALBUM MOMEN BERSAMA UNLOCKED */
        <div>
          {/* Live Feed Banner Header */}
          <div className="text-center py-6 px-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-md mb-3">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>TERVERIFIKASI HADIR • ALBUM MOMEN BERSAMA</span>
            </div>

            <h2
              className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 mb-2"
              style={{ color: theme.primaryColor }}
            >
              Momen Tamu Undangan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              Abadikan momen kenangan dan foto kebersamaan di acara pernikahan! Setiap foto yang Anda unggah otomatis disematkan tag nama Anda.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <button
                id="btn-upload-live-photo"
                onClick={() => setIsUploadModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <Camera className="w-4 h-4" />
                <span>Tambah Foto ke Album</span>
              </button>

              <button
                id="btn-open-projector"
                onClick={() => setIsProjectorMode(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold bg-white border border-slate-300 text-slate-800 shadow-md cursor-pointer hover:bg-slate-50 active:scale-95 transition-all"
              >
                <Tv className="w-4 h-4 text-purple-600" />
                <span>Mode Layar Proyektor LED</span>
              </button>
            </div>
          </div>

          {/* Live Stream Photo Cards */}
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Galeri Tamu ({photos.length} Foto)</span>
              </span>
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin text-slate-400" />
                <span>Real-time Live Sync</span>
              </span>
            </div>

            {photos.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white/70 backdrop-blur-md border border-white/80 shadow-md">
                <Camera className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                <h3 className="font-bold text-slate-700 text-sm">Belum Ada Foto Terunggah</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Jadilah yang pertama membagikan foto momen bahagia ini!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {photos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white/95 shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all"
                  >
                    {/* Photo Frame */}
                    <div className="relative aspect-4/3 sm:aspect-square bg-slate-900 overflow-hidden">
                      <img
                        src={photo.photoUrl}
                        alt={photo.caption}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover transition-all ${getFilterClass(photo.filterUsed)}`}
                      />
                      {photo.tableNumber && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-white">
                          {photo.tableNumber}
                        </span>
                      )}
                      {/* CAPTURED BY TAG BADGE */}
                      <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-amber-300 border border-white/20 flex items-center gap-1 shadow-md">
                        <Camera className="w-3 h-3 text-amber-400" />
                        <span>{photo.capturedBy || `Captured by ${photo.uploaderName}`}</span>
                      </span>
                    </div>

                    {/* Caption & Uploader */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-xs text-slate-900 truncate">
                            {photo.uploaderName}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {photo.timestamp}
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 line-clamp-3 italic mb-3">
                          "{photo.caption}"
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <button
                          id={`btn-like-live-${photo.id}`}
                          onClick={() => onLikePhoto(photo.id)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1 rounded-full cursor-pointer transition-all active:scale-90"
                        >
                          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                          <span>{photo.likes} Sukai</span>
                        </button>

                        <span className="text-[10px] text-slate-400 capitalize font-medium">
                          Filter: {photo.filterUsed || 'Normal'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upload Photo Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl relative border border-slate-100 max-h-[92vh] overflow-y-auto"
            >
              <button
                id="btn-close-upload-modal"
                onClick={handleCloseModal}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    Kamera & Unggah Momen
                  </h3>
                  <p className="text-xs text-slate-500">
                    Foto akan otomatis disematkan tag nama Anda
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmitPhoto} className="space-y-4">
                {/* Photo Preview or Picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Pilih / Ambil Foto
                  </label>

                  {previewUrl ? (
                    <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 mb-2">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className={`w-full h-full object-cover ${getFilterClass(selectedFilter)}`}
                      />
                      <button
                        type="button"
                        onClick={() => setPreviewUrl(null)}
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      {/* Tag Preview */}
                      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/75 backdrop-blur-md text-amber-300 border border-white/20">
                        📸 Captured by {uploaderName || 'Nama Anda'}
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50"
                    >
                      <Camera className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                      <p className="text-xs font-semibold text-slate-700">
                        Klik untuk Ambil Foto / Unggah dari Galeri
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Mendukung format JPG, PNG, WEBP
                      </p>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {/* Preset Photos for quick testing */}
                  {!previewUrl && (
                    <div className="mt-3">
                      <span className="text-[10px] font-bold text-slate-500 block mb-1.5">
                        Atau pilih contoh foto cepat:
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {samplePresets.map((preset, i) => (
                          <div
                            key={i}
                            onClick={() => handlePickPreset(preset)}
                            className="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-amber-500 cursor-pointer shadow-xs"
                          >
                            <img
                              src={preset}
                              alt="Preset"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Filter Selector */}
                {previewUrl && (
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1">
                      <Filter className="w-3.5 h-3.5 text-amber-600" />
                      <span>Pilih Efek Filter Foto</span>
                    </label>
                    <div className="grid grid-cols-5 gap-1.5 text-center">
                      {[
                        { id: 'normal', name: 'Normal' },
                        { id: 'warm', name: 'Warm' },
                        { id: 'vintage', name: 'Vintage' },
                        { id: 'golden', name: 'Golden' },
                        { id: 'bw', name: 'B&W' }
                      ].map((flt) => (
                        <button
                          key={flt.id}
                          type="button"
                          onClick={() => setSelectedFilter(flt.id as any)}
                          className={`py-1.5 px-1 rounded-xl text-[11px] font-medium border transition-all cursor-pointer ${
                            selectedFilter === flt.id
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {flt.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Nama Tamu (Captured By) *
                    </label>
                    <input
                      type="text"
                      required
                      value={uploaderName}
                      onChange={(e) => setUploaderName(e.target.value)}
                      placeholder="Nama Anda"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500/50 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Nomor Meja (Opsional)
                    </label>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="Contoh: Meja VIP 2 / Meja 8"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500/50 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Pesan / Ucapan Singkat
                  </label>
                  <textarea
                    rows={2}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Contoh: Selamat berbahagia untuk kedua mempelai!"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500/50 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  id="btn-submit-live-photo"
                  disabled={!previewUrl || !uploaderName || isSubmitting}
                  className={`w-full py-3 rounded-2xl font-bold text-xs sm:text-sm text-white shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    !previewUrl || !uploaderName || isSubmitting
                      ? 'opacity-50 cursor-not-allowed bg-slate-400'
                      : 'hover:scale-102 active:scale-98'
                  }`}
                  style={{
                    backgroundColor:
                      !previewUrl || !uploaderName ? '#94A3B8' : theme.primaryColor
                  }}
                >
                  <Upload className="w-4 h-4" />
                  <span>{isSubmitting ? 'Mengunggah...' : 'Unggah ke Album Momen Bersama'}</span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projector / Big Screen Mode Fullscreen */}
      <AnimatePresence>
        {isProjectorMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between p-6 sm:p-10"
          >
            {/* Top Bar Projector */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-red-600 text-white font-bold text-xs tracking-wider animate-pulse inline-block mb-1">
                  LIVE GUEST MOMENTS SCREEN
                </span>
                <h1 className="text-xl sm:text-3xl font-serif font-bold text-amber-200">
                  {weddingTitle}
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button
                  id="btn-close-projector"
                  onClick={() => setIsProjectorMode(false)}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Keluar Layar Penuh</span>
                </button>
              </div>
            </div>

            {/* Main Stage Slide */}
            {photos.length > 0 ? (
              <div className="flex-1 my-6 flex flex-col lg:flex-row items-center justify-center gap-8 max-w-6xl mx-auto w-full">
                {/* Photo Display */}
                <motion.div
                  key={currentSlideIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  className="w-full lg:w-2/3 max-h-[60vh] sm:max-h-[65vh] rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/10 flex items-center justify-center relative"
                >
                  <img
                    src={photos[currentSlideIdx]?.photoUrl}
                    alt="Live Slide"
                    className={`max-h-full max-w-full object-contain ${getFilterClass(
                      photos[currentSlideIdx]?.filterUsed
                    )}`}
                  />
                  {/* Watermark Tag */}
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-amber-300 font-bold text-xs border border-white/20">
                    📸 {photos[currentSlideIdx]?.capturedBy || `Captured by ${photos[currentSlideIdx]?.uploaderName}`}
                  </div>
                </motion.div>

                {/* Side Info & QR Code for in-person guests */}
                <div className="w-full lg:w-1/3 flex flex-col justify-between p-6 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-black">
                        Slide {currentSlideIdx + 1} dari {photos.length}
                      </span>
                      {photos[currentSlideIdx]?.tableNumber && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white">
                          {photos[currentSlideIdx]?.tableNumber}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-bold text-white mb-2">
                      {photos[currentSlideIdx]?.uploaderName}
                    </h2>
                    <p className="text-sm text-slate-300 italic mb-4 leading-relaxed">
                      "{photos[currentSlideIdx]?.caption}"
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-center mt-4">
                    <p className="text-xs text-amber-300 font-semibold mb-1">
                      Scan QR Undangan untuk Tambah Foto
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Foto langsung tayang otomatis di layar proyektor
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
