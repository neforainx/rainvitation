import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  Printer,
  Sparkles,
  QrCode,
  Check,
  Maximize2,
  Copy,
  Layers,
  Image as ImageIcon,
  Heart,
  Calendar,
  MapPin,
  Camera,
  Share2
} from 'lucide-react';
import { WeddingInvitation, ThemeConfig } from '../types';
import { generateQRCodeDataUrl } from '../utils/urlHelper';
import { WeddingOrnament } from './Ornaments';

interface StandingBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  invitation: WeddingInvitation;
  theme: ThemeConfig;
  onUpdateBannerConfig?: (config: NonNullable<WeddingInvitation['standingBannerConfig']>) => void;
}

export const StandingBannerModal: React.FC<StandingBannerModalProps> = ({
  isOpen,
  onClose,
  invitation,
  theme,
  onUpdateBannerConfig
}) => {
  const [bannerFormat, setBannerFormat] = useState<'rollup_60x160' | 'xbanner_60x160' | 'table_standee_a4'>(
    invitation.standingBannerConfig?.bannerFormat || 'rollup_60x160'
  );
  const [title, setTitle] = useState(
    invitation.standingBannerConfig?.title || 'Selamat Datang di Resepsi Pernikahan'
  );
  const [subtitle, setSubtitle] = useState(
    invitation.standingBannerConfig?.subtitle || 'Silakan scan QR Code di bawah untuk konfirmasi kehadiran & unggah foto ke Live Feed Hari-H'
  );
  const [customNotice, setCustomNotice] = useState(
    invitation.standingBannerConfig?.customNotice || 'Tunjukkan konfirmasi check-in kepada penerima tamu untuk penukaran suvenir pernikahan.'
  );
  const [hallName, setHallName] = useState(
    invitation.standingBannerConfig?.hallName || invitation.events[0]?.locationName || 'Grand Ballroom'
  );
  const [showPhoto, setShowPhoto] = useState(
    invitation.standingBannerConfig?.showPhoto ?? true
  );
  const [showOrnaments, setShowOrnaments] = useState(
    invitation.standingBannerConfig?.showOrnaments ?? true
  );
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'settings'>('preview');

  // Attendance checkin target link
  const attendancePayload = `https://rainvitation.id/checkin/${invitation.slug || 'kevin-nadia'}?code=${invitation.attendanceConfig?.checkInCode || 'CHECKIN'}`;

  useEffect(() => {
    if (isOpen) {
      generateQRCodeDataUrl(attendancePayload).then((url) => setQrCodeDataUrl(url));
    }
  }, [isOpen, attendancePayload]);

  const handleSaveConfig = () => {
    if (onUpdateBannerConfig) {
      onUpdateBannerConfig({
        title,
        subtitle,
        customNotice,
        hallName,
        bannerFormat,
        showPhoto,
        showOrnaments
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadQR = () => {
    if (!qrCodeDataUrl) return;
    const a = document.createElement('a');
    a.href = qrCodeDataUrl;
    a.download = `QR-Code-Kehadiran-${invitation.groom.name.split(' ')[0]}-${invitation.bride.name.split(' ')[0]}.png`;
    a.click();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(attendancePayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto relative text-slate-800"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full mb-0.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Standing Banner & Welcome Signage</span>
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  Spanduk Berdiri Selamat Datang & QR Kehadiran
                </h2>
              </div>
            </div>

            <button
              id="btn-close-standing-banner"
              onClick={onClose}
              className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer transition-all active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 mb-6 p-1.5 rounded-2xl bg-slate-100 w-fit">
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pratinjau Spanduk Berdiri
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pengaturan Teks & Format
            </button>
          </div>

          {activeTab === 'preview' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Standing Banner Mockup Card (Left/Center) */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-100 rounded-3xl border border-slate-200/80">
                {/* Physical Banner Stand Mockup Frame */}
                <div className="relative w-full max-w-[340px] bg-slate-900 p-2.5 rounded-2xl shadow-2xl flex flex-col items-center">
                  {/* Top Bar Stand */}
                  <div className="w-full h-3 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-t-sm mb-1 shadow-inner" />

                  {/* Standing Banner Canvas (60x160 ratio) */}
                  <div
                    id="standing-banner-printable"
                    className="w-full rounded-xl overflow-hidden shadow-lg p-5 flex flex-col items-center justify-between text-center relative border border-white/40"
                    style={{
                      background: theme.bgGradient,
                      minHeight: '520px'
                    }}
                  >
                    {/* Top Ornaments */}
                    {showOrnaments && (
                      <div className="w-full flex justify-center opacity-80 mb-2">
                        <WeddingOrnament type={theme.ornamentStyle} color={theme.accentColor} className="w-16 h-8" />
                      </div>
                    )}

                    {/* Banner Title & Welcoming */}
                    <div className="w-full z-10">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-700 block mb-1">
                        WELCOME TO OUR WEDDING
                      </span>
                      <h3
                        className="text-lg sm:text-xl font-bold font-serif leading-tight mb-2"
                        style={{ color: theme.primaryColor }}
                      >
                        {title}
                      </h3>

                      {/* Couple Names */}
                      <div className="my-3 py-2 px-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-xs">
                        <p className="text-base sm:text-lg font-serif font-bold text-slate-900">
                          {invitation.groom.name.split(',')[0]}
                        </p>
                        <p className="text-xs font-serif italic text-amber-700">&</p>
                        <p className="text-base sm:text-lg font-serif font-bold text-slate-900">
                          {invitation.bride.name.split(',')[0]}
                        </p>
                      </div>

                      {/* Couple Photo if Enabled */}
                      {showPhoto && invitation.gallery[0]?.url && (
                        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-white shadow-md my-2">
                          <img
                            src={invitation.gallery[0].url}
                            alt="Mempelai"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Event Date & Hall */}
                      <div className="text-[11px] font-semibold text-slate-700 flex items-center justify-center gap-2 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <span>{invitation.events[0]?.date || '24 Okt 2026'}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span className="truncate max-w-[140px]">{hallName}</span>
                        </span>
                      </div>
                    </div>

                    {/* QR Code Section Card */}
                    <div className="w-full bg-white/95 rounded-2xl p-4 border border-slate-200/80 shadow-md z-10 my-2">
                      <p className="text-[11px] font-bold text-slate-900 mb-1">
                        SCAN QR CODE KEHADIRAN
                      </p>
                      <p className="text-[10px] text-slate-600 mb-2.5 leading-snug">
                        {subtitle}
                      </p>

                      <div className="w-36 h-36 mx-auto p-2 bg-white rounded-xl border-2 border-dashed border-amber-300 shadow-inner flex items-center justify-center">
                        {qrCodeDataUrl ? (
                          <img
                            src={qrCodeDataUrl}
                            alt="QR Kehadiran"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <QrCode className="w-16 h-16 text-slate-300 animate-pulse" />
                        )}
                      </div>

                      <div className="mt-2.5 flex items-center justify-center gap-2">
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          <Check className="w-3 h-3" /> Check-in Cepat
                        </span>
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                          <Camera className="w-3 h-3" /> Live Feed
                        </span>
                      </div>
                    </div>

                    {/* Bottom Custom Notice */}
                    {customNotice && (
                      <div className="w-full mt-2 text-[10px] text-slate-600 bg-white/60 backdrop-blur-xs p-2 rounded-xl border border-white/80">
                        {customNotice}
                      </div>
                    )}

                    {/* Bottom Ornaments */}
                    {showOrnaments && (
                      <div className="w-full flex justify-center opacity-80 mt-2">
                        <WeddingOrnament type={theme.ornamentStyle} color={theme.accentColor} className="w-16 h-6 rotate-180" />
                      </div>
                    )}
                  </div>

                  {/* Stand Feet Mockup */}
                  <div className="w-3/4 h-2 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-b-sm mt-1" />
                  <div className="flex justify-between w-4/5 mt-1">
                    <div className="w-6 h-4 bg-slate-700 rounded-b-md" />
                    <div className="w-6 h-4 bg-slate-700 rounded-b-md" />
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 mt-3 text-center">
                  Format banner: {bannerFormat === 'rollup_60x160' ? 'Roll-Up Banner (60 x 160 cm)' : bannerFormat === 'xbanner_60x160' ? 'X-Banner (60 x 160 cm)' : 'Table Standee (Ukuran A4)'}
                </p>
              </div>

              {/* Action Controls (Right) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70">
                  <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Petunjuk Penggunaan Spanduk</span>
                  </h4>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    Letakkan spanduk berdiri ini di depan gerbang utama atau dekat meja penerima tamu (*reception desk*). Tamu yang datang cukup membuka kamera ponsel untuk check-in dan langsung upload foto momen pernikahan.
                  </p>
                </div>

                {/* Direct Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <button
                    type="button"
                    onClick={handleDownloadQR}
                    className="w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>Unduh QR Code Kehadiran (PNG)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all active:scale-95"
                  >
                    <Printer className="w-4 h-4 text-purple-600" />
                    <span>Cetak Desain Spanduk (A4 / Standee)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Link Check-in Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-500" />
                        <span>Salin Link URL Check-in</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Kode Unik Acara:</span>
                    <strong className="text-slate-900 font-mono">{invitation.attendanceConfig?.checkInCode || 'WED-CHECKIN'}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Kamera Scanner:</span>
                    <span className="text-emerald-700 font-bold">Aktif di Mobile Guest View</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Settings Tab */
            <div className="space-y-4 max-w-xl mx-auto py-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Format Spanduk
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'rollup_60x160', label: 'Roll-Up (60x160cm)' },
                    { id: 'xbanner_60x160', label: 'X-Banner (60x160cm)' },
                    { id: 'table_standee_a4', label: 'Standee Meja (A4)' }
                  ].map((fmt) => (
                    <button
                      key={fmt.id}
                      type="button"
                      onClick={() => setBannerFormat(fmt.id as any)}
                      className={`p-3 rounded-2xl text-xs font-bold border text-center transition-all cursor-pointer ${
                        bannerFormat === fmt.id
                          ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Judul Utama Spanduk
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Selamat Datang di Resepsi Pernikahan"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 outline-hidden bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Instruksi Scan untuk Tamu
                </label>
                <textarea
                  rows={2}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Silakan scan QR Code di bawah untuk konfirmasi kehadiran & unggah foto ke Live Feed Hari-H"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 outline-hidden bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Gedung / Lokasi Acara
                </label>
                <input
                  type="text"
                  value={hallName}
                  onChange={(e) => setHallName(e.target.value)}
                  placeholder="Grand Ballroom Ndalem Solo"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 outline-hidden bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Catatan Kaki / Info Suvenir
                </label>
                <input
                  type="text"
                  value={customNotice}
                  onChange={(e) => setCustomNotice(e.target.value)}
                  placeholder="Tunjukkan konfirmasi check-in kepada penerima tamu untuk suvenir."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 outline-hidden bg-slate-50"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-700">Tampilkan Foto Mempelai di Spanduk</span>
                <input
                  type="checkbox"
                  checked={showPhoto}
                  onChange={(e) => setShowPhoto(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded-sm cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-700">Tampilkan Ornamen Khas Adat/Modern</span>
                <input
                  type="checkbox"
                  checked={showOrnaments}
                  onChange={(e) => setShowOrnaments(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded-sm cursor-pointer"
                />
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => {
                    handleSaveConfig();
                    setActiveTab('preview');
                  }}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer shadow-md transition-all"
                >
                  Simpan Pengaturan Spanduk & Lihat Pratinjau
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
