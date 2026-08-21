import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  Sparkles,
  Camera,
  QrCode,
  Heart,
  Gift,
  ArrowRight,
  MapPin,
  Calendar,
  Share2,
  Tv,
  ArrowLeft,
  Ticket
} from 'lucide-react';
import { WeddingInvitation, ThemeConfig } from '../types';
import confetti from 'canvas-confetti';
import { WeddingOrnament } from './Ornaments';

interface AttendanceConfirmationScreenProps {
  invitation: WeddingInvitation;
  theme: ThemeConfig;
  guestName?: string;
  checkInTime?: string;
  souvenirToken?: string;
  checkedInGuest?: {
    name: string;
    time: string;
    table?: string;
  };
  onOpenFeedUpload: () => void;
  onOpenQrisModal?: () => void;
  onBackToInvitation?: () => void;
  onViewFullInvitation?: () => void;
  onOpenProjectorView?: () => void;
}

export const AttendanceConfirmationScreen: React.FC<AttendanceConfirmationScreenProps> = ({
  invitation,
  theme,
  guestName,
  checkInTime,
  souvenirToken,
  checkedInGuest,
  onOpenFeedUpload,
  onOpenQrisModal,
  onBackToInvitation,
  onViewFullInvitation,
  onOpenProjectorView
}) => {
  const displayName = guestName || checkedInGuest?.name || 'Tamu Undangan Terhormat';
  const displayTime = checkInTime || checkedInGuest?.time || 'Hari Ini';
  const displayToken = souvenirToken || `SVN-${Math.floor(1000 + Math.random() * 9000)}`;

  const handleReturn = () => {
    if (onBackToInvitation) onBackToInvitation();
    else if (onViewFullInvitation) onViewFullInvitation();
  };

  useEffect(() => {
    // Launch celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden flex flex-col items-center justify-start p-4 sm:p-6 text-slate-900 pb-28"
      style={{
        background: theme.bgGradient,
        fontFamily: theme.fontBody
      }}
    >
      {/* Background Ornaments / Ambient Liquid Glass blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-5 w-60 h-60 bg-rose-400/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Navigation */}
      <div className="w-full max-w-lg flex items-center justify-between py-3 z-10 mb-2">
        <button
          id="btn-back-to-invitation-from-pass"
          type="button"
          onClick={handleReturn}
          className="px-3.5 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer hover:bg-white active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-slate-600" />
          <span>Lihat Undangan Lengkap</span>
        </button>

        <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 text-[11px] font-extrabold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>TERVERIFIKASI HADIR</span>
        </span>
      </div>

      {/* Main VIP Confirmation Card (iOS Liquid Glass Aesthetic) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-lg bg-white/85 backdrop-blur-[36px] border border-white/95 rounded-[32px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative z-10 text-center"
      >
        {/* Verification Badge Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-4 animate-bounce">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        <span className="text-[11px] uppercase tracking-widest font-extrabold text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>VIP GUEST CHECK-IN PASS</span>
        </span>

        <h1
          className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 leading-tight mb-2"
          style={{ color: theme.primaryColor }}
        >
          {invitation.attendanceConfig?.welcomeTitle || 'Selamat Datang di Hari Bahagia Kami!'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          {invitation.attendanceConfig?.welcomeMessage ||
            'Terima kasih telah hadir dan memberikan doa restu secara langsung di hari pernikahan kami.'}
        </p>

        {/* Guest Pass Verified Details Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs text-left mb-6 space-y-3">
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
            <span className="text-xs text-slate-500 font-medium">Tamu Terhormat:</span>
            <strong className="text-sm font-bold text-slate-900">{displayName}</strong>
          </div>

          <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
            <span className="text-xs text-slate-500 font-medium">Waktu Check-In:</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              {displayTime}
            </span>
          </div>

          {invitation.attendanceConfig?.showSouvenirCounter !== false && (
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <Ticket className="w-3.5 h-3.5 text-amber-600" />
                <span>Kupon Souvenir:</span>
              </span>
              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-lg">
                {displayToken}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
            <span className="text-xs text-slate-500 font-medium">Meja Rekomendasi:</span>
            <span className="text-xs font-bold text-slate-800">
              {checkedInGuest?.table || 'Meja Resepsi Utama'}
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">{invitation.events[0]?.locationName || 'Ballroom Resepsi'}</span>
          </div>
        </div>

        {/* Action Grid: Upload Foto & QRIS Amplop */}
        <div className="space-y-3">
          <button
            id="btn-confirm-upload-photo"
            type="button"
            onClick={onOpenFeedUpload}
            className="w-full py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-bold text-white shadow-md flex items-center justify-center gap-2.5 cursor-pointer hover:opacity-95 active:scale-95 transition-all"
            style={{ backgroundColor: theme.primaryColor }}
          >
            <Camera className="w-4 h-4" />
            <span>Ambil & Unggah Foto ke Album Momen Bersama</span>
          </button>

          {onOpenQrisModal && (
            <button
              id="btn-confirm-open-qris"
              type="button"
              onClick={onOpenQrisModal}
              className="w-full py-3.5 px-5 rounded-2xl bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-bold shadow-xs flex items-center justify-center gap-2.5 cursor-pointer hover:bg-slate-50 active:scale-95 transition-all"
            >
              <QrCode className="w-4 h-4 text-emerald-600" />
              <span>Kirim Kado / Scan QRIS Digital</span>
            </button>
          )}

          <button
            id="btn-confirm-view-invitation"
            type="button"
            onClick={handleReturn}
            className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <span>Buka Seluruh Halaman Undangan & Cerita Cinta</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Couple Signature Note */}
        <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-center gap-2 text-xs text-slate-500">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>
            Dengan penuh kasih, <strong className="text-slate-800">{invitation.groom.name.split(' ')[0]} & {invitation.bride.name.split(' ')[0]}</strong>
          </span>
        </div>
      </motion.div>
    </div>
  );
};
