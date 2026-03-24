import axios from 'axios';
import type { Destination } from '../types';
import { getEVGDescription } from '../data/descriptions';

export async function generateEVGDescription(destination: Destination): Promise<string> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

  if (!apiKey) {
    return getEVGDescription(destination.city);
  }

  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        system: "Tu es un expert en organisation d'EVG avec un ton décalé et festif. Réponds toujours en français. Sois concis (3-4 phrases max).",
        messages: [
          {
            role: 'user',
            content: `Donne 3 idées d'activités fun et originales pour un EVG à ${destination.city}, ${destination.country}. Mentionne une spécialité locale (alcool, nourriture ou activité unique à cet endroit).`,
          },
        ],
      },
      {
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
      }
    );

    return response.data.content[0].text;
  } catch {
    return getEVGDescription(destination.city);
  }
}
