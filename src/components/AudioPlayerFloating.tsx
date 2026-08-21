import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Disc3, ExternalLink, Play, Pause, Radio, Sparkles, ChevronUp, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { audioEngine } from '../utils/audioEngine';
import { ThemeConfig, WeddingInvitation } from '../types';
import { parseSpotifyUrl, POPULAR_SPOTIFY_PRESETS } from '../utils/spotifyHelper';

interface AudioPlayerProps {
  theme: ThemeConfig;
  audioTrack?: WeddingInvitation['audioTrack'];
  autoPlayStarted?: boolean;
}

export const AudioPlayerFloating: React.FC<AudioPlayerProps> = ({
  theme,
  audioTrack,
  autoPlayStarted
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // Detect mode: Spotify vs Custom MP3 vs Synth Preset
  const isSpotify = (audioTrack?.sourceType === 'spotify' || (!audioTrack?.sourceType && !!audioTrack?.spotifyUrl)) && !!audioTrack?.spotifyUrl;
  const isCustomUrl = audioTrack?.sourceType === 'custom_url' && !!audioTrack?.customAudioUrl;
  const spotifyData = isSpotify && audioTrack?.spotifyUrl ? parseSpotifyUrl(audioTrack.spotifyUrl) : null;

  // Custom Audio Ref for MP3 URL
  const customAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isCustomUrl && audioTrack?.customAudioUrl) {
      customAudioRef.current = new Audio(audioTrack.customAudioUrl);
      customAudioRef.current.loop = true;
      return () => {
        if (customAudioRef.current) {
          customAudioRef.current.pause();
          customAudioRef.current = null;
        }
      };
    }
  }, [isCustomUrl, audioTrack?.customAudioUrl]);

  // Autoplay Trigger on Open Invitation
  useEffect(() => {
    if (autoPlayStarted && !hasInteracted) {
      setHasInteracted(true);
      if (isSpotify) {
        // Spotify widgets require user gesture or iframe interaction; expand widget to prompt play
        setIsExpanded(true);
        setIsPlaying(true);
      } else if (isCustomUrl && customAudioRef.current) {
        customAudioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      } else {
        const sound = audioTrack?.soundType || theme.sampleMusic.type;
        audioEngine.play(sound);
        setIsPlaying(true);
      }
    }
  }, [autoPlayStarted, isSpotify, isCustomUrl, theme, audioTrack]);

  const handleToggle = () => {
    if (isSpotify) {
      // Toggle widget expansion for Spotify
      setIsExpanded((prev) => !prev);
      setIsPlaying((prev) => !prev);
    } else if (isCustomUrl && customAudioRef.current) {
      if (isPlaying) {
        customAudioRef.current.pause();
        setIsPlaying(false);
      } else {
        customAudioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((e) => console.error('Audio play error:', e));
      }
    } else {
      const sound = audioTrack?.soundType || theme.sampleMusic.type;
      const newState = audioEngine.toggle(sound);
      setIsPlaying(newState);
    }
  };

  const trackTitle = audioTrack?.title || theme.sampleMusic.title;
  const trackArtist = audioTrack?.artist || (isSpotify ? 'Spotify Music' : theme.sampleMusic.genre);

  return (
    <div className="fixed bottom-24 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5">
      {/* SPOTIFY EMBED MINI-PLAYER DRAWER */}
      <AnimatePresence>
        {isSpotify && spotifyData?.isValid && spotifyData.embedUrl && isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-72 sm:w-80 rounded-3xl bg-[#121212] p-3 shadow-2xl border border-white/20 overflow-hidden text-white flex flex-col gap-2"
          >
            {/* Header with Spotify Brand */}
            <div className="flex items-center justify-between px-2 pt-1 pb-1">
              <div className="flex items-center gap-1.5">
                {/* Spotify Logo Icon */}
                <div className="w-5 h-5 rounded-full bg-[#1DB954] flex items-center justify-center text-black">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                </div>
                <span className="text-xs font-bold tracking-wide text-slate-200">
                  Spotify Wedding Music
                </span>
              </div>

              <div className="flex items-center gap-1">
                <a
                  href={spotifyData.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded-full text-slate-400 hover:text-white transition-colors"
                  title="Buka di Aplikasi Spotify"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Tutup Widget"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Embedded Spotify Player Iframe */}
            <div className="w-full rounded-2xl overflow-hidden shadow-inner bg-black">
              <iframe
                title="Spotify Music Player"
                src={spotifyData.embedUrl}
                width="100%"
                height={spotifyData.type === 'playlist' || spotifyData.type === 'album' ? '152' : '80'}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="w-full rounded-2xl border-none"
              />
            </div>

            {/* Hint for mobile autoplay */}
            <p className="text-[10px] text-slate-400 text-center px-1">
              Tekan tombol play <Play className="w-2.5 h-2.5 inline fill-current text-[#1DB954]" /> pada widget untuk mendengarkan lagu.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SYNTH / MP3 TRACK TITLE EXPANDED CHIP */}
      <AnimatePresence>
        {!isSpotify && isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/90 shadow-xl text-slate-800 text-xs flex items-center gap-3"
          >
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 truncate max-w-[150px]">
                {trackTitle}
              </span>
              <span className="text-[10px] text-slate-500 truncate max-w-[150px]">
                {trackArtist}
              </span>
            </div>
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-3.5">
                <span className="w-0.5 h-full bg-amber-600 animate-pulse" />
                <span className="w-0.5 h-2 bg-amber-600 animate-pulse delay-75" />
                <span className="w-0.5 h-3.5 bg-amber-600 animate-pulse delay-150" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN FLOATING MUSIC BUTTON */}
      <div className="relative">
        <motion.button
          id="btn-music-toggle"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleToggle}
          onMouseEnter={() => !isSpotify && setIsExpanded(true)}
          onMouseLeave={() => !isSpotify && setIsExpanded(false)}
          className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full shadow-2xl flex items-center justify-center text-white backdrop-blur-md transition-all cursor-pointer relative border-2 ${
            isSpotify ? 'border-[#1DB954]/50' : 'border-white/30'
          }`}
          style={{
            backgroundColor: isSpotify ? '#121212' : theme.primaryColor,
            boxShadow: isSpotify
              ? '0 10px 25px -4px rgba(29, 185, 84, 0.45)'
              : `0 10px 25px -4px ${theme.accentColor}60`
          }}
          title={
            isSpotify
              ? isExpanded
                ? 'Tutup Player Spotify'
                : 'Buka Player Spotify'
              : isPlaying
              ? 'Matikan Musik'
              : 'Putar Musik'
          }
        >
          {isSpotify ? (
            /* Spotify Spinning Icon */
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="text-[#1DB954]"
              >
                <Disc3 className="w-7 h-7" />
              </motion.div>
              <div className="absolute w-3.5 h-3.5 rounded-full bg-[#1DB954] flex items-center justify-center text-black">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-2 h-2">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
            </div>
          ) : isPlaying ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Disc3 className="w-6 h-6" />
            </motion.div>
          ) : (
            <VolumeX className="w-5 h-5 text-white/80" />
          )}

          {/* Active Glowing Status Indicator */}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: isSpotify ? '#1DB954' : theme.accentColor }}
              />
              <span
                className="relative inline-flex rounded-full h-3.5 w-3.5"
                style={{ backgroundColor: isSpotify ? '#1DB954' : theme.accentColor }}
              />
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
};
