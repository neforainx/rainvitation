import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Bell, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { ThemeConfig } from '../types';

interface CountdownProps {
  targetDate: string; // ISO string
  accentColor?: string;
  theme?: ThemeConfig;
  weddingTitle?: string;
  title?: string;
  location?: string;
}

export const CountdownTimer: React.FC<CountdownProps> = ({
  targetDate,
  accentColor,
  theme,
  weddingTitle,
  title,
  location = 'Jakarta'
}) => {
  const color = accentColor || theme?.accentColor || '#D97706';
  const displayTitle = weddingTitle || title || 'The Wedding';

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false
  });

  const [calendarSaved, setCalendarSaved] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const handleSaveToGoogleCalendar = () => {
    const startTime = new Date(targetDate).toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endTime = new Date(new Date(targetDate).getTime() + 4 * 60 * 60 * 1000)
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, '');

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      'Pernikahan ' + displayTitle
    )}&dates=${startTime}/${endTime}&details=${encodeURIComponent(
      'Momen bahagia pernikahan suci ' + displayTitle + '. Kehadiran dan doa restu Anda merupakan kehormatan bagi kami.'
    )}&location=${encodeURIComponent(location)}`;

    window.open(url, '_blank');
    setCalendarSaved(true);
    setTimeout(() => setCalendarSaved(false), 4000);
  };

  const timeUnits = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds }
  ];

  return (
    <div className="w-full my-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-3 text-xs tracking-wider uppercase opacity-75 font-medium">
        <Clock className="w-3.5 h-3.5" style={{ color }} />
        <span>Menghitung Hari Bahagia</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-sm mx-auto">
        {timeUnits.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 shadow-sm"
          >
            <span
              className="text-xl sm:text-2xl font-bold tracking-tight font-serif"
              style={{ color }}
            >
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-600 uppercase tracking-wider mt-0.5">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <button
          id="btn-save-calendar"
          onClick={handleSaveToGoogleCalendar}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white rounded-full shadow-sm hover:opacity-95 active:scale-95 transition-all cursor-pointer"
          style={{ backgroundColor: color }}
        >
          {calendarSaved ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Tersimpan di Kalender</span>
            </>
          ) : (
            <>
              <Calendar className="w-3.5 h-3.5" />
              <span>Simpan ke Google Calendar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
