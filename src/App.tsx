import { useState, useCallback } from 'react'
import './App.css'
import WorldMap from './components/WorldMap'
import DestinationModal from './components/DestinationModal'
import { useDartAnimation } from './hooks/useDartAnimation'
import { generateEVGDescription } from './utils/generateEVGDescription'
import { fetchCityImage } from './utils/fetchCityImage'
import type { Destination, ModalState } from './types'

function App() {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    destination: null,
    weather: null,
    imageUrl: null,
    loading: false,
  });

  const handleLand = useCallback(async (destination: Destination) => {
    setModalState({
      isOpen: true,
      destination,
      weather: null,
      imageUrl: null,
      loading: true,
    });

    // Lancer météo, description IA et image en parallèle
    const [description, weatherResult, imageResult] = await Promise.allSettled([
      generateEVGDescription(destination),
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${destination.lat}&longitude=${destination.lng}&current_weather=true&hourly=apparent_temperature`
      ).then((r) => r.json()),
      fetchCityImage(destination),
    ]);

    const desc =
      description.status === 'fulfilled'
        ? description.value
        : 'Description indisponible pour le moment 🎉';

    let weatherData = null;
    if (weatherResult.status === 'fulfilled') {
      const data = weatherResult.value;
      const code = data.current_weather?.weathercode ?? -1;
      const { condition, icon } = mapWeatherCode(code);
      weatherData = {
        temp: Math.round(data.current_weather.temperature),
        condition,
        icon,
        feelsLike: Math.round(data.hourly.apparent_temperature[0]),
      };
    }

    const image = imageResult.status === 'fulfilled' ? imageResult.value : null;

    setModalState({
      isOpen: true,
      destination: { ...destination, description: desc },
      weather: weatherData,
      imageUrl: image,
      loading: false,
    });
  }, []);

  const { isAnimating, dartPosition, showImpact, throwDart } = useDartAnimation(handleLand);

  const handleClose = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const handleRetry = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    setTimeout(() => throwDart(), 300);
  }, [throwDart]);

  return (
    <div className="relative min-h-screen bg-[#0f172a] overflow-hidden">
      {/* Titre */}
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-white/60 text-lg font-bold tracking-wide">
          🎯 EVG Roulette
        </h1>
      </div>

      {/* Carte */}
      <WorldMap dartPosition={dartPosition} isAnimating={isAnimating} showImpact={showImpact} />

      {/* Bouton lancer */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={throwDart}
          disabled={isAnimating}
          className="px-8 py-4 rounded-full text-white font-bold text-lg
                     bg-red-500 hover:bg-red-600 disabled:opacity-50
                     disabled:cursor-not-allowed transition-all
                     shadow-[0_0_30px_rgba(239,68,68,0.5)]
                     cursor-pointer"
        >
          {isAnimating ? '✈️ Vol en cours...' : '🎯 LANCER LA FLÉCHETTE'}
        </button>
      </div>

      {/* Modale */}
      <DestinationModal
        state={modalState}
        onClose={handleClose}
        onRetry={handleRetry}
      />
    </div>
  );
}

function mapWeatherCode(code: number): { condition: string; icon: string } {
  if (code === 0) return { condition: 'Ensoleillé', icon: '☀️' };
  if (code >= 1 && code <= 3) return { condition: 'Nuageux', icon: '🌤️' };
  if (code >= 45 && code <= 48) return { condition: 'Brouillard', icon: '🌫️' };
  if (code >= 51 && code <= 57) return { condition: 'Bruine', icon: '🌦️' };
  if (code >= 61 && code <= 67) return { condition: 'Pluvieux', icon: '🌧️' };
  if (code >= 71 && code <= 77) return { condition: 'Neigeux', icon: '❄️' };
  if (code >= 80 && code <= 82) return { condition: 'Averses', icon: '🌧️' };
  if (code >= 85 && code <= 86) return { condition: 'Averses de neige', icon: '🌨️' };
  if (code >= 95 && code <= 99) return { condition: 'Orageux', icon: '⛈️' };
  return { condition: 'Inconnu', icon: '🌡️' };
}

export default App
