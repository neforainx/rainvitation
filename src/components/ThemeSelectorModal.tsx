import React, { useState } from 'react';
import { X, Sparkles, Check, Music2, Palette, Info, Compass, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WEDDING_THEMES } from '../data/themes';
import { ThemeConfig } from '../types';
import { WeddingOrnament } from './Ornaments';

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  currentThemeId: string;
  onSelectTheme: (theme: ThemeConfig) => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorProps> = ({
  isOpen,
  onClose,
  currentThemeId,
  onSelectTheme
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'drive' | 'adat' | 'luxury' | 'floral' | 'modern'>('all');
  const [selectedPreview, setSelectedPreview] = useState<ThemeConfig | null>(null);

  const filteredThemes = WEDDING_THEMES.filter((t) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'drive') return !!t.sourceDriveFolder || t.category === 'cloned-drive' || t.badge.includes('DRIVE');
    return t.category === filterCategory;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-amber-600 tracking-wider uppercase flex items-center gap-1.5 mb-1">
                  <Palette className="w-3.5 h-3.5" />
                  <span>Koleksi Tema Nusantara & Modern</span>
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Pilih Desain Tema Undangan
                </h2>
              </div>

              <button
                id="btn-close-theme-modal"
                onClick={onClose}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 my-4 overflow-x-auto pb-1 no-scrollbar">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0 cursor-pointer ${
                  filterCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Semua Tema ({WEDDING_THEMES.length})
              </button>
              <button
                onClick={() => setFilterCategory('drive')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0 cursor-pointer ${
                  filterCategory === 'drive'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
                }`}
              >
                📁 Google Drive Cloned
              </button>
              <button
                onClick={() => setFilterCategory('adat')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0 cursor-pointer ${
                  filterCategory === 'adat'
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Adat Nusantara
              </button>
              <button
                onClick={() => setFilterCategory('luxury')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0 cursor-pointer ${
                  filterCategory === 'luxury'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                }`}
              >
                Old Money & Luxury
              </button>
              <button
                onClick={() => setFilterCategory('floral')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0 cursor-pointer ${
                  filterCategory === 'floral'
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                }`}
              >
                Floral & Boho
              </button>
              <button
                onClick={() => setFilterCategory('modern')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0 cursor-pointer ${
                  filterCategory === 'modern'
                    ? 'bg-blue-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Modern Minimalist
              </button>
            </div>

            {/* Themes Grid */}
            <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-2">
              {filteredThemes.map((theme) => {
                const isCurrent = theme.id === currentThemeId;

                return (
                  <div
                    key={theme.id}
                    onClick={() => {
                      onSelectTheme(theme);
                      onClose();
                    }}
                    className={`group relative rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                      isCurrent
                        ? 'border-amber-600 bg-amber-50/50 shadow-md ring-2 ring-amber-600/30'
                        : 'border-slate-200 hover:border-slate-400 bg-white hover:shadow-lg'
                    }`}
                  >
                    {/* Top Ornament & Badge */}
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                          <WeddingOrnament
                            type={theme.ornamentStyle}
                            className="w-7 h-7"
                            color={theme.accentColor}
                          />
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          <span
                            className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-xs"
                            style={{ backgroundColor: theme.primaryColor }}
                          >
                            {theme.badge}
                          </span>
                          {isCurrent && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                              <Check className="w-3 h-3" /> Sedang Aktif
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-amber-800 transition-colors">
                        {theme.name}
                      </h3>

                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                        {theme.description}
                      </p>
                    </div>

                    {/* Palette and Sample Audio */}
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Music2 className="w-3 h-3 text-slate-400" />
                          <span className="truncate max-w-[150px]">{theme.sampleMusic.title}</span>
                        </span>

                        <div className="flex items-center gap-1">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white shadow-xs"
                            style={{ backgroundColor: theme.primaryColor }}
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white shadow-xs"
                            style={{ backgroundColor: theme.accentColor }}
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white shadow-xs"
                            style={{ backgroundColor: theme.secondaryColor }}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                          isCurrent
                            ? 'bg-amber-700 text-white'
                            : 'bg-slate-100 group-hover:bg-slate-900 group-hover:text-white text-slate-700'
                        }`}
                      >
                        {isCurrent ? 'Gunakan Tema Ini' : 'Terapkan Desain'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Desain responsif untuk layar HP, tablet & komputer</span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
