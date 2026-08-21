import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Sparkles, Crown, Zap, ShieldCheck } from 'lucide-react';
import { PricingTier, PricingPlan } from '../types';
import { PRICING_PLANS, formatRupiah } from '../data/pricingPlans';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: PricingTier;
  onSelectPlan: (plan: PricingPlan) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  currentTier,
  onSelectPlan
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl bg-gradient-to-b from-white via-slate-50/90 to-amber-50/30 rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/80 max-h-[92vh] overflow-y-auto relative text-slate-800"
          >
            {/* Close Button */}
            <button
              id="btn-close-pricing"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center max-w-xl mx-auto mb-8 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider rounded-full bg-amber-100 text-amber-800 border border-amber-200 shadow-xs mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>PILIHAN PAKET BERBAYAR RESMI</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 tracking-tight">
                Pilih Paket Undangan Digital Impian Anda
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Aktif instan, tanpa biaya tersembunyi, dapat disesuaikan kapan saja, dan siap dibagikan ke ribuan tamu dengan tautan khusus.
              </p>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PRICING_PLANS.map((plan) => {
                const isSelected = currentTier === plan.id;
                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 ${
                      plan.isPopular
                        ? 'bg-white/95 border-2 border-amber-400 shadow-xl shadow-amber-500/10 ring-4 ring-amber-400/10'
                        : 'bg-white/80 border border-slate-200/80 shadow-md hover:shadow-lg'
                    }`}
                  >
                    {plan.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span
                          className={`px-3 py-0.5 text-[11px] font-bold rounded-full shadow-sm text-white ${
                            plan.isPopular ? 'bg-amber-600' : 'bg-slate-800'
                          }`}
                        >
                          {plan.badge}
                        </span>
                      </div>
                    )}

                    <div>
                      {/* Plan Header */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                        {plan.id === 'platinum' && <Crown className="w-5 h-5 text-amber-500" />}
                        {plan.id === 'gold' && <Zap className="w-5 h-5 text-amber-500" />}
                      </div>
                      <p className="text-xs text-slate-500 min-h-[36px] mb-4">{plan.description}</p>

                      {/* Pricing Display */}
                      <div className="mb-4 pb-4 border-b border-slate-100">
                        <div className="text-xs text-slate-400 line-through">
                          {formatRupiah(plan.originalPrice)}
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
                            {formatRupiah(plan.price)}
                          </span>
                          <span className="text-xs text-slate-500">/ selamanya</span>
                        </div>
                        <div className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-[11px] font-medium text-slate-600">
                          {plan.durationText}
                        </div>
                      </div>

                      {/* Features List */}
                      <div className="space-y-2.5 mb-6">
                        <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          Fitur Unggulan:
                        </p>
                        {plan.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="leading-tight">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      id={`btn-select-plan-${plan.id}`}
                      onClick={() => onSelectPlan(plan)}
                      className={`w-full py-3 px-4 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        plan.isPopular
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : isSelected
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <span>{isSelected ? 'Paket Aktif Saat Ini' : `Pilih ${plan.name}`}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Guarantee Footer */}
            <div className="mt-8 pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 text-center">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Pembayaran Aman & Terverifikasi Otomatis</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Tanpa Batasan Revisi Data Mempelai</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-blue-600" />
                <span>Link Langsung Aktif Detik Ini Juga</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
