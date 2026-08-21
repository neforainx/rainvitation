import React from 'react';
import { motion } from 'motion/react';

interface OrnamentProps {
  type: string;
  className?: string;
  color?: string;
  isAnimated?: boolean;
  animationType?: string;
}

export const WeddingOrnament: React.FC<OrnamentProps> = ({
  type,
  className = 'w-24 h-24',
  color = '#D97706',
  isAnimated = true,
}) => {
  switch (type) {
    case 'jawa-gunungan':
    case 'gunungan':
      return (
        <motion.div
          className="inline-block relative"
          animate={
            isAnimated
              ? {
                  y: [0, -8, 0],
                  rotate: [-1.5, 1.5, -1.5],
                  filter: [
                    'drop-shadow(0 4px 12px rgba(217, 119, 6, 0.35))',
                    'drop-shadow(0 8px 24px rgba(217, 119, 6, 0.75))',
                    'drop-shadow(0 4px 12px rgba(217, 119, 6, 0.35))',
                  ],
                }
              : undefined
          }
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <defs>
              <linearGradient id="goldGununganGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="50%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#92400E" />
              </linearGradient>
              <radialGradient id="auraGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Glowing Backdrop Aura */}
            <circle cx="60" cy="70" r="50" fill="url(#auraGlow)" />

            {/* Main Gunungan Outer Frame */}
            <motion.path
              d="M60 6 L105 102 Q112 118 92 124 L28 124 Q8 118 15 102 Z"
              stroke="url(#goldGununganGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="#FFFBEB"
              fillOpacity="0.15"
              animate={isAnimated ? { strokeWidth: [3.2, 4.2, 3.2] } : undefined}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Inner Intricate Border */}
            <path
              d="M60 16 L96 98 Q100 110 85 115 L35 115 Q20 110 24 98 Z"
              stroke="url(#goldGununganGrad)"
              strokeWidth="1.8"
              strokeDasharray="4 3"
              fill="none"
            />

            {/* Pohon Hayat Trunk & Branches */}
            <path d="M60 25 V112" stroke="url(#goldGununganGrad)" strokeWidth="3" strokeLinecap="round" />
            <path d="M60 50 Q80 55 86 72" stroke="url(#goldGununganGrad)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M60 50 Q40 55 34 72" stroke="url(#goldGununganGrad)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M60 75 Q85 82 90 102" stroke="url(#goldGununganGrad)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M60 75 Q35 82 30 102" stroke="url(#goldGununganGrad)" strokeWidth="2.2" strokeLinecap="round" />

            {/* Floating Top Jewel with Breathing Glow */}
            <motion.circle
              cx="60"
              cy="25"
              r="6"
              fill="url(#goldGununganGrad)"
              animate={isAnimated ? { scale: [1, 1.35, 1], opacity: [0.85, 1, 0.85] } : undefined}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <circle cx="60" cy="50" r="4.5" fill="url(#goldGununganGrad)" />
            <circle cx="60" cy="75" r="4.5" fill="url(#goldGununganGrad)" />

            {/* Gate Pedestal Bottom Base */}
            <path d="M48 124 L60 136 L72 124" stroke="url(#goldGununganGrad)" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          </svg>
        </motion.div>
      );

    case 'sunda-kujang':
    case 'kujang':
      return (
        <motion.div
          className="inline-block relative"
          animate={
            isAnimated
              ? {
                  y: [0, -8, 0],
                  scale: [1, 1.05, 1],
                  filter: [
                    'drop-shadow(0 4px 12px rgba(5, 150, 105, 0.35))',
                    'drop-shadow(0 8px 24px rgba(5, 150, 105, 0.7))',
                    'drop-shadow(0 4px 12px rgba(5, 150, 105, 0.35))',
                  ],
                }
              : undefined
          }
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <defs>
              <linearGradient id="emeraldKujangGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6EE7B7" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#064E3B" />
              </linearGradient>
            </defs>
            <path
              d="M60 10 C42 16 30 40 34 65 C36 80 48 90 58 102 L62 108 L66 98 C72 84 90 72 86 48 C84 30 72 14 60 10 Z"
              stroke="url(#emeraldKujangGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="#ECFDF5"
              fillOpacity="0.2"
            />
            {/* Lubang Mata Kujang Berkilau */}
            <motion.circle
              cx="50"
              cy="48"
              r="4.5"
              fill="url(#emeraldKujangGrad)"
              animate={isAnimated ? { scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] } : undefined}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <motion.circle
              cx="54"
              cy="62"
              r="4.5"
              fill="url(#emeraldKujangGrad)"
              animate={isAnimated ? { scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] } : undefined}
              transition={{ duration: 1.6, delay: 0.3, repeat: Infinity }}
            />
            <motion.circle
              cx="60"
              cy="76"
              r="4.5"
              fill="url(#emeraldKujangGrad)"
              animate={isAnimated ? { scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] } : undefined}
              transition={{ duration: 1.6, delay: 0.6, repeat: Infinity }}
            />
            <path d="M38 36 Q60 24 82 36" stroke="url(#emeraldKujangGrad)" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        </motion.div>
      );

    case 'minang-gonjong':
    case 'gonjong':
      return (
        <motion.div
          className="inline-block relative"
          animate={
            isAnimated
              ? {
                  y: [0, -7, 0],
                  filter: [
                    'drop-shadow(0 4px 12px rgba(220, 38, 38, 0.35))',
                    'drop-shadow(0 8px 24px rgba(220, 38, 38, 0.7))',
                    'drop-shadow(0 4px 12px rgba(220, 38, 38, 0.35))',
                  ],
                }
              : undefined
          }
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 140 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <defs>
              <linearGradient id="rubyGonjongGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FCA5A5" />
                <stop offset="50%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#7F1D1D" />
              </linearGradient>
            </defs>
            {/* Atap Gonjong Rumah Gadang Megah */}
            <path
              d="M12 45 Q30 18 42 6 Q48 28 70 32 Q92 28 98 6 Q110 18 128 45 L116 62 Q70 54 24 62 Z"
              stroke="url(#rubyGonjongGrad)"
              strokeWidth="3.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="#FEF2F2"
              fillOpacity="0.2"
            />
            <path d="M42 6 L42 24 M98 6 L98 24" stroke="url(#rubyGonjongGrad)" strokeWidth="2.5" />
            <motion.circle
              cx="42"
              cy="6"
              r="4.5"
              fill="url(#rubyGonjongGrad)"
              animate={isAnimated ? { scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] } : undefined}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.circle
              cx="98"
              cy="6"
              r="4.5"
              fill="url(#rubyGonjongGrad)"
              animate={isAnimated ? { scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] } : undefined}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
            />
            <path d="M35 62 L35 78 L105 78 L105 62" stroke="url(#rubyGonjongGrad)" strokeWidth="2.8" />
            <path d="M52 62 V78 M70 62 V78 M88 62 V78" stroke="url(#rubyGonjongGrad)" strokeWidth="1.8" strokeDasharray="3 3" />
          </svg>
        </motion.div>
      );

    case 'bali-padma':
    case 'padma':
      return (
        <motion.div
          className="inline-block relative"
          animate={
            isAnimated
              ? {
                  rotate: [0, 360],
                  filter: [
                    'drop-shadow(0 4px 12px rgba(245, 158, 11, 0.35))',
                    'drop-shadow(0 8px 24px rgba(245, 158, 11, 0.7))',
                    'drop-shadow(0 4px 12px rgba(245, 158, 11, 0.35))',
                  ],
                }
              : undefined
          }
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <defs>
              <linearGradient id="padmaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="12" stroke="url(#padmaGrad)" strokeWidth="3" fill="#FFFBEB" fillOpacity="0.3" />
            <circle cx="60" cy="60" r="5" fill="url(#padmaGrad)" />
            {/* Kelopak Utama */}
            <path d="M60 12 C52 32 52 48 60 48 C68 48 68 32 60 12 Z" stroke="url(#padmaGrad)" strokeWidth="2.5" fill="#FEF3C7" fillOpacity="0.2" />
            <path d="M60 108 C52 88 52 72 60 72 C68 72 68 88 60 108 Z" stroke="url(#padmaGrad)" strokeWidth="2.5" fill="#FEF3C7" fillOpacity="0.2" />
            <path d="M12 60 C32 52 48 52 48 60 C48 68 32 68 12 60 Z" stroke="url(#padmaGrad)" strokeWidth="2.5" fill="#FEF3C7" fillOpacity="0.2" />
            <path d="M108 60 C88 52 72 52 72 60 C72 68 88 68 108 60 Z" stroke="url(#padmaGrad)" strokeWidth="2.5" fill="#FEF3C7" fillOpacity="0.2" />
            {/* Kelopak Diagonal */}
            <path d="M26 26 Q52 48 52 54 Q46 54 26 26 Z" stroke="url(#padmaGrad)" strokeWidth="2.2" fill="#FEF3C7" fillOpacity="0.15" />
            <path d="M94 26 Q68 48 68 54 Q74 54 94 26 Z" stroke="url(#padmaGrad)" strokeWidth="2.2" fill="#FEF3C7" fillOpacity="0.15" />
            <path d="M26 94 Q52 72 52 66 Q46 66 26 94 Z" stroke="url(#padmaGrad)" strokeWidth="2.2" fill="#FEF3C7" fillOpacity="0.15" />
            <path d="M94 94 Q68 72 68 66 Q74 66 94 94 Z" stroke="url(#padmaGrad)" strokeWidth="2.2" fill="#FEF3C7" fillOpacity="0.15" />
          </svg>
        </motion.div>
      );

    case 'batak-gorga':
    case 'gorga':
      return (
        <motion.div
          className="inline-block relative"
          animate={
            isAnimated
              ? {
                  scale: [1, 1.06, 1],
                  filter: [
                    'drop-shadow(0 4px 12px rgba(185, 28, 28, 0.35))',
                    'drop-shadow(0 8px 24px rgba(185, 28, 28, 0.7))',
                    'drop-shadow(0 4px 12px rgba(185, 28, 28, 0.35))',
                  ],
                }
              : undefined
          }
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 140 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <defs>
              <linearGradient id="gorgaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="50%" stopColor="#B91C1C" />
                <stop offset="100%" stopColor="#450A0A" />
              </linearGradient>
            </defs>
            <path
              d="M10 35 Q35 6 52 35 T92 35 T130 35"
              stroke="url(#gorgaGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M10 35 Q35 64 52 35 T92 35 T130 35"
              stroke="url(#gorgaGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <motion.circle
              cx="35"
              cy="35"
              r="6.5"
              fill="url(#gorgaGrad)"
              animate={isAnimated ? { scale: [0.8, 1.3, 0.8] } : undefined}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.circle
              cx="75"
              cy="35"
              r="6.5"
              fill="url(#gorgaGrad)"
              animate={isAnimated ? { scale: [0.8, 1.3, 0.8] } : undefined}
              transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }}
            />
            <motion.circle
              cx="110"
              cy="35"
              r="6.5"
              fill="url(#gorgaGrad)"
              animate={isAnimated ? { scale: [0.8, 1.3, 0.8] } : undefined}
              transition={{ duration: 1.5, delay: 0.6, repeat: Infinity }}
            />
          </svg>
        </motion.div>
      );

    case 'palembang-songket':
    case 'songket':
      return (
        <motion.div
          className="inline-block relative"
          animate={
            isAnimated
              ? {
                  rotate: [0, 8, 0, -8, 0],
                  scale: [1, 1.04, 1],
                  filter: [
                    'drop-shadow(0 4px 12px rgba(217, 119, 6, 0.35))',
                    'drop-shadow(0 8px 24px rgba(217, 119, 6, 0.7))',
                    'drop-shadow(0 4px 12px rgba(217, 119, 6, 0.35))',
                  ],
                }
              : undefined
          }
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <defs>
              <linearGradient id="songketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="50%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
            </defs>
            <polygon points="60,10 110,60 60,110 10,60" stroke="url(#songketGrad)" strokeWidth="3" fill="#FFFBEB" fillOpacity="0.2" />
            <polygon points="60,28 92,60 60,92 28,60" stroke="url(#songketGrad)" strokeWidth="2" fill="#FFFBEB" fillOpacity="0.2" />
            <motion.circle
              cx="60"
              cy="60"
              r="7"
              fill="url(#songketGrad)"
              animate={isAnimated ? { scale: [1, 1.4, 1] } : undefined}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <path d="M60 10 V28 M60 92 V110 M10 60 H28 M92 60 H110" stroke="url(#songketGrad)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      );

    case 'islamic-arabesque':
    case 'arabesque':
      return (
        <motion.div
          className="inline-block relative"
          animate={
            isAnimated
              ? {
                  scale: [1, 1.05, 1],
                  filter: [
                    'drop-shadow(0 4px 12px rgba(13, 148, 136, 0.35))',
                    'drop-shadow(0 8px 24px rgba(13, 148, 136, 0.7))',
                    'drop-shadow(0 4px 12px rgba(13, 148, 136, 0.35))',
                  ],
                }
              : undefined
          }
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <defs>
              <linearGradient id="arabesqueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5EEAD4" />
                <stop offset="50%" stopColor="#0D9488" />
                <stop offset="100%" stopColor="#115E59" />
              </linearGradient>
            </defs>
            <path
              d="M60 10 C42 28 30 40 30 65 C30 90 42 110 60 110 C78 110 90 90 90 65 C90 40 78 28 60 10 Z"
              stroke="url(#arabesqueGrad)"
              strokeWidth="3"
              fill="#F0FDFA"
              fillOpacity="0.2"
            />
            <circle cx="60" cy="65" r="18" stroke="url(#arabesqueGrad)" strokeWidth="2" />
            <path d="M60 10 L60 47 M60 83 L60 110" stroke="url(#arabesqueGrad)" strokeWidth="2" />
            <path d="M30 65 H42 M78 65 H90" stroke="url(#arabesqueGrad)" strokeWidth="2" />
            <circle cx="60" cy="65" r="5" fill="url(#arabesqueGrad)" />
          </svg>
        </motion.div>
      );

    case 'luxury-damask':
    case 'damask':
    case 'monogram-crest':
      return (
        <motion.div
          className="inline-block relative"
          animate={
            isAnimated
              ? {
                  y: [0, -8, 0],
                  filter: [
                    'drop-shadow(0 4px 12px rgba(217, 119, 6, 0.4))',
                    'drop-shadow(0 10px 28px rgba(217, 119, 6, 0.8))',
                    'drop-shadow(0 4px 12px rgba(217, 119, 6, 0.4))',
                  ],
                }
              : undefined
          }
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <defs>
              <linearGradient id="damaskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="50%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
            </defs>
            <path
              d="M60 15 C74 28 92 35 92 55 C92 75 74 82 60 106 C46 82 28 75 28 55 C28 35 46 28 60 15 Z"
              stroke="url(#damaskGrad)"
              strokeWidth="3"
              fill="#FFFBEB"
              fillOpacity="0.2"
            />
            <path d="M60 28 C66 40 80 46 80 58 C80 70 66 76 60 90 C54 76 40 70 40 58 C40 46 54 40 60 28 Z" stroke="url(#damaskGrad)" strokeWidth="1.8" />
            <circle cx="60" cy="58" r="5" fill="url(#damaskGrad)" />
          </svg>
        </motion.div>
      );

    case 'rustic-floral':
    case 'floral':
    case 'modern-leaves':
    default:
      return (
        <motion.div
          className="inline-block relative"
          animate={
            isAnimated
              ? {
                  rotate: [-3, 3, -3],
                  scale: [1, 1.03, 1],
                  filter: [
                    'drop-shadow(0 4px 12px rgba(16, 185, 129, 0.3))',
                    'drop-shadow(0 8px 24px rgba(16, 185, 129, 0.6))',
                    'drop-shadow(0 4px 12px rgba(16, 185, 129, 0.3))',
                  ],
                }
              : undefined
          }
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <defs>
              <linearGradient id="floralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A7F3D0" />
                <stop offset="50%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#065F46" />
              </linearGradient>
            </defs>
            <path d="M25 95 Q60 60 95 25" stroke="url(#floralGrad)" strokeWidth="3" strokeLinecap="round" />
            <path d="M48 72 Q35 48 52 48 Q64 54 48 72 Z" stroke="url(#floralGrad)" strokeWidth="2" fill="#ECFDF5" fillOpacity="0.3" />
            <path d="M60 60 Q78 42 72 30 Q58 36 60 60 Z" stroke="url(#floralGrad)" strokeWidth="2" fill="#ECFDF5" fillOpacity="0.3" />
            <path d="M78 42 Q66 18 84 18 Q96 24 78 42 Z" stroke="url(#floralGrad)" strokeWidth="2" fill="#ECFDF5" fillOpacity="0.3" />
            <path d="M36 84 Q18 78 24 60 Q38 66 36 84 Z" stroke="url(#floralGrad)" strokeWidth="2" fill="#ECFDF5" fillOpacity="0.3" />
          </svg>
        </motion.div>
      );

    case 'rose-crest':
      return (
        <motion.div
          className="inline-block relative"
          animate={isAnimated ? { rotate: [0, 360], scale: [1, 1.04, 1] } : undefined}
          transition={{ rotate: { duration: 40, repeat: Infinity, ease: 'linear' }, scale: { duration: 3, repeat: Infinity } }}
        >
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <circle cx="60" cy="60" r="54" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="60" cy="60" r="46" stroke={color} strokeWidth="2" />
            {/* Rose Blossom Petals */}
            <path d="M60 40 C52 40 46 46 48 54 C50 62 60 68 60 76 C60 68 70 62 72 54 C74 46 68 40 60 40 Z" fill={color} fillOpacity="0.85" />
            <path d="M60 46 C56 46 52 50 54 55 C56 60 60 64 60 70 C60 64 64 60 66 55 C68 50 64 46 60 46 Z" fill="#FFFBEB" />
            <path d="M42 62 C36 58 34 50 40 44 C46 38 52 44 48 52 Z" fill={color} fillOpacity="0.6" />
            <path d="M78 62 C84 58 86 50 80 44 C74 38 68 44 72 52 Z" fill={color} fillOpacity="0.6" />
          </svg>
        </motion.div>
      );

    case 'meadow-leaf':
      return (
        <motion.div
          className="inline-block relative"
          animate={isAnimated ? { y: [0, -4, 0], rotate: [-2, 2, -2] } : undefined}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M20 100 Q60 50 100 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M40 75 Q30 55 45 50 Q55 65 40 75 Z" fill={color} fillOpacity="0.75" />
            <path d="M65 50 Q60 30 75 28 Q82 45 65 50 Z" fill={color} fillOpacity="0.75" />
            <path d="M85 32 Q90 15 102 18 Q100 32 85 32 Z" fill={color} fillOpacity="0.75" />
            <path d="M50 65 Q65 70 70 85 Q55 85 50 65 Z" fill={color} fillOpacity="0.6" />
          </svg>
        </motion.div>
      );

    case 'poppy-sketch':
      return (
        <motion.div
          className="inline-block relative"
          animate={isAnimated ? { scale: [1, 1.05, 1], rotate: [-1, 1, -1] } : undefined}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <circle cx="60" cy="50" r="10" stroke={color} strokeWidth="1.5" />
            <path d="M60 40 C45 20 20 40 40 60 C50 70 60 70 60 70" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <path d="M60 40 C75 20 100 40 80 60 C70 70 60 70 60 70" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <path d="M40 60 C20 75 40 100 60 85 C60 75 60 70 60 70" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <path d="M80 60 C100 75 80 100 60 85" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <path d="M60 85 Q55 105 50 115" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      );

    case 'gardenia-wreath':
      return (
        <motion.div
          className="inline-block relative"
          animate={isAnimated ? { rotate: [0, 5, -5, 0] } : undefined}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <circle cx="60" cy="60" r="50" stroke={color} strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Gardenia Flower Center */}
            <circle cx="60" cy="60" r="12" fill={color} fillOpacity="0.8" />
            <path d="M60 30 Q50 45 60 48 Q70 45 60 30 Z" fill={color} fillOpacity="0.5" />
            <path d="M60 90 Q50 75 60 72 Q70 75 60 90 Z" fill={color} fillOpacity="0.5" />
            <path d="M30 60 Q45 50 48 60 Q45 70 30 60 Z" fill={color} fillOpacity="0.5" />
            <path d="M90 60 Q75 50 72 60 Q75 70 90 60 Z" fill={color} fillOpacity="0.5" />
          </svg>
        </motion.div>
      );

    case 'french-arch':
      return (
        <motion.div
          className="inline-block relative"
          animate={isAnimated ? { y: [0, -3, 0] } : undefined}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Architectural Arch Frame */}
            <path d="M30 110 V50 Q30 20 60 20 Q90 20 90 50 V110" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M38 110 V52 Q38 28 60 28 Q82 28 82 52 V110" stroke={color} strokeWidth="1" strokeDasharray="3 3" />
            {/* Climber Leaves */}
            <circle cx="30" cy="45" r="4" fill={color} />
            <circle cx="34" cy="32" r="3.5" fill={color} />
            <circle cx="60" cy="18" r="5" fill={color} />
            <circle cx="86" cy="32" r="3.5" fill={color} />
            <circle cx="90" cy="45" r="4" fill={color} />
          </svg>
        </motion.div>
      );

    case 'plumeria-monogram':
      return (
        <motion.div
          className="inline-block relative"
          animate={isAnimated ? { rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] } : undefined}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* 5 Plumeria Frangipani Petals */}
            {[0, 72, 144, 216, 288].map((deg, i) => (
              <path
                key={i}
                d="M60 60 C50 40 45 20 60 15 C75 20 70 40 60 60 Z"
                fill="#FFFFFF"
                stroke={color}
                strokeWidth="2"
                transform={`rotate(${deg} 60 60)`}
              />
            ))}
            <circle cx="60" cy="60" r="9" fill="#FBBF24" />
          </svg>
        </motion.div>
      );

    case 'palace-lotus-arch':
      return (
        <motion.div
          className="inline-block relative"
          animate={isAnimated ? { scale: [1, 1.04, 1], filter: ['drop-shadow(0 2px 8px rgba(217,119,6,0.3))', 'drop-shadow(0 6px 16px rgba(217,119,6,0.6))', 'drop-shadow(0 2px 8px rgba(217,119,6,0.3))'] } : undefined}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Palace Arch Pinnacle */}
            <path d="M20 110 V60 Q20 35 45 30 Q60 12 60 12 Q60 12 75 30 Q100 35 100 60 V110" stroke={color} strokeWidth="3" fill="#FFFBEB" fillOpacity="0.1" />
            <circle cx="60" cy="12" r="5" fill={color} />
            {/* Lotus Blossom Base */}
            <path d="M60 65 C50 75 35 85 45 100 C60 92 60 92 60 92 C60 92 60 92 75 100 C85 85 70 75 60 65 Z" fill="#F472B6" />
            <path d="M60 72 C55 80 48 85 54 94 C60 90 60 90 60 90 C60 90 60 90 66 94 C72 85 65 80 60 72 Z" fill="#FDF2F8" />
          </svg>
        </motion.div>
      );

    case 'thistle-stem':
      return (
        <motion.div
          className="inline-block relative"
          animate={isAnimated ? { rotate: [-4, 4, -4] } : undefined}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M30 110 Q60 70 80 30" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="80" cy="30" r="16" fill="#F472B6" fillOpacity="0.85" />
            <circle cx="80" cy="30" r="8" fill="#FDF2F8" />
            <path d="M65 42 Q75 48 80 56 Q85 48 95 42 Z" fill="#059669" />
          </svg>
        </motion.div>
      );
  }
};

/* =========================================================================
   COMPOSITE LARGE ANIMATED ORNAMENTS & FRAMING SYSTEMS
   ========================================================================= */

// 1. ANIMATED CORNER BORDERS (Grand Luxury Framing)
export const AnimatedCornerBorders: React.FC<{ color?: string; className?: string }> = ({
  color = '#D97706',
  className = ''
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      {/* Top Left Corner Filigree */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-2 left-2 sm:top-4 sm:left-4 w-20 h-20 sm:w-28 sm:h-28 text-amber-600"
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M6 94 V20 Q20 6 94 6" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <path d="M16 94 V26 Q26 16 94 16" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="20" cy="20" r="5" fill={color} />
          <path d="M20 20 Q50 30 30 50 Q20 30 20 20 Z" fill={color} fillOpacity="0.4" />
        </svg>
      </motion.div>

      {/* Top Right Corner Filigree */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 w-20 h-20 sm:w-28 sm:h-28 text-amber-600"
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full scale-x-[-1]">
          <path d="M6 94 V20 Q20 6 94 6" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <path d="M16 94 V26 Q26 16 94 16" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="20" cy="20" r="5" fill={color} />
          <path d="M20 20 Q50 30 30 50 Q20 30 20 20 Z" fill={color} fillOpacity="0.4" />
        </svg>
      </motion.div>

      {/* Bottom Left Corner Filigree */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-20 h-20 sm:w-28 sm:h-28 text-amber-600"
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full scale-y-[-1]">
          <path d="M6 94 V20 Q20 6 94 6" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <path d="M16 94 V26 Q26 16 94 16" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="20" cy="20" r="5" fill={color} />
          <path d="M20 20 Q50 30 30 50 Q20 30 20 20 Z" fill={color} fillOpacity="0.4" />
        </svg>
      </motion.div>

      {/* Bottom Right Corner Filigree */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, delay: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-20 h-20 sm:w-28 sm:h-28 text-amber-600"
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full scale-x-[-1] scale-y-[-1]">
          <path d="M6 94 V20 Q20 6 94 6" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <path d="M16 94 V26 Q26 16 94 16" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="20" cy="20" r="5" fill={color} />
          <path d="M20 20 Q50 30 30 50 Q20 30 20 20 Z" fill={color} fillOpacity="0.4" />
        </svg>
      </motion.div>
    </div>
  );
};

// 2. ROTATING MANDALA BACKGROUND (Continuous Atmospheric Spin)
export const RotatingMandalaBackground: React.FC<{ color?: string; className?: string }> = ({
  color = '#D97706',
  className = 'w-[360px] h-[360px] sm:w-[480px] sm:h-[480px]'
}) => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      className={`pointer-events-none opacity-25 flex items-center justify-center ${className}`}
    >
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="100" cy="100" r="90" stroke={color} strokeWidth="1.5" strokeDasharray="6 4" />
        <circle cx="100" cy="100" r="70" stroke={color} strokeWidth="2" />
        <circle cx="100" cy="100" r="50" stroke={color} strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="30" stroke={color} strokeWidth="2" />
        {/* 12 Petal Radial Array */}
        {[...Array(12)].map((_, i) => (
          <path
            key={i}
            d="M100 10 C92 40 92 60 100 70 C108 60 108 40 100 10 Z"
            stroke={color}
            strokeWidth="1.5"
            fill={color}
            fillOpacity="0.08"
            transform={`rotate(${i * 30} 100 100)`}
          />
        ))}
      </svg>
    </motion.div>
  );
};

// 3. FLOATING ETHEREAL PETALS / SPARKLES
export const FloatingEtherealParticles: React.FC<{ color?: string }> = ({ color = '#F59E0B' }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -20, x: `${(i + 1) * 12}%`, opacity: 0 }}
          animate={{
            y: ['0vh', '100vh'],
            x: [`${(i + 1) * 12}%`, `${(i + 1) * 12 + (i % 2 === 0 ? 6 : -6)}%`],
            rotate: [0, 360],
            opacity: [0, 0.7, 0.9, 0],
          }}
          transition={{
            duration: 9 + (i % 4) * 2,
            repeat: Infinity,
            delay: i * 1.4,
            ease: 'easeInOut',
          }}
          className="absolute w-3 h-3 sm:w-4 sm:h-4"
        >
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M10 0 C6 6 0 10 0 10 C6 10 10 14 10 20 C10 14 14 10 20 10 C14 10 10 6 10 0 Z"
              fill={color}
              fillOpacity="0.6"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export const DividerOrnament: React.FC<{
  type: string;
  color?: string;
  className?: string;
  isAnimated?: boolean;
}> = ({
  type,
  color = '#D97706',
  className = 'w-full max-w-sm h-12 mx-auto my-6',
  isAnimated = true,
}) => {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-amber-500 to-amber-600 opacity-60" style={{ backgroundColor: color }} />
      <WeddingOrnament type={type} className="w-12 h-12 flex-shrink-0 drop-shadow-md" color={color} isAnimated={isAnimated} />
      <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-amber-500 to-amber-600 opacity-60" style={{ backgroundColor: color }} />
    </div>
  );
};
