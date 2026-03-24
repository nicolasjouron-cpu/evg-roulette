import { memo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import { motion, AnimatePresence } from 'framer-motion';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface WorldMapProps {
  dartPosition: { x: number; y: number } | null;
  isAnimating: boolean;
  showImpact: boolean;
}

function DartSVG({ angle }: { angle: number }) {
  return (
    <g transform={`rotate(${angle})`}>
      {/* Pointe */}
      <polygon points="0,-10 -3,0 3,0" fill="#ef4444" />
      {/* Corps */}
      <rect x={-2} y={0} width={4} height={12} fill="#fbbf24" rx={1} />
      {/* Ailettes */}
      <polygon points="-2,12 -7,18 -2,16" fill="#f87171" />
      <polygon points="2,12 7,18 2,16" fill="#f87171" />
    </g>
  );
}

function ImpactWaves() {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          r={4}
          fill="none"
          stroke="#ef4444"
          strokeWidth={1.5}
          initial={{ r: 4, opacity: 0.8 }}
          animate={{ r: 25, opacity: 0 }}
          transition={{
            duration: 1.2,
            delay: i * 0.2,
            ease: 'easeOut',
          }}
        />
      ))}
    </g>
  );
}

function WorldMap({ dartPosition, isAnimating, showImpact }: WorldMapProps) {
  return (
    <div className="w-full h-screen bg-[#0f172a]">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 140,
          center: [0, 20],
        }}
        width={800}
        height={500}
        style={{ width: '100%', height: '100%' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rpiKey || geo.id || geo.properties?.name}
                geography={geo}
                fill="#1e3a5f"
                stroke="#334155"
                strokeWidth={0.5}
                style={{
                  default: { outline: 'none' },
                  hover: { fill: '#1e4a7a', outline: 'none', cursor: 'default' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>

        <AnimatePresence>
          {dartPosition && (
            <Marker coordinates={[dartPosition.x, dartPosition.y]}>
              {/* Ondes d'impact */}
              {showImpact && <ImpactWaves />}

              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={
                  isAnimating
                    ? { type: 'spring', stiffness: 100, damping: 15 }
                    : { duration: 0.2 }
                }
              >
                {isAnimating ? (
                  <DartSVG angle={180} />
                ) : (
                  <>
                    {/* Cercle pulsant externe */}
                    <motion.circle
                      r={8}
                      fill="transparent"
                      stroke="#ef4444"
                      strokeWidth={2}
                      animate={{
                        r: [8, 14, 8],
                        opacity: [1, 0.3, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    {/* Cercle central */}
                    <motion.circle
                      r={5}
                      fill="#ef4444"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </>
                )}
              </motion.g>
            </Marker>
          )}
        </AnimatePresence>
      </ComposableMap>
    </div>
  );
}

export default memo(WorldMap);
