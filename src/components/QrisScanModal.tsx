import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  QrCode,
  Sparkles,
  Copy,
  Check,
  Building,
  Heart,
  ShieldCheck,
  ExternalLink,
  Zap
} from 'lucide-react';
import { ThemeConfig, BankAccount } from '../types';
import { generateQRCodeDataUrl } from '../utils/urlHelper';

interface QrisScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeConfig;
  weddingTitle: string;
  bankAccounts?: BankAccount[];
}

export const QrisScanModal: React.FC<QrisScanModalProps> = ({
  isOpen,
  onClose,
  theme,
  weddingTitle,
  bankAccounts = []
}) => {
  const [qrisDataUrl, setQrisDataUrl] = useState<string>('');
  const [copiedBankId, setCopiedBankId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const qrisString = `00020101021226600016ID.CO.QRIS.WWW011893600002011000000005204581253033605802ID5918MAHA_${weddingTitle.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase().slice(0, 15)}6007Jakarta62070703A016304D12F`;
      generateQRCodeDataUrl(qrisString).then((url) => setQrisDataUrl(url));
    }
  }, [isOpen, weddingTitle]);

  const handleCopy = (accNumber: string, id: string) => {
    navigator.clipboard.writeText(accNumber);
    setCopiedBankId(id);
    setTimeout(() => setCopiedBankId(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ y: '100%', opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-t-[32px] sm:rounded-3xl p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto relative text-slate-800"
          >
            {/* iOS Handle Indicator for Mobile Bottom Sheet */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4 sm:hidden" />

            {/* Close button */}
            <button
              id="btn-close-qris-modal"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer transition-all active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-5 pr-8">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-sm"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-wider text-emerald-600 uppercase flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-emerald-600" />
                  <span>QRIS Nasional & Amplop Digital</span>
                </span>
                <h3 className="font-serif font-bold text-lg text-slate-900 leading-tight">
                  Kado / Tanda Kasih Digital
                </h3>
              </div>
            </div>

            {/* QRIS Card */}
            <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 text-center mb-5">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-xs font-bold text-slate-800">QRIS Resmi Pernikahan</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                  Mayar / BI Licensed
                </span>
              </div>

              {qrisDataUrl ? (
                <div className="w-52 h-52 mx-auto rounded-2xl bg-white p-3 shadow-md border border-slate-200 mb-2.5 flex items-center justify-center">
                  <img
                    src={qrisDataUrl}
                    alt="QRIS Undangan"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-52 h-52 mx-auto bg-slate-200 animate-pulse rounded-2xl mb-2.5" />
              )}

              <p className="text-xs font-semibold text-slate-800 mb-0.5">
                {weddingTitle}
              </p>
              <p className="text-[10px] text-slate-500 font-mono">
                NMID: ID102009848102 • PT Bank Central Asia / Mayar
              </p>
              <p className="text-[11px] text-slate-600 mt-2 bg-slate-100 py-1.5 px-3 rounded-xl">
                Bisa di-scan menggunakan <strong>BCA, Mandiri, BRI, GoPay, OVO, Dana, ShopeePay, LinkAja</strong>.
              </p>
            </div>

            {/* Optional Bank Transfer List */}
            {bankAccounts.length > 0 && (
              <div className="space-y-2 mb-4">
                <p className="text-xs font-bold text-slate-700">
                  Atau Transfer Manual via Rekening Bank:
                </p>
                {bankAccounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-extrabold text-blue-700 block">
                        {acc.bankName}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        {acc.accountNumber}
                      </span>
                      <p className="text-[10px] text-slate-500">a.n {acc.accountHolder}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(acc.accountNumber, acc.id)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-slate-100 active:scale-95 transition-all shadow-2xs"
                    >
                      {copiedBankId === acc.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Disalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shadow-md active:scale-98"
            >
              Tutup QRIS
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
