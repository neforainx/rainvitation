import React, { useState } from 'react';
import { Gift, CreditCard, Copy, Check, QrCode, MapPin, X, HeartHandshake, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BankAccount, ThemeConfig } from '../types';

interface DigitalEnvelopeProps {
  bankAccounts: BankAccount[];
  physicalGiftAddress?: {
    recipient: string;
    phone: string;
    address: string;
  };
  theme: ThemeConfig;
}

export const DigitalEnvelopeModal: React.FC<DigitalEnvelopeProps> = ({
  bankAccounts,
  physicalGiftAddress,
  theme
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showQrisModal, setShowQrisModal] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section className="py-12 px-4 sm:px-6 w-full max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-xl text-center"
      >
        <div
          className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-white shadow-md"
          style={{ backgroundColor: theme.primaryColor }}
        >
          <Gift className="w-7 h-7" />
        </div>

        <span
          className="text-xs font-bold tracking-widest uppercase block mb-1"
          style={{ color: theme.accentColor }}
        >
          Tanda Kasih & Doa Restu
        </span>
        <h2
          className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2"
          style={{ color: theme.primaryColor }}
        >
          Amplop Digital
        </h2>
        <p className="text-xs text-slate-600 max-w-sm mx-auto mb-6 leading-relaxed">
          Doa restu Anda merupakan karunia terindah bagi kami. Namun jika ingin memberikan tanda kasih secara cashless, Anda dapat menyalurkannya melalui rekening di bawah ini:
        </p>

        <button
          id="btn-open-envelope"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95"
          style={{ backgroundColor: theme.primaryColor }}
        >
          <CreditCard className="w-4 h-4" />
          <span>Kirim Hadiah Pernikahan (Amplop Digital)</span>
        </button>
      </motion.div>

      {/* Modal Amplop Digital */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl relative my-8 border border-slate-100 max-h-[90vh] overflow-y-auto text-left"
            >
              {/* Close button */}
              <button
                id="btn-close-envelope-modal"
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    Amplop Digital & Rekening
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pilih metode transfer atau QRIS
                  </p>
                </div>
              </div>

              {/* Bank Accounts List */}
              <div className="space-y-4 mb-6">
                {bankAccounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs uppercase px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-800 shadow-xs">
                        {acc.bankName}
                      </span>
                      {acc.qrisUrl && (
                        <button
                          onClick={() => setShowQrisModal(acc.qrisUrl || null)}
                          className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>Lihat QRIS</span>
                        </button>
                      )}
                    </div>

                    <div className="my-2">
                      <p className="text-base sm:text-lg font-mono font-bold tracking-wide text-slate-900">
                        {acc.accountNumber}
                      </p>
                      <p className="text-xs text-slate-600 font-medium">
                        a.n {acc.accountHolder}
                      </p>
                    </div>

                    <div className="mt-3 flex justify-end">
                      <button
                        id={`btn-copy-bank-${acc.id}`}
                        onClick={() => handleCopy(acc.id, acc.accountNumber)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 shadow-xs cursor-pointer active:scale-95 transition-all"
                      >
                        {copiedId === acc.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">Nomor Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-600" />
                            <span>Salin Nomor Rekening</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Physical Gift Address if exists */}
              {physicalGiftAddress && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1.5">
                    <MapPin className="w-4 h-4 text-amber-700" />
                    <span>Kirim Kado Fisik / Parsel</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800">
                    Penerima: {physicalGiftAddress.recipient}
                  </p>
                  <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3" />
                    {physicalGiftAddress.phone}
                  </p>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {physicalGiftAddress.address}
                  </p>
                  <div className="mt-3 flex justify-end">
                    <button
                      id="btn-copy-address-gift"
                      onClick={() => handleCopy('gift-addr', `${physicalGiftAddress.recipient}\n${physicalGiftAddress.phone}\n${physicalGiftAddress.address}`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 shadow-xs cursor-pointer active:scale-95 transition-all"
                    >
                      {copiedId === 'gift-addr' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Alamat Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-amber-800" />
                          <span>Salin Alamat Kado</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              <div className="text-center pt-2">
                <p className="text-[11px] text-slate-500 italic">
                  Terima kasih atas doa, perhatian, dan tanda kasih tulus yang Anda berikan.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QRIS Modal */}
      <AnimatePresence>
        {showQrisModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQrisModal(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 max-w-xs w-full text-center shadow-2xl relative"
            >
              <button
                id="btn-close-qris"
                onClick={() => setShowQrisModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
              <h4 className="font-bold text-slate-900 text-base mb-1">Scan QRIS</h4>
              <p className="text-[11px] text-slate-500 mb-4">
                Mendukung semua aplikasi e-wallet & Mobile Banking
              </p>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 inline-block mb-3">
                <img
                  src={showQrisModal}
                  alt="QRIS Code"
                  className="w-48 h-48 mx-auto"
                />
              </div>
              <p className="text-[10px] text-slate-400">
                Screenshot atau pindai langsung dengan kamera
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
