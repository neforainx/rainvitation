import React from 'react';
import { Camera, QrCode, UserCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { ThemeConfig } from '../types';

interface MobileActionDockProps {
  theme: ThemeConfig;
  onOpenAddPhoto: () => void;
  onOpenQrisScan: () => void;
  onOpenAttendanceCheckIn: () => void;
  isCheckedIn?: boolean;
  dockConfig?: {
    showAddPhotoLeft?: boolean;
    showQrisRight?: boolean;
    showCheckInCenter?: boolean;
  };
}

export const MobileActionDock: React.FC<MobileActionDockProps> = ({
  theme,
  onOpenAddPhoto,
  onOpenQrisScan,
  onOpenAttendanceCheckIn,
  isCheckedIn = false,
  dockConfig
}) => {
  return (
    <nav aria-label="Mobile actions dock" className="fixed bottom-3 sm:bottom-5 left-0 right-0 z-40 flex justify-center px-3 pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-between gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-full bg-slate-950/90 backdrop-blur-[36px] border border-white/20 shadow-[0_16px_50px_rgba(0,0,0,0.45)] max-w-md w-full text-white transition-all">
        {/* JIKA SUDAH CHECK-IN: TAMPILKAN TOMBOL KIRI BAWAH "ADD FOTO" */}
        {isCheckedIn ? (
          <>
            {/* Tombol Kiri Bawah: Add Foto (Muncul setelah scan QR di lokasi) */}
            <button
              id="btn-dock-add-photo"
              type="button"
              onClick={onOpenAddPhoto}
              className="flex-1 py-2.5 px-3 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer active:scale-95 border border-white/20 shadow-md animate-in fade-in"
              title="Tambah Foto ke Album Momen Bersama"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0 shadow-xs"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <Camera className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">Add Foto</span>
            </button>

            {/* Status Tengah: Terverifikasi Hadir */}
            <div
              className="py-2 px-3 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center gap-1 text-[10px] sm:text-[11px] font-bold shrink-0"
              title="Kehadiran Anda Telah Terverifikasi"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="hidden xs:inline">Hadir</span>
            </div>

            {/* Tombol Kanan Bawah: QRIS Scan / Amplop Digital */}
            <button
              id="btn-dock-qris-scan"
              type="button"
              onClick={onOpenQrisScan}
              className="flex-1 py-2.5 px-3 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer active:scale-95 border border-white/20 shadow-md"
              title="Scan QRIS Amplop / Donasi Digital"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <QrCode className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">QRIS Scan</span>
            </button>
          </>
        ) : (
          /* JIKA BELUM CHECK-IN: TAMPILKAN TOMBOL UTAMA SCAN KEHADIRAN DI LOKASI + QRIS */
          <>
            {/* Tombol Utama: Scan QR Kehadiran di Tempat Acara */}
            <button
              id="btn-dock-scan-presence"
              type="button"
              onClick={onOpenAttendanceCheckIn}
              className="flex-1 py-2.5 px-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 flex items-center justify-center gap-2 text-xs font-black transition-all cursor-pointer active:scale-95 shadow-lg border border-amber-300"
              title="Scan QR Kehadiran di Tempat Acara"
            >
              <UserCheck className="w-4 h-4 shrink-0 text-slate-950" />
              <span className="truncate">Scan Kehadiran di Lokasi</span>
            </button>

            {/* Tombol Kanan Bawah: QRIS Scan / Amplop Digital */}
            <button
              id="btn-dock-qris-scan"
              type="button"
              onClick={onOpenQrisScan}
              className="py-2.5 px-3 sm:px-4 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer active:scale-95 border border-white/10 shrink-0"
              title="Scan QRIS Amplop / Hadiah Digital"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <QrCode className="w-3 h-3" />
              </div>
              <span className="hidden xs:inline truncate">QRIS</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
