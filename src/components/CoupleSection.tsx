import React from 'react';
import { Instagram, Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { CouplePerson, ThemeConfig } from '../types';
import { WeddingOrnament, DividerOrnament } from './Ornaments';

interface CoupleSectionProps {
  groom: CouplePerson;
  bride: CouplePerson;
  quoteAyat: {
    verse: string;
    source: string;
    translation: string;
  };
  theme: ThemeConfig;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({
  groom,
  bride,
  quoteAyat,
  theme
}) => {
  return (
    <section className="py-12 px-4 sm:px-6 w-full max-w-2xl mx-auto text-center">
      {/* Top Quote Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-md mb-12 text-center"
      >
        <WeddingOrnament
          type={theme.ornamentStyle}
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 drop-shadow-md"
          color={theme.accentColor}
          isAnimated={true}
        />
        <p className="text-xs sm:text-sm text-slate-700 italic font-serif leading-relaxed mb-3">
          "{quoteAyat.verse}"
        </p>
        <span
          className="text-xs font-semibold tracking-wider uppercase"
          style={{ color: theme.primaryColor }}
        >
          {quoteAyat.source}
        </span>
      </motion.div>

      {/* Section Title */}
      <div className="mb-8">
        <span
          className="text-xs font-bold tracking-widest uppercase block mb-1"
          style={{ color: theme.accentColor }}
        >
          Sang Mempelai
        </span>
        <h2
          className="text-2xl sm:text-3xl font-serif font-bold"
          style={{ color: theme.primaryColor }}
        >
          Groom & Bride
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
          Dengan memohon rahmat dan ridho Tuhan Yang Maha Esa, kami bermaksud menyelenggarakan pernikahan suci:
        </p>
      </div>

      {/* Couple Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
        {/* Groom Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-lg"
        >
          <div className="relative mb-4">
            <div
              className="w-36 h-36 rounded-full overflow-hidden border-4 shadow-md p-1 bg-white"
              style={{ borderColor: theme.accentColor }}
            >
              <img
                src={groom.photo}
                alt={groom.fullName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div
              className="absolute -bottom-2 -right-1 p-2 rounded-full text-white shadow-md"
              style={{ backgroundColor: theme.primaryColor }}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>

          <h3
            className="text-lg sm:text-xl font-serif font-bold text-slate-900 mb-1"
            style={{ color: theme.primaryColor }}
          >
            {groom.name}
          </h3>

          <p className="text-xs text-slate-600 mb-2 font-medium">
            {groom.childNumber}
          </p>

          <p className="text-xs text-slate-700 font-semibold mb-0.5">
            {groom.father}
          </p>
          <p className="text-xs text-slate-500 mb-3">
            & {groom.mother}
          </p>

          {groom.bio && (
            <p className="text-[11px] text-slate-500 italic mb-4 max-w-[200px]">
              "{groom.bio}"
            </p>
          )}

          {groom.instagram && (
            <a
              href={`https://instagram.com/${groom.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <Instagram className="w-3 h-3 text-pink-600" />
              <span>@{groom.instagram}</span>
            </a>
          )}
        </motion.div>

        {/* Center Connecting Symbol */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-amber-200 items-center justify-center font-serif font-bold text-lg text-amber-800">
          &
        </div>

        {/* Bride Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-lg"
        >
          <div className="relative mb-4">
            <div
              className="w-36 h-36 rounded-full overflow-hidden border-4 shadow-md p-1 bg-white"
              style={{ borderColor: theme.accentColor }}
            >
              <img
                src={bride.photo}
                alt={bride.fullName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div
              className="absolute -bottom-2 -right-1 p-2 rounded-full text-white shadow-md"
              style={{ backgroundColor: theme.primaryColor }}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          <h3
            className="text-lg sm:text-xl font-serif font-bold text-slate-900 mb-1"
            style={{ color: theme.primaryColor }}
          >
            {bride.name}
          </h3>

          <p className="text-xs text-slate-600 mb-2 font-medium">
            {bride.childNumber}
          </p>

          <p className="text-xs text-slate-700 font-semibold mb-0.5">
            {bride.father}
          </p>
          <p className="text-xs text-slate-500 mb-3">
            & {bride.mother}
          </p>

          {bride.bio && (
            <p className="text-[11px] text-slate-500 italic mb-4 max-w-[200px]">
              "{bride.bio}"
            </p>
          )}

          {bride.instagram && (
            <a
              href={`https://instagram.com/${bride.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <Instagram className="w-3 h-3 text-pink-600" />
              <span>@{bride.instagram}</span>
            </a>
          )}
        </motion.div>
      </div>

      <DividerOrnament
        type={theme.ornamentStyle}
        color={theme.accentColor}
        className="my-10"
      />
    </section>
  );
};
