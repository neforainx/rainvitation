import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  Palette,
  Check,
  Music,
  Volume2,
  ChevronRight,
  Eye
} from 'lucide-react';
import { ThemeConfig } from '../types';
import { WEDDING_THEMES } from '../data/themes';
import { WeddingOrnament } from './Ornaments';

interface TemplateCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedThemeId: string;
  onSelectTheme: (theme: ThemeConfig) => void;
  onPreviewTheme?: (theme: ThemeConfig) => void;
}

type FilterCategory = 'all' | 'islamic' | 'canva' | 'drive' | 'adat' | 'luxury' | 'floral' | 'modern';

export const TemplateCatalogModal: React.FC<TemplateCatalogModalProps> = ({
  isOpen,
  onClose,
  selectedThemeId,
  onSelectTheme,
  onPreviewTheme
}) => {
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredThemes = WEDDING_THEMES.filter((t) => {
    let matchesCategory = true;
    if (filter === 'islamic') {
      matchesCategory = t.id.startsWith('free-islamic') || t.regionOrStyle === 'islamic' || t.name.toLowerCase().includes('islam') || t.badge.toLowerCase().includes('gratis');
    } else if (filter === 'canva') {
      matchesCategory = t.id.startsWith('ref-') || t.id.startsWith('free-') || t.badge.includes('CANVA') || t.badge.includes('FRAMER') || t.badge.includes('ETSY') || t.badge.includes('FASHION');
    } else if (filter === 'drive') {
      matchesCategory = !!t.sourceDriveFolder || t.category === 'cloned-drive' || t.badge.includes('DRIVE');
    } else if (filter !== 'all') {
      matchesCategory = t.category === filter;
    }

    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto relative text-slate-800"
          >
            {/* Close Button */}
            <button
              id="btn-close-template-catalog"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-6 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 mb-2">
                <Palette className="w-3.5 h-3.5" />
                <span>KATALOG TEMPLATE UNDANGAN DIGITAL</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
                Pilihan Desain Adat Nusantara & Modern Elegan
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                Setiap template dirancang khusus dengan ornamen otentik, tipografi anggun, dan musik latar selaras.
              </p>
            </div>

            {/* Filter Pills & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
              <div className="flex p-1 bg-slate-100 rounded-2xl gap-1 w-full sm:w-auto text-xs font-semibold overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setFilter('all')}
                  className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    filter === 'all'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Semua ({WEDDING_THEMES.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('islamic')}
                  className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    filter === 'islamic'
                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
                      : 'text-emerald-700 hover:text-emerald-900 font-bold'
                  }`}
                >
                  🕌 Islami Gratis ({WEDDING_THEMES.filter(t => t.id.startsWith('free-islamic') || t.regionOrStyle === 'islamic' || t.name.toLowerCase().includes('islam')).length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('canva')}
                  className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    filter === 'canva'
                      ? 'bg-white text-purple-700 font-bold shadow-xs'
                      : 'text-purple-700 hover:text-purple-900'
                  }`}
                >
                  ✨ Canva & Framer ({WEDDING_THEMES.filter(t => t.id.startsWith('ref-') || t.id.startsWith('free-') || t.badge.includes('CANVA') || t.badge.includes('FRAMER') || t.badge.includes('ETSY')).length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('drive')}
                  className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    filter === 'drive'
                      ? 'bg-white text-blue-700 font-bold shadow-xs'
                      : 'text-blue-700 hover:text-blue-900'
                  }`}
                >
                  📁 Drive Cloned
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('adat')}
                  className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    filter === 'adat'
                      ? 'bg-white text-amber-800 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Adat Nusantara
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('luxury')}
                  className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    filter === 'luxury'
                      ? 'bg-white text-amber-600 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Old Money & Luxury
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('floral')}
                  className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    filter === 'floral'
                      ? 'bg-white text-rose-700 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Floral & Boho
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('modern')}
                  className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    filter === 'modern'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Modern
                </button>
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari tema: Jawa, Sunda, Emerald, Rustic..."
                className="w-full sm:w-64 px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredThemes.map((theme) => {
                const isSelected = selectedThemeId === theme.id;
                return (
                  <div
                    key={theme.id}
                    className={`group relative rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'border-amber-500 ring-4 ring-amber-400/20 bg-amber-50/20 shadow-lg'
                        : 'border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    {/* Top Preview Image & Motif */}
                    <div className="relative h-44 overflow-hidden bg-slate-100">
                      <img
                        src={theme.previewImage}
                        alt={theme.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Badge */}
                      <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-md border ${
                        !theme.isPremium || theme.price === 0
                          ? 'bg-emerald-600/90 text-white border-emerald-300 font-extrabold shadow-sm'
                          : 'text-white bg-black/50 border-white/20'
                      }`}>
                        {theme.badge}
                      </span>

                      {/* Accent Color Circle */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/20">
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-white/80"
                          style={{ backgroundColor: theme.accentColor }}
                        />
                        <span className="text-[10px] text-white font-medium capitalize">
                          {theme.category}
                        </span>
                      </div>

                      {/* Motif Icon overlay */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                        <div className="flex items-center gap-2">
                          <WeddingOrnament
                            type={theme.ornamentStyle}
                            className="w-7 h-7 text-white drop-shadow-md"
                            color="#FFFFFF"
                          />
                          <div>
                            <h3 className="text-sm font-bold font-serif leading-tight">
                              {theme.name}
                            </h3>
                            <p className="text-[10px] text-slate-200 line-clamp-1">
                              {theme.tagline}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                        {theme.description}
                      </p>

                      {/* Audio Tag */}
                      <div className="flex items-center gap-2 py-1.5 px-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 mb-4">
                        <Volume2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                        <span className="truncate">{theme.sampleMusic.title}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          id={`btn-select-theme-${theme.id}`}
                          onClick={() => {
                            onSelectTheme(theme);
                            onClose();
                          }}
                          className={`flex-1 py-2 px-3 rounded-full text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Sedang Digunakan</span>
                            </>
                          ) : (
                            <span>Gunakan Template Ini</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
