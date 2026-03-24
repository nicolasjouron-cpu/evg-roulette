export interface Destination {
  city: string;
  country: string;
  lat: number;
  lng: number;
  description?: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
  feelsLike: number;
}

export interface NowPlaying {
  trackName: string;
  artistName: string;
}

export interface ModalState {
  isOpen: boolean;
  destination: Destination | null;
  weather: WeatherData | null;
  imageUrl: string | null;
  nowPlaying: NowPlaying | null;
  loading: boolean;
}
