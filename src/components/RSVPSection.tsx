import React, { useState } from 'react';
import { Send, CheckCircle2, XCircle, HelpCircle, Heart, User, Users, MessageSquare, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { RSVPItem, ThemeConfig } from '../types';
import { DividerOrnament } from './Ornaments';

interface RSVPSectionProps {
  rsvps: RSVPItem[];
  onAddRSVP: (item: Omit<RSVPItem, 'id' | 'timestamp' | 'likes'>) => void;
  onLikeRSVP: (id: string) => void;
  theme: ThemeConfig;
  defaultGuestName?: string;
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({
  rsvps,
  onAddRSVP,
  onLikeRSVP,
  theme,
  defaultGuestName = ''
}) => {
  const [name, setName] = useState(defaultGuestName);
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [relation, setRelation] = useState<string>('Sahabat');
  const [message, setMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    onAddRSVP({
      name: name.trim(),
      attendance,
      guestCount: attendance === 'hadir' ? guestCount : 0,
      relation,
      message: message.trim()
    });

    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const totalHadir = rsvps
    .filter((r) => r.attendance === 'hadir')
    .reduce((sum, r) => sum + (r.guestCount || 1), 0);
  const totalTidakHadir = rsvps.filter((r) => r.attendance === 'tidak_hadir').length;
  const totalRagu = rsvps.filter((r) => r.attendance === 'ragu').length;

  return (
    <section className="py-12 px-4 sm:px-6 w-full max-w-3xl mx-auto">
      {/* Title */}
      <div className="text-center mb-10">
        <span
          className="text-xs font-bold tracking-widest uppercase block mb-1"
          style={{ color: theme.accentColor }}
        >
          Konfirmasi Kehadiran & Doa
        </span>
        <h2
          className="text-2xl sm:text-3xl font-serif font-bold"
          style={{ color: theme.primaryColor }}
        >
          RSVP & Ucapan Bahagia
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
          Mohon kesediaan Bapak/Ibu/Saudara/i untuk mengonfirmasi kehadiran serta mengirimkan untaian doa restu.
        </p>
      </div>

      {/* RSVP Stats Bar */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-center">
          <div className="flex items-center justify-center gap-1 text-emerald-700 text-xs font-semibold mb-0.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Hadir</span>
          </div>
          <span className="text-lg font-bold text-emerald-900">{totalHadir} Pax</span>
        </div>

        <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200/80 text-center">
          <div className="flex items-center justify-center gap-1 text-rose-700 text-xs font-semibold mb-0.5">
            <XCircle className="w-3.5 h-3.5" />
            <span>Berhalangan</span>
          </div>
          <span className="text-lg font-bold text-rose-900">{totalTidakHadir}</span>
        </div>

        <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-center">
          <div className="flex items-center justify-center gap-1 text-amber-700 text-xs font-semibold mb-0.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Masih Ragu</span>
          </div>
          <span className="text-lg font-bold text-amber-900">{totalRagu}</span>
        </div>
      </div>

      {/* RSVP Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-6 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/90 shadow-xl mb-10"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" style={{ color: theme.accentColor }} />
              <span>Nama Lengkap Tamu</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Bpk. Joko & Keluarga"
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAttendance('hadir')}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    attendance === 'hadir'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Hadir</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttendance('tidak_hadir')}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    attendance === 'tidak_hadir'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <XCircle className="w-3 h-3" />
                  <span>Maaf</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttendance('ragu')}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    attendance === 'ragu'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Ragu</span>
                </button>
              </div>
            </div>

            {attendance === 'hadir' && (
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" style={{ color: theme.accentColor }} />
                  <span>Jumlah Tamu Hadir</span>
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                >
                  <option value={1}>1 Orang</option>
                  <option value={2}>2 Orang</option>
                  <option value={3}>3 Orang</option>
                  <option value={4}>4 Orang</option>
                  <option value={5}>5+ Orang (Keluarga)</option>
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Hubungan / Kategori
            </label>
            <div className="flex flex-wrap gap-2">
              {['Keluarga Besar', 'Sahabat', 'Teman Kuliah/Sekolah', 'Rekan Kerja', 'Tetangga', 'Tamu Kehormatan'].map((rel) => (
                <button
                  key={rel}
                  type="button"
                  onClick={() => setRelation(rel)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    relation === rel
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {rel}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" style={{ color: theme.accentColor }} />
              <span>Ucapan & Doa Restu untuk Mempelai</span>
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan selamat dan doa tulus Anda..."
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          <button
            type="submit"
            id="btn-submit-rsvp"
            className="w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-white shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            style={{ backgroundColor: theme.primaryColor }}
          >
            <Send className="w-4 h-4" />
            <span>Kirim Konfirmasi & Doa Restu</span>
          </button>

          {submitted && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs text-center font-medium animate-fadeIn">
              ✨ Terima kasih! Konfirmasi kehadiran dan doa restu Anda telah berhasil dikirimkan.
            </div>
          )}
        </form>
      </motion.div>

      {/* Wishes Feed List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2 mb-2">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Ucapan & Doa ({rsvps.length})</span>
          </h3>
          <span className="text-[11px] text-slate-500">Doa Restu Tamu Terkasih</span>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {rsvps.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 font-serif">
                      {item.name}
                    </span>
                    {item.attendance === 'hadir' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700">
                        Hadir ({item.guestCount} pax)
                      </span>
                    )}
                    {item.attendance === 'tidak_hadir' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-700">
                        Berhalangan
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {item.relation} • {item.timestamp}
                  </span>
                </div>

                <button
                  id={`btn-like-rsvp-${item.id}`}
                  onClick={() => onLikeRSVP(item.id)}
                  className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-full cursor-pointer transition-all active:scale-90"
                >
                  <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                  <span className="font-semibold text-[11px]">{item.likes}</span>
                </button>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed italic bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                "{item.message}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <DividerOrnament
        type={theme.ornamentStyle}
        color={theme.accentColor}
        className="my-10"
      />
    </section>
  );
};
