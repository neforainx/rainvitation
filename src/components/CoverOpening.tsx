import React from 'react';
import { motion } from 'motion/react';
import { MailOpen, Sparkles, Heart, Music2, MapPin, CalendarDays } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ThemeConfig, WeddingInvitation } from '../types';
import { WeddingOrnament, AnimatedCornerBorders, RotatingMandalaBackground, FloatingEtherealParticles } from './Ornaments';

interface CoverOpeningProps {
  onOpen: () => void;
  guestName: string;
  theme: ThemeConfig;
  invitation: WeddingInvitation;
}

export const CoverOpening: React.FC<CoverOpeningProps> = ({
  onOpen,
  guestName,
  theme,
  invitation
}) => {
  const handleOpenInvitation = () => {
    // Trigger festive celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: [theme.accentColor, '#F59E0B', '#10B981', '#EC4899', '#6366F1', '#E11D48']
      });
    } catch {
      // confetti fallback
    }
    onOpen();
  };

  const formattedDate = new Date(invitation.weddingDate).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <motion.div
      id="cover-opening-screen"
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-4 sm:p-8 bg-gradient-to-b ${theme.bgGradient} overflow-y-auto overflow-x-hidden`}
    >
      {/* Animated Corner Filigree Borders */}
      <AnimatedCornerBorders color={theme.accentColor} />

      {/* Floating Ethereal Shimmering Gold Dust */}
      <FloatingEtherealParticles color={theme.accentColor} />

      {/* Rotating Background Mandala Wheel */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <RotatingMandalaBackground color={theme.accentColor} />
      </div>

      {/* Top Badge & Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center pt-2 sm:pt-4"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full bg-white/85 backdrop-blur-md shadow-md border border-white/90 text-slate-800">
          <Sparkles className="w-3.5 h-3.5" style={{ color: theme.accentColor }} />
          <span>THE WEDDING INVITATION</span>
        </span>
      </motion.div>

      {/* Center Couple Showcase Card */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.75, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md my-auto py-8 px-6 sm:px-8 rounded-[36px] bg-white/85 backdrop-blur-[36px] border-2 shadow-[0_20px_50px_rgba(0,0,0,0.1)] text-center flex flex-col items-center"
        style={{ borderColor: `${theme.accentColor}40` }}
      >
        {/* Large Animated Regional Cultural Motif */}
        <div className="mb-4">
          <WeddingOrnament
            type={theme.ornamentStyle}
            className="w-24 h-24 sm:w-28 sm:h-28 mx-auto drop-shadow-xl"
            color={theme.accentColor}
            isAnimated={true}
          />
        </div>

        {/* Couple Names */}
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight mb-1 leading-tight drop-shadow-xs"
          style={{ color: theme.primaryColor }}
        >
          {invitation.groom.name.split(',')[0]}
        </h1>
        <span className="text-2xl sm:text-3xl font-serif italic text-amber-700/80 my-0.5 font-light">&</span>
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight mb-3 leading-tight drop-shadow-xs"
          style={{ color: theme.primaryColor }}
        >
          {invitation.bride.name.split(',')[0]}
        </h1>

        {/* Theme Tagline */}
        <p className="text-xs sm:text-sm text-slate-600 font-medium italic max-w-xs mb-5 leading-relaxed">
          "{theme.tagline}"
        </p>

        {/* Date & Venue Pill */}
        <div className="w-full py-3 px-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs mb-5 text-slate-700 flex flex-col items-center gap-1 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
            <CalendarDays className="w-3.5 h-3.5" style={{ color: theme.accentColor }} />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 text-[11px] truncate max-w-[280px]">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{invitation.events[0]?.locationName || 'Lokasi Acara'}</span>
          </div>
        </div>

        {/* Recipient Box: Kepada Yth */}
        <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-50/90 via-white to-amber-50/90 border border-amber-200/80 shadow-xs mb-6">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-slate-500 font-bold mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 capitalize">
            {guestName || 'Tamu Undangan Yang Berbahagia'}
          </h3>
          <p className="text-[10px] text-slate-400 mt-1">
            *Mohon maaf bila ada kesalahan penulisan nama/gelar
          </p>
        </div>

        {/* Open Invitation CTA Button with Pulsing Glow Animation */}
        <motion.button
          id="btn-buka-undangan"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          animate={{
            boxShadow: [
              `0 8px 20px -4px ${theme.accentColor}50`,
              `0 16px 36px -4px ${theme.accentColor}90`,
              `0 8px 20px -4px ${theme.accentColor}50`
            ]
          }}
          transition={{ duration: 2.2, repeat: Infinity }}
          onClick={handleOpenInvitation}
          className="w-full py-4 px-6 rounded-full font-bold text-sm sm:text-base text-white shadow-xl flex items-center justify-center gap-2.5 cursor-pointer transition-all active:scale-95"
          style={{
            backgroundColor: theme.primaryColor,
          }}
        >
          <MailOpen className="w-4 h-4 animate-bounce" />
          <span>Buka Undangan</span>
          <Music2 className="w-3.5 h-3.5 ml-1 opacity-90" />
        </motion.button>
      </motion.div>

      {/* Bottom Note */}
      <div className="relative z-10 text-center pb-2 flex flex-col items-center gap-1.5">
        {(invitation.audioTrack?.sourceType === 'spotify' || invitation.audioTrack?.spotifyUrl) && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#1DB954]/40 text-slate-200 text-[10px]">
            <div className="w-3.5 h-3.5 rounded-full bg-[#1DB954] flex items-center justify-center text-black">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </div>
            <span className="font-semibold text-slate-100">
              {invitation.audioTrack.title ? `${invitation.audioTrack.title} - ${invitation.audioTrack.artist}` : 'Musik Pernikahan via Spotify'}
            </span>
          </div>
        )}
        <p className="text-[11px] text-slate-600 font-medium flex items-center justify-center gap-1 bg-white/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/80">
          <span>Digital Wedding Invitation</span>
          <Heart className="w-3 h-3 text-red-500 inline fill-red-500" />
        </p>
      </div>
    </motion.div>
  );
};
