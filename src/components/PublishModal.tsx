import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Globe,
  Share2,
  Copy,
  Check,
  QrCode,
  Download,
  Send,
  UserPlus,
  Users,
  Sparkles,
  ExternalLink,
  MessageCircle,
  FileText,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { WeddingInvitation, GuestRecipient } from '../types';
import {
  getInvitationBaseUrl,
  getGuestInvitationUrl,
  createWhatsAppInvitationMessage,
  generateQRCodeDataUrl
} from '../utils/urlHelper';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  invitation: WeddingInvitation;
  onUpdateSlug: (newSlug: string) => void;
  onUpdatePublishStatus: (isPublished: boolean) => void;
  onAddGuestRecipient: (guest: Omit<GuestRecipient, 'id'>) => void;
  onAddBulkGuests: (names: string[], group?: string) => void;
  onRemoveGuest: (id: string) => void;
  onToggleGuestSent: (id: string) => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  onClose,
  invitation,
  onUpdateSlug,
  onUpdatePublishStatus,
  onAddGuestRecipient,
  onAddBulkGuests,
  onRemoveGuest,
  onToggleGuestSent
}) => {
  const [slugInput, setSlugInput] = useState(invitation.slug || 'kevin-nadia');
  const [singleGuestName, setSingleGuestName] = useState('');
  const [singleGuestGroup, setSingleGuestGroup] = useState('Sahabat & Teman');
  const [bulkInput, setBulkInput] = useState('');
  const [bulkGroup, setBulkGroup] = useState('Keluarga Besar');
  const [activeTab, setActiveTab] = useState<'main_link' | 'guest_generator' | 'bulk_broadcast'>('main_link');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedGuestId, setCopiedGuestId] = useState<string | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [selectedGuestForWA, setSelectedGuestForWA] = useState<GuestRecipient | null>(null);
  const [waMessagePreview, setWaMessagePreview] = useState('');
  const [copiedWAMsg, setCopiedWAMsg] = useState(false);

  useEffect(() => {
    setSlugInput(invitation.slug || 'kevin-nadia');
  }, [invitation.slug]);

  // Generate QR Code for main link
  useEffect(() => {
    if (isOpen && slugInput) {
      const publicUrl = getInvitationBaseUrl(slugInput);
      generateQRCodeDataUrl(publicUrl).then((url) => setQrCodeDataUrl(url));
    }
  }, [isOpen, slugInput]);

  const cleanSlug = slugInput
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '');

  const liveBaseUrl = getInvitationBaseUrl(cleanSlug);

  const handleSaveSlug = () => {
    if (!cleanSlug) return;
    onUpdateSlug(cleanSlug);
    onUpdatePublishStatus(true);
  };

  const handleCopyMainLink = () => {
    navigator.clipboard.writeText(liveBaseUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadQR = () => {
    if (!qrCodeDataUrl) return;
    const a = document.createElement('a');
    a.href = qrCodeDataUrl;
    a.download = `qrcode-undangan-${cleanSlug}.png`;
    a.click();
  };

  const handleAddSingleGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleGuestName.trim()) return;
    onAddGuestRecipient({
      name: singleGuestName.trim(),
      group: singleGuestGroup,
      customSlugParam: encodeURIComponent(singleGuestName.trim()),
      isSent: false
    });
    setSingleGuestName('');
  };

  const handleAddBulk = () => {
    const names = bulkInput
      .split('\n')
      .map((n) => n.trim())
      .filter((n) => n.length > 0);
    if (names.length === 0) return;
    onAddBulkGuests(names, bulkGroup);
    setBulkInput('');
    setActiveTab('guest_generator');
  };

  const handleOpenWAModal = (guest: GuestRecipient) => {
    setSelectedGuestForWA(guest);
    const msg = createWhatsAppInvitationMessage(invitation, guest.name);
    setWaMessagePreview(msg);
  };

  const handleSendWhatsApp = (guest: GuestRecipient) => {
    const msg = createWhatsAppInvitationMessage(invitation, guest.name);
    const phone = guest.phone ? guest.phone.replace(/[^0-9]/g, '') : '';
    const waUrl = phone
      ? `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    onToggleGuestSent(guest.id);
  };

  const handleCopyGuestLink = (guest: GuestRecipient) => {
    const guestUrl = getGuestInvitationUrl(invitation.slug, guest.name);
    navigator.clipboard.writeText(guestUrl);
    setCopiedGuestId(guest.id);
    setTimeout(() => setCopiedGuestId(null), 2000);
  };

  const handleExportGuests = () => {
    if (invitation.guestRecipients.length === 0) return;
    let csvContent = 'No,Nama Tamu,Kategori,Link Undangan Khusus,Status Terkirim\n';
    invitation.guestRecipients.forEach((g, idx) => {
      const url = getGuestInvitationUrl(invitation.slug, g.name);
      csvContent += `${idx + 1},"${g.name}","${g.group || '-'}","${url}","${g.isSent ? 'Sudah Terkirim' : 'Belum'}"\n`;
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `daftar-link-tamu-${cleanSlug}.csv`;
    link.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto relative text-slate-800"
          >
            {/* Close Button */}
            <button
              id="btn-close-publish-modal"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6 pr-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 mb-1">
                <Globe className="w-3 h-3" />
                <span>PUBLIKASI & GENERATOR LINK TAMU</span>
              </span>
              <h2 className="text-2xl font-bold font-serif text-slate-900">
                Terbitkan Undangan & Buat Link Khusus Tamu
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Atur tautan khusus (slug) dan bagikan pesan undangan personal via WhatsApp ke setiap tamu undangan.
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-2xl mb-6 gap-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('main_link')}
                className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'main_link'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Tautan Utama (Slug)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('guest_generator')}
                className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'guest_generator'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Link Tamu ({invitation.guestRecipients?.length || 0})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('bulk_broadcast')}
                className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'bulk_broadcast'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Batch / Bulk Tamu</span>
              </button>
            </div>

            {/* TAB 1: MAIN SLUG & PUBLISH CONFIG */}
            {activeTab === 'main_link' && (
              <div className="space-y-6">
                {/* Slug Input Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Kustomisasi Tautan Tambahan (URL Slug):
                  </label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <div className="flex items-center flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm shadow-xs focus-within:ring-2 focus-within:ring-blue-500">
                      <span className="text-slate-400 font-mono text-xs select-none">/</span>
                      <input
                        type="text"
                        value={slugInput}
                        onChange={(e) => setSlugInput(e.target.value)}
                        placeholder="nama-pasangan"
                        className="w-full bg-transparent border-none outline-none font-semibold text-slate-800 text-xs sm:text-sm ml-1"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSaveSlug}
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                    >
                      Terapkan & Terbitkan
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    Contoh: <code className="bg-slate-200 px-1 py-0.5 rounded text-[10px]">/dimas-dan-rara</code> atau <code className="bg-slate-200 px-1 py-0.5 rounded text-[10px]">/raden-sekar</code>
                  </p>
                </div>

                {/* Published Link Showcase */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-white border border-blue-200">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-800">Tautan Resmi Undangan Publik:</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Aktif & Siap Diakses</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs mb-3">
                    <span className="text-xs font-mono text-blue-700 font-bold truncate flex-1 select-all">
                      {liveBaseUrl}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyMainLink}
                      className="px-3 py-1 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Disalin' : 'Salin'}</span>
                    </button>
                    <a
                      href={liveBaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Buka di tab baru"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* QR Code Section */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-3 border-t border-blue-100">
                    {qrCodeDataUrl ? (
                      <img
                        src={qrCodeDataUrl}
                        alt="QR Code"
                        className="w-24 h-24 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xs"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-slate-200 animate-pulse rounded-xl" />
                    )}
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="text-xs font-bold text-slate-900 mb-0.5">QR Code Undangan Digital</h4>
                      <p className="text-[11px] text-slate-500 mb-2.5">
                        Dapat dicetak pada kartu fisik atau souvenir pernikahan agar tamu cukup scan kamera HP.
                      </p>
                      <button
                        type="button"
                        onClick={handleDownloadQR}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Unduh Gambar QR Code (PNG)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: INDIVIDUAL GUEST GENERATOR */}
            {activeTab === 'guest_generator' && (
              <div className="space-y-5">
                {/* Form to Add Single Guest */}
                <form onSubmit={handleAddSingleGuest} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Tambah Nama Tamu Khusus:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                    <input
                      type="text"
                      value={singleGuestName}
                      onChange={(e) => setSingleGuestName(e.target.value)}
                      placeholder="e.g. Bapak Ir. H. Bambang & Keluarga"
                      className="sm:col-span-2 px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={singleGuestGroup}
                      onChange={(e) => setSingleGuestGroup(e.target.value)}
                      className="px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 outline-none"
                    >
                      <option value="Keluarga Besar">Keluarga Besar</option>
                      <option value="Sahabat & Teman">Sahabat & Teman</option>
                      <option value="Rekan Kerja">Rekan Kerja</option>
                      <option value="Tamu VIP">Tamu VIP</option>
                      <option value="Tetangga">Tetangga</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Buat Link Khusus Tamu</span>
                  </button>
                </form>

                {/* Guest List Header & Export */}
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-800">
                    Daftar Link Tamu ({invitation.guestRecipients?.length || 0})
                  </div>
                  {invitation.guestRecipients?.length > 0 && (
                    <button
                      type="button"
                      onClick={handleExportGuests}
                      className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                  )}
                </div>

                {/* Guest Items List */}
                <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
                  {invitation.guestRecipients && invitation.guestRecipients.length > 0 ? (
                    invitation.guestRecipients.map((guest) => {
                      const guestUrl = getGuestInvitationUrl(invitation.slug, guest.name);
                      return (
                        <div
                          key={guest.id}
                          className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-all"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-slate-900 truncate">
                                {guest.name}
                              </h4>
                              {guest.group && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                  {guest.group}
                                </span>
                              )}
                              {guest.isSent && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-semibold">
                                  Terkirim
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-blue-600 truncate mt-0.5 font-mono select-all">
                              {guestUrl}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => handleCopyGuestLink(guest)}
                              className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
                              title="Salin Link"
                            >
                              {copiedGuestId === guest.id ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                              <span>{copiedGuestId === guest.id ? 'Tersalin' : 'Link'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSendWhatsApp(guest)}
                              className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 cursor-pointer shadow-xs transition-colors"
                              title="Kirim ke WhatsApp"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => onRemoveGuest(guest.id)}
                              className="p-1 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                              title="Hapus"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <Users className="w-8 h-8 text-slate-400 mx-auto mb-1.5" />
                      <p className="text-xs font-semibold text-slate-600">Belum ada nama tamu khusus</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Tambahkan nama tamu di atas atau gunakan tab 'Batch / Bulk Tamu' untuk impor banyak sekaligus.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: BULK / BATCH BROADCAST */}
            {activeTab === 'bulk_broadcast' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-700">
                      Tempel (Paste) Daftar Nama Tamu Sekaligus:
                    </label>
                    <select
                      value={bulkGroup}
                      onChange={(e) => setBulkGroup(e.target.value)}
                      className="px-2.5 py-1 text-xs rounded-lg bg-white border border-slate-300 outline-none"
                    >
                      <option value="Keluarga Besar">Keluarga Besar</option>
                      <option value="Sahabat & Teman">Sahabat & Teman</option>
                      <option value="Rekan Kerja">Rekan Kerja</option>
                      <option value="Tamu VIP">Tamu VIP</option>
                    </select>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Tuliskan 1 nama tamu per baris (akan otomatis dibuatkan link personal per tamu):
                  </p>
                  <textarea
                    rows={6}
                    value={bulkInput}
                    onChange={(e) => setBulkInput(e.target.value)}
                    placeholder={`Bpk. Ir. H. Sudarto & Ibu
Keluarga Besar Bpk. R. Hendra
Sarah Amanda, S.Kom
Dr. Kevin Wijaya & Istri
Dimas Prayoga (Teman Kampus)`}
                    className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs font-sans outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                  />
                  <button
                    type="button"
                    onClick={handleAddBulk}
                    disabled={!bulkInput.trim()}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Users className="w-4 h-4" />
                    <span>Generate Semua Link Tamu Otomatis</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
