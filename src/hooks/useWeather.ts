import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Destination, WeatherData } from '../types';

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

export function useWeather(destination: Destination | null) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!destination) {
      setWeather(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    axios
      .get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: destination.lat,
          longitude: destination.lng,
          current_weather: true,
          hourly: 'apparent_temperature',
        },
      })
      .then((res) => {
        if (cancelled) return;
        const { current_weather, hourly } = res.data;
        const { condition, icon } = mapWeatherCode(current_weather.weathercode);
        setWeather({
          temp: Math.round(current_weather.temperature),
          condition,
          icon,
          feelsLike: Math.round(hourly.apparent_temperature[0]),
        });
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || 'Erreur météo');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [destination]);

  return { weather, loading, error };
}
