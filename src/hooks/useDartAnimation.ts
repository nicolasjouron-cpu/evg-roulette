import { useState, useRef, useCallback } from 'react';
import type { Destination } from '../types';
import { getRandomDestination } from '../data/destinations';
import { playThrowSound, playImpactSound } from '../utils/sounds';

interface UseDartAnimationReturn {
  isAnimating: boolean;
  dartPosition: { x: number; y: number } | null;
  currentDestination: Destination | null;
  showImpact: boolean;
  throwDart: () => void;
}

export function useDartAnimation(
  onLand: (destination: Destination) => void
): UseDartAnimationReturn {
  const [isAnimating, setIsAnimating] = useState(false);
  const [dartPosition, setDartPosition] = useState<{ x: number; y: number } | null>(null);
  const [currentDestination, setCurrentDestination] = useState<Destination | null>(null);
  const [showImpact, setShowImpact] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const throwDart = useCallback(() => {
    if (isAnimating) return;

    clearTimers();
    setShowImpact(false);

    const destination = getRandomDestination();
    setCurrentDestination(destination);
    setIsAnimating(true);

    // Son de lancer
    playThrowSound();

    // Phase 1 (0ms): Position de départ aléatoire hors écran (en haut)
    const startX = Math.random() * 360 - 180;
    const startY = 85;
    setDartPosition({ x: startX, y: startY });

    // Phase 2 (800ms): Déplacement vers la destination
    const t1 = setTimeout(() => {
      setDartPosition({ x: destination.lng, y: destination.lat });
    }, 800);

    // Phase 3 (1400ms): Atterrissage — impact + son
    const t2 = setTimeout(() => {
      setIsAnimating(false);
      setShowImpact(true);
      playImpactSound();
      onLand(destination);
    }, 1400);

    // Phase 4 (2800ms): Masquer les ondes d'impact
    const t3 = setTimeout(() => {
      setShowImpact(false);
    }, 2800);

    timersRef.current = [t1, t2, t3];
  }, [isAnimating, onLand, clearTimers]);

  return { isAnimating, dartPosition, currentDestination, showImpact, throwDart };
}
