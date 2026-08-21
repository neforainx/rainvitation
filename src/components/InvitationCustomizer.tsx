import React, { useState } from 'react';
import { Settings, Share2, Copy, Check, Sparkles, MessageCircle, Link, X, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeConfig, WeddingInvitation } from '../types';

interface CustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  guestName: string;
  onUpdateGuestName: (name: string) => void;
  theme: ThemeConfig;
  invitation: WeddingInvitation;
  onOpenThemeModal: () => void;
  isLiveFeedMode: boolean;
  onToggleLiveFeedMode: (active: boolean) => void;
}

export const InvitationCustomizer: React.FC<CustomizerProps> = ({
  isOpen,
  onClose,
  guestName,
  onUpdateGuestName,
  theme,
  invitation,
  onOpenThemeModal,
  isLiveFeedMode,
  onToggleLiveFeedMode
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedWA, setCopiedWA] = useState(false);

  // Generate shareable URL
  const baseUrl = window.location.origin + window.location.pathname;
  const shareableUrl = `${baseUrl}?to=${encodeURIComponent(guestName || 'Tamu Undangan')}`;

  const waText = `Kepada Yth.
Bapak/Ibu/Saudara/i: *${guestName || 'Tamu Undangan'}*

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

💍 *${invitation.groom.name.split(',')[0]} & ${invitation.bride.name.split(',')[0]}*

🗓️ *Hari/Tgl:* ${new Date(invitation.weddingDate).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })}
📍 *Tempat:* ${invitation.events[0]?.locationName}

Untuk informasi detail acara, mohon kunjungi tautan undangan digital kami:
${shareableUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu.

Hormat kami yang berbahagia,
*${invitation.groom.name.split(',')[0]} & ${invitation.bride.name.split(',')[0]}*
Beserta Keluarga Besar`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyWA = () => {
    navigator.clipboard.writeText(waText);
    setCopiedWA(true);
    setTimeout(() => setCopiedWA(false), 2500);
  };

  const handleSendWA = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto relative"
          >
            {/* Close Button */}
            <button
              id="btn-close-customizer"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-xs"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  Kustomisasi Undangan & Bagikan
                </h3>
                <p className="text-xs text-slate-500">
                  Buat tautan personal untuk setiap nama tamu
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Guest Name Field */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Nama Tamu Yang Dituju (Personalized Link)
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => onUpdateGuestName(e.target.value)}
                  placeholder="Contoh: Bpk. Ir. Joko & Istri"
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500/50 outline-none"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Nama ini akan otomatis tertera di amplop buka undangan & ucapan pembuka.
                </p>
              </div>

              {/* Mode Switcher: Normal vs Live Feed Hari-H */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Mode Hari-H / Live Feed Album</span>
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Tampilkan langsung feed foto kamera tamu di bagian atas
                    </p>
                  </div>

                  <button
                    onClick={() => onToggleLiveFeedMode(!isLiveFeedMode)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isLiveFeedMode
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-300'
                    }`}
                  >
                    {isLiveFeedMode ? 'Aktif (Hari-H)' : 'Mode Undangan'}
                  </button>
                </div>
              </div>

              {/* Theme Shortcut */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Tema Saat Ini: {theme.name}
                  </span>
                  <span className="text-[10px] text-slate-500">{theme.tagline}</span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenThemeModal();
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  Ganti Tema
                </button>
              </div>

              {/* Shareable Link Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Link className="w-3.5 h-3.5 text-slate-500" />
                  <span>Tautan Undangan Khusus Tamu</span>
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareableUrl}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600 select-all outline-none"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-800 hover:bg-slate-100 flex items-center gap-1 flex-shrink-0 cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Tersalin' : 'Salin'}</span>
                  </button>
                </div>
              </div>

              {/* WhatsApp Share Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleSendWA}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-98"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Kirim Langsung via WhatsApp</span>
                </button>

                <button
                  onClick={handleCopyWA}
                  className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  {copiedWA ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedWA ? 'Teks WhatsApp Tersalin!' : 'Salin Format Teks Undangan WA'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
