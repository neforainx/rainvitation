import React from 'react';
import { Heart, Sparkles, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { LoveStoryItem, ThemeConfig } from '../types';
import { DividerOrnament } from './Ornaments';

interface LoveStoryProps {
  stories: LoveStoryItem[];
  theme: ThemeConfig;
}

export const LoveStorySection: React.FC<LoveStoryProps> = ({ stories, theme }) => {
  if (!stories || stories.length === 0) return null;

  return (
    <section className="py-12 px-4 sm:px-6 w-full max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center mb-10">
        <span
          className="text-xs font-bold tracking-widest uppercase block mb-1"
          style={{ color: theme.accentColor }}
        >
          Perjalanan Cinta
        </span>
        <h2
          className="text-2xl sm:text-3xl font-serif font-bold"
          style={{ color: theme.primaryColor }}
        >
          Our Love Story
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
          Setiap babak membawa kita lebih dekat pada satu tujuan yang sama.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-amber-200/80 ml-4 sm:ml-8 space-y-8 pb-4">
        {stories.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className="relative pl-6 sm:pl-8 group"
          >
            {/* Timeline Dot */}
            <div
              className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white"
              style={{ backgroundColor: theme.primaryColor }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>

            {/* Story Card */}
            <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-md hover:shadow-lg transition-all">
              <span
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white mb-2"
                style={{ backgroundColor: theme.accentColor }}
              >
                <Calendar className="w-3 h-3" />
                {item.year}
              </span>

              <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 mb-1.5">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {item.description}
              </p>

              {item.image && (
                <div className="rounded-2xl overflow-hidden aspect-16/9 bg-slate-100 shadow-inner">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <DividerOrnament
        type={theme.ornamentStyle}
        color={theme.accentColor}
        className="my-10"
      />
    </section>
  );
};
