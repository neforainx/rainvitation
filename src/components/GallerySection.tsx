import React, { useState } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryMedia, ThemeConfig } from '../types';
import { DividerOrnament } from './Ornaments';

interface GallerySectionProps {
  gallery: GalleryMedia[];
  theme: ThemeConfig;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery, theme }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleOpenLightbox = (index: number) => {
    setSelectedIdx(index);
  };

  const handleCloseLightbox = () => {
    setSelectedIdx(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + gallery.length) % gallery.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % gallery.length);
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <span
          className="text-xs font-bold tracking-widest uppercase block mb-1"
          style={{ color: theme.accentColor }}
        >
          Galeri Kenangan
        </span>
        <h2
          className="text-2xl sm:text-3xl font-serif font-bold"
          style={{ color: theme.primaryColor }}
        >
          Our Moments
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
          Setiap bingkai foto mengabadikan sekelumit kisah cinta dan perjalanan menuju hari bahagia.
        </p>
      </div>

      {/* Grid Photos */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {gallery.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            onClick={() => handleOpenLightbox(idx)}
            className="group relative rounded-2xl overflow-hidden aspect-4/3 md:aspect-square bg-slate-200 cursor-pointer shadow-md hover:shadow-xl transition-all"
          >
            <img
              src={item.url}
              alt={item.caption}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white">
              <p className="text-xs font-medium line-clamp-2">{item.caption}</p>
              <div className="flex items-center gap-1 text-[10px] text-amber-200 mt-1">
                <Maximize2 className="w-3 h-3" />
                <span>Lihat Foto</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              id="btn-close-lightbox"
              onClick={handleCloseLightbox}
              className="absolute top-5 right-5 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              id="btn-prev-photo"
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              id="btn-next-photo"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <motion.div
              key={selectedIdx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl max-h-[85vh] flex flex-col items-center"
            >
              <img
                src={gallery[selectedIdx].url}
                alt={gallery[selectedIdx].caption}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              />
              <div className="mt-4 text-center text-white px-4">
                <p className="text-sm sm:text-base font-medium font-serif">
                  {gallery[selectedIdx].caption}
                </p>
                <span className="text-xs text-slate-400 mt-1 block">
                  {selectedIdx + 1} dari {gallery.length} foto
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DividerOrnament
        type={theme.ornamentStyle}
        color={theme.accentColor}
        className="my-10"
      />
    </section>
  );
};
