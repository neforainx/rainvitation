import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  QrCode,
  CreditCard,
  Building,
  Smartphone,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  ExternalLink,
  Zap,
  Lock
} from 'lucide-react';
import { PricingPlan } from '../types';
import { formatRupiah } from '../data/pricingPlans';
import { generateQRCodeDataUrl } from '../utils/urlHelper';
import { createMayarInvoice, MayarPaymentResponse } from '../utils/mayarPayment';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PricingPlan;
  invitationTitle: string;
  onSuccessPayment: (plan: PricingPlan) => void;
}

type MayarPaymentMethod = 'qris' | 'bca_va' | 'mandiri_va' | 'bri_va' | 'ewallet' | 'credit_card';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  plan,
  invitationTitle,
  onSuccessPayment
}) => {
  const [selectedMethod, setSelectedMethod] = useState<MayarPaymentMethod>('qris');
  const [copiedCode, setCopiedCode] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [qrisDataUrl, setQrisDataUrl] = useState('');
  const [timeLeft, setTimeLeft] = useState(899); // 15 minutes
  const [mayarInvoice, setMayarInvoice] = useState<MayarPaymentResponse | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setIsProcessing(false);
      setTimeLeft(899);

      // Initialize Mayar invoice
      createMayarInvoice({
        amount: plan.price,
        customerName: 'Calon Pengantin',
        customerEmail: 'mempelai@rainvitation.id',
        description: `Aktivasi Undangan Digital ${plan.name} - ${invitationTitle}`,
        planId: plan.id
      }).then((invoice) => {
        setMayarInvoice(invoice);
        if (invoice.qrisPayload) {
          generateQRCodeDataUrl(invoice.qrisPayload).then((url) => setQrisDataUrl(url));
        }
      });
    }
  }, [isOpen, plan, invitationTitle]);

  useEffect(() => {
    if (!isOpen || isSuccess) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, isSuccess]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSimulatePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccessPayment(plan);
        onClose();
      }, 2000);
    }, 1100);
  };

  const currentVa = mayarInvoice?.virtualAccounts.find((va) => {
    if (selectedMethod === 'bca_va') return va.bank === 'bca';
    if (selectedMethod === 'mandiri_va') return va.bank === 'mandiri';
    if (selectedMethod === 'bri_va') return va.bank === 'bri';
    return va.bank === 'bca';
  }) || {
    bank: 'bca',
    bankName: 'BCA Virtual Account',
    vaNumber: `827708${Date.now().toString().slice(-6)}`
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto relative text-slate-800"
          >
            {/* Close button */}
            <button
              id="btn-close-checkout"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer transition-all active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSuccess ? (
              <>
                {/* Mayar Gateway Header */}
                <div className="mb-5 pr-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-600 text-white tracking-wide shadow-xs">
                      <Zap className="w-3 h-3 fill-current" />
                      <span>MAYAR.ID PAYMENT GATEWAY</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-600" />
                      <span>256-bit Encrypted</span>
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-serif">
                    Checkout Aktivasi {plan.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Undangan: <strong className="text-slate-700">{invitationTitle}</strong>
                  </p>
                </div>

                {/* Price Breakdown Card */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-4">
                  <div className="flex justify-between items-center text-xs text-slate-600 mb-1.5">
                    <span>Biaya Lisensi ({plan.durationText})</span>
                    <span className="font-semibold text-slate-800">{formatRupiah(plan.price)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
                    <span>Biaya Transaksi Mayar (PG)</span>
                    <span className="font-semibold text-emerald-600">GRATIS (Ditanggung)</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold text-slate-900">Total Pembayaran</span>
                      <p className="text-[10px] text-slate-400 font-mono">
                        Invoice: {mayarInvoice?.invoiceCode || 'MYR-PENDING'}
                      </p>
                    </div>
                    <span className="text-xl font-extrabold text-blue-700 font-serif">
                      {formatRupiah(plan.price)}
                    </span>
                  </div>
                </div>

                {/* Timer Countdown */}
                <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 mb-4 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-700 animate-pulse" />
                    <span>Batas Waktu Bayar:</span>
                  </div>
                  <span className="font-mono font-bold text-blue-950">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </span>
                </div>

                {/* Payment Method Selector */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Pilih Kanal Pembayaran Mayar:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedMethod('qris')}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        selectedMethod === 'qris'
                          ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-red-100 text-red-700">
                        <QrCode className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">QRIS Mayar Instan</div>
                        <div className="text-[10px] text-slate-500">GoPay, OVO, BCA, Dana</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedMethod('bca_va')}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        selectedMethod === 'bca_va'
                          ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                        <Building className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">BCA Virtual Account</div>
                        <div className="text-[10px] text-slate-500">Otomatis Terverifikasi</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedMethod('mandiri_va')}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        selectedMethod === 'mandiri_va'
                          ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">Mandiri / BRI VA</div>
                        <div className="text-[10px] text-slate-500">Kanal 24 Jam Mayar</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedMethod('ewallet')}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        selectedMethod === 'ewallet'
                          ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">E-Wallet Direct</div>
                        <div className="text-[10px] text-slate-500">ShopeePay / LinkAja</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Instruction Detail Box */}
                {selectedMethod === 'qris' ? (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center mb-5">
                    <p className="text-xs font-semibold text-slate-700 mb-2">
                      Scan QRIS Mayar resmi berikut via aplikasi m-banking atau e-wallet:
                    </p>
                    {qrisDataUrl ? (
                      <div className="w-44 h-44 mx-auto rounded-2xl shadow-sm border border-slate-200 bg-white p-2.5 mb-2 flex items-center justify-center">
                        <img
                          src={qrisDataUrl}
                          alt="QRIS Mayar"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-44 h-44 mx-auto bg-slate-200 animate-pulse rounded-2xl mb-2" />
                    )}
                    <p className="text-[10px] text-slate-500 font-medium">
                      NMID: ID10200999011 • Licensed by Bank Indonesia (Mayar Gateway)
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-5">
                    <p className="text-xs text-slate-600 mb-1 font-medium">
                      Nomor {currentVa.bankName}:
                    </p>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                      <span className="font-mono font-bold text-base text-slate-900 tracking-wider">
                        {currentVa.vaNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(currentVa.vaNumber)}
                        className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? 'Disalin' : 'Salin'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2">
                      Nama Merchant: <strong>MAYAR - RAINVITATION ({invitationTitle})</strong>
                    </p>
                  </div>
                )}

                {/* Simulate / Pay with Mayar Button */}
                <button
                  id="btn-confirm-payment"
                  onClick={handleSimulatePay}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Konfirmasi Pembayaran Mayar Selesai</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </>
            ) : (
              /* Success Screen */
              <div className="py-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4"
                >
                  <CheckCircle2 className="w-10 h-10" />
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-900 font-serif mb-1">
                  Pembayaran Mayar Berhasil!
                </h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto mb-4">
                  Invoice <strong className="text-slate-800">{mayarInvoice?.invoiceCode}</strong> telah lunas. Template undangan telah aktif dengan paket <strong>{plan.name}</strong>.
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Status: Terverifikasi Lunas (Mayar Verified)</span>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
