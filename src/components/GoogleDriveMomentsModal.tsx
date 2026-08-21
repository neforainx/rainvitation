import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  HardDrive,
  FolderHeart,
  Upload,
  ExternalLink,
  RefreshCw,
  Image as ImageIcon,
  CheckCircle2,
  FileText,
  AlertCircle,
  Lock,
  ShieldCheck
} from 'lucide-react';
import {
  getOrCreateWeddingFolder,
  listWeddingMoments,
  uploadFileToDrive,
  saveMomentsBackupJson
} from '../utils/googleDrive';
import { WeddingInvitation } from '../types';

interface GoogleDriveMomentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accessToken: string | null;
  currentUserEmail?: string;
  invitationData: WeddingInvitation;
  onRequireLogin: () => void;
}

export const GoogleDriveMomentsModal: React.FC<GoogleDriveMomentsModalProps> = ({
  isOpen,
  onClose,
  accessToken,
  currentUserEmail,
  invitationData,
  onRequireLogin,
}) => {
  const [folderId, setFolderId] = useState<string | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && accessToken) {
      loadDriveData();
    }
  }, [isOpen, accessToken]);

  const loadDriveData = async () => {
    if (!accessToken) return;
    setIsLoading(true);
    try {
      const fId = await getOrCreateWeddingFolder(accessToken);
      setFolderId(fId);
      const list = await listWeddingMoments(accessToken, fId);
      setFiles(list);
    } catch (err) {
      console.error('Error loading Drive moments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile || !accessToken || !folderId) return;

    setIsUploading(true);
    setUploadSuccess(null);
    try {
      const uploaded = await uploadFileToDrive(accessToken, selectedFile, folderId);
      setUploadSuccess(`Berhasil mengunggah "${selectedFile.name}" ke Google Drive!`);
      const list = await listWeddingMoments(accessToken, folderId);
      setFiles(list);
    } catch (err) {
      console.error('Upload to Drive failed:', err);
      setUploadSuccess('Gagal mengunggah foto. Pastikan izin akses Drive aktif.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSyncBackup = async () => {
    if (!accessToken || !folderId) return;
    setSyncStatus('Menyinkronkan data ucapan & RSVP ke Google Drive...');
    try {
      const payload = {
        title: `${invitationData.groom.name} & ${invitationData.bride.name}`,
        couple: {
          groom: invitationData.groom.fullName,
          bride: invitationData.bride.fullName,
        },
        events: invitationData.events,
        rsvps: invitationData.rsvps,
        liveFeedPhotos: invitationData.liveFeedPhotos,
        syncedAt: new Date().toISOString(),
      };
      await saveMomentsBackupJson(
        accessToken,
        `Backup-Momen-${invitationData.slug || 'undangan'}-${Date.now()}.json`,
        payload,
        folderId
      );
      setSyncStatus('Data ucapan, galeri & RSVP berhasil dicadangkan ke Google Drive!');
      const list = await listWeddingMoments(accessToken, folderId);
      setFiles(list);
    } catch (err) {
      console.error('Sync backup error:', err);
      setSyncStatus('Gagal menyinkronkan data.');
    }
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
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto relative text-slate-800"
          >
            {/* Close Button */}
            <button
              id="btn-close-drive-modal"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <FolderHeart className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>PEMILIK TEMPLATE VAULT (KHUSUS PEMBUAT)</span>
                </span>
                <h2 className="text-xl font-bold font-sans text-slate-900">
                  Google Drive Moments Vault
                </h2>
                <p className="text-[11px] text-slate-500">
                  Hanya terlihat oleh Anda sebagai pembuat/pemilik undangan
                </p>
              </div>
            </div>

            {!accessToken ? (
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-3">
                <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
                <h3 className="text-sm font-bold text-slate-900">
                  Login Akun Google Pemilik Diperlukan
                </h3>
                <p className="text-xs text-slate-600">
                  Vault Google Drive adalah brankas cloud pribadi yang menyimpan foto momen tamu dalam resolusi asli. Hanya Anda selaku pemilik template yang dapat mengakses brankas ini.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onRequireLogin();
                  }}
                  className="py-2.5 px-5 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-bold cursor-pointer transition-all shadow-md"
                >
                  Masuk dengan Akun Google Pembuat
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Authenticated Owner Badge */}
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="truncate">
                    Terhubung sebagai Pemilik: <strong>{currentUserEmail || 'Akun Google Anda'}</strong>
                  </span>
                </div>

                {/* Folder Info Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-[11px] text-slate-500 font-medium">Folder Google Drive Utama:</p>
                    <p className="text-xs font-bold text-slate-900 truncate">
                      📁 Momen Pernikahan - RainInvite Cloud Vault
                    </p>
                    {folderId && (
                      <p className="text-[10px] text-slate-400 font-mono">ID: {folderId}</p>
                    )}
                  </div>

                  {folderId && (
                    <a
                      href={`https://drive.google.com/drive/folders/${folderId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white border border-slate-200 text-blue-600 hover:bg-blue-50 flex items-center gap-1 text-xs font-bold flex-shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Buka Drive</span>
                    </a>
                  )}
                </div>

                {/* Actions: Upload Photo & Sync Backup */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Upload input label */}
                  <label className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-blue-950 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-100/70 transition-all">
                    <Upload className="w-5 h-5 text-blue-600 mb-1" />
                    <span className="text-xs font-bold">Unggah Foto Master</span>
                    <span className="text-[10px] text-blue-700">Resolusi asli ke Drive</span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>

                  {/* Sync Backup Button */}
                  <button
                    type="button"
                    onClick={handleSyncBackup}
                    className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-950 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-emerald-100/70 transition-all"
                  >
                    <RefreshCw className="w-5 h-5 text-emerald-600 mb-1" />
                    <span className="text-xs font-bold">Cadangkan RSVP & Momen</span>
                    <span className="text-[10px] text-emerald-700">Ekspor berkas JSON</span>
                  </button>
                </div>

                {isUploading && (
                  <p className="text-xs text-blue-600 text-center animate-pulse">
                    Mengunggah berkas ke Google Drive...
                  </p>
                )}

                {uploadSuccess && (
                  <p className="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-center">
                    {uploadSuccess}
                  </p>
                )}

                {syncStatus && (
                  <p className="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-center">
                    {syncStatus}
                  </p>
                )}

                {/* Files List in Drive */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800">
                      Berkas di Folder Vault ({files.length})
                    </span>
                    <button
                      type="button"
                      onClick={loadDriveData}
                      className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Refresh</span>
                    </button>
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                    {isLoading ? (
                      <p className="text-xs text-slate-400 text-center py-4">
                        Memuat data Google Drive...
                      </p>
                    ) : files.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        Belum ada berkas di folder Vault. Momen tamu yang diunggah akan otomatis tersimpan di sini.
                      </p>
                    ) : (
                      files.map((f) => (
                        <div
                          key={f.id}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                        >
                          <div className="flex items-center gap-2 truncate">
                            {f.mimeType?.includes('image') ? (
                              <ImageIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            ) : (
                              <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            )}
                            <span className="truncate font-medium text-slate-800">{f.name}</span>
                          </div>
                          {f.webViewLink && (
                            <a
                              href={f.webViewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-[11px] font-semibold flex-shrink-0"
                            >
                              Lihat
                            </a>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
