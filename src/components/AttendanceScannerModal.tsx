import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Camera,
  QrCode,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Zap,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { WeddingInvitation, ThemeConfig } from '../types';

interface AttendanceScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  invitation?: WeddingInvitation;
  theme: ThemeConfig;
  guestName?: string;
  expectedCode?: string;
  onSuccessCheckIn?: (code: string) => void;
  onCheckInSuccess?: (guestData: { name: string; time: string; table?: string }) => void;
}

export const AttendanceScannerModal: React.FC<AttendanceScannerModalProps> = ({
  isOpen,
  onClose,
  invitation,
  theme,
  guestName = 'Tamu Undangan Terhormat',
  expectedCode,
  onSuccessCheckIn,
  onCheckInSuccess
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [inputGuestName, setInputGuestName] = useState(guestName !== 'Tamu Undangan Terhormat' ? guestName : '');

  // Start Camera only when modal is actively opened
  useEffect(() => {
    let activeStream: MediaStream | null = null;

    if (isOpen) {
      setIsScanning(true);
      setCameraError(null);

      // Access camera stream safely
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({
            video: { facingMode: facingMode, width: { ideal: 1280 }, height: { ideal: 720 } }
          })
          .then((mediaStream) => {
            activeStream = mediaStream;
            setStream(mediaStream);
            if (videoRef.current) {
              videoRef.current.srcObject = mediaStream;
              videoRef.current.play().catch(() => {});
            }
          })
          .catch((err) => {
            console.warn('Camera access restriction or user denied:', err);
            setCameraError(
              'Akses kamera langsung dibatasi oleh peramban atau mode sandboxing. Anda dapat menekan tombol Simulasi Scan QR di bawah.'
            );
          });
      } else {
        setCameraError('Perangkat peramban ini tidak mendukung API kamera web.');
      }
    }

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen, facingMode]);

  const handleStopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleSuccessTrigger = (nameToUse?: string) => {
    handleStopCamera();
    const finalName = nameToUse || inputGuestName.trim() || guestName;
    const checkInTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    const code = expectedCode || 'QR-ATTEND-SUCCESS';

    if (onSuccessCheckIn) {
      onSuccessCheckIn(code);
    }
    if (onCheckInSuccess) {
      onCheckInSuccess({
        name: finalName,
        time: checkInTime,
        table: 'Meja VIP / Meja Utama'
      });
    }
    onClose();
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      handleSuccessTrigger();
    }, 600);
  };

  const toggleFacingMode = () => {
    handleStopCamera();
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          handleStopCamera();
          onClose();
        }}
        className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.92, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/10 relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-serif text-white">
                  Scan QR Kehadiran di Tempat Acara
                </h3>
                <p className="text-[10px] text-slate-400">
                  Arahkan kamera ke QR Code di Meja Tamu / Resepsi
                </p>
              </div>
            </div>

            <button
              id="btn-close-scanner"
              onClick={() => {
                handleStopCamera();
                onClose();
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 cursor-pointer transition-all active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Guest Name Input */}
          <div className="mb-4">
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Nama Anda (Tamu Undangan):
            </label>
            <div className="flex items-center gap-2 bg-slate-800/80 rounded-xl px-3 py-2 border border-white/10">
              <UserCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <input
                type="text"
                value={inputGuestName}
                onChange={(e) => setInputGuestName(e.target.value)}
                placeholder="Masukkan nama Anda..."
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 outline-hidden font-medium"
              />
            </div>
          </div>

          {/* Camera Viewfinder Box */}
          <div className="relative w-full aspect-square max-w-[280px] mx-auto rounded-2xl overflow-hidden bg-black border-2 border-white/20 shadow-inner flex items-center justify-center">
            {/* Real Video element */}
            <video
              ref={videoRef}
              playsInline
              muted
              autoPlay
              className="w-full h-full object-cover"
            />

            {/* Viewfinder Target Borders */}
            <div className="absolute inset-4 pointer-events-none border-2 border-dashed border-white/40 rounded-xl flex flex-col justify-between p-2">
              <div className="flex justify-between">
                <span className="w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
                <span className="w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
              </div>
              <div className="flex justify-between">
                <span className="w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
                <span className="w-4 h-4 border-b-2 border-r-2 border-emerald-400" />
              </div>
            </div>

            {/* Animated Laser Scanning Line */}
            <motion.div
              animate={{ y: [-100, 100, -100] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399]"
            />

            {/* Camera switch button */}
            {stream && (
              <button
                type="button"
                onClick={toggleFacingMode}
                className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-md cursor-pointer hover:bg-black/80"
                title="Ganti Kamera Depan/Belakang"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Camera Fallback Warning Overlay if blocked */}
            {cameraError && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center">
                <Camera className="w-8 h-8 text-amber-400 mb-2 opacity-80" />
                <p className="text-[11px] text-slate-300 leading-snug">
                  {cameraError}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-5 space-y-2.5">
            <button
              id="btn-trigger-checkin-scan"
              type="button"
              onClick={handleSimulateScan}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Verifikasi Scan QR Kehadiran</span>
            </button>

            <div className="text-center">
              <p className="text-[10px] text-slate-400">
                Setelah scan berhasil, tombol <strong>Add Foto</strong> & <strong>Album Momen Bersama</strong> akan otomatis terbuka!
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
