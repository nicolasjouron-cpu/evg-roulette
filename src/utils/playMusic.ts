import { getMusicQuery } from '../data/music';

let currentAudio: HTMLAudioElement | null = null;

export async function playCityMusic(city: string): Promise<{ trackName: string; artistName: string } | null> {
  stopMusic();

  const query = getMusicQuery(city);

  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=5`
    );
    const data = await response.json();

    if (!data.results || data.results.length === 0) return null;

    // Prendre un résultat aléatoire parmi les 5 premiers pour varier
    const track = data.results[Math.floor(Math.random() * data.results.length)];

    if (!track.previewUrl) return null;

    currentAudio = new Audio(track.previewUrl);
    currentAudio.volume = 0.3;
    currentAudio.loop = true;
    await currentAudio.play();

    return {
      trackName: track.trackName,
      artistName: track.artistName,
    };
  } catch {
    return null;
  }
}

export function stopMusic() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = '';
    currentAudio = null;
  }
}
