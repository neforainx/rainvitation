import React, { useState } from 'react';
import { MapPin, Clock, Calendar, Navigation, Copy, Check, Video, Shirt, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { WeddingEvent, ThemeConfig } from '../types';
import { WeddingOrnament, DividerOrnament } from './Ornaments';

interface EventsAndMapsProps {
  events: WeddingEvent[];
  theme: ThemeConfig;
}

export const EventsAndMapsSection: React.FC<EventsAndMapsProps> = ({ events, theme }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyAddress = (id: string, address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section className="py-12 px-4 sm:px-6 w-full max-w-3xl mx-auto">
      {/* Title */}
      <div className="text-center mb-10">
        <span
          className="text-xs font-bold tracking-widest uppercase block mb-1"
          style={{ color: theme.accentColor }}
        >
          Agenda & Lokasi
        </span>
        <h2
          className="text-2xl sm:text-3xl font-serif font-bold"
          style={{ color: theme.primaryColor }}
        >
          Waktu & Tempat Acara
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
          Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {events.map((evt, idx) => {
          const eventDate = new Date(evt.date).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });

          return (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/90 shadow-xl overflow-hidden flex flex-col justify-between"
            >
              {/* Event Header Banner */}
              <div
                className="p-5 text-white text-center relative overflow-hidden"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <div className="absolute -right-4 -bottom-4 opacity-15">
                  <WeddingOrnament type={theme.ornamentStyle} className="w-24 h-24" color="#FFFFFF" />
                </div>
                <span className="inline-block text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md mb-2">
                  {evt.type === 'akad' ? 'Akad Nikah' : evt.type === 'pemberkatan' ? 'Pemberkatan' : 'Resepsi Pernikahan'}
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold">
                  {evt.title}
                </h3>
              </div>

              {/* Event Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                {/* Date & Time */}
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50/60 border border-amber-100/80">
                    <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: theme.accentColor }} />
                    <div>
                      <p className="font-semibold text-slate-900">{eventDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50/60 border border-amber-100/80">
                    <Clock className="w-4 h-4 flex-shrink-0" style={{ color: theme.accentColor }} />
                    <div>
                      <p className="font-semibold text-slate-900">
                        Pukul {evt.timeStart} - {evt.timeEnd} {evt.timezone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 text-xs">
                  <div className="flex items-start gap-2 mb-1.5">
                    <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {evt.locationName}
                      </h4>
                      <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">
                        {evt.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-200/60">
                    <button
                      id={`btn-copy-address-${evt.id}`}
                      onClick={() => handleCopyAddress(evt.id, `${evt.locationName} - ${evt.address}`)}
                      className="inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-xl bg-white border border-slate-200 shadow-xs cursor-pointer transition-all active:scale-95"
                    >
                      {copiedId === evt.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-500" />
                          <span>Salin Alamat</span>
                        </>
                      )}
                    </button>

                    <a
                      href={evt.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold text-white px-3 py-2 rounded-xl shadow-xs cursor-pointer transition-all active:scale-95"
                      style={{ backgroundColor: theme.accentColor }}
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Buka Google Maps</span>
                    </a>
                  </div>
                </div>

                {/* Dresscode Palette if available */}
                {evt.dresscode && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/40 border border-amber-200/40 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 font-semibold mb-1.5">
                      <Shirt className="w-3.5 h-3.5" style={{ color: theme.accentColor }} />
                      <span>Dresscode: {evt.dresscode.title}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      {evt.dresscode.colors.map((c, i) => (
                        <span
                          key={i}
                          className="w-5 h-5 rounded-full border border-white shadow-xs inline-block"
                          style={{ backgroundColor: c }}
                          title={c}
                        />
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-500">{evt.dresscode.note}</p>
                  </div>
                )}

                {/* Live Streaming Link if available */}
                {evt.streamingUrl && (
                  <a
                    href={evt.streamingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Video className="w-3.5 h-3.5 text-red-600" />
                    <span>Saksikan Live Streaming Acara</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Embedded Google Map Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 p-4 shadow-lg overflow-hidden"
      >
        <div className="flex items-center justify-between mb-3 px-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-600" />
            <span className="text-xs font-bold text-slate-900">Peta Navigasi Lokasi</span>
          </div>
          <span className="text-[11px] text-slate-500">Google Maps Live Sync</span>
        </div>

        <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative bg-slate-100">
          <iframe
            title="Google Maps Location"
            className="w-full h-full border-0"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              events[0]?.mapsEmbedQuery || events[0]?.locationName || 'Monas Jakarta'
            )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            loading="lazy"
          />
        </div>
      </motion.div>

      <DividerOrnament
        type={theme.ornamentStyle}
        color={theme.accentColor}
        className="my-10"
      />
    </section>
  );
};
