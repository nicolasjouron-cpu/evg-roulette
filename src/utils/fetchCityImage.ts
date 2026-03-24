import type { Destination } from '../types';

const CITY_WIKI_NAMES: Record<string, string> = {
  "Tbilissi": "Tbilisi",
  "Medellín": "Medellín",
  "Luang Prabang": "Luang_Prabang",
  "Marrakech": "Marrakesh",
  "Chiang Mai": "Chiang_Mai",
  "Valparaíso": "Valparaíso",
  "Siem Reap": "Siem_Reap",
  "Hoi An": "Hoi_An",
  "Séville": "Seville",
  "Cluj-Napoca": "Cluj-Napoca",
  "Bogotá": "Bogotá",
  "Katmandou": "Kathmandu",
  "Cape Town": "Cape_Town",
  "Fès": "Fez,_Morocco",
  "Gdańsk": "Gdańsk",
  "Ilha Grande": "Ilha_Grande",
  "Koh Samui": "Ko_Samui",
  "Dahab": "Dahab",
  "Essaouira": "Essaouira",
  "Antigua": "Antigua_Guatemala",
};

export async function fetchCityImage(destination: Destination): Promise<string | null> {
  const wikiName = CITY_WIKI_NAMES[destination.city] || destination.city;

  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiName)}`
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data.originalimage?.source || data.thumbnail?.source || null;
  } catch {
    return null;
  }
}
