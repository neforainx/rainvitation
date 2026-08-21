import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Video, Instagram, QrCode } from 'lucide-react';
import { WeddingInvitation, ThemeConfig, CouplePerson } from '../types';
import { WeddingOrnament, AnimatedCornerBorders, FloatingEtherealParticles } from './Ornaments';
import { CountdownTimer } from './CountdownTimer';

interface TemplateLayoutProps {
  invitation: WeddingInvitation;
  theme: ThemeConfig;
  guestName: string;
}

export const TemplateHeroRenderer: React.FC<TemplateLayoutProps> = ({ invitation, theme }) => {
  const archetype = theme.layoutArchetype || 'adat-royal';
  const groomFirst = invitation.groom.name.split(',')[0];
  const brideFirst = invitation.bride.name.split(',')[0];
  const groomInitial = groomFirst.charAt(0);
  const brideInitial = brideFirst.charAt(0);
  const weddingDateObj = new Date(invitation.weddingDate);
  const dayNum = weddingDateObj.getDate();
  const monthName = weddingDateObj.toLocaleDateString('id-ID', { month: 'long' }).toUpperCase();
  const monthShort = weddingDateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const yearNum = weddingDateObj.getFullYear();
  const weekdayName = weddingDateObj.toLocaleDateString('id-ID', { weekday: 'long' });
  const dateFormatted = `${weekdayName}, ${dayNum} ${monthName} ${yearNum}`;

  // 1. FRAMER CINEMATIC MOOD (Elian & Rose - 001 Framer Style)
  if (archetype === 'framer-cinematic') {
    return (
      <section className="relative pt-6 sm:pt-10 pb-10 px-4 text-center overflow-hidden">
        {/* Top Floating Glass Nav Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto mb-6 px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/15 flex items-center justify-between text-xs text-white/90 shadow-lg"
        >
          <div className="flex items-center gap-2 font-serif font-bold tracking-widest text-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
            {groomInitial} & {brideInitial}
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] uppercase tracking-wider text-slate-300">
            <span>Venue</span>
            <span>•</span>
            <span>Schedule</span>
            <span>•</span>
            <span>Dress Code</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-400/40 text-[10px] uppercase tracking-wider">
            RSVP
          </span>
        </motion.div>

        {/* Hero Card with Dark Cinematic Gradient & Monogram Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto relative z-10 p-6 sm:p-10 rounded-[36px] bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-black text-white border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Rose Crest Ornament */}
          <div className="mb-4 flex flex-col items-center">
            <WeddingOrnament type="rose-crest" className="w-20 h-20 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" color="#F59E0B" />
            <span className="text-[11px] font-serif uppercase tracking-[0.35em] text-amber-400 mt-2 font-bold">
              THE WEDDING OF
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-light tracking-wide mb-3 leading-none text-white drop-shadow-md">
            {groomFirst} <span className="font-serif italic font-normal text-amber-400">&</span> {brideFirst}
          </h1>

          <div className="inline-flex items-center gap-3 px-5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-slate-200 text-xs font-mono tracking-widest uppercase my-4 shadow-inner">
            <span>{monthShort}</span>
            <span>•</span>
            <span className="text-amber-400 font-bold text-sm">{dayNum}</span>
            <span>•</span>
            <span>{yearNum}</span>
          </div>

          <p className="text-xs text-slate-400 font-light mb-6">
            We invite you to celebrate our union under the golden hour twilight.
          </p>

          <CountdownTimer
            targetDate={invitation.weddingDate}
            theme={theme}
            title={`${groomFirst} & ${brideFirst}`}
            location={invitation.events[0]?.locationName || 'Golden Hour Pavilion'}
          />
        </motion.div>
      </section>
    );
  }

  // 2. WHITE MEADOW SCRIPT (Anna & Evans - 032 White Leaves Illustration)
  if (archetype === 'white-meadow-script') {
    return (
      <section className="relative pt-10 sm:pt-14 pb-8 px-4 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto relative z-10 p-6 sm:p-10 rounded-[40px] bg-gradient-to-b from-white/95 to-[#F4F9F0] border-2 border-lime-800/20 shadow-[0_20px_50px_rgba(46,78,20,0.12)] relative"
        >
          {/* Top Leaf Botanical Spray */}
          <div className="flex justify-center mb-3">
            <WeddingOrnament type="meadow-leaf" className="w-16 h-16 text-lime-700" color="#4D7C0F" />
          </div>

          <span className="text-xs font-serif tracking-[0.25em] text-lime-900 uppercase block mb-1 font-bold">
            TOGETHER WITH THEIR FAMILIES
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic text-lime-950 mb-3 leading-tight drop-shadow-xs">
            {groomFirst} <span className="font-light text-lime-700">&</span> {brideFirst}
          </h1>

          {/* Floating White Crisp Date Plaque */}
          <div className="max-w-xs mx-auto my-5 p-3 rounded-2xl bg-white shadow-lg border border-lime-600/20 flex items-center justify-around text-slate-800 font-serif">
            <div className="text-center">
              <span className="text-[10px] tracking-widest uppercase text-slate-500 block">MONTH</span>
              <span className="text-xs font-bold text-lime-900">{monthShort}</span>
            </div>
            <div className="h-8 w-[1px] bg-lime-300" />
            <div className="text-center px-2">
              <span className="text-2xl font-bold text-lime-800 font-serif leading-none">{dayNum}</span>
            </div>
            <div className="h-8 w-[1px] bg-lime-300" />
            <div className="text-center">
              <span className="text-[10px] tracking-widest uppercase text-slate-500 block">YEAR</span>
              <span className="text-xs font-bold text-lime-900">{yearNum}</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 font-medium mb-6">
            {invitation.events[0]?.locationName || 'Meadow View Villa'}
          </p>

          <CountdownTimer
            targetDate={invitation.weddingDate}
            theme={theme}
            title={`${groomFirst} & ${brideFirst}`}
            location={invitation.events[0]?.locationName || 'Meadow Villa'}
          />
        </motion.div>
      </section>
    );
  }

  // 3. NAVY SKETCH POPPY (Jonathan + Juliana - 033 Beige Minimalist)
  if (archetype === 'navy-sketch-poppy') {
    return (
      <section className="relative pt-10 sm:pt-14 pb-8 px-4 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto relative z-10 p-7 sm:p-10 rounded-3xl bg-[#FAF8F5] border-2 border-slate-300 shadow-[0_20px_50px_rgba(30,58,138,0.12)] relative"
        >
          {/* Offset Double Border Rectangle */}
          <div className="absolute inset-3 border border-slate-400/40 rounded-2xl pointer-events-none" />

          {/* Corner Poppy Sketches */}
          <div className="absolute top-4 left-4 opacity-70">
            <WeddingOrnament type="poppy-sketch" className="w-12 h-12 text-blue-900" color="#1E3A8A" />
          </div>
          <div className="absolute bottom-4 right-4 opacity-70 scale-x-[-1] scale-y-[-1]">
            <WeddingOrnament type="poppy-sketch" className="w-12 h-12 text-blue-900" color="#1E3A8A" />
          </div>

          <span className="text-[11px] font-serif uppercase tracking-[0.3em] text-blue-950 block mb-2 font-bold">
            JOIN US IN CELEBRATING
          </span>

          <h1 className="text-4xl sm:text-5xl font-serif text-blue-950 mb-3 leading-tight tracking-wide">
            {groomFirst} <span className="font-light text-blue-700">+</span> {brideFirst}
          </h1>

          <div className="w-16 h-[1px] bg-blue-900/40 mx-auto my-3" />

          <p className="text-xs sm:text-sm font-serif uppercase tracking-widest text-slate-700 font-semibold mb-6">
            {dateFormatted}
          </p>

          <CountdownTimer
            targetDate={invitation.weddingDate}
            theme={theme}
            title={`${groomFirst} + ${brideFirst}`}
            location={invitation.events[0]?.locationName || 'The Grand Chapel'}
          />
        </motion.div>
      </section>
    );
  }

  // 4. BISMILLAH BOTANICAL WATERCOLOR (Daniel & Marceline - 023 Islamic Gardenia)
  if (archetype === 'bismillah-botanical-watercolor') {
    return (
      <section className="relative pt-10 sm:pt-14 pb-8 px-4 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto relative z-10 p-7 sm:p-10 rounded-[44px] bg-[#FCFBF7] border-2 border-amber-600/30 shadow-[0_20px_50px_rgba(217,119,6,0.12)] relative"
        >
          {/* Bismillah Calligraphy Header */}
          <div className="mb-4">
            <p className="font-serif text-xl sm:text-2xl text-amber-900 leading-relaxed font-arabic mb-1">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full inline-block border border-emerald-300">
              Walimatul Ursy
            </span>
          </div>

          <div className="my-2 flex justify-center">
            <WeddingOrnament type="gardenia-wreath" className="w-14 h-14" color="#15803D" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-2 leading-tight">
            {groomFirst} <span className="font-light text-amber-700">&</span> {brideFirst}
          </h1>

          {/* Golden Vertical Pillar Date Indicator */}
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="text-xs font-serif font-bold uppercase tracking-wider text-amber-900">{monthName}</span>
            <div className="h-6 w-[2px] bg-amber-600/60" />
            <span className="text-3xl font-serif font-bold text-emerald-900 leading-none">{dayNum}</span>
            <div className="h-6 w-[2px] bg-amber-600/60" />
            <span className="text-xs font-serif font-bold uppercase tracking-wider text-amber-900">{yearNum}</span>
          </div>

          <p className="text-xs text-slate-600 mb-6 font-medium">
            {invitation.events[0]?.locationName || 'Masjid Agung & Ballroom'}
          </p>

          <CountdownTimer
            targetDate={invitation.weddingDate}
            theme={theme}
            title={`${groomFirst} & ${brideFirst}`}
            location={invitation.events[0]?.locationName || 'Masjid Agung'}
          />
        </motion.div>
      </section>
    );
  }

  // 5. FRENCH ARCH MONOGRAM (Greta & Morgan - 025 Cream & Green Playful)
  if (archetype === 'french-arch-monogram') {
    return (
      <section className="relative pt-10 sm:pt-14 pb-8 px-4 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto relative z-10 p-7 sm:p-10 rounded-t-[100px] rounded-b-3xl bg-[#FAF9F5] border-2 border-lime-900/25 shadow-[0_20px_50px_rgba(63,98,18,0.12)] relative"
        >
          {/* Climber Arch Trellis Monogram */}
          <div className="mb-4 flex flex-col items-center">
            <WeddingOrnament type="french-arch" className="w-20 h-20" color="#4D7C0F" />
            <div className="mt-2 text-xs font-serif font-bold text-lime-950 tracking-[0.25em] border border-lime-700/30 px-3 py-0.5 rounded-full bg-lime-50">
              {groomInitial} | {brideInitial}
            </div>
          </div>

          <span className="text-[11px] font-serif uppercase tracking-[0.3em] text-slate-600 block mb-2 font-semibold">
            PLEASE JOIN US FOR THE WEDDING OF
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-wider uppercase text-slate-900 mb-2 leading-tight">
            {groomFirst} & {brideFirst}
          </h1>

          <div className="h-[1px] w-24 mx-auto bg-lime-800/30 my-3" />

          <p className="text-xs font-serif uppercase tracking-widest text-lime-900 font-bold mb-6">
            {dateFormatted}
          </p>

          <CountdownTimer
            targetDate={invitation.weddingDate}
            theme={theme}
            title={`${groomFirst} & ${brideFirst}`}
            location={invitation.events[0]?.locationName || 'Château Pavilion'}
          />
        </motion.div>
      </section>
    );
  }

  // 6. MAROON PLUMERIA MONOGRAM (Ketut & Dewi - 026 Red Minimalist)
  if (archetype === 'maroon-plumeria-monogram') {
    return (
      <section className="relative pt-10 sm:pt-14 pb-8 px-4 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto relative z-10 p-7 sm:p-10 rounded-3xl bg-gradient-to-b from-[#4C0519] via-[#3B0312] to-[#200109] text-white border-2 border-rose-500/30 shadow-[0_20px_50px_rgba(225,29,72,0.3)] relative overflow-hidden"
        >
          {/* Top Giant Initial & Plumeria Blossom */}
          <div className="flex items-center justify-between mb-6 px-4">
            <div className="text-left">
              <span className="text-4xl sm:text-5xl font-serif font-black tracking-tighter text-rose-200">
                {groomInitial}{brideInitial}
              </span>
              <div className="h-10 w-[2px] bg-rose-400 mt-1" />
            </div>
            <WeddingOrnament type="plumeria-monogram" className="w-16 h-16" color="#FFE4E6" />
          </div>

          <span className="text-xs font-serif uppercase tracking-[0.25em] text-rose-300 block mb-2 font-bold text-left px-4">
            THE WEDDING CELEBRATION
          </span>

          <h1 className="text-4xl sm:text-6xl font-serif italic text-white mb-4 text-left px-4 leading-tight">
            {groomFirst} & {brideFirst}
          </h1>

          {/* Dual Pill Date Columns */}
          <div className="grid grid-cols-2 gap-3 my-5 px-4">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-left">
              <span className="text-[10px] uppercase tracking-widest text-rose-300 block">Date</span>
              <span className="text-xs font-bold text-white">{dateFormatted}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-left">
              <span className="text-[10px] uppercase tracking-widest text-rose-300 block">Time</span>
              <span className="text-xs font-bold text-white">{invitation.events[0]?.time || '10:00 WITA'}</span>
            </div>
          </div>

          <CountdownTimer
            targetDate={invitation.weddingDate}
            theme={theme}
            title={`${groomFirst} & ${brideFirst}`}
            location={invitation.events[0]?.locationName || 'Bali Resort Villa'}
          />
        </motion.div>
      </section>
    );
  }

  // 7. FROSTED VEIL OVAL (Daniel & Estelle - 028 Grey & Brown Elegant)
  if (archetype === 'frosted-veil-oval') {
    return (
      <section className="relative pt-10 sm:pt-14 pb-8 px-4 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto relative z-10 p-8 sm:p-12 rounded-[50px] bg-white/75 backdrop-blur-2xl border-2 border-amber-900/20 shadow-[0_20px_60px_rgba(146,64,14,0.15)] relative"
        >
          <span className="text-[11px] font-serif uppercase tracking-[0.35em] text-amber-900 block mb-3 font-bold">
            TOGETHER WITH THEIR FAMILIES
          </span>

          <h1 className="text-4xl sm:text-6xl font-serif text-slate-900 mb-2 leading-tight">
            {groomFirst} <span className="font-serif italic text-amber-800 font-light">&</span> {brideFirst}
          </h1>

          <div className="h-[2px] w-20 mx-auto bg-gradient-to-r from-transparent via-amber-800 to-transparent my-4" />

          <p className="text-xs sm:text-sm font-serif uppercase tracking-widest text-slate-700 font-semibold mb-6">
            {weekdayName.toUpperCase()}, {dayNum} {monthName} {yearNum}
          </p>

          <CountdownTimer
            targetDate={invitation.weddingDate}
            theme={theme}
            title={`${groomFirst} & ${brideFirst}`}
            location={invitation.events[0]?.locationName || 'Grand Estate'}
          />
        </motion.div>
      </section>
    );
  }

  // 8. PASTEL MEADOW WREATH (Olivia & Richard - 029 White Floral Watercolor)
  if (archetype === 'pastel-meadow-wreath') {
    return (
      <section className="relative pt-10 sm:pt-14 pb-8 px-4 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto relative z-10 p-7 sm:p-10 rounded-[44px] bg-white/95 border-2 border-amber-200 shadow-[0_20px_50px_rgba(245,158,11,0.12)] relative"
        >
          <span className="text-xs font-serif italic text-amber-900 block mb-2 font-semibold">
            Save the Date for the Wedding of
          </span>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-slate-900 mb-2 leading-tight">
            {groomFirst.toUpperCase()} <span className="font-serif italic font-normal text-amber-600 lowercase">and</span> {brideFirst.toUpperCase()}
          </h1>

          <div className="inline-block px-5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 font-serif text-xs font-bold tracking-widest uppercase my-4 shadow-xs">
            {dayNum} {monthName} {yearNum}
          </div>

          <p className="text-xs text-slate-600 font-medium mb-6">
            {invitation.events[0]?.locationName || 'Botanical Glasshouse'}
          </p>

          <CountdownTimer
            targetDate={invitation.weddingDate}
            theme={theme}
            title={`${groomFirst} & ${brideFirst}`}
            location={invitation.events[0]?.locationName || 'Botanical Glasshouse'}
          />
        </motion.div>
      </section>
    );
  }

  // 9. ROYAL PALACE LOTUS ARCH (Prerna & Sumit - 034 Beige & Pink Watercolor)
  if (archetype === 'royal-palace-lotus-arch') {
    return (
      <section className="relative pt-10 sm:pt-14 pb-8 px-4 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto relative z-10 p-7 sm:p-10 rounded-t-[90px] rounded-b-3xl bg-gradient-to-b from-[#FFF8F0] via-[#FDEBD8] to-[#F9DEC2] border-3 border-amber-600/40 shadow-[0_20px_60px_rgba(217,119,6,0.2)] relative"
        >
          {/* Palace Pinnacle Ornament */}
          <div className="mb-3 flex flex-col items-center">
            <WeddingOrnament type="palace-lotus-arch" className="w-20 h-20" color="#D97706" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-900 mt-1">
              Royal Heritage Celebration
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-amber-950 mb-2 leading-tight">
            {groomFirst} <span className="text-pink-600 font-light">&</span> {brideFirst}
          </h1>

          <p className="text-xs sm:text-sm font-serif font-bold text-amber-900 tracking-wider uppercase my-3">
            {dateFormatted}
          </p>

          <CountdownTimer
            targetDate={invitation.weddingDate}
            theme={theme}
            title={`${groomFirst} & ${brideFirst}`}
            location={invitation.events[0]?.locationName || 'Royal Palace Ballroom'}
          />
        </motion.div>
      </section>
    );
  }

  // 10. EDITORIAL B&W VERTICAL (Sarah & Henry - 035 B&W Modern)
  if (archetype === 'editorial-bw-vertical') {
    return (
      <section className="relative pt-10 sm:pt-14 pb-8 px-4 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto relative z-10 p-7 sm:p-10 rounded-3xl bg-white border-2 border-zinc-300 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative"
        >
          <span className="text-[10px] font-sans tracking-[0.35em] uppercase text-zinc-500 block mb-2 font-black">
            EDITORIAL INVITATION
          </span>

          <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-black mb-1 leading-none uppercase">
            {groomFirst}
          </h1>
          <span className="font-serif italic text-2xl sm:text-3xl text-zinc-500 my-1 block">&</span>
          <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-black mb-4 leading-none uppercase">
            {brideFirst}
          </h1>

          <div className="w-16 h-[2px] bg-black mx-auto my-3" />

          <p className="text-xs font-mono tracking-widest text-zinc-700 font-bold mb-6 uppercase">
            {dateFormatted}
          </p>

          <CountdownTimer
            targetDate={invitation.weddingDate}
            theme={theme}
            title={`${groomFirst} & ${brideFirst}`}
            location={invitation.events[0]?.locationName || 'Contemporary Studio'}
          />
        </motion.div>
      </section>
    );
  }

  // 11. SEAFOAM SAGE THISTLE (Richard & Amanda - 039 Green & Elegant Floral)
  if (archetype === 'seafoam-sage-thistle') {
    return (
      <section className="relative pt-10 sm:pt-14 pb-8 px-4 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto relative z-10 p-7 sm:p-10 rounded-[44px] bg-[#F0FDF9]/95 border-2 border-emerald-600/30 shadow-[0_20px_50px_rgba(5,150,105,0.12)] relative"
        >
          <div className="flex justify-center mb-3">
            <WeddingOrnament type="thistle-stem" className="w-14 h-14" color="#059669" />
          </div>

          <span className="text-[11px] font-serif uppercase tracking-[0.3em] text-emerald-900 block mb-2 font-bold">
            JOIN US IN CELEBRATING
          </span>

          <h1 className="text-4xl sm:text-5xl font-serif italic text-slate-900 mb-2 leading-tight">
            {groomFirst} <span className="font-light text-emerald-700">&</span> {brideFirst}
          </h1>

          <div className="inline-block px-4 py-1 rounded-full bg-emerald-100/80 text-emerald-900 font-mono text-xs font-bold tracking-widest my-3 border border-emerald-300">
            {dayNum} . {monthShort} . {yearNum}
          </div>

          <p className="text-xs text-slate-600 font-medium mb-6">
            {invitation.events[0]?.locationName || 'Seafoam Garden Villa'}
          </p>

          <CountdownTimer
            targetDate={invitation.weddingDate}
            theme={theme}
            title={`${groomFirst} & ${brideFirst}`}
            location={invitation.events[0]?.locationName || 'Seafoam Villa'}
          />
        </motion.div>
      </section>
    );
  }

  // 12. ISLAMIC ARABESQUE FREE (Ahmad & Fatimah Emerald Arabesque / Umar & Halimah Medina)
  if (archetype === 'islamic-arabesque-free') {
    return (
      <section className="relative pt-10 sm:pt-14 pb-8 px-4 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto relative z-10 p-7 sm:p-10 rounded-[48px] bg-white/95 backdrop-blur-xl border-3 shadow-[0_20px_50px_rgba(6,78,59,0.15)] relative overflow-hidden"
          style={{ borderColor: `${theme.accentColor}50` }}
        >
          {/* Top Basmalah Calligraphy Banner */}
          <div className="mb-4">
            <p className="font-serif text-xl sm:text-2xl leading-relaxed text-amber-800 font-arabic mb-1">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
              <span>🕌 Walimatul Ursy</span>
            </div>
          </div>

          <div className="my-2 flex justify-center">
            <WeddingOrnament type="islamic-arabesque" className="w-16 h-16" color={theme.accentColor} />
          </div>

          <span className="text-[11px] font-serif uppercase tracking-[0.3em] block mb-2 font-bold" style={{ color: theme.primaryColor }}>
            MAHLIGAI PERNIKAHAN ISLAMI
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-2 leading-tight" style={{ color: theme.primaryColor }}>
            {groomFirst} <span className="font-light text-amber-600">&</span> {brideFirst}
          </h1>

          {/* Pillars of Day Box */}
          <div className="flex items-center justify-center gap-4 my-4 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/60 max-w-xs mx-auto">
            <span className="text-xs font-serif font-bold uppercase tracking-wider text-slate-700">{monthName}</span>
            <div className="h-6 w-[2px] bg-amber-500" />
            <span className="text-3xl font-serif font-black text-amber-800 leading-none">{dayNum}</span>
            <div className="h-6 w-[2px] bg-amber-500" />
            <span className="text-xs font-serif font-bold uppercase tracking-wider text-slate-700">{yearNum}</span>
          </div>

          <p className="text-xs text-slate-600 font-medium mb-6">
            {invitation.events[0]?.locationName || 'Masjid Agung & Ballroom'}
          </p>

          <CountdownTimer
            targetDate={invitation.weddingDate}
            theme={theme}
            title={`${groomFirst} & ${brideFirst}`}
            location={invitation.events[0]?.locationName || 'Masjid Agung'}
          />
        </motion.div>
      </section>
    );
  }

  // 13. FRAMER ISLAMIC ARCH (Zaid & Yasmin Framer Modern Sage)
  if (archetype === 'framer-islamic-arch') {
    return (
      <section className="relative pt-6 sm:pt-10 pb-10 px-4 text-center overflow-hidden">
        {/* Floating Framer Pill Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto mb-6 px-4 py-2 rounded-full bg-emerald-950/80 text-white backdrop-blur-xl border border-emerald-400/30 flex items-center justify-between text-xs shadow-lg"
        >
          <span className="font-serif font-bold tracking-widest text-emerald-300">
            {groomInitial} & {brideInitial} • Walimah
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 text-[10px] font-bold uppercase">
            Syar'i
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto relative z-10 p-7 sm:p-10 rounded-t-[100px] rounded-b-3xl bg-white/95 border-2 border-emerald-600/30 shadow-[0_20px_50px_rgba(5,150,105,0.15)] relative"
        >
          <div className="mb-4">
            <p className="font-arabic text-lg sm:text-xl text-emerald-900 leading-relaxed mb-1">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <span className="text-[10px] font-serif uppercase tracking-[0.3em] text-slate-500 font-bold block">
              THE WEDDING INVITATION
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif text-slate-900 mb-2 leading-tight">
            {groomFirst} <span className="font-serif italic text-emerald-700 font-light">&</span> {brideFirst}
          </h1>

          <div className="h-[2px] w-16 mx-auto bg-emerald-600/40 my-3" />

          <p className="text-xs font-serif uppercase tracking-widest text-emerald-900 font-bold mb-6">
            {dateFormatted}
          </p>

          <CountdownTimer
            targetDate={invitation.weddingDate}
            theme={theme}
            title={`${groomFirst} & ${brideFirst}`}
            location={invitation.events[0]?.locationName || 'The Glass Conservatory'}
          />
        </motion.div>
      </section>
    );
  }

  // 14. MOROCCAN LANTERN ISLAMIC (Malik & Aisyah Moroccan Lantern)
  if (archetype === 'moroccan-lantern-islamic') {
    return (
      <section className="relative pt-10 sm:pt-14 pb-8 px-4 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto relative z-10 p-7 sm:p-10 rounded-[44px] bg-gradient-to-b from-[#FFF5F5] to-white border-2 border-rose-300 shadow-[0_20px_50px_rgba(225,29,72,0.15)] relative"
        >
          <div className="mb-4 flex flex-col items-center">
            <WeddingOrnament type="islamic-arabesque" className="w-16 h-16" color="#E11D48" />
            <p className="font-arabic text-lg sm:text-xl text-rose-900 leading-relaxed mt-2">
              بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ
            </p>
          </div>

          <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-rose-900 block mb-2 font-bold">
            WALIMATUL URSY
          </span>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-rose-950 mb-2 leading-tight">
            {groomFirst} <span className="font-light text-rose-600">&</span> {brideFirst}
          </h1>

          <div className="inline-block px-5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-900 font-serif text-xs font-bold tracking-widest my-4">
            {dateFormatted}
          </div>

          <CountdownTimer
            targetDate={invitation.weddingDate}
            theme={theme}
            title={`${groomFirst} & ${brideFirst}`}
            location={invitation.events[0]?.locationName || 'Moroccan Garden Pavilion'}
          />
        </motion.div>
      </section>
    );
  }

  // 15. CRESCENT MIDNIGHT ISLAMIC (Farhan & Nabila Midnight Crescent)
  if (archetype === 'crescent-midnight-islamic') {
    return (
      <section className="relative pt-8 sm:pt-12 pb-10 px-4 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto relative z-10 p-7 sm:p-10 rounded-[40px] bg-slate-950 text-white border-2 border-amber-400/30 shadow-[0_20px_60px_rgba(251,191,36,0.2)] relative overflow-hidden"
        >
          {/* Glowing Golden Moon Aura */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="mb-4">
            <div className="text-3xl mb-1">🌙 ✨</div>
            <p className="font-arabic text-lg sm:text-xl text-amber-300 leading-relaxed mb-1">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-bold">
              MIDNIGHT ISLAMIC SUITE
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif text-white mb-2 leading-none">
            {groomFirst} <span className="italic text-amber-400 font-light">&</span> {brideFirst}
          </h1>

          <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-white/10 text-slate-200 font-mono text-xs my-4 border border-white/20">
            <span>{dateFormatted}</span>
          </div>

          <p className="text-xs text-slate-400 font-light mb-6">
            Di bawah naungan berkah dan rahmat Allah SWT.
          </p>

          <CountdownTimer
            targetDate={invitation.weddingDate}
            theme={theme}
            title={`${groomFirst} & ${brideFirst}`}
            location={invitation.events[0]?.locationName || 'Grand Moonlight Ballroom'}
          />
        </motion.div>
      </section>
    );
  }

  // 16. PURE JASMINE SYARI (Rizky & Khadijah Pure Jasmine)
  if (archetype === 'jasmine-syari-clean') {
    return (
      <section className="relative pt-10 sm:pt-14 pb-8 px-4 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto relative z-10 p-7 sm:p-10 rounded-[44px] bg-[#FAFAF9] border-2 border-emerald-700/25 shadow-[0_20px_50px_rgba(22,163,74,0.12)] relative"
        >
          <div className="mb-4 flex flex-col items-center">
            <WeddingOrnament type="gardenia-wreath" className="w-16 h-16" color="#16A34A" />
            <p className="font-arabic text-lg sm:text-xl text-slate-800 leading-relaxed mt-2 font-bold">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>

          <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-emerald-900 block mb-2 font-bold">
            UNTAIAN DOA WALIMAH
          </span>

          <h1 className="text-4xl sm:text-5xl font-serif text-slate-900 mb-2 leading-tight">
            {groomFirst} <span className="font-serif italic text-emerald-700 font-light">&</span> {brideFirst}
          </h1>

          <div className="h-[1px] w-20 mx-auto bg-emerald-600/30 my-3" />

          <p className="text-xs font-serif uppercase tracking-widest text-slate-700 font-bold mb-6">
            {dateFormatted}
          </p>

          <CountdownTimer
            targetDate={invitation.weddingDate}
            theme={theme}
            title={`${groomFirst} & ${brideFirst}`}
            location={invitation.events[0]?.locationName || 'Jasmine Garden Villa'}
          />
        </motion.div>
      </section>
    );
  }

  // 12. DEFAULT ADAT ROYAL ARCHETYPE (Jawa, Sunda, Minang, Batak, Bali)
  return (
    <section className="relative pt-12 sm:pt-16 pb-8 px-4 text-center overflow-hidden">
      <AnimatedCornerBorders color={theme.accentColor} />
      <FloatingEtherealParticles color={theme.accentColor} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-xl mx-auto relative z-10 p-6 sm:p-9 rounded-t-[70px] rounded-b-3xl bg-white/85 backdrop-blur-2xl border-2 shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
        style={{ borderColor: `${theme.accentColor}60` }}
      >
        <div className="mb-5 flex flex-col items-center">
          <div className="relative mb-3">
            <WeddingOrnament
              type={theme.ornamentStyle}
              className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-2xl"
              color={theme.accentColor}
              isAnimated={true}
            />
          </div>

          <motion.span
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-[11px] sm:text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-600/30 inline-block shadow-xs"
            style={{ color: theme.accentColor }}
          >
            {theme.tagline}
          </motion.span>
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-2 leading-tight drop-shadow-xs"
          style={{ color: theme.primaryColor }}
        >
          {groomFirst}
          <span className="text-amber-600 font-light mx-2 text-3xl sm:text-4xl lg:text-5xl">&</span>
          {brideFirst}
        </h1>

        <p className="text-xs sm:text-sm text-slate-700 font-medium mb-6 font-serif italic">
          {dateFormatted}
        </p>

        <CountdownTimer
          targetDate={invitation.weddingDate}
          theme={theme}
          title={`${groomFirst} & ${brideFirst}`}
          location={invitation.events[0]?.locationName || 'Jakarta'}
        />
      </motion.div>
    </section>
  );
};

export const TemplateCoupleRenderer: React.FC<{
  groom: CouplePerson;
  bride: CouplePerson;
  quoteAyat: { verse: string; source: string; translation: string };
  theme: ThemeConfig;
}> = ({ groom, bride, quoteAyat, theme }) => {
  const archetype = theme.layoutArchetype || 'adat-royal';

  // 1. EDITORIAL B&W COUPLE (Sharp Monochrome Magazine Layout)
  if (archetype === 'editorial-bw-vertical') {
    return (
      <section className="py-10 px-4 sm:px-6 w-full max-w-2xl mx-auto text-center">
        <div className="p-6 rounded-2xl bg-zinc-100 border border-zinc-300 mb-8">
          <p className="text-xs sm:text-sm text-zinc-800 italic font-serif leading-relaxed mb-2">
            "{quoteAyat.verse}"
          </p>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 font-bold">
            {quoteAyat.source}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <motion.div whileHover={{ y: -6 }} className="p-6 bg-white border-2 border-black shadow-xl flex flex-col items-center">
            <div className="w-40 h-48 overflow-hidden mb-4 border border-black grayscale contrast-125">
              <img src={groom.photo} alt={groom.fullName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-serif font-black uppercase text-black mb-1">{groom.fullName}</h3>
            <p className="text-xs font-mono text-zinc-600 mb-1">{groom.childNumber}</p>
            <p className="text-xs text-zinc-500">Bpk. {groom.father} & Ibu {groom.mother}</p>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="p-6 bg-white border-2 border-black shadow-xl flex flex-col items-center">
            <div className="w-40 h-48 overflow-hidden mb-4 border border-black grayscale contrast-125">
              <img src={bride.photo} alt={bride.fullName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-serif font-black uppercase text-black mb-1">{bride.fullName}</h3>
            <p className="text-xs font-mono text-zinc-600 mb-1">{bride.childNumber}</p>
            <p className="text-xs text-zinc-500">Bpk. {bride.father} & Ibu {bride.mother}</p>
          </motion.div>
        </div>
      </section>
    );
  }

  // 2. MAROON PLUMERIA COUPLE (Dark Wine Velvet)
  if (archetype === 'maroon-plumeria-monogram') {
    return (
      <section className="py-10 px-4 sm:px-6 w-full max-w-2xl mx-auto text-center">
        <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-rose-500/30 shadow-xl mb-8 text-white">
          <p className="text-xs sm:text-sm italic font-serif leading-relaxed mb-2 text-rose-100">
            "{quoteAyat.verse}"
          </p>
          <span className="text-[10px] uppercase tracking-widest text-rose-300 font-bold">
            {quoteAyat.source}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <motion.div whileHover={{ y: -6 }} className="p-6 rounded-3xl bg-rose-950/60 border border-rose-400/40 shadow-2xl flex flex-col items-center text-white">
            <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-2 border-rose-300 shadow-lg">
              <img src={groom.photo} alt={groom.fullName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-serif font-bold text-white mb-1">{groom.fullName}</h3>
            <p className="text-xs text-rose-300 mb-1">{groom.childNumber}</p>
            <p className="text-xs text-rose-200">Bpk. {groom.father} & Ibu {groom.mother}</p>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="p-6 rounded-3xl bg-rose-950/60 border border-rose-400/40 shadow-2xl flex flex-col items-center text-white">
            <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-2 border-rose-300 shadow-lg">
              <img src={bride.photo} alt={bride.fullName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-serif font-bold text-white mb-1">{bride.fullName}</h3>
            <p className="text-xs text-rose-300 mb-1">{bride.childNumber}</p>
            <p className="text-xs text-rose-200">Bpk. {bride.father} & Ibu {bride.mother}</p>
          </motion.div>
        </div>
      </section>
    );
  }

  // 3. DEFAULT ELEGANT COUPLE (Adat Royal & Botanical Styles)
  return (
    <section className="py-10 px-4 sm:px-6 w-full max-w-2xl mx-auto text-center">
      {/* Doa / Ayat */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-xl border-2 shadow-xl mb-10 text-center relative"
        style={{ borderColor: `${theme.accentColor}50` }}
      >
        <WeddingOrnament
          type={theme.ornamentStyle}
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 drop-shadow-md"
          color={theme.accentColor}
          isAnimated={true}
        />
        <p className="text-xs sm:text-sm text-slate-800 italic font-serif leading-relaxed mb-3">
          "{quoteAyat.verse}"
        </p>
        <span className="text-xs font-bold tracking-wider uppercase" style={{ color: theme.primaryColor }}>
          {quoteAyat.source}
        </span>
      </motion.div>

      <div className="mb-8">
        <span className="text-xs font-bold tracking-widest uppercase block mb-1" style={{ color: theme.accentColor }}>
          Mahligai Pernikahan
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold" style={{ color: theme.primaryColor }}>
          Kedua Mempelai
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Groom Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -6 }}
          className="p-6 rounded-t-[80px] rounded-b-3xl bg-white/90 backdrop-blur-xl border-2 shadow-2xl flex flex-col items-center transition-transform"
          style={{ borderColor: `${theme.accentColor}50` }}
        >
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-40 h-40 rounded-full overflow-hidden border-4 shadow-xl p-1 bg-white mb-4"
            style={{ borderColor: theme.accentColor }}
          >
            <img src={groom.photo} alt={groom.fullName} referrerPolicy="no-referrer" className="w-full h-full object-cover rounded-full" />
          </motion.div>
          <h3 className="text-xl font-serif font-bold text-slate-900 mb-1" style={{ color: theme.primaryColor }}>
            {groom.fullName}
          </h3>
          <p className="text-xs font-bold text-amber-800 mb-2">{groom.childNumber}</p>
          <p className="text-xs text-slate-700 font-medium">Bapak {groom.father}</p>
          <p className="text-xs text-slate-700 font-medium">& Ibu {groom.mother}</p>
        </motion.div>

        {/* Bride Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -6 }}
          className="p-6 rounded-t-[80px] rounded-b-3xl bg-white/90 backdrop-blur-xl border-2 shadow-2xl flex flex-col items-center transition-transform"
          style={{ borderColor: `${theme.accentColor}50` }}
        >
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 4, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
            className="w-40 h-40 rounded-full overflow-hidden border-4 shadow-xl p-1 bg-white mb-4"
            style={{ borderColor: theme.accentColor }}
          >
            <img src={bride.photo} alt={bride.fullName} referrerPolicy="no-referrer" className="w-full h-full object-cover rounded-full" />
          </motion.div>
          <h3 className="text-xl font-serif font-bold text-slate-900 mb-1" style={{ color: theme.primaryColor }}>
            {bride.fullName}
          </h3>
          <p className="text-xs font-bold text-amber-800 mb-2">{bride.childNumber}</p>
          <p className="text-xs text-slate-700 font-medium">Bapak {bride.father}</p>
          <p className="text-xs text-slate-700 font-medium">& Ibu {bride.mother}</p>
        </motion.div>
      </div>
    </section>
  );
};
