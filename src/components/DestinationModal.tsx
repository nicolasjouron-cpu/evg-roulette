import { motion, AnimatePresence } from 'framer-motion';
import type { ModalState } from '../types';

interface DestinationModalProps {
  state: ModalState;
  onClose: () => void;
  onRetry: () => void;
}

function SkeletonLine({ width }: { width: string }) {
  return (
    <div
      className="h-4 rounded bg-slate-700 animate-pulse"
      style={{ width }}
    />
  );
}

export default function DestinationModal({ state, onClose, onRetry }: DestinationModalProps) {
  const { isOpen, destination, weather, imageUrl, nowPlaying, loading } = state;

  return (
    <AnimatePresence>
      {isOpen && destination && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#0f172a] border border-[#1e3a5f] rounded-2xl p-6 sm:p-8
                         w-[95vw] max-w-md shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <p className="text-red-400 font-bold text-sm tracking-widest uppercase mb-2">
                  🎯 Destination EVG
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  📍 {destination.city}
                </h2>
                <p className="text-slate-400 text-lg">{destination.country}</p>
              </div>

              {/* Photo */}
              <div className="rounded-xl overflow-hidden mb-6 h-44 bg-[#1e293b]">
                {loading && !imageUrl ? (
                  <div className="w-full h-full animate-pulse bg-slate-700" />
                ) : imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={destination.city}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
                    Photo indisponible
                  </div>
                )}
              </div>

              {/* Météo */}
              <div className="bg-[#1e293b] rounded-xl p-4 mb-6">
                {loading && !weather ? (
                  <div className="flex flex-col gap-2">
                    <SkeletonLine width="60%" />
                    <SkeletonLine width="40%" />
                  </div>
                ) : weather ? (
                  <div className="text-center">
                    <p className="text-2xl text-white font-bold">
                      🌡️ {weather.temp}°C {weather.icon} {weather.condition}
                    </p>
                    <p className="text-slate-400 text-sm mt-1">
                      Ressenti : {weather.feelsLike}°C
                    </p>
                  </div>
                ) : (
                  <p className="text-slate-400 text-center text-sm">
                    Météo indisponible
                  </p>
                )}
              </div>

              {/* Séparateur */}
              <div className="border-t border-[#1e3a5f] mb-6" />

              {/* Description IA */}
              <div className="mb-6 min-h-[80px]">
                {loading ? (
                  <div className="flex flex-col gap-3">
                    <SkeletonLine width="100%" />
                    <SkeletonLine width="90%" />
                    <SkeletonLine width="95%" />
                    <SkeletonLine width="70%" />
                  </div>
                ) : destination.description ? (
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                    {destination.description}
                  </p>
                ) : (
                  <p className="text-slate-500 text-sm italic text-center">
                    Description non disponible
                  </p>
                )}
              </div>

              {/* Now Playing */}
              {nowPlaying && (
                <div className="mb-6 flex items-center gap-2 text-xs text-slate-500">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="truncate">
                    🎵 {nowPlaying.trackName} — {nowPlaying.artistName}
                  </span>
                </div>
              )}

              {/* Boutons */}
              <div className="flex gap-3">
                <button
                  onClick={onRetry}
                  className="flex-1 py-3 rounded-xl font-bold text-white
                             bg-red-500 hover:bg-red-600 transition-colors
                             cursor-pointer"
                >
                  🎯 Retenter
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl font-bold text-slate-300
                             bg-[#1e293b] hover:bg-[#334155] transition-colors
                             cursor-pointer"
                >
                  ✕ Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
